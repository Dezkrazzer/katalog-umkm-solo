"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ShieldCheck, X } from "lucide-react";

const STORAGE_KEY = "solofood-privacy-notice";

function readAcknowledged() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

const subscribeNothing = () => () => {};

/**
 * Pemberitahuan privasi kecil di kiri bawah. Tidak menghalangi konten dan
 * tidak muncul lagi setelah ditutup.
 */
export function PrivacyNotice() {
  const pathname = usePathname();
  // Server dan hydration menganggap sudah dibaca agar kartu tidak berkedip.
  const acknowledgedBefore = useSyncExternalStore(subscribeNothing, readAcknowledged, () => true);
  const [dismissed, setDismissed] = useState(false);
  const visible = !acknowledgedBefore && !dismissed && pathname !== "/privasi";

  function dismiss() {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Local storage tidak tersedia (mode privat); cukup sembunyikan untuk sesi ini.
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {visible && (
          <motion.aside
            aria-label="Pemberitahuan privasi"
            style={{ viewTransitionName: "privacy-notice" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.35, ease: "easeOut" } }}
            exit={{ opacity: 0, y: 16, transition: { duration: 0.2 } }}
            className="fixed bottom-4 left-4 z-40 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-gold/50 bg-card/90 p-4 shadow-warm-lg backdrop-blur-xl sm:bottom-6 sm:left-6"
          >
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-gold">
                <ShieldCheck aria-hidden="true" className="size-5" />
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-primary">Privasi Anda terjaga.</span> Kami tidak memakai
                cookie pelacak. Lokasi hanya dipakai di perangkat Anda untuk menghitung jarak.
              </p>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Tutup pemberitahuan privasi"
                className="-mt-1 -mr-1 grid size-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-end gap-2 pl-12">
              <Link
                href="/privasi"
                transitionTypes={["nav-forward"]}
                onClick={dismiss}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-primary underline-offset-4 transition-colors hover:bg-secondary hover:underline focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none"
              >
                Baca kebijakan
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-warm transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-warm-lg focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none motion-reduce:hover:translate-y-0"
              >
                Mengerti
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
