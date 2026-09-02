import Link from "next/link";
import { redirect } from "next/navigation";
import { getCartDetails, estimateShipping } from "@/lib/cart";
import { buildLocalizedPath } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { CheckoutForm } from "@/components/commerce/checkout-form";
import { TempleSection } from "@/components/ui/temple-section";
import { getPublicPaymentConfig } from "@/lib/payments/config";
import { Shield, Lock } from "lucide-react";

export async function generateMetadata() {
  const country = await getCountryConfig();
  return buildPageMetadata(
    {
      title: "Checkout | MyPavitra",
      description: "Complete your puja order.",
      noindex: true,
    },
    country,
    "/checkout"
  );
}

export default async function CheckoutPage() {
  const country = await getCountryConfig();
  const cart = await getCartDetails(country.code);
  const prefix = (path: string) => buildLocalizedPath(path, country);
  const paymentConfig = getPublicPaymentConfig();

  if (cart.lines.length === 0) {
    redirect(prefix("/cart"));
  }

  const shipping = estimateShipping(cart.subtotal, country.code);

  return (
    <TempleSection variant="subtle" className="py-10 sm:py-14">
      <div className="container-main">
        <div className="mb-8">
          <Link
            href={prefix("/cart")}
            className="text-sm text-saffron hover:underline inline-flex items-center gap-1"
          >
            ← Back to cart
          </Link>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <p className="font-devanagari text-saffron text-sm tracking-widest mb-1">ॐ शुभम्</p>
              <h1 className="font-display text-2xl sm:text-3xl text-brown">Secure Checkout</h1>
            </div>
            <div className="flex items-center gap-4 text-xs text-brown-light">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-gold" /> SSL Secured
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-saffron" /> Safe payments
              </span>
            </div>
          </div>
        </div>

        <CheckoutForm
          country={country}
          subtotal={cart.subtotal}
          shipping={shipping}
          itemCount={cart.itemCount}
          lines={cart.lines}
          paymentConfig={paymentConfig}
        />
      </div>
    </TempleSection>
  );
}
