export interface Kuliner {
  slug: string;
  nama: string;
  deskripsi: string;
  gambar: string;
  deskripsiLengkap: string;
  queryMaps: string;
  /** Kandungan gizi per porsi. Kalori dalam kkal, sisanya dalam gram. */
  kandunganGizi?: {
    kalori: number;
    lemak: number;
    karbohidrat: number;
    protein: number;
  };
}

export const daftarKuliner: Kuliner[] = [
  {
    slug: 'sate-buntel',
    nama: 'Sate Buntel',
    deskripsi: 'Sate daging kambing cincang yang dibungkus lemak tipis, kemudian dibakar. Hidangan ini kaya rempah dan memiliki tekstur empuk.',
    deskripsiLengkap: 'Sate buntel dibuat dari daging kambing cincang yang dibalut lapisan lemak tipis lalu dibakar. Biasanya disajikan dengan kecap manis, irisan bawang merah, cabai, dan kol.',
    queryMaps: 'sate buntel UMKM Solo',
    gambar: '/food_image/sate-buntel.jpg',
    kandunganGizi: {
      kalori: 360,
      lemak: 8,
      karbohidrat: 41,
      protein: 31,
    }
  },
  {
    slug: 'nasi-liwet',
    nama: 'Nasi Liwet',
    deskripsi: 'Nasi gurih yang dimasak dengan santan kaldu ayam. Hidangan ini disajikan bersama sayur labu siam, suwiran ayam, dan kumut.',
    deskripsiLengkap: 'Nasi liwet adalah ikon kuliner Solo. Nasi gurih ini disajikan dalam pincuk daun pisang bersama sayur labu siam, telur pindang, suwiran ayam, dan kumut.',
    queryMaps: 'nasi liwet UMKM Solo',
    gambar: '/food_image/nasi-liwet.jpg',
    kandunganGizi: {
      kalori: 138,
      lemak: 2.72,
      karbohidrat: 25.94,
      protein: 2.74,
    }
  },
  {
    slug: 'serabi',
    nama: 'Serabi Solo',
    deskripsi: 'Jajanan tradisional dari tepung beras dan santan. Proses pemanggangan menggunakan arang memberikan aroma khas.',
    deskripsiLengkap: 'Serabi Solo digulung dan memiliki pinggiran tipis yang renyah dengan bagian tengah lembut dan kaya santan. Varian klasiknya adalah polos dan cokelat meses.',
    queryMaps: 'serabi Solo UMKM',
    gambar: '/food_image/serabi.jpg',
    kandunganGizi: {
      kalori: 108,
      lemak: 1.8,
      karbohidrat: 21.05,
      protein: 1.59,
    }
  },
  {
    slug: 'tengkleng',
    nama: 'Tengkleng',
    deskripsi: 'Olahan tulang kambing berkuah rempah yang ringan dan hangat.',
    deskripsiLengkap: 'Tengkleng memanfaatkan tulang kambing dengan sedikit daging dan kuah rempah yang lebih encer dari gulai. Hidangan ini dikenal sebagai salah satu rasa khas pasar tradisional Solo.',
    queryMaps: 'tengkleng UMKM Solo',
    gambar: '/food_image/tengkleng.jpg',
    kandunganGizi: {
      kalori: 290,
      lemak: 9.2,
      karbohidrat: 0,
      protein: 23,
    }
  },
  {
    slug: 'selat-solo',
    nama: 'Selat Solo',
    deskripsi: 'Bistik daging khas Jawa dengan kuah manis gurih dan sayuran.',
    deskripsiLengkap: 'Selat Solo merupakan adaptasi bistik Eropa yang disesuaikan dengan lidah Jawa. Daging sapi, telur kecap, kentang, buncis, dan wortel disajikan dengan kuah encer manis.',
    queryMaps: 'selat Solo UMKM',
    gambar: '/food_image/selat-solo.jpeg',
    kandunganGizi: {
      kalori: 344,
      lemak: 12.35,
      karbohidrat: 26.61,
      protein: 31.56,
    }
  },
  {
    slug: 'timlo-solo',
    nama: 'Timlo Solo',
    deskripsi: 'Sup kaldu bening berisi sosis Solo, telur pindang, dan ati ampela.',
    deskripsiLengkap: 'Timlo adalah sup berkuah kaldu bening dengan sosis Solo, telur pindang, serta ati ampela. Kuahnya ringan dan sering disantap bersama nasi.',
    queryMaps: 'timlo Solo UMKM',
    gambar: '/food_image/timlo-solo.jpg',
    kandunganGizi: {
      kalori: 318,
      lemak: 12.67,
      karbohidrat: 27.3,
      protein: 23.42,
    }
  },
  {
    slug: 'cabuk-rambak',
    nama: 'Cabuk Rambak',
    deskripsi: 'Irisan ketupat dengan saus wijen dan kerupuk karak.',
    deskripsiLengkap: 'Cabuk rambak berupa irisan tipis ketupat yang disiram saus berbahan wijen dan kemiri. Hidangan sederhana ini biasa disajikan di atas pincuk daun pisang.',
    queryMaps: 'cabuk rambak Solo UMKM',
    gambar: '/food_image/cabuk-rambak.jpeg',
    kandunganGizi: {
      kalori: 285,
      lemak: 14,
      karbohidrat: 36,
      protein: 4,
    }
  },
  {
    slug: 'brambang-asem',
    nama: 'Brambang Asem',
    deskripsi: 'Sambal bawang merah dan asam jawa dengan daun ubi rebus.',
    deskripsiLengkap: 'Brambang asem memadukan bawang merah, asam jawa, gula jawa, dan cabai. Sambal ini disajikan dengan daun ubi jalar rebus dan tempe gembus.',
    queryMaps: 'brambang asem Solo UMKM',
    gambar: '/food_image/brambang-asem.jpg',
    kandunganGizi: {
      kalori: 145,
      lemak: 2.5,
      karbohidrat: 24,
      protein: 6.5,
    }
  },
  {
    slug: 'sosis-solo',
    nama: 'Sosis Solo',
    deskripsi: 'Sosis gulung khas Solo yang terbuat dari daging ayam dan telur, dibungkus kulit tipis.',
    deskripsiLengkap: 'Sosis Solo adalah jajanan tradisional yang terbuat dari daging ayam dan telur, dibungkus dengan kulit tipis. Biasanya digoreng hingga matang dan disajikan hangat.',
    queryMaps: 'sosis Solo UMKM',
    gambar: '/food_image/sosis-solo.jpg',
    kandunganGizi: {
      kalori: 70,
      lemak: 3.58,
      karbohidrat: 5.57,
      protein: 3.83,
    }
  },
  {
    slug: 'tahu-kupat',
    nama: 'Tahu Kupat',
    deskripsi: 'Tahu goreng yang disajikan dengan kupat, saus kacang, dan taburan bawang goreng.',
    deskripsiLengkap: 'Tahu kupat adalah hidangan sederhana yang menggabungkan tahu goreng dengan potongan kupat, disiram saus kacang manis pedas, dan ditaburi bawang goreng.',
    queryMaps: 'tahu kupat Solo UMKM',
    gambar: '/food_image/tahu-kupat.jpg',
    kandunganGizi: {
      kalori: 391,
      lemak: 10.89,
      karbohidrat: 62.65,
      protein: 11.26,
    }
  },
  {
    slug: 'sate-kere',
    nama: 'Sate Kere',
    deskripsi: 'Sate dari tempe gembus yang dibakar dan disajikan dengan bumbu kacang khas Solo.',
    deskripsiLengkap: 'Sate kere adalah sate yang terbuat dari tempe gembus, dibakar hingga harum, dan disajikan dengan bumbu kacang manis pedas. Hidangan ini populer di kalangan masyarakat Solo.',
    queryMaps: 'sate kere Solo UMKM',
    gambar: '/food_image/sate-kere.jpeg',
    kandunganGizi: {
      kalori: 395,
      lemak: 28,
      karbohidrat: 22,
      protein: 14,
    }
  },
  {
    slug: 'lenjongan',
    nama: 'Lenjongan',
    deskripsi: 'Aneka jajanan pasar tradisional seperti tiwul, getuk, cenil, gendar, dan klepon yang diberi taburan kelapa parut serta siraman gula merah cair',
    deskripsiLengkap: 'Aneka jajanan pasar tradisional seperti tiwul, getuk, cenil, gendar, dan klepon yang diberi taburan kelapa parut serta siraman gula merah cair',
    queryMaps: 'lenjongan Solo UMKM',
    gambar: '/food_image/lenjongan.jpeg',
    kandunganGizi: {
      kalori: 360,
      lemak: 8,
      karbohidrat: 69,
      protein: 3,
    }
  }
];