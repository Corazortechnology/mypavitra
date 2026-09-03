"use client";

import { PinnedScene, ViewBoxCamera, ChapterCaption } from "@/components/scroll-film";
import { WorldArt } from "@/components/scroll-film/scenes/world-art";

/** Tight on the lit home niche. */
const FRAME_HOME = "884 700 232 232";
/** Pull back to the curve of the earth. */
const FRAME_WORLD = "40 180 1920 1920";

/**
 * CHAPTER 05 — THE WORLD
 * The camera pulls back from a single lit home until it becomes one glowing
 * point on the earth, joined by destinations worldwide. Closes with a bloom
 * into the ivory outro. Emotional, not logistical.
 */
export function ChapterWorld() {
  return (
    <PinnedScene
      id="chapter-world"
      scroll="+=220%"
      refreshPriority={5}
      className="bg-[#0e0c14]"
      build={({ tl }) => {
        // The signature pull-back.
        tl.fromTo(
          ".film-camera",
          { attr: { viewBox: FRAME_HOME } },
          { attr: { viewBox: FRAME_WORLD }, duration: 1, ease: "power1.inOut" },
          0,
        );

        // The world materialises as we retreat.
        tl.to(".w-stars", { opacity: 1, duration: 0.4, ease: "power1.out" }, 0.28);
        tl.to(".w-earth", { opacity: 1, duration: 0.4, ease: "power1.out" }, 0.34);
        tl.to(".w-points", { opacity: 1, duration: 0.34, ease: "power1.out" }, 0.56);

        // Captions.
        tl.to(".cap-1", { opacity: 1, duration: 0.08, ease: "power1.out" }, 0.08);
        tl.to(".cap-1", { opacity: 0, y: -20, duration: 0.1 }, 0.4);
        tl.to(".cap-2", { opacity: 1, duration: 0.1, ease: "power1.out" }, 0.62);
        tl.to(".cap-2", { opacity: 0, duration: 0.1 }, 0.94);

        // Bloom into the ivory outro — designed handoff.
        tl.fromTo(".w-exit", { opacity: 0 }, { opacity: 1, duration: 0.14, ease: "power2.in" }, 0.9);
      }}
      mobileFallback={
        <div className="relative flex h-[100svh] flex-col items-center justify-center bg-[#0e0c14] px-6 text-center">
          <svg viewBox="120 260 1760 1400" className="w-full" aria-hidden>
            <WorldArt idPrefix="wm" revealed />
          </svg>
          <p className="mt-6 max-w-xs font-display text-2xl leading-snug text-ivory">
            Wherever life takes you,
            <br />
            <span className="text-gold-light">traditions travel with you.</span>
          </p>
        </div>
      }
    >
      <div className="relative h-[100svh] w-full overflow-hidden bg-[#0e0c14]">
        <div className="absolute inset-0">
          <ViewBoxCamera viewBox={FRAME_HOME} ariaLabel="A single lit home becoming a point on the earth">
            <WorldArt />
          </ViewBoxCamera>
        </div>

        <ChapterCaption index="05" kicker="The World" captionClassName="cap-1" placement="bottom-center">
          From a single home in India.
        </ChapterCaption>
        <ChapterCaption captionClassName="cap-2" placement="bottom-center">
          Wherever life takes you,
          <br />
          <span className="text-gold-light">traditions travel with you.</span>
        </ChapterCaption>

        <div className="w-exit pointer-events-none absolute inset-0 z-[70] bg-ivory opacity-0" aria-hidden />
      </div>
    </PinnedScene>
  );
}
