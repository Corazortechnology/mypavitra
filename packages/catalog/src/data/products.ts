import type { CatalogProduct } from "../types";
import { mkPrices, ALL_COUNTRIES } from "../types";

function p(
  partial: Omit<CatalogProduct, "prices" | "countryAvailability"> & {
    inr: number;
    mrpInr?: number;
  }
): CatalogProduct {
  const { inr, mrpInr, ...rest } = partial;
  return {
    ...rest,
    prices: mkPrices(inr, mrpInr),
    countryAvailability: ALL_COUNTRIES,
  };
}

export const PRODUCTS: CatalogProduct[] = [
  p({
    id: "prod-001",
    slug: "brass-diya-classic",
    sku: "MP-BD-001",
    name: "Classic Brass Diya",
    indianName: "पीतल का दीया",
    subtitle: "Handcrafted single wick brass diya for daily aarti",
    categorySlugs: ["diyas", "brass-puja-items"],
    collectionSlugs: ["daily-puja", "brass-essentials", "best-sellers"],
    tradition: "hindu",
    inr: 349,
    imageEmoji: "🪔",
    imageColor: "#C9A227",
    inStock: true,
    rating: 4.7,
    reviewCount: 312,
    material: "Pure brass",
    weight: "85 g",
    dimensions: "7 cm diameter × 3 cm height",
    countryOfOrigin: "India",
    shortDescription:
      "A timeless brass diya with a stable base and clean flame cup — ideal for morning and evening aarti.",
    description:
      "Our Classic Brass Diya is sand-cast and hand-finished in Moradabad, India's brass capital. The wide oil reservoir prevents spillage, while the raised rim keeps the flame steady during aarti. Perfect for home mandirs, festival decor, and gifting.",
    whatIsIt:
      "A single-wick oil lamp (diya) made from solid brass, used to offer light (deepam) during Hindu puja and aarti ceremonies.",
    traditionalUse:
      "Lighting a diya symbolises the removal of darkness and ignorance. It is placed before deities during daily puja, Lakshmi puja on Diwali, and during aarti when waving light before the murti.",
    howToUse:
      "Fill the reservoir with ghee or mustard oil. Place a cotton wick, light the wick, and place the diya on your puja thali or mandir shelf. Extinguish after aarti by covering with a small lid or blowing gently.",
    careInstructions:
      "Wipe with a soft dry cloth after use. For tarnish, rub with lemon juice and salt, rinse, and dry immediately. Avoid harsh chemical cleaners.",
    faq: [
      {
        question: "Can I use ghee or oil in this diya?",
        answer:
          "Yes. Both ghee and mustard/sesame oil work well. Ghee burns cleaner with less smoke; oil is economical for daily use.",
      },
      {
        question: "Is this diya suitable for daily puja?",
        answer:
          "Absolutely. At 85 g with a stable base, it is designed for everyday morning and evening aarti in home mandirs.",
      },
    ],
    crossSellSlugs: ["cotton-wicks-pack", "brass-puja-thali-medium", "pure-camphor-tablets"],
    searchTerms: ["brass diya", "deepam", "oil lamp", "aarti diya", "puja diya", "दीया"],
  }),

  p({
    id: "prod-002",
    slug: "brass-diya-set-of-5",
    sku: "MP-BD-002",
    name: "Brass Diya Set of 5",
    indianName: "पांच दीयों का सेट",
    subtitle: "Matching set for rangoli, Diwali decor, and Lakshmi puja",
    categorySlugs: ["diyas", "brass-puja-items"],
    collectionSlugs: ["diwali-puja", "brass-essentials", "best-sellers"],
    tradition: "hindu",
    inr: 1499,
    imageEmoji: "🪔",
    imageColor: "#D4AF37",
    inStock: true,
    rating: 4.8,
    reviewCount: 189,
    material: "Pure brass",
    weight: "420 g (set)",
    dimensions: "6.5 cm diameter each",
    countryOfOrigin: "India",
    shortDescription:
      "Five matching brass diyas for Diwali rangoli borders, Lakshmi puja, and festive home decor.",
    description:
      "This coordinated set of five brass diyas creates a beautiful line of light for Diwali evenings, Navratri garbas, and wedding mandaps. Each diya is identical in size and finish for a polished, symmetrical display.",
    whatIsIt:
      "A set of five identical brass oil lamps arranged together for festive decoration and group aarti.",
    traditionalUse:
      "Multiple diyas are lit during Diwali to welcome Goddess Lakshmi, placed along rangoli patterns, window sills, and temple steps to symbolise prosperity and the triumph of light over darkness.",
    howToUse:
      "Arrange in a row or circle on your rangoli or puja thali. Fill each with oil and wicks, light simultaneously during Lakshmi puja or place lit diyas around your home after the main puja.",
    careInstructions: "Clean after each use. Store in the included cloth pouch to prevent scratching.",
    whatsIncluded: "5 brass diyas, 10 cotton wicks, storage pouch",
    faq: [
      {
        question: "Are all five diyas the same size?",
        answer: "Yes. Each diya is 6.5 cm in diameter for a uniform festive display.",
      },
      {
        question: "Do wicks come included?",
        answer: "Yes. We include 10 cotton wicks so you can use the set right away.",
      },
    ],
    crossSellSlugs: ["brass-diya-classic", "kumkum-vermillion", "sandalwood-incense-sticks"],
    searchTerms: ["diwali diya set", "brass diya 5 pack", "lakshmi puja diyas", "deepavali diyas"],
  }),

  p({
    id: "prod-003",
    slug: "brass-hanging-diya-pair",
    sku: "MP-BD-003",
    name: "Brass Hanging Diya Pair",
    indianName: "झूलता दीया जोड़ी",
    subtitle: "Chain-hung diyas for temple decor and festival entrances",
    categorySlugs: ["diyas", "brass-puja-items"],
    collectionSlugs: ["diwali-puja", "brass-essentials"],
    tradition: "hindu",
    inr: 699,
    imageEmoji: "🏮",
    imageColor: "#B8860B",
    inStock: true,
    rating: 4.6,
    reviewCount: 94,
    material: "Pure brass with brass chain",
    weight: "280 g (pair)",
    dimensions: "8 cm bowl, 30 cm chain length",
    countryOfOrigin: "India",
    shortDescription:
      "Elegant pair of chain-suspended brass diyas for mandir arches, doorways, and balcony decor.",
    description:
      "These hanging diyas add vertical drama to your puja space. The brass chain is soldered securely to each bowl, and the hook fits standard mandir arch rods. Sold as a matching pair for symmetrical placement.",
    whatIsIt:
      "Decorative brass oil lamps suspended from chains, hung above or beside the puja area.",
    traditionalUse:
      "Hanging diyas frame the sacred space in temples and homes, especially during Diwali and wedding ceremonies, drawing the eye upward toward the divine.",
    howToUse:
      "Hang from a hook or mandir arch at a safe height away from curtains. Fill bowls with oil, insert wicks, and light during aarti. Ensure adequate ventilation.",
    careInstructions: "Polish chain and bowl monthly. Check chain links for wear before each festival season.",
    faq: [
      {
        question: "How long is the chain?",
        answer: "Each chain is approximately 30 cm, suitable for standard home mandir arches.",
      },
      {
        question: "Can these be used outdoors?",
        answer:
          "They are best used in covered areas like balconies or entrance porches. Prolonged rain exposure may tarnish brass.",
      },
    ],
    crossSellSlugs: ["brass-diya-classic", "brass-aarti-diya", "cotton-wicks-pack"],
    searchTerms: ["hanging diya", "jhoolta diya", "brass chain diya", "temple hanging lamp"],
  }),

  p({
    id: "prod-004",
    slug: "brass-puja-thali-medium",
    sku: "MP-BT-001",
    name: "Brass Puja Thali — Medium",
    indianName: "पूजा थाली",
    subtitle: "Raised-edge thali with compartments for daily puja samagri",
    categorySlugs: ["pooja-thali", "brass-puja-items"],
    collectionSlugs: ["daily-puja", "brass-essentials", "best-sellers"],
    tradition: "universal",
    inr: 899,
    imageEmoji: "🙏",
    imageColor: "#CD853F",
    inStock: true,
    rating: 4.9,
    reviewCount: 456,
    material: "Pure brass",
    weight: "450 g",
    dimensions: "28 cm diameter × 3 cm depth",
    countryOfOrigin: "India",
    shortDescription:
      "Medium brass puja thali with five built-in compartments for kumkum, chandan, rice, flowers, and prasad.",
    description:
      "The most essential item on any puja shelf. Our medium brass thali keeps all samagri organised in one place — no more hunting for kumkum while the aarti bell waits. The raised rim prevents spills during aarti.",
    whatIsIt:
      "A round brass tray with compartments used to hold and present puja offerings during worship.",
    traditionalUse:
      "The thali is the centre of daily puja — it carries kumkum, chandan, akshat, flowers, and the diya while you perform aarti and offer prayers to deities.",
    howToUse:
      "Place samagri in each compartment before starting puja. Hold the thali with both hands during aarti. Wipe clean after each session.",
    careInstructions: "Hand-wash with mild soap. Dry immediately to prevent water spots on brass.",
    faq: [
      {
        question: "What size is medium?",
        answer:
          "28 cm diameter — fits comfortably on a standard home mandir shelf and holds all daily samagri.",
      },
      {
        question: "Does it have a handle?",
        answer:
          "This model has a flat rim for two-hand grip during aarti. We also sell thalis with side handles separately.",
      },
    ],
    crossSellSlugs: ["kumkum-vermillion", "chandan-sandalwood-paste", "brass-diya-classic"],
    searchTerms: ["puja thali", "brass thali", "pooja plate", "aarti thali", "पूजा थाली"],
  }),

  p({
    id: "prod-005",
    slug: "brass-puja-bell-medium",
    sku: "MP-BB-001",
    name: "Brass Puja Bell — Medium",
    indianName: "पूजा घंटी",
    subtitle: "Clear-toned bell for aarti and mandir opening",
    categorySlugs: ["brass-puja-items"],
    collectionSlugs: ["daily-puja", "brass-essentials", "best-sellers"],
    tradition: "universal",
    inr: 449,
    imageEmoji: "🔔",
    imageColor: "#DAA520",
    inStock: true,
    rating: 4.7,
    reviewCount: 278,
    material: "Pure brass",
    weight: "120 g",
    dimensions: "9 cm height × 5 cm bell diameter",
    countryOfOrigin: "India",
    shortDescription:
      "Medium brass bell with a resonant, clear tone — rings at the start of puja and during aarti.",
    description:
      "A well-made puja bell announces the beginning of worship and accompanies aarti. Our medium bell produces a sustained, pleasant tone without harsh overtones. The wooden handle stays cool during use.",
    whatIsIt: "A handheld brass bell (ghanti) rung during Hindu and Jain puja ceremonies.",
    traditionalUse:
      "Ringing the bell at puja start invites the deity's attention and dispels negative energy. During aarti, the bell rhythm marks each verse of the aarti song.",
    howToUse:
      "Ring three times at the start of puja. Continue ringing gently during aarti, matching the rhythm of the aarti song.",
    careInstructions: "Wipe handle and bell with dry cloth. Avoid dropping to preserve tone quality.",
    faq: [
      {
        question: "How loud is the medium bell?",
        answer:
          "Pleasant and audible in a standard living-room mandir — not overpowering for apartment use.",
      },
      {
        question: "Is the handle heat-resistant?",
        answer: "Yes. The wooden grip stays cool even after extended aarti sessions.",
      },
    ],
    crossSellSlugs: ["brass-puja-thali-medium", "brass-aarti-diya", "brass-diya-classic"],
    searchTerms: ["puja bell", "brass ghanti", "aarti bell", "mandir bell", "घंटी"],
  }),

  p({
    id: "prod-006",
    slug: "brass-kalash-medium",
    sku: "MP-BK-001",
    name: "Brass Kalash — Medium",
    indianName: "पीतल का कलश",
    subtitle: "Kalash with mango leaves and coconut for puja and griha pravesh",
    categorySlugs: ["kalash", "brass-puja-items"],
    collectionSlugs: ["new-home-puja", "brass-essentials", "diwali-puja"],
    tradition: "hindu",
    inr: 799,
    imageEmoji: "🏺",
    imageColor: "#B8860B",
    inStock: true,
    rating: 4.8,
    reviewCount: 167,
    material: "Pure brass",
    weight: "520 g",
    dimensions: "18 cm height × 12 cm mouth diameter",
    countryOfOrigin: "India",
    shortDescription:
      "Traditional brass kalash for Navratri ghatasthapana, griha pravesh, and wedding rituals.",
    description:
      "The kalash represents abundance and the divine presence during important ceremonies. Our medium brass kalash holds enough water for standard home puja and griha pravesh rituals. The wide mouth fits a coconut and mango leaf arrangement.",
    whatIsIt:
      "A sacred pot (kalash) filled with water, topped with mango leaves and a coconut, representing the presence of deities during rituals.",
    traditionalUse:
      "Used in Navratri ghatasthapana, griha pravesh (housewarming), wedding ceremonies, and Varalakshmi puja. The filled kalash is worshipped as a symbol of prosperity.",
    howToUse:
      "Fill with water, place mango leaves around the mouth, set a coconut on top, wrap with red thread, and install at your puja altar during the ceremony.",
    careInstructions: "Empty and dry after rituals. Polish exterior monthly for shine.",
    faq: [
      {
        question: "What capacity is the medium kalash?",
        answer: "Approximately 750 ml — sufficient for home puja and griha pravesh ceremonies.",
      },
      {
        question: "Is it suitable for Navratri ghatasthapana?",
        answer: "Yes. This is our most popular size for Navratri kalash sthapana at home.",
      },
    ],
    crossSellSlugs: ["tambe-ka-kalash", "kumkum-vermillion", "brass-puja-thali-medium"],
    searchTerms: ["brass kalash", "kalash pot", "ghatasthapana", "griha pravesh kalash", "कलश"],
  }),

  p({
    id: "prod-007",
    slug: "brass-camphor-holder",
    sku: "MP-BCH-001",
    name: "Brass Camphor Holder",
    indianName: "कपूर की पक्कड़",
    subtitle: "Ventilated brass holder for safe camphor burning during aarti",
    categorySlugs: ["brass-puja-items", "puja-samagri"],
    collectionSlugs: ["daily-puja", "brass-essentials"],
    tradition: "hindu",
    inr: 299,
    imageEmoji: "✨",
    imageColor: "#FFD700",
    inStock: true,
    rating: 4.5,
    reviewCount: 143,
    material: "Pure brass",
    weight: "65 g",
    dimensions: "6 cm × 6 cm × 4 cm",
    countryOfOrigin: "India",
    shortDescription:
      "Safe, ventilated brass holder for burning camphor tablets during aarti without scorching your thali.",
    description:
      "Burning camphor directly on a brass thali leaves stubborn residue. This dedicated holder keeps the flame contained, allows airflow for complete burning, and protects your thali surface.",
    whatIsIt:
      "A small ventilated brass container designed to hold and safely burn camphor (kapur) during aarti.",
    traditionalUse:
      "Camphor is burned at the end of aarti to symbolise the dissolution of ego. The holder keeps the sacred flame controlled and safe.",
    howToUse:
      "Place one camphor tablet in the holder, light with a diya or match, and circle during aarti. Allow to burn completely on a heat-safe surface.",
    careInstructions: "Brush off ash after each use. Wash occasionally with warm water and dry.",
    faq: [
      {
        question: "Does it fit standard camphor tablets?",
        answer: "Yes. Designed for standard ½-inch square camphor tablets sold in Indian stores.",
      },
      {
        question: "Does the base get very hot?",
        answer:
          "The base warms up — always place on your thali or a heat-resistant surface, not directly on wood.",
      },
    ],
    crossSellSlugs: ["pure-camphor-tablets", "brass-puja-thali-medium", "brass-diya-classic"],
    searchTerms: ["camphor holder", "kapur holder", "brass kapur dani", "aarti camphor"],
  }),

  p({
    id: "prod-008",
    slug: "cotton-wicks-pack",
    sku: "MP-PS-001",
    name: "Cotton Wicks — Pack of 100",
    indianName: "बatti / दीये की बatti",
    subtitle: "Long-burning cotton wicks for diyas and akhand jyot",
    categorySlugs: ["puja-samagri"],
    collectionSlugs: ["daily-puja", "best-sellers"],
    tradition: "universal",
    inr: 99,
    imageEmoji: "🧵",
    imageColor: "#FFF8DC",
    inStock: true,
    rating: 4.6,
    reviewCount: 892,
    material: "Pure cotton",
    weight: "30 g",
    countryOfOrigin: "India",
    shortDescription:
      "100 pre-cut cotton wicks for diyas — consistent thickness for even, long-lasting flames.",
    description:
      "The humble cotton wick is essential for every diya lit in your home. Our wicks are spun from pure cotton with uniform thickness so your diya burns evenly without drowning in oil.",
    whatIsIt: "Cotton threads (batti) used as wicks in oil diyas during puja and aarti.",
    traditionalUse:
      "The lit wick represents the soul's aspiration toward the divine. Cotton wicks are used in daily diyas, akhand jyot during Navratri, and festival lamps.",
    howToUse:
      "Place one wick in the diya reservoir, leaving 1 cm above the oil line. Soak for a minute before lighting for best results.",
    faq: [
      {
        question: "How many wicks are in the pack?",
        answer: "100 pre-cut wicks — roughly a 3-month supply for daily single-diya puja.",
      },
      {
        question: "Can these be used for akhand jyot?",
        answer: "Yes. For akhand jyot, braid 3–4 wicks together for a thicker, longer-burning flame.",
      },
    ],
    crossSellSlugs: ["brass-diya-classic", "brass-diya-set-of-5", "pure-camphor-tablets"],
    searchTerms: ["cotton wicks", "diya batti", "puja wicks", "oil lamp wick", "बatti"],
  }),

  p({
    id: "prod-009",
    slug: "pure-camphor-tablets",
    sku: "MP-PS-002",
    name: "Pure Camphor Tablets",
    indianName: "शuddh कपूर",
    subtitle: "Premium bhimseni camphor tablets for aarti — pack of 50",
    categorySlugs: ["puja-samagri"],
    collectionSlugs: ["daily-puja", "best-sellers"],
    tradition: "universal",
    inr: 149,
    imageEmoji: "💎",
    imageColor: "#F5F5F5",
    inStock: true,
    rating: 4.7,
    reviewCount: 534,
    material: "Bhimseni camphor (Cinnamomum camphora)",
    weight: "100 g",
    countryOfOrigin: "India",
    shortDescription:
      "50 pure bhimseni camphor tablets — clean-burning with a fragrant, sacred smoke for aarti.",
    description:
      "Camphor completes every aarti with its distinctive white flame and purifying aroma. Our bhimseni camphor burns completely without residue and is suitable for both Hindu and Jain puja.",
    whatIsIt:
      "Solid camphor (kapur) tablets burned during aarti to produce a bright flame and fragrant smoke.",
    traditionalUse:
      "Camphor aarti symbolises the burning of ego and material attachment. The white flame is offered to deities at the conclusion of worship.",
    howToUse:
      "Place one tablet in a camphor holder or on your thali. Light and circle before the deity during aarti. Ensure ventilation.",
    faq: [
      {
        question: "Is this bhimseni or synthetic camphor?",
        answer: "Pure bhimseni camphor derived from camphor tree — not synthetic naphthalene.",
      },
      {
        question: "How many tablets per pack?",
        answer: "50 tablets, each approximately ½ inch square.",
      },
    ],
    crossSellSlugs: ["brass-camphor-holder", "jain-brass-camphor-holder", "brass-puja-thali-medium"],
    searchTerms: ["camphor tablets", "kapur", "bhimseni camphor", "aarti camphor", "कपूर"],
  }),

  p({
    id: "prod-010",
    slug: "kumkum-vermillion",
    sku: "MP-PS-003",
    name: "Kumkum — Vermillion Powder",
    indianName: "कुमkum / सिंdूर",
    subtitle: "Fine vermillion powder for tilak, sindoor, and deity adornment",
    categorySlugs: ["puja-samagri"],
    collectionSlugs: ["daily-puja", "best-sellers"],
    tradition: "hindu",
    inr: 79,
    imageEmoji: "🔴",
    imageColor: "#DC143C",
    inStock: true,
    rating: 4.8,
    reviewCount: 723,
    material: "Natural vermillion with turmeric base",
    weight: "50 g",
    countryOfOrigin: "India",
    shortDescription:
      "Vibrant kumkum powder for daily tilak, deity adornment, and festival rangoli accents.",
    description:
      "Kumkum is applied to the forehead as a bindi or tilak and offered to deities during puja. Our fine-ground vermillion spreads smoothly without clumping.",
    whatIsIt:
      "Red vermillion powder (kumkum/sindoor) used for tilak, deity decoration, and as a puja offering.",
    traditionalUse:
      "Applied to the forehead during puja as a mark of auspiciousness. Offered to goddesses, especially during Varalakshmi and Navratri puja.",
    howToUse:
      "Pinch a small amount with your ring finger and apply to forehead or deity. Store in the thali kumkum compartment with the lid closed.",
    faq: [
      {
        question: "Is this safe for skin?",
        answer:
          "Made with traditional turmeric-based formula. Patch-test if you have sensitive skin.",
      },
      {
        question: "Does it stain clothes?",
        answer: "Yes — vermillion can stain. Handle over your thali and wash hands after use.",
      },
    ],
    crossSellSlugs: ["chandan-sandalwood-paste", "akshat-unbroken-rice", "brass-puja-thali-medium"],
    searchTerms: ["kumkum", "vermillion", "sindoor", "tilak powder", "कुमkum"],
  }),

  p({
    id: "prod-011",
    slug: "chandan-sandalwood-paste",
    sku: "MP-PS-004",
    name: "Chandan — Sandalwood Paste",
    indianName: "चंदन",
    subtitle: "Ready-to-use sandalwood paste for deity adornment and tilak",
    categorySlugs: ["puja-samagri"],
    collectionSlugs: ["daily-puja", "best-sellers"],
    tradition: "universal",
    inr: 129,
    imageEmoji: "🟤",
    imageColor: "#D2B48C",
    inStock: true,
    rating: 4.7,
    reviewCount: 445,
    material: "Sandalwood paste",
    weight: "80 g",
    countryOfOrigin: "India",
    shortDescription:
      "Fragrant sandalwood paste for applying tilak and adorning murtis — cooling and auspicious.",
    description:
      "Chandan cools and calms — it is applied to deities and devotees alike during puja. Our ready-to-use paste saves the effort of grinding sandalwood sticks.",
    whatIsIt:
      "A fragrant paste made from sandalwood, used for tilak and decorating deity murtis during worship.",
    traditionalUse:
      "Applied to Shiva lingam, Krishna murtis, and as a cooling tilak during summer puja. Essential for Monday Shiva puja and Vishnu worship.",
    howToUse:
      "Apply a small dot to the deity's forehead or your own using your ring finger. Store refrigerated in hot climates to maintain consistency.",
    faq: [
      {
        question: "Is this natural sandalwood?",
        answer: "Made from genuine sandalwood with a natural base — not synthetic fragrance.",
      },
      {
        question: "How long does one jar last?",
        answer: "About 2–3 months for daily single-deity puja with moderate use.",
      },
    ],
    crossSellSlugs: ["kumkum-vermillion", "brass-puja-thali-medium", "ganesh-idol-brass-small"],
    searchTerms: ["chandan", "sandalwood paste", "chandan tilak", "sandalwood puja", "चंदन"],
  }),

  p({
    id: "prod-012",
    slug: "akshat-unbroken-rice",
    sku: "MP-PS-005",
    name: "Akshat — Unbroken Rice",
    indianName: "अक्षत",
    subtitle: "Premium unbroken white rice for puja offerings and tilak",
    categorySlugs: ["puja-samagri"],
    collectionSlugs: ["daily-puja", "new-home-puja"],
    tradition: "hindu",
    inr: 89,
    imageEmoji: "🍚",
    imageColor: "#FFFAF0",
    inStock: true,
    rating: 4.6,
    reviewCount: 356,
    material: "Unbroken white rice grains",
    weight: "200 g",
    countryOfOrigin: "India",
    shortDescription:
      "Clean, unbroken rice grains (akshat) for puja offerings, tilak, and griha pravesh rituals.",
    description:
      "Akshat represents wholeness and fertility in Hindu ritual. Mixed with kumkum, it is sprinkled during puja and used in griha pravesh and wedding ceremonies.",
    whatIsIt:
      "Unbroken white rice grains offered during puja, symbolising abundance, fertility, and completeness.",
    traditionalUse:
      "Mixed with kumkum and sprinkled on guests during griha pravesh. Offered to deities and used in kalash rituals.",
    howToUse:
      "Mix a pinch with kumkum in your thali compartment. Sprinkle on the deity or offer by hand during puja mantras.",
    faq: [
      {
        question: "Why must the rice be unbroken?",
        answer:
          "Broken grains are considered inauspicious for ritual use. Akshat specifically means whole, unbroken rice.",
      },
      {
        question: "Can I eat this rice after puja?",
        answer:
          "It is food-grade rice. After offering, it can be used in cooking or fed to birds.",
      },
    ],
    crossSellSlugs: ["kumkum-vermillion", "brass-kalash-medium", "brass-puja-thali-medium"],
    searchTerms: ["akshat", "unbroken rice", "puja rice", "akshata", "अक्षत"],
  }),

  p({
    id: "prod-013",
    slug: "sandalwood-incense-sticks",
    sku: "MP-ID-001",
    name: "Sandalwood Incense Sticks",
    indianName: "चंदन अgरbatti",
    subtitle: "Hand-rolled sandalwood agarbatti — pack of 40 sticks",
    categorySlugs: ["incense-dhoop", "puja-samagri"],
    collectionSlugs: ["daily-puja", "best-sellers"],
    tradition: "universal",
    inr: 199,
    imageEmoji: "💨",
    imageColor: "#DEB887",
    inStock: true,
    rating: 4.8,
    reviewCount: 612,
    material: "Sandalwood masala incense",
    weight: "60 g",
    countryOfOrigin: "India",
    shortDescription:
      "40 hand-rolled sandalwood incense sticks — slow-burning with a warm, meditative fragrance.",
    description:
      "Incense purifies the puja space and creates a meditative atmosphere. Our sandalwood agarbatti burns for approximately 40 minutes per stick with minimal smoke.",
    whatIsIt:
      "Fragrant incense sticks (agarbatti) burned during puja to purify the air and create a sacred atmosphere.",
    traditionalUse:
      "Lit at the start of puja to invite positive energy. Sandalwood fragrance is especially associated with Shiva and meditation practices.",
    howToUse:
      "Light the tip, blow out the flame, and place in an incense holder near your mandir. Ensure ventilation.",
    faq: [
      {
        question: "How long does each stick burn?",
        answer: "Approximately 40 minutes per stick.",
      },
      {
        question: "Is a holder included?",
        answer: "No holder included — pair with our brass agarbatti stand or any standard holder.",
      },
    ],
    crossSellSlugs: ["loban-dhoop-cups", "chandan-sandalwood-paste", "brass-puja-thali-medium"],
    searchTerms: ["incense sticks", "agarbatti", "sandalwood incense", "puja incense", "अgरbatti"],
  }),

  p({
    id: "prod-014",
    slug: "jain-brass-samai",
    sku: "MP-JP-001",
    name: "Jain Brass Samai",
    indianName: "सामाई",
    subtitle: "Traditional five-flame samai for Jain daily puja and Paryushan",
    categorySlugs: ["jain-puja-products", "brass-puja-items", "diyas"],
    collectionSlugs: ["jain-essentials", "daily-puja"],
    tradition: "jain",
    inr: 899,
    imageEmoji: "☸️",
    imageColor: "#C9A227",
    inStock: true,
    rating: 4.9,
    reviewCount: 134,
    material: "Pure brass",
    weight: "680 g",
    dimensions: "22 cm height × 12 cm base",
    countryOfOrigin: "India",
    shortDescription:
      "Five-wick Jain samai with ghee cups — the centrepiece of daily Jain ghee diya puja.",
    description:
      "The samai is the heart of Jain home worship. Our brass samai holds five ghee diyas representing the five parameshthis (supreme beings). Crafted for stability and even flame height.",
    whatIsIt:
      "A multi-wick brass lamp (samai) used in Jain households for daily ghee diya puja before the Tirthankara image.",
    traditionalUse:
      "Lit every morning and evening during Jain puja, especially during Paryushan and Mahavir Jayanti. The five flames honour Arihants, Siddhas, Acharyas, Upadhyayas, and Sadhus.",
    howToUse:
      "Fill each cup with ghee, place cotton wicks, and light all five flames during puja. Extinguish after aarti by covering cups.",
    careInstructions: "Clean ghee residue weekly with hot water. Polish brass monthly.",
    faq: [
      {
        question: "How many flames does this samai have?",
        answer: "Five ghee cups — representing the five supreme beings in Jain tradition.",
      },
      {
        question: "Is it suitable for Paryushan?",
        answer: "Yes. This is our recommended samai for Paryushan and daily Jain home puja.",
      },
    ],
    crossSellSlugs: ["jain-brass-camphor-holder", "cotton-wicks-pack", "pure-camphor-tablets"],
    searchTerms: ["jain samai", "samai lamp", "jain ghee diya", "paryushan samai", "सामाई"],
  }),

  p({
    id: "prod-015",
    slug: "jain-brass-camphor-holder",
    sku: "MP-JP-002",
    name: "Jain Brass Camphor Holder",
    indianName: "जain कपूर daani",
    subtitle: "Compact camphor holder designed for Jain aarti rituals",
    categorySlugs: ["jain-puja-products", "brass-puja-items"],
    collectionSlugs: ["jain-essentials", "daily-puja"],
    tradition: "jain",
    inr: 349,
    imageEmoji: "✨",
    imageColor: "#FFD700",
    inStock: true,
    rating: 4.6,
    reviewCount: 87,
    material: "Pure brass",
    weight: "55 g",
    dimensions: "5 cm × 5 cm × 3.5 cm",
    countryOfOrigin: "India",
    shortDescription:
      "Compact brass camphor holder sized for Jain puja thali and samai setups.",
    description:
      "Jain aarti uses camphor differently from Hindu aarti — this compact holder fits alongside your samai on the Jain puja shelf without crowding the space.",
    whatIsIt:
      "A small brass container for burning camphor during Jain aarti and daily worship.",
    traditionalUse:
      "Camphor is burned during Jain aarti to symbolise the destruction of karma. Used alongside the samai in daily and festival puja.",
    howToUse:
      "Place on your puja thali beside the samai. Light one camphor tablet during aarti and circle before the Tirthankara image.",
    faq: [
      {
        question: "How is this different from the standard camphor holder?",
        answer:
          "Smaller footprint to fit Jain puja shelves that already hold a samai, kalash, and murti.",
      },
      {
        question: "Can Hindus use this holder too?",
        answer: "Absolutely. It works for any tradition — the size is simply optimised for compact setups.",
      },
    ],
    crossSellSlugs: ["jain-brass-samai", "pure-camphor-tablets", "cotton-wicks-pack"],
    searchTerms: ["jain camphor holder", "kapur dani jain", "jain puja camphor", "jain aarti"],
  }),

  p({
    id: "prod-016",
    slug: "ganesh-idol-brass-small",
    sku: "MP-IM-001",
    name: "Ganesh Idol — Brass Small",
    indianName: "गanesha murti",
    subtitle: "4-inch brass Ganesh murti for home mandir and Ganesh Chaturthi",
    categorySlugs: ["idols-murtis"],
    collectionSlugs: ["daily-puja", "best-sellers"],
    tradition: "hindu",
    inr: 599,
    imageEmoji: "🐘",
    imageColor: "#DAA520",
    inStock: true,
    rating: 4.8,
    reviewCount: 267,
    material: "Solid brass",
    weight: "320 g",
    dimensions: "4 inches (10 cm) height",
    countryOfOrigin: "India",
    shortDescription:
      "Hand-finished 4-inch brass Ganesh murti — ideal for home mandir shelves and daily worship.",
    description:
      "Lord Ganesh, remover of obstacles, deserves a beautiful murti on your puja shelf. Our small brass idol is detailed enough for daily darshan yet compact for apartment mandirs.",
    whatIsIt:
      "A small brass statue (murti) of Lord Ganesh used for daily worship and Ganesh Chaturthi celebrations.",
    traditionalUse:
      "Installed on the home mandir for daily puja. Worshipped first before any new venture, journey, or ceremony. Central to Ganesh Chaturthi celebrations.",
    howToUse:
      "Place on your mandir shelf facing east or north. Bathe with water or panchamrit on Wednesdays and Ganesh Chaturthi. Apply chandan and kumkum daily.",
    careInstructions: "Dust weekly. Polish monthly with brass cleaner. Avoid abrasive scrubbing on details.",
    faq: [
      {
        question: "What is the exact height?",
        answer: "4 inches (10 cm) from base to crown — fits standard mandir shelves.",
      },
      {
        question: "Is it solid brass or hollow?",
        answer: "Solid brass casting — substantial weight of 320 g for a small murti.",
      },
    ],
    crossSellSlugs: ["chandan-sandalwood-paste", "brass-puja-thali-medium", "brass-diya-classic"],
    searchTerms: ["ganesh idol", "ganesha murti", "brass ganesh", "ganesh chaturthi idol", "गanesha"],
  }),

  p({
    id: "prod-017",
    slug: "lakshmi-idol-brass-small",
    sku: "MP-IM-002",
    name: "Lakshmi Idol — Brass Small",
    indianName: "लक्षmi murti",
    subtitle: "4-inch brass Lakshmi murti for Diwali puja and daily prosperity worship",
    categorySlugs: ["idols-murtis"],
    collectionSlugs: ["diwali-puja", "best-sellers"],
    tradition: "hindu",
    inr: 599,
    imageEmoji: "🪷",
    imageColor: "#FFD700",
    inStock: true,
    rating: 4.8,
    reviewCount: 198,
    material: "Solid brass",
    weight: "310 g",
    dimensions: "4 inches (10 cm) height",
    countryOfOrigin: "India",
    shortDescription:
      "Graceful 4-inch brass Lakshmi murti for Diwali Lakshmi puja and Friday worship.",
    description:
      "Goddess Lakshmi brings prosperity and abundance. Our brass murti captures her seated posture with lotus and coins — perfect for Diwali puja and weekly Friday Lakshmi worship.",
    whatIsIt:
      "A small brass statue of Goddess Lakshmi, worshipped for prosperity, especially during Diwali.",
    traditionalUse:
      "Worshipped on Diwali night, Dhanteras, and every Friday. Placed alongside Ganesh during Lakshmi puja as Ganesh-Lakshmi pair.",
    howToUse:
      "Install on mandir shelf. Perform Lakshmi puja on Diwali with diyas, kumkum, and flowers. Offer sweets as prasad.",
    careInstructions: "Dust weekly. Apply a thin coat of oil after polishing to maintain lustre.",
    faq: [
      {
        question: "Can I pair this with the Ganesh idol?",
        answer:
          "Yes. Both are 4 inches and designed as a matching pair for Diwali Lakshmi-Ganesh puja.",
      },
      {
        question: "Is it suitable for Varalakshmi puja?",
        answer: "Yes. The seated posture with lotus is traditional for Varalakshmi and Diwali puja.",
      },
    ],
    crossSellSlugs: ["ganesh-idol-brass-small", "brass-diya-set-of-5", "brass-puja-thali-medium"],
    searchTerms: ["lakshmi idol", "lakshmi murti", "diwali lakshmi", "brass lakshmi", "लक्षmi"],
  }),

  p({
    id: "prod-018",
    slug: "copper-lota-500ml",
    sku: "MP-CP-001",
    name: "Copper Lota — 500 ml",
    indianName: "तामbe का लोटा",
    subtitle: "Hammered copper lota for jal abhishek and daily puja water",
    categorySlugs: ["copper-puja-items"],
    collectionSlugs: ["daily-puja", "new-home-puja"],
    tradition: "hindu",
    inr: 449,
    imageEmoji: "🫗",
    imageColor: "#B87333",
    inStock: true,
    rating: 4.7,
    reviewCount: 223,
    material: "Pure copper",
    weight: "180 g",
    dimensions: "12 cm height × 8 cm diameter",
    countryOfOrigin: "India",
    shortDescription:
      "Traditional hammered copper lota for offering water during puja and abhishek rituals.",
    description:
      "The copper lota is used to offer water (jal) to deities and for achaman — ritual sipping of water before puja. Copper is considered pure and auspicious in Hindu tradition.",
    whatIsIt:
      "A small copper vessel (lota) used to hold and pour water during Hindu puja rituals.",
    traditionalUse:
      "Used for jal offering to Shiva lingam, Vishnu murtis, and the sun during Surya namaskar. Essential for achaman at the start of any puja.",
    howToUse:
      "Fill with clean water. Offer to deity by pouring gently over murti or lingam. Use remaining water for achaman (sip three times).",
    careInstructions:
      "Rinse and dry after use. Copper develops natural patina — polish with lemon and salt if preferred.",
    faq: [
      {
        question: "Does copper lota have health benefits?",
        answer:
          "Ayurveda associates copper vessels with purified water. For puja use, the spiritual significance is primary.",
      },
      {
        question: "What is the capacity?",
        answer: "500 ml — standard size for home puja jal offering and achaman.",
      },
    ],
    crossSellSlugs: ["tambe-ka-kalash", "copper-puja-thali", "brass-kalash-medium"],
    searchTerms: ["copper lota", "tambe ka lota", "puja lota", "jal lota", "लोटा"],
  }),

  p({
    id: "prod-019",
    slug: "tambe-ka-kalash",
    sku: "MP-CP-002",
    name: "Tambe Ka Kalash — Copper Kalash",
    indianName: "तामbe का कलश",
    subtitle: "Hand-hammered copper kalash for Shiva puja and griha pravesh",
    categorySlugs: ["copper-puja-items", "kalash"],
    collectionSlugs: ["new-home-puja", "daily-puja"],
    tradition: "hindu",
    inr: 999,
    imageEmoji: "🏺",
    imageColor: "#CD7F32",
    inStock: true,
    rating: 4.8,
    reviewCount: 112,
    material: "Pure copper",
    weight: "650 g",
    dimensions: "20 cm height × 13 cm mouth diameter",
    countryOfOrigin: "India",
    shortDescription:
      "Premium hand-hammered copper kalash for Shiva abhishek, griha pravesh, and Navratri.",
    description:
      "Copper kalash is preferred for Shiva puja and water-based rituals. Our hand-hammered kalash has a wide stable base and holds a full coconut-and-leaves arrangement.",
    whatIsIt:
      "A copper sacred pot (kalash) used for water rituals, griha pravesh, and deity abhishek.",
    traditionalUse:
      "Copper is associated with Lord Shiva and the moon. Used for jal abhishek, griha pravesh kalash sthapana, and Navratri when copper is preferred over brass.",
    howToUse:
      "Fill with Ganga jal or clean water. Top with mango leaves and coconut for sthapana rituals. For Shiva puja, pour water over lingam from this kalash.",
    careInstructions: "Dry thoroughly after water rituals. Expect natural copper patina over time.",
    faq: [
      {
        question: "Copper or brass kalash — which should I choose?",
        answer:
          "Copper for Shiva puja and water rituals; brass for general Lakshmi/Ganesh puja and griha pravesh.",
      },
      {
        question: "Is it hand-hammered?",
        answer: "Yes. Hand-hammered by artisans in Uttar Pradesh with a distinctive textured finish.",
      },
    ],
    crossSellSlugs: ["copper-lota-500ml", "brass-kalash-medium", "copper-puja-thali"],
    searchTerms: ["copper kalash", "tambe ka kalash", "copper kalash puja", "shiva kalash"],
  }),

  p({
    id: "prod-020",
    slug: "daily-puja-samagri-kit",
    sku: "MP-PK-001",
    name: "Daily Puja Samagri Kit",
    indianName: "दैनik पूजा सामग्री",
    subtitle: "Complete starter kit — kumkum, chandan, camphor, wicks, incense, and akshat",
    categorySlugs: ["puja-kits", "puja-samagri"],
    collectionSlugs: ["daily-puja", "best-sellers"],
    tradition: "universal",
    inr: 1299,
    mrpInr: 1599,
    imageEmoji: "📦",
    imageColor: "#FF6347",
    inStock: true,
    rating: 4.9,
    reviewCount: 389,
    material: "Mixed samagri",
    weight: "650 g",
    countryOfOrigin: "India",
    shortDescription:
      "Everything you need to start daily puja — six essential samagri items in one curated kit.",
    description:
      "New to daily puja or setting up a mandir abroad? This kit bundles every consumable you need for months of worship in one box with labelled containers.",
    whatIsIt:
      "A curated bundle of daily puja consumables — kumkum, chandan, camphor, wicks, incense, and akshat.",
    traditionalUse:
      "Provides all offering materials for daily aarti and tilak without shopping for each item separately.",
    howToUse:
      "Unbox and transfer items to your puja thali compartments. Refill individual items from MyPavitra as they run out.",
    whatsIncluded:
      "Kumkum (50 g), chandan paste (80 g), camphor (50 tablets), cotton wicks (100), sandalwood incense (40 sticks), akshat rice (200 g)",
    faq: [
      {
        question: "How long does the kit last?",
        answer: "Approximately 3–4 months for daily single-deity puja.",
      },
      {
        question: "Can I buy refills individually?",
        answer: "Yes. Every item in the kit is available separately on MyPavitra.",
      },
    ],
    crossSellSlugs: ["brass-puja-thali-medium", "brass-diya-classic", "brass-puja-bell-medium"],
    searchTerms: ["puja kit", "puja samagri kit", "daily puja starter", "puja essentials box"],
  }),

  p({
    id: "prod-021",
    slug: "loban-dhoop-cups",
    sku: "MP-ID-002",
    name: "Loban Dhoop Cups",
    indianName: "लoban dhoop",
    subtitle: "Natural benzoin dhoop cups for energy cleansing — pack of 24",
    categorySlugs: ["incense-dhoop"],
    collectionSlugs: ["daily-puja", "new-home-puja"],
    tradition: "hindu",
    inr: 249,
    imageEmoji: "🌫️",
    imageColor: "#8B7355",
    inStock: true,
    rating: 4.6,
    reviewCount: 178,
    material: "Natural benzoin resin dhoop",
    weight: "120 g",
    countryOfOrigin: "India",
    shortDescription:
      "24 charcoal-free loban dhoop cups for cleansing spaces during puja and griha pravesh.",
    description:
      "Loban (benzoin) dhoop produces rich, purifying smoke used to cleanse homes before puja, after illness, and during griha pravesh. Each cup burns for 15 minutes.",
    whatIsIt:
      "Natural resin dhoop cups burned to produce cleansing smoke during Hindu puja and space purification.",
    traditionalUse:
      "Burned at the start of puja and griha pravesh to purify the space. Used after illness or negative events to cleanse the home energetically.",
    howToUse:
      "Light the rim of one cup in a heat-safe dhoop holder. Allow smoke to fill the room. Ventilate after use.",
    faq: [
      {
        question: "Is loban the same as frankincense?",
        answer:
          "Loban is benzoin resin — related but distinct from frankincense. It is the traditional Indian dhoop for puja.",
      },
      {
        question: "Do I need a special holder?",
        answer: "Any heat-safe ceramic or brass dhoop holder works. Do not place directly on wood.",
      },
    ],
    crossSellSlugs: ["sandalwood-incense-sticks", "brass-puja-thali-medium", "daily-puja-samagri-kit"],
    searchTerms: ["loban dhoop", "dhoop cups", "benzoin dhoop", "puja dhoop", "lобan"],
  }),

  p({
    id: "prod-022",
    slug: "rudraksha-mala-108",
    sku: "MP-ML-001",
    name: "Rudraksha Mala — 108 Beads",
    indianName: "rudraksha mala",
    subtitle: "5-mukhi rudraksha japa mala with tassel for Shiva meditation",
    categorySlugs: ["mala"],
    collectionSlugs: ["daily-puja", "best-sellers"],
    tradition: "hindu",
    inr: 899,
    imageEmoji: "📿",
    imageColor: "#8B4513",
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
    material: "5-mukhi rudraksha beads",
    weight: "45 g",
    dimensions: "108 beads, 40 cm loop length",
    countryOfOrigin: "Nepal/India",
    shortDescription:
      "Authentic 5-mukhi rudraksha mala with 108 beads for japa, Shiva puja, and meditation.",
    description:
      "The rudraksha mala is used for counting mantra repetitions during japa. Our 5-mukhi beads are lab-verified and strung on durable cotton thread with a traditional tassel.",
    whatIsIt:
      "A string of 108 rudraksha beads used for japa (mantra repetition) during Shiva worship and meditation.",
    traditionalUse:
      "Worn or held during Shiva puja and Om Namah Shivaya japa. 108 beads correspond to the 108 Upanishads and sacred mantra counts.",
    howToUse:
      "Hold in right hand. Recite mantra once per bead, starting from the guru bead. Complete one round equals 108 repetitions.",
    faq: [
      {
        question: "Are these genuine rudraksha?",
        answer: "Yes. 5-mukhi Nepali rudraksha, sink-test verified for authenticity.",
      },
      {
        question: "Can I wear this mala daily?",
        answer: "Yes. Rudraksha malas are commonly worn after morning puja for spiritual protection.",
      },
    ],
    crossSellSlugs: ["tulsi-mala-108", "chandan-sandalwood-paste", "sandalwood-incense-sticks"],
    searchTerms: ["rudraksha mala", "108 mala", "shiva mala", "japa mala", "rudraksha"],
  }),

  p({
    id: "prod-023",
    slug: "diwali-gift-hamper",
    sku: "MP-PG-001",
    name: "Diwali Gift Hamper",
    indianName: "diwali uphaar",
    subtitle: "Luxury gift box with diyas, incense, kumkum, and brass bell",
    categorySlugs: ["puja-gifts"],
    collectionSlugs: ["diwali-puja", "best-sellers"],
    tradition: "hindu",
    inr: 2499,
    mrpInr: 2999,
    imageEmoji: "🎁",
    imageColor: "#FF4500",
    inStock: true,
    rating: 4.9,
    reviewCount: 98,
    material: "Mixed — brass and samagri",
    weight: "1.2 kg",
    countryOfOrigin: "India",
    shortDescription:
      "Premium Diwali gift hamper in a reusable box — perfect for family, colleagues, and corporate gifting.",
    description:
      "Send the warmth of Diwali with our curated gift hamper. Beautifully packaged in a reusable lacquered box with brass diyas, incense, kumkum, camphor, and a brass bell.",
    whatIsIt:
      "A pre-packaged gift set of puja essentials and brass items for Diwali gifting.",
    traditionalUse:
      "Exchanging puja gifts during Diwali strengthens bonds and shares blessings of prosperity and light.",
    howToUse:
      "Gift as-is or open and place items on your own puja thali. Box doubles as storage for samagri.",
    whatsIncluded:
      "Brass diya set of 5, brass bell, kumkum, camphor (25 tablets), sandalwood incense (20 sticks), gift box",
    faq: [
      {
        question: "Is gift wrapping included?",
        answer: "Yes. Each hamper comes in a Diwali-themed gift box with tissue and ribbon.",
      },
      {
        question: "Can I add a personalised message?",
        answer: "Yes. Add a gift message at checkout and we include a handwritten note card.",
      },
    ],
    crossSellSlugs: ["brass-diya-set-of-5", "lakshmi-idol-brass-small", "brass-puja-bell-medium"],
    searchTerms: ["diwali gift", "puja gift hamper", "diwali hamper", "corporate diwali gift"],
  }),

  p({
    id: "prod-024",
    slug: "brass-aarti-diya",
    sku: "MP-BD-004",
    name: "Brass Aarti Diya",
    indianName: "aarti diya",
    subtitle: "Long-handled diya for safe aarti circling without heat near hands",
    categorySlugs: ["diyas", "brass-puja-items"],
    collectionSlugs: ["daily-puja", "brass-essentials"],
    tradition: "hindu",
    inr: 499,
    imageEmoji: "🔥",
    imageColor: "#FF8C00",
    inStock: true,
    rating: 4.7,
    reviewCount: 201,
    material: "Pure brass",
    weight: "150 g",
    dimensions: "18 cm total length (8 cm handle)",
    countryOfOrigin: "India",
    shortDescription:
      "Long-handled brass aarti diya — circle the flame safely before deities during aarti.",
    description:
      "Unlike flat diyas on the thali, the aarti diya has a long handle so you can circle the flame before the murti without your hands near the heat. Essential for proper aarti ritual.",
    whatIsIt:
      "A brass oil lamp with an extended handle, specifically designed for circling during aarti.",
    traditionalUse:
      "The lit aarti diya is circled clockwise before the deity while singing aarti. The handle keeps the devotee's hand at a safe distance from the flame.",
    howToUse:
      "Fill bowl with ghee or oil, light wick, hold by handle, and circle 5–7 times before the murti. Extinguish in a plate of water after aarti.",
    careInstructions: "Clean handle and bowl after each use. Check wick fit before lighting.",
    faq: [
      {
        question: "How is this different from a regular diya?",
        answer:
          "The 8 cm handle lets you perform aarti circling safely — regular diyas sit flat on the thali.",
      },
      {
        question: "Does it hold enough oil for full aarti?",
        answer: "Yes. The bowl holds sufficient oil for a 5-minute aarti circling ritual.",
      },
    ],
    crossSellSlugs: ["brass-puja-bell-medium", "brass-puja-thali-medium", "cotton-wicks-pack"],
    searchTerms: ["aarti diya", "long handle diya", "brass aarti lamp", "puja aarti"],
  }),

  p({
    id: "prod-025",
    slug: "copper-puja-thali",
    sku: "MP-CP-003",
    name: "Copper Puja Thali",
    indianName: "tambey ki thali",
    subtitle: "Hammered copper thali for Shiva puja and daily jal offering",
    categorySlugs: ["copper-puja-items", "pooja-thali"],
    collectionSlugs: ["daily-puja", "new-home-puja"],
    tradition: "hindu",
    inr: 1199,
    imageEmoji: "🟠",
    imageColor: "#B87333",
    inStock: true,
    rating: 4.8,
    reviewCount: 89,
    material: "Pure copper",
    weight: "520 g",
    dimensions: "30 cm diameter × 3.5 cm depth",
    countryOfOrigin: "India",
    shortDescription:
      "Hand-hammered copper puja thali with five compartments — preferred for Shiva and Vishnu puja.",
    description:
      "Copper thali is considered especially pure for jal-based rituals. Our hammered copper thali has the same five-compartment layout as our brass thali but in auspicious copper.",
    whatIsIt:
      "A copper puja tray with compartments for offerings, preferred in Shiva and water-based rituals.",
    traditionalUse:
      "Used in Shiva puja where copper vessels are considered sacred. Also used for Vishnu worship and daily jal offering rituals.",
    howToUse:
      "Arrange samagri in compartments. Use the centre for jal lota. Wipe dry immediately after puja to prevent patina.",
    careInstructions: "Dry thoroughly after each use. Polish monthly if you prefer shiny finish over patina.",
    faq: [
      {
        question: "Copper or brass thali for daily puja?",
        answer:
          "Brass for general daily puja; copper if you worship Shiva primarily or perform frequent jal rituals.",
      },
      {
        question: "Will it tarnish?",
        answer:
          "Copper naturally develops patina. Many devotees prefer this; polish with lemon if you want shine.",
      },
    ],
    crossSellSlugs: ["copper-lota-500ml", "tambe-ka-kalash", "brass-puja-thali-medium"],
    searchTerms: ["copper thali", "copper puja thali", "tambe ki thali", "shiva puja thali"],
  }),

  p({
    id: "prod-026",
    slug: "tulsi-mala-108",
    sku: "MP-ML-002",
    name: "Tulsi Mala — 108 Beads",
    indianName: "tulsi mala",
    subtitle: "Hand-knotted tulsi wood mala for Vishnu/Krishna japa",
    categorySlugs: ["mala"],
    collectionSlugs: ["daily-puja"],
    tradition: "hindu",
    inr: 349,
    imageEmoji: "🌿",
    imageColor: "#556B2F",
    inStock: true,
    rating: 4.6,
    reviewCount: 134,
    material: "Tulsi (Holy Basil) wood",
    weight: "25 g",
    dimensions: "108 beads, 38 cm loop length",
    countryOfOrigin: "India",
    shortDescription:
      "108-bead tulsi mala for Vishnu and Krishna japa — lightweight and fragrant.",
    description:
      "Tulsi is sacred to Vishnu and Krishna. This hand-knotted tulsi mala is lightweight enough for daily wear and japa, with a natural subtle fragrance.",
    whatIsIt:
      "A mala of 108 tulsi wood beads used for Vishnu/Krishna mantra japa and daily wear.",
    traditionalUse:
      "Worn by Vaishnavas during puja and used for Hare Krishna or Vishnu sahastra nama japa.",
    howToUse:
      "Use for japa like any 108-bead mala. Store in your mandir when not wearing. Avoid water contact.",
    faq: [
      {
        question: "Can I wear tulsi mala in shower?",
        answer: "No. Keep dry — water damages tulsi wood and fades the natural fragrance.",
      },
      {
        question: "Tulsi or rudraksha for Vishnu puja?",
        answer: "Tulsi is traditionally preferred for Vishnu/Krishna; rudraksha for Shiva.",
      },
    ],
    crossSellSlugs: ["rudraksha-mala-108", "chandan-sandalwood-paste", "sandalwood-incense-sticks"],
    searchTerms: ["tulsi mala", "tulsi beads", "vishnu mala", "krishna japa mala", "tulsi"],
  }),
];
