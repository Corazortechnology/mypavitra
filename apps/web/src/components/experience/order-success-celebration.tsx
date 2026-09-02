"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { buildLocalizedPath } from "@puja/config";
import type { CountryConfig } from "@puja/types";
import { Button } from "@puja/ui";
import { TempleBackground } from "@/components/ui/temple-background";
import { useExperience } from "./experience-provider";

interface OrderSuccessCelebrationProps {
  order?: string;
  country: CountryConfig;
}

export function OrderSuccessCelebration({ order, country }: OrderSuccessCelebrationProps) {
  const { celebrateOrder } = useExperience();
  const prefix = (path: string) => buildLocalizedPath(path, country);

  useEffect(() => {
    if (!order) return;
    const key = `mypavitra-celebrated-order-${order}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "true");
    celebrateOrder();
  }, [order, celebrateOrder]);

  return (
    <div className="relative min-h-[70vh] flex items-center overflow-hidden">
      <TempleBackground variant="hero" className="opacity-40" />

      <div className="container-main relative z-10 py-16 max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="inline-flex w-24 h-24 rounded-full bg-gradient-to-br from-saffron to-gold items-center justify-center text-5xl shadow-2xl shadow-saffron/40 ring-4 ring-gold/30"
          >
            🙏
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-devanagari text-saffron text-lg mt-8 tracking-widest"
          >
            शुभम् · आशीर्वाद स्वीकार करें
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="font-display text-3xl sm:text-4xl text-brown mt-3"
          >
            Your order is blessed!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-4 text-brown-light leading-relaxed"
          >
            Your puja essentials are on their way. May they bring peace, prosperity, and devotion
            to your home.
          </motion.p>

          {order && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="mt-8 inline-block px-6 py-3 rounded-xl ornate-card"
            >
              <p className="text-xs text-brown-light uppercase tracking-wider">Order number</p>
              <p className="font-mono font-semibold text-brown text-lg mt-1">{order}</p>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-sm text-brown-light"
          >
            Confirmation email sent with full details.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href={prefix("/categories")}>
              <Button size="lg">Continue Shopping</Button>
            </Link>
            <Link href={prefix("/")}>
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
          </motion.div>
      </div>
    </div>
  );
}
