import { CalendarDays, Phone } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { WhatsAppLink } from "@/components/whatsapp-link";

export function MobileBottomCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cocoa/10 bg-ivory/95 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-16px_40px_rgba(45,33,27,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        <a
          className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-cocoa/15 bg-white text-sm font-semibold text-cocoa"
          href={`tel:${siteConfig.mobileHref}`}
        >
          <Phone aria-hidden="true" className="size-4" />
          Anrufen
        </a>
        <WhatsAppLink className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-cocoa/15 bg-white text-sm font-semibold text-cocoa" />
        <Link
          className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full bg-cocoa text-sm font-semibold text-ivory"
          href={siteConfig.bookingPath}
        >
          <CalendarDays aria-hidden="true" className="size-4" />
          Buchen
        </Link>
      </div>
    </div>
  );
}
