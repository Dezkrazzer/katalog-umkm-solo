"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog as DialogPrimitive } from "radix-ui";
import { ChevronLeft, ChevronRight, ExternalLink, Expand, X } from "lucide-react";

import type { GalleryPhoto } from "@/data/galleryData";
import { cn } from "@/lib/utils";

type PhotoGridProps = {
  photos: GalleryPhoto[];
  /** Jumlah foto pertama yang dimuat langsung (di atas lipatan halaman). */
  eagerCount?: number;
  className?: string;
};

/**
 * Grid foto bergaya bento: foto potret mengambil dua baris. Urutan DOM sama
 * dengan urutan tampilan, jadi foto pertama selalu yang terlihat lebih dulu.
 * Klik foto untuk membuka tampilan penuh beserta kredit.
 */
export function PhotoGrid({ photos, eagerCount = 0, className }: PhotoGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const photo = openIndex === null ? null : photos[openIndex];

  function step(delta: number) {
    setOpenIndex((index) => (index === null ? null : (index + delta + photos.length) % photos.length));
  }

  return (
    <>
      <ul
        role="list"
        className={cn(
          "grid grid-flow-row-dense auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 lg:grid-cols-3",
          className,
        )}
      >
        {photos.map((item, index) => (
          <li key={item.id} className={item.src.height > item.src.width * 1.15 ? "row-span-2" : undefined}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Lihat foto ${item.judul}`}
              className="group/photo relative block size-full overflow-hidden rounded-lg border border-gold/30 bg-muted shadow-warm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold hover:shadow-warm-lg focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                placeholder="blur"
                loading={index < eagerCount ? "eager" : "lazy"}
                fetchPriority={index === 0 && eagerCount > 0 ? "high" : undefined}
                sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, 48vw"
                className="object-cover transition-transform duration-500 ease-out group-hover/photo:scale-105 motion-reduce:transition-none motion-reduce:group-hover/photo:scale-100"
              />
              <span className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-[#2b1d12]/80 via-transparent to-transparent p-3 text-left text-primary-foreground opacity-0 transition-opacity duration-300 group-hover/photo:opacity-100 group-focus-visible/photo:opacity-100 sm:p-4">
                <span className="font-heading text-base font-semibold sm:text-lg">{item.judul}</span>
                <span className="text-xs opacity-80">© {item.author}</span>
              </span>
              <span className="absolute top-2 right-2 grid size-8 scale-90 place-items-center rounded-full bg-card/85 text-primary opacity-0 transition-all duration-300 group-hover/photo:scale-100 group-hover/photo:opacity-100">
                <Expand aria-hidden="true" className="size-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <DialogPrimitive.Root open={photo !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[#2b1d12]/85 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
          <DialogPrimitive.Content
            data-lenis-prevent
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") step(1);
              if (event.key === "ArrowLeft") step(-1);
            }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 p-4 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 sm:p-8"
          >
            {photo && (
              <>
                <div className="relative flex min-h-0 w-full max-w-5xl flex-1 items-center justify-center">
                  <Image
                    key={photo.id}
                    src={photo.src}
                    alt={photo.alt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 1024px, 100vw"
                    className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-warm-lg"
                  />
                </div>
                <div className="flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 text-primary-foreground">
                  <div>
                    <DialogPrimitive.Title className="font-heading text-xl font-semibold">
                      {photo.judul}
                    </DialogPrimitive.Title>
                    <DialogPrimitive.Description className="text-sm opacity-85">
                      Foto: {photo.author} ·{" "}
                      <a href={photo.licenseUrl} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                        {photo.license}
                      </a>{" "}
                      ·{" "}
                      <a
                        href={photo.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
                      >
                        Wikimedia Commons <ExternalLink aria-hidden="true" className="size-3.5" />
                      </a>
                    </DialogPrimitive.Description>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="mr-1 text-sm tabular-nums opacity-80">
                      {(openIndex ?? 0) + 1} / {photos.length}
                    </span>
                    <LightboxButton label="Foto sebelumnya" onClick={() => step(-1)}>
                      <ChevronLeft aria-hidden="true" className="size-5" />
                    </LightboxButton>
                    <LightboxButton label="Foto berikutnya" onClick={() => step(1)}>
                      <ChevronRight aria-hidden="true" className="size-5" />
                    </LightboxButton>
                  </div>
                </div>
                <DialogPrimitive.Close asChild>
                  <LightboxButton label="Tutup" className="absolute top-4 right-4">
                    <X aria-hidden="true" className="size-5" />
                  </LightboxButton>
                </DialogPrimitive.Close>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}

type LightboxButtonProps = React.ComponentProps<"button"> & { label: string };

function LightboxButton({ label, className, children, ...props }: LightboxButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "grid size-10 place-items-center rounded-full border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
