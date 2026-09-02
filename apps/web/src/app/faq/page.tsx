import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { StaticContent } from "@/components/layout/static-content";
import { Accordion } from "@/components/commerce/accordion";

export async function generateMetadata() {
  const country = await getCountryConfig();
  return buildPageMetadata(
    {
      title: "FAQ | MyPavitra",
      description:
        "Frequently asked questions about ordering puja products, shipping, returns, and product care at MyPavitra.",
    },
    country,
    "/faq"
  );
}

const FAQ_ITEMS = [
  {
    question: "What products does MyPavitra sell?",
    answer:
      "We sell authentic puja samagri (kumkum, chandan, camphor, wicks), handcrafted brass items (diyas, bells, thalis, kalash), complete puja kits, incense, Jain puja products, idols, and festival gift sets.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. We deliver across India and to the US, UK, Canada, Australia, UAE, Singapore, New Zealand, and Europe. International orders may be subject to import duties payable by the recipient.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "India: 3–5 business days. International: 7–14 business days depending on destination. Festival season may add 1–2 extra days.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Unopened samagri and unused brass items in original packaging can be returned within 7 days of delivery. See our Returns page for full details.",
  },
  {
    question: "Are your brass items authentic?",
    answer:
      "Yes. Our brass puja items are handcrafted in Moradabad and Gujarat by established artisans. We specify material, weight, and dimensions on every product page.",
  },
  {
    question: "Can I order bulk for a temple or event?",
    answer:
      "Absolutely. Email bulk@mypavitra.com with your requirements for volume pricing on samagri, brass items, and festival kits.",
  },
  {
    question: "How do I care for brass puja items?",
    answer:
      "Wipe with a soft dry cloth after use. For tarnish, use a lemon-salt paste or commercial brass cleaner. Avoid harsh abrasives. Each product page includes specific care instructions.",
  },
  {
    question: "Is payment secure?",
    answer:
      "Yes. Indian orders use Razorpay (when configured). International orders will use Stripe. We never store full card details on our servers.",
  },
];

export default async function FaqPage() {
  await getCountryConfig();

  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        description="Quick answers about ordering, shipping, returns, and our puja products."
      />
      <div className="container-main pb-16 max-w-3xl">
        <Accordion
          items={FAQ_ITEMS.map((item, i) => ({
            id: `faq-${i}`,
            title: item.question,
            content: <p>{item.answer}</p>,
            defaultOpen: i === 0,
          }))}
        />
      </div>
    </>
  );
}
