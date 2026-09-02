import { cookies } from "next/headers";
import {
  getProductBySlug,
  getBundleBySlug,
  type CatalogProduct,
} from "@puja/catalog";
import type { CountryCode } from "@puja/types";
import { COUNTRIES } from "@puja/config";

export interface CartLine {
  type: "product" | "bundle";
  slug: string;
  quantity: number;
}

export interface CartLineDetail {
  type: "product" | "bundle";
  slug: string;
  quantity: number;
  name: string;
  unitPrice: number;
  lineTotal: number;
  imageEmoji?: string;
  imageColor?: string;
  inStock: boolean;
}

const CART_COOKIE = "puja_cart";

export async function getCartLines(): Promise<CartLine[]> {
  const jar = await cookies();
  const raw = jar.get(CART_COOKIE)?.value;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveCartLines(lines: CartLine[]): Promise<void> {
  const jar = await cookies();
  jar.set(CART_COOKIE, JSON.stringify(lines), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function addToCart(
  slug: string,
  qty: number,
  type: "product" | "bundle" = "product"
): Promise<CartLine[]> {
  const lines = await getCartLines();
  const existing = lines.find((l) => l.slug === slug && l.type === type);
  if (existing) {
    existing.quantity += qty;
  } else {
    lines.push({ type, slug, quantity: qty });
  }
  await saveCartLines(lines);
  return lines;
}

export async function updateCartLine(
  slug: string,
  quantity: number,
  type: "product" | "bundle" = "product"
): Promise<CartLine[]> {
  let lines = await getCartLines();
  if (quantity <= 0) {
    lines = lines.filter((l) => !(l.slug === slug && l.type === type));
  } else {
    lines = lines.map((l) =>
      l.slug === slug && l.type === type ? { ...l, quantity } : l
    );
  }
  await saveCartLines(lines);
  return lines;
}

export async function clearCart(): Promise<void> {
  await saveCartLines([]);
}

export function resolveLinePrice(
  line: CartLine,
  countryCode: CountryCode
): { name: string; unitPrice: number; inStock: boolean; imageEmoji?: string; imageColor?: string } | null {
  if (line.type === "product") {
    const product = getProductBySlug(line.slug);
    if (!product) return null;
    const price = product.prices[countryCode]?.selling;
    if (price === undefined) return null;
    return {
      name: product.name,
      unitPrice: price,
      inStock: product.inStock,
      imageEmoji: product.imageEmoji,
      imageColor: product.imageColor,
    };
  }
  const bundle = getBundleBySlug(line.slug);
  if (!bundle) return null;
  const price = bundle.prices[countryCode]?.bundle;
  if (price === undefined) return null;
  return {
    name: bundle.name,
    unitPrice: price,
    inStock: true,
    imageEmoji: "📦",
    imageColor: "#F0EBE3",
  };
}

export async function getCartDetails(countryCode: CountryCode): Promise<{
  lines: CartLineDetail[];
  subtotal: number;
  itemCount: number;
}> {
  const raw = await getCartLines();
  const lines: CartLineDetail[] = [];
  let subtotal = 0;
  let itemCount = 0;

  for (const line of raw) {
    const resolved = resolveLinePrice(line, countryCode);
    if (!resolved) continue;
    const lineTotal = resolved.unitPrice * line.quantity;
    subtotal += lineTotal;
    itemCount += line.quantity;
    lines.push({
      type: line.type,
      slug: line.slug,
      quantity: line.quantity,
      name: resolved.name,
      unitPrice: resolved.unitPrice,
      lineTotal,
      imageEmoji: resolved.imageEmoji,
      imageColor: resolved.imageColor,
      inStock: resolved.inStock,
    });
  }

  return { lines, subtotal, itemCount };
}

export function estimateShipping(subtotal: number, countryCode: CountryCode): number {
  const country = COUNTRIES[countryCode];
  if (subtotal >= country.freeShippingThreshold) return 0;
  if (countryCode === "IN") return subtotal > 0 ? 49 : 0;
  return subtotal > 0 ? 12 : 0;
}
