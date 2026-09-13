import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Veridian team.",
};

export default function ContactPage() {
  return (
    <div className="mp-container py-16 max-w-lg">
      <h1 className="text-3xl font-bold tracking-tight text-mp-ink">Contact Us</h1>
      <p className="text-[14.5px] text-mp-ink-2 mt-3 leading-relaxed">
        Questions about sourcing, supplier verification or your account? Send us a message and our team will respond within one business day.
      </p>

      <form className="mt-8 space-y-5">
        <label className="block">
          <span className="text-[13px] font-medium text-mp-ink mb-1.5 block">Name</span>
          <input className="mp-input" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="text-[13px] font-medium text-mp-ink mb-1.5 block">Email</span>
          <input type="email" className="mp-input" placeholder="you@company.com" />
        </label>
        <label className="block">
          <span className="text-[13px] font-medium text-mp-ink mb-1.5 block">Message</span>
          <textarea rows={5} className="mp-input resize-none" placeholder="How can we help?" />
        </label>
        <button type="button" className="mp-btn-primary rounded-lg px-6 py-3 text-[13.5px] font-semibold">Send Message</button>
      </form>
    </div>
  );
}
