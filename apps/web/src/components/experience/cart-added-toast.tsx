"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { duration, ease } from "@/lib/motion";

export function CartAddedToast({ show, message }: { show: boolean; message?: string }) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: duration.medium, ease: ease.out }}
          className="fixed bottom-6 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-3 rounded-lg bg-temple px-5 py-3 text-cream shadow-lg ring-1 ring-brass/25"
          role="status"
        >
          <ShoppingBag className="h-4 w-4 text-brass" aria-hidden />
          <p className="text-sm font-medium">{message ?? "Added to cart"}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
