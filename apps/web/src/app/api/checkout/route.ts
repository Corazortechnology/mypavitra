import { NextResponse } from "next/server";
import { clearCart, getCartDetails, estimateShipping } from "@/lib/cart";
import type { CountryCode } from "@puja/types";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    name?: string;
    phone?: string;
    address?: {
      line1: string;
      line2?: string;
      city: string;
      state?: string;
      postalCode: string;
      country: string;
    };
    countryCode?: CountryCode;
    paymentMethod?: string;
  };

  if (!body.email || !body.name || !body.address?.line1 || !body.address?.city) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const countryCode = body.countryCode ?? "IN";
  const cart = await getCartDetails(countryCode);

  if (cart.lines.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const shipping = estimateShipping(cart.subtotal, countryCode);
  const total = cart.subtotal + shipping;
  const orderNumber = `MP${Date.now().toString(36).toUpperCase()}`;

  await clearCart();

  return NextResponse.json({
    success: true,
    orderNumber,
    total,
    subtotal: cart.subtotal,
    shipping,
    email: body.email,
    message:
      countryCode === "IN"
        ? "Order placed successfully. Payment integration (Razorpay) will be connected with your API keys."
        : "Order received. International payment will be enabled when Stripe is configured.",
  });
}
