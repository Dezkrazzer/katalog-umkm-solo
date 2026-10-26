import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MapPin } from "lucide-react";

import { daftarKuliner } from "@/data/foodData";
import { daftarUmkmByKuliner } from "@/data/umkm";
import { DetailBackButton } from "@/components/detail-back-button";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { UmkmResults } from "@/components/umkm-results";

export function generateStaticParams() {
  return daftarKuliner.map(({ slug }) => ({ slug }));
}

type FoodDetailContentProps = {
  slug: string;
};

function FoodDetailContent({ slug }: FoodDetailContentProps) {
  const food = daftarKuliner.find((item) => item.slug === slug);
  if (!food) notFound();

  return (
    <>
      <SiteNavbar />
      <DetailBackButton />
      <main className="pt-20">
        <header
          className="relative isolate min-h-[31rem] overflow-hidden bg-background bg-cover bg-center"
          style={{ backgroundImage: `url("${food.gambar}")` }}
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/55 to-background/5" />
          <div className="absolute inset-x-0 top-0 z-0 h-32 bg-gradient-to-b from-background via-background/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-b from-transparent via-background/35 to-background" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-olive">Kuliner khas Surakarta</p>
              <h1 className="mt-3 text-4xl font-semibold text-primary sm:text-6xl">{food.nama}</h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{food.deskripsi}</p>
              <p className="mt-4 leading-relaxed">{food.deskripsiLengkap}</p>
            </div>
          </div>
        </header>
        <section className="mt-12 space-y-4" aria-labelledby="map-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="map-heading" className="text-2xl font-semibold text-primary">Peta Kuliner Solo</h2>
            <div className="mt-4 overflow-hidden rounded-lg border border-border shadow-warm">
              <iframe title={`Peta ${food.nama} di Solo`} src={`https://www.google.com/maps?q=${encodeURIComponent(`${food.nama}, Surakarta`)}&output=embed`} className="h-72 w-full border-0" loading="lazy" />
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 text-gold" />Peta membantu menemukan usaha warga di sekitar kawasan heritage Solo.</p>
          </div>
        </section>
        <div className="mx-auto mt-12 max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <UmkmResults places={daftarUmkmByKuliner[food.slug] ?? []} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function FoodDetailFallback() {
  return <main className="min-h-[60vh] bg-background" aria-label="Memuat detail makanan" />;
}

export default function FoodDetailPage({ params }: PageProps<"/detail/[slug]">) {
  return (
    <Suspense fallback={<FoodDetailFallback />}>
      {params.then(({ slug }) => <FoodDetailContent slug={slug} />)}
    </Suspense>
  );
}
