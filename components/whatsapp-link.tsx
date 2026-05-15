import { MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig } from "@/data/site";

type WhatsAppLinkProps = {
  children?: ReactNode;
  className?: string;
};

export function getWhatsAppHref() {
  const message = encodeURIComponent(siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
}

export function WhatsAppLink({ children, className }: WhatsAppLinkProps) {
  return (
    <a
      aria-label="Termin per WhatsApp anfragen"
      className={className}
      href={getWhatsAppHref()}
      rel="noreferrer"
      target="_blank"
    >
      <MessageCircle aria-hidden="true" className="size-4" />
      {children ?? "WhatsApp"}
    </a>
  );
}
