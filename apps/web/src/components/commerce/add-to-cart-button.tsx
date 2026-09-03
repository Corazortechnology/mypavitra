"use client";

import { useState, type ReactNode } from "react";
import { ShoppingBag, Check } from "lucide-react";
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
      setShowToast(true);
      playChime();

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
        <button
          type="button"
          onClick={handleClick}
          disabled={disabled || loading}
          className={`relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-[background-color,box-shadow,transform] duration-[var(--duration-fast)] ease-[var(--ease-in-out)] active:scale-[0.98] motion-reduce:active:scale-100 ${
            added
              ? "bg-brass text-white shadow-md"
              : "bg-saffron text-white shadow-md hover:bg-saffron-light"
          } disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses[size]} ${
            fullWidth ? "w-full" : ""
          }`}
        >
          {loading ? (
            "Adding…"
          ) : added ? (
            <>
              <Check className="h-4 w-4" /> Added
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" /> {children}
            </>
          )}
        </button>
        {error && (
          <p className="mt-2 text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </>
  );
}
