import { NextResponse } from "next/server";
import { clearCart, getCartDetails, estimateShipping } from "@/lib/cart";
import { verifyRazorpayPayment } from "@/lib/payments/razorpay-server";
import type { CountryCode } from "@puja/types";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    name?: string;
    phone?: string;
    countryCode?: CountryCode;
    address?: {
      line1: string;
      line2?: string;
      city: string;
      state?: string;
      postalCode: string;
      country: string;
    };
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    receipt?: string;
  };

  if (!body.email || !body.name || !body.address?.line1 || !body.address?.city) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!body.razorpayOrderId || !body.razorpayPaymentId || !body.razorpaySignature) {
    return NextResponse.json({ error: "Payment details missing" }, { status: 400 });
  }

  const valid = verifyRazorpayPayment({
    razorpayOrderId: body.razorpayOrderId,
    razorpayPaymentId: body.razorpayPaymentId,
    razorpaySignature: body.razorpaySignature,
  });

  if (!valid) {
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  const countryCode = body.countryCode ?? "IN";
  const cart = await getCartDetails(countryCode);

  if (cart.lines.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const shipping = estimateShipping(cart.subtotal, countryCode);
  const total = cart.subtotal + shipping;
  const orderNumber = body.receipt ?? `MP${Date.now().toString(36).toUpperCase()}`;

  await clearCart();

  return NextResponse.json({
    success: true,
    orderNumber,
    paymentId: body.razorpayPaymentId,
    total,
    subtotal: cart.subtotal,
    shipping,
    email: body.email,
    demo: body.razorpayOrderId.startsWith("order_demo_"),
  });
}
