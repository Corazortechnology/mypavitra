import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@puja/config";
import "./globals.css";

export const metadata: Metadata = {
  title: `Admin — ${BRAND.name}`,
  robots: { index: false, follow: false },
};

const NAV = [
  { label: "Dashboard", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Collections", href: "/collections" },
  { label: "Bundles", href: "/bundles" },
  { label: "Festivals", href: "/festivals" },
  { label: "Campaigns", href: "/campaigns" },
  { label: "Guides", href: "/guides" },
  { label: "Orders", href: "/orders" },
  { label: "Reviews", href: "/reviews" },
  { label: "Search Synonyms", href: "/search-synonyms" },
  { label: "Settings", href: "/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <aside className="w-56 bg-brown text-white flex-shrink-0">
          <div className="p-4 border-b border-white/10">
            <p className="font-semibold">{BRAND.name}</p>
            <p className="text-xs text-white/60">Admin CMS</p>
          </div>
          <nav className="p-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 text-sm rounded hover:bg-white/10 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </body>
    </html>
  );
}
