import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Mail } from "lucide-react";

import { OrnamentDivider } from "@/components/ornament-divider";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi SoloFood: data apa yang diproses, untuk apa, dan hak Anda sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi.",
  alternates: { canonical: "/privasi" },
  openGraph: { url: "/privasi" },
};

const CONTACT_EMAIL = "contact@lzuardiai.my.id";
const EFFECTIVE_DATE = "29 Oktober 2026";

type DataRow = {
  data: string;
  purpose: string;
  storage: string;
};

const DATA_ROWS: DataRow[] = [
  {
    data: "Lokasi perangkat (koordinat GPS)",
    purpose: "Menghitung jarak Anda ke UMKM dan mengurutkan UMKM terdekat.",
    storage:
      "Hanya diproses di browser Anda setelah Anda memberi izin. Tidak dikirim ke server kami dan tidak disimpan.",
  },
  {
    data: "Kata kunci pencarian dan pilihan urutan UMKM",
    purpose: "Menampilkan hasil pencarian dan menyimpan pilihan di alamat halaman agar bisa dibagikan.",
    storage: "Tersimpan di URL dan riwayat browser Anda sendiri. Tidak kami kumpulkan.",
  },
  {
    data: "Status pemberitahuan privasi",
    purpose: "Mengingat bahwa Anda sudah menutup pemberitahuan privasi agar tidak muncul lagi.",
    storage: "Local storage di browser Anda. Dapat dihapus kapan saja melalui pengaturan browser.",
  },
  {
    data: "Log teknis (alamat IP, jenis browser, waktu akses)",
    purpose: "Dicatat otomatis oleh penyedia hosting untuk menjaga keamanan dan ketersediaan situs.",
    storage: "Dikelola penyedia hosting untuk waktu terbatas. Tidak kami gunakan untuk profil pengguna.",
  },
];

const RIGHTS = [
  "Mendapatkan informasi yang jelas tentang data pribadi yang diproses dan tujuannya.",
  "Mengakses serta memperoleh salinan data pribadi Anda.",
  "Memperbarui atau memperbaiki data yang tidak akurat.",
  "Meminta penghapusan atau pemusnahan data pribadi Anda.",
  "Menarik kembali persetujuan yang telah diberikan, termasuk izin lokasi.",
  "Mengajukan keberatan serta menunda atau membatasi pemrosesan data.",
  "Mengajukan gugatan dan menerima ganti rugi atas pelanggaran pemrosesan data pribadi.",
];

function PolicySection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <h2 id={id} className="text-2xl font-semibold text-primary">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20">
        <header className="flex flex-col items-center text-center">
          <p className="text-sm font-medium tracking-[0.2em] text-olive uppercase">Privasi</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            Kebijakan Privasi
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">Berlaku sejak {EFFECTIVE_DATE}</p>
          <OrnamentDivider className="mt-6" />
        </header>

        <div className="mt-10 space-y-10">
          <PolicySection id="ringkasan" title="Ringkasan">
            <p>
              SoloFood adalah katalog kuliner khas Solo yang dibuat oleh Kelompok 1. Situs ini{" "}
              <strong className="text-foreground">tidak memiliki akun pengguna, formulir, iklan, maupun
              layanan analitik</strong>, dan tidak menggunakan cookie pelacak. Kebijakan ini menjelaskan
              data apa saja yang tetap diproses saat Anda menggunakan situs, untuk apa, dan apa hak Anda.
            </p>
            <p>
              Kebijakan ini disusun untuk memenuhi kewajiban transparansi dalam{" "}
              <strong className="text-foreground">
                Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)
              </strong>
              . UU PDP mewajibkan setiap pihak yang memproses data pribadi untuk memberi tahu pemilik
              data tentang jenis data, tujuan, dasar pemrosesan, dan hak-hak yang dimiliki. Karena itu
              halaman ini penting, meskipun data yang kami proses sangat sedikit.
            </p>
          </PolicySection>

          <PolicySection id="data" title="Data yang diproses">
            <div className="overflow-hidden rounded-xl border border-gold/40 bg-card shadow-warm">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Daftar data yang diproses SoloFood</caption>
                <thead className="bg-secondary text-primary">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Data</th>
                    <th scope="col" className="hidden px-4 py-3 font-semibold sm:table-cell">Tujuan</th>
                    <th scope="col" className="hidden px-4 py-3 font-semibold md:table-cell">Penyimpanan</th>
                  </tr>
                </thead>
                <tbody>
                  {DATA_ROWS.map((row) => (
                    <tr key={row.data} className="border-t border-border align-top transition-colors hover:bg-secondary/40">
                      <th scope="row" className="px-4 py-3 font-medium text-foreground">
                        {row.data}
                        {/* Di layar kecil kolom lain digabung di bawah nama data */}
                        <span className="mt-1 block font-normal text-muted-foreground sm:hidden">{row.purpose}</span>
                        <span className="mt-1 block font-normal text-muted-foreground md:hidden">{row.storage}</span>
                      </th>
                      <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{row.purpose}</td>
                      <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{row.storage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Kami tidak meminta nama, email, nomor telepon, atau data pribadi lain secara langsung, dan
              tidak menjual atau membagikan data kepada pihak mana pun.
            </p>
          </PolicySection>

          <PolicySection id="dasar" title="Dasar pemrosesan">
            <p>
              Data lokasi hanya diproses berdasarkan <strong className="text-foreground">persetujuan</strong>{" "}
              Anda melalui permintaan izin resmi dari browser. Tanpa izin tersebut, situs tetap bisa
              digunakan sepenuhnya, hanya saja jarak ke UMKM tidak ditampilkan. Log teknis diproses
              berdasarkan <strong className="text-foreground">kepentingan yang sah</strong> untuk menjaga
              keamanan dan keberlangsungan layanan.
            </p>
          </PolicySection>

          <PolicySection id="pihak-ketiga" title="Layanan pihak ketiga">
            <p>
              Beberapa fitur memakai layanan pihak lain yang memiliki kebijakan privasinya sendiri:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong className="text-foreground">Google Maps.</strong> Peta di halaman detail baru dimuat
                setelah Anda menekan tombol &quot;Tampilkan peta&quot;. Setelah dimuat, atau saat Anda membuka
                tautan &quot;Maps&quot;, Google dapat memproses alamat IP dan memasang cookie sesuai{" "}
                <a
                  href="https://policies.google.com/privacy?hl=id"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Kebijakan Privasi Google
                </a>
                .
              </li>
              <li>
                <strong className="text-foreground">Wikimedia Commons dan FatSecret.</strong> Hanya berupa
                tautan sumber. Tidak ada data yang dikirim kecuali Anda membuka tautan tersebut.
              </li>
              <li>
                <strong className="text-foreground">Penyedia hosting.</strong> Menyimpan log teknis seperti
                dijelaskan pada tabel di atas.
              </li>
            </ul>
          </PolicySection>

          <PolicySection id="hak" title="Hak Anda sebagai subjek data">
            <p>Sesuai UU PDP, Anda berhak untuk:</p>
            <ul className="space-y-2">
              {RIGHTS.map((right) => (
                <li key={right} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-gold" />
                  <span>{right}</span>
                </li>
              ))}
            </ul>
            <p>
              Izin lokasi dapat dicabut kapan saja melalui pengaturan situs di browser Anda. Data di local
              storage dapat dihapus dengan membersihkan data situs.
            </p>
          </PolicySection>

          <PolicySection id="keamanan" title="Keamanan dan penyimpanan">
            <p>
              Seluruh koneksi ke SoloFood dienkripsi menggunakan HTTPS. Karena kami tidak menyimpan data
              pribadi di server sendiri, risiko kebocoran data dari pihak kami sangat kecil. Jika terjadi
              kegagalan pelindungan data, kami akan memberi tahu pengguna sesuai ketentuan UU PDP.
            </p>
          </PolicySection>

          <PolicySection id="anak" title="Pengguna anak">
            <p>
              SoloFood dapat digunakan oleh semua umur dan tidak secara sengaja mengumpulkan data pribadi
              anak. Untuk pengguna di bawah 17 tahun, izin lokasi sebaiknya diberikan dengan pendampingan
              orang tua atau wali.
            </p>
          </PolicySection>

          <PolicySection id="perubahan" title="Perubahan kebijakan">
            <p>
              Kebijakan ini dapat diperbarui jika ada fitur baru yang memengaruhi pemrosesan data. Tanggal
              berlaku di bagian atas halaman akan ikut diperbarui.
            </p>
          </PolicySection>

          <PolicySection id="kontak" title="Kontak">
            <p>
              Pertanyaan atau permintaan terkait data pribadi dapat dikirim kepada pengelola situs,{" "}
              <strong className="text-foreground">Kelompok 1</strong>, melalui email berikut. Kami akan
              menanggapi dalam waktu paling lambat 3 × 24 jam.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-card px-5 py-2.5 font-medium text-primary shadow-warm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-warm-lg focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <Mail aria-hidden="true" className="size-4" />
              {CONTACT_EMAIL}
            </a>
          </PolicySection>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
