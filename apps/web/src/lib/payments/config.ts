/** Razorpay payment configuration — demo mode when keys are absent. */

export type PaymentMode = "demo" | "razorpay_test" | "razorpay_live";

export function getPaymentMode(): PaymentMode {
  const keyId = process.env.RAZORPAY_KEY_ID ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !secret) return "demo";
  if (keyId.startsWith("rzp_test_")) return "razorpay_test";
  return "razorpay_live";
}

export function isDemoPaymentMode(): boolean {
  return getPaymentMode() === "demo";
}

export function getRazorpayKeyId(): string | null {
  return process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? process.env.RAZORPAY_KEY_ID ?? null;
}

export function getRazorpayKeySecret(): string | null {
  return process.env.RAZORPAY_KEY_SECRET ?? null;
}

/** Public config safe for client */
export function getPublicPaymentConfig() {
  const mode = getPaymentMode();
  const keyId = getRazorpayKeyId();
  return {
    mode,
    keyId: mode === "demo" ? "rzp_demo_mypavitra" : keyId,
    isDemo: mode === "demo",
    isTest: mode === "razorpay_test",
  };
}
