"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-white/5 mt-20 bg-surface">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -top-16 bg-gradient-to-r from-primary/40 via-primary/20 to-accent/20 border border-white/10 rounded-2xl p-8 sm:p-12 text-center overflow-hidden">
          <div className="flag-shimmer absolute inset-0" />
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Rejoins la team <span className="gradient-text-static">WorldCup</span> 🏆
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm">
              -10% sur ta première commande + accès exclusif aux drops et offres limitées.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 bg-success/20 text-success px-6 py-3 rounded-xl font-semibold animate-scale-in">
                ✅ Bienvenue dans l&apos;équipe !
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Ton email..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="newsletter-input flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 transition-all"
                />
                <button type="submit" className="btn-primary px-6 py-3 text-sm whitespace-nowrap">
                  S&apos;inscrire
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 -mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                <span className="text-sm">⚽</span>
              </div>
              <span className="font-extrabold text-sm tracking-tight">
                <span className="gradient-text-static">WORLDCUP</span> SHOP
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed max-w-[220px]">
              La boutique n°1 pour supporters. Coques & Crocs aux couleurs de ton équipe.
            </p>
            <div className="flex gap-3 mt-4">
              {["🇫🇷", "🇧🇷", "🇦🇷", "🇩🇪", "🇪🇸", "🇲🇦"].map((f, i) => (
                <span key={i} className="text-lg hover:scale-125 transition-transform cursor-default">{f}</span>
              ))}
            </div>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-accent mb-4">Boutique</h4>
            <ul className="space-y-2.5">
              <FooterLink href="/store/coques">Coques personnalisées</FooterLink>
              <FooterLink href="/store/crocs">Crocs customisées</FooterLink>
              <FooterLink href="/store/packs">Packs duo -20%</FooterLink>
              <FooterLink href="/store/pays">Tous les pays</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-accent mb-4">Support</h4>
            <ul className="space-y-2.5">
              <FooterLink href="#">FAQ</FooterLink>
              <FooterLink href="#">Guide des tailles</FooterLink>
              <FooterLink href="#">Suivi de commande</FooterLink>
              <FooterLink href="#">Contactez-nous</FooterLink>
            </ul>
          </div>

          {/* Garanties */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-accent mb-4">Garanties</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-xs text-muted">
                <span className="text-base">🚚</span> Livraison gratuite dès 50€
              </li>
              <li className="flex items-center gap-2 text-xs text-muted">
                <span className="text-base">↩️</span> Retours gratuits 30 jours
              </li>
              <li className="flex items-center gap-2 text-xs text-muted">
                <span className="text-base">🔒</span> Paiement 100% sécurisé
              </li>
              <li className="flex items-center gap-2 text-xs text-muted">
                <span className="text-base">📦</span> Expédié sous 24-48h
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-muted">
            © 2026 WorldCup Shop. Non affilié à la FIFA. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-muted">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Apple Pay</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-xs text-muted hover:text-white transition-colors duration-200">
        {children}
      </Link>
    </li>
  );
}
