import { ArrowRight, Baby, CalendarDays, Check, Clock, Coins, HeartHandshake, Phone, Scissors } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BookingCta } from "@/components/booking-cta";
import { BookingLink } from "@/components/booking-link";
import { ContactSection } from "@/components/contact-section";
import { GalleryGrid } from "@/components/gallery-grid";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { featuredServices } from "@/data/services";
import { siteConfig } from "@/data/site";
import { testimonials } from "@/data/testimonials";

const trustItems = [
  {
    title: "Persönliche Beratung",
    text: "Silvia nimmt sich Zeit für deinen Wunsch und dein Haar.",
    icon: HeartHandshake,
  },
  {
    title: "Flexible Termine",
    text: "Montag bis Freitag bis 19:00 Uhr, Samstag bis 17:00 Uhr.",
    icon: Clock,
  },
  {
    title: "Faire Preise",
    text: "Klare Richtpreise in CHF vor der Behandlung.",
    icon: Coins,
  },
  {
    title: "Damen, Herren & Kinder",
    text: "Persönlicher Coiffeur für die ganze Familie.",
    icon: Baby,
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="relative isolate min-h-[82svh] overflow-hidden bg-cocoa text-ivory">
        <Image
          alt="Warmer Salon Innenraum von Silvias Coiffeursalon"
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src="/images/hero-salon.svg"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(45,33,27,0.8),rgba(45,33,27,0.52)_50%,rgba(45,33,27,0.18))]" />
        <div className="relative mx-auto flex min-h-[82svh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-sand">
              Silvias Coiffeursalon · Luzern / Emmenbrücke
            </p>
            <h1 className="font-serif text-5xl leading-[0.98] sm:text-7xl lg:text-8xl">
              Dein persönlicher Coiffeur in Emmenbrücke
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/84 sm:text-xl">
              Persönliche Beratung, sauberes Handwerk und ein Look, der zu
              deinem Alltag passt. Für Damen, Herren und Kinder in Luzern /
              Emmenbrücke.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BookingLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sand px-6 text-sm font-semibold text-cocoa shadow-[0_16px_36px_rgba(0,0,0,0.22)]" />
              <WhatsAppLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ivory/24 bg-ivory/10 px-6 text-sm font-semibold text-ivory backdrop-blur">
                WhatsApp schreiben
              </WhatsAppLink>
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ivory/24 bg-ivory/10 px-6 text-sm font-semibold text-ivory backdrop-blur transition hover:bg-ivory/18"
                href={`tel:${siteConfig.mobileHref}`}
              >
                <Phone aria-hidden="true" className="size-4" />
                Anrufen
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-ivory/78">
              <span className="inline-flex items-center gap-2 rounded-full bg-ivory/10 px-4 py-2 backdrop-blur">
                <Scissors aria-hidden="true" className="size-4 text-sand" />
                Damen, Herren & Kinder
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-ivory/10 px-4 py-2 backdrop-blur">
                <CalendarDays aria-hidden="true" className="size-4 text-sand" />
                Benziwilstrasse 4a, Emmenbrücke
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-ivory/10 px-4 py-2 backdrop-blur">
                <Clock aria-hidden="true" className="size-4 text-sand" />
                Mo-Fr 07:00-19:00
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-6">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {trustItems.map((item) => (
            <div
              className="flex items-start gap-4 rounded-3xl border border-cocoa/10 bg-cream p-5"
              key={item.title}
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-sand/45 text-cocoa">
                <item.icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold text-cocoa">{item.title}</h2>
                <p className="mt-1 text-sm leading-6 text-coffee">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-24" id="leistungen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              description="Die wichtigsten Leistungen mit Richtpreisen. Jede Karte führt direkt in den passenden Buchungsschritt."
              eyebrow="Leistungen"
              title="Schneiden, Färben und Styling mit klaren Preisen."
            />
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-ivory px-6 text-sm font-semibold text-cocoa shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              href="/leistungen"
            >
              Alle Leistungen
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices.slice(0, 6).map((service, index) => (
              <Reveal delay={index * 0.06} key={service.id}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <Reveal className="relative min-h-[440px] overflow-hidden rounded-[2rem] bg-linen shadow-[0_24px_70px_rgba(45,33,27,0.12)]">
            <Image
              alt="Silvia Perez Perez in ihrem Coiffeursalon"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              src="/images/about-portrait.svg"
            />
          </Reveal>
          <Reveal className="flex flex-col justify-center" delay={0.08}>
            <SectionHeader
              description="Silvia Perez Perez führt ihren Salon persönlich und nahbar. Der Fokus liegt auf ehrlicher Beratung, sauberem Handwerk und einem Ergebnis, das in deinen Alltag passt."
              eyebrow="Über Silvia"
              title="Ein persönlicher Salon mit ruhiger Handschrift."
            />
            {/* TODO: Replace this placeholder with Silvia's final personal story and specializations. */}
            <ul className="mt-8 grid gap-3 text-coffee">
              {[
                "Persönliche Beratung vor jeder Behandlung",
                "Faire Richtpreise und klare Empfehlungen",
                "Ruhige Atmosphäre in Emmenbrücke",
              ].map((item) => (
                <li className="flex items-center gap-3" key={item}>
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-sage/20 text-cocoa">
                    <Check aria-hidden="true" className="size-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              className="mt-8 inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full bg-cocoa px-6 text-sm font-semibold text-ivory shadow-[0_14px_34px_rgba(45,33,27,0.18)]"
              href="/ueber-mich"
            >
              Mehr über Silvia
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              description="Platzhalter für echte Salonfotos, Arbeiten, Farben und Vorher-Nachher-Eindrücke."
              eyebrow="Galerie"
              title="Ein erster Eindruck von Stil und Atmosphäre."
            />
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-ivory px-6 text-sm font-semibold text-cocoa shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              href="/galerie"
            >
              Galerie ansehen
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <Reveal className="mt-10">
            <GalleryGrid limit={4} />
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            description="Bis echte Google- oder Kundenbewertungen eingefügt werden, zeigen diese Platzhalter die gewünschte Tonalität."
            eyebrow="Stimmen"
            title="Persönlich, freundlich und zuverlässig."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal delay={index * 0.08} key={testimonial.name}>
                <figure className="h-full rounded-[1.75rem] border border-cocoa/10 bg-cream p-6 shadow-[0_18px_50px_rgba(45,33,27,0.08)]">
                  <blockquote className="text-base leading-8 text-coffee">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <figcaption className="mt-6 border-t border-cocoa/10 pt-5">
                    <span className="block font-semibold text-cocoa">
                      {testimonial.name}
                    </span>
                    <span className="text-sm text-mocha">{testimonial.detail}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookingCta />
      <ContactSection />

      <section className="bg-cream px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 rounded-[2rem] border border-cocoa/10 bg-ivory p-5 text-sm leading-7 text-coffee shadow-[0_18px_50px_rgba(45,33,27,0.08)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            Lieber direkt? Silvia ist erreichbar unter {siteConfig.mobileDisplay}
            {" "}oder {siteConfig.landlineDisplay}.
          </span>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-5 font-semibold text-cocoa"
              href={`tel:${siteConfig.mobileHref}`}
            >
              <Phone aria-hidden="true" className="size-4" />
              Anrufen
            </a>
            <WhatsAppLink className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-cocoa px-5 font-semibold text-ivory">
              WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </main>
  );
}
