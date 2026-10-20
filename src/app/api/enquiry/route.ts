import { after, NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validation";
import {
  generateReferenceId,
  sendEnquiryNotification,
  sendEnquirerAcknowledgement,
} from "@/lib/email";

export const maxDuration = 30;

// In-memory rate limiting map: IP -> array of timestamps.
// This is per-instance and resets on cold starts; see the PRD for the
// durable rate-limiting follow-up.
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const MAX_RATE_LIMIT_ENTRIES = 5_000;
const MAX_BODY_BYTES = 10_000;

function pruneRateLimitMap(now: number): void {
  if (rateLimitMap.size <= MAX_RATE_LIMIT_ENTRIES) return;

  for (const [key, timestamps] of rateLimitMap) {
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length === 0) {
      rateLimitMap.delete(key);
    } else {
      rateLimitMap.set(key, recent);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  pruneRateLimitMap(now);

  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = req.headers.get("x-real-ip")?.trim();
  return (forwarded || realIp || "127.0.0.1").slice(0, 100);
}

const CONTACT_FALLBACK =
  "Please reach us directly at Anvardglobal@gmail.com or call +91 8010416869.";

export async function POST(req: NextRequest) {
  try {
    // 1. IP rate limiting
    const ip = getClientIp(req);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Too many enquiries submitted from this network. Please wait a few minutes before trying again or contact us directly by phone.",
        },
        { status: 429 }
      );
    }

    // 2. Reject oversized payloads before parsing
    const contentLength = Number(req.headers.get("content-length") || "0");
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { success: false, error: "Request payload is too large." },
        { status: 413 }
      );
    }

    // 3. Parse body safely
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: "Invalid submission data" },
        { status: 400 }
      );
    }

    const payload = body as Record<string, unknown>;

    // 4. Honeypot spam trap
    if (
      typeof payload.website === "string" &&
      payload.website.trim().length > 0
    ) {
      // Return synthetic success so automated bots do not retry.
      console.warn(`[Anti-Spam] Honeypot triggered by IP ${ip}`);
      return NextResponse.json({
        success: true,
        message:
          "Thank you for reaching out. Your enquiry has been received. Our team will review your message.",
      });
    }

    // 5. Server-side Zod validation
    const validationResult = enquirySchema.safeParse(payload);
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
    const submittedAt = new Date();
    const referenceId = generateReferenceId(submittedAt);
    const userAgent = (req.headers.get("user-agent") || "").slice(0, 500);
    const source = (req.headers.get("referer") || "Website enquiry form").slice(
      0,
      500
    );

    const emailParams = {
      referenceId,
      fullName: validData.fullName,
      email: validData.email,
      phoneNumber: validData.phoneNumber,
      serviceInterestedIn: validData.serviceInterestedIn,
      query: validData.query,
      submittedAt,
      ipAddress: ip,
      userAgent: userAgent || undefined,
      source,
    };

    // 6. The team notification is the blocking requirement. If it fails,
    // the visitor must not be told the enquiry was received.
    const notification = await sendEnquiryNotification(emailParams);

    if (!notification.success) {
      const status = notification.errorCode === "ECONFIG" ? 503 : 502;
      const error =
        notification.errorCode === "ECONFIG"
          ? `Our email service is temporarily unavailable. ${CONTACT_FALLBACK}`
          : `Our automated notification system is currently experiencing a temporary issue. ${CONTACT_FALLBACK}`;

      return NextResponse.json({ success: false, error }, { status });
    }

    // 7. The acknowledgement is best-effort and runs after the response.
    // A failure here must not lose the enquiry or fail the request.
    after(async () => {
      try {
        const acknowledgement = await sendEnquirerAcknowledgement(emailParams);
        if (!acknowledgement.success && !acknowledgement.skipped) {
          console.warn(
            `[Enquiry ${referenceId}] Acknowledgement not delivered: ${
              acknowledgement.errorCode || "unknown error"
            }`
          );
        }
      } catch (error) {
        console.error(
          `[Enquiry ${referenceId}] Acknowledgement dispatch failed:`,
          error
        );
      }
    });

    return NextResponse.json({
      success: true,
      message:
        "Thank you for reaching out. Your enquiry has been received. Our team will review your message.",
      referenceId,
    });
  } catch (error: unknown) {
    console.error("[Enquiry API Internal Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: `An unexpected error occurred while processing your enquiry. ${CONTACT_FALLBACK}`,
      },
      { status: 500 }
    );
  }
}
