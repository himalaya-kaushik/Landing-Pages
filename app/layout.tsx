import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";

config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://restaurant-falcon.vercel.app"),
  title: {
    default: "Falcon Restaurant | Fresh Food and Live Events",
    template: "%s | Falcon Restaurant",
  },
  description:
    "Experience signature dishes, reserve tables online, and discover live events at Falcon Restaurant.",
  keywords: [
    "restaurant landing page",
    "book a table",
    "live events",
    "special dishes",
    "Falcon Restaurant",
  ],
  authors: [{ name: "Falcon Restaurant" }],
  creator: "Falcon Restaurant",
  publisher: "Falcon Restaurant",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Falcon Restaurant | Fresh Food and Live Events",
    description:
      "Discover chef-crafted dishes, upcoming live events, and an easy reservation experience at Falcon Restaurant.",
    url: "/",
    siteName: "Falcon Restaurant",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "A curated table spread at Falcon Restaurant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Falcon Restaurant | Fresh Food and Live Events",
    description:
      "Reserve your table, explore signature dishes, and check the latest live events.",
    images: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
