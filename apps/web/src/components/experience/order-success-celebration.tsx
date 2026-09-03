"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { buildLocalizedPath } from "@puja/config";
import type { CountryConfig } from "@puja/types";
import { Button } from "@puja/ui";
import { TempleBackground } from "@/components/ui/temple-background";
import { duration, ease } from "@/lib/motion";
import { useExperience } from "./experience-provider";

interface OrderSuccessCelebrationProps {
  order?: string;
  country: CountryConfig;
}

export function OrderSuccessCelebration({ order, country }: OrderSuccessCelebrationProps) {
  const { celebrateOrder } = useExperience();
  const reduced = useReducedMotion();
  const prefix = (path: string) => buildLocalizedPath(path, country);

  useEffect(() => {
    if (!order) return;
    const key = `mypavitra-celebrated-order-${order}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "true");
    celebrateOrder();
  }, [order, celebrateOrder]);

  const enter = reduced
    ? undefined
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <div className="relative flex min-h-[70vh] items-center overflow-hidden">
      <TempleBackground variant="hero" className="opacity-40" />

      <div className="container-main relative z-10 mx-auto max-w-xl py-16 text-center">
        <motion.div
          {...(enter ?? {})}
          transition={{ duration: duration.slow, ease: ease.out, delay: 0.05 }}
          className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-brass/90 text-4xl text-cream shadow-lg"
        >
          🙏
        </motion.div>

        <motion.p
          {...(enter ?? {})}
          transition={{ duration: duration.slow, ease: ease.out, delay: 0.12 }}
          className="mt-8 font-devanagari text-lg tracking-widest text-saffron"
        >
          शुभम् · आशीर्वाद स्वीकार करें
        </motion.p>

        <motion.h1
          {...(enter ?? {})}
          transition={{ duration: duration.slow, ease: ease.out, delay: 0.2 }}
          className="mt-3 font-display text-3xl text-brown sm:text-4xl"
        >
          Your order is confirmed
        </motion.h1>

        <motion.p
          {...(enter ?? {})}
          transition={{ duration: duration.medium, ease: ease.out, delay: 0.28 }}
          className="mt-4 leading-relaxed text-brown-light"
        >
          Your puja essentials are on their way. May they bring peace and devotion to your home.
        </motion.p>

        {order && (
          <motion.div
            {...(enter ?? {})}
            transition={{ duration: duration.medium, ease: ease.out, delay: 0.36 }}
            className="mt-8 inline-block rounded-lg px-6 py-3 ornate-card"
          >
            <p className="text-xs uppercase tracking-wider text-brown-light">Order number</p>
            <p className="mt-1 font-mono text-lg font-semibold text-brown">{order}</p>
          </motion.div>
        )}

        <motion.div
          {...(enter ?? {})}
          transition={{ duration: duration.medium, ease: ease.out, delay: 0.44 }}
          className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"
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
