import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

import { daftarKuliner } from "@/data/foodData";
import { daftarUmkmByKuliner } from "@/data/umkm";
import { FoodImage } from "@/components/food-image";
import { UmkmResults } from "@/components/umkm-results";

export function generateStaticParams() {
  return daftarKuliner.map(({ slug }) => ({ slug }));
}

export default async function FoodDetailPage({ params }: PageProps<"/detail/[slug]">) {
  const { slug } = await params;
  const food = daftarKuliner.find((item) => item.slug === slug);
  if (!food) notFound();

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/#kuliner" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          <ArrowLeft className="size-4" /> Kembali ke daftar kuliner
        </Link>
        <article className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-lg border border-border bg-muted shadow-warm">
            <div className="relative aspect-[4/3]">
              <FoodImage src={food.gambar} alt={`Hidangan ${food.nama}`} name={food.nama} sizes="(min-width: 1024px) 50vw, 100vw" eager />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-olive">Kuliner khas Surakarta</p>
            <h1 className="mt-3 text-4xl font-semibold text-primary sm:text-5xl">{food.nama}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{food.deskripsi}</p>
            <p className="mt-4 leading-relaxed">{food.deskripsiLengkap}</p>
          </div>
        </article>
        <section className="mt-12 space-y-4" aria-labelledby="map-heading">
          <h2 id="map-heading" className="text-2xl font-semibold text-primary">Peta Kuliner Solo</h2>
          <div className="overflow-hidden rounded-lg border border-border shadow-warm">
            <iframe title={`Peta ${food.nama} di Solo`} src={`https://www.google.com/maps?q=${encodeURIComponent(`${food.nama}, Surakarta`)}&output=embed`} className="h-72 w-full border-0" loading="lazy" />
          </div>
          <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 text-gold" />Peta membantu menemukan usaha warga di sekitar kawasan heritage Solo.</p>
        </section>
        <div className="mt-12"><UmkmResults places={daftarUmkmByKuliner[food.slug] ?? []} /></div>
      </main>
    </>
  );
}
