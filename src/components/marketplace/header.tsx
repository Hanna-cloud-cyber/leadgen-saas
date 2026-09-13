"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

const NAV = [
  { label: "Find Suppliers", href: "/search" },
  { label: "Categories", href: "/#categories" },
  { label: "Products", href: "/products" },
  { label: "Countries", href: "/#countries" },
  { label: "Verified Suppliers", href: "/verification" },
  { label: "Pricing", href: "/pricing" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "mp-glass-header border-b border-mp-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mp-container flex items-center justify-between h-[68px]">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[13.5px] font-medium text-mp-ink-2 hover:text-mp-ink transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/for-suppliers"
            className="text-[13.5px] font-medium text-mp-ink-2 hover:text-mp-ink transition-colors px-2"
          >
            For Suppliers
          </Link>
          <Link
            href="/login"
            className="text-[13.5px] font-medium text-mp-ink-2 hover:text-mp-ink transition-colors px-2"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="mp-btn-primary text-[13.5px] font-semibold px-4 py-2.5 rounded-lg"
          >
            Join Marketplace
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-mp-line"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden mp-glass-header border-t border-mp-line px-6 py-4 flex flex-col gap-3">
          {NAV.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="text-sm font-medium text-mp-ink-2">
              {item.label}
            </Link>
          ))}
          <div className="h-px bg-mp-line my-1" />
          <Link href="/for-suppliers" onClick={() => setOpen(false)} className="text-sm font-medium text-mp-ink-2">For Suppliers</Link>
          <Link href="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-mp-ink-2">Sign In</Link>
          <Link href="/signup" onClick={() => setOpen(false)} className="mp-btn-primary text-sm font-semibold px-4 py-2.5 rounded-lg text-center">
            Join Marketplace
          </Link>
        </div>
      )}
    </header>
  );
}
