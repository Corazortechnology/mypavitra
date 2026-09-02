"use client";

import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, CATEGORIES, BUNDLES, FESTIVALS } from "@puja/catalog";
import {
  PRODUCT_IMAGES,
  CATEGORY_IMAGES,
  BUNDLE_IMAGES,
  FESTIVAL_IMAGES,
  HERO_IMAGE,
} from "@/lib/images";

export default function ImageReviewPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="sticky top-0 z-10 bg-brown text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="font-display text-2xl">MyPavitra — Image Review</h1>
            <p className="text-white/70 text-sm mt-1">
              All product-specific images · Regenerate with{" "}
              <code className="bg-white/10 px-1 rounded">node scripts/generate-product-images.mjs</code>
            </p>
          </div>
          <Link href="/" className="text-saffron-light hover:text-white text-sm font-medium">
            ← Back to store
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">
        <section>
          <SectionTitle count={1} title="Hero Banner" />
          <div className="max-w-md">
            <ImageCard src={HERO_IMAGE} label="Homepage Hero" sublabel="hero/main.svg" />
          </div>
        </section>

        <section>
          <SectionTitle count={PRODUCTS.length} title="Products" subtitle="One unique image per SKU" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {PRODUCTS.map((p) => (
              <ImageCard
                key={p.slug}
                src={PRODUCT_IMAGES[p.slug] ?? "/images/products/brass-diya-classic.svg"}
                label={p.name}
                sublabel={p.slug}
                indianName={p.indianName}
                href={`/products/${p.slug}`}
                categories={p.categorySlugs.join(", ")}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle count={CATEGORIES.length} title="Categories" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.map((c) => (
              <ImageCard
                key={c.slug}
                src={CATEGORY_IMAGES[c.slug]!}
                label={c.name}
                sublabel={c.slug}
                href={`/categories/${c.slug}`}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle count={BUNDLES.length} title="Bundles / Puja Kits" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {BUNDLES.map((b) => (
              <ImageCard
                key={b.slug}
                src={BUNDLE_IMAGES[b.slug]!}
                label={b.name}
                sublabel={b.slug}
                href={`/bundles/${b.slug}`}
              />
            ))}
          </div>
        </section>

        <section>
          <SectionTitle count={FESTIVALS.length} title="Festivals" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {FESTIVALS.map((f) => (
              <ImageCard
                key={f.slug}
                src={FESTIVAL_IMAGES[f.slug]!}
                label={f.name}
                sublabel={f.slug}
                href={`/festivals/${f.slug}`}
              />
            ))}
          </div>
        </section>

        <section className="p-6 rounded-2xl bg-white border border-ivory-dark">
          <h2 className="font-display text-xl text-brown mb-3">Next steps for production photos</h2>
          <ul className="text-sm text-brown-light space-y-2 list-disc list-inside">
            <li>
              Replace SVGs in <code className="text-saffron">apps/web/public/images/products/</code> with
              AI-generated photos from your reference images
            </li>
            <li>
              Keep the same filename (e.g. <code>brass-diya-classic.jpg</code>) and update{" "}
              <code>lib/images.ts</code> extension if needed
            </li>
            <li>Recommended: 800×800px WebP, white/ivory background, scale reference for intl customers</li>
            <li>Idol images: use respectful photography; current SVGs are stylized placeholders only</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
  count,
}: {
  title: string;
  subtitle?: string;
  count: number;
}) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl text-brown">
        {title}{" "}
        <span className="text-saffron text-lg font-sans font-normal">({count})</span>
      </h2>
      {subtitle && <p className="text-brown-light text-sm mt-1">{subtitle}</p>}
      <div className="divider-ornament mt-3 max-w-xs">
        <span className="text-gold">✦</span>
      </div>
    </div>
  );
}

function ImageCard({
  src,
  label,
  sublabel,
  indianName,
  href,
  categories,
}: {
  src: string;
  label: string;
  sublabel: string;
  indianName?: string;
  href?: string;
  categories?: string;
}) {
  const content = (
    <div className="group rounded-2xl border border-ivory-dark bg-white overflow-hidden hover:border-saffron/40 hover:shadow-lg transition-all">
      <div className="relative aspect-square bg-cream">
        <Image src={src} alt={label} fill className="object-contain p-2" sizes="300px" unoptimized />
      </div>
      <div className="p-3 border-t border-ivory-dark">
        {indianName && (
          <p className="text-xs text-gold font-devanagari truncate">{indianName}</p>
        )}
        <p className="text-sm font-medium text-brown line-clamp-2 group-hover:text-saffron transition-colors">
          {label}
        </p>
        <p className="text-[10px] text-brown-light/60 mt-1 font-mono truncate">{sublabel}</p>
        {categories && (
          <p className="text-[10px] text-brown-light mt-1 truncate">{categories}</p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }
  return content;
}
