import type { Metadata } from "next";
import { BookingCta } from "@/components/booking-cta";
import { ServiceCard } from "@/components/service-card";
import { SectionHeader } from "@/components/section-header";
import { priceNote, serviceCategories, services } from "@/data/services";

export const metadata: Metadata = {
  title: "Leistungen & Preise",
  description:
    "Leistungen und Richtpreise von Silvias Coiffeursalon in Emmenbrücke: Damen, Herren, Kinder, Farbe, Mèches, Balayage und Styling.",
};

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
    </main>
  );
}
