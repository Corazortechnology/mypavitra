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
        <p className="font-devanagari text-saffron/80 text-sm tracking-[0.25em] mb-2" aria-hidden>
          ॐ शुभम्
        </p>
      )}
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-brown tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-2 text-brown-light text-sm sm:text-base max-w-xl leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
      {ornament && (
        <div className={`divider-ornament mt-5 max-w-xs ${align === "center" ? "mx-auto" : ""}`}>
          <span className="text-gold text-xl animate-diya-flicker inline-block">✦</span>
        </div>
      )}
    </div>
  );
}
