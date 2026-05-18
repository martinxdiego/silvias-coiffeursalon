import type { Metadata } from "next";
import { BookingCta } from "@/components/booking-cta";
import { ServiceCard } from "@/components/service-card";
import { SectionHeader } from "@/components/section-header";
import { priceNote, serviceCategories, services } from "@/data/services";

export const metadata: Metadata = {
  title: "Leistungen & Preise | Silvias Coiffeursalon Emmenbrücke",
  description:
    "Leistungen und Richtpreise von Silvias Coiffeursalon in Emmenbrücke: Damen, Herren, Kinder, Farbe, Mèches, Balayage und Styling.",
};

const faqs = [
  {
    question: "Sind die Preise fix?",
    answer:
      "Die Preise sind Richtpreise. Je nach Haarlänge, Haarmenge, Aufwand und Beratung kann der finale Preis leicht variieren.",
  },
  {
    question: "Welche Leistung soll ich bei Farbe oder Balayage wählen?",
    answer:
      "Wähle die Leistung, die deinem Wunsch am nächsten kommt. Im Notizfeld kannst du Haarlänge, Ausgangsfarbe und Wunschresultat kurz beschreiben.",
  },
  {
    question: "Kann ich auch kurzfristig buchen?",
    answer:
      "Ja, wenn freie Zeiten sichtbar sind. Falls du unsicher bist, schreibe Silvia zusätzlich kurz per WhatsApp.",
  },
  {
    question: "Gelten Kinder- und Jugendpreise für alle Haarlängen?",
    answer:
      "Die Preise sind als Orientierung gedacht. Bei sehr langem oder dichtem Haar kann Silvia den Aufwand vor Ort einschätzen.",
  },
];

export default function LeistungenPage() {
  return (
    <main>
      <section className="bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            description="Wähle eine Leistung direkt aus der Preisliste und starte die Online-Buchung. Die genaue Empfehlung bespricht Silvia mit dir im Salon."
            eyebrow="Leistungen"
            title="Klare Richtpreise für deinen Coiffeurtermin."
          />
          <p className="mt-6 max-w-3xl rounded-3xl bg-cream p-5 text-sm leading-7 text-coffee">
            {priceNote}
          </p>

          <div className="mt-12 grid gap-12">
            {serviceCategories.map((category) => (
              <section key={category}>
                <h2 className="mb-5 font-serif text-4xl text-cocoa">{category}</h2>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {services
                    .filter((service) => service.category === category)
                    .map((service) => (
                      <ServiceCard compact key={service.id} service={service} />
                    ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <BookingCta
        text="Bei Farben, Mèches und Balayage kannst du im Nachrichtenfeld kurz Haarlänge und Wunschresultat beschreiben."
        title="Welche Leistung passt zu dir?"
      />

      <section className="bg-ivory py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            description="Die wichtigsten Fragen zu Preisen, Dauer und Buchung, bevor du deinen Termin anfragst."
            eyebrow="FAQ"
            title="Gut zu wissen vor deinem Termin."
          />
          <div className="mt-10 grid gap-4">
            {faqs.map((faq) => (
              <article
                className="rounded-[1.75rem] border border-cocoa/10 bg-cream p-6 shadow-[0_18px_50px_rgba(45,33,27,0.06)]"
                key={faq.question}
              >
                <h2 className="font-serif text-2xl text-cocoa">{faq.question}</h2>
                <p className="mt-3 leading-8 text-coffee">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
