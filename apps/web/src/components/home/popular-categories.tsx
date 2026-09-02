"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@puja/catalog";
import { buildLocalizedPath } from "@puja/config";
import type { CountryConfig } from "@puja/types";
import { getCategoryImage } from "@/lib/images";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { TempleSection } from "@/components/ui/temple-section";

interface PopularCategoriesProps {
  country: CountryConfig;
}

export function PopularCategories({ country }: PopularCategoriesProps) {
  const prefix = (path: string) => buildLocalizedPath(path, country);
  const featured = CATEGORIES.slice(0, 8);

  return (
    <TempleSection variant="subtle" className="py-14 sm:py-16">
      <div className="container-main">
        <FadeIn>
          <SectionHeading
            title="Popular Categories"
            subtitle="Browse by what you need for your daily puja and festivals"
          />
        </FadeIn>

        <div className="mt-10 flex gap-4 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 lg:grid-cols-8 sm:overflow-visible">
          {featured.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="flex-shrink-0 w-[140px] sm:w-auto snap-start"
            >
              <Link
                href={prefix(`/categories/${cat.slug}`)}
                className="group block rounded-2xl overflow-hidden ring-1 ring-gold/20 hover:ring-saffron/50 shadow-md hover:shadow-xl hover:shadow-saffron/10 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={getCategoryImage(cat.slug)}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="140px"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brown/85 via-brown/30 to-maroon/10" />
                  {/* Torana arch overlay top */}
                  <svg
                    className="absolute top-0 left-0 right-0 h-8 text-gold/30"
                    viewBox="0 0 100 20"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path d="M0 20 Q50 0 100 20" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  <p className="absolute bottom-2.5 left-2 right-2 text-cream text-xs sm:text-sm font-medium text-center leading-tight font-display">
                    {cat.name}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </TempleSection>
  );
}
