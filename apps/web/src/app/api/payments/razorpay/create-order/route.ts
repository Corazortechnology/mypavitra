import { NextResponse } from "next/server";
import { getCartDetails, estimateShipping } from "@/lib/cart";
import { createRazorpayOrder } from "@/lib/payments/razorpay-server";
import { getPublicPaymentConfig } from "@/lib/payments/config";
import type { CountryCode } from "@puja/types";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    countryCode?: CountryCode;
    email?: string;
    name?: string;
  };

  const countryCode = body.countryCode ?? "IN";

  if (countryCode !== "IN") {
    return NextResponse.json(
      { error: "Razorpay is available for India orders only. International payments coming soon." },
      { status: 400 }
    );
  }

  const cart = await getCartDetails(countryCode);
  if (cart.lines.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const shipping = estimateShipping(cart.subtotal, countryCode);
  const total = cart.subtotal + shipping;
  const receipt = `MP${Date.now().toString(36).toUpperCase()}`;

  try {
    const order = await createRazorpayOrder({
      amountInr: total,
      receipt,
      notes: {
        email: body.email ?? "",
        name: body.name ?? "",
        items: String(cart.itemCount),
      },
    });

    const config = getPublicPaymentConfig();

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt,
      keyId: config.keyId,
      demo: order.demo,
      mode: config.mode,
      prefill: {
        name: body.name ?? "",
        email: body.email ?? "",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Payment initialization failed" },
      { status: 500 }
    );
  }
}
