// Store settings for "The 30 Archetypes of Women" (digital product, sold in
// the US in USD). Fill in the business details below before launch — they
// appear in the footer, legal pages, and checkout.
export const store = {
  productName: "The 30 Archetypes of Women",
  tagline: "The Hidden Map of Feminine Dynamics",
  // TODO: replace with your real legal entity, state, and support email.
  brandName: "Divine Women",
  legalName: "Divine Women",
  supportEmail: "womenpower2026@hotmail.com",
  governingState: "Delaware",
  // Price in USD cents. The checkout charges exactly this (or the Stripe
  // Price in ARCHETYPES_STRIPE_PRICE_ID, if set — keep both in sync).
  priceCents: 3900,
  // Regular price, shown struck through next to the sale price.
  compareAtCents: 6600,
  promoLabel: "Fall Special",
  ctaLabel: "Claim Your Golden Ticket",
  pages: 180,
  refundDays: 30,
};

export function usd(cents: number) {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

export type FamilyId = "sovereign" | "enchantress" | "mystic" | "sage" | "freespirit";

export type Family = {
  id: FamilyId;
  name: string;
  essence: string;
  description: string;
  archetypes: string[];
};

export const families: Family[] = [
  {
    id: "sovereign",
    name: "The Sovereigns",
    essence: "Power · Presence · Leadership",
    description:
      "You were born to lead. Sovereign women command a room without raising their voice, protect what they love, and build things that last.",
    archetypes: [
      "The Queen",
      "The Empress",
      "The Huntress",
      "The Warrior",
      "The Strategist",
      "The Matriarch",
    ],
  },
  {
    id: "enchantress",
    name: "The Enchantresses",
    essence: "Allure · Magnetism · Desire",
    description:
      "You draw people in. Enchantresses understand attraction, emotion, and the quiet power of being fully present in their own body.",
    archetypes: [
      "The Siren",
      "The Muse",
      "The Femme Fatale",
      "The Lover",
      "The Coquette",
      "The Star",
    ],
  },
  {
    id: "mystic",
    name: "The Mystics",
    essence: "Intuition · Depth · Transformation",
    description:
      "You feel what others miss. Mystic women trust their inner knowing, read energy instantly, and transform pain into wisdom.",
    archetypes: [
      "The Priestess",
      "The Oracle",
      "The Alchemist",
      "The Dreamer",
      "The Healer",
      "The Phoenix",
    ],
  },
  {
    id: "sage",
    name: "The Sages",
    essence: "Mind · Mastery · Vision",
    description:
      "You see the bigger picture. Sage women are guided by curiosity and clarity — they create, teach, and change how others think.",
    archetypes: [
      "The Sage",
      "The Scholar",
      "The Visionary",
      "The Artist",
      "The Diplomat",
      "The Mentor",
    ],
  },
  {
    id: "freespirit",
    name: "The Free Spirits",
    essence: "Freedom · Joy · Authenticity",
    description:
      "You refuse to be boxed in. Free Spirits live by their own rules, chase adventure, and remind everyone what it means to be truly alive.",
    archetypes: [
      "The Rebel",
      "The Wild Woman",
      "The Explorer",
      "The Maiden",
      "The Playmate",
      "The Nomad",
    ],
  },
];

export const archetypeCount = families.reduce((n, f) => n + f.archetypes.length, 0);

export const pillars = [
  { icon: "crown", title: "30 Archetypes" },
  { icon: "lotus", title: "Psychological Insights" },
  { icon: "diamond", title: "Practical Guidance" },
  { icon: "heart", title: "A Self-Discovery Test" },
] as const;

export const included = [
  "The complete guide (PDF)",
  "The Self-Discovery Test",
  "Instant download, lifetime access",
];

// Reader reviews shown above the FAQ. Only add genuine reviews from people
// who read the guide, with their permission to publish their first name,
// words and photo. Photos go in public/reviews/. If a reviewer is a friend
// or got a free copy, set `disclosure` (US FTC rules require it).
export type Review = {
  name: string;
  text: string;
  rating: number;
  photo?: string;
  disclosure?: string;
};

export const reviews: Review[] = [];

export const faqs = [
  {
    q: "Is this a physical book?",
    a: "No — it's a digital guide (PDF). You get instant access right after checkout, and you can read it on any phone, tablet, or computer. Nothing is shipped.",
  },
  {
    q: "What if it's not for me?",
    a: "You're covered by our 30-day money-back guarantee. Email us within 30 days of purchase and we'll refund you in full — no questions asked.",
  },
  {
    q: "Is this therapy or psychological treatment?",
    a: "No. The guide is an educational and self-reflection tool inspired by archetypal psychology. It is not a substitute for professional mental health care.",
  },
  {
    q: "Is checkout secure?",
    a: "Yes. Payments are processed by Stripe, which handles billions of dollars each year. We never see or store your card details. Apple Pay and Google Pay are supported.",
  },
];

// Free quiz: each answer points to one archetype family. The family with the
// most points is the result.
export const quiz: { q: string; answers: { text: string; family: FamilyId }[] }[] = [
  {
    q: "You walk into a party where you know no one. You…",
    answers: [
      { text: "Find the host and quietly take the pulse of the room", family: "sovereign" },
      { text: "Notice who's already looking at you", family: "enchantress" },
      { text: "Sense who's having a hard night and drift toward them", family: "mystic" },
      { text: "Find the most interesting conversation", family: "sage" },
      { text: "Dance first, introductions later", family: "freespirit" },
    ],
  },
  {
    q: "Your friends call you when they need…",
    answers: [
      { text: "Someone to take charge", family: "sovereign" },
      { text: "A confidence boost before a big night", family: "enchantress" },
      { text: "Someone who truly understands", family: "mystic" },
      { text: "Clear, honest advice", family: "sage" },
      { text: "A spontaneous adventure", family: "freespirit" },
    ],
  },
  {
    q: "In love, you crave…",
    answers: [
      { text: "A partner who matches my ambition", family: "sovereign" },
      { text: "Passion, chemistry, and devotion", family: "enchantress" },
      { text: "A soul-deep connection", family: "mystic" },
      { text: "Someone I can grow with intellectually", family: "sage" },
      { text: "Freedom — together, but never caged", family: "freespirit" },
    ],
  },
  {
    q: "Your biggest fear is…",
    answers: [
      { text: "Losing control of my life", family: "sovereign" },
      { text: "Being invisible", family: "enchantress" },
      { text: "Living a shallow, meaningless life", family: "mystic" },
      { text: "Being misunderstood or uninformed", family: "sage" },
      { text: "Being trapped", family: "freespirit" },
    ],
  },
  {
    q: "Pick the word that feels most like you:",
    answers: [
      { text: "Powerful", family: "sovereign" },
      { text: "Magnetic", family: "enchantress" },
      { text: "Intuitive", family: "mystic" },
      { text: "Wise", family: "sage" },
      { text: "Free", family: "freespirit" },
    ],
  },
  {
    q: "Your ideal Saturday looks like…",
    answers: [
      { text: "Working on a project that matters to me", family: "sovereign" },
      { text: "Getting ready for a night out", family: "enchantress" },
      { text: "Candles, a journal, and silence", family: "mystic" },
      { text: "A museum, a bookstore, a long talk", family: "sage" },
      { text: "A last-minute road trip", family: "freespirit" },
    ],
  },
  {
    q: "When someone wrongs you, you…",
    answers: [
      { text: "Set a firm boundary — immediately", family: "sovereign" },
      { text: "Let them feel the absence of your warmth", family: "enchantress" },
      { text: "Understand why, even if you don't forgive", family: "mystic" },
      { text: "Analyze it, then talk it through", family: "sage" },
      { text: "Move on — life's too short", family: "freespirit" },
    ],
  },
  {
    q: "The compliment that means the most to you:",
    answers: [
      { text: "“You inspire me to be stronger.”", family: "sovereign" },
      { text: "“I can't stop thinking about you.”", family: "enchantress" },
      { text: "“You see me like no one else does.”", family: "mystic" },
      { text: "“You changed the way I think.”", family: "sage" },
      { text: "“There's no one like you.”", family: "freespirit" },
    ],
  },
];
