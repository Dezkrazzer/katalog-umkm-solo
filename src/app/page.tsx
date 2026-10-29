import { SiteNavbar } from "@/components/site-navbar";
import { HeroSection } from "@/components/hero-section";
import { StatisticsSection } from "@/components/statistic-section";
import { HistorySection } from "@/components/history-section";
import { FoodGallery } from "@/components/food-gallery";
import { NutritionSection } from "@/components/nutrition-section";
import { PhotoGallerySection } from "@/components/photo-gallery-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <HeroSection />
      <main>
        <StatisticsSection />
        <HistorySection />
        <FoodGallery />
        <NutritionSection />
        <PhotoGallerySection />
      </main>
      <SiteFooter />
    </>
  );
}
