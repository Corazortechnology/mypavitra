interface TempleBackgroundProps {
  variant?: "hero" | "section" | "subtle";
  className?: string;
}

/**
 * Static sanctum backdrop — no infinite rotation or smoke loops.
 * Motion belongs to content, not wallpaper.
 */
export function TempleBackground({
  variant = "section",
  className = "",
}: TempleBackgroundProps) {
  const isHero = variant === "hero";
  const isSubtle = variant === "subtle";

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className={`absolute inset-0 ${
          isHero
            ? "bg-gradient-to-b from-maroon/90 via-brown/85 to-ivory"
            : isSubtle
              ? "bg-gradient-to-b from-ivory via-cream to-ivory-dark/30"
              : "bg-gradient-to-b from-cream via-ivory to-ivory-dark/40"
        }`}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(176,141,87,0.12),transparent_65%)]" />

      {!isSubtle && (
        <svg
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl text-gold/12"
          viewBox="0 0 800 120"
          fill="none"
          preserveAspectRatio="xMidYMin meet"
        >
          <path
            d="M0 120 Q400 -20 800 120"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M80 120 Q400 40 720 120"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            opacity="0.6"
          />
        </svg>
      )}

      {/* Still mandala — geometry without spin */}
      {!isSubtle && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,600px)] h-[min(90vw,600px)] opacity-[0.05]">
          <svg viewBox="0 0 400 400" fill="none" className="w-full h-full text-gold">
            {Array.from({ length: 12 }).map((_, i) => {
              const deg = i * 30;
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1="200"
                  y1="200"
                  x2={200 + 180 * Math.cos(rad)}
                  y2={200 + 180 * Math.sin(rad)}
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              );
            })}
            {[40, 80, 120, 160].map((r) => (
              <circle
                key={r}
                cx="200"
                cy="200"
                r={r}
                stroke="currentColor"
                strokeWidth="0.5"
              />
            ))}
          </svg>
        </div>
      )}

      {!isSubtle && (
        <svg
          className={`absolute bottom-0 left-0 right-0 w-full text-brown/8 ${
            isHero ? "h-48 sm:h-64" : "h-32 sm:h-40"
          }`}
          viewBox="0 0 1200 200"
          preserveAspectRatio="xMidYMax meet"
          fill="currentColor"
        >
          <path d="M520 200 L560 80 L580 40 L600 0 L620 40 L640 80 L680 200 Z" opacity="0.9" />
          <ellipse cx="380" cy="160" rx="60" ry="40" opacity="0.7" />
          <rect x="340" y="160" width="80" height="40" opacity="0.7" />
          <ellipse cx="820" cy="160" rx="60" ry="40" opacity="0.7" />
          <rect x="780" y="160" width="80" height="40" opacity="0.7" />
          <rect x="0" y="190" width="1200" height="10" opacity="0.4" />
        </svg>
      )}

      <div className="absolute inset-0 bg-temple-dots opacity-40" />
    </div>
  );
}
