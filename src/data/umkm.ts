import { umkmBrambangAsem } from "@/data/umkm/brambang_asem";
import { umkmCabukRambak } from "@/data/umkm/cabuk_rambak";
import { umkmLenjongan } from "@/data/umkm/lenjongan";
import { umkmNasiLiwet } from "@/data/umkm/nasi_liwet";
import { umkmSateBuntel } from "@/data/umkm/sate_buntel";
import { umkmSateKere } from "@/data/umkm/sate_kere";
import { umkmSelatSolo } from "@/data/umkm/selat_solo";
import { umkmSerabiSolo } from "@/data/umkm/serabi_solo";
import { umkmSosisSolo } from "@/data/umkm/sosis_solo";
import { umkmTahuKupat } from "@/data/umkm/tahu_kupat";
import { umkmTengklengSolo } from "@/data/umkm/tengkleng_solo";
import { umkmTimloSolo } from "@/data/umkm/timlo_solo";

export type Umkm = {
  id: string;
  nama: string;
  alamat: string;
  rating: number | null;
  jumlahUlasan: number;
  rentangHarga: string | null;
  kategori: string | null;
  status: string | null;
  jamBuka: string | null;
  mapsUrl: string;
  latitude: number | null;
  longitude: number | null;
};

export const daftarUmkmByKuliner: Record<string, Umkm[]> = {
  "brambang-asem": umkmBrambangAsem,
  "cabuk-rambak": umkmCabukRambak,
  lenjongan: umkmLenjongan,
  "nasi-liwet": umkmNasiLiwet,
  "sate-buntel": umkmSateBuntel,
  "sate-kere": umkmSateKere,
  "selat-solo": umkmSelatSolo,
  serabi: umkmSerabiSolo,
  "sosis-solo": umkmSosisSolo,
  "tahu-kupat": umkmTahuKupat,
  tengkleng: umkmTengklengSolo,
  "timlo-solo": umkmTimloSolo,
};
