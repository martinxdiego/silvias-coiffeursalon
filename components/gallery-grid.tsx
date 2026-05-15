import Image from "next/image";
import { galleryImages } from "@/data/gallery";

type GalleryGridProps = {
  limit?: number;
};

export function GalleryGrid({ limit }: GalleryGridProps) {
  const images = typeof limit === "number" ? galleryImages.slice(0, limit) : galleryImages;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <figure
          className={`group relative overflow-hidden rounded-[1.75rem] bg-linen shadow-[0_18px_44px_rgba(45,33,27,0.08)] ${
            index === 0 ? "sm:col-span-2" : ""
          }`}
          key={image.src}
        >
          <div className="relative aspect-[4/5] sm:aspect-[5/4]">
            <Image
              alt={image.alt}
              className="object-cover transition duration-500 group-hover:scale-105"
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              src={image.src}
            />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cocoa/82 via-cocoa/34 to-transparent p-5 text-ivory">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sand">
              {image.category}
            </span>
            <p className="mt-1 font-serif text-2xl">{image.title}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
