// Store settings for "The 30 Archetypes of Women" (digital product, sold in
// the US in USD). Fill in the business details below before launch — they
// appear in the footer, legal pages, and checkout.
export const store = {
  productName: "The 30 Archetypes of Women",
  tagline: "The Hidden Map of Feminine Dynamics",
  // TODO: replace with your real legal entity, state, and support email.
  legalName: "The 30 Archetypes",
  supportEmail: "support@the30archetypes.com",
  governingState: "Delaware",
  // Price in USD cents. The checkout charges exactly this (or the Stripe
  // Price in ARCHETYPES_STRIPE_PRICE_ID, if set — keep both in sync).
  priceCents: 2700,
  compareAtCents: 4700,
  pages: 180,
  refundDays: 30,
};

export function usd(cents: number) {
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
}

export type FamilyId = "sovereign" | "enchantress" | "mystic" | "sage" | "freespirit";

export type Archetype = { name: string; gift: string; shadow: string };

export type Family = {
  id: FamilyId;
  name: string;
  essence: string;
  description: string;
  archetypes: Archetype[];
};

export const families: Family[] = [
  {
    id: "sovereign",
    name: "The Sovereigns",
    essence: "Power · Presence · Leadership",
    description:
      "You were born to lead. Sovereign women command a room without raising their voice, protect what they love, and build things that last.",
    archetypes: [
      { name: "The Queen", gift: "Natural authority and grace under pressure", shadow: "Control that leaves no room for others" },
      { name: "The Empress", gift: "Abundance, beauty, and the power to build an empire", shadow: "Measuring worth by status" },
      { name: "The Huntress", gift: "Focus, independence, and relentless pursuit", shadow: "Isolation in the name of self-reliance" },
      { name: "The Warrior", gift: "Courage to fight for herself and others", shadow: "Treating every situation as a battle" },
      { name: "The Strategist", gift: "Seeing ten moves ahead", shadow: "Keeping her heart behind a plan" },
      { name: "The Matriarch", gift: "Holding families and communities together", shadow: "Carrying everyone but herself" },
    ],
  },
  {
    id: "enchantress",
    name: "The Enchantresses",
    essence: "Allure · Magnetism · Desire",
    description:
      "You draw people in. Enchantresses understand attraction, emotion, and the quiet power of being fully present in their own body.",
    archetypes: [
      { name: "The Siren", gift: "Irresistible magnetism", shadow: "Confusing attention with love" },
      { name: "The Muse", gift: "Inspiring greatness in everyone around her", shadow: "Living through other people's creations" },
      { name: "The Femme Fatale", gift: "Mystery and total self-possession", shadow: "Using distance as armor" },
      { name: "The Lover", gift: "Passion, sensuality, and deep devotion", shadow: "Losing herself in another person" },
      { name: "The Coquette", gift: "Playful charm that lights up a room", shadow: "Never letting anyone see her depth" },
      { name: "The Star", gift: "Radiance, confidence, and stage presence", shadow: "Needing the spotlight to feel real" },
    ],
  },
  {
    id: "mystic",
    name: "The Mystics",
    essence: "Intuition · Depth · Transformation",
    description:
      "You feel what others miss. Mystic women trust their inner knowing, read energy instantly, and transform pain into wisdom.",
    archetypes: [
      { name: "The Priestess", gift: "Sacred intuition and inner stillness", shadow: "Withdrawing from the world" },
      { name: "The Oracle", gift: "Reading people and patterns before they surface", shadow: "Doubting what she already knows" },
      { name: "The Alchemist", gift: "Turning hardship into power", shadow: "Seeking chaos to feel alive" },
      { name: "The Dreamer", gift: "Imagination without limits", shadow: "Escaping instead of acting" },
      { name: "The Healer", gift: "Restoring others with her presence", shadow: "Absorbing pain that isn't hers" },
      { name: "The Phoenix", gift: "Rising stronger from every ending", shadow: "Burning down what could be repaired" },
    ],
  },
  {
    id: "sage",
    name: "The Sages",
    essence: "Mind · Mastery · Vision",
    description:
      "You see the bigger picture. Sage women are guided by curiosity and clarity — they create, teach, and change how others think.",
    archetypes: [
      { name: "The Sage", gift: "Wisdom earned through experience", shadow: "Hiding feelings behind analysis" },
      { name: "The Scholar", gift: "A brilliant, endlessly curious mind", shadow: "Waiting to know everything before living" },
      { name: "The Visionary", gift: "Seeing the future before it exists", shadow: "Impatience with the present" },
      { name: "The Artist", gift: "Turning emotion into beauty", shadow: "Perfectionism that blocks creation" },
      { name: "The Diplomat", gift: "Bringing harmony to any conflict", shadow: "Silencing her own needs to keep the peace" },
      { name: "The Mentor", gift: "Unlocking the potential in others", shadow: "Forgetting her own growth" },
    ],
  },
  {
    id: "freespirit",
    name: "The Free Spirits",
    essence: "Freedom · Joy · Authenticity",
    description:
      "You refuse to be boxed in. Free Spirits live by their own rules, chase adventure, and remind everyone what it means to be truly alive.",
    archetypes: [
      { name: "The Rebel", gift: "Breaking rules that deserve to be broken", shadow: "Rebelling even against what she wants" },
      { name: "The Wild Woman", gift: "Raw instinct and untamed confidence", shadow: "Running from commitment" },
      { name: "The Explorer", gift: "Courage to go where no one has gone", shadow: "Restlessness that never lets her land" },
      { name: "The Maiden", gift: "Openness, optimism, and fresh beginnings", shadow: "Waiting to be chosen" },
      { name: "The Playmate", gift: "Joy, humor, and lightness", shadow: "Avoiding anything serious" },
      { name: "The Nomad", gift: "Feeling at home anywhere", shadow: "Never letting roots grow" },
    ],
  },
];

export const archetypeCount = families.reduce((n, f) => n + f.archetypes.length, 0);

export const pillars = [
  { icon: "crown", title: "30 Archetypes", text: "Every feminine archetype decoded — her gifts, her shadow, her power." },
  { icon: "lotus", title: "Psychological Insights", text: "Why you love, lead, and react the way you do — explained clearly." },
  { icon: "diamond", title: "Practical Guidance", text: "Concrete exercises to develop the archetypes you want to embody." },
  { icon: "heart", title: "A Self-Discovery Test", text: "Find your dominant and secondary archetypes in minutes." },
] as const;

export const method = [
  { step: "Understand", text: "Identify your dominant archetype and the patterns it creates in love, work, and friendships." },
  { step: "Embrace", text: "Own your gifts — and meet your shadow side with compassion instead of shame." },
  { step: "Develop", text: "Activate the archetypes you're missing with guided practices and daily rituals." },
  { step: "Become", text: "Step into the full, magnetic, unapologetic version of yourself." },
];

export const insideEachProfile = [
  "Her core gift and the energy she radiates",
  "Her shadow side — and how it quietly sabotages her",
  "How she loves, and the partners she attracts",
  "Her strengths at work and in leadership",
  "The archetypes she clashes with — and the ones that complete her",
  "Rituals and journaling prompts to awaken her energy",
];

export const included = [
  "The complete 30 Archetypes guide (PDF, 180+ pages)",
  "The full Self-Discovery Test with scoring key",
  "Your dominant + secondary archetype profile",
  "30 shadow-work journaling prompts",
  "Compatibility map: how archetypes attract and clash",
  "Lifetime access — read on phone, tablet, or computer",
];

export const faqs = [
  {
    q: "Is this a physical book?",
    a: "No — it's a digital guide (PDF). You get instant access right after checkout, and you can read it on any phone, tablet, or computer. Nothing is shipped.",
  },
  {
    q: "How do I receive it?",
    a: "As soon as your payment is confirmed, you're taken to a download page. You'll also get a receipt by email from our payment processor, Stripe.",
  },
  {
    q: "Is the free quiz the same as the test in the guide?",
    a: "The free quiz reveals your archetype family (1 of 5). The full Self-Discovery Test inside the guide pinpoints your exact dominant and secondary archetypes out of all 30.",
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
