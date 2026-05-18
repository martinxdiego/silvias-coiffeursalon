import type { Metadata } from "next";

export const siteConfig = {
  name: "Silvias Coiffeursalon",
  ownerName: "Silvia Perez Perez",
  location: "Emmenbrücke, Luzern",
  region: "Luzern / Emmenbrücke",
  address: {
    street: "Benziwilstrasse 4a",
    postalCode: "6020",
    locality: "Emmenbrücke",
    country: "CH",
  },
  addressLines: ["Benziwilstrasse 4a", "6020 Emmenbrücke"],
  email: "silviadeverin@gmail.com",
  mobileDisplay: "+41 76 317 80 43",
  mobileHref: "+41763178043",
  landlineDisplay: "041 280 97 45",
  landlineHref: "+41412809745",
  whatsappNumber: "41763178043",
  whatsappMessage:
    "Hallo Silvia, ich möchte gerne einen Termin in Silvias Coiffeursalon vereinbaren.",
  bookingPath: "/online-buchen",
  cancellationPath: "/termin-stornieren",
  url: "https://silvias-coiffeursalon.vercel.app",
  domainPlaceholder: "silvias-coiffeursalon.ch",
  ownerIntro:
    "Silvia Perez Perez ist die Inhaberin von Silvias Coiffeursalon in Emmenbrücke. Ihr Ziel ist es, dass sich jede Kundin und jeder Kunde persönlich beraten, wohl und verstanden fühlt. Im Mittelpunkt stehen ehrliches Handwerk, eine ruhige Atmosphäre und Frisuren, die zum Menschen und zum Alltag passen.",
  // TODO: Add the real Google Business profile URL when available.
  googleBusinessUrl: "TODO_GOOGLE_BUSINESS_PROFILE_LINK",
  // TODO: Replace with the real Google Maps embed/share URL after the Google Business profile is claimed.
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Benziwilstrasse%204a%2C%206020%20Emmenbr%C3%BCcke%2C%20Schweiz",
  // TODO: Finalen Google Maps Embed Link nach Erstellung/Verifizierung des Google Business Profils ersetzen.
  googleMapsEmbedUrl: "TODO_GOOGLE_MAPS_EMBED_LINK",
  // TODO: Add an external booking URL only if a separate booking provider is used later.
  externalBookingUrl: "",
  legalLinks: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "Buchungsbedingungen", href: "/buchungsbedingungen" },
  ],
  mapLabel: "Google Maps Standort von Silvias Coiffeursalon",
  description:
    "Persönlicher Coiffeur in Emmenbrücke für Damen, Herren und Kinder. Schneiden, Föhnen, Färben, Balayage und Beratung bei Silvias Coiffeursalon.",
  keywords: [
    "Coiffeur Emmenbrücke",
    "Coiffeur Luzern",
    "Damen Coiffeur Emmenbrücke",
    "Herren Coiffeur Emmenbrücke",
    "Haare schneiden Emmenbrücke",
    "Haare färben Luzern",
    "Balayage Emmenbrücke",
    "Silvias Coiffeursalon",
  ],
  openingHours: [
    { day: "Montag", hours: "07:00-19:00" },
    { day: "Dienstag", hours: "07:00-19:00" },
    { day: "Mittwoch", hours: "07:00-19:00" },
    { day: "Donnerstag", hours: "07:00-19:00" },
    { day: "Freitag", hours: "07:00-19:00" },
    { day: "Samstag", hours: "08:00-17:00" },
    { day: "Sonntag", hours: "Geschlossen" },
  ],
  schemaOpeningHours: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "19:00",
    },
    {
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "17:00",
    },
  ],
};

export const navItems = [
  { label: "Startseite", href: "/" },
  { label: "Leistungen", href: "/leistungen" },
  { label: "Online buchen", href: "/online-buchen" },
  { label: "Galerie", href: "/galerie" },
  { label: "Über Silvia", href: "/ueber-mich" },
  { label: "Kontakt", href: "/kontakt" },
];

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Silvias Coiffeursalon | Coiffeur in Emmenbrücke & Luzern",
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Persönlicher Coiffeur in Emmenbrücke für Damen, Herren und Kinder. Schneiden, Föhnen, Färben, Balayage und Beratung bei Silvias Coiffeursalon.",
  keywords: siteConfig.keywords,
  openGraph: {
    title: "Silvias Coiffeursalon | Coiffeur in Emmenbrücke & Luzern",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "de_CH",
    type: "website",
    images: [
      {
        url: "/images/hero-salon.svg",
        width: 1200,
        height: 900,
        alt: "Silvias Coiffeursalon in Emmenbrücke",
      },
    ],
  },
  alternates: {
    canonical: siteConfig.url,
  },
};
