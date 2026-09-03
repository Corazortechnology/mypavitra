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
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-gold shadow-sm shadow-saffron/15 transition-shadow duration-[var(--duration-fast)] group-hover:shadow-md group-hover:shadow-saffron/20">
        <Flame
          className="h-5 w-5 text-white transition-transform duration-[var(--duration-fast)] group-hover:scale-105 motion-reduce:transform-none"
          strokeWidth={2.5}
        />
      </span>
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl sm:text-2xl font-semibold text-brown transition-colors duration-[var(--duration-fast)] group-hover:text-saffron">
          {BRAND.name}
        </span>
        <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-gold sm:block">
          Puja & Spiritual
        </span>
      </div>
    </Link>
  );
}
