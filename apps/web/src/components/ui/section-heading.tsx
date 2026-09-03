interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  ornament?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  ornament = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {ornament && (
        <p
          className="mb-2 font-devanagari text-sm tracking-[0.25em] text-saffron/70"
          aria-hidden
        >
          ॐ शुभम्
        </p>
      )}
      <h2 className="font-display text-2xl tracking-tight text-brown sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-2 max-w-xl text-sm sm:text-base leading-relaxed text-muted ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
      {ornament && (
        <div
          className={`divider-ornament mt-5 max-w-xs ${align === "center" ? "mx-auto" : ""}`}
        >
          <span className="inline-block text-lg text-gold/70" aria-hidden>
            ✦
          </span>
        </div>
      )}
    </div>
  );
}
