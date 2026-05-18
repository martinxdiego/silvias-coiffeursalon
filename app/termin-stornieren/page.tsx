import type { Metadata } from "next";
import { CancellationForm } from "@/components/cancellation-form";
import { SectionHeader } from "@/components/section-header";

export const metadata: Metadata = {
  title: "Termin stornieren",
  description:
    "Termin bei Silvias Coiffeursalon stornieren. Buchungsnummer und E-Mail oder Stornocode eingeben.",
};

export default async function TerminStornierenPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; token?: string }>;
}) {
  const { id, token } = await searchParams;

  return (
    <main className="bg-cream">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <SectionHeader
          description="Kunden können ihren Termin bis 24 Stunden vor dem Termin kostenlos stornieren. Bei kurzfristigen Änderungen oder Absagen bitten wir um direkte Kontaktaufnahme per WhatsApp oder Telefon."
          eyebrow="Stornierung"
          title="Ein Termin soll fair planbar bleiben."
        />
        <CancellationForm initialBookingId={id} initialToken={token} />
      </section>
    </main>
  );
}
