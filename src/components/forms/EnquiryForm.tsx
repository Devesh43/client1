"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { enquirySchema, type EnquiryFormData } from "@/lib/validation";
import { SERVICE_OPTIONS } from "@/config/services";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

interface EnquiryFormProps {
  defaultService?: string;
  onSuccess?: () => void;
  className?: string;
  isCompact?: boolean;
}

export function EnquiryForm({
  defaultService = "General Enquiry",
  onSuccess,
  className = "",
  isCompact = false,
}: EnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      serviceInterestedIn: (SERVICE_OPTIONS.includes(defaultService as any)
        ? defaultService
        : "General Enquiry") as any,
      query: "",
      website: "", // Honeypot trap
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    // Client-side Zod validation pass
    const parsed = enquirySchema.safeParse(data);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Please correct the highlighted fields.";
      setSubmitError(firstError);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit enquiry. Please try again.");
      }

      setSubmitSuccess(result.message || "Thank you for reaching out. Your enquiry has been received. Our team will review your message.");
      reset();
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2500);
      }
    } catch (err: any) {
      console.error("[Form Submit Error]:", err);
      setSubmitError(
        err.message ||
          "Unable to send enquiry at this moment. Please call us directly at +91 8010416869 or email Anvardglobal@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="rounded-lg border border-gold-500/40 bg-navy-950 p-8 text-center text-ivory shadow-xl animate-in fade-in zoom-in-95 duration-300">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10 text-gold-400">
          <CheckCircle2 className="h-8 w-8 text-gold-500" />
        </div>
        <h4 className="font-serif text-2xl font-light text-ivory">Enquiry Received</h4>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          {submitSuccess}
        </p>
        <p className="mt-4 text-xs tracking-wider uppercase text-gold-500 font-semibold">
          Anvard Global Private Limited
        </p>
        <button
          type="button"
          onClick={() => setSubmitSuccess(null)}
          className="mt-6 inline-flex items-center text-xs text-text-muted hover:text-gold-400 transition-colors underline underline-offset-4"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-5 ${className}`}
      noValidate
    >
      {submitError && (
        <div className="flex items-start gap-3 rounded-md border border-red-500/30 bg-red-950/20 p-4 text-sm text-red-200">
          <AlertCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-red-300">Submission Notice</p>
            <p className="mt-0.5 text-xs text-red-200/90 leading-relaxed">{submitError}</p>
          </div>
        </div>
      )}

      {/* Honeypot field hidden from real humans */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave blank</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5"
        >
          Full Name <span className="text-gold-600">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          placeholder="e.g. Ankit Sharma"
          autoComplete="name"
          disabled={isSubmitting}
          {...register("fullName")}
          className={`w-full rounded border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 ${
            errors.fullName
              ? "border-red-400 bg-red-50/30 text-navy-900 focus:border-red-500 focus:ring-red-500"
              : "border-border-light bg-white text-navy-900 placeholder:text-text-muted/60 focus:border-gold-500 focus:ring-gold-500"
          }`}
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5"
        >
          Phone Number (India / International) <span className="text-gold-600">*</span>
        </label>
        <input
          id="phoneNumber"
          type="tel"
          placeholder="e.g. +91 80104 16869 or 9876543210"
          autoComplete="tel"
          disabled={isSubmitting}
          {...register("phoneNumber")}
          className={`w-full rounded border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 ${
            errors.phoneNumber
              ? "border-red-400 bg-red-50/30 text-navy-900 focus:border-red-500 focus:ring-red-500"
              : "border-border-light bg-white text-navy-900 placeholder:text-text-muted/60 focus:border-gold-500 focus:ring-gold-500"
          }`}
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-xs text-red-600">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* Service Interested In */}
      <div>
        <label
          htmlFor="serviceInterestedIn"
          className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5"
        >
          Service Focus Area <span className="text-text-muted font-normal lowercase">(optional)</span>
        </label>
        <select
          id="serviceInterestedIn"
          disabled={isSubmitting}
          {...register("serviceInterestedIn")}
          className="w-full rounded border border-border-light bg-white px-3.5 py-2.5 text-sm text-navy-900 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Query */}
      <div>
        <label
          htmlFor="query"
          className="block text-xs font-semibold uppercase tracking-wider text-navy-900 mb-1.5"
        >
          Your Business Query <span className="text-gold-600">*</span>
        </label>
        <textarea
          id="query"
          rows={isCompact ? 3 : 4}
          placeholder="Please describe your organization's challenges, growth objectives, or areas of inquiry..."
          disabled={isSubmitting}
          {...register("query")}
          className={`w-full rounded border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-1 ${
            errors.query
              ? "border-red-400 bg-red-50/30 text-navy-900 focus:border-red-500 focus:ring-red-500"
              : "border-border-light bg-white text-navy-900 placeholder:text-text-muted/60 focus:border-gold-500 focus:ring-gold-500"
          }`}
        />
        {errors.query && (
          <p className="mt-1 text-xs text-red-600">{errors.query.message}</p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded bg-navy-900 px-6 py-3.5 text-sm font-semibold text-ivory tracking-wider uppercase transition-all duration-200 hover:bg-navy-850 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 border border-gold-500/30"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-gold-400" />
              <span>Transmitting Enquiry...</span>
            </>
          ) : (
            <>
              <span>Submit Business Enquiry</span>
              <ArrowRight className="h-4 w-4 text-gold-400" />
            </>
          )}
        </button>
      </div>

      <p className="text-center text-[11px] text-text-secondary leading-relaxed">
        Confidentiality guaranteed. Details are shared strictly with Anvard Global&apos;s advisory leadership.
      </p>
    </form>
  );
}
