import Link from "next/link";
import { navItems, siteConfig } from "@/data/site";
import { BookingLink } from "@/components/booking-link";
import { WhatsAppLink } from "@/components/whatsapp-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-cocoa/10 bg-cocoa pb-24 text-ivory md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="font-serif text-3xl">{siteConfig.name}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-ivory/72">
            Persönlicher Coiffeur Salon von {siteConfig.ownerName} in
            Emmenbrücke. Schneiden, Föhnen, Färben und Beratung mit ruhiger,
            persönlicher Atmosphäre.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BookingLink className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-sand px-5 text-sm font-semibold text-cocoa" />
            <WhatsAppLink className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-ivory/20 px-5 text-sm font-semibold text-ivory" />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sand">
            Seiten
          </p>
          <nav className="mt-4 grid gap-2" aria-label="Footer Navigation">
            {navItems.map((item) => (
              <Link
                className="text-sm text-ivory/75 transition hover:text-ivory"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sand">
            Kontakt
          </p>
          <address className="mt-4 not-italic text-sm leading-7 text-ivory/75">
            {siteConfig.addressLines.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
            <a className="mt-3 block hover:text-ivory" href={`tel:${siteConfig.mobileHref}`}>
              Mobile {siteConfig.mobileDisplay}
            </a>
            <a className="block hover:text-ivory" href={`tel:${siteConfig.landlineHref}`}>
              Telefon {siteConfig.landlineDisplay}
            </a>
            <a className="block hover:text-ivory" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
          </address>
          <nav className="mt-5 flex flex-wrap gap-3 text-xs text-ivory/62" aria-label="Rechtliches">
            {siteConfig.legalLinks.map((link) => (
              <Link className="hover:text-ivory" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="mt-3 text-xs leading-6 text-ivory/52">
            TODO: Rechtstexte vor dem Livegang final durch Diego/Silvia prüfen lassen.
          </p>
        </div>
      </div>
      <div className="border-t border-ivory/10 px-4 py-5 text-center text-xs text-ivory/52">
        © {new Date().getFullYear()} {siteConfig.name}. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
