"use client";

import { Bell, BellOff } from "lucide-react";
import { useExperience } from "./experience-provider";

export function SoundToggle() {
  const { soundEnabled, toggleSound } = useExperience();

  return (
    <button
      type="button"
      onClick={toggleSound}
      className="rounded-lg border border-transparent p-2 text-brown transition-colors duration-[var(--duration-fast)] hover:border-gold/20 hover:bg-saffron/5 hover:text-saffron active:scale-[0.97] motion-reduce:active:scale-100"
      aria-label={soundEnabled ? "Mute temple sounds" : "Enable temple sounds"}
      title={soundEnabled ? "Mute sounds" : "Enable sounds"}
    >
      {soundEnabled ? (
        <Bell className="h-5 w-5" />
      ) : (
        <BellOff className="h-5 w-5 text-brown-light" />
      )}
    </button>
  );
}
