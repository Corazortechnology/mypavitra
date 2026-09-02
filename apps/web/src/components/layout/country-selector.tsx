"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Globe } from "lucide-react";
import { COUNTRY_LIST, buildLocalizedPath } from "@puja/config";
import type { CountryConfig } from "@puja/types";

interface CountrySelectorProps {
  current: CountryConfig;
}

export function CountrySelector({ current }: CountrySelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function getPathForCountry(country: CountryConfig) {
    if (typeof window === "undefined") return buildLocalizedPath("/", country);
    const segments = window.location.pathname.split("/").filter(Boolean);
    const knownPrefixes = COUNTRY_LIST.map((c) => c.urlPrefix).filter(Boolean);
    const withoutPrefix =
      segments[0] && knownPrefixes.includes(segments[0]!) ? segments.slice(1) : segments;
    const base = withoutPrefix.length ? `/${withoutPrefix.join("/")}` : "/";
    return buildLocalizedPath(base, country);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-brown hover:text-saffron rounded-lg hover:bg-ivory-dark/50 transition-all border border-transparent hover:border-ivory-dark"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select country store"
      >
        <Globe className="w-4 h-4 text-saffron/70" />
        <span>{current.flag}</span>
        <span className="hidden sm:inline font-medium">{current.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 z-50 min-w-[200px] rounded-xl border border-ivory-dark bg-white/95 backdrop-blur-md py-1.5 shadow-xl shadow-brown/10 animate-fade-up"
        >
          {COUNTRY_LIST.map((country) => (
            <li key={country.code} role="option" aria-selected={country.code === current.code}>
              <Link
                href={getPathForCountry(country)}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                  country.code === current.code
                    ? "bg-saffron/10 text-saffron font-medium"
                    : "text-brown hover:bg-ivory hover:text-saffron"
                }`}
              >
                <span className="text-base">{country.flag}</span>
                <span>{country.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
