"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { BRAND, buildLocalizedPath } from "@puja/config";
import type { CountryConfig } from "@puja/types";
import { HERO_IMAGE, HERO_IMAGE_ALT } from "@/lib/images";
import { RevealText } from "@/components/animation/reveal-text";
import { duration, ease } from "@/lib/motion";

interface HeroCampaignProps {
  country: CountryConfig;
  campaign?: {
    heading: string;
    subheading: string;
    ctaText: string;
    ctaUrl: string;
  };
}

const DEFAULT_CTA = {
  ctaText: "Explore the collection",
  ctaUrl: "/categories/puja-samagri",
};

const EASE = ease.out;

/**
 * Cinematic full-viewport hero — brand-first, single composition.
 * Scroll parallax: desktop only; stillness on mobile / reduced motion.
 */
export function HeroCampaign({ country, campaign }: HeroCampaignProps) {
  const prefix = (path: string) => buildLocalizedPath(path, country);
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollMotion, setScrollMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setScrollMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    scrollMotion ? [0, 64] : [0, 0],
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    scrollMotion ? [1, 1.06] : [1, 1],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    scrollMotion ? [0, 28] : [0, 0],
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    [1, scrollMotion ? 0.4 : 1],
  );

  const ctaText = campaign?.ctaText ?? DEFAULT_CTA.ctaText;
  const ctaUrl = campaign?.ctaUrl ?? DEFAULT_CTA.ctaUrl;
  const support =
    country.code === "IN"
      ? "Authentic ritual objects, crafted for daily puja and sacred occasions."
      : `Authentic Indian ritual objects, delivered to ${country.name}.`;

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden text-ivory"
      aria-label={`${BRAND.name} — enter the world`}
    >
      {/* Atmosphere plane */}
      <div className="absolute inset-0 hero-atmosphere" aria-hidden />
      <div className="absolute inset-0 hero-jali opacity-80" aria-hidden />

      {/* Soft top light */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(212,192,160,0.22),transparent_55%)]"
        aria-hidden
      />

      {/* Dominant product visual — full-bleed lower field, not a card */}
      <motion.div
        className="absolute inset-x-0 bottom-0 top-[28%] sm:top-[22%] md:top-[18%] pointer-events-none"
        style={{ y: imageY, scale: imageScale }}
        aria-hidden
      >
        <motion.div
          className="relative mx-auto h-full w-full max-w-5xl"
          initial={reduced ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: duration.cinematic, ease: EASE, delay: 0.15 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_50%_55%,rgba(176,141,87,0.28),transparent_70%)]" />
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            className="object-contain object-bottom pb-6 sm:pb-10 opacity-90"
            sizes="100vw"
            unoptimized
          />
          {/* Readable gradient over image base */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a17] via-[#1c1a17]/40 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Edge vignette */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(28,26,23,0.55)_100%)]"
        aria-hidden
      />

      {/* Editorial content — one composition */}
      <motion.div
        className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32 md:justify-center md:pb-24 md:pt-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="container-main max-w-3xl">
          <RevealText
            as="p"
            delay={0.15}
            className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.42em] text-gold-light/90 sm:mb-6 sm:text-xs"
          >
            {BRAND.name}
          </RevealText>

          <h1 className="font-display text-[2.75rem] leading-[1.05] tracking-tight text-ivory sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            <RevealText as="span" delay={0.28} className="block">
              Tradition lives
            </RevealText>
            <RevealText as="span" delay={0.42} className="block">
              in the details.
            </RevealText>
          </h1>

          {/* Visually hidden full alt for the decorative hero image */}
          <span className="sr-only">{HERO_IMAGE_ALT}</span>

          <RevealText
            as="p"
            delay={0.58}
            className="mt-6 max-w-md text-base leading-relaxed text-ivory/70 sm:mt-7 sm:text-lg"
          >
            {support}
          </RevealText>

          <motion.div
            className="mt-9 sm:mt-11"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, delay: reduced ? 0 : 0.75, ease: EASE }}
          >
            <Link
              href={prefix(ctaUrl)}
              className="group inline-flex items-center gap-3 border-b border-brass/70 pb-1 text-sm font-medium tracking-wide text-ivory transition-colors duration-300 hover:border-gold-light hover:text-gold-light"
            >
              {ctaText}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Soft exit into page ivory */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-ivory to-transparent sm:h-28"
        aria-hidden
      />
    </section>
  );
}
