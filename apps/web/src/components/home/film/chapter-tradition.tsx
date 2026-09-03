"use client";

import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { CATEGORIES } from "@puja/catalog";
import { buildLocalizedPath } from "@puja/config";
import type { CountryConfig } from "@puja/types";
import { PinnedScene } from "@/components/scroll-film";
import { CategoryObject, type ObjectKey } from "@/components/scroll-film/scenes/category-object";

interface ChapterTraditionProps {
  country: CountryConfig;
}

const PANELS: { slug: string; kind: ObjectKey; line: string; fallback: string }[] = [
  { slug: "diyas", kind: "diya", line: "Light for every dawn and dusk.", fallback: "Diyas" },
  { slug: "pooja-thali", kind: "thali", line: "The plate that holds the ritual.", fallback: "Puja Thali" },
  { slug: "brass-puja-items", kind: "bell", line: "Sound that calls the sacred.", fallback: "Brass Puja Items" },
  { slug: "incense-dhoop", kind: "incense", line: "Fragrance that carries prayer.", fallback: "Incense & Dhoop" },
  { slug: "puja-kits", kind: "kit", line: "Everything, gathered with care.", fallback: "Puja Kits" },
];

/**
 * CHAPTER 04 — THE TRADITION
 * A pinned horizontal journey: scrolling vertically travels sideways through
 * category "worlds", each a spotlit object. Replaces the category grid — still
 * fully shoppable (every world links to its collection). Objects counter-drift
 * for depth. Mobile falls back to a vertical, tappable list.
 */
export function ChapterTradition({ country }: ChapterTraditionProps) {
  const prefix = (path: string) => buildLocalizedPath(path, country);
  const panels = PANELS.map((p) => ({
    ...p,
    name: CATEGORIES.find((c) => c.slug === p.slug)?.name ?? p.fallback,
  }));

  return (
    <PinnedScene
      id="chapter-tradition"
      scroll="+=460%"
      scrub={0.5}
      refreshPriority={4}
      className="bg-[#1c1a17]"
      build={({ tl, scene, q }) => {
        const track = q(".film-track")[0] as HTMLElement | undefined;
        if (!track) return;
        const distance = () => Math.max(0, track.scrollWidth - scene.clientWidth);

        // Horizontal travel — MUST be ease "none" for 1:1 scroll mapping.
        tl.to(track, { x: () => -distance(), ease: "none", duration: 1 }, 0);
        // Objects drift back slightly for parallax depth.
        tl.to(".trad-object", { xPercent: 14, ease: "none", duration: 1 }, 0);
      }}
      mobileFallback={
        <section className="bg-[#1c1a17] px-5 py-16 text-ivory">
          <p className="mb-2 text-[0.6rem] font-medium uppercase tracking-[0.4em] text-gold-light/80">
            04 — The Tradition
          </p>
          <h2 className="mb-8 font-display text-3xl leading-tight">
            Every ritual begins
            <br />
            <span className="text-gold-light">with an intention.</span>
          </h2>
          <div className="space-y-4">
            {panels.map((p) => (
              <Link
                key={p.slug}
                href={prefix(`/categories/${p.slug}`)}
                className="flex items-center gap-4 rounded-xl bg-white/[0.04] p-4 ring-1 ring-white/10"
              >
                <span className="h-20 w-20 flex-shrink-0">
                  <CategoryObject kind={p.kind} idPrefix={`com-${p.slug}`} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg">{p.name}</span>
                  <span className="block text-sm text-ivory/60">{p.line}</span>
                </span>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-gold-light" aria-hidden />
              </Link>
            ))}
          </div>
        </section>
      }
    >
      <div className="relative h-[100svh] w-full overflow-hidden bg-[#1c1a17]">
        <div className="film-track flex h-full w-max flex-nowrap">
          {/* Intro panel */}
          <div className="flex h-[100svh] w-screen flex-shrink-0 flex-col justify-center px-8 sm:px-16 lg:px-24">
            <p className="mb-4 text-[0.65rem] font-medium uppercase tracking-[0.42em] text-gold-light/80">
              04 — The Tradition
            </p>
            <h2 className="max-w-2xl font-display text-4xl leading-[1.08] tracking-tight text-ivory sm:text-5xl lg:text-6xl">
              Every ritual begins
              <br />
              <span className="text-gold-light">with an intention.</span>
            </h2>
            <p className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-ivory/50">
              Scroll to travel <ArrowDown className="h-3.5 w-3.5" aria-hidden />
            </p>
          </div>

          {/* Category worlds */}
          {panels.map((p, i) => (
            <Link
              key={p.slug}
              href={prefix(`/categories/${p.slug}`)}
              className="group relative flex h-[100svh] w-screen flex-shrink-0 items-center justify-center"
            >
              <span
                className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 select-none font-display text-[22vw] leading-none text-white/[0.04] sm:left-16"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="trad-object relative z-10 h-[52vh] w-[52vh] max-w-[80vw]">
                <CategoryObject kind={p.kind} idPrefix={`cod-${p.slug}`} />
              </div>

              <div className="absolute bottom-[14vh] left-8 right-8 z-20 sm:left-16 sm:right-16">
                <h3 className="font-display text-3xl text-ivory sm:text-4xl lg:text-5xl">{p.name}</h3>
                <p className="mt-2 max-w-sm text-sm text-ivory/60 sm:text-base">{p.line}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-gold-light">
                  <span className="h-px w-6 bg-gold-light/60 transition-[width] duration-300 group-hover:w-10" />
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PinnedScene>
  );
}
