"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TempleBackgroundProps {
  variant?: "hero" | "section" | "subtle";
  className?: string;
}

/** Temple silhouette, mandala rings, and ambient glow — premium sanctum backdrop */
export function TempleBackground({ variant = "section", className = "" }: TempleBackgroundProps) {
  const reduced = useReducedMotion();
  const isHero = variant === "hero";
  const isSubtle = variant === "subtle";

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* Warm sanctum gradient */}
      <div
        className={`absolute inset-0 ${
          isHero
            ? "bg-gradient-to-b from-maroon/90 via-brown/85 to-ivory"
            : isSubtle
              ? "bg-gradient-to-b from-ivory via-cream to-ivory-dark/30"
              : "bg-gradient-to-b from-cream via-ivory to-ivory-dark/40"
        }`}
      />

      {/* Golden light from above — like temple lamp */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(232,132,26,0.18),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_15%,rgba(255,215,0,0.12),transparent_60%)]" />

      {/* Torana arch pattern top */}
      {!isSubtle && (
        <svg
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl text-gold/15"
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
          {[160, 240, 320, 400, 480, 560, 640].map((x) => (
            <circle key={x} cx={x} cy={80 - Math.abs(400 - x) * 0.08} r="3" fill="currentColor" opacity="0.5" />
          ))}
        </svg>
      )}

      {/* Rotating mandala */}
      {!isSubtle && (
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,600px)] h-[min(90vw,600px)] opacity-[0.07]"
          animate={reduced ? undefined : { rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        >
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
            {[40, 70, 100, 130, 160].map((r) => (
              <circle key={r} cx="200" cy="200" r={r} stroke="currentColor" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 24 }).map((_, i) => {
              const deg = i * 15;
              const rad = (deg * Math.PI) / 180;
              return (
                <circle
                  key={`d-${i}`}
                  cx={200 + 120 * Math.cos(rad)}
                  cy={200 + 120 * Math.sin(rad)}
                  r="4"
                  fill="currentColor"
                />
              );
            })}
          </svg>
        </motion.div>
      )}

      {/* Temple silhouette — bottom */}
      {!isSubtle && (
        <svg
          className={`absolute bottom-0 left-0 right-0 w-full text-brown/10 ${isHero ? "h-48 sm:h-64" : "h-32 sm:h-40"}`}
          viewBox="0 0 1200 200"
          preserveAspectRatio="xMidYMax meet"
          fill="currentColor"
        >
          {/* Central shikhara */}
          <path d="M520 200 L560 80 L580 40 L600 0 L620 40 L640 80 L680 200 Z" opacity="0.9" />
          <path d="M540 200 L600 60 L660 200 Z" opacity="0.5" />
          {/* Left dome */}
          <ellipse cx="380" cy="160" rx="60" ry="40" opacity="0.7" />
          <rect x="340" y="160" width="80" height="40" opacity="0.7" />
          <path d="M360 160 Q380 100 400 160" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          {/* Right dome */}
          <ellipse cx="820" cy="160" rx="60" ry="40" opacity="0.7" />
          <rect x="780" y="160" width="80" height="40" opacity="0.7" />
          <path d="M800 160 Q820 100 840 160" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          {/* Pillars */}
          {[200, 280, 920, 1000].map((x) => (
            <g key={x}>
              <rect x={x} y="120" width="20" height="80" opacity="0.6" />
              <rect x={x - 4} y="115" width="28" height="8" rx="2" opacity="0.5" />
            </g>
          ))}
          {/* Base platform */}
          <rect x="0" y="190" width="1200" height="10" opacity="0.4" />
        </svg>
      )}

      {/* Incense smoke wisps */}
      {!reduced && !isSubtle && (
        <>
          {[15, 45, 75].map((left, i) => (
            <motion.div
              key={left}
              className="absolute bottom-24 w-16 h-24 rounded-full bg-gradient-to-t from-gold/5 to-transparent blur-xl"
              style={{ left: `${left}%` }}
              animate={{
                y: [0, -60, -120],
                opacity: [0, 0.4, 0],
                scale: [0.8, 1.2, 1.5],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 2.5,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 bg-temple-dots opacity-60" />
      {isHero && <div className="absolute inset-0 bg-spiritual-pattern opacity-20" />}
    </div>
  );
}
