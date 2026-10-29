import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

/**
 * Gulir ke elemen lewat Lenis (scroll-margin-top elemen ikut diperhitungkan) jika aktif, atau scrollIntoView biasa jika
 * Lenis dimatikan (misalnya saat pengguna memilih reduced motion).
 */
export function scrollToElement(element: HTMLElement, offset = 0) {
  if (instance) {
    instance.scrollTo(element, { offset });
    return;
  }
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
}
