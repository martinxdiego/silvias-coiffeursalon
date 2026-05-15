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
  // TODO: Replace with the real production domain before launch.
  url: "https://www.silvias-coiffeursalon.ch",
  // TODO: Add the real Google Business profile URL when available.
  googleBusinessUrl: "",
  // TODO: Add an external booking URL only if a separate booking provider is used later.
  externalBookingUrl: "",
  mapLabel: "Google Maps Standort von Silvias Coiffeursalon",
  description:
    "Persönlicher Coiffeur in Emmenbrücke bei Luzern. Damen, Herren, Kinder, Schneiden, Föhnen, Färben und Beratung bei Silvias Coiffeursalon.",
  keywords: [
    "Coiffeur Emmenbrücke",
    "Coiffeur Luzern",
    "Damen Coiffeur Emmenbrücke",
    "Herren Coiffeur Emmenbrücke",
    "Haare schneiden Emmenbrücke",
    "Färben Luzern",
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
    "Persönlicher Coiffeur in Emmenbrücke. Damen, Herren, Kinder, Schneiden, Föhnen, Färben und Beratung. Jetzt Termin bei Silvias Coiffeursalon buchen.",
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
