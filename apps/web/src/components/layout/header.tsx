import Link from "next/link";
import { Search } from "lucide-react";
import type { CountryConfig } from "@puja/types";
import { buildLocalizedPath } from "@puja/config";
import {
  AnnouncementBar,
  DesktopNav,
  MobileNav,
  Logo,
  CartBadge,
  CountrySelector,
} from "./header-nav";
import { SoundToggle } from "@/components/experience/sound-toggle";

interface HeaderProps {
  country: CountryConfig;
}

export function Header({ country }: HeaderProps) {
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <header className="sticky top-0 z-40">
      <AnnouncementBar country={country} />
      <div className="border-b border-gold/20 nav-temple backdrop-blur-md shadow-md shadow-brown/5">
        <div className="container-main flex h-16 lg:h-[4.25rem] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MobileNav country={country} />
            <Logo href={prefix("/")} />
          </div>

          <DesktopNav country={country} />

          <div className="flex items-center gap-2 sm:gap-3">
            <SoundToggle />
            <div className="hidden sm:block">
              <CountrySelector current={country} />
            </div>
            <Link
              href={prefix("/search")}
              className="p-2 text-brown hover:text-saffron hover:bg-ivory-dark/50 rounded-lg transition-all"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <CartBadge href={prefix("/cart")} />
          </div>
        </div>
      </div>
    </header>
  );
}
