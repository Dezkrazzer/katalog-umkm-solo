export type Umkm = {
  id: string;
  nama_makanan: string;
  nama_umkm: string;
  deskripsi_singkat: string;
  deskripsi_lengkap: string;
  alamat: string; // always fictional in this build
  url_gambar: string | null; // null → render the fallback
  alt_gambar: string;
  is_demo: true;
};

export const daftarUmkm: Umkm[] = [
  {
    id: "mkn-01",
    nama_makanan: "Nasi Liwet",
    nama_umkm: "Warung Liwet Yu Sani",
    deskripsi_singkat: "Nasi gurih dengan sayur labu siam dan suwiran ayam kampung.",
    deskripsi_lengkap:
      "Nasi liwet adalah ikon kuliner Solo. Dimasak dengan santan kaldu ayam yang memberikan aroma gurih nan wangi. Disajikan dalam pincuk daun pisang bersama sayur labu siam pedas, telur pindang, dan kumut (santan kental).",
    alamat: "Jl. Melati Demo No. 3, Banjarsari, Surakarta",
    url_gambar: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    alt_gambar: "Foto ilustrasi hidangan nasi liwet",
    is_demo: true,
  },
  {
    id: "mkn-02",
    nama_makanan: "Tengkleng",
    nama_umkm: "Tengkleng Klewer Bu Edi",
    deskripsi_singkat: "Olahan tulang kambing berkuah bumbu rempah encer.",
    deskripsi_lengkap:
      "Sejarahnya berasal dari masa kolonial dimana masyarakat Solo memanfaatkan tulang belulang kambing dengan sedikit daging. Kuahnya kaya akan rempah kunyit, serai, dan kayu manis namun lebih encer dari gulai.",
    alamat: "Jl. Cempaka Demo No. 8, Pasar Kliwon, Surakarta",
    url_gambar: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    alt_gambar: "Foto ilustrasi hidangan tengkleng kambing",
    is_demo: true,
  },
  {
    id: "mkn-03",
    nama_makanan: "Serabi Solo",
    nama_umkm: "Serabi Notosuman Ny. Lidia",
    deskripsi_singkat: "Kue panekuk tradisional berbahan dasar tepung beras dan santan.",
    deskripsi_lengkap:
      "Berbeda dengan serabi daerah lain, Serabi Solo digulung dan memiliki pinggiran yang tipis renyah dengan bagian tengah yang lembut dan kaya santan. Varian klasiknya adalah polos dan cokelat meses.",
    alamat: "Jl. Kenanga Demo No. 15, Serengan, Surakarta",
    url_gambar: "https://images.unsplash.com/photo-1624462966581-bc567e58cb30?w=800&q=80",
    alt_gambar: "Foto ilustrasi serabi Solo",
    is_demo: true,
  },
  {
    id: "mkn-04",
    nama_makanan: "Selat Solo",
    nama_umkm: "Selat Mbak Lies",
    deskripsi_singkat: "Bistik daging khas Jawa dengan kuah manis gurih dan sayuran.",
    deskripsi_lengkap:
      "Adaptasi dari bistik Eropa (Biefstuk) pada masa Hindia Belanda yang disesuaikan dengan lidah keraton Kasunanan Surakarta. Terdiri dari daging sapi, telur kecap, kentang goreng, buncis, wortel, dan disiram kuah encer manis.",
    alamat: "Jl. Anggrek Demo No. 21, Laweyan, Surakarta",
    url_gambar: "https://images.unsplash.com/photo-1604908177525-ce50bb4db1f4?w=800&q=80",
    alt_gambar: "Foto ilustrasi selat Solo",
    is_demo: true,
  },
  // ---- Fictional demo entries (names and addresses invented for layout testing) ----
  {
    id: "mkn-05",
    nama_makanan: "Timlo Solo",
    nama_umkm: "Warung Timlo Sekar Jagad",
    deskripsi_singkat: "Sup kuah bening dengan sosis Solo, telur pindang, dan ati ampela.",
    deskripsi_lengkap:
      "Timlo adalah sup berkuah kaldu bening yang ringan. Isiannya biasanya sosis Solo (dadar telur gulung berisi daging ayam), telur pindang, serta ati ampela, dan sering disantap bersama nasi.",
    alamat: "Jl. Dahlia Demo No. 5, Jebres, Surakarta",
    url_gambar: null,
    alt_gambar: "Ilustrasi timlo Solo",
    is_demo: true,
  },
  {
    id: "mkn-06",
    nama_makanan: "Sate Buntel",
    nama_umkm: "Sate Buntel Kembang Setaman",
    deskripsi_singkat: "Daging kambing cincang dibungkus lemak lalu dibakar.",
    deskripsi_lengkap:
      "Sate buntel dibuat dari daging kambing cincang yang dibalut lapisan lemak tipis lalu dibakar dalam tusukan besar. Biasanya disajikan dengan kecap manis, irisan bawang merah, cabai, dan kol.",
    alamat: "Jl. Flamboyan Demo No. 11, Laweyan, Surakarta",
    url_gambar: null,
    alt_gambar: "Ilustrasi sate buntel",
    is_demo: true,
  },
  {
    id: "mkn-07",
    nama_makanan: "Cabuk Rambak",
    nama_umkm: "Cabuk Rambak Mbok Jinem",
    deskripsi_singkat: "Irisan ketupat bersiram saus wijen, disantap dengan karak.",
    deskripsi_lengkap:
      "Cabuk rambak berupa irisan tipis ketupat yang disiram saus berbahan wijen dan kemiri. Hidangan sederhana ini biasa disajikan di atas pincuk daun pisang bersama kerupuk karak.",
    alamat: "Jl. Bougenvil Demo No. 2, Pasar Kliwon, Surakarta",
    url_gambar: null,
    alt_gambar: "Ilustrasi cabuk rambak",
    is_demo: true,
  },
  {
    id: "mkn-08",
    nama_makanan: "Brambang Asem",
    nama_umkm: "Pawon Brambang Asem Sumirah",
    deskripsi_singkat: "Sambal bawang merah dan asam jawa dengan daun ubi rebus.",
    deskripsi_lengkap:
      "Brambang asem adalah sambal manis, asam, dan pedas dari bawang merah, asam jawa, gula jawa, dan cabai. Disajikan dengan daun ubi jalar rebus dan tempe gembus.",
    alamat: "Jl. Teratai Demo No. 9, Serengan, Surakarta",
    url_gambar: null,
    alt_gambar: "Ilustrasi brambang asem",
    is_demo: true,
  },
];
