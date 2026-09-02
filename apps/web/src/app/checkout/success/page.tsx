import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { OrderSuccessCelebration } from "@/components/experience/order-success-celebration";

interface PageProps {
  searchParams: Promise<{ order?: string }>;
}

export async function generateMetadata() {
  const country = await getCountryConfig();
  return buildPageMetadata(
    {
      title: "Order Confirmed | MyPavitra",
      description: "Thank you for your order.",
      noindex: true,
    },
    country,
    "/checkout/success"
  );
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { order } = await searchParams;
  const country = await getCountryConfig();

  return <OrderSuccessCelebration order={order} country={country} />;
}
