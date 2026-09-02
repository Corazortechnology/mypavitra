"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice, buildLocalizedPath } from "@puja/config";
import type { CountryConfig } from "@puja/types";
import type { CartLineDetail } from "@/lib/cart";

interface CartClientProps {
  initialLines: CartLineDetail[];
  country: CountryConfig;
}

export function CartClient({ initialLines, country }: CartClientProps) {
  const [lines, setLines] = useState(initialLines);
  const [updating, setUpdating] = useState<string | null>(null);

  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const prefix = (path: string) => buildLocalizedPath(path, country);

  async function updateQty(slug: string, type: "product" | "bundle", quantity: number) {
    const key = `${type}:${slug}`;
    setUpdating(key);

    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, qty: quantity, type }),
      });

      if (!res.ok) return;

      const data = (await res.json()) as { lines: { type: "product" | "bundle"; slug: string; quantity: number }[] };
      setLines((prev) => {
        const updated = prev
          .map((line) => {
            const match = data.lines.find((l) => l.slug === line.slug && l.type === line.type);
            if (!match) return null;
            const lineTotal = line.unitPrice * match.quantity;
            return { ...line, quantity: match.quantity, lineTotal };
          })
          .filter((l): l is CartLineDetail => l !== null);

        const existingKeys = new Set(updated.map((l) => `${l.type}:${l.slug}`));
        for (const raw of data.lines) {
          const key = `${raw.type}:${raw.slug}`;
          if (!existingKeys.has(key)) {
            const prevLine = prev.find((l) => l.slug === raw.slug && l.type === raw.type);
            if (prevLine) {
              updated.push({
                ...prevLine,
                quantity: raw.quantity,
                lineTotal: prevLine.unitPrice * raw.quantity,
              });
            }
          }
        }
        return updated;
      });
    } finally {
      setUpdating(null);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="text-center py-16">
        <span className="text-5xl" aria-hidden>
          🛒
        </span>
        <h2 className="mt-4 text-xl font-semibold text-brown">Your cart is empty</h2>
        <p className="mt-2 text-brown-light">Add puja essentials to get started.</p>
        <Link
          href={prefix("/categories")}
          className="inline-block mt-6 text-saffron hover:underline font-medium"
        >
          Browse categories →
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-ivory-dark border border-ivory-dark rounded-xl overflow-hidden list-none p-0 m-0">
      {lines.map((line) => {
        const key = `${line.type}:${line.slug}`;
        const href =
          line.type === "bundle"
            ? prefix(`/bundles/${line.slug}`)
            : prefix(`/products/${line.slug}`);

        return (
          <li key={key} className="flex gap-4 p-4 bg-white">
            <div
              className="w-20 h-20 flex-shrink-0 rounded-lg flex items-center justify-center text-3xl"
              style={{ backgroundColor: line.imageColor ?? "#F0EBE3" }}
            >
              {line.imageEmoji ?? "📦"}
            </div>

            <div className="flex-1 min-w-0">
              <Link href={href} className="font-medium text-brown hover:text-saffron line-clamp-2">
                {line.name}
              </Link>
              <p className="text-sm text-brown-light mt-1">
                {formatPrice(line.unitPrice, country.currency)} each
              </p>
              {!line.inStock && (
                <p className="text-xs text-red-600 mt-1">Out of stock</p>
              )}

              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center border border-ivory-dark rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => updateQty(line.slug, line.type, line.quantity - 1)}
                    disabled={updating === key}
                    className="px-3 py-1.5 text-brown hover:bg-ivory disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-3 py-1.5 text-sm font-medium min-w-[2rem] text-center">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQty(line.slug, line.type, line.quantity + 1)}
                    disabled={updating === key || !line.inStock}
                    className="px-3 py-1.5 text-brown hover:bg-ivory disabled:opacity-50"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => updateQty(line.slug, line.type, 0)}
                  disabled={updating === key}
                  className="text-xs text-brown-light hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>

            <p className="font-semibold text-brown flex-shrink-0">
              {formatPrice(line.lineTotal, country.currency)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export function useCartSubtotal(lines: CartLineDetail[]) {
  return lines.reduce((sum, line) => sum + line.lineTotal, 0);
}
