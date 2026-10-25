import { cn } from "@/lib/utils";

type KawungMarkProps = {
  className?: string;
};

/** Original four-petal mark loosely inspired by the kawung motif. */
export function KawungMark({ className }: KawungMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={cn("size-6", className)}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="16" cy="8.5" rx="4.5" ry="6.5" />
        <ellipse cx="16" cy="23.5" rx="4.5" ry="6.5" />
        <ellipse cx="8.5" cy="16" rx="6.5" ry="4.5" />
        <ellipse cx="23.5" cy="16" rx="6.5" ry="4.5" />
      </g>
      <circle cx="16" cy="16" r="1.75" fill="currentColor" />
    </svg>
  );
}

type ParangPatternProps = {
  className?: string;
  /** Id unik untuk <pattern>. Ganti jika komponen dipakai lebih dari sekali di satu halaman. */
  id?: string;
};

/**
 * Pola parang vektor yang bisa diulang (tileable), terinspirasi dari motif
 * parang rusak: pita berbentuk S yang miring dan berderet, diselingi bulatan
 * kecil (mlinjon). Warna mengikuti `currentColor`, jadi atur lewat `text-*`.
 * Ukuran tile dan kemiringan diatur lewat atribut <pattern> di bawah.
 */
export function ParangPattern({ className, id = "parang-pattern" }: ParangPatternProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-full", className)}
    >
      <defs>
        {/* Tile 32 x 48, diputar -32° supaya pita condong ke kanan atas */}
        <pattern
          id={id}
          width="32"
          height="48"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(1.6) rotate(-32)"
        >
          <g fill="none" stroke="currentColor" strokeLinecap="round">
            {/* Pita S utama */}
            <path strokeWidth="3.5" d="M10 48 C10 36 22 36 22 24 C22 12 10 12 10 0" />
            {/* Garis tipis sejajar */}
            <path strokeWidth="0.8" d="M15 48 C15 36 27 36 27 24 C27 12 15 12 15 0" />
          </g>
          {/* Bulatan mlinjon */}
          <circle cx="3" cy="36" r="2" fill="currentColor" />
          <circle cx="29" cy="12" r="2" fill="currentColor" />
          {/* Belah ketupat kecil sebagai isian */}
          <path d="M3 14 L5 12 L7 14 L5 16 Z" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <path d="M25 38 L27 36 L29 38 L27 40 Z" fill="none" stroke="currentColor" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

type OrnamentDividerProps = {
  className?: string;
};

export function OrnamentDivider({ className }: OrnamentDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center gap-3 text-gold", className)}
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold sm:w-20" />
      <span className="size-1.5 rotate-45 bg-gold" />
      <KawungMark className="size-7" />
      <span className="size-1.5 rotate-45 bg-gold" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold sm:w-20" />
    </div>
  );
}
