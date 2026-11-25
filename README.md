# Pastel Flowers — Template Undangan Pernikahan Digital

Template undangan pernikahan bernuansa taman botani dan bunga pastel klasik yang dibangun dengan arsitektur **3 lapis (Data · Skeleton · Theme)** agar konten pasangan, logika interaktif, dan tampilan visual mudah disesuaikan tanpa saling mengganggu.

## Arsitektur 3 Lapis

1. **Layer 1 — Data (`data/invitation.js`)**
   Berisi seluruh data undangan pada `window.INVITATION_DATA`: profil mempelai, kutipan ayat, jadwal acara, *dress code*, kisah cinta, galeri foto, rekening amplop digital, alamat kado fisik, musik latar, penutup, dan urutan bagian (`section_order`).
2. **Layer 2 — Skeleton (`core/skeleton.css`, `core/skeleton.js`)**
   Mengatur struktur dasar halaman, sampul pembuka (`#lk-cover`), pemuatan tamu undangan, hitung mundur waktu acara, tombol kalender, *lightbox* galeri, pemutar musik (`#lk-music-btn`), formulir RSVP & ucapan, serta notifikasi *toast*.
3. **Layer 3 — Theme (`themes/registry.js`, `themes/pastel-flowers/theme.css`, `themes/pastel-flowers/theme.js`)**
   Menyediakan registri `window.LKThemes` serta tata letak *split shell* (`.pf-shell`, `.pf-aside`, `.lk-main`), tipografi (`Cormorant Garamond`, `Pinyon Script`, `Plus Jakarta Sans`), palet warna sage & pastel floral, dan ornamen tema.

## Kustomisasi `data/invitation.js`

Buka [`data/invitation.js`](data/invitation.js) dan sesuaikan properti di dalam `window.INVITATION_DATA`:

- **`mempelai.pria` & `mempelai.wanita`**: Nama panggilan, nama lengkap, peran anak ke-, nama orang tua, akun Instagram, dan path foto (opsional).
- **`inisial`, `tanggal_utama`, `tanggal_teks`, `kota`**: Ringkasan pasangan dan tanggal utama untuk hitung mundur (format ISO-8601 dengan zona waktu `+07:00`).
- **`kutipan`**: Teks ayat/kutipan dan sumbernya.
- **`acara`**: Daftar acara (misalnya *Akad Nikah* dan *Resepsi Pernikahan*) lengkap dengan tanggal ISO, waktu, tempat, alamat, tautan Google Maps, dan catatan tamu.
- **`dress_code`**: Set `aktif: false` untuk menyembunyikan bagian ini, atau ubah `judul`, `catatan`, `palet`, dan `ilustrasi`.
- **`cerita` & `galeri`**: Cerita perjalanan cinta dan daftar foto lokal di folder `assets/`. Tandai item galeri pertama dengan `featured: true` jika ingin ditampilkan lebih menonjol.
- **`amplop` & `alamat_kado`**: Daftar rekening bank dan alamat pengiriman kado fisik.
- **`musik.url`**: Isi dengan path file audio lokal (mis. `assets/musik.mp3`) untuk mengaktifkan tombol musik; biarkan `""` agar tombol musik tetap tersembunyi.
- **`section_order`**: Atur atau susun ulang urutan section:
  `["pembuka", "ayat", "mempelai", "acara", "dresscode", "cerita", "galeri", "hadiah", "rsvp", "penutup"]`.

## Parameter URL yang Didukung

Anda dapat menguji atau mempersonalisasi undangan langsung lewat *query string* URL:

- **`?to=Nama+Tamu`**: Menampilkan nama tamu tujuan pada sampul dan sapaan undangan.
- **`?a=NamaPria`**: Mengganti `mempelai.pria.nama_panggilan` secara dinamis (maksimal 24 karakter) sekaligus memperbarui `inisial`.
- **`?b=NamaWanita`**: Mengganti `mempelai.wanita.nama_panggilan` secara dinamis (maksimal 24 karakter) sekaligus memperbarui `inisial`.
- **`?tema=pastel-flowers`**: Memilih tema aktif dari `window.LKThemes` tanpa mengubah isi `data/invitation.js`.

Untuk pratinjau cepat lewat konsol browser, tersedia juga helper `window.lkSampleNames(namaPria, namaWanita)` yang memperbarui nama panggilan serta memicu event `lk:names-updated`.

## Mode RSVP: Lokal vs Google Apps Script

- **Mode Lokal (Default)**: Saat `rsvp_endpoint` bernilai `""`, konfirmasi kehadiran dan ucapan tamu disimpan di `localStorage` browser sebagai simulasi/pratinjau offline.
- **Mode Google Apps Script**: Isi `rsvp_endpoint` dengan URL Web App Google Apps Script untuk menyimpan dan memuat daftar RSVP/ucapan secara daring.

## Pratinjau Lokal

Jalankan server statis dari folder proyek agar pemuatan aset dan modul berjalan normal tanpa pembatasan `file://`:

```bash
# Menggunakan Python
python -m http.server 8080

# Atau menggunakan Node.js
npx serve .
```

Lalu buka `http://localhost:8080/?to=Bapak+Surya+%26+Keluarga` di browser.
