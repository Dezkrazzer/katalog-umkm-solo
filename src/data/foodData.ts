export interface Kuliner {
  slug: string;
  nama: string;
  deskripsi: string;
  gambar: string;
  deskripsiLengkap: string;
  queryMaps: string;
}

export const daftarKuliner: Kuliner[] = [
  {
    slug: 'sate-buntel',
    nama: 'Sate Buntel',
    deskripsi: 'Sate daging kambing cincang yang dibungkus lemak tipis, kemudian dibakar. Hidangan ini kaya rempah dan memiliki tekstur empuk.',
    deskripsiLengkap: 'Sate buntel dibuat dari daging kambing cincang yang dibalut lapisan lemak tipis lalu dibakar. Biasanya disajikan dengan kecap manis, irisan bawang merah, cabai, dan kol.',
    queryMaps: 'sate buntel UMKM Solo',
    gambar: '/food_image/sate-buntel.jpg'
  },
  {
    slug: 'nasi-liwet',
    nama: 'Nasi Liwet',
    deskripsi: 'Nasi gurih yang dimasak dengan santan kaldu ayam. Hidangan ini disajikan bersama sayur labu siam, suwiran ayam, dan kumut.',
    deskripsiLengkap: 'Nasi liwet adalah ikon kuliner Solo. Nasi gurih ini disajikan dalam pincuk daun pisang bersama sayur labu siam, telur pindang, suwiran ayam, dan kumut.',
    queryMaps: 'nasi liwet UMKM Solo',
    gambar: '/food_image/nasi-liwet.jpg'
  },
  {
    slug: 'serabi',
    nama: 'Serabi Solo',
    deskripsi: 'Jajanan tradisional dari tepung beras dan santan. Proses pemanggangan menggunakan arang memberikan aroma khas.',
    deskripsiLengkap: 'Serabi Solo digulung dan memiliki pinggiran tipis yang renyah dengan bagian tengah lembut dan kaya santan. Varian klasiknya adalah polos dan cokelat meses.',
    queryMaps: 'serabi Solo UMKM',
    gambar: '/food_image/serabi.jpg'
  },
  {
    slug: 'tengkleng',
    nama: 'Tengkleng',
    deskripsi: 'Olahan tulang kambing berkuah rempah yang ringan dan hangat.',
    deskripsiLengkap: 'Tengkleng memanfaatkan tulang kambing dengan sedikit daging dan kuah rempah yang lebih encer dari gulai. Hidangan ini dikenal sebagai salah satu rasa khas pasar tradisional Solo.',
    queryMaps: 'tengkleng UMKM Solo',
    gambar: '/food_image/tengkleng.jpg'
  },
  {
    slug: 'selat-solo',
    nama: 'Selat Solo',
    deskripsi: 'Bistik daging khas Jawa dengan kuah manis gurih dan sayuran.',
    deskripsiLengkap: 'Selat Solo merupakan adaptasi bistik Eropa yang disesuaikan dengan lidah Jawa. Daging sapi, telur kecap, kentang, buncis, dan wortel disajikan dengan kuah encer manis.',
    queryMaps: 'selat Solo UMKM',
    gambar: '/food_image/selat-solo.jpeg'
  },
  {
    slug: 'timlo-solo',
    nama: 'Timlo Solo',
    deskripsi: 'Sup kaldu bening berisi sosis Solo, telur pindang, dan ati ampela.',
    deskripsiLengkap: 'Timlo adalah sup berkuah kaldu bening dengan sosis Solo, telur pindang, serta ati ampela. Kuahnya ringan dan sering disantap bersama nasi.',
    queryMaps: 'timlo Solo UMKM',
    gambar: '/food_image/timlo-solo.jpg'
  },
  {
    slug: 'cabuk-rambak',
    nama: 'Cabuk Rambak',
    deskripsi: 'Irisan ketupat dengan saus wijen dan kerupuk karak.',
    deskripsiLengkap: 'Cabuk rambak berupa irisan tipis ketupat yang disiram saus berbahan wijen dan kemiri. Hidangan sederhana ini biasa disajikan di atas pincuk daun pisang.',
    queryMaps: 'cabuk rambak Solo UMKM',
    gambar: '/food_image/cabuk-rambak.jpeg'
  },
  {
    slug: 'brambang-asem',
    nama: 'Brambang Asem',
    deskripsi: 'Sambal bawang merah dan asam jawa dengan daun ubi rebus.',
    deskripsiLengkap: 'Brambang asem memadukan bawang merah, asam jawa, gula jawa, dan cabai. Sambal ini disajikan dengan daun ubi jalar rebus dan tempe gembus.',
    queryMaps: 'brambang asem Solo UMKM',
    gambar: '/food_image/brambang-asem.jpg'
  },
  {
    slug: 'sosis-solo',
    nama: 'Sosis Solo',
    deskripsi: 'Sosis gulung khas Solo yang terbuat dari daging ayam dan telur, dibungkus kulit tipis.',
    deskripsiLengkap: 'Sosis Solo adalah jajanan tradisional yang terbuat dari daging ayam dan telur, dibungkus dengan kulit tipis. Biasanya digoreng hingga matang dan disajikan hangat.',
    queryMaps: 'sosis Solo UMKM',
    gambar: '/food_image/sosis-solo.jpg'
  },
  {
    slug: 'tahu-kupat',
    nama: 'Tahu Kupat',
    deskripsi: 'Tahu goreng yang disajikan dengan kupat, saus kacang, dan taburan bawang goreng.',
    deskripsiLengkap: 'Tahu kupat adalah hidangan sederhana yang menggabungkan tahu goreng dengan potongan kupat, disiram saus kacang manis pedas, dan ditaburi bawang goreng.',
    queryMaps: 'tahu kupat Solo UMKM',
    gambar: '/food_image/tahu-kupat.jpg'
  },
  {
    slug: 'sate-kere',
    nama: 'Sate Kere',
    deskripsi: 'Sate dari tempe gembus yang dibakar dan disajikan dengan bumbu kacang khas Solo.',
    deskripsiLengkap: 'Sate kere adalah sate yang terbuat dari tempe gembus, dibakar hingga harum, dan disajikan dengan bumbu kacang manis pedas. Hidangan ini populer di kalangan masyarakat Solo.',
    queryMaps: 'sate kere Solo UMKM',
    gambar: '/food_image/sate-kere.jpeg'
  },
  {
    slug: 'lenjongan',
    nama: 'Lenjongan',
    deskripsi: 'Aneka jajanan pasar tradisional seperti tiwul, getuk, cenil, gendar, dan klepon yang diberi taburan kelapa parut serta siraman gula merah cair',
    deskripsiLengkap: 'Aneka jajanan pasar tradisional seperti tiwul, getuk, cenil, gendar, dan klepon yang diberi taburan kelapa parut serta siraman gula merah cair',
    queryMaps: 'lenjongan Solo UMKM',
    gambar: '/food_image/lenjongan.jpeg'
  }
];