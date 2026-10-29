import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SoloFood - Kuliner Khas Solo",
    short_name: "SoloFood",
    description: "Katalog kuliner khas Solo dan UMKM yang menjualnya.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6efe1",
    theme_color: "#5a3a22",
    lang: "id",
    icons: [{ src: "/solofood_logo.png", sizes: "1080x1080", type: "image/png" }],
  };
}
