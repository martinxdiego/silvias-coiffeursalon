import { CalendarDays } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/data/site";

type BookingLinkProps = {
  children?: ReactNode;
  className?: string;
  serviceId?: string;
};

export function BookingLink({ children, className, serviceId }: BookingLinkProps) {
  const href = serviceId
    ? `${siteConfig.bookingPath}?service=${serviceId}`
    : siteConfig.bookingPath;

  return (
    <Link className={className} href={href}>
      <CalendarDays aria-hidden="true" className="size-4" />
      {children ?? "Termin buchen"}
    </Link>
  );
}
