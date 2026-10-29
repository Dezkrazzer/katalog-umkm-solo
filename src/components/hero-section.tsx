import Image from "next/image";

import { KawungMark, OrnamentDivider } from "@/components/ornament-divider";
import { ExploreButton } from "@/components/explore-button";

const HERO_IMAGE =
  "https://www.indonesia.travel/contentassets/3a72994879c64455ba0d13c86cdafe30/keraton-surakarta.webp";

/**
 * Animasi masuk memakai CSS (bukan JavaScript) agar judul langsung tampil
 * sebelum hydration, sehingga Largest Contentful Paint tidak tertunda.
 */
const ENTER = "animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-both motion-reduce:animate-none";

export function HeroSection() {
  return (
    <header id="beranda" className="relative isolate flex min-h-[100svh] items-center overflow-hidden border-b border-gold/30">
      {/* Background Keraton Solo dengan Gradasi/Transparency Highlight */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-background">
        {/* Gambar Background */}
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          quality={60}
          className="object-cover object-center opacity-60"
        />
        {/* Gradasi Highlight agar teks tetap terbaca dengan jelas */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />

        {/* Faint ornament field + warm vignette yang sudah ada sebelumnya */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(176_141_87/0.18),transparent_60%)]" />
        <KawungMark className="absolute -bottom-2 -left-10 size-48 text-gold/15 sm:size-64" />
        <KawungMark className="absolute -right-12 -top-12 size-56 text-gold/15 sm:size-80" />
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-24 pb-16 text-center sm:px-6 lg:px-8">
        <p className={`${ENTER} mb-5 text-sm font-medium tracking-[0.2em] text-olive uppercase`}>
          Surakarta · Jawa Tengah
        </p>

        {/* Judul tidak dianimasikan dari opacity 0 karena merupakan elemen LCP. */}
        <h1 className="font-display max-w-full scale-x-[1.02] text-5xl leading-[1.05] tracking-tight text-primary text-balance sm:scale-x-[1.05] sm:text-6xl lg:scale-x-[1.08] lg:text-8xl">
          Cita Rasa Peninggalan: Jelajah Kuliner Khas Solo
        </h1>

        <p className={`${ENTER} mt-6 max-w-prose text-base leading-relaxed text-muted-foreground text-pretty delay-100 sm:text-lg`}>
          Daerah Surakarta mempunyai kekayaan kuliner yang khas, dengan berbagai hidangan tradisional yang menggambarkan budaya dan sejarahnya.
        </p>

        <div className={`${ENTER} mt-8 delay-200`}>
          <OrnamentDivider />
        </div>

        <div className={`${ENTER} mt-8 delay-300`}>
          <ExploreButton />
        </div>
      </div>
    </header>
  );
}
