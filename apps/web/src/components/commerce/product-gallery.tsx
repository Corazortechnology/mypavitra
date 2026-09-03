import Image from "next/image";
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
    <div className="relative aspect-square overflow-hidden rounded-xl bg-cream ring-1 ring-gold/15 shadow-sm">
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
        className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full text-2xl shadow-md"
        style={{ backgroundColor: imageColor }}
        aria-hidden
      >
        {imageEmoji}
      </div>
    </div>
  );
}
