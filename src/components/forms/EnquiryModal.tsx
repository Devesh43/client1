"use client";

import React, { useEffect } from "react";
import { useEnquiry } from "@/context/EnquiryContext";
import { EnquiryForm } from "./EnquiryForm";
import { X, ShieldCheck } from "lucide-react";
import Image from "next/image";

export function EnquiryModal() {
  const { isOpen, closeEnquiry, selectedService } = useEnquiry();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeEnquiry();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeEnquiry]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={closeEnquiry}
        className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-xl border border-gold-500/30 bg-ivory shadow-2xl transition-all animate-in zoom-in-95 duration-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header Strip */}
        <div className="bg-navy-900 px-6 py-5 text-ivory flex items-center justify-between border-b border-gold-500/20">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 relative shrink-0">
              <Image
                src="/brand/emblem-dark-bg.png"
                alt="Anvard Global Emblem"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold">
                Anvard Global Pvt. Ltd.
              </div>
              <h2 id="enquiry-modal-title" className="font-serif text-lg font-light text-ivory">
                Start a Business Conversation
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={closeEnquiry}
            aria-label="Close enquiry modal"
            className="rounded-full p-1.5 text-text-muted hover:bg-navy-800 hover:text-ivory transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto px-6 py-6 space-y-4">
          <div className="flex items-center gap-2 text-xs text-text-secondary bg-ivory-warm p-2.5 rounded border border-border-light">
            <ShieldCheck className="h-4 w-4 text-gold-600 shrink-0" />
            <span>Direct channel to company director and strategic advisory team.</span>
          </div>

          <EnquiryForm
            defaultService={selectedService}
            onSuccess={closeEnquiry}
            isCompact={true}
          />
        </div>
      </div>
    </div>
  );
}
