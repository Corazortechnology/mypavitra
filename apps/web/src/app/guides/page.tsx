import Link from "next/link";
import { GUIDES } from "@puja/catalog";
import { buildLocalizedPath } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";

export async function generateMetadata() {
  const country = await getCountryConfig();
  return buildPageMetadata(
    {
      title: "Puja Guides & How-To Articles | MyPavitra",
      description:
        "Expert puja guides — samagri lists, festival checklists, brass care tips, and step-by-step worship instructions.",
    },
    country,
    "/guides"
  );
}

export default async function GuidesPage() {
  const country = await getCountryConfig();
  const prefix = (path: string) => buildLocalizedPath(path, country);

  const byCategory = GUIDES.reduce<Record<string, typeof GUIDES>>((acc, guide) => {
    const cat = guide.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat]!.push(guide);
    return acc;
  }, {});

  const categoryLabels: Record<string, string> = {
    "festival-guides": "Festival Guides",
    "product-guides": "Product Guides",
    "how-to": "How-To",
    "traditions": "Traditions",
  };

  return (
    <>
      <PageHero
        title="Puja Guides"
        description="Practical guides for daily worship, festival preparation, and caring for your puja items — written by our team and verified by tradition."
      />

      <div className="container-main py-12 space-y-12">
        {Object.entries(byCategory).map(([category, guides]) => (
          <section key={category}>
            <h2 className="text-xl font-semibold text-brown mb-6">
              {categoryLabels[category] ?? category}
            </h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={prefix(`/guides/${guide.slug}`)}
                    className="block h-full p-5 rounded-xl border border-ivory-dark bg-white hover:border-saffron/40 hover:shadow-sm transition-all"
                  >
                    <h3 className="font-medium text-brown hover:text-saffron">{guide.title}</h3>
                    <p className="mt-2 text-sm text-brown-light line-clamp-3">{guide.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
