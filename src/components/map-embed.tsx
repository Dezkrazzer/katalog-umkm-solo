"use client";

import { useState } from "react";
import { Map as MapIcon, MapPin } from "lucide-react";

import { KawungMark, ParangPattern } from "@/components/ornament-divider";

type MapEmbedProps = {
  title: string;
  query: string;
};

/**
 * Peta Google Maps yang baru dimuat setelah diklik. Menghemat ±1 MB unduhan
 * awal dan mencegah cookie Google terpasang sebelum pengguna memintanya.
 */
export function MapEmbed({ title, query }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={title}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        className="h-72 w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="relative isolate grid h-72 place-items-center overflow-hidden bg-secondary">
      <ParangPattern id="map-parang" className="absolute inset-0 -z-10 text-gold/20" />
      <KawungMark className="absolute -right-6 -bottom-6 -z-10 size-32 text-gold/20" />
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <span className="grid size-12 place-items-center rounded-full border border-gold/60 bg-card text-gold shadow-warm">
          <MapPin aria-hidden="true" className="size-6" />
        </span>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-warm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-warm-lg focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <MapIcon aria-hidden="true" className="size-4" />
          Tampilkan peta
        </button>
        <p className="max-w-xs text-xs text-muted-foreground">
          Peta disediakan oleh Google Maps. Dengan memuatnya, Google dapat memproses data sesuai kebijakan
          privasinya.
        </p>
      </div>
    </div>
  );
}
