"use client";

import type { ReactNode } from "react";
import { ExperienceProvider } from "./experience-provider";
import { ExperienceShell } from "./experience-shell";

export function ExperienceRoot({ children }: { children: ReactNode }) {
  return (
    <ExperienceProvider>
      <ExperienceShell />
      {children}
    </ExperienceProvider>
  );
}
