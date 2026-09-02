import type { ReactNode } from "react";
import Image from "next/image";
import { MandalaBg } from "@/components/ui/mandala-bg";

interface PageHeroProps {
  title: string;
  description?: string;
  imageUrl?: string;
  image?: ReactNode;
  eyebrow?: string;
  className?: string;
  children?: ReactNode;
}

export function PageHero({
  title,
  description,
  imageUrl,
  image,
  eyebrow,
  className = "",
  children,
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-br from-cream via-ivory to-ivory-dark ${className}`}
    >
      <MandalaBg className="w-72 h-72 -top-10 -right-10 opacity-40" />
      <div className="absolute inset-0 bg-spiritual-pattern opacity-40" aria-hidden />
      <div className="container-main relative py-12 md:py-16 lg:py-20">
        <div className={`grid gap-8 lg:gap-12 items-center ${imageUrl || image ? "lg:grid-cols-2" : ""}`}>
          <div>
            {eyebrow && (
              <p className="font-devanagari text-sm text-saffron mb-3 tracking-widest">{eyebrow}</p>
            )}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-brown leading-tight">
              {title}
            </h1>
            {description && (
              <p className="mt-4 text-base sm:text-lg text-brown-light max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
            {children && <div className="mt-6">{children}</div>}
          </div>
          {(imageUrl || image) && (
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-gold/20 shadow-xl shadow-brown/10">
              {imageUrl ? (
                <Image src={imageUrl} alt="" fill className="object-cover" sizes="50vw" priority />
              ) : (
                image
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-brown/30 to-transparent" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
