"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Smartphone, Building2, Wallet, Shield, Loader2 } from "lucide-react";
import { formatPrice } from "@puja/config";
import { createDemoPaymentIds } from "@/lib/payments/demo-client";

type PaymentTab = "upi" | "card" | "netbanking" | "wallet";

interface DemoRazorpayModalProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  orderId: string;
  receipt: string;
  customerName: string;
  customerEmail: string;
  onSuccess: (payment: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    receipt: string;
  }) => void;
}

const TABS: { id: PaymentTab; label: string; icon: typeof CreditCard }[] = [
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "card", label: "Card", icon: CreditCard },
  { id: "netbanking", label: "Netbanking", icon: Building2 },
  { id: "wallet", label: "Wallet", icon: Wallet },
];

export function DemoRazorpayModal({
  open,
  onClose,
  amount,
  orderId,
  receipt,
  customerName,
  customerEmail,
  onSuccess,
}: DemoRazorpayModalProps) {
  const [tab, setTab] = useState<PaymentTab>("upi");
  const [paying, setPaying] = useState(false);
  const [upiId, setUpiId] = useState("success@razorpay");
  const [cardNumber, setCardNumber] = useState("4111 1111 1111 1111");

  async function handlePay() {
    setPaying(true);
    await new Promise((r) => setTimeout(r, 1800));
    const ids = createDemoPaymentIds(orderId);
    onSuccess({
      razorpayOrderId: orderId,
      razorpayPaymentId: ids.razorpayPaymentId,
      razorpaySignature: ids.razorpaySignature,
      receipt,
    });
    setPaying(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw-2rem,420px)] z-[111] rounded-2xl overflow-hidden shadow-2xl"
            role="dialog"
            aria-modal
            aria-label="Razorpay test payment"
          >
            {/* Header — Razorpay-style */}
            <div className="bg-[#072654] text-white px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wider">MyPavitra</p>
                <p className="text-2xl font-semibold mt-0.5">
                  {formatPrice(amount / 100, "INR")}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Test mode banner */}
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2 text-xs text-amber-900">
              <span className="font-bold px-1.5 py-0.5 bg-amber-200 rounded text-[10px]">TEST</span>
              Demo Razorpay — no real money charged
            </div>

            <div className="bg-white p-4">
              <p className="text-xs text-gray-500 mb-3">
                Paying as <span className="text-gray-800 font-medium">{customerName || "Guest"}</span>
                {customerEmail && <> · {customerEmail}</>}
              </p>

              {/* Tabs */}
              <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-4">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTab(id)}
                    className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-[10px] font-medium transition-all ${
                      tab === id
                        ? "bg-white text-[#072654] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {tab === "upi" && (
                <div className="space-y-3">
                  <label className="block text-xs font-medium text-gray-600">UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#072654]/30 outline-none"
                    placeholder="yourname@upi"
                  />
                  <p className="text-[11px] text-gray-400">
                    Test UPI: <code className="bg-gray-100 px-1 rounded">success@razorpay</code>
                  </p>
                </div>
              )}

              {tab === "card" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Card number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-mono focus:ring-2 focus:ring-[#072654]/30 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Expiry</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#072654]/30 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">CVV</label>
                      <input
                        type="text"
                        defaultValue="123"
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#072654]/30 outline-none"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Test card: <code className="bg-gray-100 px-1 rounded">4111 1111 1111 1111</code>
                  </p>
                </div>
              )}

              {tab === "netbanking" && (
                <div className="space-y-2">
                  {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank"].map((bank) => (
                    <label
                      key={bank}
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-[#072654]/30 cursor-pointer"
                    >
                      <input type="radio" name="bank" defaultChecked={bank.includes("HDFC")} />
                      <span className="text-sm text-gray-700">{bank}</span>
                    </label>
                  ))}
                </div>
              )}

              {tab === "wallet" && (
                <div className="grid grid-cols-3 gap-2">
                  {["Paytm", "PhonePe", "Amazon Pay"].map((w) => (
                    <button
                      key={w}
                      type="button"
                      className="p-3 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:border-[#072654]/30"
                    >
                      {w}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={handlePay}
                disabled={paying}
                className="w-full mt-5 py-3.5 rounded-xl bg-[#072654] hover:bg-[#0a3470] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
              >
                {paying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing payment…
                  </>
                ) : (
                  <>Pay {formatPrice(amount / 100, "INR")}</>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                <Shield className="w-3 h-3" />
                Secured by Razorpay · Demo mode
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
