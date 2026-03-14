"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-[var(--gold)] transition-colors">Accueil</Link>
        <span>/</span>
        <span className="text-[var(--black-soft)]">Contact</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          <h1 className="text-3xl font-bold text-[var(--black-soft)] mb-2">Contactez-nous</h1>
          <div className="divider-gold !mx-0 mb-6" />
          <p className="text-gray-500 mb-8 leading-relaxed">
            Une question sur un produit, votre commande ou une demande speciale ? Notre equipe est la pour vous aider.
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-green-800 mb-2">Message envoye !</h2>
              <p className="text-green-600">Nous vous repondrons dans les 24 heures.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--black-soft)] mb-1.5">Prenom</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                    placeholder="Votre prenom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--black-soft)] mb-1.5">Nom</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--black-soft)] mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--black-soft)] mb-1.5">Sujet</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 focus:outline-none focus:border-[var(--gold)] transition-colors">
                  <option>Question sur un produit</option>
                  <option>Suivi de commande</option>
                  <option>Retour / Echange</option>
                  <option>Demande speciale / Sur-mesure</option>
                  <option>Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--black-soft)] mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--gold)] transition-colors resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button type="submit" className="btn-gold px-8 py-3.5 rounded-xl font-medium text-base w-full">
                Envoyer le message
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="bg-[var(--cream)] rounded-3xl p-8 mb-6">
            <h2 className="text-lg font-bold text-[var(--black-soft)] mb-6">Informations</h2>
            <div className="space-y-6">
              {[
                { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email", value: "contact@qtp-abayas.com" },
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "WhatsApp", value: "+33 6 XX XX XX XX" },
                { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Horaires", value: "Lun-Sam : 9h - 19h" },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", label: "Adresse", value: "Paris, France" },
              ].map((info) => (
                <div key={info.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--black-soft)]">{info.label}</p>
                    <p className="text-sm text-gray-500">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-[var(--black-soft)] mb-4">FAQ rapide</h2>
            <div className="space-y-4">
              {[
                { q: "Quels sont les delais de livraison ?", a: "2-5 jours ouvrés en France, 5-10 jours en Europe." },
                { q: "Puis-je retourner un article ?", a: "Oui, sous 30 jours dans son emballage d'origine." },
                { q: "Faites-vous du sur-mesure ?", a: "Oui ! Contactez-nous pour des ajustements de longueur ou de taille." },
                { q: "Quels modes de paiement acceptez-vous ?", a: "CB, PayPal, Apple Pay, virement bancaire." },
              ].map((faq) => (
                <div key={faq.q}>
                  <p className="text-sm font-medium text-[var(--black-soft)]">{faq.q}</p>
                  <p className="text-sm text-gray-500 mt-1">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
