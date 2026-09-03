"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { duration, ease } from "@/lib/motion";

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

/**
 * Masked line reveal for primary editorial moments only.
 */
export function RevealText({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealTextProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag className={`overflow-hidden ${className}`.trim()}>
      <motion.span
        className="block"
        initial={{ y: "105%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: duration.cinematic, delay, ease: ease.cinematic }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
