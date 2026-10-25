"use client";

import { useState } from "react";
import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";

import { cn } from "@/lib/utils";
import { KawungMark } from "@/components/ornament-divider";

type FoodImageProps = {
  src: string | null;
  alt: string;
  /** Food name shown in the fallback when there is no usable image. */
  name: string;
  /** Rough rendered width, passed to `sizes`. */
  sizes: string;
  /** Use for images that are visible immediately (e.g. inside an open dialog). */
  eager?: boolean;
  className?: string;
};

type Status = "loading" | "loaded" | "error";

/**
 * Fills its (aspect-ratio) parent. Shows a skeleton while loading and a styled
 * fallback when `src` is null or the image fails, so a broken-image icon never shows.
 */
export function FoodImage({ src, alt, name, sizes, eager = false, className }: FoodImageProps) {
  const [status, setStatus] = useState<Status>("loading");

  if (!src || status === "error") {
    return <FoodImageFallback name={name} label={alt} />;
  }

  return (
    <div
      className={cn(
        "absolute inset-0 bg-muted",
        status === "loading" && "animate-pulse motion-reduce:animate-none",
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        // Unsplash already serves a resized file (?w=800); load it directly, no image proxy.
        unoptimized
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className={cn(
          "object-cover transition-[opacity,scale] duration-300 ease-out",
          status === "loaded" ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </div>
  );
}

type FoodImageFallbackProps = {
  name: string;
  label: string;
};

function FoodImageFallback({ name, label }: FoodImageFallbackProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden bg-secondary p-4 text-center"
    >
      <KawungMark className="pointer-events-none absolute -top-6 -left-6 size-24 text-gold/25" />
      <KawungMark className="pointer-events-none absolute -right-6 -bottom-6 size-24 text-gold/25" />
      <span className="flex size-12 items-center justify-center rounded-full border border-gold/60 bg-card text-gold">
        <UtensilsCrossed className="size-5" aria-hidden="true" />
      </span>
      <span className="font-heading text-lg leading-tight text-primary">{name}</span>
    </div>
  );
}
