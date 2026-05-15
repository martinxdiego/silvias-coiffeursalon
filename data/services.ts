export type ServiceCategory = "Damen" | "Herren" | "Kinder" | "Kombinationen";

export type Service = {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  durationMinutes: number;
  priceCHF: number;
  isActive: boolean;
  image: string;
  featured?: boolean;
};

export const serviceCategories: ServiceCategory[] = [
  "Damen",
  "Herren",
  "Kinder",
  "Kombinationen",
];

export const priceNote =
  "Alle Preise sind Richtpreise und können je nach Haarlänge, Aufwand und Beratung leicht variieren.";

export const services: Service[] = [
  {
    id: "damen-waschen-schneiden-foehnen",
    category: "Damen",
    name: "Waschen, Schneiden, Föhnen",
    description: "Klassischer Damenservice mit Beratung, Pflege und schönem Finish.",
    durationMinutes: 60,
    priceCHF: 75,
    isActive: true,
    image: "/images/service-cut.svg",
    featured: true,
  },
  {
    id: "damen-waschen-foehnen",
    category: "Damen",
    name: "Waschen & Föhnen",
    description: "Frisches Styling mit Volumen, Glanz und gepflegtem Fall.",
    durationMinutes: 40,
    priceCHF: 45,
    isActive: true,
    image: "/images/service-styling.svg",
  },
  {
    id: "damen-spitzenschneiden-trocken",
    category: "Damen",
    name: "Spitzenschneiden trocken",
    description: "Schnelle Auffrischung der Längen und Spitzen ohne Waschen.",
    durationMinutes: 30,
    priceCHF: 35,
    isActive: true,
    image: "/images/service-cut.svg",
  },
  {
    id: "damen-ansatzfarbe",
    category: "Damen",
    name: "Ansatzfarbe",
    description: "Saubere Ansatzauffrischung mit typgerechter Farbberatung.",
    durationMinutes: 75,
    priceCHF: 65,
    isActive: true,
    image: "/images/service-color.svg",
    featured: true,
  },
  {
    id: "damen-farbe-komplett",
    category: "Damen",
    name: "Farbe komplett",
    description: "Gleichmässige Farbveredelung für ein gepflegtes Gesamtbild.",
    durationMinutes: 105,
    priceCHF: 95,
    isActive: true,
    image: "/images/service-color.svg",
  },
  {
    id: "damen-toenung",
    category: "Damen",
    name: "Tönung",
    description: "Sanfte Farbauffrischung mit natürlichem Glanz.",
    durationMinutes: 75,
    priceCHF: 70,
    isActive: true,
    image: "/images/service-color.svg",
  },
  {
    id: "damen-meches-straehnen-kurz",
    category: "Damen",
    name: "Mèches / Strähnen kurz",
    description: "Feine Lichtreflexe für kurzes bis mittleres Haar.",
    durationMinutes: 120,
    priceCHF: 90,
    isActive: true,
    image: "/images/gallery-balayage.svg",
  },
  {
    id: "damen-meches-straehnen-lang",
    category: "Damen",
    name: "Mèches / Strähnen lang",
    description: "Weiche Reflexe und helle Akzente für längeres Haar.",
    durationMinutes: 150,
    priceCHF: 140,
    isActive: true,
    image: "/images/gallery-balayage.svg",
  },
  {
    id: "damen-balayage",
    category: "Damen",
    name: "Balayage",
    description: "Natürliche Verläufe und weiche Blondnuancen mit Beratung.",
    durationMinutes: 180,
    priceCHF: 180,
    isActive: true,
    image: "/images/gallery-balayage.svg",
    featured: true,
  },
  {
    id: "damen-hochsteckfrisur",
    category: "Damen",
    name: "Hochsteckfrisur",
    description: "Elegantes Styling für Hochzeit, Feier oder besonderen Anlass.",
    durationMinutes: 75,
    priceCHF: 80,
    isActive: true,
    image: "/images/gallery-styling.svg",
  },
  {
    id: "herren-haarschnitt",
    category: "Herren",
    name: "Herrenhaarschnitt",
    description: "Präziser Schnitt, klassisch oder modern, mit sauberem Finish.",
    durationMinutes: 30,
    priceCHF: 35,
    isActive: true,
    image: "/images/service-styling.svg",
    featured: true,
  },
  {
    id: "herren-waschen-schneiden",
    category: "Herren",
    name: "Waschen & Schneiden",
    description: "Herrenservice mit Waschen, Schnitt und gepflegtem Styling.",
    durationMinutes: 40,
    priceCHF: 45,
    isActive: true,
    image: "/images/service-styling.svg",
  },
  {
    id: "herren-maschinenhaarschnitt",
    category: "Herren",
    name: "Maschinenhaarschnitt",
    description: "Kurz, klar und unkompliziert mit sauberer Kontur.",
    durationMinutes: 20,
    priceCHF: 25,
    isActive: true,
    image: "/images/service-cut.svg",
  },
  {
    id: "herren-bart-trimmen",
    category: "Herren",
    name: "Bart trimmen",
    description: "Konturen und Form für einen gepflegten Bart.",
    durationMinutes: 20,
    priceCHF: 20,
    isActive: true,
    image: "/images/service-care.svg",
  },
  {
    id: "kinder-bis-10",
    category: "Kinder",
    name: "Kinderhaarschnitt bis 10 Jahre",
    description: "Ruhiger Kinderhaarschnitt mit Geduld und sicherer Hand.",
    durationMinutes: 25,
    priceCHF: 25,
    isActive: true,
    image: "/images/service-cut.svg",
    featured: true,
  },
  {
    id: "jugendliche",
    category: "Kinder",
    name: "Jugendliche",
    description: "Frischer Schnitt für Jugendliche, unkompliziert und typgerecht.",
    durationMinutes: 30,
    priceCHF: 30,
    isActive: true,
    image: "/images/service-cut.svg",
  },
  {
    id: "kombi-schneiden-faerben-foehnen",
    category: "Kombinationen",
    name: "Schneiden + Färben + Föhnen",
    description: "Komplette Farbauffrischung mit Schnitt und Finish.",
    durationMinutes: 150,
    priceCHF: 135,
    isActive: true,
    image: "/images/service-color.svg",
    featured: true,
  },
  {
    id: "kombi-schneiden-meches-foehnen",
    category: "Kombinationen",
    name: "Schneiden + Mèches + Föhnen",
    description: "Highlights, Schnitt und Styling in einem Termin.",
    durationMinutes: 180,
    priceCHF: 170,
    isActive: true,
    image: "/images/gallery-balayage.svg",
  },
  {
    id: "kombi-schneiden-balayage-foehnen",
    category: "Kombinationen",
    name: "Schneiden + Balayage + Föhnen",
    description: "Premium-Farbservice mit Schnitt, Balayage und schönem Finish.",
    durationMinutes: 210,
    priceCHF: 230,
    isActive: true,
    image: "/images/gallery-balayage.svg",
  },
];

export const activeServices = services.filter((service) => service.isActive);

export const featuredServices = activeServices.filter((service) => service.featured);

export function getServiceById(id: string) {
  return activeServices.find((service) => service.id === id);
}

export function formatPrice(priceCHF: number) {
  return `CHF ${priceCHF}`;
}

export function formatDuration(durationMinutes: number) {
  if (durationMinutes < 60) {
    return `${durationMinutes} Min.`;
  }

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  return minutes === 0 ? `${hours} Std.` : `${hours} Std. ${minutes} Min.`;
}
