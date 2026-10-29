import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

import { daftarFotoGaleri } from "@/data/galleryData";
import { OrnamentDivider } from "@/components/ornament-divider";
import { PhotoGrid } from "@/components/photo-grid";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Galeri Foto Kuliner Solo",
  description:
    "Kumpulan foto kuliner khas Solo: nasi liwet, selat, serabi, timlo, tengkleng, cabuk rambak, dan suasana pusat kuliner Galabo.",
  alternates: { canonical: "/galeri" },
  openGraph: { url: "/galeri" },
};

export default function GalleryPage() {
  return (
    <>
      <SiteNavbar />
      <PageTransition>
        <main className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-8">
          <header className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center">
            <p className="text-sm font-medium tracking-[0.2em] text-olive uppercase">Galeri</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
              Potret Kuliner Solo
            </h1>
            <p className="mt-4 max-w-prose text-base text-muted-foreground text-pretty">
              {daftarFotoGaleri.length} foto hidangan dan suasana kuliner khas Surakarta. Klik foto untuk
              melihat ukuran penuh beserta sumbernya.
            </p>
            <OrnamentDivider className="mt-6" />
          </header>

          <PhotoGrid photos={daftarFotoGaleri} />

          <section aria-labelledby="kredit-foto" className="mt-16 rounded-2xl border border-gold/40 bg-card/80 p-5 shadow-warm sm:p-8">
            <h2 id="kredit-foto" className="text-2xl font-semibold text-primary">
              Sumber &amp; Kredit Foto
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Seluruh foto berasal dari Wikimedia Commons dan digunakan sesuai lisensinya. Foto telah
              diperkecil dan dikompresi ulang untuk web tanpa perubahan isi.
            </p>
            <ul role="list" className="mt-5 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
              {daftarFotoGaleri.map((photo) => (
                <li key={photo.id} className="flex flex-wrap items-baseline gap-x-1.5 border-b border-border py-2">
                  <span className="font-medium text-foreground">{photo.judul}</span>
                  <span className="text-muted-foreground">oleh {photo.author},</span>
                  <a
                    href={photo.licenseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-olive underline-offset-4 hover:underline"
                  >
                    {photo.license}
                  </a>
                  <a
                    href={photo.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Sumber foto ${photo.judul} di Wikimedia Commons`}
                    className="inline-flex items-center text-primary transition-colors hover:text-gold"
                  >
                    <ExternalLink aria-hidden="true" className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </main>
        <SiteFooter />
      </PageTransition>
    </>
  );
}
