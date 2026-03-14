import Link from "next/link";

const SOLUTIONS = [
  {
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "AI-Powered Process Automation",
    desc: "Eliminate repetitive tasks across your organisation with intelligent automation that learns and adapts. From invoice processing to customer onboarding — fully automated.",
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Predictive Analytics & Insights",
    desc: "Transform raw data into actionable business intelligence. Our AI models forecast trends, identify opportunities, and flag risks before they impact your bottom line.",
  },
  {
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    title: "Conversational AI & Chatbots",
    desc: "Deploy intelligent virtual agents that handle customer queries 24/7 in 30+ languages. Seamless handoff to human agents when needed. 85% resolution rate.",
  },
  {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    title: "Intelligent Document Processing",
    desc: "Extract, classify, and process documents at scale using computer vision and NLP. Contracts, invoices, forms — processed in seconds with 99.2% accuracy.",
  },
  {
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    title: "AI Sales & Marketing Automation",
    desc: "Identify high-intent leads, personalise outreach at scale, and automate your entire sales pipeline. Companies see 3.2x increase in qualified meetings.",
  },
  {
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    title: "Custom AI Model Development",
    desc: "Bespoke machine learning models trained on your data for your specific use cases. From recommendation engines to fraud detection — tailored to your industry.",
  },
];

const STATS = [
  { value: "500+", label: "Enterprise Clients" },
  { value: "40%", label: "Average Cost Reduction" },
  { value: "12M+", label: "Processes Automated Monthly" },
  { value: "98.7%", label: "Client Retention Rate" },
];

const INDUSTRIES = [
  { name: "Financial Services", icon: "🏦" },
  { name: "Healthcare & Pharma", icon: "🏥" },
  { name: "Manufacturing", icon: "🏭" },
  { name: "Retail & E-commerce", icon: "🛒" },
  { name: "Legal & Compliance", icon: "⚖️" },
  { name: "Logistics & Supply Chain", icon: "🚚" },
  { name: "Insurance", icon: "🛡️" },
  { name: "Real Estate", icon: "🏢" },
  { name: "Telecommunications", icon: "📡" },
  { name: "Energy & Utilities", icon: "⚡" },
];

const TESTIMONIALS = [
  {
    quote: "They transformed our entire back-office operations. We went from processing 200 invoices a day to 5,000 — with fewer errors. The ROI was visible within 8 weeks.",
    name: "Sarah Mitchell",
    role: "COO, Meridian Financial Group",
    location: "London, UK",
  },
  {
    quote: "The AI sales automation platform increased our qualified pipeline by 340%. Our reps now spend 80% of their time selling instead of prospecting. Game changer.",
    name: "James Rodriguez",
    role: "VP of Sales, CloudScale Technologies",
    location: "Austin, TX",
  },
  {
    quote: "We evaluated 12 vendors. Their custom NLP model for contract analysis was leagues ahead. Processing time went from 3 hours per contract to 4 minutes.",
    name: "Dr. Elena Kowalski",
    role: "Head of Innovation, Hartmann & Partners",
    location: "New York, NY",
  },
];

const BRAND_LOGOS = [
  { name: "Microsoft", letters: "Microsoft" },
  { name: "Apple", letters: "Apple" },
  { name: "Google", letters: "Google" },
  { name: "Amazon", letters: "Amazon" },
  { name: "Salesforce", letters: "Salesforce" },
  { name: "SAP", letters: "SAP" },
  { name: "Oracle", letters: "Oracle" },
  { name: "IBM", letters: "IBM" },
  { name: "Deloitte", letters: "Deloitte" },
  { name: "Accenture", letters: "Accenture" },
  { name: "McKinsey", letters: "McKinsey" },
  { name: "Stripe", letters: "Stripe" },
];

const PRICING = [
  {
    name: "Starter",
    price: "$2,499",
    period: "/mo",
    desc: "For growing companies ready to automate",
    features: [
      "Up to 5 automated workflows",
      "1 AI chatbot deployment",
      "Basic analytics dashboard",
      "Email & chat support",
      "10,000 document pages/mo",
      "2 user seats",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "$7,999",
    period: "/mo",
    desc: "For scaling organisations with complex needs",
    features: [
      "Unlimited workflows",
      "5 AI chatbot deployments",
      "Advanced analytics & reporting",
      "Priority support + Slack channel",
      "100,000 document pages/mo",
      "10 user seats",
      "Custom integrations",
      "Dedicated CSM",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large organisations with bespoke requirements",
    features: [
      "Everything in Professional",
      "Custom AI model development",
      "On-premise deployment option",
      "24/7 phone & Slack support",
      "Unlimited documents",
      "Unlimited seats",
      "SLA guarantee (99.99%)",
      "Quarterly business reviews",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-bold">
              N
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              NexusAI
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#solutions" className="text-sm text-gray-400 hover:text-white transition-colors">Solutions</Link>
            <Link href="#industries" className="text-sm text-gray-400 hover:text-white transition-colors">Industries</Link>
            <Link href="#results" className="text-sm text-gray-400 hover:text-white transition-colors">Results</Link>
            <Link href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block">Sign In</Link>
            <Link href="#contact" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Book a Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 bg-blue-900/20 border border-blue-700/30 rounded-full text-xs text-blue-400 mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Trusted by 500+ enterprises worldwide
          </div>
          <h1 className="animate-fade-in-up animate-delay-100 text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] max-w-5xl mx-auto tracking-tight">
            AI & Automation
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"> That Drives Revenue</span>
          </h1>
          <p className="animate-fade-in-up animate-delay-200 text-lg md:text-xl text-gray-400 mt-6 max-w-3xl mx-auto leading-relaxed">
            We build and deploy intelligent automation solutions that cut costs by 40%,
            accelerate operations, and unlock new revenue streams for B2B enterprises.
            From London to San Francisco — we deliver results.
          </p>
          <div className="animate-fade-in-up animate-delay-300 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#contact" className="animate-pulse-glow bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-8 py-4 rounded-xl font-semibold transition-all duration-200 text-base w-full sm:w-auto">
              Book Your Free AI Audit
            </Link>
            <Link href="#solutions" className="border border-gray-700/50 hover:border-gray-600 px-8 py-4 rounded-xl text-gray-300 transition-all duration-200 hover:bg-gray-900/50 text-base w-full sm:w-auto">
              Explore Solutions
            </Link>
          </div>
          <p className="animate-fade-in-up animate-delay-400 text-xs text-gray-600 mt-5">No commitment required — 30-minute strategy session with our AI architects</p>
        </div>
      </section>

      {/* Brand Marquee */}
      <section className="border-y border-gray-800/50 bg-gray-950/80 py-8 overflow-hidden">
        <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-6">Trusted by industry leaders worldwide</p>
        <div className="marquee-container">
          <div className="marquee-track">
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <span className="text-xl md:text-2xl font-bold text-gray-600 hover:text-gray-400 transition-colors duration-300 whitespace-nowrap tracking-tight">
                  {brand.letters}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Our Solutions</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3">End-to-End AI Solutions for Enterprise</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            From strategy to deployment — we architect, build, and scale AI-powered automations
            that transform how your business operates.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((solution) => (
            <div key={solution.title} className="group gradient-border bg-gray-900/50 rounded-2xl p-7 hover:bg-gray-900/80 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 group-hover:bg-blue-500/20 transition-colors duration-300">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={solution.icon} />
                </svg>
              </div>
              <h3 className="font-bold text-lg">{solution.title}</h3>
              <p className="text-sm text-gray-400 mt-3 leading-relaxed">{solution.desc}</p>
              <div className="mt-5 flex items-center gap-1 text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Our Process</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3">From Discovery to Deployment in 8 Weeks</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Our proven methodology ensures rapid time-to-value with minimal disruption</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery & Audit", desc: "We map your processes, identify automation opportunities, and build a business case with projected ROI.", color: "from-blue-500/20 to-blue-600/20" },
              { step: "02", title: "Solution Design", desc: "Our AI architects design a tailored solution leveraging the best-fit technologies for your use case.", color: "from-cyan-500/20 to-cyan-600/20" },
              { step: "03", title: "Build & Integrate", desc: "Agile development with bi-weekly demos. Seamless integration with your existing tech stack (SAP, Salesforce, etc.).", color: "from-blue-500/20 to-cyan-500/20" },
              { step: "04", title: "Deploy & Optimise", desc: "Go-live support, performance monitoring, and continuous optimisation to maximise ROI quarter over quarter.", color: "from-cyan-400/20 to-blue-400/20" },
            ].map((item) => (
              <div key={item.step} className="group relative gradient-border bg-gray-900/50 rounded-2xl p-7 text-center hover:bg-gray-900/80 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-blue-400 font-bold text-lg mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {item.step}
                </div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Industries</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3">Built for Your Industry</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Deep domain expertise across the sectors with the highest demand for AI transformation</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {INDUSTRIES.map((ind) => (
            <div key={ind.name} className="gradient-border bg-gray-900/50 rounded-xl p-5 text-center hover:bg-gray-900/80 transition-all duration-300 hover:-translate-y-1 cursor-default">
              <span className="text-3xl">{ind.icon}</span>
              <p className="text-sm font-medium text-gray-300 mt-3">{ind.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Results / Social Proof */}
      <section id="results" className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Client Results</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3">Real Results. Real Revenue.</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Don&apos;t take our word for it — here&apos;s what our clients have to say</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="gradient-border bg-gray-900/50 rounded-2xl p-7 hover:bg-gray-900/80 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                    <p className="text-xs text-gray-600">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Partners */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Integrations</span>
          <h2 className="text-2xl md:text-3xl font-bold mt-3">Seamless Integration With Your Stack</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {["Salesforce", "HubSpot", "SAP", "Microsoft 365", "Slack", "AWS", "Google Cloud", "Azure", "Snowflake", "Workday", "ServiceNow", "Zendesk"].map((tool) => (
            <span key={tool} className="bg-gray-900/60 border border-gray-800/60 px-5 py-2.5 rounded-lg text-sm text-gray-400 hover:text-gray-200 hover:border-gray-700 transition-all duration-200 cursor-default">
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3">Transparent Pricing. Predictable Costs.</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Start with a free audit. Scale as you grow. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? "gradient-border bg-blue-900/10 glow-blue relative"
                    : "border border-gray-800/60 bg-gray-900/50 hover:border-gray-700/60"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-bold mt-1">{plan.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{plan.desc}</p>
                <p className="text-4xl font-bold mt-4 tracking-tight">
                  {plan.price}
                  <span className="text-sm text-gray-500 font-normal">{plan.period}</span>
                </p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === "Enterprise" ? "#contact" : "/signup"}
                  className={`block text-center mt-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">Get Started</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 tracking-tight">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-lg text-gray-400 mt-5 max-w-2xl mx-auto">
            Book a free 30-minute AI audit with our solutions architects.
            We&apos;ll identify your top 3 automation opportunities and the projected ROI.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="animate-pulse-glow bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-10 py-4 rounded-xl text-lg font-semibold transition-all duration-200 w-full sm:w-auto"
            >
              Book Your Free AI Audit
            </Link>
            <Link
              href="mailto:hello@nexusai.com"
              className="border border-gray-700/50 hover:border-gray-600 px-10 py-4 rounded-xl text-gray-300 transition-all duration-200 hover:bg-gray-900/50 text-lg w-full sm:w-auto"
            >
              hello@nexusai.com
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free AI Audit
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No commitment
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Results in 8 weeks
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                  N
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">NexusAI</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">AI & Automation solutions that deliver measurable ROI for B2B enterprises worldwide.</p>
              <div className="flex gap-4 mt-5">
                {["LinkedIn", "Twitter", "GitHub"].map((social) => (
                  <span key={social} className="text-xs text-gray-600 hover:text-gray-400 cursor-pointer transition-colors">{social}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Solutions</h4>
              <ul className="space-y-2.5 text-sm text-gray-500">
                <li className="hover:text-gray-300 cursor-pointer transition-colors">Process Automation</li>
                <li className="hover:text-gray-300 cursor-pointer transition-colors">Predictive Analytics</li>
                <li className="hover:text-gray-300 cursor-pointer transition-colors">Conversational AI</li>
                <li className="hover:text-gray-300 cursor-pointer transition-colors">Document Processing</li>
                <li className="hover:text-gray-300 cursor-pointer transition-colors">Custom AI Models</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm text-gray-500">
                <li className="hover:text-gray-300 cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-gray-300 cursor-pointer transition-colors">Case Studies</li>
                <li className="hover:text-gray-300 cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-gray-300 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-gray-300 cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Offices</h4>
              <ul className="space-y-3 text-sm text-gray-500">
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
          <div className="border-t border-gray-800/50 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600">
            <p>&copy; 2026 NexusAI Ltd. All rights reserved.</p>
            <div className="flex gap-6 mt-3 md:mt-0">
              <span className="hover:text-gray-400 transition-colors cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gray-400 transition-colors cursor-pointer">Terms of Service</span>
              <span className="hover:text-gray-400 transition-colors cursor-pointer">Cookie Policy</span>
              <span className="hover:text-gray-400 transition-colors cursor-pointer">GDPR</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
