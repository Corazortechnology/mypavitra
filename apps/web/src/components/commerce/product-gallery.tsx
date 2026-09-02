"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getProductImage } from "@/lib/images";

interface ProductGalleryProps {
  slug: string;
  name: string;
  categorySlugs: string[];
  imageEmoji: string;
  imageColor: string;
}

export function ProductGallery({
  slug,
  name,
  categorySlugs,
  imageEmoji,
  imageColor,
}: ProductGalleryProps) {
  const mainImage = getProductImage(slug, categorySlugs);

  return (
    <motion.div
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-gold/20 shadow-lg shadow-brown/10 bg-cream"
    >
      <Image
        src={mainImage}
        alt={name}
        fill
        priority
        className="object-contain p-4"
        sizes="(max-width: 1024px) 100vw, 50vw"
        unoptimized={mainImage.endsWith(".svg")}
      />
      <div
        className="absolute bottom-4 right-4 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg"
        style={{ backgroundColor: imageColor }}
        aria-hidden
      >
        {imageEmoji}
      </div>
    </motion.div>
  );
}
