import Image from "next/image";
import { BookingLink } from "@/components/booking-link";
import type { Service } from "@/data/services";
import { formatDuration, formatPrice } from "@/data/services";

type ServiceCardProps = {
  service: Service;
  compact?: boolean;
};

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-cocoa/10 bg-ivory shadow-[0_18px_50px_rgba(45,33,27,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(45,33,27,0.13)]">
      {!compact ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-linen">
          <Image
            alt=""
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            src={service.image}
          />
        </div>
      ) : null}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {service.category}
            </p>
            <h3 className="font-serif text-2xl leading-tight text-cocoa">
              {service.name}
            </h3>
          </div>
          {service.featured ? (
            <span className="rounded-full bg-sand/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cocoa">
              Beliebt
            </span>
          ) : null}
        </div>
        <p className="mt-4 min-h-20 text-sm leading-7 text-coffee">
          {service.description}
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-cocoa/10 pt-5 text-sm">
          <span className="text-mocha">{formatDuration(service.durationMinutes)}</span>
          <span className="font-semibold text-cocoa">
            {formatPrice(service.priceCHF)}
          </span>
        </div>
        <BookingLink
          className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-cocoa px-5 text-sm font-semibold text-ivory transition hover:bg-coffee focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-ivory"
          serviceId={service.id}
        >
          Diese Leistung buchen
        </BookingLink>
      </div>
    </article>
  );
}
