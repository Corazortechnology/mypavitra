"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export function CartAddedToast({ show, message }: { show: boolean; message?: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] px-5 py-3 rounded-xl bg-gradient-to-r from-brown to-maroon text-cream shadow-2xl shadow-brown/30 ring-1 ring-gold/30 flex items-center gap-3"
          role="status"
        >
          <span className="text-xl animate-diya-flicker">🪔</span>
          <div>
            <p className="text-sm font-medium">{message ?? "Added to your puja cart"}</p>
            <p className="text-xs text-cream/70 font-devanagari">शुभम्</p>
          </div>
          <ShoppingBag className="w-4 h-4 text-saffron-light ml-1" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
