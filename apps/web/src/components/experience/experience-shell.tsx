"use client";

import { FlowerRain, TempleEntryGate } from "./temple-celebrations";
import { useExperience } from "./experience-provider";

/** Global experience layer — entry gate, flower rain overlay */
export function ExperienceShell() {
  const { flowerRainActive, stopFlowerRain } = useExperience();

  return (
    <>
      <TempleEntryGate />
      <FlowerRain active={flowerRainActive} onComplete={stopFlowerRain} />
    </>
  );
}
