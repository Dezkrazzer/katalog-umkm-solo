import type { MetadataRoute } from "next";

import { daftarKuliner } from "@/data/foodData";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...daftarKuliner.map((food) => ({
      url: `${SITE_URL}/detail/${food.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [`${SITE_URL}${food.gambar}`],
    })),
    { url: `${SITE_URL}/galeri`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privasi`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
