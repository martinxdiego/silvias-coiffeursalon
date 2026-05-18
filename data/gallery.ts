export type GalleryCategory = "Farbe" | "Schnitt" | "Styling" | "Salon" | "Pflege";

export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  category: GalleryCategory;
};

export const galleryCategories: Array<"Alle" | GalleryCategory> = [
  "Alle",
  "Farbe",
  "Schnitt",
  "Styling",
  "Salon",
  "Pflege",
];

// TODO: Replace placeholder images with real salon photos and finished customer work.
export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery-balayage.svg",
    alt: "Natürliche Balayage mit warmen Reflexen",
    title: "Soft Balayage",
    category: "Farbe",
  },
  {
    src: "/images/gallery-cut.svg",
    alt: "Moderner Haarschnitt mit gepflegtem Finish",
    title: "Frischer Schnitt",
    category: "Schnitt",
  },
  {
    src: "/images/gallery-styling.svg",
    alt: "Elegantes Styling für einen Anlass",
    title: "Anlass Styling",
    category: "Styling",
  },
  {
    src: "/images/gallery-salon.svg",
    alt: "Warmer Salonbereich mit Stylingplatz",
    title: "Salon Stimmung",
    category: "Salon",
  },
  {
    src: "/images/service-color.svg",
    alt: "Sanfte Haarfarbe in warmen Nuancen",
    title: "Farbe & Glanz",
    category: "Farbe",
  },
  {
    src: "/images/service-care.svg",
    alt: "Pflege Ritual für gesund glänzendes Haar",
    title: "Pflege",
    category: "Pflege",
  },
];
