import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { BookingLink } from "@/components/booking-link";
import { WhatsAppLink } from "@/components/whatsapp-link";

export function ContactSection() {
  return (
    <section className="bg-ivory py-20 sm:py-24" id="kontakt">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Kontakt
          </p>
          <h2 className="font-serif text-4xl leading-tight text-cocoa sm:text-5xl">
            Silvia freut sich auf deinen Besuch.
          </h2>
          <p className="mt-5 text-base leading-8 text-coffee">
            Buche online, schreibe kurz per WhatsApp oder rufe direkt an. Für
            Beratung, Farbe und grössere Veränderungen plant Silvia gerne genug
            Zeit ein.
          </p>

          <div className="mt-8 grid gap-4">
            <a
              className="flex items-center gap-4 rounded-3xl border border-cocoa/10 bg-cream p-4 text-cocoa"
              href={`tel:${siteConfig.mobileHref}`}
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-sand/45">
                <Phone aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-mocha">Mobile</span>
                <span className="font-semibold">{siteConfig.mobileDisplay}</span>
              </span>
            </a>
            <a
              className="flex items-center gap-4 rounded-3xl border border-cocoa/10 bg-cream p-4 text-cocoa"
              href={`tel:${siteConfig.landlineHref}`}
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-sand/45">
                <Phone aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-mocha">Salon</span>
                <span className="font-semibold">{siteConfig.landlineDisplay}</span>
              </span>
            </a>
            <a
              className="flex items-center gap-4 rounded-3xl border border-cocoa/10 bg-cream p-4 text-cocoa"
              href={`mailto:${siteConfig.email}`}
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-rose/25">
                <Mail aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-mocha">E-Mail</span>
                <span className="font-semibold">{siteConfig.email}</span>
              </span>
            </a>
            <div className="flex items-center gap-4 rounded-3xl border border-cocoa/10 bg-cream p-4 text-cocoa">
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-sage/25">
                <MapPin aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-mocha">Adresse</span>
                <span className="font-semibold">{siteConfig.addressLines.join(", ")}</span>
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookingLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cocoa px-6 text-sm font-semibold text-ivory shadow-[0_14px_34px_rgba(45,33,27,0.18)]" />
            <WhatsAppLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-6 text-sm font-semibold text-cocoa" />
          </div>
        </div>

        <div className="grid gap-5">
          <div className="rounded-[2rem] border border-cocoa/10 bg-cream p-6 shadow-[0_18px_50px_rgba(45,33,27,0.08)]">
            <h3 className="font-serif text-2xl text-cocoa">Öffnungszeiten</h3>
            <dl className="mt-5 grid gap-3">
              {siteConfig.openingHours.map((item) => (
                <div className="flex items-center justify-between gap-6 text-sm" key={item.day}>
                  <dt className="font-medium text-cocoa">{item.day}</dt>
                  <dd className="text-right text-coffee">{item.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            aria-label={siteConfig.mapLabel}
            className="relative min-h-72 overflow-hidden rounded-[2rem] border border-cocoa/10 bg-linen shadow-[0_18px_50px_rgba(45,33,27,0.08)]"
            role="img"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(217,191,140,0.54),rgba(135,147,122,0.28)_45%,rgba(45,33,27,0.16))]" />
            <div className="absolute inset-6 rounded-[1.5rem] border border-cocoa/15" />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-cocoa text-ivory shadow-lg">
                <MapPin aria-hidden="true" className="size-6" />
              </span>
              <span className="mt-4 max-w-56 text-sm font-semibold text-cocoa">
                Google Maps Platzhalter - Benziwilstrasse 4a, Emmenbrücke
              </span>
              <span className="mt-2 max-w-64 text-xs leading-5 text-coffee">
                TODO: Finalen Google Maps Embed Link nach Erstellung/Verifizierung
                des Google Business Profils ersetzen.
              </span>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Google Business TODO
                <ExternalLink aria-hidden="true" className="size-3" />
              </span>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cocoa/10 bg-cream p-6 shadow-[0_18px_50px_rgba(45,33,27,0.08)]">
            <h3 className="font-serif text-2xl text-cocoa">Anreise & Vertrauen</h3>
            <div className="mt-5 grid gap-3 text-sm leading-7 text-coffee">
              <p>
                TODO: Parkplatz- und ÖV-Hinweise ergänzen, sobald die finalen
                Informationen von Silvia vorliegen.
              </p>
              {siteConfig.googleMapsUrl.startsWith("https://") ? (
                <a
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-5 font-semibold text-cocoa"
                  href={siteConfig.googleMapsUrl}
                >
                  Route öffnen
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-5 font-semibold text-mocha">
                  Route öffnen TODO
                </span>
              )}
              {siteConfig.googleBusinessUrl.startsWith("https://") ? (
                <a
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-5 font-semibold text-cocoa"
                  href={siteConfig.googleBusinessUrl}
                >
                  Auf Google ansehen
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-5 font-semibold text-mocha">
                  Auf Google ansehen TODO
                </span>
              )}
              {siteConfig.googleBusinessUrl.startsWith("https://") ? (
                <a
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-5 font-semibold text-cocoa"
                  href={siteConfig.googleBusinessUrl}
                >
                  Bewertung auf Google schreiben
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-5 font-semibold text-mocha">
                  Google Bewertung TODO
                </span>
              )}
              <p className="text-xs text-mocha">
                TODO: Google Business Profil Link und Maps Link einsetzen, sobald
                das Profil verfügbar ist. Aktueller Google Business Placeholder:
                {" "}{siteConfig.googleBusinessUrl}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
