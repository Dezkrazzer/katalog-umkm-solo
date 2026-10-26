"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3, ExternalLink, MapPin, Navigation, Star } from "lucide-react";

import type { Umkm } from "@/data/umkm";

type Coordinates = {
  latitude: number;
  longitude: number;
};

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

  const currentMinutes = new Date().getHours() * 60 + new Date().getMinutes();
  const listedMinutes = hour * 60 + minute;
  const marker = timeMatch[1].toLowerCase();
  if (marker.startsWith("close") || marker === "tutup") {
    return currentMinutes < listedMinutes ? "open" : "closed";
  }
  return currentMinutes >= listedMinutes ? "open" : "closed";
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
            <Navigation className="size-4" /> Aktifkan lokasi untuk melihat jarak
          </button>
        )}
      </div>

      {places.length === 0 && (
        <p className="text-muted-foreground">Belum ada data UMKM untuk kuliner ini.</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {places.map((place) => {
          const distance = distances.get(place.id);
          const operationalStatus = getOperationalStatus(place.jamBuka);
          const statusLabel = operationalStatus === "open" ? "Buka" : operationalStatus === "closed" ? "Tutup" : "Tidak Diketahui";
          const statusClass = operationalStatus === "open" ? "text-olive" : operationalStatus === "closed" ? "text-destructive" : "text-muted-foreground";
          const dotClass = operationalStatus === "open" ? "bg-olive" : operationalStatus === "closed" ? "bg-destructive" : "bg-muted-foreground";

          return (
            <article
              key={place.id}
              className="relative h-full min-h-[20rem] overflow-hidden rounded-2xl border border-primary/20 bg-card shadow-warm"
            >
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_at_bottom,rgb(176_141_87/0.18),transparent_68%)]" />
              <div className="relative flex h-full flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold leading-tight text-primary">{place.nama}</h3>
                  <span className={`flex shrink-0 items-center gap-1.5 ${statusClass}`}>
                    <span className={`size-2 rounded-full ${dotClass} ${operationalStatus !== "unknown" ? "animate-pulse" : ""}`} />
                    {statusLabel}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm">
                  <Clock3 className="size-5 text-gold" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-primary">Jam Operasional</p>
                    <p className="text-muted-foreground">{place.jamBuka ?? "Jam buka belum tersedia"}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                  <span>{place.alamat}</span>
                </div>
                {place.rentangHarga && (
                  <p className="mt-3 text-sm font-medium text-olive">
                    Perkiraan harga: {place.rentangHarga}
                  </p>
                )}

                <div className="relative -mx-5 mt-auto flex items-center justify-between gap-3 bg-primary px-5 py-3 text-primary-foreground sm:-mx-6 sm:px-6">
                  <span className="flex items-center gap-2 font-semibold">
                    <Navigation className="size-5" aria-hidden="true" />
                    {locationState === "loading"
                      ? "Mengukur jarak..."
                      : distance !== undefined
                        ? `${formatDistance(distance)} dari Anda`
                        : "Jarak tidak tersedia"}
                  </span>
                  <div className="flex items-center gap-3">
                    {place.rating !== null && (
                      <span className="flex items-center gap-1 text-sm">
                        <Star className="size-4 fill-gold text-gold" aria-hidden="true" />
                        {place.rating} ({place.jumlahUlasan})
                      </span>
                    )}
                    <a
                      href={place.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-sm bg-card px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-secondary focus-visible:ring-4 focus-visible:ring-ring/60"
                    >
                      View in Maps <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
