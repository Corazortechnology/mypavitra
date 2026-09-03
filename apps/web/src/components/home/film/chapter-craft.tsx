"use client";

import { PinnedScene, ViewBoxCamera, ChapterCaption } from "@/components/scroll-film";
import { MaterialArt } from "@/components/scroll-film/scenes/material-art";

/** Deep macro on the engraving (continues Chapter 02's push into brass). */
const FRAME_MACRO = "912 528 200 144";
/** Travel across the surface. */
const FRAME_TRAVEL = "700 420 520 374";
/** Pull back — the rings resolve into a turned vessel on a lathe. */
const FRAME_REVEAL = "220 60 1560 1120";

/**
 * CHAPTER 03 — THE CRAFT
 * Opens deep inside the brass. The camera travels through the material, a
 * copper vein bleeds in, then it pulls back to reveal the turning that shaped
 * the object — finishing on a designed bloom into the ivory commerce rest.
 */
export function ChapterCraft() {
  return (
    <PinnedScene
      id="chapter-craft"
      scroll="+=200%"
      refreshPriority={3}
      className="bg-[#5c3f18]"
      build={({ tl }) => {
        tl.fromTo(
          ".film-camera",
          { attr: { viewBox: FRAME_MACRO } },
          { attr: { viewBox: FRAME_TRAVEL }, duration: 0.4, ease: "none" },
          0,
        );
        tl.to(
          ".film-camera",
          { attr: { viewBox: FRAME_REVEAL }, duration: 0.48, ease: "power1.inOut" },
          0.4,
        );

        // Copper colour transition as we travel.
        tl.to(".mat-copper", { opacity: 0.85, duration: 0.3, ease: "power1.in" }, 0.16);
        // Specular highlight sweeps across the surface.
        tl.fromTo(".mat-spec", { xPercent: -30 }, { xPercent: 60, duration: 0.9, ease: "none" }, 0);
        // Lathe + finished vessel resolve on pull-back.
        tl.to(".mat-wheel", { opacity: 1, duration: 0.24 }, 0.5);
        tl.to(".mat-vessel", { opacity: 1, duration: 0.28, ease: "power2.out" }, 0.56);

        // Captions.
        tl.to(".cap-1", { opacity: 1, duration: 0.08, ease: "power1.out" }, 0.06);
        tl.to(".cap-1", { opacity: 0, y: -20, duration: 0.1 }, 0.34);
        tl.to(".cap-2", { opacity: 1, duration: 0.08, ease: "power1.out" }, 0.6);
        tl.to(".cap-2", { opacity: 0, duration: 0.1 }, 0.9);

        // Designed handoff into the ivory commerce rest — never a blank gap.
        tl.fromTo(".mat-exit", { opacity: 0 }, { opacity: 1, duration: 0.14, ease: "power2.in" }, 0.88);
      }}
      mobileFallback={
        <div className="relative flex min-h-[80svh] flex-col items-center justify-center gap-7 bg-[#5c3f18] px-6 py-20 text-center">
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-gold-light/90">
            03 — The Craft
          </p>
          <svg viewBox="620 300 760 720" className="w-full max-w-sm" aria-hidden>
            <MaterialArt idPrefix="mm" revealed />
          </svg>
          <p className="max-w-sm font-display text-2xl leading-snug text-ivory">
            Crafted in materials
            <br />
            <span className="text-gold-light">that outlive generations.</span>
          </p>
        </div>
      }
    >
      <div className="relative h-[100svh] w-full overflow-hidden bg-[#5c3f18]">
        <div className="absolute inset-0">
          <ViewBoxCamera viewBox={FRAME_MACRO} ariaLabel="Macro view of engraved brass being turned into a vessel">
            <MaterialArt />
          </ViewBoxCamera>
        </div>

        <ChapterCaption index="03" kicker="The Craft" captionClassName="cap-1" placement="bottom-left">
          Crafted in materials
          <br />
          that outlive generations.
        </ChapterCaption>
        <ChapterCaption captionClassName="cap-2" placement="bottom-left">
          Shaped by hand.
          <br />
          <span className="text-gold-light">Kept for life.</span>
        </ChapterCaption>

        {/* Bloom into the ivory rest */}
        <div className="mat-exit pointer-events-none absolute inset-0 z-[70] bg-ivory opacity-0" aria-hidden />
      </div>
    </PinnedScene>
  );
}
