"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Banknote,
  Clock3,
  ExternalLink,
  MapPin,
  MessageSquare,
  Navigation,
  Star,
} from "lucide-react";

import type { Umkm } from "@/data/umkm";

type Coordinates = {
  latitude: number;
  longitude: number;
};

const MISSING = "Data tidak tersedia";

function distanceInKilometers(from: Coordinates, to: Coordinates) {
  const earthRadius = 6371;
  const latitudeDelta = ((to.latitude - from.latitude) * Math.PI) / 180;
  const longitudeDelta = ((to.longitude - from.longitude) * Math.PI) / 180;
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos((from.latitude * Math.PI) / 180) *
      Math.cos((to.latitude * Math.PI) / 180) *
      Math.sin(longitudeDelta / 2) ** 2;

  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(distance: number) {
  return distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`;
}

/** true jika nilai benar-benar ada (bukan null/undefined/string kosong). */
function hasValue(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

type OperationalStatus = "open" | "closed" | "unknown";

function getOperationalStatus(hours: string | null): OperationalStatus {
  if (!hours) return "unknown";
  if (/24\s*jam/i.test(hours)) return "open";

  const timeMatch = hours
    .replace(/^[^A-Za-z]+/, "")
    .match(/(Buka|Tutup|Opens?|Closes?)\s+(\d{1,2})(?:[.:](\d{2}))?\s*(am|pm)?/i);
  if (!timeMatch) return "unknown";

  let hour = Number(timeMatch[2]);
  const minute = Number(timeMatch[3] ?? 0);
  const meridiem = timeMatch[4]?.toLowerCase();
  if (meridiem === "pm" && hour < 12) hour += 12;
  if (meridiem === "am" && hour === 12) hour = 0;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const listedMinutes = hour * 60 + minute;
  const marker = timeMatch[1].toLowerCase();
  if (marker.startsWith("close") || marker === "tutup") {
    return currentMinutes < listedMinutes ? "open" : "closed";
  }
  return currentMinutes >= listedMinutes ? "open" : "closed";
}

const STATUS_STYLE: Record<
  OperationalStatus,
  { label: string; pill: string; dot: string }
> = {
  open: { label: "Buka", pill: "bg-olive/10 text-olive", dot: "bg-olive" },
  closed: { label: "Tutup", pill: "bg-destructive/10 text-destructive", dot: "bg-destructive" },
  unknown: { label: "Tidak diketahui", pill: "bg-muted text-muted-foreground", dot: "bg-muted-foreground" },
};

/** Teks placeholder seragam untuk data yang tidak tersedia. */
function Missing() {
  return <span className="italic text-muted-foreground">{MISSING}</span>;
}

export function UmkmResults({ places }: { places: Umkm[] }) {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [locationState, setLocationState] = useState<"idle" | "loading" | "denied">("idle");

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation({ latitude: coords.latitude, longitude: coords.longitude });
      },
      () => {
        setLocationState("denied");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
  }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationState("denied");
      return;
    }

    setLocationState("loading");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation({ latitude: coords.latitude, longitude: coords.longitude });
        setLocationState("idle");
      },
      () => {
        setLocationState("denied");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
  };

  const distances = useMemo(() => {
    if (!userLocation) return new Map<string, number>();

    return new Map(
      places
        .filter((place) => place.latitude !== null && place.longitude !== null)
        .map((place) => [
          place.id,
          distanceInKilometers(userLocation, {
            latitude: place.latitude as number,
            longitude: place.longitude as number,
          }),
        ]),
    );
  }, [places, userLocation]);

  return (
    <section className="space-y-5" aria-labelledby="umkm-heading">
      <div>
        <h2 id="umkm-heading" className="text-2xl font-semibold text-primary">
          UMKM yang Menyediakan
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Data hasil scraping Google Maps yang dikurasi untuk menampilkan usaha lokal.
        </p>
        {locationState === "denied" && (
          <button
            type="button"
            onClick={requestLocation}
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <Navigation className="size-4" aria-hidden="true" /> Aktifkan lokasi untuk melihat jarak
          </button>
        )}
      </div>

      {places.length === 0 && (
        <p className="text-muted-foreground">Belum ada data UMKM untuk kuliner ini.</p>
      )}

      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        {places.map((place) => {
          const distance = distances.get(place.id);
          const hoursAvailable = hasValue(place.jamBuka);
          const status = STATUS_STYLE[getOperationalStatus(place.jamBuka)];
          const hoursLines = hoursAvailable
            ? (place.jamBuka as string)
                .split(/\s*[⋅·•]\s*/)
                .map((line) => line.trim())
                .filter(Boolean)
            : [];
          const ratingAvailable = place.rating !== null && place.rating !== undefined;

          return (
            <article key={place.id} className="flex h-full flex-col">
              {/* ───────── Card utama ───────── */}
              <div className="relative z-20 flex flex-1 flex-col rounded-2xl border border-primary/15 bg-card p-5 shadow-warm sm:p-6">
                {/* Nama */}
                <h3 className="text-lg font-semibold leading-snug text-primary">
                  {hasValue(place.nama) ? place.nama : <Missing />}
                </h3>

                {/* Status + rating */}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${status.pill}`}
                  >
                    <span
                      className={`size-2 rounded-full ${status.dot} ${
                        hoursAvailable && status.label !== "Tidak diketahui" ? "animate-pulse motion-reduce:animate-none" : ""
                      }`}
                      aria-hidden="true"
                    />
                    {hoursAvailable ? status.label : MISSING}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <Star
                      className={`size-4 ${ratingAvailable ? "fill-gold text-gold" : "text-muted-foreground"}`}
                      aria-hidden="true"
                    />
                    {ratingAvailable ? (
                      <span className="font-semibold text-foreground">{place.rating}</span>
                    ) : (
                      <Missing />
                    )}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MessageSquare className="size-4 text-gold" aria-hidden="true" />
                    {hasValue(place.jumlahUlasan) ? (
                      `${place.jumlahUlasan} ulasan`
                    ) : (
                      <Missing />
                    )}
                  </span>
                </div>

                <div className="my-4 h-px bg-border" />

                {/* Detail */}
                <div className="space-y-3.5 text-sm">
                  {/* Jam operasional (selalu terbuka) */}
                  <div className="flex items-start gap-2.5">
                    <Clock3 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-primary">Jam Operasional</p>
                      <div className="mt-1 space-y-0.5 text-muted-foreground">
                        {hoursAvailable ? (
                          hoursLines.map((line) => <p key={line}>{line}</p>)
                        ) : (
                          <Missing />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Alamat */}
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                    <span className="text-muted-foreground">
                      {hasValue(place.alamat) ? place.alamat : <Missing />}
                    </span>
                  </div>

                  {/* Harga */}
                  <div className="flex items-start gap-2.5">
                    <Banknote className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                    <span className={hasValue(place.rentangHarga) ? "font-medium text-olive" : ""}>
                      {hasValue(place.rentangHarga) ? (
                        <>Perkiraan harga: {place.rentangHarga}</>
                      ) : (
                        <Missing />
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* ───────── Layer belakang (efek tumpukan) ───────── */}
              {/* Footer: selebar card utama, sedikit masuk ke bawahnya */}
              <div className="relative z-10 -mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 rounded-b-2xl bg-primary px-5 pb-3.5 pt-8 text-primary-foreground shadow-warm sm:px-6">
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground/15"
                    aria-hidden="true"
                  >
                    <Navigation className="size-4" />
                  </span>
                  <p className="font-semibold leading-tight" aria-live="polite">
                    {locationState === "loading" ? (
                      "Mengukur jarak..."
                    ) : distance !== undefined ? (
                      <>
                        {formatDistance(distance)}{" "}
                        <span className="font-normal text-primary-foreground/80">dari Anda</span>
                      </>
                    ) : (
                      <span className="font-normal italic text-primary-foreground/80">{MISSING}</span>
                    )}
                  </p>
                </div>

                {hasValue(place.mapsUrl) ? (
                  <a
                    href={place.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-card px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-secondary focus-visible:ring-4 focus-visible:ring-ring/60 motion-reduce:transition-none"
                  >
                    Maps <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-sm italic text-primary-foreground/80">
                    <ExternalLink className="size-4" aria-hidden="true" /> {MISSING}
                  </span>
                )}
              </div>

            </article>
          );
        })}
      </div>
    </section>
  );
}