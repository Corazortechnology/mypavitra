import { createHmac, randomBytes } from "crypto";
import { getRazorpayKeyId, getRazorpayKeySecret, isDemoPaymentMode } from "./config";

export interface CreateRazorpayOrderInput {
  amountInr: number; // rupees (will convert to paise)
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrderResult {
  id: string;
  amount: number;
  currency: string;
  demo: boolean;
}

/** Create Razorpay order via REST API, or demo order when keys missing */
export async function createRazorpayOrder(
  input: CreateRazorpayOrderInput
): Promise<RazorpayOrderResult> {
  const amountPaise = Math.round(input.amountInr * 100);

  if (isDemoPaymentMode()) {
    const suffix = randomBytes(4).toString("hex");
    return {
      id: `order_demo_${suffix}`,
      amount: amountPaise,
      currency: "INR",
      demo: true,
    };
  }

  const keyId = getRazorpayKeyId();
  const keySecret = getRazorpayKeySecret();
  if (!keyId || !keySecret) {
    throw new Error("Razorpay keys not configured");
  }

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountPaise,
      currency: "INR",
      receipt: input.receipt,
      notes: input.notes,
    }),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: { description?: string } };
    throw new Error(err.error?.description ?? "Failed to create Razorpay order");
  }

  const order = (await res.json()) as { id: string; amount: number; currency: string };
  return { id: order.id, amount: order.amount, currency: order.currency, demo: false };
}

export interface VerifyPaymentInput {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export function verifyRazorpayPayment(input: VerifyPaymentInput): boolean {
  if (input.razorpayOrderId.startsWith("order_demo_")) {
    return (
      input.razorpayPaymentId.startsWith("pay_demo_") &&
      input.razorpaySignature.startsWith("demo_sig_")
    );
  }

  const secret = getRazorpayKeySecret();
  if (!secret) return false;

  const expected = createHmac("sha256", secret)
    .update(`${input.razorpayOrderId}|${input.razorpayPaymentId}`)
    .digest("hex");

  return expected === input.razorpaySignature;
}

export function createDemoPaymentIds(orderId: string) {
  const suffix = randomBytes(6).toString("hex");
  return {
    razorpayPaymentId: `pay_demo_${suffix}`,
    razorpaySignature: `demo_sig_${suffix}_${orderId.slice(-8)}`,
  };
}
