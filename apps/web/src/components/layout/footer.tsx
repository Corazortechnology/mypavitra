"use client";

import Link from "next/link";
import { Flame } from "lucide-react";
import { BRAND, COUNTRY_LIST, buildLocalizedPath } from "@puja/config";
import type { CountryConfig } from "@puja/types";
import { Logo } from "@/components/ui/logo";

interface FooterProps {
  country: CountryConfig;
}

export function Footer({ country }: FooterProps) {
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <footer className="relative border-t-2 border-gold/20 bg-gradient-to-b from-cream to-ivory mt-auto overflow-hidden">
      <div className="absolute inset-0 bg-spiritual-pattern opacity-25" aria-hidden />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden />

      <div className="container-main relative py-12 sm:py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 sm:gap-10">
        <div className="col-span-2">
          <Logo href={prefix("/")} />
          <p className="mt-4 text-sm text-brown-light max-w-xs leading-relaxed">{BRAND.tagline}</p>
          <p className="mt-3 text-xs text-brown-light/70">
            Traditional Indian puja essentials, delivered worldwide.
          </p>
          <div className="mt-5 flex items-center gap-2 text-xs text-gold">
            <Flame className="w-4 h-4 text-saffron" />
            <span className="font-devanagari">सत्य · शुद्ध · श्रद्धा</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-brown mb-4 font-display text-base">Shop</h3>
          <ul className="space-y-2.5 text-sm text-brown-light">
            <li><Link href={prefix("/categories/puja-samagri")} className="hover:text-saffron transition-colors">Puja Samagri</Link></li>
            <li><Link href={prefix("/categories/brass-puja-items")} className="hover:text-saffron transition-colors">Brass Items</Link></li>
            <li><Link href={prefix("/categories/puja-kits")} className="hover:text-saffron transition-colors">Puja Kits</Link></li>
            <li><Link href={prefix("/categories/jain-puja-products")} className="hover:text-saffron transition-colors">Jain Puja</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-brown mb-4 font-display text-base">Help</h3>
          <ul className="space-y-2.5 text-sm text-brown-light">
            <li><Link href={prefix("/faq")} className="hover:text-saffron transition-colors">FAQ</Link></li>
            <li><Link href={prefix("/shipping")} className="hover:text-saffron transition-colors">Shipping</Link></li>
            <li><Link href={prefix("/returns")} className="hover:text-saffron transition-colors">Returns</Link></li>
            <li><Link href={prefix("/contact")} className="hover:text-saffron transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-brown mb-4 font-display text-base">Learn</h3>
          <ul className="space-y-2.5 text-sm text-brown-light">
            <li><Link href={prefix("/guides")} className="hover:text-saffron transition-colors">Puja Guides</Link></li>
            <li><Link href={prefix("/guides/diwali-puja-samagri-list")} className="hover:text-saffron transition-colors">Diwali Samagri List</Link></li>
            <li><Link href={prefix("/festivals")} className="hover:text-saffron transition-colors">Festivals</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-brown mb-4 font-display text-base">International</h3>
          <ul className="space-y-2.5 text-sm text-brown-light">
            {COUNTRY_LIST.filter((c) => c.urlPrefix).slice(0, 5).map((c) => (
              <li key={c.code}>
                <Link href={buildLocalizedPath("/", c)} className="hover:text-saffron transition-colors">
                  {c.flag} {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-gold/15 py-5 bg-brown/5">
        <div className="container-main flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-brown-light">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href={prefix("/privacy")} className="hover:text-saffron transition-colors">Privacy</Link>
            <Link href={prefix("/terms")} className="hover:text-saffron transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
