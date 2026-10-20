import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-xl px-4 sm:px-6 text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-900 text-gold-400">
          <Compass className="h-8 w-8 stroke-[1.5]" />
        </div>

        <div className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
          Error 404 &bull; Page Not Found
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-navy-950">
          The Requested Page Does Not Exist
        </h1>

        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          The URL you are attempting to access may have been moved, renamed, or is temporarily unavailable. Please return to our homepage or explore our core advisory areas.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded bg-navy-900 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-ivory hover:bg-navy-850 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-gold-400" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded border border-border-light bg-white px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-navy-950 hover:border-gold-500 transition-colors"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
