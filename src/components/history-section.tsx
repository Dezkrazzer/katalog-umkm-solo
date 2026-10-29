import Image from "next/image";
import { Crown, Handshake, Store, type LucideIcon } from "lucide-react";

import { KawungMark, OrnamentDivider } from "@/components/ornament-divider";
import gapuraKeraton from "../../public/images/gapura-keraton.jpg";

type Milestone = {
  year: string;
  text: string;
};

const MILESTONES: Milestone[] = [
  {
    year: "1745",
    text: "Pakubuwono II memindahkan keraton Mataram dari Kartasura ke Desa Sala. Tanggal 17 Februari diperingati sebagai hari jadi kota.",
  },
  {
    year: "1755–1757",
    text: "Perjanjian Giyanti dan Salatiga melahirkan dua istana di Surakarta: Kasunanan dan Mangkunegaran.",
  },
  {
    year: "1946",
    text: "Surakarta resmi menjadi kota di bawah Republik Indonesia, tetap dengan jiwa budaya Jawanya.",
  },
];

type Reason = {
  title: string;
  text: string;
  Icon: LucideIcon;
};

const REASONS: Reason[] = [
  {
    title: "Warisan dapur keraton",
    text: "Dua istana berarti dua dapur bangsawan. Resep seperti selat dan timlo lahir di lingkungan istana, lalu menyebar ke warung rakyat.",
    Icon: Crown,
  },
  {
    title: "Akulturasi budaya",
    text: "Pengaruh Belanda, Tionghoa, dan Arab diolah dengan lidah Jawa. Bistik menjadi selat, kroket menjadi sosis Solo.",
    Icon: Handshake,
  },
  {
    title: "Kota dagang yang hidup",
    text: "Pasar Gede, jalur Bengawan Solo, dan budaya wedangan malam membuat kuliner rakyat seperti sate kere dan cabuk rambak bertahan.",
    Icon: Store,
  },
];

export function HistorySection() {
  return (
    <section
      id="sejarah"
      aria-labelledby="sejarah-judul"
      className="relative isolate mx-auto max-w-7xl scroll-mt-20 overflow-hidden px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        <div>
          <p className="text-sm font-medium tracking-[0.2em] text-olive uppercase">Sekilas Solo</p>
          <h2
            id="sejarah-judul"
            className="mt-3 text-3xl font-semibold tracking-tight text-primary text-balance sm:text-4xl"
          >
            Dari dapur keraton ke pincuk daun pisang
          </h2>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground text-pretty">
            Surakarta, atau Solo, tumbuh sebagai pusat kebudayaan Jawa sejak abad ke-18. Kehidupan istana,
            pasar, dan kampung yang saling bersinggungan membentuk kekayaan kuliner yang masih bisa
            dicicipi hingga sekarang.
          </p>

          {/* Linimasa singkat */}
          <ol className="mt-8 space-y-5 border-l border-gold/40 pl-6">
            {MILESTONES.map(({ year, text }) => (
              <li key={year} className="group/milestone relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[1.875rem] size-3 rotate-45 border border-gold bg-background transition-colors duration-300 group-hover/milestone:bg-gold motion-reduce:transition-none"
                />
                <p className="font-heading text-lg font-semibold text-primary">{year}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Foto gapura, memudar ke kiri dan ke bawah agar menyatu dengan latar */}
        <figure className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg [mask-image:linear-gradient(to_right,transparent,black_35%),linear-gradient(to_top,transparent,black_25%)] [mask-composite:intersect]">
            <Image
              src={gapuraKeraton}
              alt="Gapura Alun-alun Utara Keraton Surakarta dengan lambang keraton"
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 24rem, 100vw"
              placeholder="blur"
              className="object-cover opacity-80 sepia-[0.25]"
            />
          </div>
          <KawungMark className="pointer-events-none absolute -top-6 -right-4 size-24 text-gold/20" />
          <figcaption className="mt-2 text-right text-xs text-muted-foreground">
            Foto:{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Gapura_Alun-alun_Utara_Keraton_Surakarta.jpg"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:text-primary hover:underline"
            >
              Kiaryabagusadiwardana
            </a>
            , CC BY 4.0, via Wikimedia Commons
          </figcaption>
        </figure>
      </div>

      <OrnamentDivider className="my-12" />

      <h3 className="text-center text-2xl font-semibold text-primary">Mengapa kulinernya begitu beragam?</h3>
      <ul role="list" className="mt-8 grid gap-6 md:grid-cols-3">
        {REASONS.map(({ title, text, Icon }) => (
          <li
            key={title}
            className="group/reason relative isolate overflow-hidden rounded-lg border border-gold/40 bg-card p-6 shadow-warm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gold hover:shadow-warm-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <KawungMark className="pointer-events-none absolute -right-4 -bottom-4 size-24 text-gold/10 transition-transform duration-500 group-hover/reason:rotate-45 motion-reduce:transition-none" />
            <span className="grid size-10 place-items-center rounded-full bg-secondary text-gold transition-colors duration-300 group-hover/reason:bg-primary group-hover/reason:text-primary-foreground motion-reduce:transition-none">
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <h4 className="mt-4 font-heading text-lg font-semibold text-primary">{title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
