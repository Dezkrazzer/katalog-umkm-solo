"use client";

import type { MouseEvent } from "react";
import { MotionConfig, motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { KawungMark, OrnamentDivider } from "@/components/ornament-divider";

export const GALLERY_ID = "galeri";
export const GALLERY_HEADING_ID = "galeri-judul";

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.6, ease: "easeOut" },
    },
  };

  function handleExplore(event: MouseEvent<HTMLAnchorElement>) {
    const heading = document.getElementById(GALLERY_HEADING_ID);
    if (!heading) return; // fall back to the plain #galeri anchor jump
    event.preventDefault();
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    heading.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    heading.focus({ preventScroll: true });
    history.replaceState(null, "", `#${GALLERY_ID}`);
  }

  return (
    <MotionConfig reducedMotion="user">
      <header id="beranda" className="relative isolate flex min-h-[100svh] items-center overflow-hidden border-b border-gold/30">
        
        {/* Background Keraton Solo dengan Gradasi/Transparency Highlight */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-background">
          {/* Gambar Background */}
          <div 
            className="absolute inset-0 bg-[url('https://www.indonesia.travel/contentassets/3a72994879c64455ba0d13c86cdafe30/keraton-surakarta.webp')] bg-cover bg-center bg-no-repeat opacity-60" 
          />
          {/* Gradasi Highlight agar teks tetap terbaca dengan jelas */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
          
          {/* Faint ornament field + warm vignette yang sudah ada sebelumnya */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(176_141_87/0.18),transparent_60%)]" />
          <KawungMark className="absolute -bottom-2 -left-10 size-48 text-gold/15 sm:size-64" />
          <KawungMark className="absolute -right-12 -top-12 size-56 text-gold/15 sm:size-80" />
        </div>

        <motion.div
          className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-24 pb-16 text-center sm:px-6 lg:px-8"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={item}
            className="mb-5 text-sm font-medium tracking-[0.2em] text-olive uppercase"
          >
            Surakarta · Jawa Tengah
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display max-w-full scale-x-[1.02] text-5xl leading-[1.05] tracking-tight text-primary text-balance sm:scale-x-[1.05] sm:text-6xl lg:scale-x-[1.08] lg:text-8xl"
          >
            Cita Rasa Peninggalan: Jelajah Kuliner Khas Solo
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-prose text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
          >
            Daerah Surakarta mempunyai kekayaan kuliner yang khas, dengan berbagai hidangan tradisional yang menggambarkan budaya dan sejarahnya.
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <OrnamentDivider />
          </motion.div>

          <motion.div variants={item} className="mt-8">
            <Button
              asChild
              size="lg"
              className="h-12 gap-2 rounded-md px-6 text-base shadow-warm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-warm-lg focus-visible:ring-4 focus-visible:ring-ring/60 active:translate-y-0 active:bg-primary/80 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <a href={`#${GALLERY_ID}`} onClick={handleExplore}>
                Jelajahi Kuliner
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </header>
    </MotionConfig>
  );
}