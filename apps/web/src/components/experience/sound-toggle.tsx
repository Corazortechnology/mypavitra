"use client";

import { Bell, BellOff } from "lucide-react";
import { motion } from "framer-motion";
import { useExperience } from "./experience-provider";

export function SoundToggle() {
  const { soundEnabled, toggleSound } = useExperience();

  return (
    <motion.button
      type="button"
      onClick={toggleSound}
      whileTap={{ scale: 0.92 }}
      className="p-2 text-brown hover:text-saffron hover:bg-saffron/5 rounded-lg transition-colors border border-transparent hover:border-gold/20"
      aria-label={soundEnabled ? "Mute temple sounds" : "Enable temple sounds"}
      title={soundEnabled ? "Mute sounds" : "Enable sounds"}
    >
      {soundEnabled ? (
        <Bell className="w-5 h-5" />
      ) : (
        <BellOff className="w-5 h-5 text-brown-light" />
      )}
    </motion.button>
  );
}
