"use client";

import { CalendarDays, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems, siteConfig } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cocoa/10 bg-ivory/88 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          aria-label={`${siteConfig.name} Startseite`}
          className="group flex flex-col"
          href="/"
          onClick={() => setOpen(false)}
        >
          <span className="font-serif text-2xl leading-none text-cocoa">
            Silvias
          </span>
          <span className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-mocha">
            Coiffeursalon · Emmenbrücke
          </span>
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                className={`text-sm font-medium transition ${
                  active ? "text-gold" : "text-coffee hover:text-cocoa"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <a
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-cocoa px-5 text-sm font-semibold text-ivory shadow-[0_14px_34px_rgba(45,33,27,0.18)] transition hover:-translate-y-0.5 hover:bg-coffee focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-ivory"
            href={siteConfig.bookingPath}
          >
            <CalendarDays aria-hidden="true" className="size-4" />
            Termin buchen
          </a>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={open}
          aria-label={open ? "Navigation schliessen" : "Navigation öffnen"}
          className="inline-flex size-11 items-center justify-center rounded-full border border-cocoa/15 bg-white/70 text-cocoa shadow-sm lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
      </div>

      {open ? (
        <div
          className="border-t border-cocoa/10 bg-ivory px-4 pb-5 shadow-[0_18px_44px_rgba(45,33,27,0.12)] lg:hidden"
          id="mobile-navigation"
        >
          <nav aria-label="Mobile Navigation" className="mx-auto grid max-w-7xl gap-2 pt-3">
            {navItems.map((item) => (
              <Link
                className="rounded-2xl px-3 py-3 text-base font-medium text-cocoa transition hover:bg-cream"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cocoa px-5 text-sm font-semibold text-ivory"
            href={siteConfig.bookingPath}
          >
            <CalendarDays aria-hidden="true" className="size-4" />
            Termin buchen
          </a>
        </div>
      ) : null}
    </header>
  );
}
