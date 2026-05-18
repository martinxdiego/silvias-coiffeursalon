import type { Metadata, Viewport } from "next";
import "./globals.css";
import { MobileBottomCta } from "@/components/mobile-bottom-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { baseMetadata, siteConfig } from "@/data/site";

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf6ee",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: siteConfig.name,
  description: siteConfig.description,
  image: `${siteConfig.url}/images/hero-salon.svg`,
  url: siteConfig.url,
  telephone: siteConfig.mobileDisplay,
  email: siteConfig.email,
  priceRange: "CHF",
  sameAs: siteConfig.googleBusinessUrl.startsWith("https://")
    ? [siteConfig.googleBusinessUrl]
    : [],
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.postalCode,
    addressLocality: siteConfig.address.locality,
    addressCountry: siteConfig.address.country,
  },
  // TODO: Add exact geo coordinates after the Google Business profile is configured.
  geo: {
    "@type": "GeoCoordinates",
    latitude: "47.0780",
    longitude: "8.2730",
  },
  openingHoursSpecification: siteConfig.schemaOpeningHours.map((hours) => ({
    "@type": "OpeningHoursSpecification",
    ...hours,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH">
      <body className="pb-20 antialiased md:pb-0">
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
          type="application/ld+json"
        />
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileBottomCta />
      </body>
    </html>
  );
}
