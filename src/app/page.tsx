import Link from "next/link";
import { PLANS, formatPrice } from "@/lib/billing";
import { INDUSTRIES } from "@/lib/engine/industries";
import { getAllCountries } from "@/lib/engine/countries";

export default function Home() {
  const countries = getAllCountries();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              L
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              LeadGen AI
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/buy-leads" className="text-sm text-gray-400 hover:text-white transition-colors">Buy Leads</Link>
            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">Connexion</Link>
            <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/signup" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Commencer gratuitement
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-fade-in-up inline-block px-4 py-1.5 bg-indigo-900/20 border border-indigo-700/30 rounded-full text-xs text-indigo-400 mb-8 backdrop-blur-sm">
            Trouvez des clients partout dans le monde
          </div>
          <h1 className="animate-fade-in-up animate-delay-100 text-5xl md:text-7xl font-bold leading-[1.1] max-w-4xl mx-auto tracking-tight">
            Générez des leads qualifiés
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"> automatiquement</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-200 text-lg md:text-xl text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">
            Scrapez des milliers d&apos;entreprises et contacts dans {countries.length} pays.
            Emails vérifiés. Prospection IA. Tout-en-un.
          </p>
          <div className="animate-fade-in-up animate-delay-300 mt-10 flex items-center justify-center gap-4">
            <Link href="/signup" className="animate-pulse-glow bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-8 py-3.5 rounded-xl font-medium transition-all duration-200 text-base">
              Essai gratuit — 10 leads offerts
            </Link>
            <Link href="#demo" className="border border-gray-700/50 hover:border-gray-600 px-8 py-3.5 rounded-xl text-gray-300 transition-all duration-200 hover:bg-gray-900/50 text-base">
              Voir la démo
            </Link>
          </div>
          <p className="animate-fade-in-up animate-delay-400 text-xs text-gray-600 mt-5">Pas de carte bancaire requise</p>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-3">Comment ça marche</h2>
        <p className="text-gray-500 text-center mb-12">4 étapes simples pour générer des leads qualifiés</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[
            { step: "1", title: "Recherchez", desc: "Entrez un secteur, une ville et un pays. Notre IA cherche partout." },
            { step: "2", title: "Scrapez", desc: "On visite chaque site, extrait emails, téléphones, réseaux sociaux." },
            { step: "3", title: "Vérifiez", desc: "Chaque email est vérifié (MX records). Zéro bounce garanti." },
            { step: "4", title: "Prospectez", desc: "Lancez une campagne email IA personnalisée. Obtenez des réponses." },
          ].map((item) => (
            <div key={item.step} className="group gradient-border bg-gray-900/50 rounded-xl p-6 text-center hover:bg-gray-900 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 font-bold mx-auto mb-4 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-3">{INDUSTRIES.length}+ secteurs couverts</h2>
        <p className="text-gray-500 text-center mb-8">Trouvez des leads dans n&apos;importe quel domaine</p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {INDUSTRIES.map((ind) => (
            <span key={ind.id} className="bg-gray-900/60 border border-gray-800/60 px-4 py-2 rounded-full text-sm text-gray-400 hover:text-gray-200 hover:border-gray-700 transition-all duration-200 cursor-default">
              {ind.icon} {ind.name}
            </span>
          ))}
        </div>
      </section>

      {/* Countries */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-3">{countries.length} pays supportés</h2>
        <p className="text-gray-500 text-center mb-8">Recherches localisées avec les bons moteurs et annuaires</p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {countries.map((c) => (
            <span key={c.code} className="bg-gray-900/60 border border-gray-800/60 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-gray-200 hover:border-gray-700 transition-all duration-200 cursor-default">
              {c.name}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-3">Tout ce dont vous avez besoin</h2>
        <p className="text-gray-500 text-center mb-12">Des outils puissants pour automatiser votre prospection</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", title: "Scraping intelligent", desc: "5 méthodes d'extraction combinées : schema.org, cartes équipe, mentions légales, patterns textuels, microformats." },
            { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "Devinette d'emails", desc: "10 patterns d'emails testés et vérifiés. jean.dupont@, j.dupont@, jdupont@... On trouve le bon." },
            { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Emails IA (Claude)", desc: "Chaque email de prospection est personnalisé par IA. Pas de templates génériques." },
            { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Campagnes multi-étapes", desc: "Séquences automatiques : email + relance J+3 + relance J+7. Arrêt auto si réponse." },
            { icon: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "Export CSV / JSON", desc: "Exportez vos leads en un clic. Compatible Excel, Google Sheets, et tous les CRM." },
            { icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4", title: "Intégrations CRM", desc: "HubSpot, Pipedrive, Salesforce, Brevo, Zapier. Synchronisation automatique." },
          ].map((feature) => (
            <div key={feature.title} className="group gradient-border bg-gray-900/50 rounded-xl p-6 hover:bg-gray-900 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors duration-300">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-3">Pricing simple et transparent</h2>
        <p className="text-gray-500 text-center mb-12">Commencez gratuitement. Upgradez quand vous grandissez.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "gradient-border bg-indigo-900/10 glow-indigo"
                  : "border border-gray-800/60 bg-gray-900/50 hover:border-gray-700/60"
              }`}
            >
              {plan.popular && (
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-purple-600 px-2.5 py-1 rounded-full">
                  Populaire
                </span>
              )}
              <h3 className="text-lg font-bold mt-3">{plan.name}</h3>
              <p className="text-4xl font-bold mt-2 tracking-tight">
                {plan.price === 0 ? "0\u20AC" : formatPrice(plan.price)}
                <span className="text-sm text-gray-500 font-normal">/mois</span>
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-gray-400">
                <PricingFeature included>{plan.features.leadsPerMonth} leads/mois</PricingFeature>
                <PricingFeature included>{plan.features.contactsPerMonth} contacts/mois</PricingFeature>
                <PricingFeature included>{plan.features.emailVerifications} vérifications</PricingFeature>
                <PricingFeature included>{plan.features.aiEmails} emails IA</PricingFeature>
                <PricingFeature included={plan.features.campaigns > 0}>
                  {plan.features.campaigns === -1 ? "Campagnes illimitées" : plan.features.campaigns > 0 ? `${plan.features.campaigns} campagnes` : "Pas de campagnes"}
                </PricingFeature>
                <PricingFeature included>{plan.features.countries === -1 ? "Tous les pays" : `${plan.features.countries} pays`}</PricingFeature>
              </ul>
              <Link
                href="/signup"
                className={`block text-center mt-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  plan.popular
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {plan.price === 0 ? "Commencer gratuitement" : "Essai gratuit"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Prêt à trouver vos prochains clients ?</h2>
          <p className="text-lg text-gray-400 mt-4">10 leads gratuits. Aucune carte bancaire.</p>
          <Link
            href="/signup"
            className="inline-block mt-8 animate-pulse-glow bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-10 py-4 rounded-xl text-lg font-medium transition-all duration-200"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[8px] font-bold">
              L
            </div>
            <p>LeadGen AI &mdash; Machine à leads</p>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-gray-400 transition-colors cursor-pointer">Mentions légales</span>
            <span className="hover:text-gray-400 transition-colors cursor-pointer">Politique de confidentialité</span>
            <span className="hover:text-gray-400 transition-colors cursor-pointer">CGV</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PricingFeature({ included, children }: { included: boolean; children: React.ReactNode }) {
  return (
    <li className={`flex items-center gap-2 ${included ? "text-gray-300" : "text-gray-600"}`}>
      {included ? (
        <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-gray-700 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {children}
    </li>
  );
}
