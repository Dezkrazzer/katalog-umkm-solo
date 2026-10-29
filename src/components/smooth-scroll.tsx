"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { setLenis } from "@/lib/smooth-scroll";

/**
 * Smooth scrolling halus untuk mouse dan trackpad memakai Lenis. Layar sentuh
 * tetap memakai scroll native, dan Lenis tidak aktif bila pengguna memilih
 * reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      anchors: true,
      prevent: (node) => node.closest("[data-lenis-prevent], [role='dialog']") !== null,
    });
    setLenis(lenis);

    // Dialog Radix mengunci scroll body; hentikan Lenis selama kunci aktif.
    const body = document.body;
    const observer = new MutationObserver(() => {
      if (body.hasAttribute("data-scroll-locked")) lenis.stop();
      else lenis.start();
    });
    observer.observe(body, { attributes: true, attributeFilter: ["data-scroll-locked"] });

    return () => {
      observer.disconnect();
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
