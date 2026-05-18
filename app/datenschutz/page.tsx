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
            TODO: Datenschutztext vor Go-live rechtlich prüfen. Diese Seite ist
            ein strukturierter Platzhalter und ersetzt keine finale rechtliche
            Prüfung.
          </p>
          {[
            {
              title: "Kontaktformular",
              text: "Das Kontaktformular ist aktuell als UI vorbereitet. Vor echtem Versand muss dokumentiert werden, welche Angaben gespeichert oder per E-Mail weitergeleitet werden.",
            },
            {
              title: "Buchungsformular",
              text: "Die Online-Buchung erfasst Name, Telefon, E-Mail, Leistung, Terminwunsch, Zahlungsart und optionale Notizen. Ohne echte Datenbank werden diese Daten nur im laufenden Prototyp gehalten.",
            },
            {
              title: "E-Mail-Kommunikation",
              text: "Für spätere Bestätigungen ist eine Notification-Struktur vorbereitet. Sobald ein Provider wie Resend genutzt wird, müssen Absender, Empfänger, Aufbewahrung und Inhalte final beschrieben werden.",
            },
            {
              title: "WhatsApp-Kommunikation",
              text: "WhatsApp-Buttons öffnen eine vorgefüllte Nachricht. Beim Versand gelten zusätzlich die Datenschutzbedingungen von WhatsApp/Meta.",
            },
            {
              title: "Hosting",
              text: "Die Website wird aktuell über Vercel bereitgestellt. Vor Go-live sollten Hosting, Serverstandort und Log-Verarbeitung final geprüft werden.",
            },
            {
              title: "Cookies und Analytics",
              text: "Aktuell ist keine Analytics- oder Tracking-Integration vorgesehen. Falls später Analytics genutzt wird, muss diese Datenschutzerklärung erweitert werden.",
            },
          ].map((section) => (
            <section className="rounded-3xl bg-cream p-5" key={section.title}>
              <h2 className="font-serif text-2xl text-cocoa">{section.title}</h2>
              <p className="mt-2">{section.text}</p>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
