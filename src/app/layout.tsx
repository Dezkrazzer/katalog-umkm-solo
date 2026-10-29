import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import "./globals.css";
import { PrivacyNotice } from "@/components/privacy-notice";
import { SmoothScroll } from "@/components/smooth-scroll";

const siteName = "SoloFood - Cita Rasa Peninggalan: Kuliner Khas Solo";
const siteDescription = "emukan UMKM yang menjual kuliner khas Kota Solo. SoloFood hadir untuk memudahkan pencarian kuliner khas Solo, memberikan informasi yang akurat dan terpercaya, serta membantu pelaku UMKM lokal untuk lebih dikenal.";
const siteUrl = "https://solofood.lzuardiai.my.id";

const metadataBase = new URL(siteUrl);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "SoloFood",
    "solo",
    "food",
    "kuliner solo",
    "kuliner surakarta",
    "umkm solo",
    "umkm kuliner solo",
    "makanan khas solo",
    "makanan solo",
    "makanan surakarta",
    "surakarta",
    "Indonesia",
    "jawa tengah"
  ],
  authors: [{ name: "Kelompok 1", url: siteUrl }],
  creator: "Kelompok 1",
  publisher: "Kelompok 1",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/solofood_logo.png",
        width: 1080,
        height: 1080,
        alt: siteName,
      },
    ],
  },
  // Twitter card
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/solofood_logo.png"],
    creator: "@lzuardiai",
  },
  // Favicons
  icons: {
    icon: "/solofood_logo.png",
    shortcut: "/solofood_logo.png",
    apple: "/solofood_logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#5a3a22",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body>
        {children}
        <PrivacyNotice />
        <SmoothScroll />
      </body>
    </html>
  );
}
