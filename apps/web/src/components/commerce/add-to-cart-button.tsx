"use client";

import { useState, type ReactNode } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useExperience } from "@/components/experience/experience-provider";
import { CartAddedToast } from "@/components/experience/cart-added-toast";

interface AddToCartButtonProps {
  slug: string;
  qty?: number;
  type?: "product" | "bundle";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

function GoldenBurst({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active &&
        [...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-gold pointer-events-none"
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos((i / 8) * Math.PI * 2) * 40,
              y: Math.sin((i / 8) * Math.PI * 2) * 40,
              opacity: 0,
              scale: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
    </AnimatePresence>
  );
}

export function AddToCartButton({
  slug,
  qty = 1,
  type = "product",
  disabled = false,
  size = "md",
  fullWidth = false,
  className = "",
  children = "Add to Cart",
}: AddToCartButtonProps) {
  const { playChime } = useExperience();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [burst, setBurst] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, qty, type }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Failed to add to cart");
      }

      setAdded(true);
      setBurst(true);
      setShowToast(true);
      playChime();

      setTimeout(() => setBurst(false), 700);
      setTimeout(() => setAdded(false), 2000);
      setTimeout(() => setShowToast(false), 2800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <CartAddedToast show={showToast} />
      <div className={`relative ${className}`}>
        <GoldenBurst active={burst} />
        <motion.button
          type="button"
          onClick={handleClick}
          disabled={disabled || loading}
          whileTap={{ scale: 0.97 }}
          animate={added ? { scale: [1, 1.04, 1] } : {}}
          transition={{ duration: 0.35 }}
          className={`btn-shine relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 ${
            added
              ? "bg-gradient-to-r from-gold to-saffron text-white shadow-lg shadow-gold/30"
              : "bg-gradient-to-r from-saffron to-saffron-light text-white shadow-lg shadow-saffron/25 hover:shadow-xl hover:shadow-saffron/30 hover:-translate-y-0.5"
          } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${sizeClasses[size]} ${
            fullWidth ? "w-full" : ""
          }`}
        >
          {loading ? (
            "Adding…"
          ) : added ? (
            <>
              <Check className="w-4 h-4" /> Added · शुभम्
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" /> {children}
            </>
          )}
        </motion.button>
        {error && (
          <p className="mt-2 text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </>
  );
}
