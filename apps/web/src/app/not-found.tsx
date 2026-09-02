import Link from "next/link";
import { getCountryConfig } from "@/lib/country";
import { buildLocalizedPath } from "@puja/config";

export default async function NotFound() {
  const country = await getCountryConfig();
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <div className="container-main py-24 text-center max-w-lg mx-auto">
      <span className="text-6xl" aria-hidden>
        🪔
      </span>
      <h1 className="mt-6 text-3xl font-semibold text-brown">Page not found</h1>
      <p className="mt-3 text-brown-light">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you
        back to shopping for puja essentials.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={prefix("/")}
          className="inline-block px-6 py-2.5 rounded-lg bg-saffron text-white font-medium hover:bg-saffron/90"
        >
          Go to Home
        </Link>
        <Link
          href={prefix("/categories")}
          className="inline-block px-6 py-2.5 rounded-lg border border-ivory-dark text-brown font-medium hover:border-saffron/40"
        >
          Browse Categories
        </Link>
      </div>
    </div>
  );
}
