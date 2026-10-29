import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { KawungMark, OrnamentDivider } from "@/components/ornament-divider";
import { SiteNavbar } from "@/components/site-navbar";

export default function NotFound() {
  return (
    <>
      <SiteNavbar />
      <main className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden px-4 py-28 text-center">
        <KawungMark className="absolute -top-10 -left-10 -z-10 size-56 text-gold/15" />
        <KawungMark className="absolute -right-12 -bottom-12 -z-10 size-72 text-gold/15" />
        <div className="flex max-w-lg flex-col items-center">
          <p className="font-display text-8xl leading-none text-primary sm:text-9xl">404</p>
          <OrnamentDivider className="mt-6" />
          <h1 className="mt-6 text-3xl font-semibold text-primary">Hidangan tidak ditemukan</h1>
          <p className="mt-3 text-muted-foreground text-pretty">
            Halaman yang Anda cari mungkin sudah habis seperti serabi di pagi hari. Coba kembali ke beranda
            dan jelajahi kuliner lainnya.
          </p>
          <Link
            href="/"
            transitionTypes={["nav-back"]}
            className="group/home mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-medium text-primary-foreground shadow-warm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-warm-lg focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover/home:-translate-x-1 motion-reduce:transition-none"
            />
            Kembali ke beranda
          </Link>
        </div>
      </main>
    </>
  );
}
