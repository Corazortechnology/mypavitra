import Link from "next/link";
import { getCartDetails, estimateShipping } from "@/lib/cart";
import { buildLocalizedPath, formatPrice } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { CartClient } from "@/components/commerce/cart-client";
import { FreeShippingBar } from "@/components/commerce/free-shipping-bar";
import { TempleSection } from "@/components/ui/temple-section";
import { ArrowRight, ShoppingBag } from "lucide-react";

export async function generateMetadata() {
  const country = await getCountryConfig();
  return buildPageMetadata(
    {
      title: "Shopping Cart | MyPavitra",
      description: "Review your puja items and proceed to checkout.",
      noindex: true,
    },
    country,
    "/cart"
  );
}

export default async function CartPage() {
  const country = await getCountryConfig();
  const cart = await getCartDetails(country.code);
  const shipping = estimateShipping(cart.subtotal, country.code);
  const total = cart.subtotal + shipping;
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <TempleSection variant="subtle" className="py-10 sm:py-14">
      <div className="container-main">
        <div className="mb-8">
          <p className="font-devanagari text-saffron text-sm tracking-widest mb-1">ॐ शुभम्</p>
          <h1 className="font-display text-2xl sm:text-3xl text-brown flex items-center gap-3">
            <ShoppingBag className="w-7 h-7 text-saffron" />
            Your Puja Cart
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <CartClient initialLines={cart.lines} country={country} />
          </div>

          {cart.lines.length > 0 && (
            <aside className="space-y-4">
              <FreeShippingBar subtotal={cart.subtotal} country={country} />

              <div className="ornate-card p-6">
                <h2 className="font-display text-lg text-brown mb-4">Summary</h2>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-brown-light">Subtotal ({cart.itemCount} items)</dt>
                    <dd className="text-brown">{formatPrice(cart.subtotal, country.currency)}</dd>
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

                <Link
                  href={prefix("/checkout")}
                  className="btn-shine mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-saffron to-saffron-light text-white font-semibold shadow-lg shadow-saffron/25 hover:shadow-xl transition-all"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={prefix("/categories")}
                  className="block mt-4 text-center text-sm text-saffron hover:underline"
                >
                  Continue shopping
                </Link>
              </div>
            </aside>
          )}
        </div>
      </div>
    </TempleSection>
  );
}
