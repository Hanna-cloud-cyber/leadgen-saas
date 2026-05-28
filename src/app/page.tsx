import Link from "next/link";

const SERVICES = [
  {
    id: "01",
    title: "Intelligent Process Automation",
    desc: "We design and deploy end-to-end automation that eliminates manual work across finance, HR, operations, and supply chain. Our bots learn from your team and improve over time.",
    metrics: "40% cost reduction avg.",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
  {
    id: "02",
    title: "Predictive Analytics Platform",
    desc: "Turn your data into foresight. Our AI models detect patterns humans miss — forecasting demand, churn, risk, and revenue with enterprise-grade accuracy.",
    metrics: "92% prediction accuracy",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    id: "03",
    title: "Conversational AI Agents",
    desc: "Deploy virtual agents that resolve 85% of enquiries without human intervention. Multilingual. Omnichannel. Seamlessly integrated with your CRM and helpdesk.",
    metrics: "85% auto-resolution rate",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  },
  {
    id: "04",
    title: "Computer Vision & Document AI",
    desc: "Extract, classify, and validate documents at scale. From invoices to contracts to ID verification — processed in seconds with 99.2% accuracy using our vision models.",
    metrics: "99.2% extraction accuracy",
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  },
  {
    id: "05",
    title: "AI-Powered Revenue Engine",
    desc: "Identify high-intent buyers, personalise outreach at scale, and automate your pipeline. Our clients see 3x more qualified meetings and 40% shorter sales cycles.",
    metrics: "3.2x pipeline growth",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
  {
    id: "06",
    title: "Custom AI & ML Development",
    desc: "Bespoke models trained on your proprietary data. Recommendation engines, fraud detection, demand forecasting, NLP — built for your industry, your data, your edge.",
    metrics: "8-week delivery",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
];

const CASE_STUDIES = [
  {
    company: "Global Investment Bank",
    industry: "Financial Services",
    challenge: "Manual processing of 12,000+ trade confirmations daily causing delays and compliance risk.",
    result: "95% automation rate. Processing time reduced from 4 hours to 12 minutes. Zero compliance violations since deployment.",
    metric: "95%",
    metricLabel: "Automation Rate",
  },
  {
    company: "Fortune 500 Retailer",
    industry: "Retail & E-commerce",
    challenge: "Inability to forecast demand accurately across 2,400 stores, leading to $180M in annual overstock waste.",
    result: "Demand forecasting accuracy improved from 62% to 94%. Overstock reduced by $47M in the first year.",
    metric: "$47M",
    metricLabel: "Saved Year 1",
  },
  {
    company: "NHS Trust Hospital Group",
    industry: "Healthcare",
    challenge: "Patient intake paperwork consuming 35% of clinical staff time. 48-hour processing backlog.",
    result: "Document processing automated end-to-end. Staff time freed by 28%. Backlog eliminated within 6 weeks.",
    metric: "28%",
    metricLabel: "Staff Time Freed",
  },
];

const BRANDS = [
  "Microsoft", "Apple", "Google", "Amazon", "Salesforce",
  "SAP", "Oracle", "IBM", "Deloitte", "Accenture",
  "McKinsey", "Stripe", "Shopify", "Adobe", "Nvidia",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#06080f] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-glass border-b border-white/[0.04]">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between px-8 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400 flex items-center justify-center text-white text-sm font-black tracking-tight">
              NX
            </div>
            <span className="text-xl font-bold tracking-tight">NexusAI</span>
          </Link>
          <div className="hidden lg:flex items-center gap-10">
            <Link href="#services" className="text-[13px] text-gray-400 hover:text-white transition-colors tracking-wide uppercase">Services</Link>
            <Link href="#work" className="text-[13px] text-gray-400 hover:text-white transition-colors tracking-wide uppercase">Case Studies</Link>
            <Link href="#process" className="text-[13px] text-gray-400 hover:text-white transition-colors tracking-wide uppercase">Process</Link>
            <Link href="#pricing" className="text-[13px] text-gray-400 hover:text-white transition-colors tracking-wide uppercase">Pricing</Link>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">Sign In</Link>
            <Link href="#contact" className="group relative px-6 py-2.5 rounded-full text-sm font-semibold overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-300 group-hover:blur-sm" />
              <span className="relative">Book a Demo</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 hero-mesh" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-400/[0.05] rounded-full blur-[100px]" />
        <div className="relative max-w-[1320px] mx-auto px-8 text-center">
          <div className="animate-fade-in-up inline-flex items-center gap-2.5 px-5 py-2 bg-white/[0.03] border border-white/[0.06] rounded-full text-xs text-gray-400 mb-10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Trusted by 500+ enterprises across 30 countries
          </div>
          <h1 className="animate-fade-in-up animate-delay-100 text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[1.02] max-w-5xl mx-auto tracking-tight">
            We Build AI That
            <span className="block mt-1 text-gradient">Prints Money.</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-200 text-lg md:text-xl text-gray-500 mt-8 max-w-2xl mx-auto leading-relaxed font-light">
            Enterprise AI &amp; Automation solutions that cut costs, accelerate revenue,
            and give you an unfair advantage. London. New York. San Francisco.
          </p>
          <div className="animate-fade-in-up animate-delay-300 mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="#contact" className="group relative px-10 py-4 rounded-full text-base font-semibold overflow-hidden w-full sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <span className="relative">Get Your Free AI Audit</span>
            </Link>
            <Link href="#work" className="px-10 py-4 rounded-full border border-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-all duration-300 text-base w-full sm:w-auto text-center">
              See Our Work
            </Link>
          </div>
          <div className="animate-fade-in-up animate-delay-400 mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { val: "500+", label: "Enterprise Clients" },
              { val: "40%", label: "Avg Cost Reduction" },
              { val: "$2.4B", label: "Revenue Generated" },
              { val: "98.7%", label: "Client Retention" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-black text-gradient">{s.val}</p>
                <p className="text-xs text-gray-600 mt-1.5 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06080f] to-transparent" />
      </section>

      {/* Brand Marquee */}
      <section className="py-12 border-y border-white/[0.04] overflow-hidden">
        <p className="text-center text-[10px] text-gray-600 uppercase tracking-[0.3em] mb-8">Trusted Partners &amp; Clients</p>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <span
                key={`${brand}-${i}`}
                className="flex-shrink-0 mx-10 text-2xl font-bold text-gray-700/60 hover:text-gray-500 transition-colors duration-500 whitespace-nowrap select-none"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-28">
        <div className="max-w-[1320px] mx-auto px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400 font-semibold">What We Do</span>
              <h2 className="text-4xl md:text-6xl font-black mt-4 leading-[1.1] tracking-tight max-w-2xl">
                Six Solutions.<br />
                <span className="text-gradient">Infinite Impact.</span>
              </h2>
            </div>
            <p className="text-gray-500 max-w-md mt-6 lg:mt-0 text-base leading-relaxed font-light">
              Each solution is battle-tested across 500+ deployments.
              We don&apos;t sell software — we deliver measurable business outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-3xl overflow-hidden">
            {SERVICES.map((s) => (
              <div key={s.id} className="group bg-[#06080f] p-8 md:p-10 hover:bg-white/[0.02] transition-all duration-500 relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-400/10 flex items-center justify-center group-hover:from-blue-500/20 group-hover:to-cyan-400/20 transition-all duration-500">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} />
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono text-gray-700">{s.id}</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-3">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{s.desc}</p>
                <div className="flex items-center justify-between pt-5 border-t border-white/[0.04]">
                  <span className="text-xs text-cyan-400 font-semibold">{s.metrics}</span>
                  <svg className="w-4 h-4 text-gray-700 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="work" className="py-28 bg-gradient-to-b from-transparent via-blue-950/[0.08] to-transparent">
        <div className="max-w-[1320px] mx-auto px-8">
          <div className="text-center mb-20">
            <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400 font-semibold">Case Studies</span>
            <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tight">
              Real Results.<br /><span className="text-gradient">Real Numbers.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((cs) => (
              <div key={cs.company} className="group relative rounded-3xl border border-white/[0.04] bg-white/[0.01] p-8 md:p-10 hover:border-white/[0.08] transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-cyan-400/[0.05] to-transparent rounded-bl-full" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600 font-medium">{cs.industry}</span>
                <h3 className="text-lg font-bold mt-3 mb-4">{cs.company}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4"><strong className="text-gray-400">Challenge:</strong> {cs.challenge}</p>
                <p className="text-sm text-gray-500 leading-relaxed mb-8"><strong className="text-gray-400">Result:</strong> {cs.result}</p>
                <div className="pt-6 border-t border-white/[0.04]">
                  <p className="text-4xl font-black text-gradient">{cs.metric}</p>
                  <p className="text-xs text-gray-600 mt-1 uppercase tracking-wider">{cs.metricLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-28">
        <div className="max-w-[1320px] mx-auto px-8">
          <div className="text-center mb-20">
            <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400 font-semibold">Our Process</span>
            <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tight">
              Discovery to ROI.<br /><span className="text-gradient">8 Weeks.</span>
            </h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: "01", title: "Discover", desc: "We audit your operations, map every process, and identify the highest-ROI automation opportunities.", duration: "Week 1-2" },
                { num: "02", title: "Architect", desc: "Our AI architects design a bespoke solution with the right technology stack for your use case.", duration: "Week 2-3" },
                { num: "03", title: "Build", desc: "Agile sprints with bi-weekly demos. We build, test, and integrate with your existing systems.", duration: "Week 3-6" },
                { num: "04", title: "Launch", desc: "Go-live with dedicated support. Then we continuously optimise for maximum ROI, quarter after quarter.", duration: "Week 6-8" },
              ].map((step) => (
                <div key={step.num} className="relative group">
                  <div className="rounded-3xl border border-white/[0.04] bg-white/[0.01] p-8 hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-500 h-full">
                    <div className="text-5xl font-black text-white/[0.04] group-hover:text-white/[0.08] transition-colors duration-500 mb-6">{step.num}</div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{step.desc}</p>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/60 font-medium">{step.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 border-y border-white/[0.04]">
        <div className="max-w-[1320px] mx-auto px-8">
          <div className="text-center mb-14">
            <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400 font-semibold">Industries</span>
            <h2 className="text-3xl md:text-4xl font-black mt-4 tracking-tight">Deep Expertise Where It Matters</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: "🏦", name: "Financial Services" },
              { icon: "🏥", name: "Healthcare" },
              { icon: "🏭", name: "Manufacturing" },
              { icon: "🛒", name: "Retail" },
              { icon: "⚖️", name: "Legal" },
              { icon: "🚚", name: "Logistics" },
              { icon: "🛡️", name: "Insurance" },
              { icon: "🏢", name: "Real Estate" },
              { icon: "📡", name: "Telecom" },
              { icon: "⚡", name: "Energy" },
            ].map((ind) => (
              <div key={ind.name} className="rounded-2xl border border-white/[0.04] bg-white/[0.01] p-6 text-center hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300">
                <span className="text-3xl">{ind.icon}</span>
                <p className="text-sm font-medium text-gray-400 mt-3">{ind.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack / Integrations */}
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-8 text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400 font-semibold">Integrations</span>
          <h2 className="text-3xl md:text-4xl font-black mt-4 tracking-tight mb-10">Works With Everything You Use</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Salesforce", "HubSpot", "SAP", "Microsoft 365", "Slack", "AWS", "Google Cloud", "Azure", "Snowflake", "Workday", "ServiceNow", "Zendesk", "Jira", "Notion"].map((tool) => (
              <span key={tool} className="px-5 py-2.5 rounded-full border border-white/[0.06] text-sm text-gray-500 hover:text-gray-300 hover:border-white/[0.12] transition-all duration-300">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-28 bg-gradient-to-b from-transparent via-blue-950/[0.08] to-transparent">
        <div className="max-w-[1320px] mx-auto px-8">
          <div className="text-center mb-20">
            <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400 font-semibold">Pricing</span>
            <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tight">
              Invest in Growth.<br /><span className="text-gradient">Not Overhead.</span>
            </h2>
            <p className="text-gray-500 mt-5 max-w-xl mx-auto font-light">Transparent pricing. No hidden fees. Start with a free audit.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Growth",
                price: "$4,999",
                period: "/mo",
                desc: "For companies ready to automate their first processes",
                features: ["Up to 5 automated workflows", "1 AI agent deployment", "Analytics dashboard", "Email & chat support", "10,000 documents/mo", "Quarterly reviews"],
                popular: false,
              },
              {
                name: "Scale",
                price: "$12,999",
                period: "/mo",
                desc: "For organisations scaling AI across departments",
                features: ["Unlimited workflows", "5 AI agent deployments", "Advanced analytics & BI", "Priority support + Slack", "100,000 documents/mo", "Custom integrations", "Dedicated CSM", "Monthly strategy sessions"],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                desc: "For large enterprises with bespoke needs",
                features: ["Everything in Scale", "Custom AI model development", "On-premise deployment", "24/7 phone support", "Unlimited everything", "SLA 99.99%", "Quarterly business reviews", "Executive sponsor"],
                popular: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 ${
                  plan.popular
                    ? "border-2 border-cyan-400/20 bg-white/[0.02]"
                    : "border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 px-4 py-1.5 rounded-full text-black">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{plan.desc}</p>
                <p className="text-5xl font-black mt-6 tracking-tight">
                  {plan.price}
                  <span className="text-base text-gray-600 font-normal">{plan.period}</span>
                </p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-400">
                      <svg className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === "Enterprise" ? "#contact" : "/signup"}
                  className={`block text-center mt-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 text-black hover:opacity-90"
                      : "border border-white/10 hover:border-white/20 text-gray-300 hover:text-white"
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28">
        <div className="max-w-[1320px] mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400 font-semibold">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 tracking-tight">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "They transformed our back-office in 8 weeks. We went from processing 200 invoices a day to 5,000 — with fewer errors. The ROI was visible by month 2.",
                name: "Sarah Mitchell",
                role: "COO, Meridian Financial Group",
                loc: "London, UK",
              },
              {
                quote: "The AI sales platform increased our qualified pipeline by 340%. Our reps now spend 80% of their time selling. That alone justified the investment.",
                name: "James Rodriguez",
                role: "VP Sales, CloudScale Technologies",
                loc: "Austin, TX",
              },
              {
                quote: "We evaluated 12 vendors. Their NLP model for contract analysis was leagues ahead. 3 hours per contract down to 4 minutes. Extraordinary.",
                name: "Dr. Elena Kowalski",
                role: "Head of Innovation, Hartmann & Partners",
                loc: "New York, NY",
              },
            ].map((t) => (
              <div key={t.name} className="rounded-3xl border border-white/[0.04] bg-white/[0.01] p-8 hover:border-white/[0.08] transition-all duration-500">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-400/30 flex items-center justify-center text-xs font-bold text-cyan-400">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-gray-600">{t.role} — {t.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/[0.06] rounded-full blur-[150px]" />
        <div className="relative max-w-3xl mx-auto px-8 text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-400 font-semibold">Get Started</span>
          <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tight leading-[1.1]">
            Ready to Build Your
            <span className="text-gradient"> Unfair Advantage?</span>
          </h2>
          <p className="text-lg text-gray-500 mt-6 font-light leading-relaxed">
            Book a free 30-minute AI audit. We&apos;ll identify your top 3
            automation opportunities and the projected ROI. No strings attached.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="group relative px-10 py-4 rounded-full text-base font-semibold overflow-hidden w-full sm:w-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <span className="relative text-black font-bold">Book Your Free AI Audit</span>
            </Link>
            <Link href="mailto:hello@nexusai.com" className="px-10 py-4 rounded-full border border-white/10 hover:border-white/20 text-gray-300 hover:text-white transition-all duration-300 w-full sm:w-auto text-center">
              hello@nexusai.com
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-xs text-gray-600">
            {["Free AI Audit", "No commitment", "Results in 8 weeks"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] bg-[#040610]">
        <div className="max-w-[1320px] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400 flex items-center justify-center text-black text-xs font-black">
                  NX
                </div>
                <span className="text-lg font-bold tracking-tight">NexusAI</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                Enterprise AI &amp; Automation solutions that deliver measurable ROI. From London to San Francisco.
              </p>
              <div className="flex gap-4 mt-6">
                {["LinkedIn", "Twitter", "GitHub"].map((s) => (
                  <span key={s} className="text-xs text-gray-700 hover:text-gray-400 cursor-pointer transition-colors">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Solutions</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                {["Process Automation", "Predictive Analytics", "Conversational AI", "Document AI", "Revenue Engine", "Custom Models"].map((l) => (
                  <li key={l} className="hover:text-gray-400 cursor-pointer transition-colors">{l}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Company</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                {["About", "Careers", "Blog", "Case Studies", "Contact", "Press"].map((l) => (
                  <li key={l} className="hover:text-gray-400 cursor-pointer transition-colors">{l}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-5">Offices</h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li>
                  <p className="text-gray-400 font-medium">London</p>
                  <p>71 Queen Victoria St, EC4V 4AY</p>
                </li>
                <li>
                  <p className="text-gray-400 font-medium">New York</p>
                  <p>350 Fifth Avenue, NY 10118</p>
                </li>
                <li>
                  <p className="text-gray-400 font-medium">San Francisco</p>
                  <p>535 Mission St, CA 94105</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/[0.04] mt-14 pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-700">
            <p>&copy; 2026 NexusAI Ltd. All rights reserved.</p>
            <div className="flex gap-6 mt-3 md:mt-0">
              {["Privacy", "Terms", "Cookies", "GDPR"].map((l) => (
                <span key={l} className="hover:text-gray-500 cursor-pointer transition-colors">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
