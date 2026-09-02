"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  isSoundEnabled,
  playSoftChime,
  playSuccessCelebration,
  playTempleBell,
  setSoundEnabledPref,
} from "@/lib/experience/sounds";

interface ExperienceContextValue {
  soundEnabled: boolean;
  toggleSound: () => void;
  playBell: () => void;
  playChime: () => void;
  playSuccess: () => void;
  flowerRainActive: boolean;
  triggerFlowerRain: () => void;
  stopFlowerRain: () => void;
  celebrateOrder: () => void;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flowerRainActive, setFlowerRainActive] = useState(false);

  useEffect(() => {
    setSoundEnabled(isSoundEnabled());
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      setSoundEnabledPref(next);
      if (next) void playSoftChime(0.15);
      return next;
    });
  }, []);

  const playBell = useCallback(() => {
    if (soundEnabled) void playTempleBell();
  }, [soundEnabled]);

  const playChime = useCallback(() => {
    if (soundEnabled) void playSoftChime();
  }, [soundEnabled]);

  const playSuccess = useCallback(() => {
    if (soundEnabled) void playSuccessCelebration();
  }, [soundEnabled]);

  const triggerFlowerRain = useCallback(() => {
    setFlowerRainActive(true);
  }, []);

  const stopFlowerRain = useCallback(() => {
    setFlowerRainActive(false);
  }, []);

  const celebrateOrder = useCallback(() => {
    triggerFlowerRain();
    playSuccess();
  }, [playSuccess, triggerFlowerRain]);

  const value = useMemo(
    () => ({
      soundEnabled,
      toggleSound,
      playBell,
      playChime,
      playSuccess,
      flowerRainActive,
      triggerFlowerRain,
      stopFlowerRain,
      celebrateOrder,
    }),
    [
      soundEnabled,
      toggleSound,
      playBell,
      playChime,
      playSuccess,
      flowerRainActive,
      triggerFlowerRain,
      stopFlowerRain,
      celebrateOrder,
    ]
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) {
    throw new Error("useExperience must be used within ExperienceProvider");
  }
  return ctx;
}

export function useExperienceOptional() {
  return useContext(ExperienceContext);
}
