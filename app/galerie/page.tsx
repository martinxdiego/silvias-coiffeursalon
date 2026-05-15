import type { Metadata } from "next";
import { BookingCta } from "@/components/booking-cta";
import { GalleryGrid } from "@/components/gallery-grid";
import { SectionHeader } from "@/components/section-header";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Galerie von Silvias Coiffeursalon in Emmenbrücke. Platzhalter für Salonfotos, Schnitte, Farben, Mèches, Balayage und Styling.",
};

export default function GaleriePage() {
  return (
    <main>
      <section className="bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            description="Die Struktur ist bereit für echte Bilder von Silvias Arbeiten und dem Salon in Emmenbrücke."
            eyebrow="Galerie"
            title="Schnitt, Farbe und Salonstimmung."
          />
          <div className="mt-10">
            <GalleryGrid />
          </div>
        </div>
      </section>
      <BookingCta
        text="Du kannst in der Buchung eine Notiz hinterlassen oder ein Referenzbild später per WhatsApp senden."
        title="Du hast bereits eine Idee?"
      />
    </main>
  );
}
