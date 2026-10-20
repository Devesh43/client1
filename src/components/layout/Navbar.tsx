"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MAIN_NAV } from "@/config/navigation";
import { useEnquiry } from "@/context/EnquiryContext";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { COMPANY } from "@/config/company";

export function Navbar() {
  const pathname = usePathname();
  const { openEnquiry } = useEnquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-navy-900/95 backdrop-blur-md shadow-lg border-b border-gold-500/20 py-3"
            : "bg-navy-900 border-b border-navy-800 py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded"
              aria-label="Anvard Global Home"
            >
              <div className="relative h-12 w-48 sm:h-14 sm:w-56 transition-transform duration-200 group-hover:scale-[1.02]">
                <Image
                  src="/brand/logo-dark-bg.png"
                  alt="Anvard Global Private Limited"
                  fill
                  priority
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
              {MAIN_NAV.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-xs font-semibold uppercase tracking-widest transition-colors py-1 ${
                      isActive
                        ? "text-gold-400"
                        : "text-ivory/80 hover:text-gold-300"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gold-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: Direct Phone & Enquire Now Button */}
            <div className="hidden lg:flex items-center gap-5">
              <a
                href={`tel:${COMPANY.phoneTel}`}
                className="flex items-center gap-2 text-xs text-ivory/70 hover:text-gold-400 transition-colors"
                title={`Call ${COMPANY.phoneDisplay}`}
              >
                <Phone className="h-3.5 w-3.5 text-gold-500" />
                <span className="tracking-wide font-medium">{COMPANY.phoneDisplay}</span>
              </a>

              <button
                type="button"
                onClick={() => openEnquiry("General Enquiry")}
                className="inline-flex items-center gap-2 rounded bg-gold-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-navy-950 transition-all duration-200 hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(199,166,107,0.35)] active:scale-[0.98]"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-3">
              <button
                type="button"
                onClick={() => openEnquiry("General Enquiry")}
                className="rounded bg-gold-500 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-navy-950"
              >
                Enquire
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded p-2 text-ivory hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold-400"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-gold-400" />
                ) : (
                  <Menu className="h-6 w-6 text-ivory" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 top-[65px] z-30 bg-navy-950/95 backdrop-blur-lg md:hidden animate-in fade-in duration-200 flex flex-col justify-between p-6 border-b border-gold-500/20 overflow-y-auto"
        >
          <div className="space-y-6">
            <div className="text-[11px] font-bold uppercase tracking-widest text-gold-500/70">
              Corporate Navigation
            </div>
            <nav className="flex flex-col space-y-4">
              {MAIN_NAV.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-serif font-normal py-2 border-b border-navy-800/80 transition-colors flex items-center justify-between ${
                      isActive ? "text-gold-400" : "text-ivory hover:text-gold-300"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiry("General Enquiry");
                }}
                className="w-full inline-flex items-center justify-center gap-2 rounded bg-gold-500 py-3.5 text-xs font-bold uppercase tracking-wider text-navy-950 shadow-lg"
              >
                <span>Make an Enquiry</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-navy-800 space-y-3 text-xs text-text-muted">
            <div className="flex items-center gap-2 text-ivory">
              <Phone className="h-4 w-4 text-gold-500" />
              <a href={`tel:${COMPANY.phoneTel}`} className="hover:text-gold-400">
                {COMPANY.phoneDisplay}
              </a>
            </div>
            <div className="text-[11px] text-text-muted">
              {COMPANY.address.locality}, {COMPANY.address.city}
            </div>
            <div className="text-[10px] text-text-secondary">
              CIN: {COMPANY.cin}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
