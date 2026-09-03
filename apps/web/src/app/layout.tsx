import type { Metadata } from "next";
import "@fontsource-variable/dm-sans/wght.css";
import "@fontsource/instrument-serif/400.css";
import { BRAND } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ExperienceRoot } from "@/components/experience/experience-root";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const country = await getCountryConfig();
  return buildPageMetadata(
    {
      title: `${BRAND.name} — Authentic Puja & Spiritual Products`,
      description:
        "Better quality spiritual and puja products at honest prices. Puja samagri, brass items, kits & more — delivered to India and worldwide.",
    },
    country
  );
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const country = await getCountryConfig();

  return (
    <html lang={country.locale.split("-")[0]}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()]),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ExperienceRoot>
          <Header country={country} />
          <main className="flex-1">{children}</main>
          <Footer country={country} />
        </ExperienceRoot>
      </body>
    </html>
  );
}
