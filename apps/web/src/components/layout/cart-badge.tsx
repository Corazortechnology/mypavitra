"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function CartBadge({ href }: { href: string }) {
  const [count, setCount] = useState(0);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    fetch("/api/cart")
      .then((r) => r.json())
      .then((d: { count?: number }) => setCount(d.count ?? 0))
      .catch(() => {});

    const interval = setInterval(() => {
      fetch("/api/cart")
        .then((r) => r.json())
        .then((d: { count?: number }) => {
          setCount((prev) => {
            if (d.count !== undefined && d.count > prev) {
              setBump(true);
              setTimeout(() => setBump(false), 400);
            }
            return d.count ?? prev;
          });
        })
        .catch(() => {});
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      href={href}
      className={`relative p-2 text-brown hover:text-saffron hover:bg-ivory-dark/50 rounded-lg transition-all ${
        bump ? "scale-110" : ""
      }`}
      aria-label={`Cart${count > 0 ? `, ${count} items` : ""}`}
    >
      <ShoppingBag className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-gradient-to-br from-saffron to-saffron-light text-white text-[10px] font-bold px-1 shadow-md shadow-saffron/30">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
