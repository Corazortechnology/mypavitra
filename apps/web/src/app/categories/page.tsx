import Link from "next/link";
import { CATEGORIES } from "@puja/catalog";
import { buildLocalizedPath } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";

export async function generateMetadata() {
  const country = await getCountryConfig();
  return buildPageMetadata(
    {
      title: "Shop by Category | Puja Samagri, Brass, Diyas & More",
      description:
        "Browse all puja product categories — samagri, brass items, diyas, incense, kits, Jain puja, gifts, and idols.",
    },
    country,
    "/categories"
  );
}

const CATEGORY_EMOJI: Record<string, string> = {
  "puja-samagri": "🙏",
  "brass-puja-items": "🔔",
  diyas: "🪔",
  "puja-kits": "📦",
  "incense-dhoop": "💨",
  "jain-puja-products": "☸️",
  "puja-gifts": "🎁",
  "idols-murtis": "🛕",
};

export default async function CategoriesPage() {
  const country = await getCountryConfig();
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <>
      <PageHero
        title="Shop by Category"
        description="Find everything for your daily puja, festival celebrations, and spiritual gifting — organised by product type."
      />

      <div className="container-main py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={prefix(`/categories/${cat.slug}`)}
              className="group rounded-xl border border-ivory-dark bg-white p-6 hover:border-saffron/40 hover:shadow-md transition-all"
            >
              <span className="text-4xl" aria-hidden>
                {CATEGORY_EMOJI[cat.slug] ?? "🪔"}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-brown group-hover:text-saffron transition-colors">
                {cat.name}
              </h2>
              <p className="mt-2 text-sm text-brown-light line-clamp-3">{cat.description}</p>
              <p className="mt-3 text-sm text-saffron font-medium">
                {cat.productSlugs.length} products →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
