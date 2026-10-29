"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowUpRight, Flame, Info } from "lucide-react";
import Link from "next/link";

import { daftarKuliner } from "@/data/foodData";
import { KawungMark, OrnamentDivider } from "@/components/ornament-divider";
import { cn } from "@/lib/utils";

/**
 * Acuan Label Gizi (ALG) umum dari BPOM/Permenkes 28/2019, dipakai untuk
 * menghitung persentase kebutuhan harian pada tiap bar.
 */
const NUTRIENTS = [
  { key: "kalori", label: "Energi", unit: "kkal", daily: 2150, bar: "bg-primary", dot: "bg-primary" },
  { key: "karbohidrat", label: "Karbohidrat", unit: "g", daily: 325, bar: "bg-olive", dot: "bg-olive" },
  { key: "protein", label: "Protein", unit: "g", daily: 60, bar: "bg-[#a4502c]", dot: "bg-[#a4502c]" },
  { key: "lemak", label: "Lemak", unit: "g", daily: 67, bar: "bg-gold", dot: "bg-gold" },
] as const;

const FOODS = daftarKuliner.filter((food) => food.kandunganGizi);

const numberFormat = new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 });

export function NutritionSection() {
  const [selectedSlug, setSelectedSlug] = useState(FOODS[0]?.slug);
  const food = FOODS.find((item) => item.slug === selectedSlug) ?? FOODS[0];
  if (!food?.kandunganGizi) return null;
  const gizi = food.kandunganGizi;

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="kandungan"
        aria-labelledby="kandungan-judul"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8"
      >
        <div className="mx-auto mb-8 flex max-w-2xl flex-col items-center text-center">
          <OrnamentDivider className="mb-6" />
          <h2
            id="kandungan-judul"
            className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl"
          >
            Cek Kandungan Gizi
          </h2>
          <p className="mt-3 max-w-prose text-base text-muted-foreground text-pretty">
            Pilih hidangan untuk melihat perkiraan energi dan zat gizi makro dalam satu porsi.
          </p>
        </div>

        {/* Pilihan makanan */}
        <div
          role="group"
          aria-label="Pilih makanan"
          className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-3 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
        >
          {FOODS.map((item) => {
            const selected = item.slug === food.slug;
            return (
              <button
                key={item.slug}
                type="button"
                aria-pressed={selected}
                onClick={() => setSelectedSlug(item.slug)}
                className={cn(
                  "group/chip inline-flex shrink-0 snap-start items-center gap-2 rounded-full border py-1 pr-3.5 pl-1 text-sm font-medium whitespace-nowrap transition-all duration-200 focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none motion-reduce:transition-none",
                  selected
                    ? "border-primary bg-primary text-primary-foreground shadow-warm"
                    : "border-gold/40 bg-card text-foreground/85 hover:-translate-y-0.5 hover:border-gold hover:text-primary hover:shadow-warm motion-reduce:hover:translate-y-0",
                )}
              >
                <span className="relative size-7 overflow-hidden rounded-full bg-muted">
                  <Image src={item.gambar} alt="" fill sizes="28px" className="object-cover" />
                </span>
                {item.nama}
              </button>
            );
          })}
        </div>

        {/* Box pengecekan gizi */}
        <div className="relative isolate mt-6 overflow-hidden rounded-2xl border border-gold/40 bg-card shadow-warm">
          <KawungMark className="pointer-events-none absolute -right-8 -bottom-8 -z-10 size-40 text-gold/10" />

          <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
            {/* Kiri: gambar + nama */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted md:aspect-auto md:min-h-80">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={food.slug}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={food.gambar}
                    alt={`Hidangan ${food.nama}`}
                    fill
                    sizes="(min-width: 1280px) 500px, (min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-linear-to-t from-[#2b1d12]/80 via-[#2b1d12]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground sm:p-6">
                <p className="text-xs font-medium tracking-[0.2em] uppercase opacity-80">Per 1 porsi</p>
                <h3 className="mt-1 text-2xl font-semibold sm:text-3xl">{food.nama}</h3>
                <Link
                  href={`/detail/${food.slug}`}
                  transitionTypes={["nav-forward"]}
                  className="group/link mt-2 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
                >
                  Cari UMKM-nya
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:transition-none"
                  />
                </Link>
              </div>
            </div>

            {/* Kanan: ringkasan + bar chart */}
            <div className="p-5 sm:p-8">
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary text-gold">
                  <Flame aria-hidden="true" className="size-6" />
                </span>
                <p>
                  <span className="font-heading text-4xl font-semibold text-primary">
                    {numberFormat.format(gizi.kalori)}
                  </span>{" "}
                  <span className="text-sm text-muted-foreground">kkal per porsi</span>
                </p>
              </div>

              <figure className="mt-6">
                <figcaption className="text-sm font-medium text-primary">
                  Kandungan terhadap kebutuhan harian (% AKG)
                </figcaption>
                <dl className="mt-4 space-y-4">
                  {NUTRIENTS.map((nutrient) => {
                    const value = gizi[nutrient.key];
                    const percent = (value / nutrient.daily) * 100;
                    return (
                      <div
                        key={nutrient.key}
                        className="group/bar grid grid-cols-[1fr_auto] items-baseline gap-x-3 text-sm"
                      >
                        <dt className="inline-flex items-center gap-2 font-medium text-foreground">
                          <span aria-hidden="true" className={cn("size-2.5 rounded-sm", nutrient.dot)} />
                          {nutrient.label}
                        </dt>
                        <dd className="text-muted-foreground tabular-nums">
                          <span className="font-semibold text-foreground">
                            {numberFormat.format(value)} {nutrient.unit}
                          </span>{" "}
                          · {numberFormat.format(Math.round(percent))}%
                        </dd>
                        <dd
                          aria-hidden="true"
                          className="col-span-2 mt-1.5 h-3 overflow-hidden rounded-full bg-muted ring-1 ring-border"
                        >
                          <motion.div
                            className={cn(
                              "h-full rounded-full transition-[filter] duration-200 group-hover/bar:brightness-110",
                              nutrient.bar,
                            )}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(percent, 100)}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                          />
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </figure>

              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Persentase dihitung terhadap Acuan Label Gizi umum (2.150 kkal per hari). Kebutuhan
                setiap orang dapat berbeda.
              </p>
            </div>
          </div>

          {/* Sumber data */}
          <p className="flex items-start gap-2.5 border-t border-gold/30 bg-secondary/50 px-5 py-3 text-xs leading-relaxed text-muted-foreground sm:px-8">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold" />
            <span>
              Data kandungan gizi diambil dari{" "}
              <a
                href="https://www.fatsecret.co.id/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                FatSecret Indonesia
              </a>{" "}
              dan berbagai sumber di internet. Nilai bersifat perkiraan dan dapat berbeda tergantung
              resep serta ukuran porsi.
            </span>
          </p>
        </div>
      </section>
    </MotionConfig>
  );
}
