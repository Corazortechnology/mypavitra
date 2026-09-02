"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { MandalaBg } from "@/components/ui/mandala-bg";
import { hasSeenTempleEntry, markTempleEntrySeen } from "@/lib/experience/sounds";
import { useExperience } from "./experience-provider";

const PETAL_COLORS = ["#FF9933", "#FFD700", "#FF6600", "#FFE4B5", "#E8841A", "#FFF8DC"];

function Petal({ index }: { index: number }) {
  const reduced = useReducedMotion();
  const config = useMemo(() => {
    const left = Math.random() * 100;
    const size = 12 + Math.random() * 20;
    const duration = 4 + Math.random() * 4;
    const delay = Math.random() * 2;
    const rotate = Math.random() * 360;
    const color = PETAL_COLORS[index % PETAL_COLORS.length]!;
    const drift = (Math.random() - 0.5) * 120;
    return { left, size, duration, delay, rotate, color, drift };
  }, [index]);

  if (reduced) return null;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${config.left}%`,
        top: -20,
        width: config.size,
        height: config.size * 1.4,
      }}
      initial={{ y: -40, opacity: 0, rotate: config.rotate }}
      animate={{
        y: "110vh",
        opacity: [0, 1, 1, 0.6, 0],
        rotate: config.rotate + 360 + config.drift,
        x: [0, config.drift * 0.5, config.drift],
      }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: Math.random() * 1.5,
      }}
    >
      <svg viewBox="0 0 20 28" className="w-full h-full drop-shadow-sm">
        <ellipse cx="10" cy="14" rx="8" ry="12" fill={config.color} opacity="0.85" />
        <ellipse cx="10" cy="10" rx="4" ry="6" fill="white" opacity="0.25" />
      </svg>
    </motion.div>
  );
}

export function FlowerRain({ active, onComplete }: { active: boolean; onComplete?: () => void }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(active);

  useEffect(() => {
    if (active) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  if (reduced || !visible) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden" aria-hidden>
      {Array.from({ length: 55 }).map((_, i) => (
        <Petal key={i} index={i} />
      ))}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`fl-${i}`}
          className="absolute text-2xl sm:text-3xl"
          style={{ left: `${8 + i * 8}%`, top: -30 }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: "105vh",
            opacity: [0, 1, 1, 0],
            rotate: 180 + i * 30,
          }}
          transition={{
            duration: 5 + (i % 4),
            delay: i * 0.15,
            ease: "easeIn",
          }}
        >
          {i % 3 === 0 ? "🌼" : i % 3 === 1 ? "🏵️" : "✿"}
        </motion.span>
      ))}
    </div>
  );
}

interface TempleEntryOverlayProps {
  onEntered: () => void;
}

export function TempleEntryOverlay({ onEntered }: TempleEntryOverlayProps) {
  const { playBell } = useExperience();
  const reduced = useReducedMotion();
  const [leaving, setLeaving] = useState(false);

  function enter(withBell: boolean) {
    markTempleEntrySeen();
    if (withBell) playBell();
    setLeaving(true);
  }

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={leaving ? { opacity: 0 } : { opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (leaving) onEntered();
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-maroon via-brown to-brown/95" />
      <MandalaBg className="w-[min(100vw,700px)] h-[min(100vw,700px)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 animate-mandala-spin" />
      <div className="absolute inset-0 bg-spiritual-pattern opacity-15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(232,132,26,0.25),transparent)]" />

      <motion.div
        className="relative z-10 text-center px-6 max-w-lg"
        initial={reduced ? false : { opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className="text-5xl sm:text-6xl block mb-6"
          animate={reduced ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🛕
        </motion.span>

        <p className="font-devanagari text-saffron-light tracking-[0.35em] text-sm sm:text-base mb-3">
          ॐ शान्तिः शान्तिः शान्तिः
        </p>

        <h1 className="font-display text-3xl sm:text-4xl text-cream leading-tight">
          Welcome to MyPavitra
        </h1>
        <p className="mt-4 text-cream/75 text-sm sm:text-base leading-relaxed">
          Step into a sacred space of authentic puja essentials — where tradition meets trust.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            type="button"
            onClick={() => enter(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn-shine px-8 py-4 rounded-xl bg-gradient-to-r from-saffron to-gold text-white font-semibold shadow-xl shadow-saffron/30 ring-2 ring-gold/30"
          >
            🔔 Enter with Blessing
          </motion.button>
          <motion.button
            type="button"
            onClick={() => enter(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-xl border border-cream/30 text-cream/90 font-medium hover:bg-white/10 transition-colors"
          >
            Enter quietly
          </motion.button>
        </div>

        <p className="mt-6 text-xs text-cream/40">
          Temple bell plays once · You can mute sounds anytime from the header
        </p>
      </motion.div>
    </motion.div>
  );
}

export function TempleEntryGate() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!hasSeenTempleEntry()) {
      setShow(true);
    }
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && <TempleEntryOverlay onEntered={() => setShow(false)} />}
    </AnimatePresence>
  );
}
