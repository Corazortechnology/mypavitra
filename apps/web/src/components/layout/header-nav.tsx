"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buildLocalizedPath, SHOP_BY_PURPOSE } from "@puja/config";
import type { CountryConfig } from "@puja/types";
import { Logo } from "@/components/ui/logo";
import { CountrySelector } from "./country-selector";
import { CartBadge } from "./cart-badge";

const NAV_ITEMS = [
  {
    label: "Shop",
    href: "/categories",
    children: [
      { label: "Puja Samagri", href: "/categories/puja-samagri" },
      { label: "Brass & Copper", href: "/categories/brass-puja-items" },
      { label: "Idols & Murtis", href: "/categories/idols-murtis" },
      { label: "Diyas", href: "/categories/diyas" },
      { label: "Puja Kits", href: "/categories/puja-kits" },
      { label: "Incense & Dhoop", href: "/categories/incense-dhoop" },
      { label: "Jain Puja", href: "/categories/jain-puja-products" },
      { label: "Gifts", href: "/categories/puja-gifts" },
    ],
  },
  {
    label: "Shop by Purpose",
    href: "/shop-by-purpose/daily-puja",
    children: SHOP_BY_PURPOSE.slice(0, 8).map((p) => ({
      label: p.name,
      href: `/shop-by-purpose/${p.slug}`,
    })),
  },
  {
    label: "Festivals",
    href: "/festivals",
    children: [
      { label: "Diwali", href: "/festivals/diwali" },
      { label: "Navratri", href: "/festivals/navratri" },
      { label: "Ganesh Chaturthi", href: "/festivals/ganesh-chaturthi" },
      { label: "Jain Festivals", href: "/festivals/paryushan" },
    ],
  },
  {
    label: "Learn",
    href: "/guides",
    children: [
      { label: "Puja Guides", href: "/guides" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

interface MobileNavProps {
  country: CountryConfig;
}

export function MobileNav({ country }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="p-2 -mr-2 text-brown hover:text-saffron transition-colors rounded-lg hover:bg-ivory-dark/50"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-brown/40 backdrop-blur-sm z-50"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed top-0 right-0 bottom-0 w-[min(100vw,320px)] bg-cream z-50 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-ivory-dark">
                <Logo href={prefix("/")} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-2 text-brown hover:text-saffron rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded(expanded === item.label ? null : item.label)
                      }
                      className="flex w-full items-center justify-between py-3 px-2 text-brown font-medium hover:text-saffron transition-colors"
                    >
                      <Link href={prefix(item.href)} onClick={() => setOpen(false)}>
                        {item.label}
                      </Link>
                      {item.children && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${expanded === item.label ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>
                    <AnimatePresence>
                      {item.children && expanded === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4 space-y-1"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={prefix(child.href)}
                              onClick={() => setOpen(false)}
                              className="block py-2 text-sm text-brown-light hover:text-saffron"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              <div className="p-4 border-t border-ivory-dark space-y-3">
                <CountrySelector current={country} />
                <div className="flex items-center justify-between">
                  <Link
                    href={prefix("/search")}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-sm text-brown hover:text-saffron"
                  >
                    <Search className="w-4 h-4" /> Search
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

interface DesktopNavProps {
  country: CountryConfig;
}

export function DesktopNav({ country }: DesktopNavProps) {
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <div key={item.label} className="relative group">
          <Link
            href={prefix(item.href)}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-brown hover:text-saffron transition-colors rounded-lg hover:bg-saffron/5 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-saffron after:to-transparent hover:after:w-full after:transition-all after:duration-300"
          >
            {item.label}
            {item.children && <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-300" />}
          </Link>
          {item.children && (
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
              <div className="min-w-[220px] rounded-xl border border-gold/20 bg-cream/98 backdrop-blur-md py-2 shadow-xl shadow-brown/10 ring-1 ring-gold/10">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={prefix(child.href)}
                    className="block px-4 py-2.5 text-sm text-brown hover:bg-gradient-to-r hover:from-saffron/5 hover:to-transparent hover:text-saffron transition-all"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

export function AnnouncementBar({ country }: { country: CountryConfig }) {
  const threshold =
    country.currency === "INR"
      ? `₹${country.freeShippingThreshold}`
      : `$${country.freeShippingThreshold}`;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-brown via-maroon to-brown text-white text-center text-xs sm:text-sm py-2.5 px-4">
      <div className="absolute inset-0 bg-spiritual-pattern opacity-30" aria-hidden />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
      >
        <span className="inline-flex items-center gap-1.5 animate-diya-flicker">
          <span className="text-saffron-light">🪔</span>
          Free delivery above {threshold}
        </span>
        <span className="hidden sm:inline text-white/40">✦</span>
        <span className="font-devanagari text-saffron-light/90">शुद्ध · प्रामाणिक</span>
        <span className="hidden sm:inline text-white/40">✦</span>
        <span className="hidden sm:inline">Ships worldwide</span>
      </motion.p>
    </div>
  );
}

export { Logo, CartBadge, CountrySelector };
