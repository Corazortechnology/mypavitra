"use client";

import { motion, useReducedMotion } from "framer-motion";

const DIYAS = [
  { emoji: "🪔", top: "12%", left: "8%", delay: 0, size: "text-2xl" },
  { emoji: "✨", top: "22%", right: "10%", delay: 1.2, size: "text-lg" },
  { emoji: "🪔", top: "55%", left: "4%", delay: 0.6, size: "text-xl" },
  { emoji: "📿", top: "68%", right: "6%", delay: 2, size: "text-lg" },
  { emoji: "🪔", bottom: "18%", left: "15%", delay: 1.8, size: "text-xl" },
  { emoji: "✨", bottom: "25%", right: "12%", delay: 0.3, size: "text-sm" },
];

interface FloatingDiyasProps {
  className?: string;
  count?: number;
}

export function FloatingDiyas({ className = "", count = 6 }: FloatingDiyasProps) {
  const reduced = useReducedMotion();
  const items = DIYAS.slice(0, count);

  if (reduced) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {items.map((diya, i) => (
        <motion.span
          key={i}
          className={`absolute ${diya.size} filter drop-shadow-[0_0_12px_rgba(232,132,26,0.5)]`}
          style={{
            top: diya.top,
            left: diya.left,
            right: diya.right,
            bottom: diya.bottom,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: diya.delay,
            ease: "easeInOut",
          }}
        >
          {diya.emoji}
        </motion.span>
      ))}
    </div>
  );
}
