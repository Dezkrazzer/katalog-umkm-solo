"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

/** Each link points at a section id on the home page. */
const NAV_LINKS = [
  { label: "Home", id: "beranda" },
  { label: "Makanan", id: "galeri" },
  { label: "Kandungan", id: "kandungan" },
  { label: "Tentang Kami", id: "tentang" },
] as const;

type SectionId = (typeof NAV_LINKS)[number]["id"];

/** Returns the id of the section currently under the upper part of the viewport. */
function useActiveSection(initialSection: SectionId, disabled: boolean): SectionId {
  const [active, setActive] = useState<SectionId>(initialSection);

  useEffect(() => {
    if (disabled) return;
    let frame = 0;

    function update() {
      frame = 0;
      const doc = document.documentElement;
      const sectionElements = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(Boolean);
      if (sectionElements.length === 0) {
        setActive(initialSection);
        return;
      }
      // At the very bottom the footer may be too short to reach the marker line.
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        setActive(NAV_LINKS[NAV_LINKS.length - 1].id);
        return;
      }
      const marker = window.innerHeight * 0.35;
      let current: SectionId = NAV_LINKS[0].id;
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.getBoundingClientRect().top <= marker) current = link.id;
      }
      setActive(current);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [disabled, initialSection]);

  return disabled ? initialSection : active;
}

export function SiteNavbar({ activeSection }: { activeSection?: SectionId } = {}) {
  const pathname = usePathname();
  const isDetailPage = pathname.startsWith("/detail/");
  const active = useActiveSection(
    activeSection ?? (isDetailPage ? "galeri" : "beranda"),
    isDetailPage || Boolean(activeSection),
  );
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Slightly more solid glass once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape, outside click, or when the screen gets wide.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const wide = window.matchMedia("(min-width: 640px)");
    const onWide = () => wide.matches && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      wide.removeEventListener("change", onWide);
    };
  }, [menuOpen]);

  const glass = cn(
    "border border-gold/40 backdrop-blur-xl backdrop-saturate-150",
    "shadow-[inset_0_1px_0_rgb(255_255_255/0.55),0_8px_24px_-12px_rgb(43_29_18/0.35)]",
    "transition-[background-color,box-shadow] duration-300 motion-reduce:transition-none",
    scrolled ? "bg-card/70" : "bg-card/45",
  );

  const activeLabel = NAV_LINKS.find((l) => l.id === active)?.label;

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, sectionId: SectionId) {
    if (isDetailPage) return;

    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      section.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
    window.history.replaceState(null, "", "/");
  }

  return (
    <MotionConfig reducedMotion="user">
      <nav
        ref={navRef}
        aria-label="Navigasi utama"
        className="pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-4"
      >
        <div className="pointer-events-auto relative">
          {/* Pill bar */}
          <div className={cn("flex items-center gap-1 rounded-full p-1.5", glass)}>
            <Link
              href="/"
              aria-label="Cita Rasa Peninggalan, ke beranda"
              onClick={(event) => handleNavClick(event, "beranda")}
              className="grid size-9 shrink-0 place-items-center rounded-full text-gold transition-colors hover:bg-secondary/70 focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none motion-reduce:transition-none"
            >
              <Image
                src="/solofood_logo.png"
                alt="SoloFood"
                width={28}
                height={28}
                className="size-7 rounded-full object-cover"
              />
            </Link>

            {/* Links (tablet and up) */}
            <ul role="list" className="hidden items-center gap-0.5 sm:flex">
              {NAV_LINKS.map((link) => {
                const isActive = link.id === active;
                return (
                  <li key={link.id}>
                    <Link
                      href="/"
                      aria-current={isActive ? "location" : undefined}
                      onClick={(event) => handleNavClick(event, link.id)}
                      className={cn(
                        "relative isolate block rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none motion-reduce:transition-none md:px-4",
                        isActive
                          ? "text-primary-foreground"
                          : "text-foreground/80 hover:bg-secondary/70 hover:text-primary",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          aria-hidden="true"
                          className="absolute inset-0 -z-10 rounded-full bg-primary shadow-warm"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Current section + menu button (phones) */}
            <span className="min-w-0 truncate px-2 text-sm font-medium text-primary sm:hidden">
              {activeLabel}
            </span>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-warm transition-colors hover:bg-primary/90 focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none motion-reduce:transition-none sm:hidden"
            >
              {menuOpen ? (
                <X aria-hidden="true" className="size-4.5" />
              ) : (
                <Menu aria-hidden="true" className="size-4.5" />
              )}
            </button>
          </div>

          {/* Dropdown (phones) */}
          <AnimatePresence>
            {menuOpen && (
              <motion.ul
                id="mobile-nav-menu"
                role="list"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className={cn(
                  "absolute top-full left-1/2 mt-2 w-[min(16rem,calc(100vw-2rem))] -translate-x-1/2 origin-top space-y-1 rounded-3xl p-2 sm:hidden",
                  glass,
                  "bg-card/80",
                )}
              >
                {NAV_LINKS.map((link) => {
                  const isActive = link.id === active;
                  return (
                    <li key={link.id}>
                      <Link
                        href="/"
                        aria-current={isActive ? "location" : undefined}
                        onClick={(event) => {
                          handleNavClick(event, link.id);
                          setMenuOpen(false);
                        }}
                        className={cn(
                          "block rounded-full px-4 py-2.5 text-center text-base font-medium transition-colors focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none motion-reduce:transition-none",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-warm"
                            : "text-foreground/85 hover:bg-secondary/70 hover:text-primary",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </MotionConfig>
  );
}
