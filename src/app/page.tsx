import { SiteNavbar } from "@/components/site-navbar";
import { HeroSection } from "@/components/hero-section";
import { StatisticsSection } from "@/components/statistic-section";
import { HistorySection } from "@/components/history-section";
import { FoodGallery } from "@/components/food-gallery";
import { NutritionSection } from "@/components/nutrition-section";
import { PhotoGallerySection } from "@/components/photo-gallery-section";
import { SiteFooter } from "@/components/site-footer";
import { PageTransition } from "@/components/page-transition";
import { JsonLd } from "@/components/json-ld";
import { daftarKuliner } from "@/data/foodData";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "id-ID",
      description: "Katalog kuliner khas Solo dan UMKM yang menjualnya.",
    },
    {
      "@type": "ItemList",
      name: "Kuliner khas Solo",
      itemListElement: daftarKuliner.map((food, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: food.nama,
        url: `${SITE_URL}/detail/${food.slug}`,
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteNavbar />
      <PageTransition>
        <HeroSection />
        <main>
          <StatisticsSection />
          <HistorySection />
          <FoodGallery />
          <NutritionSection />
          <PhotoGallerySection />
        </main>
        <SiteFooter />
      </PageTransition>
    </>
  );
}
