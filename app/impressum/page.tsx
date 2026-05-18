import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum Platzhalter für Silvias Coiffeursalon.",
};

export default function ImpressumPage() {
  return (
    <main className="bg-cream px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-cocoa/10 bg-ivory p-8 shadow-[0_22px_70px_rgba(45,33,27,0.1)]">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
          Rechtliches
        </p>
        <h1 className="font-serif text-4xl leading-tight text-cocoa">
          Impressum
        </h1>
        <div className="mt-6 space-y-4 leading-8 text-coffee">
          <p>
            TODO: Finales Impressum mit korrekten rechtlichen Angaben prüfen
            und ergänzen.
          </p>
          <address className="not-italic">
            <strong className="text-cocoa">{siteConfig.name}</strong>
            <br />
            {siteConfig.ownerName}
            <br />
            {siteConfig.addressLines.map((line) => (
              <span className="block" key={line}>
                {line}
              </span>
            ))}
            <span className="block">Schweiz</span>
            <br />
            Telefon: {siteConfig.mobileDisplay}
            <br />
            Festnetz: {siteConfig.landlineDisplay}
            <br />
            E-Mail: {siteConfig.email}
          </address>
        </div>
      </section>
    </main>
  );
}
