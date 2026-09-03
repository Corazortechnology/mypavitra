"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { duration, ease, revealViewport } from "@/lib/motion";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Prefer opacity-only. Use "up" sparingly for primary editorial blocks. */
  direction?: "up" | "none";
  /** slow = storytelling; medium = section chrome */
  pace?: "medium" | "slow";
}

/**
 * Reserved for primary section moments — not every card in a grid.
 * Default travel is minimal; stillness is preferred for supporting UI.
 */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "none",
  pace = "slow",
}: FadeInProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const y = direction === "up" ? 12 : 0;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{
        duration: pace === "medium" ? duration.medium : duration.slow,
        delay,
        ease: ease.out,
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  /** Keep low — supporting grids should not feel like a cascade */
  stagger?: number;
}

export function StaggerGrid({
  children,
  className = "",
  stagger = 0.04,
}: StaggerGridProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: duration.medium, ease: ease.out },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
