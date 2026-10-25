import { OrnamentDivider } from "@/components/ornament-divider";

/**
 * Placeholder for the "Kandungan" (nutrition) section linked from the navbar.
 * Replace the paragraph with real nutrition content when it is ready.
 */
export function NutritionSection() {
  return (
    <section
      id="kandungan"
      aria-labelledby="kandungan-judul"
      className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center rounded-lg border border-gold/40 bg-card/70 px-6 py-10 text-center shadow-warm">
        <OrnamentDivider className="mb-6" />
        <h2
          id="kandungan-judul"
          className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl"
        >
          Kandungan Gizi
        </h2>
        <p className="mt-3 max-w-prose text-base text-muted-foreground text-pretty">
          Informasi kandungan gizi tiap hidangan sedang disiapkan dan akan segera hadir.
        </p>
      </div>
    </section>
  );
}
