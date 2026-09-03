"use client";

import { PinnedScene, ViewBoxCamera, ChapterCaption } from "@/components/scroll-film";
import { DiyaArt } from "@/components/scroll-film/scenes/diya-art";

/** Wide opening frame — the diya sits small in a dark, warm field. */
const START_VIEWBOX = "-360 -420 2320 2320";
/** Final frame — the flame fills the screen (hands off to Chapter 02). */
const END_VIEWBOX = "694 556 212 212";

/**
 * CHAPTER 01 — THE LIGHT
 * A pinned dolly-in: scroll pushes the camera toward the flame until it fills
 * the frame and blows out into a warm gold field — the doorway into Chapter 02.
 */
export function ChapterLight() {
  return (
    <PinnedScene
      id="chapter-light"
      scroll="+=200%"
      refreshPriority={1}
      className="bg-[#1c1a17]"
      build={({ tl }) => {
        // Camera dolly toward the flame — linear so it tracks scroll 1:1.
        tl.fromTo(
          ".film-camera",
          { attr: { viewBox: START_VIEWBOX } },
          { attr: { viewBox: END_VIEWBOX }, duration: 1, ease: "none" },
          0,
        );

        // Halo swells as we approach.
        tl.to(
          ".diya-glow",
          { scale: 1.3, transformOrigin: "800px 640px", duration: 1, ease: "none" },
          0,
        );

        // Embers drift up and thin out.
        tl.to(".diya-ember", { yPercent: -40, opacity: 0.15, duration: 1 }, 0);

        // Opening line reveals, then clears before the blow-out.
        tl.to(".film-caption", { opacity: 1, duration: 0.1, ease: "power1.out" }, 0.03);
        tl.to(".film-caption", { opacity: 0, y: -24, duration: 0.14, ease: "power1.in" }, 0.42);

        // Flame blooms into a full-screen warm field → Chapter 02 doorway.
        tl.fromTo(
          ".film-flamefill",
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.2, ease: "power2.in" },
          0.82,
        );
      }}
      mobileFallback={
        <div className="hero-atmosphere relative flex h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
          <svg viewBox="480 300 640 900" className="h-[62vh] w-auto" aria-hidden>
            <DiyaArt idPrefix="dm" />
          </svg>
          <p className="mt-6 max-w-xs font-display text-2xl leading-snug text-ivory">
            Traditions begin with a flame.
          </p>
        </div>
      }
    >
      <div className="hero-atmosphere relative h-[100svh] w-full overflow-hidden">
        {/* Camera stage */}
        <div className="absolute inset-0">
          <ViewBoxCamera viewBox={START_VIEWBOX} ariaLabel="A brass diya burning in the dark">
            <DiyaArt />
          </ViewBoxCamera>
        </div>

        {/* Opening caption */}
        <ChapterCaption index="01" kicker="The Light" placement="bottom-center" tone="light" visibleByDefault>
          Traditions begin with a flame.
        </ChapterCaption>

        {/* Blow-out plane — becomes the gold field carried into Chapter 02 */}
        <div
          className="film-flamefill pointer-events-none absolute inset-0 z-[70] opacity-0"
          style={{
            background:
              "radial-gradient(circle at 50% 46%, #fff7e0 0%, #ffd36b 26%, #f08a2a 55%, #c8551f 100%)",
          }}
          aria-hidden
        />
      </div>
    </PinnedScene>
  );
}
