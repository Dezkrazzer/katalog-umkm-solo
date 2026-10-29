import type { StaticImageData } from "next/image";

import nasiLiwetSolo from "../../public/gallery/nasi-liwet-solo.jpg";
import selatSolo from "../../public/gallery/selat-solo.jpg";
import serabiSolo from "../../public/gallery/serabi-solo.jpg";
import tengklengNasi from "../../public/gallery/tengkleng-nasi.jpg";
import timloSolo from "../../public/gallery/timlo-solo.jpg";
import cabukRambakPincuk from "../../public/gallery/cabuk-rambak-pincuk.jpg";
import galabo from "../../public/gallery/galabo.jpg";
import sosisSolo from "../../public/gallery/sosis-solo.jpg";
import nasiLiwetPincuk from "../../public/gallery/nasi-liwet-pincuk.jpg";
import serabiMemasak from "../../public/gallery/serabi-memasak.jpg";
import tahuKupat from "../../public/gallery/tahu-kupat.jpg";
import selatSoloSepiring from "../../public/gallery/selat-solo-sepiring.jpg";
import sateKere from "../../public/gallery/sate-kere.jpg";
import brambangAsem from "../../public/gallery/brambang-asem.jpg";
import tengkleng from "../../public/gallery/tengkleng.jpg";
import cabukRambak from "../../public/gallery/cabuk-rambak.jpg";
import serabiPasarPon from "../../public/gallery/serabi-pasar-pon.jpg";

export type GalleryPhoto = {
  id: string;
  src: StaticImageData;
  judul: string;
  alt: string;
  author: string;
  license: string;
  licenseUrl: string;
  /** Halaman sumber di Wikimedia Commons. */
  sourceUrl: string;
};

/** Foto berlisensi bebas dari Wikimedia Commons, dikompresi ulang untuk web. */
export const daftarFotoGaleri: GalleryPhoto[] = [
  {
    id: "nasi-liwet-solo",
    src: nasiLiwetSolo,
    judul: "Nasi Liwet",
    alt: "Nasi liwet Solo dengan suwiran ayam di atas daun pisang",
    author: "Gunawan Kartapranata",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Nasi_Liwet_Solo.jpg",
  },
  {
    id: "selat-solo",
    src: selatSolo,
    judul: "Selat Solo",
    alt: "Selat Solo berisi daging, kentang, wortel, dan buncis dengan kuah kecap encer",
    author: "Gunawan Kartapranata",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Selat_Solo.jpg",
  },
  {
    id: "serabi-solo",
    src: serabiSolo,
    judul: "Serabi Solo",
    alt: "Serabi Solo beralas daun pisang",
    author: "Meursault2004",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Srabi_Solo.jpg",
  },
  {
    id: "tengkleng-nasi",
    src: tengklengNasi,
    judul: "Tengkleng",
    alt: "Seporsi tengkleng kambing berkuah kuning disajikan dengan nasi",
    author: "Emille Ilmansyah from Jakarta, Indonesia",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tengkleng_with_rice,_Solo.jpg",
  },
  {
    id: "timlo-solo",
    src: timloSolo,
    judul: "Timlo Solo",
    alt: "Semangkuk timlo Solo dengan sosis, telur, dan ati ampela",
    author: "Midori",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Timlo_Solo.JPG",
  },
  {
    id: "cabuk-rambak-pincuk",
    src: cabukRambakPincuk,
    judul: "Cabuk Rambak",
    alt: "Cabuk rambak dengan saus wijen dan kerupuk karak di atas daun pisang",
    author: "Risanprasetyo/Febri Ady Prasetyo",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cabuk_rambak_Solo.jpg",
  },
  {
    id: "galabo",
    src: galabo,
    judul: "Galabo",
    alt: "Suasana pusat kuliner malam Galabo di Solo",
    author: "Anthony Cramp",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Galabo.jpg",
  },
  {
    id: "sosis-solo",
    src: sosisSolo,
    judul: "Sosis Solo",
    alt: "Sosis Solo goreng disajikan dengan saus cocolan",
    author: "Aininapple",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sosis_Solo.jpg",
  },
  {
    id: "nasi-liwet-pincuk",
    src: nasiLiwetPincuk,
    judul: "Nasi Liwet Pincuk",
    alt: "Nasi liwet disajikan dalam pincuk daun pisang",
    author: "Risanprasetyo/Febri Ady Prasetyo",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Nasi_liwet_di_Solo.jpg",
  },
  {
    id: "serabi-memasak",
    src: serabiMemasak,
    judul: "Memasak Serabi",
    alt: "Pedagang memasak serabi di atas tungku arang di Pasar Pon",
    author: "Meursault2004",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cara_menggoreng_srabi_Solo_(pasar_Pon)02.jpg",
  },
  {
    id: "tahu-kupat",
    src: tahuKupat,
    judul: "Tahu Kupat",
    alt: "Tahu kupat dengan bumbu kacang dan mi kuning",
    author: "nugroho adhi",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tahu_kupat_Masjid_Solihin_Solo_Jl._Gajah_Mada.jpg",
  },
  {
    id: "selat-solo-sepiring",
    src: selatSoloSepiring,
    judul: "Sepiring Selat",
    alt: "Sepiring selat Solo dengan sayuran segar",
    author: "Risanprasetyo/Febri Ady Prasetyo",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sepiring_selat_solo.jpg",
  },
  {
    id: "sate-kere",
    src: sateKere,
    judul: "Sate Kere",
    alt: "Sate kere daging sapi dengan irisan lontong di atas daun pisang",
    author: "Ians Takezo",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sate_Kere_daging_sapi.jpg",
  },
  {
    id: "brambang-asem",
    src: brambangAsem,
    judul: "Brambang Asem",
    alt: "Brambang asem dengan daun ubi rebus dan tempe gembus",
    author: "Risanprasetyo/Febri Ady Prasetyo",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Brambang_asem.jpg",
  },
  {
    id: "tengkleng",
    src: tengkleng,
    judul: "Tengkleng di Warung",
    alt: "Tengkleng di dalam panci besar di sebuah warung",
    author: "Ivan Atmanagara from Jakarta, Indonesia",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tengkleng.jpg",
  },
  {
    id: "cabuk-rambak",
    src: cabukRambak,
    judul: "Cabuk Rambak",
    alt: "Cabuk rambak beralas daun pisang",
    author: "Suga Widi",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cabuk_Rambak_Solo.jpg",
  },
  {
    id: "serabi-pasar-pon",
    src: serabiPasarPon,
    judul: "Pedagang Serabi",
    alt: "Gerobak pedagang serabi Solo di Pasar Pon",
    author: "Meursault2004",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Pedagang_srabi_Solo_di_Pasar_Pon.jpg",
  },
];
