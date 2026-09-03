interface TempleArchFrameProps {
  children: React.ReactNode;
  className?: string;
}

/** Ornate torana-style frame around hero / featured imagery */
export function TempleArchFrame({ children, className = "" }: TempleArchFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Soft outer ring — static, no pulse */}
      <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-saffron/20 via-gold/15 to-maroon/15 blur-xl opacity-50" />

      {/* Gold ornamental border */}
      <div className="relative p-[3px] rounded-[1.75rem] bg-gradient-to-br from-gold via-saffron-light to-gold shadow-2xl shadow-saffron/20">
        <div className="relative p-[2px] rounded-[1.65rem] bg-gradient-to-br from-gold-light/80 via-cream to-gold-light/60">
          <div className="relative rounded-[1.5rem] overflow-hidden bg-cream ring-1 ring-gold/30">
            {children}
          </div>
        </div>
      </div>

      {/* Corner ornaments */}
      {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((corner) => (
        <span
          key={corner}
          className={`absolute w-6 h-6 text-gold/70 text-lg leading-none ${
            corner === "top-left"
              ? "top-0 left-0 -translate-x-1 -translate-y-1"
              : corner === "top-right"
                ? "top-0 right-0 translate-x-1 -translate-y-1"
                : corner === "bottom-left"
                  ? "bottom-0 left-0 -translate-x-1 translate-y-1"
                  : "bottom-0 right-0 translate-x-1 translate-y-1"
          }`}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
