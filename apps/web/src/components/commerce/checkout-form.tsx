"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CreditCard,
  Lock,
  MapPin,
  User,
  ChevronRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { formatPrice, buildLocalizedPath } from "@puja/config";
import type { CountryConfig } from "@puja/types";
import type { CartLineDetail } from "@/lib/cart";
import { DemoRazorpayModal } from "./demo-razorpay-modal";
import { getProductImage } from "@/lib/images";
import Image from "next/image";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

interface CheckoutFormProps {
  country: CountryConfig;
  subtotal: number;
  shipping: number;
  itemCount: number;
  lines: CartLineDetail[];
  paymentConfig: {
    mode: string;
    keyId: string | null;
    isDemo: boolean;
    isTest: boolean;
  };
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gold/20 bg-cream/50 text-brown text-sm focus:ring-2 focus:ring-saffron/30 focus:border-saffron/40 outline-none transition-all";

export function CheckoutForm({
  country,
  subtotal,
  shipping,
  itemCount,
  lines,
  paymentConfig,
}: CheckoutFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [pendingPayment, setPendingPayment] = useState<{
    orderId: string;
    amount: number;
    receipt: string;
  } | null>(null);
  const [formSnapshot, setFormSnapshot] = useState<{
    email: string;
    name: string;
    phone: string;
    address: Record<string, string>;
  } | null>(null);

  const total = subtotal + shipping;
  const prefix = (path: string) => buildLocalizedPath(path, country);
  const isIndia = country.code === "IN";

  const finalizeOrder = useCallback(
    async (payment: {
      razorpayOrderId: string;
      razorpayPaymentId: string;
      razorpaySignature: string;
      receipt: string;
    }) => {
      if (!formSnapshot) return;

      const res = await fetch("/api/payments/razorpay/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formSnapshot.email,
          name: formSnapshot.name,
          phone: formSnapshot.phone,
          countryCode: country.code,
          address: {
            line1: formSnapshot.address.line1,
            line2: formSnapshot.address.line2 || undefined,
            city: formSnapshot.address.city,
            state: formSnapshot.address.state || undefined,
            postalCode: formSnapshot.address.postalCode,
            country: country.name,
          },
          razorpayOrderId: payment.razorpayOrderId,
          razorpayPaymentId: payment.razorpayPaymentId,
          razorpaySignature: payment.razorpaySignature,
          receipt: payment.receipt,
        }),
      });

      const data = (await res.json()) as { error?: string; orderNumber?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Order confirmation failed");
      }

      setDemoModalOpen(false);
      router.push(prefix(`/checkout/success?order=${data.orderNumber}`));
    },
    [country, formSnapshot, prefix, router]
  );

  function loadRazorpayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Razorpay"));
      document.body.appendChild(script);
    });
  }

  async function openRealRazorpay(orderData: {
    orderId: string;
    amount: number;
    keyId: string;
    receipt: string;
    prefill: { name: string; email: string };
  }) {
    await loadRazorpayScript();

    const rzp = new window.Razorpay!({
      key: orderData.keyId,
      amount: orderData.amount,
      currency: "INR",
      name: "MyPavitra",
      description: "Puja & Spiritual Products",
      order_id: orderData.orderId,
      prefill: orderData.prefill,
      theme: { color: "#E8841A" },
      handler: (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        void finalizeOrder({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          receipt: orderData.receipt,
        }).catch((err) => {
          setError(err instanceof Error ? err.message : "Payment failed");
          setLoading(false);
        });
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
        },
      },
    });

    rzp.open();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const snapshot = {
      email: String(form.get("email") ?? ""),
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      address: {
        line1: String(form.get("line1") ?? ""),
        line2: String(form.get("line2") ?? ""),
        city: String(form.get("city") ?? ""),
        state: String(form.get("state") ?? ""),
        postalCode: String(form.get("postalCode") ?? ""),
      },
    };
    setFormSnapshot(snapshot);

    try {
      if (!isIndia) {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: snapshot.email,
            name: snapshot.name,
            phone: snapshot.phone,
            countryCode: country.code,
            address: {
              ...snapshot.address,
              country: country.name,
            },
          }),
        });
        const data = (await res.json()) as { error?: string; orderNumber?: string };
        if (!res.ok) throw new Error(data.error ?? "Checkout failed");
        router.push(prefix(`/checkout/success?order=${data.orderNumber}`));
        return;
      }

      const orderRes = await fetch("/api/payments/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          countryCode: country.code,
          email: snapshot.email,
          name: snapshot.name,
        }),
      });

      const orderData = (await orderRes.json()) as {
        error?: string;
        orderId?: string;
        amount?: number;
        keyId?: string;
        receipt?: string;
        demo?: boolean;
        prefill?: { name: string; email: string };
      };

      if (!orderRes.ok || !orderData.orderId || !orderData.amount || !orderData.receipt) {
        throw new Error(orderData.error ?? "Could not start payment");
      }

      if (orderData.demo) {
        setPendingPayment({
          orderId: orderData.orderId,
          amount: orderData.amount,
          receipt: orderData.receipt,
        });
        setDemoModalOpen(true);
        setLoading(false);
        return;
      }

      if (!orderData.keyId) throw new Error("Razorpay key missing");

      await openRealRazorpay({
        orderId: orderData.orderId,
        amount: orderData.amount,
        keyId: orderData.keyId,
        receipt: orderData.receipt,
        prefill: orderData.prefill ?? { name: snapshot.name, email: snapshot.email },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  }

  return (
    <>
      <DemoRazorpayModal
        open={demoModalOpen}
        onClose={() => {
          setDemoModalOpen(false);
          setLoading(false);
        }}
        amount={pendingPayment?.amount ?? total * 100}
        orderId={pendingPayment?.orderId ?? ""}
        receipt={pendingPayment?.receipt ?? ""}
        customerName={formSnapshot?.name ?? ""}
        customerEmail={formSnapshot?.email ?? ""}
        onSuccess={(payment) => {
          setLoading(true);
          void finalizeOrder(payment).catch((err) => {
            setError(err instanceof Error ? err.message : "Order failed");
            setLoading(false);
          });
        }}
      />

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          {/* Progress steps */}
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            {["Cart", "Details", "Payment"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold ${
                    i <= 1
                      ? "bg-saffron text-white"
                      : "bg-ivory-dark text-brown-light"
                  }`}
                >
                  {i + 1}
                </span>
                <span className={i <= 1 ? "text-brown font-medium" : "text-brown-light"}>
                  {step}
                </span>
                {i < 2 && <ChevronRight className="w-4 h-4 text-gold/60 mx-1" />}
              </div>
            ))}
          </div>

          <fieldset className="ornate-card p-6 space-y-4">
            <legend className="flex items-center gap-2 text-lg font-display font-semibold text-brown px-2">
              <User className="w-5 h-5 text-saffron" /> Contact
            </legend>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brown mb-1.5">
                Email
              </label>
              <input id="email" name="email" type="email" required defaultValue="test@example.com" className={inputClass} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-brown mb-1.5">
                  Full name
                </label>
                <input id="name" name="name" type="text" required defaultValue="Test Customer" className={inputClass} />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-brown mb-1.5">
                  Phone
                </label>
                <input id="phone" name="phone" type="tel" defaultValue="9876543210" className={inputClass} />
              </div>
            </div>
          </fieldset>

          <fieldset className="ornate-card p-6 space-y-4">
            <legend className="flex items-center gap-2 text-lg font-display font-semibold text-brown px-2">
              <MapPin className="w-5 h-5 text-saffron" /> Shipping address
            </legend>
            <div>
              <label htmlFor="line1" className="block text-sm font-medium text-brown mb-1.5">
                Address line 1
              </label>
              <input id="line1" name="line1" type="text" required defaultValue="123 Temple Road" className={inputClass} />
            </div>
            <div>
              <label htmlFor="line2" className="block text-sm font-medium text-brown mb-1.5">
                Address line 2 (optional)
              </label>
              <input id="line2" name="line2" type="text" className={inputClass} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-brown mb-1.5">
                  City
                </label>
                <input id="city" name="city" type="text" required defaultValue="Mumbai" className={inputClass} />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-brown mb-1.5">
                  State
                </label>
                <input id="state" name="state" type="text" defaultValue="Maharashtra" className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-brown mb-1.5">
                PIN / Postal code
              </label>
              <input id="postalCode" name="postalCode" type="text" required defaultValue="400001" className={inputClass} />
            </div>
            <p className="text-sm text-brown-light flex items-center gap-2">
              <Truck className="w-4 h-4 text-saffron" />
              Shipping to: {country.flag} {country.name}
            </p>
          </fieldset>

          {/* Payment section */}
          <fieldset className="ornate-card p-6 space-y-4">
            <legend className="flex items-center gap-2 text-lg font-display font-semibold text-brown px-2">
              <CreditCard className="w-5 h-5 text-saffron" /> Payment
            </legend>

            {isIndia ? (
              <div className="rounded-xl border-2 border-[#072654]/20 bg-gradient-to-br from-[#072654]/5 to-white p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#072654] flex items-center justify-center text-white text-xs font-bold">
                      RP
                    </div>
                    <div>
                      <p className="font-medium text-brown">Razorpay</p>
                      <p className="text-xs text-brown-light">
                        UPI · Cards · Netbanking · Wallets
                      </p>
                    </div>
                  </div>
                  {paymentConfig.isDemo && (
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-amber-100 text-amber-800 uppercase">
                      Test mode
                    </span>
                  )}
                  {paymentConfig.isTest && (
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-100 text-blue-800 uppercase">
                      rzp_test
                    </span>
                  )}
                </div>
                {paymentConfig.isDemo && (
                  <p className="mt-3 text-xs text-brown-light leading-relaxed">
                    Demo checkout opens a Razorpay-style test modal. Use card{" "}
                    <code className="bg-ivory-dark px-1 rounded">4111 1111 1111 1111</code> or UPI{" "}
                    <code className="bg-ivory-dark px-1 rounded">success@razorpay</code>
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-brown-light">
                International card payments (Stripe) — demo order without payment for now.
              </p>
            )}

            <div className="flex items-center gap-2 text-xs text-brown-light">
              <Lock className="w-3.5 h-3.5 text-gold" />
              <ShieldCheck className="w-3.5 h-3.5 text-saffron" />
              256-bit encrypted · Secure checkout
            </div>
          </fieldset>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
              role="alert"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className="btn-shine w-full py-4 rounded-xl bg-gradient-to-r from-saffron via-saffron-light to-gold text-white font-semibold text-base shadow-xl shadow-saffron/25 hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 ring-2 ring-gold/20"
          >
            {loading ? (
              <>🪔 Opening secure payment…</>
            ) : isIndia ? (
              <>Pay {formatPrice(total, country.currency)} with Razorpay</>
            ) : (
              <>Place order — {formatPrice(total, country.currency)}</>
            )}
          </motion.button>
        </form>

        <aside className="lg:col-span-2">
          <div className="ornate-card p-6 sticky top-24 space-y-4">
            <h2 className="font-display text-xl text-brown">Order summary</h2>

            <ul className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
              {lines.map((line) => {
                const img =
                  line.type === "product"
                    ? getProductImage(line.slug, [])
                    : "/images/bundles/daily-puja-starter-kit.svg";
                return (
                  <li key={`${line.type}-${line.slug}`} className="flex gap-3">
                    <div className="relative w-14 h-14 rounded-lg bg-cream overflow-hidden flex-shrink-0 ring-1 ring-gold/15">
                      <Image src={img} alt="" fill className="object-contain p-1" unoptimized />
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-saffron text-white text-[10px] font-bold flex items-center justify-center">
                        {line.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-brown line-clamp-2">{line.name}</p>
                      <p className="text-xs text-brown-light mt-0.5">
                        {formatPrice(line.unitPrice, country.currency)} × {line.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-brown">
                      {formatPrice(line.lineTotal, country.currency)}
                    </p>
                  </li>
                );
              })}
            </ul>

            <dl className="space-y-2 text-sm border-t border-gold/15 pt-4">
              <div className="flex justify-between">
                <dt className="text-brown-light">Items ({itemCount})</dt>
                <dd className="text-brown">{formatPrice(subtotal, country.currency)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-brown-light">Shipping</dt>
                <dd className="text-brown">
                  {shipping === 0 ? (
                    <span className="text-saffron font-medium">Free</span>
                  ) : (
                    formatPrice(shipping, country.currency)
                  )}
                </dd>
              </div>
              <div className="flex justify-between pt-3 border-t border-gold/15 font-semibold text-base">
                <dt className="text-brown font-display">Total</dt>
                <dd className="text-saffron">{formatPrice(total, country.currency)}</dd>
              </div>
            </dl>

            <p className="text-[11px] text-brown-light text-center font-devanagari pt-2">
              ॐ शुभम् · Secure & blessed delivery
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
