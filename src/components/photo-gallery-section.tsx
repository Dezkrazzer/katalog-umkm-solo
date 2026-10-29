import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";

import { daftarFotoGaleri } from "@/data/galleryData";
import { OrnamentDivider } from "@/components/ornament-divider";
import { PhotoGrid } from "@/components/photo-grid";

const PREVIEW_COUNT = 6;

export function PhotoGallerySection() {
  return (
    <section
      id="galeri-foto"
      aria-labelledby="galeri-foto-judul"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8"
    >
      <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
        <OrnamentDivider className="mb-6" />
        <h2 id="galeri-foto-judul" className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
          Galeri Foto
        </h2>
        <p className="mt-3 max-w-prose text-base text-muted-foreground text-pretty">
          Potret hidangan dan suasana kuliner khas Solo, dari warung pinggir jalan hingga pasar tradisional.
        </p>
      </div>

      <PhotoGrid photos={daftarFotoGaleri.slice(0, PREVIEW_COUNT)} />

      <div className="mt-8 flex flex-col items-center gap-3 text-center">
        <Link
          href="/galeri"
          transitionTypes={["nav-forward"]}
          className="group/more inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-base font-medium text-primary-foreground shadow-warm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-warm-lg focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <Camera aria-hidden="true" className="size-4" />
          Lihat semua {daftarFotoGaleri.length} foto
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover/more:translate-x-1 motion-reduce:transition-none"
          />
        </Link>
        <p className="text-xs text-muted-foreground">
          Foto berlisensi Creative Commons dari Wikimedia Commons. Kredit lengkap tersedia di halaman galeri.
        </p>
      </div>
    </section>
  );
}
