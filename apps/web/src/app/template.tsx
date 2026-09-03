"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { duration, ease } from "@/lib/motion";

/** Soft route dissolve — opacity only, never blocks navigation feel */
export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: duration.medium, ease: ease.inOut }}
    >
      {children}
    </motion.div>
  );
}
