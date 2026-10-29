import { cacheLife } from "next/cache";
import Image from "next/image";
import Link from "next/link";

import { KawungMark, OrnamentDivider, ParangPattern } from "@/components/ornament-divider";

const APP_NAME = "SoloFood";
const APP_TAGLINE = "Jelajah Kuliner Khas Solo";
const APP_DESCRIPTION =
  "Di era digital sekarang ini, mencari informasi mengenai UMKM yang menjual kuliner khas Kota Solo bisa menjadi tantangan. SoloFood hadir untuk memudahkan pencarian kuliner khas Solo, memberikan informasi yang akurat dan terpercaya, serta membantu pelaku UMKM lokal untuk lebih dikenal.";

/**
 * Catatan: GALLERY_ID tidak diimpor dari hero-section karena file itu bertanda
 * "use client", sehingga nilainya tidak bisa dipakai di Server Component ini.
 */
const QUICK_LINKS = [
  { label: "Beranda", href: "/#beranda" },
  { label: "Daftar Kuliner", href: "/#galeri" },
  { label: "Kandungan Gizi", href: "/#kandungan" },
  { label: "Galeri Foto", href: "/galeri" },
  { label: "Kebijakan Privasi", href: "/privasi" },
];

// Ganti dengan nama dan NIM anggota kelompok yang sebenarnya.
const TEAM_MEMBERS = [
  { name: "Lazuardi Akbar Imani", id: "L0125105" },
  { name: "Miftahul Habibi", id: "L0125084" },
  { name: "Lucyana Dora Noviyanti", id: "L0125121" },
  { name: "Phoebe Theodore Beatrice", id: "L0125060" },
  { name: "Egifrid Angelo Mwoleka", id: "L0125096" },
];

/**
 * The year is read at runtime but cached, because Cache Components does not
 * allow `new Date()` in the prerendered shell. It refreshes daily.
 */
async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await getCurrentYear();

  return (
    <footer id="tentang" className="relative isolate scroll-mt-20 overflow-hidden border-t border-gold/30">
      {/* Background: parang vektor + gradasi, sejalan dengan hero section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-background">
        {/* Pola parang, memudar ke atas agar menyatu dengan konten di atas footer */}
        <ParangPattern className="absolute inset-0 text-gold/25 [mask-image:linear-gradient(to_top,black,transparent_95%)]" />
        {/* Gradasi agar teks tetap terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-background/70 to-background" />
        {/* Vignette hangat seperti hero, dibalik ke bawah */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgb(176_141_87/0.18),transparent_60%)]" />
        <KawungMark className="absolute -bottom-10 -right-10 size-56 text-gold/15 sm:size-72" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="grid gap-6 text-center md:grid-cols-[1.6fr_1fr_auto] md:gap-10 md:text-left">
          {/* Nama aplikasi + deskripsi */}
          <section aria-labelledby="footer-app-name" className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-3">
              <Image
                src="/solofood_logo.png"
                alt="Logo SoloFood"
                width={64}
                height={64}
                className="size-14 rounded-md object-cover"
              />
              <div>
              <h2 id="footer-app-name" className="font-heading text-2xl leading-tight text-primary">
                {APP_NAME}
              </h2>
              <p className="mt-1 text-sm font-medium text-olive">{APP_TAGLINE}</p>
              </div>
            </div>
            <p className="max-w-sm text-justify text-sm leading-relaxed text-muted-foreground text-pretty">
              {APP_DESCRIPTION}
            </p>
          </section>

          {/* Quick link */}
          <nav aria-labelledby="footer-links-heading">
            <h2 id="footer-links-heading" className="font-heading text-lg text-primary">
              Tautan Cepat
            </h2>
            <ul className="mt-2 space-y-1.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="rounded-sm text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none motion-reduce:transition-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Anggota kelompok */}
          <section aria-labelledby="footer-team-heading" className="md:justify-self-end">
            <h2 id="footer-team-heading" className="font-heading text-lg text-primary">
              Anggota Kelompok
            </h2>
            <ul className="mt-2 grid grid-cols-2 gap-x-8 gap-y-2 text-left">
              {TEAM_MEMBERS.map((member) => (
                <li key={member.id} className="text-sm leading-snug">
                  <span className="text-foreground">{member.name}</span>
                  <span className="block text-xs text-muted-foreground">{member.id}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <OrnamentDivider className="mt-8" />

        {/* Bagian bawah: catatan demo, kredit foto, copyright */}
        <div className="mx-auto mt-5 flex max-w-3xl flex-col items-center gap-1.5 text-center">
          <p className="text-sm text-muted-foreground">
            © {APP_NAME} {year}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
