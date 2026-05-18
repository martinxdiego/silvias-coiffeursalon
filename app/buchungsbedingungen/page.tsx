import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buchungsbedingungen",
  description: "Buchungs- und Stornierungsbedingungen Platzhalter für Silvias Coiffeursalon.",
};

export default function BuchungsbedingungenPage() {
  return (
    <main className="bg-cream px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-cocoa/10 bg-ivory p-8 shadow-[0_22px_70px_rgba(45,33,27,0.1)]">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
          Buchung
        </p>
        <h1 className="font-serif text-4xl leading-tight text-cocoa">
          Buchungs- und Stornierungsbedingungen
        </h1>
        <div className="mt-6 space-y-4 leading-8 text-coffee">
          <p>
            TODO: Finale Buchungsbedingungen, Stornofristen und allfällige
            Gebühren mit Silvia festlegen.
          </p>
          <p>
            Empfohlene Kundenformulierung: Falls du deinen Termin nicht
            wahrnehmen kannst, storniere ihn bitte so früh wie möglich oder
            melde dich direkt per WhatsApp bei Silvia.
          </p>
        </div>
      </section>
    </main>
  );
}
