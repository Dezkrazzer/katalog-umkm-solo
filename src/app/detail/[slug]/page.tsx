import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MapPin } from "lucide-react";

import { daftarKuliner } from "@/data/foodData";
import { daftarUmkmByKuliner } from "@/data/umkm";
import { DetailBackButton } from "@/components/detail-back-button";
import { JsonLd } from "@/components/json-ld";
import { MapEmbed } from "@/components/map-embed";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { UmkmResults } from "@/components/umkm-results";
import { PageTransition } from "@/components/page-transition";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return daftarKuliner.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/detail/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const food = daftarKuliner.find((item) => item.slug === slug);
  if (!food) return {};

  const title = `${food.nama} Khas Solo`;
  const umkmCount = daftarUmkmByKuliner[food.slug]?.length ?? 0;
  const description = `${food.deskripsi} Temukan ${umkmCount} UMKM yang menjual ${food.nama} di Surakarta.`;
  return {
    title,
    description,
    alternates: { canonical: `/detail/${food.slug}` },
    openGraph: {
      type: "article",
      url: `/detail/${food.slug}`,
      title,
      description,
      images: [{ url: food.gambar, alt: `Hidangan ${food.nama}` }],
    },
    twitter: { title, description, images: [food.gambar] },
  };
}

type FoodDetailContentProps = {
  slug: string;
};

function FoodDetailContent({ slug }: FoodDetailContentProps) {
  const food = daftarKuliner.find((item) => item.slug === slug);
  if (!food) notFound();
  const places = daftarUmkmByKuliner[food.slug] ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: food.nama, item: `${SITE_URL}/detail/${food.slug}` },
        ],
      },
      {
        "@type": "ItemList",
        name: `UMKM penjual ${food.nama} di Solo`,
        numberOfItems: places.length,
        itemListElement: places.slice(0, 20).map((place, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Restaurant",
            name: place.nama,
            servesCuisine: "Jawa",
            ...(place.alamat && {
              address: {
                "@type": "PostalAddress",
                streetAddress: place.alamat,
                addressLocality: "Surakarta",
                addressCountry: "ID",
              },
            }),
            ...(place.latitude !== null &&
              place.longitude !== null && {
                geo: { "@type": "GeoCoordinates", latitude: place.latitude, longitude: place.longitude },
              }),
            ...(place.rentangHarga && { priceRange: place.rentangHarga }),
            hasMap: place.mapsUrl,
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="pt-20">
        <header className="relative isolate min-h-124 overflow-hidden bg-background">
          <Image
            src={food.gambar}
            alt=""
            fill
            preload
            fetchPriority="high"
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-background via-background/55 to-background/5" />
          <div className="absolute inset-x-0 top-0 z-0 h-32 bg-linear-to-b from-background via-background/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-0 h-40 bg-linear-to-b from-transparent via-background/35 to-background" />
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-olive">Kuliner khas Surakarta</p>
              <h1 className="mt-3 text-4xl font-semibold text-primary sm:text-6xl">{food.nama}</h1>
              <p className="mt-5 text-lg leading-relaxed text-[#5A3A22]">{food.deskripsi}</p>
              <p className="mt-4 leading-relaxed">{food.deskripsiLengkap}</p>
            </div>
          </div>
        </header>
        <section className="mt-12 space-y-4" aria-labelledby="map-heading">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 id="map-heading" className="text-2xl font-semibold text-primary">Peta Kuliner Solo</h2>
            <div className="mt-4 overflow-hidden rounded-lg border border-border shadow-warm">
              <MapEmbed title={`Peta ${food.nama} di Solo`} query={`${food.nama}, Surakarta`} />
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 text-gold" />Peta membantu menemukan usaha warga di sekitar kawasan heritage Solo.</p>
          </div>
        </section>
        <div className="mx-auto mt-12 max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <UmkmResults places={places} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

/** Skeleton selama konten detail dimuat. */
function FoodDetailFallback() {
  return (
    <main className="pt-20" aria-busy="true" aria-label="Memuat detail makanan">
      <div className="mx-auto max-w-6xl animate-pulse px-4 py-16 motion-reduce:animate-none sm:px-6 sm:py-20">
        <div className="h-4 w-48 rounded-full bg-muted" />
        <div className="mt-4 h-14 w-2/3 max-w-md rounded-lg bg-muted" />
        <div className="mt-6 space-y-3">
          <div className="h-4 w-full max-w-2xl rounded-full bg-muted" />
          <div className="h-4 w-5/6 max-w-xl rounded-full bg-muted" />
          <div className="h-4 w-3/4 max-w-lg rounded-full bg-muted" />
        </div>
        <div className="mt-16 h-72 rounded-lg bg-muted" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-56 rounded-2xl bg-muted" />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function FoodDetailPage({ params }: PageProps<"/detail/[slug]">) {
  return (
    <>
      <SiteNavbar />
      <DetailBackButton />
      <PageTransition>
        <Suspense fallback={<FoodDetailFallback />}>
          {params.then(({ slug }) => <FoodDetailContent slug={slug} />)}
        </Suspense>
      </PageTransition>
    </>
  );
}
