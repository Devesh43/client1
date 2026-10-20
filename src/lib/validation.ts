import { z } from "zod";

// Indian phone number regex: accepts optional +91 or 91 or 0 prefix followed by 10 digits starting with 6, 7, 8, or 9
// Also permits formatted spaces or dashes: e.g. +91 80104 16869 or 8010416869
const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{2}([ -]?)\d{3}([ -]?)\d{4}$/;

export const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters")
    .regex(/^[\p{L}\s.'-]+$/u, "Please enter a valid full name"),
  email: z
    .string({ error: "Please enter your email address" })
    .trim()
    .min(1, "Please enter your email address")
    .max(254, "Email address is too long")
    .regex(/^[^\r\n\t]+$/, "Please enter a valid email address")
    .pipe(z.email("Please enter a valid email address")),
  phoneNumber: z
    .string()
    .trim()
    .min(10, "Please enter a valid telephone number")
    .max(18, "Telephone number is too long")
    .refine(
      (val) => {
        const cleaned = val.replace(/[\s\-()]/g, "");
        return indianPhoneRegex.test(cleaned) || /^\+?[0-9]{10,15}$/.test(cleaned);
      },
      {
        message: "Please enter a valid 10-digit Indian mobile number (e.g., +91 80104 16869)",
      }
    ),
  serviceInterestedIn: z
    .enum([
      "Business Strategy",
      "Operations Consulting",
      "Business Advisory",
      "Growth Opportunities",
      "General Enquiry",
    ])
    .default("General Enquiry"),
  query: z
    .string()
    .trim()
    .min(10, "Your enquiry must be at least 10 characters long")
    .max(1500, "Enquiry must not exceed 1,500 characters"),
  // Honeypot field to trap spam bots; human users never fill this
  website: z.string().max(0, "Spam detected").optional().default(""),
});

export type EnquiryFormData = z.infer<typeof enquirySchema>;
