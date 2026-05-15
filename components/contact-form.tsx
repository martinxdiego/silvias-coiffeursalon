import { Send } from "lucide-react";

export function ContactForm() {
  return (
    <form className="rounded-[2rem] border border-cocoa/10 bg-ivory p-5 shadow-[0_18px_50px_rgba(45,33,27,0.08)] sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-cocoa">
          Name
          <input
            className="min-h-12 rounded-2xl border border-cocoa/10 bg-white px-4 text-base outline-none transition placeholder:text-mocha/45 focus:border-gold focus:ring-4 focus:ring-gold/15"
            name="name"
            placeholder="Ihr Name"
            type="text"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-cocoa">
          Telefon oder E-Mail
          <input
            className="min-h-12 rounded-2xl border border-cocoa/10 bg-white px-4 text-base outline-none transition placeholder:text-mocha/45 focus:border-gold focus:ring-4 focus:ring-gold/15"
            name="contact"
            placeholder="+41 ..."
            type="text"
          />
        </label>
      </div>
      <label className="mt-4 grid gap-2 text-sm font-medium text-cocoa">
        Wunsch
        <select
          className="min-h-12 rounded-2xl border border-cocoa/10 bg-white px-4 text-base outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/15"
          defaultValue=""
          name="service"
        >
          <option disabled value="">
            Leistung auswählen
          </option>
          <option>Schnitt</option>
          <option>Farbe</option>
          <option>Balayage</option>
          <option>Styling</option>
          <option>Beratung</option>
        </select>
      </label>
      <label className="mt-4 grid gap-2 text-sm font-medium text-cocoa">
        Nachricht
        <textarea
          className="min-h-32 resize-y rounded-2xl border border-cocoa/10 bg-white px-4 py-3 text-base outline-none transition placeholder:text-mocha/45 focus:border-gold focus:ring-4 focus:ring-gold/15"
          name="message"
          placeholder="Wann passt es Ihnen und was wünschen Sie sich?"
        />
      </label>
      {/* TODO: Connect this form to a form service or email workflow before launch. */}
      <button
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cocoa px-6 text-sm font-semibold text-ivory transition hover:bg-coffee focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-ivory sm:w-auto"
        type="button"
      >
        <Send aria-hidden="true" className="size-4" />
        Anfrage senden
      </button>
    </form>
  );
}
