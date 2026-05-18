"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { galleryCategories, galleryImages, type GalleryCategory } from "@/data/gallery";

type GalleryGridProps = {
  limit?: number;
  showFilters?: boolean;
};

export function GalleryGrid({ limit, showFilters = false }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<"Alle" | GalleryCategory>("Alle");
  const images = useMemo(() => {
    const filtered =
      activeCategory === "Alle"
        ? galleryImages
        : galleryImages.filter((image) => image.category === activeCategory);

    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }, [activeCategory, limit]);

  return (
    <div>
      {showFilters ? (
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2" aria-label="Galerie Filter">
          {galleryCategories.map((category) => {
            const selected = activeCategory === category;

            return (
              <button
                className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition ${
                  selected
                    ? "border-cocoa bg-cocoa text-ivory"
                    : "border-cocoa/10 bg-ivory text-cocoa hover:border-gold/50 hover:bg-white"
                }`}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <figure
            className={`group relative overflow-hidden rounded-[1.75rem] bg-linen shadow-[0_18px_44px_rgba(45,33,27,0.08)] ${
              index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
            } ${index === 3 ? "lg:row-span-2" : ""}`}
            key={image.src}
          >
            <Image
              alt={image.alt}
              className="object-cover transition duration-500 group-hover:scale-105"
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              src={image.src}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/82 via-cocoa/34 to-transparent p-5 text-ivory">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sand">
                {image.category}
              </span>
              <p className="mt-1 font-serif text-2xl">{image.title}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {showFilters ? (
        <p className="mt-5 rounded-3xl bg-cream p-4 text-sm leading-7 text-coffee">
          TODO: Diese Galerie nutzt Platzhalter. Reale Salonfotos, Vorher-Nachher-Bilder
          und Kundenarbeiten können später direkt in <code>data/gallery.ts</code> gepflegt werden.
        </p>
      ) : null}
    </div>
  );
}
