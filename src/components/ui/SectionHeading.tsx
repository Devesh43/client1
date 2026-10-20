import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  theme = "light",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`max-w-3xl ${
        isCenter ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {eyebrow && (
        <div className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-600">
          {isCenter && <span className="h-px w-6 bg-gold-500/50" />}
          <span>{eyebrow}</span>
          <span className="h-px w-6 bg-gold-500/50" />
        </div>
      )}
      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.18] ${
          isDark ? "text-ivory" : "text-navy-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isDark ? "text-text-muted" : "text-text-secondary"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
