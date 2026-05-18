import type { Metadata } from "next";
import Image from "next/image";
import { BookingCta } from "@/components/booking-cta";
import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Über Silvia",
  description:
    "Silvia Perez Perez und Silvias Coiffeursalon in Emmenbrücke. Persönliche Beratung, Coiffeur-Handwerk und ruhige Salonatmosphäre.",
};

export default function UeberMichPage() {
  return (
    <main>
      <section className="bg-ivory py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="relative min-h-[500px] overflow-hidden rounded-[2rem] bg-linen shadow-[0_24px_70px_rgba(45,33,27,0.12)]">
            <Image
              alt={`${siteConfig.ownerName}, Inhaberin von Silvias Coiffeursalon`}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              src="/images/about-portrait.svg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <SectionHeader
              description="Silvia Perez Perez ist die persönliche Ansprechpartnerin im Salon. Sie legt Wert auf ruhige Beratung, ehrliche Empfehlungen und Resultate, die auch im Alltag funktionieren."
              eyebrow="Über Silvia"
              title="Ein Coiffeurtermin soll sich persönlich und unkompliziert anfühlen."
            />
            {/* TODO: Replace this with Silvia's real personal story. Add biography, training, specializations and local salon history. */}
            <div className="mt-8 space-y-5 text-base leading-8 text-coffee">
              <p>
                Silvias Coiffeursalon ist ein ruhiger, persönlicher Ort für
                Menschen aus Emmenbrücke, Luzern und Umgebung, die nicht einfach
                nur schnell Haare schneiden möchten, sondern eine ehrliche
                Empfehlung und ein gepflegtes Ergebnis suchen.
              </p>
              <p>
                Ob Schnitt, Farbe, Föhnen oder Kinderhaarschnitt: Silvia hört
                zuerst zu, erklärt die Möglichkeiten verständlich und achtet
                darauf, dass der Look zu Haarstruktur, Alltag und Pflegeaufwand
                passt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            {
              title: "Beratung zuerst",
              text: "Silvia nimmt sich Zeit für deine Wünsche und sagt ehrlich, was zu deinem Haar passt.",
            },
            {
              title: "Lokal verwurzelt",
              text: "Ein persönlicher Coiffeur in Emmenbrücke, gut erreichbar für Kundinnen und Kunden aus Luzern.",
            },
            {
              title: "Alltagstauglich",
              text: "Schnitt, Farbe und Styling sollen nicht nur im Salon gut aussehen, sondern auch danach funktionieren.",
            },
          ].map((item) => (
            <article
              className="rounded-[1.75rem] border border-cocoa/10 bg-ivory p-7 shadow-[0_18px_50px_rgba(45,33,27,0.08)]"
              key={item.title}
            >
              <h2 className="font-serif text-3xl text-cocoa">{item.title}</h2>
              <p className="mt-4 leading-8 text-coffee">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <BookingCta
        text="Wenn du unsicher bist, wähle die nächstpassende Leistung und schreibe im Notizfeld, was du dir wünschst."
        title="Lerne Silvia bei deinem nächsten Termin kennen."
      />
    </main>
  );
}
