import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { ContactSection } from "@/components/contact-section";
import { SectionHeader } from "@/components/section-header";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakt, Öffnungszeiten, Telefon, WhatsApp, E-Mail und Adresse von Silvias Coiffeursalon an der Benziwilstrasse 4a in Emmenbrücke.",
};

export default function KontaktPage() {
  return (
    <main>
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionHeader
            description="Für schnelle Termine ist Online buchen oder WhatsApp am einfachsten. Das Kontaktformular ist als UI vorbereitet und kann später mit E-Mail-Versand verbunden werden."
            eyebrow="Kontakt"
            title="Frage stellen oder Terminwunsch senden."
          />
          <ContactForm />
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
