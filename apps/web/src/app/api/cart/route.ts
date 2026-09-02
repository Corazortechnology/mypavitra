import { NextResponse } from "next/server";
import { addToCart, getCartLines, updateCartLine } from "@/lib/cart";
import { getProductBySlug, getBundleBySlug } from "@puja/catalog";

export async function GET() {
  const lines = await getCartLines();
  return NextResponse.json({ lines, count: lines.reduce((s, l) => s + l.quantity, 0) });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    slug?: string;
    qty?: number;
    type?: "product" | "bundle";
  };

  if (!body.slug || !body.qty || body.qty < 1) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const type = body.type ?? "product";
  const exists =
    type === "bundle" ? getBundleBySlug(body.slug) : getProductBySlug(body.slug);

  if (!exists) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const lines = await addToCart(body.slug, body.qty, type);
  return NextResponse.json({
    lines,
    count: lines.reduce((s, l) => s + l.quantity, 0),
  });
}

export async function PATCH(request: Request) {
  const body = (await request.json()) as {
    slug?: string;
    qty?: number;
    type?: "product" | "bundle";
  };

  if (!body.slug || body.qty === undefined) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const lines = await updateCartLine(body.slug, body.qty, body.type ?? "product");
  return NextResponse.json({ lines });
}
