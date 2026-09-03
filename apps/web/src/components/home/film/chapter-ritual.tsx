"use client";

import { PinnedScene, ViewBoxCamera, ChapterCaption } from "@/components/scroll-film";
import { RitualArt } from "@/components/scroll-film/scenes/ritual-art";

const FRAME_WIDE = "40 20 1520 960";
const FRAME_FULL = "0 0 1600 1000";
/** Push into the plate centre to seed Chapter 03's material zoom. */
const FRAME_INTO_BRASS = "660 560 300 190";

/**
 * CHAPTER 02 — THE RITUAL
 * Arrive through the flame into a warm field, which clears to reveal a brass
 * thali. Scroll assembles the ritual — plate, diya, bell, incense, flowers —
 * each with intentional physical entrance, then the camera pushes into the
 * brass to hand off to Chapter 03.
 */
export function ChapterRitual() {
  return (
    <PinnedScene
      id="chapter-ritual"
      scroll="+=240%"
      refreshPriority={2}
      className="bg-[#1c1a17]"
      build={({ tl }) => {
        // Camera: slow settle onto the full arrangement, then push into brass.
        tl.fromTo(
          ".film-camera",
          { attr: { viewBox: FRAME_WIDE } },
          { attr: { viewBox: FRAME_FULL }, duration: 0.82, ease: "none" },
          0,
        );
        tl.to(
          ".film-camera",
          { attr: { viewBox: FRAME_INTO_BRASS }, duration: 0.18, ease: "power1.in" },
          0.82,
        );

        // Continuity: the incoming gold field clears to reveal the scene.
        tl.to(".ro-enter", { opacity: 0, duration: 0.12, ease: "power1.out" }, 0);

        // Assembly — translation / scale / rotation, never a plain fade.
        tl.from(
          ".ro-thali",
          { yPercent: 22, scale: 0.85, opacity: 0, transformOrigin: "800px 650px", duration: 0.16, ease: "power2.out" },
          0.06,
        );
        tl.from(
          ".ro-diya",
          { x: -280, opacity: 0, rotation: -6, transformOrigin: "640px 590px", duration: 0.14, ease: "power2.out" },
          0.2,
        );
        tl.from(
          ".ro-bell",
          { x: 280, opacity: 0, rotation: 6, transformOrigin: "1004px 500px", duration: 0.14, ease: "power2.out" },
          0.3,
        );
        tl.from(
          ".ro-incense",
          { y: -220, opacity: 0, transformOrigin: "736px 420px", duration: 0.14, ease: "power2.out" },
          0.42,
        );
        tl.from(
          ".ro-flowers > g",
          { scale: 0, opacity: 0, transformOrigin: "50% 50%", duration: 0.16, ease: "back.out(1.6)", stagger: 0.05 },
          0.54,
        );

        // Storytelling captions — motion, then stillness, then motion.
        tl.to(".cap-1", { opacity: 1, duration: 0.08, ease: "power1.out" }, 0.08);
        tl.to(".cap-1", { opacity: 0, y: -20, duration: 0.1 }, 0.24);
        tl.to(".cap-2", { opacity: 1, duration: 0.08, ease: "power1.out" }, 0.36);
        tl.to(".cap-2", { opacity: 0, y: -20, duration: 0.1 }, 0.52);
        tl.to(".cap-3", { opacity: 1, duration: 0.08, ease: "power1.out" }, 0.64);
        tl.to(".cap-3", { opacity: 0, duration: 0.1 }, 0.9);
      }}
      mobileFallback={
        <div className="relative flex h-[100svh] flex-col items-center justify-center bg-[#1c1a17] px-6 text-center">
          <svg viewBox="120 300 1360 640" className="w-full" aria-hidden>
            <RitualArt idPrefix="rm" />
          </svg>
          <p className="mt-6 max-w-xs font-display text-2xl leading-snug text-ivory">
            Everything you need. In one place.
          </p>
        </div>
      }
    >
      <div className="relative h-[100svh] w-full overflow-hidden bg-[#1c1a17]">
        <div className="absolute inset-0">
          <ViewBoxCamera viewBox={FRAME_WIDE} ariaLabel="A brass puja thali with diya, bell, incense and flowers">
            <RitualArt />
          </ViewBoxCamera>
        </div>

        <ChapterCaption index="02" kicker="The Ritual" captionClassName="cap-1" placement="bottom-center">
          Every object has a purpose.
        </ChapterCaption>
        <ChapterCaption captionClassName="cap-2" placement="bottom-center">
          Every ritual has meaning.
        </ChapterCaption>
        <ChapterCaption captionClassName="cap-3" placement="bottom-center">
          Everything you need.
          <br />
          <span className="text-gold-light">In one place.</span>
        </ChapterCaption>

        {/* Incoming gold field from Chapter 01 (continuity) */}
        <div
          className="ro-enter pointer-events-none absolute inset-0 z-[70]"
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
