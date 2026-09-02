import Link from "next/link";
import { Flame } from "lucide-react";
import { BRAND } from "@puja/config";

interface LogoProps {
  href: string;
  className?: string;
}

export function Logo({ href, className = "" }: LogoProps) {
  return (
    <Link href={href} className={`group flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-gold shadow-md shadow-saffron/20 group-hover:shadow-lg group-hover:shadow-saffron/30 transition-shadow duration-300">
        <Flame className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
        <span className="absolute inset-0 rounded-full bg-saffron/20 animate-glow pointer-events-none" aria-hidden />
      </span>
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl sm:text-2xl font-semibold text-brown group-hover:text-saffron transition-colors">
          {BRAND.name}
        </span>
        <span className="hidden sm:block text-[10px] text-gold tracking-[0.2em] uppercase font-medium">
          Puja & Spiritual
        </span>
      </div>
    </Link>
  );
}
