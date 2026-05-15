export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

// TODO: Replace with real customer reviews from Silvias Coiffeursalon.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Silvia nimmt sich Zeit, hört gut zu und der Schnitt sitzt auch nach Wochen noch schön.",
    name: "Kundin aus Emmenbrücke",
    detail: "Damenhaarschnitt",
  },
  {
    quote:
      "Sehr unkompliziert, freundlich und zuverlässig. Ich komme gerne wieder.",
    name: "Kunde aus Luzern",
    detail: "Herrenhaarschnitt",
  },
  {
    quote:
      "Die Farbe wirkt natürlich und gepflegt. Genau so habe ich es mir vorgestellt.",
    name: "Stammkundin",
    detail: "Farbe & Föhnen",
  },
];
