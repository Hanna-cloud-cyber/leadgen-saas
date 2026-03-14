"use client";

import { useState } from "react";

export function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    leadsPerMonth: "",
    countries: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/funnel/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", industry: "", leadsPerMonth: "", countries: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-lg font-semibold text-white">Request received!</h4>
        <p className="text-sm text-gray-400 mt-2">We&apos;ll get back to you within 24 hours with a custom quote.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Full name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-indigo-500/50 focus:outline-none transition-colors"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Work email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-indigo-500/50 focus:outline-none transition-colors"
            placeholder="john@company.com"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1.5">Company *</label>
        <input
          type="text"
          required
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-indigo-500/50 focus:outline-none transition-colors"
          placeholder="Acme Corp"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Target industry</label>
          <select
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-indigo-500/50 focus:outline-none transition-colors"
          >
            <option value="">Select industry</option>
            <option value="tech">Technology & IT</option>
            <option value="marketing">Marketing & Advertising</option>
            <option value="real_estate">Real Estate</option>
            <option value="finance">Finance & Insurance</option>
            <option value="hr">Recruiting & HR</option>
            <option value="healthcare">Healthcare</option>
            <option value="construction">Construction</option>
            <option value="retail">Retail & E-commerce</option>
            <option value="education">Education & Training</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Leads per month</label>
          <select
            value={formData.leadsPerMonth}
            onChange={(e) => setFormData({ ...formData, leadsPerMonth: e.target.value })}
            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-indigo-500/50 focus:outline-none transition-colors"
          >
            <option value="">Select volume</option>
            <option value="1000-5000">1,000 - 5,000</option>
            <option value="5000-10000">5,000 - 10,000</option>
            <option value="10000-50000">10,000 - 50,000</option>
            <option value="50000+">50,000+</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1.5">Target countries</label>
        <input
          type="text"
          value={formData.countries}
          onChange={(e) => setFormData({ ...formData, countries: e.target.value })}
          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-indigo-500/50 focus:outline-none transition-colors"
          placeholder="e.g. USA, UK, Germany, France"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1.5">Anything else?</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={3}
          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:border-indigo-500/50 focus:outline-none transition-colors resize-none"
          placeholder="Tell us about your needs..."
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 py-3 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "Sending..." : "Get Custom Quote"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400 text-center">Something went wrong. Please try again.</p>
      )}
      <p className="text-xs text-gray-600 text-center">We&apos;ll respond within 24 hours. No spam, ever.</p>
    </form>
  );
}
