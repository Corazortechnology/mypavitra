import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari, Cormorant_Garamond } from "next/font/google";
import { BRAND } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ExperienceRoot } from "@/components/experience/experience-root";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-devanagari",
  display: "swap",
});

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
      <body
        className={`${inter.variable} ${cormorant.variable} ${notoDevanagari.variable} min-h-screen flex flex-col`}
      >
        <ExperienceRoot>
          <Header country={country} />
          <main className="flex-1">{children}</main>
          <Footer country={country} />
        </ExperienceRoot>
      </body>
    </html>
  );
}
