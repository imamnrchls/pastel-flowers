/**
 * LAYER 1 — DATA UNDANGAN (Theme-agnostic)
 * Ubah isi window.INVITATION_DATA di bawah ini untuk menyesuaikan detail mempelai,
 * acara, dress code, kisah cinta, galeri, tanda kasih, musik, dan endpoint RSVP.
 */
window.INVITATION_DATA = {
  slug: "nadia-dimas",
  tema: "pastel-flowers",

  mempelai: {
    pria: {
      nama_panggilan: "Dimas",
      nama_lengkap: "Dimas Pratama Wijaya, S.T.",
      peran: "Putra Kedua dari",
      orang_tua: "Bapak Hendra Wijaya & Ibu Ratna Kusuma",
      instagram: "@dimas.pratama",
      foto: ""
    },
    wanita: {
      nama_panggilan: "Nadia",
      nama_lengkap: "Nadia Larasati Putri, S.Ds.",
      peran: "Putri Pertama dari",
      orang_tua: "Bapak Suryo Adi Nugroho & Ibu Dewi Anggraini",
      instagram: "@nadia.larasati",
      foto: ""
    }
  },

  inisial: "N & D",
  tanggal_utama: "2026-12-12T08:00:00+07:00",
  tanggal_teks: "Sabtu, 12 Desember 2026",
  kota: "Bogor, Jawa Barat",

  kutipan: {
    teks: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
    sumber: "QS. Ar-Rum : 21"
  },

  acara: [
    {
      jenis: "akad",
      judul: "Akad Nikah",
      tanggal_iso: "2026-12-12T08:00:00+07:00",
      selesai_iso: "2026-12-12T10:00:00+07:00",
      hari: "Sabtu",
      tanggal_angka: "12",
      bulan_tahun: "Desember 2026",
      waktu: "08.00 – 10.00 WIB",
      tempat: "Villa Taman Asri Heritage",
      alamat: "Jl. Raya Puncak No. 88, Ciawi, Bogor",
      maps_url: "https://www.google.com/maps/search/?api=1&query=Villa+Taman+Asri+Heritage+Jl.+Raya+Puncak+No.+88+Ciawi+Bogor",
      catatan: "Mohon hadir 15 menit lebih awal untuk kekhidmatan prosesi ijab kabul."
    },
    {
      jenis: "resepsi",
      judul: "Resepsi Pernikahan",
      tanggal_iso: "2026-12-12T11:00:00+07:00",
      selesai_iso: "2026-12-12T15:00:00+07:00",
      hari: "Sabtu",
      tanggal_angka: "12",
      bulan_tahun: "Desember 2026",
      waktu: "11.00 – 15.00 WIB",
      tempat: "Villa Taman Asri Heritage",
      alamat: "Jl. Raya Puncak No. 88, Ciawi, Bogor",
      maps_url: "https://www.google.com/maps/search/?api=1&query=Villa+Taman+Asri+Heritage+Jl.+Raya+Puncak+No.+88+Ciawi+Bogor",
      catatan: "Jamuan taman terbuka; alas kaki yang nyaman di area rumput sangat disarankan."
    }
  ],

  dress_code: {
    aktif: true,
    judul: "Garden Heritage Attire",
    catatan: "Kenakan busana bernuansa lembut yang selaras dengan palet taman agar suasana pesta terasa hangat dan harmonis.",
    palet: [
      { nama: "Cream", hex: "#F5EFE4" },
      { nama: "Sage Moss", hex: "#5A6B44" },
      { nama: "Dusty Rose", hex: "#C98D96" },
      { nama: "Blush Petal", hex: "#E5B8BE" },
      { nama: "Burgundy", hex: "#6B1F2E" }
    ],
    ilustrasi: "assets/dress-code.svg"
  },

  cerita: [
    {
      bab: "Bab I",
      tanggal: "Oktober 2021",
      kota: "Bandung",
      judul: "Bab I · Pertemuan di Balik Rintik Hujan",
      deskripsi: "Sebuah sore di halaman perpustakaan kota mempertemukan kami lewat buku sketsa yang tertinggal dan secangkir teh hangat yang tak sengaja dibagi."
    },
    {
      bab: "Bab II",
      tanggal: "Juli 2024",
      kota: "Bogor",
      judul: "Bab II · Tumbuh dalam Musim yang Tenang",
      deskripsi: "Dari perjalanan akhir pekan menyusuri kebun raya hingga percakapan panjang tentang masa depan, kami belajar merawat sabar dan saling menjadi rumah."
    },
    {
      bab: "Bab III",
      tanggal: "Mei 2026",
      kota: "Bogor",
      judul: "Bab III · Ikatan Restu Dua Keluarga",
      deskripsi: "Di bawah naungan doa orang tua dan orang-orang terdekat, kami memantapkan langkah untuk merangkai kehidupan bersama dalam sakinah."
    }
  ],

  galeri: [
    {
      src: "assets/garden-scene.svg",
      alt: "Suasana taman botani berhiaskan bunga pastel yang bermekaran",
      caption: "Di antara rimbun daun dan cahaya pagi, sebuah janji mulai bersemi.",
      featured: true
    },
    {
      src: "assets/venue-villa.svg",
      alt: "Pendopo dan halaman asri Villa Taman Asri Heritage di Ciawi, Bogor",
      caption: "Beranda tenang tempat dua keluarga kelak saling bertaut doa."
    },
    {
      src: "assets/frame-hero.jpg",
      alt: "Bingkai ilustrasi bunga pastel bernuansa klasik",
      caption: "Sekuntum harap yang kami jaga dengan penuh kelembutan."
    },
    {
      src: "assets/floral-divider.jpg",
      alt: "Rangkaian bunga mawar pastel dan dedaunan sage",
      caption: "Setiap kelopak menyimpan cerita tentang syukur dan kesetiaan."
    },
    {
      src: "assets/dress-code.svg",
      alt: "Inspirasi busana Garden Heritage Attire bernuansa lembut",
      caption: "Warna-warna teduh yang memeluk hangat perayaan hari bahagia."
    },
    {
      src: "assets/botanical-corner.jpg",
      alt: "Detail ornamen dedaunan dan kuntum bunga di sudut taman",
      caption: "Ketenangan alam Bogor yang menjadi saksi langkah baru kami."
    }
  ],

  amplop: [
    {
      bank: "Bank BCA",
      no_rekening: "5470 8192 34",
      atas_nama: "Dimas Pratama Wijaya"
    },
    {
      bank: "Bank Mandiri",
      no_rekening: "133 00 2948 7612",
      atas_nama: "Nadia Larasati Putri"
    }
  ],

  alamat_kado: {
    penerima: "Nadia & Dimas",
    alamat: "Jl. Taman Anggrek No. 14, Bogor Tengah, Kota Bogor 16122",
    catatan: "Konfirmasi pengiriman dapat disampaikan melalui WhatsApp keluarga."
  },

  musik: {
    url: "",
    judul: "Garden Waltz (Instrumental)"
  },

  penutup: {
    judul: "Sampai Jumpa di Hari Bahagia",
    pesan: "Kehadiran serta doa restu Bapak/Ibu/Saudara/i merupakan anugerah terindah bagi langkah awal kehidupan rumah tangga kami.",
    salam: "Dengan penuh kasih,"
  },

  rsvp_endpoint: "",

  section_order: [
    "pembuka",
    "ayat",
    "mempelai",
    "acara",
    "dresscode",
    "cerita",
    "galeri",
    "hadiah",
    "rsvp",
    "penutup"
  ]
};

(function () {
  "use strict";

  var data = window.INVITATION_DATA;
  if (!data || !data.mempelai) return;

  var defaults = {
    pria: data.mempelai.pria.nama_panggilan,
    wanita: data.mempelai.wanita.nama_panggilan
  };

  function cleanName(value, fallback) {
    var trimmed = String(value == null ? "" : value).trim().slice(0, 24);
    return trimmed || fallback;
  }

  function firstLetter(name, fallback) {
    var chars = Array.from(cleanName(name, fallback));
    return (chars[0] || "").toUpperCase();
  }

  function applyNames(a, b) {
    var priaName = cleanName(a, defaults.pria);
    var wanitaName = cleanName(b, defaults.wanita);

    data.mempelai.pria.nama_panggilan = priaName;
    data.mempelai.wanita.nama_panggilan = wanitaName;
    data.inisial = firstLetter(wanitaName, defaults.wanita) + " & " + firstLetter(priaName, defaults.pria);

    return {
      pria: priaName,
      wanita: wanitaName,
      inisial: data.inisial
    };
  }

  var params = new URLSearchParams(window.location.search);
  if (params.has("a") || params.has("b")) {
    applyNames(
      params.has("a") ? params.get("a") : defaults.pria,
      params.has("b") ? params.get("b") : defaults.wanita
    );
  }

  window.lkSampleNames = function (a, b) {
    var result = applyNames(a, b);
    document.dispatchEvent(
      new CustomEvent("lk:names-updated", {
        bubbles: true,
        detail: result
      })
    );
    return result;
  };
})();
