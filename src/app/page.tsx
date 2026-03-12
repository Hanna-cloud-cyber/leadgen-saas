import Link from "next/link";
import { PLANS, formatPrice } from "@/lib/billing";
import { INDUSTRIES } from "@/lib/engine/industries";
import { getAllCountries } from "@/lib/engine/countries";

export default function Home() {
  const countries = getAllCountries();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            LeadGen AI
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">Connexion</Link>
            <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Commencer gratuitement
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-block px-3 py-1 bg-indigo-900/30 border border-indigo-800 rounded-full text-xs text-indigo-400 mb-6">
          Trouvez des clients partout dans le monde
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto">
          Générez des leads qualifiés
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"> automatiquement</span>
        </h1>
        <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto">
          Scrapez des milliers d&apos;entreprises et contacts dans {countries.length} pays.
          Emails vérifiés. Prospection IA. Tout-en-un.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/leads" className="bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-lg font-medium transition-colors">
            Essai gratuit — 10 leads offerts
          </Link>
          <Link href="#demo" className="border border-gray-700 hover:border-gray-600 px-8 py-3 rounded-lg text-gray-300 transition-colors">
            Voir la démo
          </Link>
        </div>
        <p className="text-xs text-gray-600 mt-4">Pas de carte bancaire requise</p>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Recherchez", desc: "Entrez un secteur, une ville et un pays. Notre IA cherche partout." },
            { step: "2", title: "Scrapez", desc: "On visite chaque site, extrait emails, téléphones, réseaux sociaux." },
            { step: "3", title: "Vérifiez", desc: "Chaque email est vérifié (MX records). Zéro bounce garanti." },
            { step: "4", title: "Prospectez", desc: "Lancez une campagne email IA personnalisée. Obtenez des réponses." },
          ].map((item) => (
            <div key={item.step} className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center text-indigo-400 font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-400 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">{INDUSTRIES.length}+ secteurs couverts</h2>
        <p className="text-gray-400 text-center mb-8">Trouvez des leads dans n&apos;importe quel domaine</p>
        <div className="flex flex-wrap justify-center gap-3">
          {INDUSTRIES.map((ind) => (
            <span key={ind.id} className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-full text-sm text-gray-300">
              {ind.icon} {ind.name}
            </span>
          ))}
        </div>
      </section>

      {/* Countries */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">{countries.length} pays supportés</h2>
        <p className="text-gray-400 text-center mb-8">Recherches localisées avec les bons moteurs et annuaires</p>
        <div className="flex flex-wrap justify-center gap-3">
          {countries.map((c) => (
            <span key={c.code} className="bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-sm text-gray-300">
              {c.name}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Tout ce dont vous avez besoin</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Scraping intelligent", desc: "5 méthodes d'extraction combinées : schema.org, cartes équipe, mentions légales, patterns textuels, microformats." },
            { title: "Devinette d'emails", desc: "10 patterns d'emails testés et vérifiés. jean.dupont@, j.dupont@, jdupont@... On trouve le bon." },
            { title: "Emails IA (Claude)", desc: "Chaque email de prospection est personnalisé par IA. Pas de templates génériques." },
            { title: "Campagnes multi-étapes", desc: "Séquences automatiques : email + relance J+3 + relance J+7. Arrêt auto si réponse." },
            { title: "Export CSV / JSON", desc: "Exportez vos leads en un clic. Compatible Excel, Google Sheets, et tous les CRM." },
            { title: "Intégrations CRM", desc: "HubSpot, Pipedrive, Salesforce, Brevo, Zapier. Synchronisation automatique." },
          ].map((feature) => (
            <div key={feature.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm text-gray-400 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Pricing simple et transparent</h2>
        <p className="text-gray-400 text-center mb-12">Commencez gratuitement. Upgradez quand vous grandissez.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl p-6 border ${
                plan.popular ? "border-indigo-500 bg-indigo-900/10" : "border-gray-800 bg-gray-900"
              }`}
            >
              {plan.popular && <span className="text-xs bg-indigo-600 px-2 py-0.5 rounded-full">Populaire</span>}
              <h3 className="text-lg font-bold mt-2">{plan.name}</h3>
              <p className="text-3xl font-bold mt-2">
                {plan.price === 0 ? "0\u20AC" : formatPrice(plan.price)}
                <span className="text-sm text-gray-400 font-normal">/mois</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                <li>{plan.features.leadsPerMonth} leads/mois</li>
                <li>{plan.features.contactsPerMonth} contacts/mois</li>
                <li>{plan.features.emailVerifications} vérifications</li>
                <li>{plan.features.aiEmails} emails IA</li>
                <li>{plan.features.countries === -1 ? "Tous les pays" : `${plan.features.countries} pays`}</li>
              </ul>
              <Link
                href="/leads"
                className={`block text-center mt-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  plan.popular ? "bg-indigo-600 hover:bg-indigo-500" : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {plan.price === 0 ? "Commencer gratuitement" : "Essai gratuit"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold">Prêt à trouver vos prochains clients ?</h2>
        <p className="text-xl text-gray-400 mt-4">10 leads gratuits. Aucune carte bancaire.</p>
        <Link
          href="/leads"
          className="inline-block mt-8 bg-indigo-600 hover:bg-indigo-500 px-10 py-4 rounded-lg text-lg font-medium transition-colors"
        >
          Commencer maintenant
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-500">
          <p>LeadGen AI &mdash; Machine à leads</p>
          <div className="flex gap-4">
            <span>Mentions légales</span>
            <span>Politique de confidentialité</span>
            <span>CGV</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
