export type Colorway = {
  id: string;
  label: string;
  swatch: string;
  image: string;
};

export const colorways: Colorway[] = [
  { id: "noir", label: "Noir", swatch: "#161616", image: "/sculptia/product-assets/colorway-black.png" },
  { id: "gris-chine", label: "Gris Chiné", swatch: "#9a9a9a", image: "/sculptia/product-assets/colorway-gray-chine.png" },
  { id: "beige", label: "Beige", swatch: "#d9c9a8", image: "/sculptia/product-assets/colorway-beige.png" },
  { id: "marine", label: "Marine", swatch: "#1b2a44", image: "/sculptia/product-assets/colorway-navy.png" },
  { id: "vert-kaki", label: "Kaki Foncé", swatch: "#3a3a28", image: "/sculptia/product-assets/colorway-olive-dark.png" },
  { id: "rose-fuchsia", label: "Rose Fuchsia", swatch: "#ec2c7d", image: "/sculptia/product-assets/colorway-hot-pink.png" },
  { id: "rose-clair", label: "Rose Clair", swatch: "#f5c8d6", image: "/sculptia/product-assets/colorway-light-pink.png" },
  { id: "bleu-clair", label: "Bleu Clair", swatch: "#cfe8f5", image: "/sculptia/product-assets/colorway-light-blue.png" },
];

export const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export type Bundle = {
  id: string;
  qty: number;
  free: number;
  label: string;
  sublabel: string;
  price: number;
  compareAt: number;
  badge?: string;
};

export const bundles: Bundle[] = [
  {
    id: "solo",
    qty: 1,
    free: 0,
    label: "1 Legging",
    sublabel: "Pour essayer",
    price: 29,
    compareAt: 49,
  },
  {
    id: "duo",
    qty: 2,
    free: 1,
    label: "2 achetés + 1 OFFERT",
    sublabel: "Un à porter, un à laver, un de rechange",
    price: 58,
    compareAt: 147,
    badge: "LE PLUS POPULAIRE",
  },
  {
    id: "trio",
    qty: 3,
    free: 2,
    label: "3 achetés + 2 OFFERTS",
    sublabel: "Livraison offerte incluse",
    price: 87,
    compareAt: 245,
    badge: "MEILLEURE VALEUR",
  },
];

export const reviewBreakdown = [
  { stars: 5, count: 284 },
  { stars: 4, count: 47 },
  { stars: 3, count: 15 },
  { stars: 2, count: 6 },
  { stars: 1, count: 3 },
];

export const reviewTotal = reviewBreakdown.reduce((acc, r) => acc + r.count, 0);
export const reviewAverage = 4.7;

// Placeholder reviews — written as examples of tone/length, not sourced from
// any real customer. Swap these for genuine Sculptia reviews (with real
// customer names/photos, with their consent) as soon as you have them, or
// connect a reviews app (Judge.me, Loox, Yotpo...) to pull real ones in.
export const reviews = [
  {
    name: "Camille D.",
    rating: 5,
    text: "La matière est vraiment particulière, je sens un léger massage quand je le porte. Après quelques semaines, la différence est visible.",
  },
  {
    name: "Inès R.",
    rating: 5,
    text: "La ceinture ne roule jamais, même en fin de journée. La coupe est parfaite et ça sculpte vraiment bien.",
  },
  {
    name: "Sarah B.",
    rating: 4,
    text: "Très confortable et opaque même en clair. J'aurais aimé un peu plus de choix de longueurs.",
  },
];

export const faqs = [
  {
    q: "Est-ce qu'on voit à travers quand je squatte ?",
    a: "Non. La maille 3D compressive est entièrement opaque et anti-transparence, même dans les couleurs claires — testé squat.",
  },
  {
    q: "Comment taille-t-il ? Quelle taille choisir ?",
    a: "Il taille normalement du XS au XXL. Entre deux tailles, prenez la plus petite pour plus de compression.",
  },
  {
    q: "Quand voir les premiers résultats ?",
    a: "Effet lift dès le premier jour. Peau plus tonique dès 2 semaines. Aspect plus lisse après 4 semaines d'utilisation régulière.",
  },
  {
    q: "Livraison & retours ?",
    a: "Livraison offerte dès 49€ d'achat. Retours et échanges gratuits sous 30 jours si le produit ne vous convient pas.",
  },
];
