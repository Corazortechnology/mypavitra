/** Client-safe demo payment IDs (no Node crypto). */

export function createDemoPaymentIds(orderId: string) {
  const suffix = Math.random().toString(36).slice(2, 10);
  return {
    razorpayPaymentId: `pay_demo_${suffix}`,
    razorpaySignature: `demo_sig_${suffix}_${orderId.slice(-8)}`,
  };
}
