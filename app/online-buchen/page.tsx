import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingWizard } from "@/components/booking-wizard";
import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Online Termin buchen | Silvias Coiffeursalon Emmenbrücke",
  description:
    "Buche deinen Coiffeurtermin bei Silvias Coiffeursalon in Emmenbrücke. Schneiden, Föhnen, Färben, Balayage, Herren- und Kinderhaarschnitte.",
};

export default async function OnlineBuchenPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <main>
      <section className="bg-cream pt-16 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            description={`Wähle deine Leistung, suche dir eine passende Zeit und sende die Anfrage an ${siteConfig.ownerName}. Für den Prototyp bleiben E-Mail, TWINT und Kalender-Sync als klare Integrationspunkte vorbereitet.`}
            eyebrow="Online buchen"
            title="Dein Termin bei Silvias Coiffeursalon."
          />
        </div>
      </section>
      <Suspense fallback={<div className="p-8 text-cocoa">Buchung wird geladen...</div>}>
        <BookingWizard initialServiceId={service} />
      </Suspense>
    </main>
  );
}
