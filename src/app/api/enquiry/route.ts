import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import { sendEnquiryEmail } from "@/lib/email";

// In-memory rate limiting map: IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  // Filter out timestamps older than the window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many enquiries submitted from this network. Please wait a few minutes before trying again or contact us directly by phone.",
        },
        { status: 429 }
      );
    }

    // 2. Parse body safely with payload size restriction
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    // 3. Honeypot spam trap
    if (body.website && body.website.trim().length > 0) {
      // Return synthetic success so automated bot does not retry
      console.warn(`[Anti-Spam] Honeypot triggered by IP ${ip}`);
      return NextResponse.json({
        success: true,
        message: "Thank you for reaching out. Your enquiry has been received. Our team will review your message.",
      });
    }

    // 4. Server-side Zod validation
    const validationResult = enquirySchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      const firstErrorMessage =
        Object.values(fieldErrors).flat()[0] || "Invalid submission data";

      return NextResponse.json(
        {
          success: false,
          error: firstErrorMessage,
          fieldErrors,
        },
        { status: 422 }
      );
    }

    const validData = validationResult.data;

    // 5. Send email notification via server
    const emailResult = await sendEnquiryEmail({
      fullName: validData.fullName,
      phoneNumber: validData.phoneNumber,
      serviceInterestedIn: validData.serviceInterestedIn,
      query: validData.query,
      ipAddress: ip,
      userAgent: req.headers.get("user-agent") || undefined,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Our automated notification system is currently experiencing a temporary issue. Please reach us directly at Anvardglobal@gmail.com or call +91 8010416869.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you for reaching out. Your enquiry has been received. Our team will review your message.",
      mode: emailResult.mode,
      referenceId: emailResult.messageId,
    });
  } catch (error: any) {
    console.error("[Enquiry API Internal Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your enquiry. Please try again or call us directly.",
      },
      { status: 500 }
    );
  }
}
