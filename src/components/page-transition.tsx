import { ViewTransition, type ReactNode } from "react";

const DIRECTIONAL = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

/**
 * Animasi geser antarhalaman. Link bertipe "nav-forward" menggeser halaman
 * lama ke kiri dan halaman baru masuk dari kanan; "nav-back" sebaliknya.
 * Navbar berada di luar pembungkus ini agar tetap diam.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={DIRECTIONAL} exit={DIRECTIONAL} default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
