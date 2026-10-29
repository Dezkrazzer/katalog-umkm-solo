"use client";

import { useDeferredValue, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  ArrowDownUp,
  Banknote,
  ChevronDown,
  Clock3,
  ExternalLink,
  MapPin,
  MessageSquare,
  Navigation,
  Search,
  SearchX,
  Star,
  X,
} from "lucide-react";

import type { Umkm } from "@/data/umkm";

type Coordinates = {
  latitude: number;
  longitude: number;
};

const MISSING = "Data tidak tersedia";
const PAGE_SIZE = 12;

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

/**
 * Mengubah rentang harga Google Maps ("Rp 1–25.000", "Rp 25–50K") menjadi
 * batas bawah dan atas dalam rupiah. Akhiran "K" pada batas atas berlaku untuk
 * kedua angka. null jika format tidak dikenali.
 */
function parsePriceRange(range: string | null): { min: number; max: number } | null {
  const match = range?.match(/([\d.]+)\s*[–-]\s*([\d.]+)\s*(K)?/i);
  if (!match) return null;
  const multiplier = match[3] ? 1000 : 1;
  const toNumber = (text: string) => Number(text.replace(/\./g, "")) * multiplier;
  return { min: toNumber(match[1]), max: toNumber(match[2]) };
}

type OperationalStatus = "open" | "closed" | "unknown";

/** Status dihitung dari waktu `now` milik browser, bukan saat render di server. */
function getOperationalStatus(hours: string | null, now: Date | null): OperationalStatus {
  if (!hours || !now) return "unknown";
  if (/24\s*jam/i.test(hours)) return "open";

  const timeMatch = hours
    .replace(/^[^A-Za-z]+/, "")
    .match(/(Buka|Tutup|Opens?|Closes?)\s+(\d{1,2})(?:[.:](\d{2}))?\s*(am|pm)?\s*([A-Za-z]{3})?/i);
  if (!timeMatch) return "unknown";

  const marker = timeMatch[1].toLowerCase();
  const isClosingTime = marker.startsWith("close") || marker === "tutup";
  // "Opens 5.00 am Tue" berarti baru buka di hari lain.
  if (!isClosingTime && timeMatch[5]) return "closed";

  let hour = Number(timeMatch[2]);
  const minute = Number(timeMatch[3] ?? 0);
  const meridiem = timeMatch[4]?.toLowerCase();
  if (meridiem === "pm" && hour < 12) hour += 12;
  if (meridiem === "am" && hour === 12) hour = 0;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const listedMinutes = hour * 60 + minute;
  if (isClosingTime) {
    // Tutup dini hari (misal 02.00): dianggap masih buka sejak siang hari sebelumnya.
    if (listedMinutes < 6 * 60) return currentMinutes < listedMinutes || currentMinutes >= 12 * 60 ? "open" : "closed";
    return currentMinutes < listedMinutes ? "open" : "closed";
  }
  return currentMinutes >= listedMinutes ? "open" : "closed";
}

const STATUS_RANK: Record<OperationalStatus, number> = { open: 0, unknown: 1, closed: 2 };

const STATUS_STYLE: Record<
  OperationalStatus,
  { label: string; pill: string; dot: string }
> = {
  open: { label: "Buka", pill: "bg-olive/10 text-olive", dot: "bg-olive" },
  closed: { label: "Tutup", pill: "bg-destructive/10 text-destructive", dot: "bg-destructive" },
  unknown: { label: "Tidak diketahui", pill: "bg-muted text-muted-foreground", dot: "bg-muted-foreground" },
};

const SORT_OPTIONS = [
  { value: "rekomendasi", label: "Buka lebih dulu" },
  { value: "nama-asc", label: "Nama A–Z" },
  { value: "nama-desc", label: "Nama Z–A" },
  { value: "jarak", label: "Jarak terdekat" },
  { value: "harga-asc", label: "Harga termurah" },
  { value: "harga-desc", label: "Harga termahal" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

function isSortValue(value: string | null): value is SortValue {
  return SORT_OPTIONS.some((option) => option.value === value);
}

function subscribeMinute(onChange: () => void) {
  const timer = setInterval(onChange, 60_000);
  return () => clearInterval(timer);
}

/** Waktu browser (dibulatkan per menit). null saat render server dan hydration. */
function useNow() {
  const minute = useSyncExternalStore(
    subscribeMinute,
    () => Math.floor(Date.now() / 60_000),
    () => null,
  );
  return useMemo(() => (minute === null ? null : new Date(minute * 60_000)), [minute]);
}

const subscribeNothing = () => () => {};

/** Query string awal halaman. null saat render server dan hydration. */
function useInitialSearchParams() {
  const search = useSyncExternalStore(
    subscribeNothing,
    () => window.location.search,
    () => null,
  );
  return useMemo(() => (search === null ? null : new URLSearchParams(search)), [search]);
}

/** Teks placeholder seragam untuk data yang tidak tersedia. */
function Missing() {
  return <span className="italic text-muted-foreground">{MISSING}</span>;
}

/** Data tanpa nilai selalu di urutan terakhir, apa pun arah urutannya. */
function compareNullable(a: number | undefined, b: number | undefined, direction: 1 | -1) {
  if (a === undefined && b === undefined) return 0;
  if (a === undefined) return 1;
  if (b === undefined) return -1;
  return (a - b) * direction;
}

export function UmkmResults({ places }: { places: Umkm[] }) {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [locationState, setLocationState] = useState<"idle" | "loading" | "denied">("idle");
  // null = belum diubah pengguna, sehingga nilai awal diambil dari URL.
  const [queryInput, setQuery] = useState<string | null>(null);
  const [sortInput, setSort] = useState<SortValue | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const initialParams = useInitialSearchParams();
  const initialSort = initialParams?.get("urut") ?? null;
  const query = queryInput ?? initialParams?.get("q") ?? "";
  const sort = sortInput ?? (isSortValue(initialSort) ? initialSort : "rekomendasi");
  const paramsReady = initialParams !== null;
  const deferredQuery = useDeferredValue(query);
  const now = useNow();

  // Lokasi hanya diambil otomatis jika izin sudah pernah diberikan. Selain itu
  // pengguna menekan tombol dulu, sehingga browser tidak meminta izin saat halaman dibuka.
  useEffect(() => {
    if (!navigator.geolocation || !navigator.permissions) return;
    let cancelled = false;

    navigator.permissions
      .query({ name: "geolocation" })
      .then((status) => {
        if (cancelled || status.state !== "granted") return;
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            if (!cancelled) setUserLocation({ latitude: coords.latitude, longitude: coords.longitude });
          },
          () => {
            if (!cancelled) setLocationState("denied");
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
        );
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  // Pencarian dan urutan disimpan di URL (?q=&urut=) agar bisa dibagikan.
  useEffect(() => {
    if (!paramsReady) return;
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set("q", query.trim());
    else url.searchParams.delete("q");
    if (sort !== "rekomendasi") url.searchParams.set("urut", sort);
    else url.searchParams.delete("urut");
    if (url.href !== window.location.href) window.history.replaceState(window.history.state, "", url);
  }, [paramsReady, query, sort]);

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

  const results = useMemo(() => {
    const keyword = deferredQuery.trim().toLowerCase();
    const filtered = keyword
      ? places.filter((place) =>
          `${place.nama ?? ""} ${place.alamat ?? ""}`.toLowerCase().includes(keyword),
        )
      : places;

    const withMeta = filtered.map((place, index) => ({
      place,
      index,
      status: getOperationalStatus(place.jamBuka, now),
      price: parsePriceRange(place.rentangHarga),
    }));

    withMeta.sort((a, b) => {
      let result = 0;
      switch (sort) {
        case "nama-asc":
          result = a.place.nama.localeCompare(b.place.nama, "id");
          break;
        case "nama-desc":
          result = b.place.nama.localeCompare(a.place.nama, "id");
          break;
        case "jarak":
          result = compareNullable(distances.get(a.place.id), distances.get(b.place.id), 1);
          break;
        case "harga-asc":
          result =
            compareNullable(a.price?.min, b.price?.min, 1) || compareNullable(a.price?.max, b.price?.max, 1);
          break;
        case "harga-desc":
          result =
            compareNullable(a.price?.max, b.price?.max, -1) || compareNullable(a.price?.min, b.price?.min, -1);
          break;
      }
      // Pada urutan yang sama (dan untuk urutan bawaan), UMKM yang buka didahulukan.
      return result || STATUS_RANK[a.status] - STATUS_RANK[b.status] || a.index - b.index;
    });

    return withMeta;
  }, [places, deferredQuery, sort, now, distances]);

  const visibleResults = results.slice(0, visibleCount);

  function handleSortChange(value: SortValue) {
    setSort(value);
    setVisibleCount(PAGE_SIZE);
    if (value === "jarak" && !userLocation) requestLocation();
  }

  return (
    <section className="space-y-5" aria-labelledby="umkm-heading">
      <div>
        <h2 id="umkm-heading" className="text-2xl font-semibold text-primary">
          UMKM yang Menyediakan
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Data hasil scraping Google Maps yang dikurasi untuk menampilkan usaha lokal.
        </p>
        {!userLocation && locationState !== "loading" && (
          <button
            type="button"
            onClick={requestLocation}
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            <Navigation className="size-4" aria-hidden="true" />
            {locationState === "denied"
              ? "Aktifkan lokasi untuk melihat jarak"
              : "Tampilkan jarak dari lokasi saya"}
          </button>
        )}
      </div>

      {places.length === 0 ? (
        <p className="text-muted-foreground">Belum ada data UMKM untuk kuliner ini.</p>
      ) : (
        <>
          {/* ───────── Pencarian + urutan ───────── */}
          <div className="flex flex-col gap-3 rounded-2xl border border-gold/40 bg-card/80 p-3 shadow-warm sm:flex-row sm:items-center">
            <label className="group/search relative flex-1">
              <span className="sr-only">Cari UMKM berdasarkan nama atau alamat</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-gold transition-colors group-focus-within/search:text-primary"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder="Cari nama warung atau alamat…"
                className="h-11 w-full rounded-xl border border-input bg-background pr-10 pl-10 text-sm text-foreground transition-[border-color,box-shadow] outline-none placeholder:text-muted-foreground hover:border-gold focus-visible:border-gold focus-visible:ring-4 focus-visible:ring-ring/40 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Hapus pencarian"
                  className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              )}
            </label>

            <label className="relative flex items-center sm:w-56">
              <span className="sr-only">Urutkan UMKM</span>
              <ArrowDownUp
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 size-4 text-gold"
              />
              <select
                value={sort}
                onChange={(event) => handleSortChange(event.target.value as SortValue)}
                className="h-11 w-full appearance-none rounded-xl border border-input bg-background pr-9 pl-10 text-sm font-medium text-primary transition-[border-color,box-shadow] outline-none hover:border-gold focus-visible:border-gold focus-visible:ring-4 focus-visible:ring-ring/40"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-3 size-4 text-muted-foreground"
              />
            </label>
          </div>

          <p className="text-sm text-muted-foreground" aria-live="polite">
            {sort === "jarak" && !userLocation && locationState !== "loading"
              ? "Izinkan akses lokasi agar UMKM bisa diurutkan berdasarkan jarak. "
              : ""}
            Menampilkan {visibleResults.length} dari {results.length} UMKM
            {deferredQuery.trim() ? ` untuk "${deferredQuery.trim()}"` : ""}.
          </p>

          {results.length === 0 && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-gold/50 bg-card/60 px-6 py-10 text-center">
              <SearchX aria-hidden="true" className="size-8 text-gold" />
              <p className="text-muted-foreground">
                Tidak ada UMKM yang cocok dengan pencarian &quot;{deferredQuery.trim()}&quot;.
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Hapus pencarian
              </button>
            </div>
          )}
        </>
      )}

      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        {visibleResults.map(({ place, status: statusKey }) => {
          const distance = distances.get(place.id);
          const hoursAvailable = hasValue(place.jamBuka);
          const status = STATUS_STYLE[statusKey];
          const hoursLines = hoursAvailable
            ? (place.jamBuka as string)
                .split(/\s*[⋅·•]\s*/)
                .map((line) => line.trim())
                .filter(Boolean)
            : [];
          const ratingAvailable = place.rating !== null && place.rating !== undefined;

          return (
            <article
              key={place.id}
              className="group/umkm flex h-full flex-col transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {/* ───────── Card utama ───────── */}
              <div className="relative z-20 flex flex-1 flex-col rounded-2xl border border-primary/15 bg-card p-5 shadow-warm transition-[border-color,box-shadow] duration-300 group-hover/umkm:border-gold group-hover/umkm:shadow-warm-lg sm:p-6">
                {/* Nama */}
                <h3 className="text-lg font-semibold leading-snug text-primary">
                  {hasValue(place.nama) ? place.nama : <Missing />}
                </h3>

                {/* Status + rating */}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  {now === null && hoursAvailable ? (
                    // Status baru diketahui setelah waktu browser terbaca.
                    <span
                      aria-hidden="true"
                      className="h-6 w-16 animate-pulse rounded-full bg-muted motion-reduce:animate-none"
                    />
                  ) : (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${status.pill}`}
                    >
                      <span
                        className={`size-2 rounded-full ${status.dot} ${
                          hoursAvailable && statusKey !== "unknown" ? "animate-pulse motion-reduce:animate-none" : ""
                        }`}
                        aria-hidden="true"
                      />
                      {hoursAvailable ? status.label : MISSING}
                    </span>
                  )}

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
                      <span className="font-normal italic text-primary-foreground/80">
                        {userLocation ? MISSING : "Jarak belum diketahui"}
                      </span>
                    )}
                  </p>
                </div>

                {hasValue(place.mapsUrl) ? (
                  <a
                    href={place.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group/maps inline-flex items-center gap-1.5 rounded-md bg-card px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-secondary focus-visible:ring-4 focus-visible:ring-ring/60 motion-reduce:transition-none"
                  >
                    Maps{" "}
                    <ExternalLink
                      className="size-4 transition-transform duration-200 group-hover/maps:translate-x-0.5 group-hover/maps:-translate-y-0.5 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
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

      {visibleCount < results.length && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-gold/60 bg-card px-6 text-sm font-medium text-primary shadow-warm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:bg-primary hover:text-primary-foreground hover:shadow-warm-lg focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            Tampilkan lebih banyak
            <span className="text-xs opacity-80">
              ({Math.min(PAGE_SIZE, results.length - visibleCount)} lagi)
            </span>
            <ChevronDown aria-hidden="true" className="size-4" />
          </button>
        </div>
      )}
    </section>
  );
}
