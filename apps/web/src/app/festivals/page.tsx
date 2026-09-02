import Link from "next/link";
import { FESTIVALS } from "@puja/catalog";
import { buildLocalizedPath } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@puja/ui";

export async function generateMetadata() {
  const country = await getCountryConfig();
  return buildPageMetadata(
    {
      title: "Festival Calendar | Diwali, Navratri, Janmashtami & More",
      description:
        "Plan your puja shopping with our festival calendar. Find samagri, diyas, and gift sets for every major Hindu and Jain festival.",
    },
    country,
    "/festivals"
  );
}

function formatDateRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  if (start === end) return startDate.toLocaleDateString(countryLocale(start), opts);
  return `${startDate.toLocaleDateString(countryLocale(start), opts)} – ${endDate.toLocaleDateString(countryLocale(end), opts)}`;
}

function countryLocale(_date: string) {
  return "en-IN";
}

function getFestivalStatus(start: string, end: string) {
  const today = new Date().toISOString().slice(0, 10);
  if (today >= start && today <= end) return "active" as const;
  if (today < start) return "upcoming" as const;
  return "past" as const;
}

export default async function FestivalsPage() {
  const country = await getCountryConfig();
  const prefix = (path: string) => buildLocalizedPath(path, country);

  const sorted = [...FESTIVALS].sort((a, b) => a.startDate.localeCompare(b.startDate));

  return (
    <>
      <PageHero
        title="Festival Calendar"
        description="Never miss a puja preparation deadline. Browse our festival guides, curated collections, and bundle kits for every major celebration."
      />

      <div className="container-main py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((festival) => {
            const status = getFestivalStatus(festival.startDate, festival.endDate);
            return (
              <Link
                key={festival.slug}
                href={prefix(`/festivals/${festival.slug}`)}
                className="group rounded-xl border border-ivory-dark bg-white p-6 hover:border-saffron/40 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-lg font-semibold text-brown group-hover:text-saffron transition-colors">
                    {festival.name}
                  </h2>
                  {status === "active" && <Badge variant="savings">Live now</Badge>}
                  {status === "upcoming" && <Badge variant="default">Upcoming</Badge>}
                </div>
                <p className="mt-2 text-sm text-saffron font-medium">
                  {formatDateRange(festival.startDate, festival.endDate)}
                </p>
                <p className="mt-3 text-sm text-brown-light line-clamp-3">{festival.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
