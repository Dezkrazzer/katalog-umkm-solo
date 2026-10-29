import { Utensils, Store, Users, type LucideIcon } from "lucide-react";

import { KawungMark } from "@/components/ornament-divider";

type StatItem = {
  label: string;
  value: string;
  note: string;
  Icon: LucideIcon;
};

const STATS: StatItem[] = [
  {
    label: "Makanan Khas",
    value: "12",
    note: "Tercatat dalam direktori",
    Icon: Utensils,
  },
  {
    label: "Jumlah UMKM Kuliner",
    value: "~4.955",
    note: "Data BPS Surakarta Terbaru",
    Icon: Store,
  },
  {
    label: "Total Penduduk",
    value: "589.714",
    note: "Jiwa di Surakarta (2025)",
    Icon: Users,
  },
];

export function StatisticsSection() {
  return (
    <section aria-label="Statistik Surakarta" className="mx-auto max-w-7xl px-8 pt-12 pb-0 sm:px-6 sm:pt-16 lg:px-8">
      <dl className="grid grid-cols-1 gap-12 sm:grid-cols-3">
        {STATS.map(({ label, value, note, Icon }) => (
          <div
            key={label}
            className="relative isolate overflow-hidden rounded-lg border border-gold/40 bg-card px-6 py-5 shadow-warm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold hover:shadow-warm-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {/* Ornamen kawung latar — dekoratif */}
            <KawungMark
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -bottom-4 size-24 text-gold/10"
            />

            {/* Label + ikon */}
            <dt className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {label}
              </span>
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-gold">
                <Icon aria-hidden="true" className="size-4" />
              </span>
            </dt>

            {/* Angka statistik */}
            <dd className="mt-3">
              <span className="font-heading text-3xl font-semibold tracking-tight text-primary">
                {value}
              </span>
              <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>
            </dd>

            {/* Garis aksen emas di bawah */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent"
            />
          </div>
        ))}
      </dl>
    </section>
  );
}
