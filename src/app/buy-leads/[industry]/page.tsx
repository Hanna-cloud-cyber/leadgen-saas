import Link from "next/link";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustry } from "@/lib/engine/industries";
import { getAllCountries } from "@/lib/engine/countries";
import { PLANS, formatPrice } from "@/lib/billing";

const INDUSTRY_DATA: Record<string, {
  headline: string;
  subheadline: string;
  painPoints: string[];
  useCases: string[];
  avgLeads: string;
  avgResponseRate: string;
  topCountries: string[];
  testimonial: { name: string; role: string; company: string; country: string; quote: string; metric: string };
}> = {
  marketing: {
    headline: "Find marketing agencies & digital studios ready to buy",
    subheadline: "Access 12,000+ verified marketing agency leads across 16 countries. Get emails, phone numbers, and decision-maker contacts for SEO firms, social media agencies, PR firms, and creative studios.",
    painPoints: [
      "Hard to find agency owners — they hide behind branded emails",
      "Generic lists mix freelancers with real agencies",
      "Most directories are pay-to-play and outdated",
    ],
    useCases: [
      "Sell SaaS tools to agencies (analytics, reporting, project management)",
      "Offer white-label services (SEO, content, web development)",
      "Recruit agency talent or partner for referrals",
      "Sell media, advertising, or sponsorship packages",
    ],
    avgLeads: "12,000+",
    avgResponseRate: "7.4%",
    topCountries: ["USA", "UK", "Germany", "France", "Australia"],
    testimonial: {
      name: "Marcus Weber",
      role: "Founder",
      company: "Digital Agentur Berlin",
      country: "Germany",
      quote: "We sell white-label SEO to other agencies. LeadGen AI found 800+ agencies in DACH that we couldn't reach before. Closed 12 deals in 2 months.",
      metric: "12 deals in 2 months",
    },
  },
  tech: {
    headline: "Target SaaS companies, IT firms & tech startups",
    subheadline: "Access 18,000+ verified tech company leads. Find CTOs, VPs of Engineering, and product managers at software companies, cloud providers, and digital agencies.",
    painPoints: [
      "Tech companies have strong spam filters — you need verified emails",
      "Decision-makers change roles fast — stale data is useless",
      "Hard to distinguish between companies of different sizes",
    ],
    useCases: [
      "Sell developer tools, APIs, or infrastructure services",
      "Offer consulting, staffing, or outsourcing services",
      "Partner with complementary SaaS products",
      "Recruit engineering talent from competitor companies",
    ],
    avgLeads: "18,000+",
    avgResponseRate: "6.2%",
    topCountries: ["USA", "UK", "Germany", "India", "Canada"],
    testimonial: {
      name: "Priya Sharma",
      role: "Business Development",
      company: "CloudScale Solutions",
      country: "India",
      quote: "The contact-level data is incredible. We find CTOs and engineering leads directly. Our cold outreach response rate went from 1.8% to 7.2%.",
      metric: "7.2% response rate",
    },
  },
  real_estate: {
    headline: "Connect with estate agents & property developers",
    subheadline: "Access 9,500+ verified real estate leads. Find estate agents, property managers, developers, and mortgage brokers with direct contact details.",
    painPoints: [
      "Real estate is hyper-local — you need country-specific data",
      "Agents are hard to reach by email — most use generic info@ addresses",
      "Property developer contacts are rarely in public directories",
    ],
    useCases: [
      "Sell PropTech software (CRM, virtual tours, listing management)",
      "Offer photography, staging, or renovation services",
      "Partner for mortgage referrals or insurance cross-selling",
      "Sell marketing services tailored to real estate",
    ],
    avgLeads: "9,500+",
    avgResponseRate: "8.1%",
    topCountries: ["USA", "UK", "France", "Australia", "UAE"],
    testimonial: {
      name: "James O'Connor",
      role: "Managing Director",
      company: "PropertyPro Group",
      country: "UK",
      quote: "Real estate leads in the UK are gold. LeadGen AI finds estate agents and property developers we couldn't reach before. ROI positive in week one.",
      metric: "ROI in 1 week",
    },
  },
  hr: {
    headline: "Reach recruitment agencies & HR consultancies",
    subheadline: "Access 7,200+ verified HR and recruitment leads. Find agency owners, headhunters, and HR directors at staffing firms and corporate HR departments.",
    painPoints: [
      "Recruitment is fragmented — thousands of small agencies",
      "HR directors are protected by gatekeepers",
      "Temp staffing firms are rarely listed in standard B2B databases",
    ],
    useCases: [
      "Sell ATS software, job boards, or HR tech platforms",
      "Offer payroll, benefits, or compliance services",
      "Partner for candidate sourcing or RPO arrangements",
      "Cross-sell training, assessments, or background checks",
    ],
    avgLeads: "7,200+",
    avgResponseRate: "6.9%",
    topCountries: ["USA", "UK", "Germany", "France", "Netherlands"],
    testimonial: {
      name: "Sophie Dupont",
      role: "Head of Growth",
      company: "SaaS Metrics",
      country: "France",
      quote: "We prospect recruitment agencies across France, Belgium, and Switzerland simultaneously. Saved us 15 hours per week on manual research.",
      metric: "15h/week saved",
    },
  },
  finance: {
    headline: "Access accounting firms & financial advisors",
    subheadline: "Access 11,000+ verified finance leads. Find accountants, insurance brokers, financial planners, and wealth managers with direct contact information.",
    painPoints: [
      "Finance professionals are conservative — generic outreach fails",
      "Compliance-heavy industry — you need accurate, legitimate data",
      "Many firms are small practices with no online presence",
    ],
    useCases: [
      "Sell accounting software, compliance tools, or fintech platforms",
      "Offer IT services, cybersecurity, or cloud migration",
      "Partner for client referrals or co-marketing",
      "Sell insurance products or investment platforms to advisors",
    ],
    avgLeads: "11,000+",
    avgResponseRate: "5.8%",
    topCountries: ["USA", "UK", "Germany", "Switzerland", "Canada"],
    testimonial: {
      name: "Sarah Mitchell",
      role: "VP Sales",
      company: "TechForward Inc.",
      country: "USA",
      quote: "We sell compliance software to accounting firms. LeadGen AI replaced our $2,000/mo lead provider. Better data quality, 3x more responses.",
      metric: "+40% pipeline",
    },
  },
};

export function generateStaticParams() {
  return Object.keys(INDUSTRY_DATA).map((industry) => ({ industry }));
}

export function generateMetadata({ params }: { params: Promise<{ industry: string }> }) {
  // We need to handle this synchronously for metadata
  return {
    title: "Buy B2B Leads — LeadGen AI",
    description: "Get verified B2B leads with emails, phone numbers, and decision-maker contacts.",
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: industryId } = await params;
  const data = INDUSTRY_DATA[industryId];
  const industry = getIndustry(industryId);

  if (!data || !industry) {
    notFound();
  }

  const countries = getAllCountries();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3.5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">L</div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">LeadGen AI</h1>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/buy-leads" className="text-sm text-gray-400 hover:text-white transition-colors">&larr; All Industries</Link>
            <Link href="/signup" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-900/20 border border-indigo-700/30 rounded-full text-xs text-indigo-400 mb-6 backdrop-blur-sm">
              <span className="text-lg">{industry.icon}</span>
              {industry.nameEn} Leads
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">{data.headline}</h1>
            <p className="text-lg text-gray-400 mt-6 leading-relaxed">{data.subheadline}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/signup"
                className="animate-pulse-glow bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-8 py-4 rounded-xl font-semibold transition-all duration-200 text-center"
              >
                Get 10 Free {industry.nameEn} Leads
              </Link>
              <Link
                href="/buy-leads#pricing"
                className="border border-gray-700/50 hover:border-gray-600 px-8 py-4 rounded-xl text-gray-300 transition-all duration-200 hover:bg-gray-900/50 text-center"
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            <div className="gradient-border bg-gray-900/50 rounded-xl p-5 text-center">
              <p className="text-2xl font-bold text-indigo-400">{data.avgLeads}</p>
              <p className="text-xs text-gray-500 mt-1">Leads available</p>
            </div>
            <div className="gradient-border bg-gray-900/50 rounded-xl p-5 text-center">
              <p className="text-2xl font-bold text-emerald-400">{data.avgResponseRate}</p>
              <p className="text-xs text-gray-500 mt-1">Avg. response rate</p>
            </div>
            <div className="gradient-border bg-gray-900/50 rounded-xl p-5 text-center">
              <p className="text-2xl font-bold text-amber-400">97.2%</p>
              <p className="text-xs text-gray-500 mt-1">Email accuracy</p>
            </div>
            <div className="gradient-border bg-gray-900/50 rounded-xl p-5 text-center">
              <p className="text-2xl font-bold text-purple-400">{data.topCountries.length}</p>
              <p className="text-xs text-gray-500 mt-1">Top countries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points specific to industry */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold mb-8">Challenges in {industry.nameEn} prospecting</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.painPoints.map((point, i) => (
            <div key={i} className="gradient-border bg-gray-900/50 rounded-xl p-6">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-gray-900/30 border-y border-gray-800/50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-3">Who buys {industry.nameEn.toLowerCase()} leads?</h2>
          <p className="text-gray-500 mb-8">Common use cases from our clients:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.useCases.map((uc, i) => (
              <div key={i} className="flex items-start gap-3 gradient-border bg-gray-900/50 rounded-xl p-5">
                <svg className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm text-gray-300">{uc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top countries for this industry */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold mb-8">Top countries for {industry.nameEn.toLowerCase()} leads</h2>
        <div className="flex flex-wrap gap-3">
          {data.topCountries.map((country) => (
            <span key={country} className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-2 rounded-lg text-sm font-medium">
              {country}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-4">+ {countries.length - data.topCountries.length} more countries available</p>
      </section>

      {/* Testimonial */}
      <section className="bg-gray-900/30 border-y border-gray-800/50 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="gradient-border bg-gray-900/50 rounded-2xl p-8 glow-indigo">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                {data.testimonial.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-semibold">{data.testimonial.name}</p>
                <p className="text-sm text-gray-500">{data.testimonial.role} at {data.testimonial.company} · {data.testimonial.country}</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg italic">&ldquo;{data.testimonial.quote}&rdquo;</p>
            <div className="mt-6">
              <span className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full">{data.testimonial.metric}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-industries */}
      {industry.subIndustries.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-bold mb-8">Sub-categories available</h2>
          <div className="flex flex-wrap gap-3">
            {industry.subIndustries.map((sub) => (
              <span key={sub.id} className="bg-gray-900/60 border border-gray-800/60 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-gray-200 hover:border-gray-700 transition-all cursor-default">
                {sub.nameEn}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="hero-gradient py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Start finding {industry.nameEn.toLowerCase()} leads today
          </h2>
          <p className="text-lg text-gray-400 mt-4">10 free leads. No credit card. Cancel anytime.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="animate-pulse-glow bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-200"
            >
              Get 10 Free Leads
            </Link>
            <Link
              href="/buy-leads"
              className="border border-gray-700/50 hover:border-gray-600 px-10 py-4 rounded-xl text-gray-300 text-lg transition-all duration-200 hover:bg-gray-900/50"
            >
              View All Industries
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[8px] font-bold">L</div>
            <p>LeadGen AI &mdash; B2B Lead Generation Platform</p>
          </div>
          <div className="flex gap-6">
            <span className="hover:text-gray-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 transition-colors cursor-pointer">Terms of Service</span>
            <Link href="/buy-leads" className="hover:text-gray-400 transition-colors">All Industries</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
