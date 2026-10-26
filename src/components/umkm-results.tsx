"use client";

import { ExternalLink, MapPin, Star } from "lucide-react";

import type { Umkm } from "@/data/umkm";

export function UmkmResults({ places }: { places: Umkm[] }) {
  return (
    <section className="space-y-5" aria-labelledby="umkm-heading">
      <div>
        <h2 id="umkm-heading" className="text-2xl font-semibold text-primary">UMKM yang Menyediakan</h2>
        <p className="mt-1 text-sm text-muted-foreground">Data hasil scraping Google Maps yang dikurasi untuk menampilkan usaha lokal.</p>
      </div>
      {places.length === 0 && <p className="text-muted-foreground">Belum ada data UMKM untuk kuliner ini.</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        {places.map((place) => (
          <article key={place.id} className="rounded-lg border border-border bg-card p-5 shadow-warm">
            <h3 className="font-semibold text-primary">{place.nama}</h3>
            <p className="mt-2 flex gap-2 text-sm text-muted-foreground"><MapPin className="size-4 shrink-0 text-gold" />{place.alamat}</p>
            <div className="mt-3 flex items-center gap-3 text-sm">
              {place.rating !== null ? <span className="flex items-center gap-1"><Star className="size-4 fill-gold text-gold" />{place.rating} ({place.jumlahUlasan})</span> : <span className="text-muted-foreground">Rating belum tersedia</span>}
              {place.status && <span className={place.status === "Buka" || place.status === "Buka 24 jam" ? "text-olive" : "text-destructive"}>{place.status}</span>}
            </div>
            {place.jamBuka && (
              <details className="mt-3 text-sm text-muted-foreground">
                <summary className="cursor-pointer font-medium text-primary">Jam buka</summary>
                <ul className="mt-2 space-y-1">
                  <li>{place.jamBuka}</li>
                </ul>
              </details>
            )}
            <a href={place.mapsUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline">
              View in Maps <ExternalLink className="size-4" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
