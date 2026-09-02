import Link from "next/link";
import { searchProducts } from "@puja/catalog";
import { buildLocalizedPath } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { ProductGrid } from "@/components/commerce/product-grid";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const country = await getCountryConfig();
  const query = q?.trim() ?? "";
  return buildPageMetadata(
    {
      title: query ? `Search: ${query} | MyPavitra` : "Search | MyPavitra",
      description: query
        ? `Search results for "${query}" — puja samagri, brass items, diyas, and more.`
        : "Search our catalog of puja samagri, brass items, diyas, kits, and spiritual products.",
      noindex: !!query,
    },
    country,
    "/search"
  );
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const country = await getCountryConfig();
  const query = q?.trim() ?? "";
  const results = query
    ? searchProducts(query).filter((p) => p.prices[country.code] !== undefined)
    : [];
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <div className="container-main py-12">
      <h1 className="text-2xl font-semibold text-brown mb-6">Search</h1>

      <form method="GET" action={prefix("/search")} className="max-w-xl mb-10">
        <div className="flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search puja items, diyas, samagri…"
            className="flex-1 px-4 py-2.5 rounded-lg border border-ivory-dark text-brown text-sm"
            aria-label="Search query"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-saffron text-white font-medium text-sm hover:bg-saffron/90"
          >
            Search
          </button>
        </div>
      </form>

      {query && results.length === 0 && (
        <div className="text-center py-16">
          <span className="text-5xl" aria-hidden>
            🔍
          </span>
          <h2 className="mt-4 text-xl font-semibold text-brown">No results for &ldquo;{query}&rdquo;</h2>
          <p className="mt-2 text-brown-light">
            Try different keywords like &ldquo;diya&rdquo;, &ldquo;samagri&rdquo;, or &ldquo;brass bell&rdquo;.
          </p>
          <Link href={prefix("/categories")} className="inline-block mt-6 text-saffron hover:underline">
            Browse categories →
          </Link>
        </div>
      )}

      {query && results.length > 0 && (
        <>
          <p className="text-brown-light mb-6">
            {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
          <ProductGrid products={results} country={country} />
        </>
      )}

      {!query && (
        <p className="text-brown-light">
          Enter a search term to find puja samagri, brass items, diyas, kits, and more.
        </p>
      )}
    </div>
  );
}
