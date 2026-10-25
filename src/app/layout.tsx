import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cita Rasa Peninggalan — Kuliner Khas Solo",
  description:
    "Katalog UMKM kuliner khas Surakarta (Solo): nasi liwet, tengkleng, serabi, selat Solo, dan lainnya. Proyek demo dengan data contoh.",
};

export const viewport: Viewport = {
  themeColor: "#5a3a22",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
