import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutz Platzhalter für Silvias Coiffeursalon.",
};

export default function DatenschutzPage() {
  return (
    <main className="bg-cream px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-cocoa/10 bg-ivory p-8 shadow-[0_22px_70px_rgba(45,33,27,0.1)]">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
          Rechtliches
        </p>
        <h1 className="font-serif text-4xl leading-tight text-cocoa">
          Datenschutz
        </h1>
        <div className="mt-6 space-y-4 leading-8 text-coffee">
          <p>
            TODO: Finalen Datenschutztext für die Schweiz ergänzen, bevor echte
            Kundendaten über Formular, Buchung, E-Mail, Datenbank oder Analyse
            verarbeitet werden.
          </p>
          <p>
            Aktuell ist die Online-Buchung als Prototyp vorbereitet. Für die
            Produktion müssen Datenbank, E-Mail-Versand, Aufbewahrung und
            Löschung klar dokumentiert werden.
          </p>
        </div>
      </section>
    </main>
  );
}
