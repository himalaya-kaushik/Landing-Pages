import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/**
 * @description Global SEO metadata targeting premium lounge keywords
 * in Panchkula. Includes OpenGraph and Twitter card configuration.
 */
export const metadata: Metadata = {
  title: "The Falcon Cafe & Lounge | Best Lounge in Panchkula",
  description:
    "Premium dining, craft cocktails, and live music at The Falcon Cafe & Lounge, Sector 16, Panchkula. Book your table today.",
  keywords: [
    "Best lounge in Panchkula",
    "The Falcon Cafe Sector 16",
    "Live music Panchkula",
    "Premium dining Panchkula",
    "Craft cocktails Tricity",
    "Fine dining Chandigarh",
  ],
  authors: [{ name: "The Falcon Cafe & Lounge" }],
  openGraph: {
    title: "The Falcon Cafe & Lounge | Culinary Elevation",
    description:
      "Panchkula's finest lounge & kitchen. Premium dining, live entertainment, and handcrafted cocktails in Sector 16.",
    url: "https://thefalconcafe.com",
    siteName: "The Falcon Cafe & Lounge",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Falcon Cafe & Lounge",
    description:
      "Culinary elevation in the heart of Panchkula. Premium dining, live music, craft cocktails.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * @description JSON-LD structured data for the Restaurant schema.
 * Helps search engines understand the business details including
 * opening hours, cuisine type, location, and pricing.
 */
const RESTAURANT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "The Falcon Cafe & Lounge",
  description:
    "Premium dining, craft cocktails, and live entertainment in Panchkula.",
  url: "https://thefalconcafe.com",
  telephone: "+91-172-000-0000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sector 16",
    addressLocality: "Panchkula",
    addressRegion: "Haryana",
    postalCode: "134109",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "30.6942",
    longitude: "76.8606",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:30",
    closes: "23:00",
  },
  servesCuisine: ["Multi-Cuisine", "Continental", "Indian", "Asian Fusion"],
  priceRange: "₹₹₹",
  image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
  acceptsReservations: "True",
};

/**
 * @description Root layout component for The Falcon Cafe.
 * Sets the Inter font, dark theme, and injects JSON-LD schema.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content to render.
 * @returns {JSX.Element} The root HTML layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(RESTAURANT_SCHEMA),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
