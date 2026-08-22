"use client";

import Image from "next/image";
import { useState } from "react";
import {
  bundles,
  colorways,
  faqs,
  reviewAverage,
  reviewBreakdown,
  reviews,
  reviewTotal,
  sizes,
} from "./data";

const ASSETS = "/sculptia/product-assets";

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i <= Math.round(rating) ? "#161616" : "#e5e5e5"}
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6.1-5.4-3.2-5.4 3.2 1.3-6.1L1.3 7.7l6.1-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function SculptiaPage() {
  const [color, setColor] = useState(colorways[0]);
  const [size, setSize] = useState("M");
  const [bundleId, setBundleId] = useState("duo");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const bundle = bundles.find((b) => b.id === bundleId)!;

  const gallery = [
    color.image,
    `${ASSETS}/colorway-black.png`,
    `${ASSETS}/lifestyle-couch.png`,
    `${ASSETS}/lifestyle-yoga.png`,
  ];

  return (
    <div className="min-h-screen bg-white text-[#161616] font-sans">
      {/* Announcement bar */}
      <div className="bg-[#161616] text-white text-[11px] sm:text-xs font-semibold tracking-wide text-center py-2 px-4">
        LIVRAISON OFFERTE DÈS 49€ &nbsp;·&nbsp; 2 ACHETÉS + 1 OFFERT — AUJOURD&apos;HUI SEULEMENT
      </div>

      {/* Header */}
      <header className="border-b border-neutral-200 sticky top-0 bg-white/95 backdrop-blur z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <span className="hidden sm:block text-[11px] font-semibold tracking-widest text-neutral-500">
            LE LEGGING
          </span>
          <span className="text-2xl font-black tracking-[0.3em]">SCULPTIA</span>
          <button className="relative" aria-label="Panier">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="1.8">
              <path d="M6 8h12l-1 12H7L6 8z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
          </button>
        </div>
      </header>

      <main>
        {/* Hero: gallery + buy box */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="aspect-[4/5] bg-neutral-100 overflow-hidden rounded-sm relative">
              <Image
                src={gallery[galleryIndex]}
                alt={`Legging Sculptia 3D Anti-Cellulite — ${color.label}`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setGalleryIndex(i)}
                  className={`aspect-square relative bg-neutral-100 overflow-hidden rounded-sm border-2 ${
                    i === galleryIndex ? "border-[#161616]" : "border-transparent"
                  }`}
                >
                  <Image src={src} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div>
            <span className="inline-block bg-[#161616] text-white text-[11px] font-bold tracking-wider px-3 py-1 mb-4">
              BEST-SELLER
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase leading-tight">
              Legging Sculptia 3D Anti-Cellulite
            </h1>

            <div className="flex items-center gap-2 mt-3">
              <Stars rating={reviewAverage} />
              <span className="font-semibold text-sm">{reviewAverage}</span>
              <a href="#avis" className="text-sm text-neutral-500 underline underline-offset-2">
                ({reviewTotal} avis)
              </a>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <span className="text-3xl font-black">{bundle.price === 29 ? "29,00 €" : `${(bundle.price / bundle.qty).toFixed(2)} €`.replace(".", ",")}</span>
              <span className="text-lg text-neutral-400 line-through">49,00 €</span>
              <span className="bg-neutral-100 text-xs font-bold px-2 py-1">ÉCONOMISEZ 41%</span>
            </div>

            <ul className="mt-5 space-y-2">
              {[
                "Réduit visiblement la cellulite plus vite",
                "Tonne vos jambes sans effort",
                "Lift et galbe les fesses instantanément",
                "Anti-transparence, testé squat",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 text-[15px]">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  {b}
                </li>
              ))}
            </ul>

            {/* Color selector */}
            <div className="mt-6">
              <span className="text-xs font-bold tracking-wide">
                COULEUR : <span className="font-normal text-neutral-600">{color.label}</span>
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {colorways.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setColor(c);
                      setGalleryIndex(0);
                    }}
                    title={c.label}
                    className={`w-9 h-9 rounded-full border-2 ${
                      color.id === c.id ? "border-[#161616]" : "border-transparent"
                    } ring-1 ring-neutral-200`}
                    style={{ backgroundColor: c.swatch }}
                  />
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div className="mt-5">
              <span className="text-xs font-bold tracking-wide">
                TAILLE : <span className="font-normal text-neutral-600">{size}</span>
              </span>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-2 text-sm font-semibold border ${
                      size === s
                        ? "bg-[#161616] text-white border-[#161616]"
                        : "border-neutral-300 hover:border-neutral-500"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="mt-5 bg-neutral-100 text-center py-3 text-sm font-semibold flex items-center justify-center gap-2">
              <span>L&apos;OFFRE SE TERMINE CE SOIR</span>
              <span className="text-neutral-500">·</span>
              <CountdownBadge />
            </div>

            {/* Bundles */}
            <div className="mt-4 space-y-2">
              {bundles.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setBundleId(b.id)}
                  className={`w-full text-left border p-4 flex items-start gap-3 relative ${
                    bundleId === b.id ? "border-[#161616] bg-neutral-50" : "border-neutral-200"
                  }`}
                >
                  {b.badge && (
                    <span className="absolute -top-3 right-3 bg-[#161616] text-white text-[10px] font-bold px-2 py-1">
                      {b.badge}
                    </span>
                  )}
                  <span
                    className={`mt-1 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                      bundleId === b.id ? "border-[#161616] bg-[#161616]" : "border-neutral-300"
                    }`}
                  />
                  <span className="flex-1">
                    <span className="block font-bold text-sm text-[#161616]">{b.label}</span>
                    <span className="block text-xs text-neutral-500">{b.sublabel}</span>
                    <span className="block text-xs text-neutral-500 mt-1">
                      Économisez {b.compareAt - b.price}€ · soit {(b.price / b.qty).toFixed(2)}€/pièce
                    </span>
                  </span>
                  <span className="text-right">
                    <span className="block font-black text-[#161616]">{b.price.toFixed(2)} €</span>
                    <span className="block text-xs text-neutral-400 line-through">
                      {b.compareAt.toFixed(2)} €
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <button className="w-full bg-[#161616] text-white font-bold tracking-wide py-4 mt-5 hover:bg-neutral-800 transition-colors">
              AJOUTER AU PANIER · {bundle.price.toFixed(2)} €
            </button>
            <p className="text-center text-xs text-neutral-400 mt-1.5">
              {bundle.free > 0
                ? `Soit ${bundle.qty} legging${bundle.qty > 1 ? "s" : ""} dont ${bundle.free} offert${bundle.free > 1 ? "s" : ""}`
                : "1 legging"}
            </p>

            <p className="text-center text-xs text-neutral-500 mt-2">
              En stock · Livraison offerte · Remboursé 30 jours
            </p>

            <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-neutral-200 text-center text-[11px] text-neutral-600">
              <div className="flex flex-col items-center gap-1">
                <TruckIcon />
                Livraison offerte 49€+
              </div>
              <div className="flex flex-col items-center gap-1">
                <ReturnIcon />
                Retours 30 jours
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldIcon />
                Paiement sécurisé
              </div>
            </div>
          </div>
        </section>

        {/* Promise banner */}
        <section className="bg-[#161616] text-white text-center py-14 px-4">
          <p className="text-[11px] tracking-[0.3em] font-semibold text-neutral-400">
            LA PROMESSE SCULPTIA
          </p>
          <h2 className="text-3xl sm:text-4xl font-black uppercase mt-2">
            Sublime ta silhouette
          </h2>
          <p className="max-w-md mx-auto text-neutral-300 mt-3 text-[15px]">
            Un seul legging pour tout changer : il gaine, lifte et lisse dès la première minute.
          </p>
        </section>

        {/* Result / Mechanism / Comparison / Waist / Skin — all native, in French */}
        <ImageTextRow
          eyebrow="LE RÉSULTAT"
          title="Une silhouette visuellement plus galbée"
          text="La ceinture haute gaine le ventre, les panneaux arrière relèvent les fessiers et la compression affine les cuisses."
          bullets={["Taille visuellement affinée", "Fessiers relevés et rebondis", "Cuisses lissées, sans marques"]}
          image={`${ASSETS}/lifestyle-yoga.png`}
        />
        <ImageTextRow
          eyebrow="LE MÉCANISME"
          title="Sa structure 3D fait la différence"
          text=""
          bullets={[]}
          image={`${ASSETS}/lifestyle-couch.png`}
          reverse
          richBullets={[
            { title: "Maille nid d'abeille.", text: "Des alvéoles en relief créent un micro-massage à chaque pas." },
            { title: "Panneaux contournés.", text: "Soutiennent les fessiers comme une main invisible." },
            { title: "Compression graduée.", text: "Ferme au ventre, souple aux genoux." },
          ]}
        />
        <ImageTextRow
          eyebrow="LA CIRCULATION"
          title="Le tissu qui masse à chaque mouvement"
          text="Les lignes de drainage 3D stimulent la circulation et le drainage lymphatique dès l'enfilage."
          bullets={[]}
          image={`${ASSETS}/colorway-gray-chine.png`}
          richBullets={[
            { title: "Sans Sculptia.", text: "Circulation ralentie, cellulite persistante." },
            { title: "Avec Sculptia.", text: "Circulation stimulée, peau plus lisse." },
          ]}
        />
        <ImageTextRow
          eyebrow="LA TAILLE"
          title="Taille haute, ventre plat"
          text="La large ceinture maintient le ventre en douceur et sublime la silhouette, sans jamais rouler."
          bullets={["Maintien doux et sécurisé", "Ne roule jamais, ne glisse pas", "Silhouette naturellement sublimée"]}
          image={`${ASSETS}/colorway-navy.png`}
          reverse
        />
        <ImageTextRow
          eyebrow="LA PEAU"
          title="Une peau à l'apparence plus lisse"
          text="Le relief de la maille stimule la peau à chaque mouvement. L'aspect peau d'orange s'estompe visiblement."
          bullets={[]}
          image={`${ASSETS}/colorway-charcoal.png`}
        />

        {/* Timeline */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10 border-t border-neutral-200">
          <div className="grid grid-cols-3 text-center gap-4">
            {[
              ["Jour 1", "Effet lift immédiat"],
              ["2 sem.", "Peau plus tonique"],
              ["4 sem.", "Aspect plus lisse"],
            ].map(([t, d]) => (
              <div key={t}>
                <div className="text-xl font-black">{t}</div>
                <div className="text-sm text-neutral-500 mt-1">{d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature grid */}
        <section className="bg-neutral-50 py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-4">
            {[
              ["Ne roule jamais", "Tient en place, même en squat."],
              ["100 % opaque", "Zéro transparence, testé squat."],
              ["Sans coutures gênantes", "Aucun frottement, aucun pincement."],
              ["Respirant", "Évacue l'humidité, sèche vite."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white border border-neutral-200 p-6">
                <h3 className="font-bold">{t}</h3>
                <p className="text-sm text-neutral-500 mt-1 whitespace-nowrap">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Daily use */}
        {/*
          NOTE: pas de photo "ville" (femme qui marche en extérieur) disponible
          dans les visuels fournis — tous les clichés reçus sont en studio ou en
          intérieur. En attendant une vraie photo lifestyle extérieure, on utilise
          un coloris différent pour ne pas répéter les mêmes visuels.
        */}
        <ImageTextRow
          eyebrow="AU QUOTIDIEN"
          title="Du sport à la vie de tous les jours"
          text="Se porte avec des baskets comme avec des bottes, du yoga du matin au brunch du dimanche."
          bullets={[]}
          tags={["SPORT", "BUREAU", "VOYAGE", "VILLE"]}
          image={`${ASSETS}/colorway-beige.png`}
        />

        {/* Material */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center border-t border-neutral-200">
          <h2 className="text-2xl font-black uppercase">Sculptant sans sacrifier le confort</h2>
          <p className="text-neutral-500 mt-3">
            70 % polyamide, 30 % élasthanne : une matière seconde peau qui s&apos;oublie une fois enfilée.
          </p>
        </section>

        {/* Final CTA */}
        <section className="bg-[#161616] text-white text-center py-16 px-4">
          <h2 className="text-2xl sm:text-3xl font-black uppercase">
            Prête à révéler votre silhouette ?
          </h2>
          <p className="text-neutral-300 mt-3 text-sm">
            2 achetés + 1 OFFERT aujourd&apos;hui · Livraison offerte dès 49€ · Remboursé 30 jours
          </p>
          <a
            href="#top"
            className="inline-block bg-white text-[#161616] font-bold tracking-wide px-8 py-4 mt-6"
          >
            CHOISIR MON OFFRE
          </a>
        </section>

        {/* Reviews */}
        <section id="avis" className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-2xl font-black uppercase text-center">
            Adoré par plus de 7000 femmes
          </h2>

          <div className="border border-neutral-200 p-6 mt-8 text-center">
            <div className="text-4xl font-black">{reviewAverage}</div>
            <div className="flex justify-center my-2">
              <Stars rating={reviewAverage} size={20} />
            </div>
            <div className="text-sm text-neutral-500">{reviewTotal} avis vérifiés</div>

            <div className="mt-7 space-y-3 text-left">
              {reviewBreakdown.map((r) => {
                const pct = (r.count / reviewTotal) * 100;
                return (
                  <div key={r.stars} className="flex items-center gap-3 text-sm">
                    <span className="w-10 shrink-0 font-semibold">{r.stars} ★</span>
                    <div className="flex-1 h-3 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#161616] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-12 shrink-0 text-right text-neutral-500 tabular-nums">
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {reviews.map((r) => (
              <blockquote key={r.name} className="border border-neutral-200 p-6">
                <div className="flex items-center justify-between">
                  <Stars rating={r.rating} />
                  <span className="text-xs font-semibold text-neutral-500">{r.name}</span>
                </div>
                <p className="mt-3 text-[15px]">&ldquo;{r.text}&rdquo;</p>
              </blockquote>
            ))}
          </div>

          <p className="text-center text-xs text-neutral-400 mt-4">
            D&apos;autres avis clients Sculptia seront ajoutés au fur et à mesure.
          </p>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 border-t border-neutral-200">
          <h2 className="text-2xl font-black uppercase mb-6">Questions fréquentes</h2>
          <div className="divide-y divide-neutral-200">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-4 text-left font-bold"
                >
                  {f.q}
                  <span className="text-xl font-normal ml-4">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="text-neutral-600 pb-4 text-[15px]">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 p-3 lg:hidden z-40">
        <button className="w-full bg-[#161616] text-white font-bold tracking-wide py-3">
          AJOUTER AU PANIER · {bundle.price.toFixed(2)} €
        </button>
        <p className="text-center text-[11px] text-neutral-400 mt-1">
          {bundle.free > 0 ? `${bundle.qty} leggings dont ${bundle.free} offert${bundle.free > 1 ? "s" : ""}` : "1 legging"}
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-50 border-t border-neutral-200 py-12 px-4 sm:px-6 mt-8 pb-24 lg:pb-12">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="text-xl font-black tracking-[0.3em] mb-3">SCULPTIA</div>
            <p className="text-neutral-500">
              Legging engineered pour sculpter, lisser et sublimer votre silhouette au quotidien.
            </p>
          </div>
          <div>
            <div className="font-bold mb-3">Aide</div>
            <ul className="space-y-2 text-neutral-500">
              <li>Suivi de commande</li>
              <li>Retours & échanges</li>
              <li>Livraison</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-3">Newsletter</div>
            <p className="text-neutral-500 mb-3">-10% sur votre première commande.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 border border-neutral-300 px-3 py-2 text-sm"
              />
              <button className="bg-[#161616] text-white px-4 text-sm font-semibold">OK</button>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-neutral-400 mt-10">
          © {new Date().getFullYear()} Sculptia. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
}

function ImageTextRow({
  eyebrow,
  title,
  text,
  bullets,
  image,
  reverse,
  tags,
  richBullets,
}: {
  eyebrow: string;
  title: string;
  text: string;
  bullets: string[];
  image: string;
  reverse?: boolean;
  tags?: string[];
  richBullets?: { title: string; text: string }[];
}) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-8 items-center">
      <div className={`relative aspect-[4/5] bg-neutral-100 ${reverse ? "md:order-2" : ""}`}>
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className={reverse ? "md:order-1" : ""}>
        <p className="text-[11px] font-bold tracking-[0.25em] text-neutral-400">{eyebrow}</p>
        <h2 className="text-2xl sm:text-3xl font-black uppercase mt-2 leading-tight">{title}</h2>
        {text && <p className="text-neutral-500 mt-4">{text}</p>}
        {bullets.length > 0 && (
          <ul className="mt-4 space-y-2">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[15px]">
                <span className="text-green-600 font-bold mt-0.5">✓</span>
                {b}
              </li>
            ))}
          </ul>
        )}
        {richBullets && (
          <ul className="mt-4 space-y-3">
            {richBullets.map((b) => (
              <li key={b.title} className="text-[15px]">
                <span className="font-bold">{b.title}</span> <span className="text-neutral-500">{b.text}</span>
              </li>
            ))}
          </ul>
        )}
        {tags && (
          <div className="flex flex-wrap gap-2 mt-5">
            {tags.map((t) => (
              <span key={t} className="border border-neutral-300 px-4 py-2 text-xs font-semibold">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CountdownBadge() {
  return <span className="font-mono font-bold">29:35</span>;
}

function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="1.6">
      <path d="M2 7h13v9H2z" />
      <path d="M15 10h4l3 3v3h-7z" />
      <circle cx="6.5" cy="18.5" r="1.5" />
      <circle cx="17.5" cy="18.5" r="1.5" />
    </svg>
  );
}
function ReturnIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="1.6">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#161616" strokeWidth="1.6">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
      <path d="M9.5 12l1.8 1.8L14.5 10" />
    </svg>
  );
}
