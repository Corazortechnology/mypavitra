"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export interface SceneBuildArgs {
  /** The pinned timeline. Scrub is already attached. Add tweens with positions. */
  tl: gsap.core.Timeline;
  /** The scene root element. */
  scene: HTMLElement;
  /** Scoped selector — only matches inside this scene. */
  q: (selector: string) => Element[];
}

interface PinnedSceneProps {
  id: string;
  className?: string;
  /**
   * Extra scroll distance while pinned, e.g. "+=250%" pins for 2.5 viewport
   * heights. Longer = slower, more cinematic.
   */
  scroll?: string;
  /** true = 1:1 with scroll; a number adds catch-up smoothing (premium). */
  scrub?: number | boolean;
  /** Pin + scrub only at/above this width. Below it, the fallback renders. */
  minWidth?: number;
  /** Refresh order — set ascending top-to-bottom on the page. */
  refreshPriority?: number;
  /** Build the scrubbed timeline. Runs only in the cinematic (desktop) context. */
  build: (args: SceneBuildArgs) => void;
  /** Full-viewport cinematic DOM (desktop). */
  children: ReactNode;
  /**
   * Lighter DOM for mobile / reduced-motion. If omitted, `children` is shown
   * statically as a poster frame (authored initial state = the resting pose).
   */
  mobileFallback?: ReactNode;
}

/**
 * A single pinned, scroll-scrubbed cinematic scene.
 *
 * All animation for the scene lives on ONE top-level timeline (no nested
 * ScrollTriggers — per GSAP guidance). Uses gsap.matchMedia so the pin/scrub
 * only exists on capable viewports and is automatically reverted on unmount,
 * resize, or reduced-motion changes.
 */
export function PinnedScene({
  id,
  className = "",
  scroll = "+=200%",
  scrub = 0.6,
  minWidth = 768,
  refreshPriority = 0,
  build,
  children,
  mobileFallback,
}: PinnedSceneProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scene = ref.current;
      if (!scene) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          cinematic: `(min-width: ${minWidth}px) and (prefers-reduced-motion: no-preference)`,
        },
        (ctx) => {
          if (!ctx.conditions?.cinematic) return;

          const q = gsap.utils.selector(scene);
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: scroll,
              pin: true,
              anticipatePin: 1,
              scrub: scrub === true ? 0.6 : scrub,
              refreshPriority,
              invalidateOnRefresh: true,
              id,
            },
          });

          build({ tl, scene, q: (s) => Array.from(q(s)) });
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} id={id} className={`relative ${className}`}>
      {mobileFallback ? (
        <>
          <div className="hidden md:block">{children}</div>
          <div className="md:hidden">{mobileFallback}</div>
        </>
      ) : (
        children
      )}
    </div>
  );
}
