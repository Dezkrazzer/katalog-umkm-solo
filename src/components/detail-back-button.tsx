"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function DetailBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="Kembali ke daftar kuliner"
      onClick={() => router.push("/#galeri", { transitionTypes: ["nav-back"] })}
      className="fixed top-3 left-4 z-50 grid size-11 place-items-center rounded-full border border-gold/40 bg-card/80 text-primary shadow-warm backdrop-blur-xl transition-all duration-300 hover:-translate-x-0.5 hover:border-gold hover:bg-card hover:shadow-warm-lg motion-reduce:hover:translate-x-0 focus-visible:ring-4 focus-visible:ring-ring/60 sm:top-4 sm:left-6"
    >
      <ArrowLeft aria-hidden="true" className="size-5" />
    </button>
  );
}
