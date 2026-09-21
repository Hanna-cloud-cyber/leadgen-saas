export type Pack = {
  id: string;
  name: string;
  tagline: string;
  suppliers: number;
  countries: number;
  icon: string;
};

export const PACKS: Pack[] = [
  {
    id: "electronics",
    name: "Electronics",
    tagline: "Phone accessories, gadgets, smart devices & audio",
    suppliers: 140,
    countries: 12,
    icon: "electronics",
  },
  {
    id: "food",
    name: "Food & Beverage",
    tagline: "Snacks, specialty drinks, supplements & packaged goods",
    suppliers: 95,
    countries: 9,
    icon: "food",
  },
  {
    id: "beauty",
    name: "Beauty & Cosmetics",
    tagline: "Skincare, makeup, haircare & private-label formulas",
    suppliers: 110,
    countries: 10,
    icon: "beauty",
  },
  {
    id: "women-clothing",
    name: "Women's Clothing",
    tagline: "Fast fashion, activewear, loungewear & swimwear",
    suppliers: 160,
    countries: 14,
    icon: "womens-clothing",
  },
  {
    id: "men-clothing",
    name: "Men's Clothing",
    tagline: "Streetwear, essentials, outerwear & activewear",
    suppliers: 130,
    countries: 12,
    icon: "mens-clothing",
  },
  {
    id: "bags-accessories",
    name: "Women's Bags & Accessories",
    tagline: "Handbags, jewelry, sunglasses & small leather goods",
    suppliers: 90,
    countries: 8,
    icon: "bags",
  },
  {
    id: "e-scooters",
    name: "Electric Scooters",
    tagline: "Commuter scooters, off-road models & spare parts",
    suppliers: 40,
    countries: 6,
    icon: "scooter",
  },
  {
    id: "e-bikes",
    name: "Electric Bikes",
    tagline: "City e-bikes, fat-tire, folding & cargo models",
    suppliers: 35,
    countries: 6,
    icon: "bike",
  },
  {
    id: "home-appliances",
    name: "Home Appliances",
    tagline: "Kitchen gadgets, small appliances & smart home devices",
    suppliers: 75,
    countries: 8,
    icon: "appliance",
  },
];

export const TOTAL_SUPPLIERS = PACKS.reduce((sum, p) => sum + p.suppliers, 0);

export type PricingTier = {
  id: string;
  name: string;
  sublabel: string;
  price: number;
  compareAt: number;
  packCount: string;
  badge?: string;
  features: string[];
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "single",
    name: "Single Pack",
    sublabel: "Pick one niche",
    price: 37,
    compareAt: 79,
    packCount: "1 supplier pack",
    features: [
      "Full contact list for 1 niche",
      "Verified emails, websites & WhatsApp",
      "MOQs & sample pricing included",
      "Outreach message templates",
      "Lifetime access, one payment",
    ],
  },
  {
    id: "all-access",
    name: "All-Access Bundle",
    sublabel: "Every pack, every niche",
    price: 97,
    compareAt: 349,
    packCount: "All 9 supplier packs",
    badge: "MOST POPULAR",
    features: [
      "All 9 niche packs unlocked",
      `${TOTAL_SUPPLIERS}+ verified suppliers`,
      "Monthly refresh — dead leads replaced",
      "Red-flag checklist to avoid scam suppliers",
      "Outreach templates for every niche",
      "Lifetime access, one payment",
    ],
  },
  {
    id: "elite",
    name: "Business Elite",
    sublabel: "All-Access + sourcing support",
    price: 197,
    compareAt: 497,
    packCount: "All 9 packs + 1-on-1 call",
    features: [
      "Everything in All-Access",
      "30-minute 1-on-1 sourcing call",
      "Private-label supplier shortlist",
      "Priority email support",
      "Lifetime access, one payment",
    ],
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "What exactly is inside a Supplier Pack?",
    a: "Each pack is a spreadsheet of hand-checked suppliers for that niche: contact details (email, website, WhatsApp where available), typical minimum order quantities, sample pricing, and a ready-to-send outreach message so you can start a conversation the same day.",
  },
  {
    q: "Are the suppliers actually verified?",
    a: "Yes. Every supplier is checked for a working business contact, a real product catalog, and reasonable MOQs before it's added to a pack. Dead links and unresponsive suppliers are removed and replaced during the monthly refresh.",
  },
  {
    q: "Do I need a registered business to contact these suppliers?",
    a: "No. Most suppliers in these packs will quote samples or small first orders to individuals getting started. A business registration helps for larger wholesale pricing later, but it isn't required to begin.",
  },
  {
    q: "Can I switch or add niches later?",
    a: "With the Single Pack you can upgrade to All-Access at any time and only pay the difference. All-Access and Business Elite already include every niche, so there's nothing to add.",
  },
  {
    q: "How is this different from free supplier lists online?",
    a: "Free lists are usually outdated, unverified, or the same recycled directory everyone else already has. These packs are checked by hand, updated monthly, and organized specifically for people building a store — not a general business directory.",
  },
  {
    q: "Is there a guarantee?",
    a: "Yes — a 30-day access guarantee. If you don't find at least 3 suppliers worth contacting in your pack, send proof you reached out and we'll refund you in full.",
  },
  {
    q: "How do I receive access after purchase?",
    a: "You get instant access to your dashboard with your pack(s) as soon as checkout completes. No waiting, no shipping.",
  },
];

export type Testimonial = { name: string; role: string; text: string; rating: number };

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marc D.",
    role: "Electronics store owner",
    text: "I spent three weekends messaging suppliers I found on Google before this. With the Electronics pack I had two suppliers quoting samples within a day.",
    rating: 5,
  },
  {
    name: "Sofia R.",
    role: "Beauty brand founder",
    text: "The private-label contacts alone paid for the All-Access bundle. Everything was already checked, so I skipped the usual back-and-forth with dead suppliers.",
    rating: 5,
  },
  {
    name: "Yanis K.",
    role: "Dropshipping, women's fashion",
    text: "Clear MOQs and real pricing on every line. I stopped guessing and just picked suppliers that matched my budget from day one.",
    rating: 5,
  },
  {
    name: "Priya M.",
    role: "Home goods store",
    text: "The outreach templates made the first message so much easier. Two suppliers from the Home Appliances pack replied the same afternoon.",
    rating: 4,
  },
  {
    name: "Thomas B.",
    role: "E-bike reseller",
    text: "Niche is small so good suppliers are hard to find on your own. This pack had contacts I hadn't come across anywhere else.",
    rating: 5,
  },
];

export const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Pick your niche",
    desc: "Choose one Supplier Pack or unlock all 9 with All-Access.",
  },
  {
    step: "2",
    title: "Get instant access",
    desc: "Your pack unlocks immediately — no waiting, download and go.",
  },
  {
    step: "3",
    title: "Contact suppliers today",
    desc: "Use the built-in templates to request samples and pricing the same day.",
  },
];

export const WHATS_INSIDE = [
  { title: "Verified contacts", desc: "Email, website and WhatsApp for every supplier, checked by hand." },
  { title: "Real MOQs & pricing", desc: "Know the minimum order and sample cost before you reach out." },
  { title: "Outreach templates", desc: "Proven first-contact messages so you get replies, not silence." },
  { title: "Scam red-flag checklist", desc: "Spot the warning signs before you send a single deposit." },
  { title: "Monthly refresh", desc: "Dead or unresponsive suppliers get replaced automatically." },
  { title: "Lifetime access", desc: "One payment. No subscription, no recurring fees." },
];

export type ComparisonRow = { label: string; us: boolean | string; free: boolean | string };

export const COMPARISON: ComparisonRow[] = [
  { label: "Contacts checked by hand", us: true, free: false },
  { label: "Real MOQs & sample pricing listed", us: true, free: false },
  { label: "Updated monthly", us: true, free: "Rarely" },
  { label: "Ready-to-send outreach templates", us: true, free: false },
  { label: "Scam red-flag checklist", us: true, free: false },
  { label: "Organized by niche", us: true, free: "Sometimes" },
  { label: "Time to first reply", us: "Same day", free: "Weeks" },
];

// A sample row shown in the hero mockup — illustrative only, not a real supplier.
export const SAMPLE_ROW = {
  name: "Northline Audio Co.",
  location: "Shenzhen, CN",
  moq: "50 units",
  sample: "$12 / unit",
  status: "Verified",
};
