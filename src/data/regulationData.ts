export interface Regulation {
  no: number;
  jenis: string;
  nomor: string;
  tahun: string;
  tentang: string;
  link: string;
  status: string;
  tag: string;
}

export const REGULATION_DATA: Regulation[] = [
  {
    no: 1,
    jenis: "Undang-undang",
    nomor: "419",
    tahun: "1949",
    tentang: "Ordonasi Obat Keras",
    link: "https://www.gpfarmasi.id/po-content/uploads/uu_no-_419_th_1949_ttg_ordonansi_obat_keras.pdf",
    status: "dicabut oleh UU No. 17 Tahun 2023 tentang Kesehatan",
    tag: "Obat"
  },
  {
    no: 2,
    jenis: "Kepmenkes",
    nomor: "347",
    tahun: "1990",
    tentang: "Obat Wajib Apotik",
    link: "http://hukor.kemkes.go.id/uploads/produk_hukum/No._347-MENKES-SK-VII-1990_.pdf",
    status: "Berlaku",
    tag: "Obat"
  },
  {
    no: 3,
    jenis: "Kepmenkes",
    nomor: "1176",
    tahun: "1999",
    tentang: "Daftar Obat Wajib Apotik No.3",
    link: "http://hukor.kemkes.go.id/uploads/produk_hukum/Kepmenkes_RI_No.1176-MENKES-SK-X-1999_ttg_Daftar_Obat_Wajib_Apotik_No_.3_1.pdf",
    status: "Berlaku",
    tag: "Obat"
  },
  {
    no: 4,
    jenis: "Kepmenkes",
    nomor: "679",
    tahun: "2003",
    tentang: "Registrasi Dan Izin Kerja Apoteker",
    link: "http://hukor.kemkes.go.id/uploads/produk_hukum/KMK%20No.%20679%20ttg%20Registrasi%20Dan%20Izin%20Kerja%20Apoteker.pdf",
    status: "Berlaku",
    tag: "Apoteker"
  },
  {
    no: 5,
    jenis: "Kepmenkes",
    nomor: "1027",
    tahun: "2004",
    tentang: "Standar Pelayanan Kefarmasian Di Apotek",
    link: "http://hukor.kemkes.go.id/uploads/produk_hukum/KMK_No.1027-MENKES-SK-IX-2004_ttg_Standar_Pelayanan_Kefarmasian_di_Apotek_.pdf",
    status: "Berlaku",
    tag: "Pelayanan"
  },
  {
    no: 6,
    jenis: "Kepmenkes",
    nomor: "1197",
    tahun: "2004",
    tentang: "Standar Pelayanan Farmasi Di RS",
    link: "http://hukor.kemkes.go.id/uploads/produk_hukum/KMK%20No.%201197%20ttg%20Standar%20Pelayanan%20Farmasi%20Di%20RS.pdf",
    status: "Berlaku",
    tag: "Pelayanan"
  },
  {
    no: 7,
    jenis: "Peraturan Pemerintah",
    nomor: "72",
    tahun: "1998",
    tentang: "Pengamanan Sediaan Farmasi Dan Alat Kesehatan",
    link: "http://hukor.kemkes.go.id/uploads/produk_hukum/PP%20No.%2072%20Th%201998%20ttg%20Pengamanan%20Sediaan%20Farmasi%20Dan%20Alat%20Kesehatan.pdf",
    status: "Berlaku",
    tag: "Obat"
  },
  {
    no: 8,
    jenis: "Keputusan Kepala BPOM",
    nomor: "317",
    tahun: "2023",
    tentang: "Penerapan Pilot Project E-Labeling",
    link: "https://jdih.pom.go.id/download/product/1572/317/2023",
    status: "Berlaku",
    tag: ""
  },
  {
    no: 9,
    jenis: "Keputusan Kepala BPOM",
    nomor: "284",
    tahun: "2023",
    tentang: "Penahapan Pelaksanaan Pelaporan Pengelolaan Obat dengan 2D Barcode Metode Otentifikasi oleh Fasilitas Distribusi dan Fasilitas Pelayanan Kefarmasian",
    link: "https://jdih.pom.go.id/download/product/1547/284/2023",
    status: "Berlaku",
    tag: ""
  },
  {
    no: 10,
    jenis: "Keputusan Kepala BPOM",
    nomor: "148",
    tahun: "2023",
    tentang: "Pedoman Cara Regulatori Obat yang Baik",
    link: "https://jdih.pom.go.id/download/product/1487/148/2023",
    status: "Berlaku",
    tag: ""
  },
  {
    no: 11,
    jenis: "Peraturan BPOM",
    nomor: "24",
    tahun: "2021",
    tentang: "Pengawasan Pengelolaan Obat, Bahan Obat, Narkotika, Psikotropika, Dan Prekursor Farmasi Di Fasilitas Pelayanan Kefarmasian",
    link: "https://jdih.pom.go.id/download/product/1303/24/2021",
    status: "Berlaku",
    tag: "Napza"
  },
  {
    no: 12,
    jenis: "Permenkes",
    nomor: "34",
    tahun: "2021",
    tentang: "Standar Pelayanan Kefarmasian di Klinik",
    link: "https://yankes.kemkes.go.id/unduhan/fileunduhan_1658481068_836996.pdf",
    status: "Berlaku",
    tag: "Pelayanan"
  },
  {
    no: 13,
    jenis: "Permenkes",
    nomor: "26",
    tahun: "2020",
    tentang: "Standar Pelayanan Kefarmasian dI Puskesmas",
    link: "https://yankes.kemkes.go.id/unduhan/fileunduhan_1660188767_719966.pdf",
    status: "Berlaku",
    tag: "Pelayanan"
  },
  {
    no: 14,
    jenis: "Permenkes",
    nomor: "3",
    tahun: "2021",
    tentang: "Perubahan Penggolongan, Pembatasan, dan Kategori Obat",
    link: "https://yankes.kemkes.go.id/unduhan/fileunduhan_1658478924_739227.pdf",
    status: "Berlaku",
    tag: "Obat"
  },
  {
    no: 15,
    jenis: "Undang-undang",
    nomor: "17",
    tahun: "2023",
    tentang: "Kesehatan",
    link: "https://peraturan.bpk.go.id/Download/314883/UU%20Nomor%2017%20Tahun%202023.pdf",
    status: "Berlaku",
    tag: "Kesehatan"
  },
  {
    no: 16,
    jenis: "Permenkes",
    nomor: "1175",
    tahun: "2010",
    tentang: "Izin Produksi Kosmetika",
    link: "https://peraturan.bpk.go.id/Download/120747/Permenkes%20Nomor%201175%20Tahun%202010.pdf",
    status: "Berlaku",
    tag: "Kosmetika"
  },
  {
    no: 17,
    jenis: "Permenkes",
    nomor: "26",
    tahun: "2018",
    tentang: "Pelayanan Perizinan Berusaha Terintegrasi Secara Elektronik Sektor Kesehatan",
    link: "https://peraturan.bpk.go.id/Download/102876/Permenkes%20Nomor%2026%20Tahun%202018.pdf",
    status: "Dicabut dengan Permenkes No. 30 Tahun 2019 tentang Klasifikasi dan Perizinan Rumah Sakit",
    tag: ""
  },
  {
    no: 18,
    jenis: "Permenkes",
    nomor: "63",
    tahun: "2013",
    tentang: "Perubahan atas Peraturan Menteri Kesehatan Nomor 1175/MENKES/PER/VIII/2010 tentang Izin Produksi Kosmetika",
    link: "https://peraturan.bpk.go.id/Download/120770/Permenkes%20Nomor%2063%20Tahun%202013.pdf",
    status: "Diubah dengan Permenkes No. 26 Tahun 2018 tentang Pelayanan Perizinan Berusaha Terintegrasi Secara Elektronik Sektor Kesehatan",
    tag: "Kosmetika"
  },
  {
    no: 19,
    jenis: "Permenkes",
    nomor: "30",
    tahun: "2019",
    tentang: "Klasifikasi dan Perizinan Rumah Sakit",
    link: "https://peraturan.bpk.go.id/Download/129889/Permenkes%20Nomor%2030%20Tahun%202019.pdf",
    status: "Dicabut dengan Permenkes No. 3 Tahun 2020 tentang Klasifikasi dan Perizinan Rumah Sakit",
    tag: "Rumah Sakit"
  },
  {
    no: 20,
    jenis: "Permenkes ",
    nomor: "3",
    tahun: "2020",
    tentang: "Klasifikasi dan Perizinan Rumah Sakit",
    link: "https://peraturan.bpk.go.id/Download/144763/Permenkes%20Nomor%203%20Tahun%202020.pdf",
    status: "Berlaku",
    tag: "Rumah Sakit"
  },
  {
    no: 21,
    jenis: "Permenkes",
    nomor: "23",
    tahun: "2020",
    tentang: "Penetapan dan Perubahan Penggolongan Psikotropika",
    link: "https://peraturan.bpk.go.id/Download/144826/Permenkes%20Nomor%2023%20Tahun%202020.pdf",
    status: "Dicabut dengan Permenkes No. 2 tahun 2021 tentang Penetapan dan Perubahan Penggolongan Psikotropika",
    tag: "NAPZA"
  },
  {
    no: 22,
    jenis: "Permenkes",
    nomor: "2",
    tahun: "2021",
    tentang: " Penetapan dan Perubahan Penggolongan Psikotropika",
    link: "https://peraturan.bpk.go.id/Download/162765/Permenkes%20Nomor%202%20Tahun%202021.pdf",
    status: "Dicabut dengan Permenkes No. 10 Tahun 2022 tentang Penetapan dan Perubahan Penggolongan Psikotropika",
    tag: "Napza"
  },
  {
    no: 23,
    jenis: "Permenkes",
    nomor: "10",
    tahun: "2022",
    tentang: " Penetapan dan Perubahan Penggolongan Psikotropika",
    link: "https://peraturan.bpk.go.id/Download/212691/Permenkes%20Nomor%2010%20Tahun%202022.pdf",
    status: "Berlaku",
    tag: "NAPZA"
  },
  {
    no: 24,
    jenis: "Permenkes",
    nomor: "36",
    tahun: "2022",
    tentang: "Perubahan Penggolongan Narkotika",
    link: "https://peraturan.bpk.go.id/Download/301576/Permenkes%20Nomor%2036%20Tahun%202022.pdf",
    status: "Berlaku",
    tag: "NAPZA"
  },
  {
    no: 25,
    jenis: "Permenkes",
    nomor: "33",
    tahun: "2017",
    tentang: "Monitoring Dan Evaluasi Terhadap Perencanaan, Pengadaan Berdasarkan Katalog Elektronik Dan Pemakaian Obat",
    link: "https://peraturan.bpk.go.id/Download/103044/Permenkes%20Nomor%2033%20Tahun%202017.pdf",
    status: "Dicabut dengan Permenkes No. 5 Tahun 2019 tentang Perencanaan dan Pengadaan Obat Berdasarkan Katalog Elektronik",
    tag: "Sistem"
  },
  {
    no: 26,
    jenis: "Permenkes",
    nomor: "5",
    tahun: "2019",
    tentang: "Perencanaan dan Pengadaan Obat Berdasarkan Katalog Elektronik",
    link: "https://peraturan.bpk.go.id/Download/120657/Permenkes%20Nomor%205%20Tahun%202019.pdf",
    status: "Berlaku",
    tag: "Sistem"
  },
  {
    no: 27,
    jenis: "Permenkes",
    nomor: "63",
    tahun: "2014",
    tentang: "Pengadaan Obat Berdasarkan Katalog Elektronik (E-Catalogue)",
    link: "https://peraturan.bpk.go.id/Download/120658/Permenkes%20Nomor%2063%20Tahun%202014.pdf",
    status: "Dicabut dengan Permenkes No. 5 Tahun 2019 tentang Perencanaan dan Pengadaan Obat Berdasarkan Katalog Elektronik",
    tag: "Sistem"
  },
  {
    no: 28,
    jenis: "Permenkes",
    nomor: "246",
    tahun: "1990",
    tentang: "Izin Usaha Industri Obat Tradisional dan Pendaftaran Obat Tradisional",
    link: "https://peraturan.bpk.go.id/Download/131331/Permenkes%20Nomor%20246%20Tahun%201990.pdf",
    status: "Dicabut dengan Permenkes No. 6 Tahun 2012 tentang Inudstri dan Usaha Obat Tradisional",
    tag: "Obat"
  },
  {
    no: 29,
    jenis: "Permenkes",
    nomor: "6",
    tahun: "2012",
    tentang: "Industri dan Usaha Obat Tradisional",
    link: "https://peraturan.bpk.go.id/Download/120760/Permenkes%20Nomor%206%20Tahun%202012.pdf",
    status: "Diubah dengan Permenkes No. 26 Tahun 2018 tentang Pelayanan Perizinan Berusaha Terintegrasi Secara Elektronik Sektor Kesehatan",
    tag: "Obat"
  },
  {
    no: 30,
    jenis: "Permenkes",
    nomor: "74",
    tahun: "2016",
    tentang: "Standar Pelayanan Kefarmasian di Puskesmas",
    link: "https://peraturan.bpk.go.id/Download/105578/Permenkes%20Nomor%2074%20Tahun%202016.pdf",
    status: "Diubah dengan Permenkes No. 26 tahun 2020 tentang Standar Pelayananan Kefarmasian di Puskesmas",
    tag: "Pelayanan"
  },
  {
    no: 31,
    jenis: "Permenkes",
    nomor: "73",
    tahun: "2016",
    tentang: "Standar Pelayanan Kefarmasian di Apotek",
    link: "https://peraturan.bpk.go.id/Download/105574/Permenkes%20Nomor%2073%20Tahun%202016.pdf",
    status: "Berlaku",
    tag: "Pelayanan"
  },
  {
    no: 32,
    jenis: "Permenkes",
    nomor: "35",
    tahun: "2016",
    tentang: "Standar Pelayanan Kefarmasian di Apotek",
    link: "https://peraturan.bpk.go.id/Download/104014/Permenkes%20Nomor%2035%20Tahun%202016.pdf",
    status: "Dicabut dengan Permenkes No. 73 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Apotek",
    tag: "Pelayanan"
  },
  {
    no: 33,
    jenis: "Permenkes",
    nomor: "35",
    tahun: "2014",
    tentang: "Standar Pelayanan Kefarmasian di Apotek",
    link: "https://peraturan.bpk.go.id/Download/108358/Permenkes%20Nomor%2035%20Tahun%202014.pdf",
    status: "Dicabut dengan Permenkes No. 73 Tahun 2016 tentang Standar Pelayanan Kefarmasian di Apotek",
    tag: "Pelayanan"
  },
  {
    no: 34,
    jenis: "Permenkes",
    nomor: "34",
    tahun: "2016",
    tentang: "Standar Pelayanan Kefarmasian di Rumah Sakit",
    link: "https://peraturan.bpk.go.id/Download/104013/Permenkes%20Nomor%2034%20Tahun%202016.pdf",
    status: "Dicabut dengan Permenkes No. 72 Tahun 2016 tentang Standar Pelayanan Kefarmasian Di Rumah Sakit",
    tag: "Pelayanan"
  },
  {
    no: 35,
    jenis: "Permenkes",
    nomor: "72",
    tahun: "2016",
    tentang: "Standar Pelayanan Kefarmasian Di Rumah Sakit",
    link: "https://peraturan.bpk.go.id/Download/105431/Permenkes%20Nomor%2072%20Tahun%202016.pdf",
    status: "Berlaku",
    tag: "Pelayanan"
  },
  {
    no: 36,
    jenis: "Permenkes",
    nomor: "889",
    tahun: "2011",
    tentang: "Registrasi, Izin Praktik, dan Izin Kerja Tenaga Kefarmasian",
    link: "https://peraturan.bpk.go.id/Download/131019/Permenkes%20Nomor%20889%20Tahun%202011.pdf",
    status: "Diubah dengan Permenkes No. 80 tahun 2016 dan Permenkes 31 Tahun 2016",
    tag: "Apoteker"
  },
  {
    no: 37,
    jenis: "Permekes",
    nomor: "80",
    tahun: "2016",
    tentang: "Penyelenggaraan Pekerjaan Asisten Tenaga Kesehatan",
    link: "https://peraturan.bpk.go.id/Download/105592/Permenkes%20Nomor%2080%20Tahun%202016.pdf",
    status: "Berlaku",
    tag: "Tenaga"
  },
  {
    no: 38,
    jenis: "Permenkes",
    nomor: "31",
    tahun: "2016",
    tentang: "Registrasi, Izin Praktik, Dan Izin Kerja Tenaga Kefarmasian",
    link: "https://peraturan.bpk.go.id/Download/104010/Permenkes%20Nomor%2031%20Tahun%202016.pdf",
    status: "Diubah dengan Permenkes No. 80 Tahun 2016 tentang Penyelenggaraan Pekerjaan Asisten Tenaga Kesehatan",
    tag: "Apoteker"
  }
];
