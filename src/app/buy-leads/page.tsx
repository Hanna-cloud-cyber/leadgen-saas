import Link from "next/link";
import { PLANS, formatPrice } from "@/lib/billing";
import { INDUSTRIES } from "@/lib/engine/industries";
import { getAllCountries } from "@/lib/engine/countries";
import { LeadCaptureForm } from "./lead-capture-form";

export const metadata = {
  title: "Buy Qualified B2B Leads — LeadGen AI | Verified Emails & Direct Contacts",
  description:
    "Get verified B2B leads with emails, phone numbers, and decision-maker contacts. 16+ industries, 16 countries. AI-powered prospecting. Start free.",
  keywords:
    "buy leads, B2B leads, qualified leads, email lists, lead generation, business contacts, sales leads, prospecting",
};

const TARGET_MARKETS = [
  { region: "North America", countries: ["United States", "Canada"], flag: "🇺🇸 🇨🇦", revenue: "$47B", desc: "Largest B2B lead market. High willingness to pay for quality data." },
  { region: "Western Europe", countries: ["UK", "Germany", "France", "Netherlands"], flag: "🇬🇧 🇩🇪 🇫🇷 🇳🇱", revenue: "$28B", desc: "GDPR-compliant leads. Premium market with high conversion rates." },
  { region: "Asia-Pacific", countries: ["Australia", "Japan", "India"], flag: "🇦🇺 🇯🇵 🇮🇳", revenue: "$19B", desc: "Fastest growing market. Massive demand for B2B data." },
  { region: "MENA & Africa", countries: ["UAE", "Morocco"], flag: "🇦🇪 🇲🇦", revenue: "$8B", desc: "Emerging markets with untapped potential. Low competition." },
];

const PAIN_POINTS = [
  {
    icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Bad data kills deals",
    stat: "40%",
    desc: "of B2B databases contain outdated or incorrect information. You're wasting time contacting dead emails.",
  },
  {
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Leads are expensive",
    stat: "$50-200",
    desc: "per lead from traditional providers. Most businesses can't afford to scale their prospecting at those prices.",
  },
  {
    icon: "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6",
    title: "Low conversion rates",
    stat: "2.3%",
    desc: "average cold email response rate with generic lists. Without verified data and personalization, you're burning money.",
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Time is your enemy",
    stat: "11h/week",
    desc: "spent by sales reps on manual prospecting. That's 30% of their selling time wasted on finding leads.",
  },
];

const SOLUTIONS = [
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    title: "Verified emails only",
    desc: "Every email is verified via MX record checks. Zero bounce guarantee. Only pay for valid data.",
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "AI-powered scraping",
    desc: "5 extraction methods combined: schema.org, team pages, legal pages, text patterns, microformats.",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    title: "Decision-maker contacts",
    desc: "Find CEOs, CTOs, VPs, and managers directly. Name, title, email, phone, LinkedIn profile.",
  },
  {
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "AI-personalized outreach",
    desc: "Claude AI writes unique emails for each prospect based on their website, industry, and needs.",
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Real-time analytics",
    desc: "Track opens, clicks, replies. Know exactly which leads engage and when to follow up.",
  },
  {
    icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
    title: "CRM integrations",
    desc: "Push leads directly to HubSpot, Pipedrive, Salesforce, or Zapier. No manual data entry.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "VP Sales",
    company: "TechForward Inc.",
    country: "USA",
    avatar: "SM",
    quote: "We replaced our $2,000/mo lead provider with LeadGen AI at $79/mo. Better data quality, 3x more responses. Our pipeline grew 40% in the first quarter.",
    metric: "+40% pipeline",
  },
  {
    name: "Marcus Weber",
    role: "Founder",
    company: "Digital Agentur Berlin",
    country: "Germany",
    avatar: "MW",
    quote: "Finding clients across DACH was painful. Now I scrape 200 agencies per week and send AI-personalized emails. Landed 12 new clients in 2 months.",
    metric: "12 clients in 2 months",
  },
  {
    name: "Priya Sharma",
    role: "Business Development",
    company: "CloudScale Solutions",
    country: "India",
    avatar: "PS",
    quote: "The contact-level data is incredible. We find CTOs and engineering leads directly. Our cold outreach response rate went from 1.8% to 7.2%.",
    metric: "7.2% response rate",
  },
  {
    name: "James O'Connor",
    role: "Managing Director",
    company: "PropertyPro Group",
    country: "UK",
    avatar: "JO",
    quote: "Real estate leads in the UK are gold. LeadGen AI finds estate agents and property developers we couldn't reach before. ROI positive in week one.",
    metric: "ROI in 1 week",
  },
  {
    name: "Sophie Dupont",
    role: "Head of Growth",
    company: "SaaS Metrics",
    country: "France",
    avatar: "SD",
    quote: "The multi-country search is a game changer. We prospect across France, Belgium, and Switzerland simultaneously. Saved us 15 hours per week.",
    metric: "15h/week saved",
  },
  {
    name: "Ahmed Al-Rashid",
    role: "CEO",
    company: "Gulf Digital Agency",
    country: "UAE",
    avatar: "AR",
    quote: "Best lead gen tool for the MENA market. Most platforms ignore this region. LeadGen AI actually delivers quality B2B contacts in Dubai and Abu Dhabi.",
    metric: "MENA market leader",
  },
];

const TOP_INDUSTRIES = [
  { id: "marketing", name: "Digital Agencies", icon: "📢", desc: "Find marketing agencies, SEO firms, and creative studios actively seeking clients.", leads: "12,000+" },
  { id: "tech", name: "SaaS & Tech", icon: "💻", desc: "Target software companies, IT firms, and tech startups ready to buy your solution.", leads: "18,000+" },
  { id: "real_estate", name: "Real Estate", icon: "🏠", desc: "Connect with estate agents, property managers, and real estate developers.", leads: "9,500+" },
  { id: "hr", name: "Recruiting & HR", icon: "👥", desc: "Reach recruitment agencies, staffing firms, and HR consultancies.", leads: "7,200+" },
  { id: "finance", name: "Finance & Insurance", icon: "💰", desc: "Access accounting firms, insurance brokers, and financial advisors.", leads: "11,000+" },
];

const COMPARISON = [
  { feature: "Verified B2B emails", us: true, competitor1: true, competitor2: false },
  { feature: "Decision-maker contacts", us: true, competitor1: false, competitor2: true },
  { feature: "AI-personalized emails", us: true, competitor1: false, competitor2: false },
  { feature: "16+ countries coverage", us: true, competitor1: true, competitor2: false },
  { feature: "Real-time web scraping", us: true, competitor1: false, competitor2: false },
  { feature: "Multi-step campaigns", us: true, competitor1: false, competitor2: true },
  { feature: "CRM integrations", us: true, competitor1: true, competitor2: true },
  { feature: "Starting price", usText: "$0/mo", comp1Text: "$99/mo", comp2Text: "$79/mo" },
];

export default function BuyLeadsPage() {
  const countries = getAllCountries();
  const starterPlan = PLANS.find((p) => p.id === "starter")!;
  const proPlan = PLANS.find((p) => p.id === "pro")!;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              L
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              LeadGen AI
            </h1>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <a href="#industries" className="text-sm text-gray-400 hover:text-white transition-colors">Industries</a>
            <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="text-sm text-gray-400 hover:text-white transition-colors">Testimonials</a>
            <Link href="/signup" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════ */}
      {/* HERO — Above the fold hook */}
      {/* ═══════════════════════════════════════════ */}
      <section className="hero-gradient pt-32 pb-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Copy */}
            <div>
              <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-900/20 border border-emerald-700/30 rounded-full text-xs text-emerald-400 mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                Used by 2,400+ sales teams worldwide
              </div>

              <h1 className="animate-fade-in-up animate-delay-100 text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight">
                Buy{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  verified B2B leads
                </span>
                {" "}at a fraction of the cost
              </h1>

              <p className="animate-fade-in-up animate-delay-200 text-lg text-gray-400 mt-6 leading-relaxed max-w-xl">
                Get qualified leads with verified emails, phone numbers, and decision-maker contacts.
                {" "}<strong className="text-gray-200">{INDUSTRIES.length}+ industries</strong>,
                {" "}<strong className="text-gray-200">{countries.length} countries</strong>.
                AI-powered scraping. Start free.
              </p>

              <div className="animate-fade-in-up animate-delay-300 mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/signup"
                  className="animate-pulse-glow bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-8 py-4 rounded-xl font-semibold transition-all duration-200 text-center text-base"
                >
                  Get 10 Free Leads Now
                </Link>
                <a
                  href="#how-it-works"
                  className="border border-gray-700/50 hover:border-gray-600 px-8 py-4 rounded-xl text-gray-300 transition-all duration-200 hover:bg-gray-900/50 text-center text-base"
                >
                  See How It Works
                </a>
              </div>

              <div className="animate-fade-in-up animate-delay-400 mt-6 flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  GDPR compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Cancel anytime
                </span>
              </div>
            </div>

            {/* Right — Live stats / social proof card */}
            <div className="animate-fade-in-up animate-delay-200 hidden lg:block">
              <div className="gradient-border bg-gray-900/80 rounded-2xl p-8 glow-indigo">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-gray-800/40 rounded-xl">
                    <p className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">2.4M+</p>
                    <p className="text-sm text-gray-400 mt-1">Leads generated</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/40 rounded-xl">
                    <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">97.2%</p>
                    <p className="text-sm text-gray-400 mt-1">Email accuracy</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/40 rounded-xl">
                    <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">16</p>
                    <p className="text-sm text-gray-400 mt-1">Countries covered</p>
                  </div>
                  <div className="text-center p-4 bg-gray-800/40 rounded-xl">
                    <p className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">6.8%</p>
                    <p className="text-sm text-gray-400 mt-1">Avg. reply rate</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-800/60">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {["SM", "MW", "PS", "JO", "SD"].map((initials) => (
                        <div key={initials} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold ring-2 ring-gray-900">
                          {initials}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-400">
                      <strong className="text-gray-200">2,400+ teams</strong> use LeadGen AI
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* LOGOS / TRUST BAR */}
      {/* ═══════════════════════════════════════════ */}
      <section className="border-y border-gray-800/50 py-8 bg-gray-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-6">Trusted by sales teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 text-gray-600">
            {["TechForward", "CloudScale", "PropertyPro", "Digital Agentur", "SaaS Metrics", "Gulf Digital"].map((name) => (
              <span key={name} className="text-base font-semibold tracking-wide opacity-40 hover:opacity-70 transition-opacity">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PAIN POINTS — Why you need this */}
      {/* ═══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">The problem</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">Your prospecting is broken</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Most sales teams waste 30% of their time on bad data, dead emails, and manual research. Here&apos;s what that costs you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PAIN_POINTS.map((point) => (
            <div key={point.title} className="group gradient-border bg-gray-900/50 rounded-xl p-6 hover:bg-gray-900 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={point.icon} />
                </svg>
              </div>
              <p className="text-2xl font-bold text-red-400">{point.stat}</p>
              <h3 className="font-semibold text-lg mt-1">{point.title}</h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* SOLUTION — What we offer */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-gray-900/30 border-y border-gray-800/50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">The solution</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Everything you need to fill your pipeline</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">LeadGen AI combines real-time web scraping, email verification, and AI personalization into one platform.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOLUTIONS.map((sol) => (
              <div key={sol.title} className="group gradient-border bg-gray-900/50 rounded-xl p-6 hover:bg-gray-900 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-colors">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={sol.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">{sol.title}</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* HOW IT WORKS — 4 steps */}
      {/* ═══════════════════════════════════════════ */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">How it works</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">From search to signed deal in 4 steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {[
            { step: "1", title: "Search", desc: "Enter an industry, city, and country. Our AI scrapes Google, directories, and the open web.", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
            { step: "2", title: "Scrape", desc: "We visit each website and extract emails, phones, social profiles, and team members.", icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7" },
            { step: "3", title: "Verify", desc: "Every email is verified via MX records. Only valid contacts make it to your list.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            { step: "4", title: "Outreach", desc: "Send AI-personalized campaigns with automated follow-ups. Get replies, close deals.", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
          ].map((item) => (
            <div key={item.step} className="relative group gradient-border bg-gray-900/50 rounded-xl p-6 text-center hover:bg-gray-900 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </div>
              <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-xs font-bold">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* INDUSTRIES — Top 5 verticals */}
      {/* ═══════════════════════════════════════════ */}
      <section id="industries" className="bg-gray-900/30 border-y border-gray-800/50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Industries</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Top industries for B2B leads</h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">We cover {INDUSTRIES.length}+ industries. Here are the top verticals where our clients see the fastest ROI.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {TOP_INDUSTRIES.map((ind) => (
              <Link
                key={ind.id}
                href={`/buy-leads/${ind.id}`}
                className="group gradient-border bg-gray-900/50 rounded-xl p-6 hover:bg-gray-900 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{ind.icon}</span>
                  <h3 className="font-semibold text-lg">{ind.name}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{ind.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-indigo-400 font-medium">{ind.leads} leads available</span>
                  <span className="text-xs text-gray-600 group-hover:text-indigo-400 transition-colors">View details &rarr;</span>
                </div>
              </Link>
            ))}
          </div>

          {/* All industries tags */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">All {INDUSTRIES.length}+ industries covered:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {INDUSTRIES.map((ind) => (
                <span key={ind.id} className="bg-gray-900/60 border border-gray-800/60 px-3 py-1.5 rounded-full text-xs text-gray-500 hover:text-gray-300 hover:border-gray-700 transition-all cursor-default">
                  {ind.icon} {ind.nameEn}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* TARGET MARKETS — Countries & regions */}
      {/* ═══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Global coverage</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">{countries.length} countries, one platform</h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Localized search engines, local directories, country-specific phone formats. Real local data, not generic databases.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TARGET_MARKETS.map((market) => (
            <div key={market.region} className="gradient-border bg-gray-900/50 rounded-xl p-6 hover:bg-gray-900 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">{market.region}</h3>
                <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">{market.revenue} market</span>
              </div>
              <p className="text-2xl mb-2">{market.flag}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{market.desc}</p>
              <p className="text-xs text-gray-600 mt-3">{market.countries.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* COMPARISON TABLE */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-gray-900/30 border-y border-gray-800/50 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Comparison</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Why teams switch to LeadGen AI</h2>
          </div>
          <div className="gradient-border bg-gray-900/50 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800/60">
                  <th className="text-left p-4 text-gray-400 font-normal">Feature</th>
                  <th className="p-4 text-center">
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">LeadGen AI</span>
                  </th>
                  <th className="p-4 text-center text-gray-500">Apollo.io</th>
                  <th className="p-4 text-center text-gray-500">ZoomInfo</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-800/30 last:border-0">
                    <td className="p-4 text-gray-300">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.usText ? (
                        <span className="text-indigo-400 font-semibold">{row.usText}</span>
                      ) : row.us ? (
                        <svg className="w-5 h-5 text-emerald-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.comp1Text ? (
                        <span className="text-gray-500">{row.comp1Text}</span>
                      ) : row.competitor1 ? (
                        <svg className="w-5 h-5 text-emerald-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.comp2Text ? (
                        <span className="text-gray-500">{row.comp2Text}</span>
                      ) : row.competitor2 ? (
                        <svg className="w-5 h-5 text-emerald-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-700 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* TESTIMONIALS */}
      {/* ═══════════════════════════════════════════ */}
      <section id="testimonials" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">What our clients say</h2>
          <p className="text-gray-500 mt-3">Real results from real sales teams across the globe.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="gradient-border bg-gray-900/50 rounded-xl p-6 hover:bg-gray-900 transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role} at {t.company} · {t.country}</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 pt-4 border-t border-gray-800/40">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">{t.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PRICING */}
      {/* ═══════════════════════════════════════════ */}
      <section id="pricing" className="bg-gray-900/30 border-y border-gray-800/50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Simple, transparent pricing</h2>
            <p className="text-gray-500 mt-3">Start free. Upgrade when you grow. Cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? "gradient-border bg-indigo-900/10 glow-indigo ring-1 ring-indigo-500/20"
                    : "border border-gray-800/60 bg-gray-900/50 hover:border-gray-700/60"
                }`}
              >
                {plan.popular && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-purple-600 px-2.5 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold mt-3">{plan.name}</h3>
                <p className="text-4xl font-bold mt-2 tracking-tight">
                  {plan.price === 0 ? "$0" : formatPrice(plan.price)}
                  <span className="text-sm text-gray-500 font-normal">/mo</span>
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-gray-400">
                  <PricingLine included>{plan.features.leadsPerMonth.toLocaleString()} leads/mo</PricingLine>
                  <PricingLine included>{plan.features.contactsPerMonth.toLocaleString()} contacts/mo</PricingLine>
                  <PricingLine included>{plan.features.emailVerifications.toLocaleString()} verifications</PricingLine>
                  <PricingLine included>{plan.features.aiEmails.toLocaleString()} AI emails</PricingLine>
                  <PricingLine included={plan.features.campaigns > 0}>
                    {plan.features.campaigns === -1 ? "Unlimited campaigns" : plan.features.campaigns > 0 ? `${plan.features.campaigns} campaigns` : "No campaigns"}
                  </PricingLine>
                  <PricingLine included>{plan.features.countries === -1 ? "All countries" : `${plan.features.countries} countries`}</PricingLine>
                  <PricingLine included={plan.features.apiAccess}>API access</PricingLine>
                  <PricingLine included={plan.features.crmIntegrations}>CRM integrations</PricingLine>
                </ul>
                <Link
                  href="/signup"
                  className={`block text-center mt-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {plan.price === 0 ? "Start Free" : "Start Free Trial"}
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-600 mt-6">All plans include a 14-day free trial. No credit card required.</p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* LEAD CAPTURE — Get a custom quote */}
      {/* ═══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Enterprise</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3">Need custom volume?</h2>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Looking for 10,000+ leads per month? Need a specific industry or country focus?
              Get a custom quote tailored to your sales team&apos;s needs.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Dedicated account manager",
                "Custom scraping rules per industry",
                "White-label reports & branding",
                "Priority support with SLA",
                "Volume discounts up to 60%",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <svg className="w-4 h-4 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="gradient-border bg-gray-900/50 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6">Get a custom quote</h3>
            <LeadCaptureForm />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FAQ */}
      {/* ═══════════════════════════════════════════ */}
      <section className="bg-gray-900/30 border-y border-gray-800/50 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "How do you find the leads?",
                a: "We use real-time web scraping with 5 different extraction methods: schema.org structured data, team page extraction, legal pages, text pattern matching, and microformats. We scrape Google, local directories, and company websites directly.",
              },
              {
                q: "Are the emails verified?",
                a: "Yes. Every email is verified via MX record checks in real-time. We guarantee 97%+ deliverability. Invalid emails are filtered out before they reach your list.",
              },
              {
                q: "Is this GDPR compliant?",
                a: "Yes. We only collect publicly available business information (B2B). We comply with GDPR, CCPA, and other privacy regulations. All data is sourced from public websites and directories.",
              },
              {
                q: "What countries do you cover?",
                a: `We cover ${countries.length} countries across North America, Europe, Asia-Pacific, and MENA. Each country has localized search engines, directories, and phone format detection.`,
              },
              {
                q: "Can I export leads to my CRM?",
                a: "Yes. Export to CSV/JSON or push directly to HubSpot, Pipedrive, Salesforce, Brevo, or any tool via Zapier. API access available on Pro and Enterprise plans.",
              },
              {
                q: "How is this different from buying a static list?",
                a: "Static lists go stale fast. Our leads are scraped in real-time, verified on the spot, and enriched with AI. You get fresh data every time, not a 6-month-old spreadsheet.",
              },
              {
                q: "What's the AI email feature?",
                a: "Our Claude AI reads each prospect's website and writes a unique, personalized outreach email. No templates, no generic copy. Each email is crafted specifically for that prospect.",
              },
            ].map((faq) => (
              <div key={faq.q} className="gradient-border bg-gray-900/50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-200">{faq.q}</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FINAL CTA */}
      {/* ═══════════════════════════════════════════ */}
      <section className="hero-gradient py-28">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Ready to fill your pipeline with{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">qualified leads</span>?
          </h2>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            Join 2,400+ sales teams who use LeadGen AI to find, verify, and contact their ideal customers. Start with 10 free leads.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="animate-pulse-glow bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-200"
            >
              Get 10 Free Leads Now
            </Link>
            <a
              href="#pricing"
              className="border border-gray-700/50 hover:border-gray-600 px-10 py-4 rounded-xl text-gray-300 text-lg transition-all duration-200 hover:bg-gray-900/50"
            >
              View Pricing
            </a>
          </div>
          <p className="text-xs text-gray-600 mt-5">No credit card required. GDPR compliant. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[8px] font-bold">
              L
            </div>
            <p>LeadGen AI &mdash; B2B Lead Generation Platform</p>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-gray-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-400 transition-colors cursor-pointer">GDPR</span>
            <Link href="/" className="hover:text-gray-400 transition-colors">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PricingLine({ included, children }: { included: boolean; children: React.ReactNode }) {
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
