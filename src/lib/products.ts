export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  category: string;
  colors: string[];
  sizes: string[];
  image: string;
  badge?: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export const CATEGORIES: Category[] = [
  { id: "kimono", name: "Abayas Kimono", description: "Style moderne & ouvert", icon: "✿", count: 4 },
  { id: "bonnet", name: "Bonnets en Soie", description: "Protection & confort", icon: "◈", count: 3 },
  { id: "ensemble", name: "Ensembles", description: "Looks complets", icon: "♦", count: 2 },
  { id: "accessoire", name: "Accessoires", description: "Complétez votre tenue", icon: "✦", count: 2 },
];

export const PRODUCTS: Product[] = [
  {
    id: "abaya-kimono-tie-dye-emeraude",
    name: "Abaya Kimono Tie & Dye Émeraude",
    price: 129,
    description: "Kimono ouvert en velours tie & dye vert émeraude. Pièce statement unique.",
    longDescription: "Ce kimono ouvert en velours tie & dye est une véritable pièce statement. Le dégradé vert émeraude et menthe crée un effet visuel saisissant. Le velours doux et fluide offre un tombé majestueux. Se porte ouvert sur une robe assortie ou un ensemble uni. Chaque pièce est unique grâce au procédé tie & dye artisanal.",
    category: "kimono",
    colors: ["Vert Émeraude", "Vert Menthe"],
    sizes: ["S", "M", "L", "XL"],
    image: "/images/kimono-tiedye-emeraude.jpg",
    badge: "Best-seller",
    featured: true,
  },
  {
    id: "abaya-kimono-tie-dye-violet",
    name: "Abaya Kimono Tie & Dye Violet",
    price: 129,
    description: "Kimono ouvert tie & dye violet lavande. Élégance et originalité.",
    longDescription: "Le même modèle iconique en version violet lavande. Ce kimono ouvert en velours tie & dye offre des nuances de violet et lilas uniques à chaque pièce. Le velours de qualité premium garantit un confort exceptionnel et un tombé parfait. Idéal pour les occasions spéciales comme pour le quotidien.",
    category: "kimono",
    colors: ["Violet", "Lavande"],
    sizes: ["S", "M", "L", "XL"],
    image: "/images/kimono-tiedye-violet.jpg",
    badge: "Nouveau",
    featured: true,
  },
  {
    id: "ensemble-kimono-tie-dye-emeraude",
    name: "Ensemble Kimono + Robe Émeraude",
    price: 189,
    originalPrice: 219,
    description: "Ensemble complet : kimono tie & dye + robe intérieure assortie vert menthe.",
    longDescription: "L'ensemble parfait pour un look complet et coordonné. Comprend le kimono tie & dye vert émeraude en velours et une robe intérieure longue en tissu fluide vert menthe. Les deux pièces se complètent parfaitement et peuvent aussi être portées séparément pour multiplier les looks.",
    category: "ensemble",
    colors: ["Vert Émeraude / Menthe"],
    sizes: ["S", "M", "L", "XL"],
    image: "/images/ensemble-emeraude.jpg",
    badge: "Pack",
    featured: true,
  },
  {
    id: "abaya-kimono-plisse-degrade",
    name: "Abaya Kimono Plissé Dégradé Turquoise",
    price: 159,
    description: "Kimono en tissu plissé avec dégradé turquoise vers bleu profond. Pièce raffinée.",
    longDescription: "Une pièce d'exception en tissu plissé avec un magnifique dégradé allant du turquoise clair au bleu profond. Le tissu plissé apporte une texture unique et un mouvement élégant à chaque pas. La coupe kimono ouverte et ample est flatteuse pour toutes les morphologies. Parfait pour un look chic et moderne.",
    category: "kimono",
    colors: ["Turquoise / Bleu Profond"],
    sizes: ["S", "M", "L", "XL"],
    image: "/images/kimono-plisse-turquoise.jpg",
    badge: "Exclusif",
    featured: true,
  },
  {
    id: "bonnet-soie-blanc",
    name: "Bonnet en Soie Blanc",
    price: 39,
    description: "Bonnet sous-hijab en soie de mûrier. Intérieur satiné, doux pour les cheveux.",
    longDescription: "Notre bonnet en soie de mûrier Grade 6A protège vos cheveux sous le hijab. L'intérieur en satin de soie 23 momme réduit les frictions et prévient la casse des cheveux. L'extérieur en tissu premium blanc s'adapte parfaitement à la forme de la tête. Liens ajustables pour un maintien sûr toute la journée.",
    category: "bonnet",
    colors: ["Blanc"],
    sizes: ["Taille unique"],
    image: "/images/bonnet-blanc.jpg",
    featured: true,
  },
  {
    id: "bonnet-soie-noir-or",
    name: "Bonnet en Soie Noir & Or",
    price: 39,
    description: "Bonnet sous-hijab noir avec intérieur en soie dorée. Protection premium.",
    longDescription: "Le bonnet noir avec intérieur en soie dorée 23 momme. La soie de mûrier Grade 6A offre la meilleure protection pour vos cheveux. L'extérieur noir discret s'accorde avec tous vos hijabs. L'intérieur doré soyeux glisse sur les cheveux sans les abîmer. Élastique confortable et liens ajustables.",
    category: "bonnet",
    colors: ["Noir / Or"],
    sizes: ["Taille unique"],
    image: "/images/bonnet-noir-or.jpg",
    badge: "Best-seller",
    featured: true,
  },
  {
    id: "bonnet-soie-murier-dore",
    name: "Bonnet Soie de Mûrier 23 Momme",
    price: 45,
    originalPrice: 55,
    description: "100% soie de mûrier Grade 6A, 23 momme. La seule marque à proposer cette qualité.",
    longDescription: "Notre bonnet signature en 100% soie de mûrier 23 momme Grade 6A. La seule marque à proposer du 23 momme, tous bonnets en soie confondus. Le momme le plus élevé garantit une soie plus épaisse, plus douce et plus durable. Protège vos cheveux de la friction, réduit les frisottis et maintient l'hydratation naturelle. Un investissement pour la santé de vos cheveux.",
    category: "bonnet",
    colors: ["Doré / Noir"],
    sizes: ["Taille unique"],
    image: "/images/bonnet-soie-murier.jpg",
    badge: "Premium",
    featured: true,
  },
  {
    id: "ensemble-kimono-tie-dye-violet",
    name: "Ensemble Kimono + Robe Violet",
    price: 189,
    originalPrice: 219,
    description: "Ensemble complet : kimono tie & dye violet + robe intérieure assortie.",
    longDescription: "L'ensemble complet en version violette. Le kimono tie & dye en velours violet lavande accompagné de sa robe intérieure longue assortie. Un look sophistiqué et unique. Le velours premium et le tissu fluide de la robe créent un contraste de textures élégant.",
    category: "ensemble",
    colors: ["Violet / Lavande"],
    sizes: ["S", "M", "L", "XL"],
    image: "/images/ensemble-violet.jpg",
    featured: false,
  },
  {
    id: "abaya-kimono-tiedye-bleu",
    name: "Abaya Kimono Tie & Dye Bleu Océan",
    price: 129,
    description: "Kimono velours tie & dye bleu océan. Nuances profondes et envoûtantes.",
    longDescription: "Le kimono tie & dye en version bleu océan. Des nuances allant du bleu turquoise au bleu profond créent un effet aquatique magnifique. Le velours de qualité supérieure offre douceur et élégance. Coupe ouverte et ample, idéale pour un look décontracté chic.",
    category: "kimono",
    colors: ["Bleu Océan", "Bleu Turquoise"],
    sizes: ["S", "M", "L", "XL"],
    image: "/images/kimono-tiedye-bleu.jpg",
    featured: false,
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter((p) => p.category === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function formatPrice(price: number): string {
  return `${price.toFixed(2)}\u00A0\u20AC`;
}
