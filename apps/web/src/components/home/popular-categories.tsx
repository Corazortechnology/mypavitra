"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@puja/catalog";
import { buildLocalizedPath } from "@puja/config";
import type { CountryConfig } from "@puja/types";
import { getCategoryImage } from "@/lib/images";
import { duration, ease } from "@/lib/motion";

interface PopularCategoriesProps {
  country: CountryConfig;
}

/**
 * Editorial voice given to each tile slot.
 * Hero tile gets a supporting line; others are silent.
 */
const TILE_META: Record<
  string,
  { tagline?: string; weight: "hero" | "secondary" | "small" }
> = {
  "puja-samagri":     { tagline: "Begin the ritual.", weight: "hero" },
  "brass-puja-items": { weight: "secondary" },
  diyas:              { weight: "secondary" },
  "puja-kits":        { weight: "small" },
  "incense-dhoop":    { weight: "small" },
  "jain-puja-products": { weight: "small" },
};

const ORDERED_SLUGS = [
  "puja-samagri",
  "brass-puja-items",
  "diyas",
  "puja-kits",
  "incense-dhoop",
  "jain-puja-products",
];

export function PopularCategories({ country }: PopularCategoriesProps) {
  const reduced = useReducedMotion();
  const prefix = (path: string) => buildLocalizedPath(path, country);

  const tiles = ORDERED_SLUGS.map((slug) => {
    const cat = CATEGORIES.find((c) => c.slug === slug);
    if (!cat) return null;
    const meta = TILE_META[slug] ?? { weight: "small" };
    return { ...cat, ...meta, image: getCategoryImage(slug) };
  }).filter(Boolean) as (ReturnType<typeof CATEGORIES.find> & {
    image: string;
    tagline?: string;
    weight: "hero" | "secondary" | "small";
  })[];

  /* ── Shared clip-path reveal for the hero tile ── */
  const heroReveal = reduced
    ? {}
    : {
        initial: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        whileInView: { clipPath: "inset(0 0% 0 0)", opacity: 1 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: duration.cinematic, ease: ease.cinematic },
      };

  /* ── Stagger fade for the remaining tiles ── */
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
  };
  const tileVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: duration.slow, ease: ease.out },
    },
  };

  const [heroTile, ...restTiles] = tiles;
  const [sec1, sec2, ...smallTiles] = restTiles;

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-ivory">
      <div className="container-main">

        {/* ── Section header ── */}
        <motion.div
          className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: duration.slow, ease: ease.out }}
        >
          <div className="max-w-2xl">
            <p
              className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-brass/80"
              aria-hidden
            >
              ॐ &nbsp; Collections
            </p>
            <h2 className="font-display text-3xl leading-[1.1] tracking-tight text-brown sm:text-4xl lg:text-5xl">
              Every ritual begins
              <br />
              <em className="not-italic text-muted">with an intention.</em>
            </h2>
          </div>

          {/* Right-side counter — editorial grounding */}
          <p
            className="hidden sm:block font-mono text-xs tracking-[0.3em] text-muted/60 tabular-nums self-end pb-1"
            aria-hidden
          >
            01 — 06
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">

          {/* Hero tile — 2-col × 2-row on lg */}
          {heroTile && (
            <motion.div
              className="col-span-2 row-span-2"
              {...heroReveal}
            >
              <Link
                href={prefix(`/categories/${heroTile.slug}`)}
                className="group relative flex h-full min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] w-full overflow-hidden rounded-xl"
                aria-label={heroTile.name}
              >
                {/* Image */}
                <Image
                  src={heroTile.image}
                  alt={heroTile.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                  className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
                  unoptimized
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brown/90 via-brown/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <p className="mb-1.5 text-[0.6rem] font-medium uppercase tracking-[0.35em] text-gold-light/70">
                    Category
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight text-cream">
                    {heroTile.name}
                  </h3>
                  {heroTile.tagline && (
                    <p className="mt-2 text-sm text-cream/70 italic">
                      {heroTile.tagline}
                    </p>
                  )}
                  {/* Animated arrow */}
                  <span className="mt-4 flex items-center gap-2 text-xs font-medium tracking-wide text-gold-light/80">
                    <span className="w-5 h-px bg-gold-light/60 transition-[width] duration-[var(--duration-medium)] group-hover:w-9" />
                    Explore
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-[var(--duration-medium)] group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Secondary tiles — tall landscape on lg */}
          {[sec1, sec2].map((tile, idx) =>
            tile ? (
              <motion.div
                key={tile.slug}
                className="col-span-1 row-span-1"
                initial={reduced ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: duration.slow,
                  ease: ease.out,
                  delay: 0.08 + idx * 0.06,
                }}
              >
                <Link
                  href={prefix(`/categories/${tile.slug}`)}
                  className="group relative flex h-full min-h-[160px] sm:min-h-[200px] lg:min-h-[204px] w-full overflow-hidden rounded-xl"
                  aria-label={tile.name}
                >
                  <Image
                    src={tile.image}
                    alt={tile.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/85 via-brown/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-base sm:text-lg font-medium leading-tight text-cream">
                      {tile.name}
                    </h3>
                    <span className="mt-1.5 block h-px w-0 bg-gold-light/60 transition-[width] duration-[var(--duration-medium)] group-hover:w-8 motion-reduce:group-hover:w-0" />
                  </div>
                </Link>
              </motion.div>
            ) : null
          )}

          {/* Small tiles — bottom row */}
          <motion.div
            className="col-span-2 sm:col-span-3 lg:col-span-4 grid grid-cols-3 gap-3 sm:gap-4"
            variants={containerVariants}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {smallTiles.map((tile) =>
              tile ? (
                <motion.div key={tile.slug} variants={tileVariants}>
                  <Link
                    href={prefix(`/categories/${tile.slug}`)}
                    className="group relative flex aspect-square w-full overflow-hidden rounded-xl"
                    aria-label={tile.name}
                  >
                    <Image
                      src={tile.image}
                      alt={tile.name}
                      fill
                      sizes="(max-width: 640px) 33vw, 25vw"
                      className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown/85 via-brown/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
                      <h3 className="font-display text-xs sm:text-sm font-medium leading-tight text-cream">
                        {tile.name}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ) : null
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
