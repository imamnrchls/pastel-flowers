/**
 * LAYER 2 — SKELETON ENGINE (Data-driven & Theme-agnostic)
 * Pastel Flowers Wedding Invitation Core Engine.
 * Pure vanilla JS (IIFE, zero dependencies, XSS-safe via textContent).
 */
(function () {
  "use strict";

  const DEFAULT_LABELS = {
    open_button: "Buka Undangan",
    skip_button: "Lewati",
    couple_title: "Mempelai",
    events_title: "Waktu & Tempat",
    dress_code_title: "Dress Code",
    story_title: "Kisah Kami",
    gallery_title: "Galeri",
    rsvp_title: "Konfirmasi Kehadiran",
    wishes_title: "Doa & Ucapan",
    gift_title: "Tanda Kasih",
    closing: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.",
    closing_title: "Terima Kasih",
    closing_signoff: "Kami yang berbahagia,",
    to_prefix: "Kepada Yth.",
    default_guest: "Tamu Undangan",
    location_shortcut: "Lihat Lokasi",
    save_date: "Simpan Tanggal",
    view_location: "Google Maps",
    add_calendar: "Simpan ke Kalender",
    copy_account: "Salin Nomor",
    copied: "Tersalin",
    copy_address: "Salin Alamat",
    event_passed: "Acara telah berlangsung",
    credit_line: "Dibuat dengan sepenuh hati oleh"
  };

  // Logo Lembar Kabar (mono, mengikuti `color` tema lewat currentColor)
  const LK_LOGO_SVG = '<svg class="lk-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 232 48" fill="currentColor" aria-hidden="true" focusable="false"><path d="M24.7 23.6 L24.3 22.8 L23.8 21.9 L23.3 21.1 L22.8 20.3 L22.5 19.5 L22.2 18.6 L21.8 17.7 L21.5 16.8 L21.1 16 L20.7 15.2 L20.7 14.6 L20.7 13.9 L20.5 13.3 L20.7 12.7 L20.6 12.1 L20.7 11.5 L20.8 10.9 L21.3 10.5 L21.4 10 L21.7 9.5 L21.9 8.9 L22 8.4 L22.4 8 L22.8 7.6 L23 7.2 L23.5 7.2 L23.7 6.9 L23.8 6.6 L23.7 7 L24.1 7.2 L24.2 7.8 L24.7 8.1 L25 8.6 L25.5 8.9 L25.8 9.4 L26.2 9.7 L26.5 10.1 L26.5 10.6 L26.8 11.1 L26.8 11.6 L27.1 12.2 L27 12.8 L27.1 13.4 L27.2 14.1 L27.2 14.7 L27.3 15.2 L27 16 L26.7 16.9 L26.2 17.7 L25.7 18.5 L25.4 19.4 L24.9 20.2 L24.5 21.1 L25.4 21.5 L25.8 20.7 L26.2 19.8 L26.8 19.1 L27.2 18.2 L27.7 17.4 L28.2 16.6 L28.7 15.6 L28.8 14.8 L28.8 14 L28.9 13.3 L28.9 12.6 L28.6 12 L28.7 11.3 L28.4 10.6 L28.4 9.9 L27.9 9.3 L27.6 8.7 L27.3 8.2 L26.9 7.7 L26.6 7.2 L26.3 6.9 L26.1 6.4 L25.6 6.1 L25.4 5.4 L24.2 4.8 L22.9 5 L22.2 5.2 L21.8 5.8 L21.2 6.3 L20.8 6.8 L20.5 7.5 L20.1 8 L19.7 8.5 L19.5 9.1 L19.2 9.7 L19.2 10.5 L19 11.2 L18.9 11.9 L18.8 12.7 L19 13.4 L19 14.2 L19.2 14.8 L19.4 15.6 L19.8 16.5 L20.1 17.4 L20.5 18.3 L20.9 19.2 L21.3 20 L21.9 20.9 L22.3 21.7 L22.9 22.5 L23.4 23.3 L24 24.1Z"/><path d="M24.1 22.2 L24.3 21.4 L24.4 20.5 L24.5 19.7 L24.6 18.8 L24.7 18 L24.7 17.1 L24.7 16.3 L24.6 15.5 L24.6 14.6 L24.6 13.8 L24.6 12.9 L24.6 12.1 L24.5 11.2 L24.4 10.4 L23.9 10.4 L23.9 11.2 L23.9 12.1 L23.8 12.9 L23.8 13.8 L23.7 14.6 L23.7 15.5 L23.7 16.3 L23.7 17.1 L23.7 18 L23.7 18.8 L23.8 19.6 L23.8 20.5 L23.7 21.3 L23.8 22.2Z"/><path d="M24.7 24.7 L25.3 24 L26 23.3 L26.8 22.7 L27.4 22 L28 21.3 L28.8 20.7 L29.4 20 L30.2 19.4 L30.8 18.6 L31.4 18.1 L31.9 17.7 L32.5 17.4 L33.1 17.2 L33.6 17 L34.2 17 L34.7 16.9 L35.3 16.8 L35.8 17.2 L36.4 17.3 L37 17.4 L37.6 17.5 L38.1 17.9 L38.6 17.9 L39.1 18.2 L39.5 18.3 L39.9 18.5 L40.2 18.6 L40.4 18.6 L40.2 18.6 L40.1 19.1 L39.7 19.4 L39.6 20 L39.3 20.3 L39 20.7 L38.7 21.2 L38.5 21.6 L38 21.8 L37.6 22.1 L37.2 22.5 L36.7 22.8 L36 22.9 L35.5 23.3 L34.9 23.4 L34.3 23.8 L33.7 24.1 L33.3 24.4 L32.5 24.4 L31.6 24.3 L30.6 24.4 L29.7 24.3 L28.8 24.1 L27.8 24.1 L26.9 23.9 L26.8 24.8 L27.7 25 L28.6 25.2 L29.6 25.3 L30.5 25.5 L31.5 25.7 L32.5 25.8 L33.5 25.7 L34.3 25.5 L35 25.2 L35.6 25 L36.1 24.6 L36.7 24.5 L37.2 24.1 L37.9 24 L38.5 23.8 L39.2 23.5 L39.6 22.9 L40.2 22.6 L40.7 22.1 L41.1 21.5 L41.3 21 L41.8 20.6 L41.9 19.9 L42.2 19.4 L42.5 18.1 L41.6 17 L41.1 16.5 L40.5 16.2 L39.8 15.9 L39.2 15.9 L38.6 15.7 L38 15.7 L37.5 15.5 L36.9 15.3 L36.3 15.1 L35.5 15.2 L34.8 15 L34 15 L33.2 15.2 L32.4 15.4 L31.7 15.9 L31 16.4 L30.2 16.8 L29.7 17.7 L29 18.3 L28.5 19.1 L27.8 19.8 L27.2 20.5 L26.6 21.2 L25.9 21.9 L25.4 22.7 L24.7 23.4 L24 24Z"/><path d="M25.7 23.5 L26.6 23.4 L27.4 23.2 L28.2 23 L29 22.8 L29.9 22.6 L30.7 22.4 L31.5 22.1 L32.3 21.9 L33.1 21.7 L33.9 21.5 L34.7 21.2 L35.5 20.9 L36.3 20.6 L37.1 20.3 L37 19.9 L36.1 20.1 L35.3 20.3 L34.5 20.4 L33.6 20.5 L32.9 20.8 L32 21.1 L31.2 21.3 L30.4 21.6 L29.6 21.8 L28.8 22.1 L28 22.3 L27.2 22.5 L26.4 22.8 L25.6 23.1Z"/><path d="M24 24 L24.8 24.5 L25.6 25 L26.4 25.4 L27.2 26 L28 26.5 L28.8 27.1 L29.7 27.5 L30.5 27.9 L31.3 28.4 L32.1 28.8 L32.4 29.3 L32.8 29.8 L33.1 30.4 L33.2 31.1 L33.5 31.6 L33.7 32.2 L33.8 32.8 L34.1 33.3 L34.3 33.8 L34.2 34.3 L34.2 34.8 L34.1 35.2 L34 35.6 L33.8 36 L33.7 36.5 L33.4 37 L33.2 37.6 L33.4 37.3 L34 36.9 L33.4 37.1 L33 37.3 L32.5 37.2 L32.1 37.1 L31.6 37.1 L31.1 37 L30.7 36.8 L30.1 36.8 L29.6 36.5 L29 36.3 L28.6 35.9 L28 35.7 L27.5 35.4 L27 34.9 L26.6 34.5 L26.3 33.9 L26.1 33.2 L26 32.4 L25.8 31.4 L25.6 30.4 L25.4 29.5 L25.1 28.6 L24.9 27.6 L24.6 26.7 L23.7 27 L23.9 27.9 L24.2 28.8 L24.4 29.7 L24.5 30.6 L24.6 31.6 L24.6 32.5 L24.7 33.6 L25.1 34.5 L25.5 35.1 L26 35.8 L26.5 36.4 L27.1 37 L27.6 37.5 L28.2 37.8 L28.9 38 L29.4 38.3 L30 38.7 L30.6 38.9 L31.2 39.1 L31.9 39.2 L32.5 39.2 L33.1 39.1 L33.7 39.1 L34.1 39.1 L35 38.8 L35.2 38.1 L35.4 37.9 L35.5 37.4 L36 36.9 L36.1 36.3 L36.3 35.6 L36.3 34.9 L36.3 34.1 L36 33.5 L35.9 32.8 L35.8 32.1 L35.5 31.6 L35.2 30.9 L35 30.3 L34.5 29.7 L34.1 29.1 L33.7 28.4 L33 27.7 L32 27.1 L31.1 26.8 L30.2 26.4 L29.4 25.9 L28.6 25.5 L27.8 25 L27 24.6 L26.2 24 L25.4 23.5 L24.5 23.1Z"/><path d="M24.9 25.6 L25.3 26.3 L25.7 27 L26.2 27.8 L26.7 28.4 L27.2 29.1 L27.7 29.8 L28.2 30.5 L28.7 31.2 L29.1 31.9 L29.6 32.5 L30.1 33.2 L30.6 33.9 L31 34.6 L31.6 35.3 L32 35 L31.6 34.3 L31.1 33.6 L30.8 32.8 L30.3 32.1 L29.9 31.3 L29.4 30.6 L28.9 29.9 L28.4 29.3 L27.8 28.6 L27.3 28 L26.8 27.3 L26.2 26.7 L25.7 26 L25.2 25.4Z"/><path d="M24 24 L23.8 24.9 L23.7 25.9 L23.3 26.7 L23.1 27.6 L22.7 28.5 L22.5 29.4 L22 30.3 L21.9 31.3 L21.5 32.2 L21.3 33 L21.1 33.5 L20.8 34.1 L20.3 34.5 L19.9 34.9 L19.7 35.4 L19.2 35.6 L18.6 35.8 L18.2 36.1 L17.7 36.4 L17.2 36.6 L16.6 36.6 L16.2 37.1 L15.7 37 L15.3 37.1 L14.9 37.4 L14.4 37.3 L13.9 37.3 L14.2 37.5 L14.5 37.7 L14.4 37 L14.2 36.5 L13.8 36.1 L13.7 35.6 L13.3 35.2 L13.2 34.7 L13.3 34.2 L13.4 33.8 L13.5 33.2 L13.7 32.8 L13.9 32.2 L14.1 31.6 L14.5 31 L14.8 30.5 L15 29.8 L15.5 29.3 L15.8 28.8 L16.6 28.3 L17.5 28 L18.4 27.6 L19.2 27.2 L20 26.7 L20.9 26.3 L21.8 25.9 L21.3 24.9 L20.5 25.4 L19.6 25.9 L18.7 26.1 L17.9 26.5 L17 26.9 L16.1 27.3 L15.1 27.7 L14.4 28.4 L14 29 L13.3 29.5 L13 30.1 L12.7 30.8 L12.2 31.3 L11.8 31.9 L11.6 32.6 L11.3 33.4 L11.3 34.2 L11.5 34.9 L11.6 35.6 L11.6 36.4 L12 36.9 L12.1 37.5 L12.3 38 L12.6 38.3 L13 39.1 L13.9 39.3 L14.4 39.3 L15.1 39.2 L15.7 39.3 L16.3 39.2 L16.8 38.8 L17.5 38.8 L17.9 38.4 L18.5 38.2 L19.1 38 L19.7 37.7 L20.2 37.2 L20.8 36.7 L21.4 36.3 L21.9 35.6 L22.2 34.9 L22.6 34.3 L22.9 33.5 L23.1 32.5 L23.1 31.6 L23.4 30.7 L23.6 29.8 L24 28.9 L24.2 27.9 L24.5 27 L24.6 26.1 L24.9 25.1 L24.9 24.1Z"/><path d="M22.8 25.3 L22.2 26 L21.7 26.6 L21.1 27.2 L20.6 27.9 L20.1 28.6 L19.5 29.2 L18.9 29.8 L18.5 30.5 L18 31.2 L17.4 31.9 L16.9 32.5 L16.5 33.3 L16.1 34 L15.6 34.8 L16.1 35 L16.5 34.3 L17.1 33.7 L17.6 33 L18.1 32.4 L18.6 31.7 L19.1 31.1 L19.8 30.5 L20.3 29.8 L20.8 29.1 L21.3 28.4 L21.8 27.8 L22.2 27.1 L22.7 26.3 L23.2 25.6Z"/><path d="M23.9 23.2 L22.9 23.3 L22 23.4 L21.1 23.6 L20.1 23.6 L19.1 23.8 L18.2 24 L17.2 24.1 L16.3 24.5 L15.4 24.7 L14.5 24.9 L13.9 24.8 L13.2 24.8 L12.7 24.4 L12.2 24.1 L11.7 23.8 L11.3 23.3 L10.8 22.9 L10.4 22.4 L9.9 22.2 L9.5 21.7 L9.2 21.3 L8.8 20.9 L8.7 20.4 L8.4 20.1 L8.1 19.7 L8.1 19.2 L7.9 18.7 L7.7 18.8 L7.8 18.8 L8.3 18.6 L8.6 18.2 L9.1 18.2 L9.5 18 L9.8 17.7 L10.3 17.9 L10.8 17.6 L11.4 17.7 L11.9 17.9 L12.6 17.8 L13.2 17.8 L13.8 17.8 L14.4 17.8 L15 17.8 L15.7 17.8 L16.3 17.9 L16.9 18 L17.4 18.6 L18.2 19.1 L18.9 19.7 L19.6 20.4 L20.3 21.1 L21.1 21.6 L21.8 22.2 L22.4 21.5 L21.7 20.9 L21 20.2 L20.3 19.6 L19.6 19 L19 18.3 L18.4 17.5 L17.5 16.9 L16.6 16.5 L15.9 16.3 L15.2 16.2 L14.4 16.2 L13.8 16.1 L13.2 16.1 L12.7 16.1 L12.1 15.9 L11.5 16 L10.9 16 L10.2 15.7 L9.5 16 L8.8 16.1 L8.2 16.3 L7.7 16.7 L7.1 16.9 L6.7 17.3 L5.9 18.1 L5.9 19.2 L6 19.8 L6.3 20.3 L6.5 21 L6.7 21.6 L7.3 22.1 L7.7 22.6 L8.1 23.1 L8.6 23.4 L9 24 L9.5 24.4 L10 24.9 L10.6 25.3 L11.2 25.8 L12 26.1 L12.8 26.2 L13.7 26.5 L14.7 26.4 L15.8 26.1 L16.7 25.8 L17.6 25.6 L18.5 25.1 L19.4 25 L20.3 24.9 L21.2 24.6 L22.2 24.5 L23.1 24.3 L24 24.1Z"/><path d="M22.3 23.4 L21.5 23 L20.8 22.7 L20 22.4 L19.2 22 L18.5 21.7 L17.7 21.4 L16.9 21 L16.1 20.8 L15.3 20.6 L14.5 20.3 L13.7 20 L12.9 19.8 L12.1 19.5 L11.2 19.3 L11.1 19.7 L11.8 20.1 L12.6 20.4 L13.4 20.8 L14.2 21.1 L15 21.3 L15.8 21.6 L16.6 22 L17.4 22.2 L18.1 22.5 L18.9 22.8 L19.7 23.1 L20.5 23.3 L21.4 23.6 L22.2 23.8Z"/><path d="M22.9 24.3c.2-1 1.5-1.6 2.3-.8.8.9-.1 2.2-1.2 2-.6-.1-1.2-.6-1.1-1.2Z"/><path d="M51.3 35V33.9L55.1 33.5H55.5V35ZM54 35Q54 33.5 54 32Q54 30.4 54 28.8Q54 27.2 54 25.7V24.2Q54 22.6 54 21.1Q54 19.5 54 17.9Q54 16.3 54 14.9H56.8Q56.8 16.4 56.8 17.9Q56.8 19.5 56.8 21.1Q56.8 22.7 56.8 24.2V26.1Q56.8 27.5 56.8 29Q56.8 30.5 56.8 32Q56.8 33.5 56.8 35ZM55.4 35V33.6H64.5L63.4 34.4L64.6 29.4H66.2L65.9 35ZM51.3 16V14.9H59.5V16L55.7 16.4H55.1ZM74.8 35.4Q72.8 35.4 71.3 34.5Q69.8 33.6 68.9 32Q68.1 30.4 68.1 28.1Q68.1 25.9 69 24.1Q69.9 22.4 71.4 21.5Q73 20.5 74.8 20.5Q76.3 20.5 77.5 21.2Q78.8 21.9 79.5 23.1Q80.2 24.4 80.2 26.1Q80.2 26.6 80.2 27.1Q80.1 27.5 80 27.8H69.2V26.6H76Q77.2 26.6 77.5 26.2Q77.9 25.8 77.9 25.1Q77.9 24 77.5 23.3Q77.1 22.5 76.4 22.1Q75.7 21.7 74.8 21.7Q73.7 21.7 72.8 22.3Q71.8 22.9 71.2 24.2Q70.6 25.6 70.6 27.7Q70.6 29.6 71.2 30.9Q71.8 32.2 72.9 32.9Q74 33.5 75.5 33.5Q76.9 33.5 78 33Q79 32.5 79.9 31.6L80.5 32Q79.9 33 79.1 33.8Q78.4 34.6 77.3 35Q76.3 35.4 74.8 35.4ZM82.1 35V34L85.2 33.5H85.9L88.9 34V35ZM84.2 35Q84.3 34.3 84.3 33.2Q84.3 32.1 84.3 30.8Q84.3 29.6 84.3 28.7V27.3Q84.3 26.4 84.3 25.8Q84.3 25.2 84.3 24.6Q84.3 24.1 84.2 23.5L81.9 23.1V22.2L86.1 20.5L86.5 20.8L86.8 24.1V24.2V28.7Q86.8 29.6 86.8 30.8Q86.8 32.1 86.8 33.2Q86.8 34.3 86.9 35ZM91 35V34L94.2 33.5H94.8L97.8 34V35ZM93.1 35Q93.2 34.3 93.2 33.2Q93.2 32.1 93.2 30.9Q93.2 29.7 93.2 28.7V26.1Q93.2 24.1 92.7 23.3Q92.1 22.5 90.8 22.5Q90 22.5 89.4 22.7Q88.7 23 88 23.4Q87.3 23.9 86.5 24.6L86 23.7H86.3Q87 22.8 87.9 22.1Q88.8 21.4 89.8 20.9Q90.8 20.5 91.9 20.5Q93.8 20.5 94.7 21.8Q95.7 23 95.7 25.9V28.7Q95.7 29.7 95.7 30.9Q95.7 32.1 95.7 33.2Q95.7 34.3 95.7 35ZM99.8 35V34L103 33.5H103.7L106.7 34V35ZM102 35Q102 34.3 102.1 33.2Q102.1 32.1 102.1 30.9Q102.1 29.7 102.1 28.7V26Q102.1 24 101.5 23.2Q100.9 22.5 99.6 22.5Q99 22.5 98.3 22.7Q97.6 22.9 96.9 23.4Q96.2 23.9 95.4 24.6L94.8 23.8H95Q95.8 22.8 96.7 22Q97.7 21.3 98.7 20.9Q99.7 20.5 100.8 20.5Q102.6 20.5 103.6 21.7Q104.5 22.9 104.5 25.7V28.7Q104.5 29.7 104.5 30.9Q104.6 32.1 104.6 33.2Q104.6 34.3 104.6 35ZM107.7 35V34L109.9 33.7Q109.9 32.9 109.9 32Q109.9 31.1 109.9 30.2Q109.9 29.4 109.9 28.7V15.4L107.5 15V14.1L112 12.8L112.4 13L112.3 17.6V23.2L112.4 23.5V32.6V32.7L112.1 35.3ZM116.4 35.4Q115.6 35.4 114.7 35.1Q113.9 34.9 113.2 34.2Q112.4 33.5 111.7 32.3H111.2L111.5 31.1Q112.6 32.6 113.7 33.2Q114.9 33.8 115.9 33.8Q117.1 33.8 117.9 33.2Q118.8 32.5 119.4 31.2Q119.9 29.9 119.9 28Q119.9 25.1 118.8 23.6Q117.7 22.1 116.1 22.1Q115.5 22.1 114.8 22.3Q114.1 22.6 113.3 23.2Q112.5 23.8 111.5 24.8L111.2 23.6H111.7Q112.5 22.6 113.3 21.9Q114.1 21.2 115 20.9Q115.9 20.5 116.8 20.5Q118.4 20.5 119.7 21.4Q121 22.2 121.7 23.8Q122.5 25.5 122.5 27.8Q122.5 30.1 121.7 31.8Q120.9 33.5 119.5 34.5Q118.1 35.4 116.4 35.4ZM128.3 35.4Q126.7 35.4 125.5 34.5Q124.4 33.5 124.4 31.7Q124.4 30.9 124.7 30.1Q125.1 29.3 126.2 28.6Q127.2 27.9 129.2 27.3Q129.9 27.1 130.7 26.9Q131.4 26.7 132.2 26.4Q133 26.2 133.8 26V26.9Q132.7 27.3 131.7 27.6Q130.7 27.9 129.9 28.2Q128.6 28.7 127.9 29.2Q127.3 29.7 127.1 30.3Q126.9 30.8 126.9 31.3Q126.9 32.5 127.6 33Q128.3 33.5 129.3 33.5Q129.8 33.5 130.3 33.3Q130.8 33.2 131.5 32.7Q132.2 32.3 133.4 31.4L133.8 32.8H132.9Q132 33.7 131.3 34.2Q130.6 34.8 129.9 35.1Q129.2 35.4 128.3 35.4ZM135.3 35.3Q134 35.3 133.3 34.5Q132.6 33.7 132.6 32.4V32.2V25.5Q132.6 24 132.3 23.2Q132 22.4 131.4 22.1Q130.8 21.8 129.8 21.8Q129.3 21.8 128.6 21.9Q128 22 127.2 22.3L128.3 21.4L127.6 23.9Q127.4 24.6 127.1 25Q126.7 25.3 126.1 25.3Q125.5 25.3 125.2 25Q124.9 24.7 124.8 24.1Q125.2 22.5 126.7 21.5Q128.3 20.5 130.5 20.5Q132 20.5 133 21Q134 21.5 134.5 22.7Q135 23.8 135 25.6V32.1Q135 33 135.3 33.4Q135.6 33.8 136.1 33.8Q136.4 33.8 136.7 33.6Q137 33.5 137.2 33.1L137.8 33.7Q137.3 34.5 136.7 34.9Q136.1 35.3 135.3 35.3ZM138.3 35V34L141.5 33.5H142.2L145.4 34V35ZM140.4 35Q140.4 34.3 140.5 33.2Q140.5 32.1 140.5 30.8Q140.5 29.6 140.5 28.7V27.3Q140.5 26.4 140.5 25.8Q140.5 25.2 140.5 24.6Q140.4 24.1 140.4 23.5L138 23.1V22.2L142.2 20.5L142.6 20.8L142.9 24.7V24.8V28.7Q142.9 29.6 142.9 30.8Q143 32.1 143 33.2Q143 34.3 143 35ZM142.8 26.8 142.4 24.8H142.8Q143.2 23.5 144 22.5Q144.7 21.5 145.5 21Q146.4 20.5 147.2 20.5Q147.9 20.5 148.5 20.8Q149.1 21.1 149.3 21.6Q149.3 22.6 148.9 23.1Q148.4 23.7 147.6 23.7Q147.1 23.7 146.7 23.5Q146.2 23.3 145.8 22.9L145 22.2L146.4 22Q145.1 22.6 144.2 23.8Q143.4 25 142.8 26.8ZM158.7 35Q158.8 33.5 158.8 32Q158.8 30.4 158.8 28.8Q158.8 27.2 158.8 25.7V24.2Q158.8 22.7 158.8 21.1Q158.8 19.5 158.8 17.9Q158.8 16.4 158.7 14.9H161.5Q161.5 16.3 161.5 17.9Q161.4 19.5 161.4 21.1Q161.4 22.6 161.4 24.2V26.3Q161.4 27.5 161.4 29Q161.4 30.4 161.5 32Q161.5 33.5 161.5 35ZM156.1 35V33.9L159.8 33.5H160.5L164.2 33.9V35ZM156.1 16V14.9H164.2V16L160.5 16.4H159.8ZM166.8 35V33.9L170.3 33.5H170.8L174.2 33.9V35ZM167 16V14.9H173.9V16L170.7 16.4L170 16.5ZM160.1 29.7 160 27.8H160.2L160.9 26.9L170.6 14.9H172.2ZM169.9 35 164 23.9 165.6 22 172.8 35ZM178.6 35.4Q177 35.4 175.9 34.5Q174.7 33.5 174.7 31.7Q174.7 30.9 175.1 30.1Q175.4 29.3 176.5 28.6Q177.5 27.9 179.6 27.3Q180.2 27.1 181 26.9Q181.8 26.7 182.5 26.4Q183.3 26.2 184.2 26V26.9Q183 27.3 182 27.6Q181.1 27.9 180.2 28.2Q178.9 28.7 178.2 29.2Q177.6 29.7 177.4 30.3Q177.2 30.8 177.2 31.3Q177.2 32.5 177.9 33Q178.6 33.5 179.6 33.5Q180.2 33.5 180.7 33.3Q181.2 33.2 181.9 32.7Q182.6 32.3 183.7 31.4L184.1 32.8H183.2Q182.3 33.7 181.6 34.2Q180.9 34.8 180.2 35.1Q179.5 35.4 178.6 35.4ZM185.6 35.3Q184.3 35.3 183.6 34.5Q182.9 33.7 182.9 32.4V32.2V25.5Q182.9 24 182.6 23.2Q182.3 22.4 181.7 22.1Q181.1 21.8 180.1 21.8Q179.6 21.8 178.9 21.9Q178.3 22 177.5 22.3L178.7 21.4L177.9 23.9Q177.8 24.6 177.4 25Q177 25.3 176.4 25.3Q175.8 25.3 175.5 25Q175.2 24.7 175.1 24.1Q175.5 22.5 177.1 21.5Q178.6 20.5 180.8 20.5Q182.3 20.5 183.3 21Q184.3 21.5 184.8 22.7Q185.3 23.8 185.3 25.6V32.1Q185.3 33 185.6 33.4Q185.9 33.8 186.4 33.8Q186.8 33.8 187 33.6Q187.3 33.5 187.6 33.1L188.1 33.7Q187.6 34.5 187 34.9Q186.4 35.3 185.6 35.3ZM188.4 35V34L190.6 33.7Q190.7 32.9 190.7 32Q190.7 31.1 190.7 30.2Q190.7 29.4 190.7 28.7V15.4L188.3 15V14.1L192.8 12.8L193.2 13L193.1 17.6V23.2L193.1 23.5V32.6V32.7L192.9 35.3ZM197.2 35.4Q196.3 35.4 195.5 35.1Q194.7 34.9 193.9 34.2Q193.1 33.5 192.4 32.3H192L192.2 31.1Q193.4 32.6 194.5 33.2Q195.6 33.8 196.7 33.8Q197.8 33.8 198.7 33.2Q199.6 32.5 200.1 31.2Q200.7 29.9 200.7 28Q200.7 25.1 199.6 23.6Q198.5 22.1 196.8 22.1Q196.2 22.1 195.5 22.3Q194.8 22.6 194 23.2Q193.2 23.8 192.2 24.8L192 23.6H192.4Q193.2 22.6 194 21.9Q194.8 21.2 195.7 20.9Q196.6 20.5 197.6 20.5Q199.2 20.5 200.4 21.4Q201.7 22.2 202.5 23.8Q203.2 25.5 203.2 27.8Q203.2 30.1 202.4 31.8Q201.7 33.5 200.3 34.5Q198.9 35.4 197.2 35.4ZM209 35.4Q207.4 35.4 206.3 34.5Q205.1 33.5 205.1 31.7Q205.1 30.9 205.5 30.1Q205.9 29.3 206.9 28.6Q208 27.9 210 27.3Q210.7 27.1 211.4 26.9Q212.2 26.7 213 26.4Q213.8 26.2 214.6 26V26.9Q213.4 27.3 212.5 27.6Q211.5 27.9 210.6 28.2Q209.3 28.7 208.7 29.2Q208 29.7 207.9 30.3Q207.7 30.8 207.7 31.3Q207.7 32.5 208.4 33Q209.1 33.5 210.1 33.5Q210.6 33.5 211.1 33.3Q211.6 33.2 212.3 32.7Q213 32.3 214.1 31.4L214.5 32.8H213.6Q212.8 33.7 212.1 34.2Q211.4 34.8 210.7 35.1Q209.9 35.4 209 35.4ZM216 35.3Q214.8 35.3 214.1 34.5Q213.4 33.7 213.3 32.4V32.2V25.5Q213.3 24 213 23.2Q212.8 22.4 212.1 22.1Q211.5 21.8 210.5 21.8Q210 21.8 209.4 21.9Q208.7 22 207.9 22.3L209.1 21.4L208.4 23.9Q208.2 24.6 207.8 25Q207.5 25.3 206.9 25.3Q206.3 25.3 205.9 25Q205.6 24.7 205.6 24.1Q205.9 22.5 207.5 21.5Q209 20.5 211.2 20.5Q212.8 20.5 213.8 21Q214.8 21.5 215.3 22.7Q215.8 23.8 215.8 25.6V32.1Q215.8 33 216.1 33.4Q216.4 33.8 216.8 33.8Q217.2 33.8 217.5 33.6Q217.7 33.5 218 33.1L218.5 33.7Q218.1 34.5 217.4 34.9Q216.8 35.3 216 35.3ZM219 35V34L222.2 33.5H222.9L226.2 34V35ZM221.1 35Q221.2 34.3 221.2 33.2Q221.2 32.1 221.2 30.8Q221.3 29.6 221.3 28.7V27.3Q221.3 26.4 221.2 25.8Q221.2 25.2 221.2 24.6Q221.2 24.1 221.2 23.5L218.8 23.1V22.2L223 20.5L223.4 20.8L223.7 24.7V24.8V28.7Q223.7 29.6 223.7 30.8Q223.7 32.1 223.7 33.2Q223.8 34.3 223.8 35ZM223.6 26.8 223.2 24.8H223.5Q224 23.5 224.7 22.5Q225.4 21.5 226.3 21Q227.1 20.5 228 20.5Q228.7 20.5 229.3 20.8Q229.8 21.1 230.1 21.6Q230.1 22.6 229.6 23.1Q229.2 23.7 228.3 23.7Q227.9 23.7 227.4 23.5Q227 23.3 226.5 22.9L225.8 22.2L227.2 22Q225.8 22.6 225 23.8Q224.1 25 223.6 26.8Z"/></svg>';

  // Kredit Lembar Kabar: kalimat dari label tema, domain, lalu logo di bawahnya
  function buildStudioCredit(lineLabel) {
    const theme = document.documentElement.getAttribute("data-theme") || "pastel-flowers";
    const url = "https://lembarkabar.web.id/?utm_source=undangan&utm_medium=footer&utm_content=" + encodeURIComponent(theme);
    const credit = el("p", "lk-footer-credit", lineLabel);
    const brand = el("a", "lk-brand");
    brand.href = url;
    brand.target = "_blank";
    brand.rel = "noopener";
    brand.setAttribute("aria-label", "Lembar Kabar, lembarkabar.web.id");
    brand.innerHTML = LK_LOGO_SVG;
    brand.append(el("span", "lk-url", "lembarkabar.web.id"));
    return [credit, brand];
  }

  const DEFAULT_ORDER = [
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
  ];

  const MAX_WISHES = 50;
  const WISHES_PAGE = 6;
  const RATE_LIMIT_MS = 15000;
  const AUDIO_TARGET_VOL = 0.6;

  const MONTHS_ID = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const WEEKDAYS_SHORT_ID = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  const $ = (sel, root = document) => root.querySelector(sel);
  const prefersReducedMotion = () =>
    Boolean(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function svgIcon(markup, viewBox = "0 0 24 24", extraAttrs = {}) {
    const ns = "http://www.w3.org/2000/svg";
    const s = document.createElementNS(ns, "svg");
    s.setAttribute("viewBox", viewBox);
    s.setAttribute("fill", "none");
    s.setAttribute("stroke", "currentColor");
    s.setAttribute("stroke-width", "1.4");
    s.setAttribute("stroke-linecap", "round");
    s.setAttribute("stroke-linejoin", "round");
    s.setAttribute("aria-hidden", "true");
    Object.keys(extraAttrs).forEach((k) => s.setAttribute(k, extraAttrs[k]));
    s.innerHTML = markup;
    return s;
  }

  const ICONS = {
    pin: () => svgIcon('<path d="M12 21s-6.5-6.2-6.5-11.5a6.5 6.5 0 1 1 13 0C18.5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.2"/>'),
    calendar: () => svgIcon('<rect x="3" y="5" width="18" height="16" rx="1.5"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    rings: () => svgIcon('<circle cx="9.5" cy="13.5" r="5.5"/><circle cx="15" cy="13.5" r="5.5"/><path d="M9.5 5.5l1.6 2-1.6 2-1.6-2z"/>'),
    champagne: () => svgIcon('<path d="M8 3h8l-1 6a3 3 0 0 1-6 0L8 3Z"/><path d="M12 12v8M8.5 20h7"/>'),
    instagram: () => svgIcon('<rect x="3" y="3" width="18" height="18" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="0.8" fill="currentColor"/>'),
    copy: () => svgIcon('<rect x="9" y="9" width="11" height="11" rx="1.5"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>'),
    gift: () => svgIcon('<rect x="3" y="9" width="18" height="4"/><path d="M5 13v7h14v-7M12 9v11M12 9C12 6 9.5 4.5 8 5.5S9 9 12 9Zm0 0c0-3 2.5-4.5 4-3.5S15 9 12 9Z"/>'),
    heart: () => svgIcon('<path d="M12 20s-7-4.5-9-8.6A5.2 5.2 0 0 1 12 6.5a5.2 5.2 0 0 1 9 4.9C19 15.5 12 20 12 20Z" fill="currentColor" stroke="none"/>'),
    disc: () => svgIcon(
      '<circle cx="12" cy="12" r="9.2"/>' +
      '<circle cx="12" cy="12" r="5.8" opacity="0.45"/>' +
      '<circle cx="12" cy="12" r="2.4"/>' +
      '<circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none"/>'
    ),
    discMuted: () => svgIcon(
      '<circle cx="12" cy="12" r="9.2" opacity="0.65"/>' +
      '<circle cx="12" cy="12" r="2.4" opacity="0.65"/>' +
      '<path d="M4 4l16 16"/>'
    )
  };

  /* ---------- Date / Time Formatting (WIB / Asia/Jakarta) ---------- */
  function parseWibParts(iso) {
    if (!iso) return null;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return null;
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(d).split("-");
    return {
      date: d,
      year: parseInt(parts[0], 10),
      month: parseInt(parts[1], 10),
      day: parseInt(parts[2], 10)
    };
  }

  function fmtDateID(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta"
    });
  }

  function buildEventDate(iso) {
    const p = el("p", "lk-event-date");
    if (!iso) return p;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return p;
    const part = (opts) => d.toLocaleDateString("id-ID", Object.assign({ timeZone: "Asia/Jakarta" }, opts));
    p.append(
      el("span", "lk-event-date-wd", part({ weekday: "long" })),
      el("span", "lk-event-date-sep", ", "),
      el("span", "lk-event-date-day", part({ day: "numeric" })),
      el("span", "lk-event-date-sep", " "),
      el("span", "lk-event-date-my", part({ month: "long", year: "numeric" }))
    );
    return p;
  }

  function fmtTimeRangeWIB(startIso, endIso) {
    if (!startIso) return "";
    const fmt = (iso) =>
      new Date(iso).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Jakarta"
      }).replace(":", ".");
    const s = fmt(startIso);
    if (!endIso) return `${s} WIB – selesai`;
    return `${s} – ${fmt(endIso)} WIB`;
  }

  function toUtcStamp(iso) {
    return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  }

  function getCouplePair(data) {
    const m = (data && data.mempelai) || {};
    const first = (m.wanita && m.wanita.nama_panggilan) || "";
    const second = (m.pria && m.pria.nama_panggilan) || "";
    return { first, second, combined: [first, second].filter(Boolean).join(" & ") };
  }

  function getCoupleShort(data) {
    return getCouplePair(data).combined;
  }

  function getInitials(data) {
    if (data && data.inisial) return String(data.inisial);
    const pair = getCouplePair(data);
    const a = Array.from(pair.first || "W")[0] || "W";
    const b = Array.from(pair.second || "P")[0] || "P";
    return `${a} & ${b}`.toUpperCase();
  }

  function getEventStart(ev) {
    return (ev && (ev.tanggal_iso || ev.mulai)) || "";
  }

  function getEventEnd(ev) {
    return (ev && (ev.selesai_iso || ev.selesai)) || "";
  }

  function getEventTitle(ev) {
    return (ev && (ev.judul || ev.label)) || "Acara";
  }

  function getEventVenue(ev) {
    return (ev && (ev.tempat || ev.venue)) || "";
  }

  function getSharedEventVenue(events) {
    if (!Array.isArray(events) || !events.length) return null;

    const name = String(getEventVenue(events[0])).trim();
    const address = String(events[0].alamat || "").trim();
    const samePlace = events.every((event) =>
      String(getEventVenue(event)).trim() === name && String(event.alamat || "").trim() === address
    );
    const maps = [...new Set(events.map((event) => String(event.maps_url || "").trim()).filter(Boolean))];
    if (!samePlace || maps.length > 1 || !(name || address || maps.length)) return null;
    return { name, address, map: maps[0] };
  }

  function eventMapLink(url, label) {
    const link = el("a", "lk-btn");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(ICONS.pin(), document.createTextNode(label));
    return link;
  }

  function getPrimaryDateIso(data) {
    if (data && data.tanggal_utama) return data.tanggal_utama;
    if (data && Array.isArray(data.acara) && data.acara[0]) {
      return getEventStart(data.acara[0]);
    }
    return "";
  }

  function setImageWithSvgFallback(img, src, onBothFail) {
    img.src = src;
    let triedFallback = false;
    img.addEventListener("error", () => {
      if (!triedFallback && /\.jpe?g(\?.*)?$/i.test(img.getAttribute("src") || "")) {
        triedFallback = true;
        img.src = src.replace(/\.jpe?g(\?.*)?$/i, ".svg$1");
        return;
      }
      if (typeof onBothFail === "function") onBothFail();
    });
  }

  /* ---------- Calendar Helpers (.ics + Google Calendar) ---------- */
  function buildCalendarInfo(ev, data) {
    const coupleShort = getCoupleShort(data);
    const coupleFull = `${data.mempelai.wanita.nama_lengkap} & ${data.mempelai.pria.nama_lengkap}`;
    const label = getEventTitle(ev);
    const startIso = getEventStart(ev);
    const endRaw = getEventEnd(ev);
    const startDate = new Date(startIso);
    const endIso = endRaw || new Date(startDate.getTime() + 2 * 3600 * 1000).toISOString();
    const venue = getEventVenue(ev);
    const location = [venue, ev.alamat].filter(Boolean).join(", ");
    const timeText = ev.waktu || fmtTimeRangeWIB(startIso, endRaw);
    const details = `${label} pernikahan ${coupleFull}. ${timeText}.` +
      (ev.maps_url ? ` Lokasi: ${ev.maps_url}` : "");
    return {
      title: `${label} ${coupleShort}`.trim(),
      start: toUtcStamp(startIso),
      end: toUtcStamp(endIso),
      location,
      details
    };
  }

  function buildGoogleCalUrl(ev, data) {
    const info = buildCalendarInfo(ev, data);
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: info.title,
      dates: `${info.start}/${info.end}`,
      details: info.details,
      location: info.location,
      ctz: "Asia/Jakarta"
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  function buildIcsContent(ev, data) {
    const info = buildCalendarInfo(ev, data);
    const esc = (t) => String(t).replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
    const uid = `${info.start}-${(ev.jenis || getEventTitle(ev) || "acara").replace(/\s+/g, "")}@lembarkabar.web.id`;
    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Lembar Kabar//Undangan Digital//ID",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${toUtcStamp(new Date().toISOString())}`,
      `DTSTART:${info.start}`,
      `DTEND:${info.end}`,
      `SUMMARY:${esc(info.title)}`,
      `LOCATION:${esc(info.location)}`,
      `DESCRIPTION:${esc(info.details)}`,
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      `DESCRIPTION:Pengingat ${esc(info.title)} besok`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");
  }

  function downloadIcs(ev, data) {
    if (!ev || !getEventStart(ev)) return;
    const blob = new Blob([buildIcsContent(ev, data)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = el("a");
    a.href = url;
    a.download = `${(ev.jenis || "acara")}-${data.slug || "undangan"}.ics`.toLowerCase();
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  /* ---------- Toast & Clipboard ---------- */
  let toastTimer = null;
  function ensureToast() {
    let toast = $("#lk-toast");
    if (!toast) {
      toast = el("div", "lk-toast");
      toast.id = "lk-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.append(toast);
    }
    return toast;
  }

  function showToast(msg) {
    const toast = ensureToast();
    toast.textContent = String(msg || "");
    toast.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-show"), 2400);
  }

  async function copyToClipboard(text, label, copiedLabel) {
    let ok = true;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = el("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.append(ta);
      ta.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      ta.remove();
      label.closest("button")?.focus({ preventScroll: true });
    }

    if (ok) {
      showToast(copiedLabel);
      const originalLabel = label.dataset.origLabel || label.textContent;
      label.dataset.origLabel = originalLabel;
      label.textContent = copiedLabel;
      clearTimeout(label._copyTimer);
      label._copyTimer = setTimeout(() => {
        label.textContent = originalLabel;
      }, 1800);
    } else {
      showToast("Gagal menyalin. Silakan salin manual.");
    }
  }

  /* ---------- Audio Manager (fade 0 -> 0.6, hidden if musik.url empty) ---------- */
  function createAudioManager(musicConfig) {
    const btn = $("#lk-music-btn");
    const audio = $("#lk-audio") || (() => {
      const a = el("audio");
      a.id = "lk-audio";
      a.loop = true;
      a.preload = "none";
      document.body.append(a);
      return a;
    })();

    const url = musicConfig && typeof musicConfig.url === "string" ? musicConfig.url.trim() : "";
    let enabled = Boolean(url);
    let fadeTimer = null;

    if (!enabled || !btn) {
      if (btn) btn.hidden = true;
      return {
        isEnabled: () => false,
        startFromGesture: () => {},
        revealControlOnly: () => {}
      };
    }

    audio.src = url;
    audio.loop = true;
    audio.preload = "none";

    function updateButton(isPlaying) {
      btn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
      btn.setAttribute("aria-label", isPlaying ? "Jeda musik latar" : "Putar musik latar");
      btn.classList.toggle("is-playing", isPlaying);
      btn.replaceChildren(isPlaying ? ICONS.disc() : ICONS.discMuted());
    }

    function fadeVolume(target, ms) {
      clearInterval(fadeTimer);
      const startVol = audio.volume;
      const t0 = performance.now();
      return new Promise((resolve) => {
        fadeTimer = setInterval(() => {
          const k = Math.min(1, (performance.now() - t0) / ms);
          audio.volume = Math.max(0, Math.min(1, startVol + (target - startVol) * k));
          if (k >= 1) {
            clearInterval(fadeTimer);
            resolve();
          }
        }, 40);
      });
    }

    audio.addEventListener("error", () => {
      enabled = false;
      btn.hidden = true;
      updateButton(false);
    });

    btn.addEventListener("click", () => {
      if (!enabled) return;
      if (audio.paused) {
        audio.volume = 0;
        audio.play()
          .then(() => {
            updateButton(true);
            fadeVolume(AUDIO_TARGET_VOL, 900);
            showToast(musicConfig.judul ? `♪ ${musicConfig.judul}` : "♪ Musik latar diputar");
          })
          .catch(() => updateButton(false));
      } else {
        updateButton(false);
        fadeVolume(0, 450).then(() => audio.pause());
      }
    });

    updateButton(false);

    return {
      isEnabled: () => enabled,
      startFromGesture() {
        if (!enabled) return;
        btn.hidden = false;
        audio.volume = 0;
        audio.play()
          .then(() => {
            updateButton(true);
            fadeVolume(AUDIO_TARGET_VOL, 1200);
            showToast(musicConfig.judul ? `♪ ${musicConfig.judul}` : "♪ Musik latar diputar");
          })
          .catch(() => {
            updateButton(false);
          });
      },
      revealControlOnly() {
        if (!enabled) return;
        btn.hidden = false;
      }
    };
  }

  /* ---------- Accessible Lightbox (#lk-lightbox, keyboard + touch swipe) ---------- */
  function openLightbox(items, startIndex, triggerEl) {
    if (!items.length) return;
    let idx = startIndex;

    const existing = $("#lk-lightbox");
    const isReused = Boolean(existing);
    const overlay = existing || el("div", "lk-lightbox");
    overlay.id = "lk-lightbox";
    overlay.classList.add("lk-lightbox");
    overlay.hidden = false;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Penampil foto galeri");

    const stage = el("div", "lk-lightbox-stage");
    const img = el("img", "lk-lightbox-img");
    const caption = el("p", "lk-lightbox-caption");
    const count = el("p", "lk-lightbox-count");
    stage.append(img, caption, count);

    const closeBtn = el("button", "lk-lightbox-close", "×");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Tutup galeri");

    const prevBtn = el("button", "lk-lightbox-nav lk-lightbox-prev", "‹");
    prevBtn.type = "button";
    prevBtn.setAttribute("aria-label", "Foto sebelumnya");

    const nextBtn = el("button", "lk-lightbox-nav lk-lightbox-next", "›");
    nextBtn.type = "button";
    nextBtn.setAttribute("aria-label", "Foto berikutnya");

    function show(delta) {
      idx = (idx + delta + items.length) % items.length;
      const item = items[idx];
      img.src = item.src;
      img.alt = item.alt || `Foto galeri ${idx + 1}`;
      caption.textContent = item.caption || "";
      caption.hidden = !item.caption;
      count.textContent = `${idx + 1} / ${items.length}`;
    }

    let touchStartX = null;
    function onTouchStart(e) {
      if (e.touches && e.touches[0]) touchStartX = e.touches[0].clientX;
    }
    function onTouchEnd(e) {
      if (touchStartX === null || !e.changedTouches || !e.changedTouches[0]) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) show(dx < 0 ? 1 : -1);
      touchStartX = null;
    }

    function onOverlayClick(e) {
      if (e.target === overlay) close();
    }

    function onKey(e) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(1);
      else if (e.key === "ArrowLeft") show(-1);
    }

    function close() {
      document.removeEventListener("keydown", onKey);
      overlay.removeEventListener("click", onOverlayClick);
      overlay.removeEventListener("touchstart", onTouchStart);
      overlay.removeEventListener("touchend", onTouchEnd);
      if (isReused) {
        overlay.hidden = true;
        overlay.replaceChildren();
      } else {
        overlay.remove();
      }
      if (triggerEl && typeof triggerEl.focus === "function") triggerEl.focus();
    }

    prevBtn.addEventListener("click", () => show(-1));
    nextBtn.addEventListener("click", () => show(1));
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", onOverlayClick);
    overlay.addEventListener("touchstart", onTouchStart, { passive: true });
    overlay.addEventListener("touchend", onTouchEnd);

    overlay.replaceChildren(stage, closeBtn);
    if (items.length > 1) overlay.append(prevBtn, nextBtn);

    if (!isReused) document.body.append(overlay);
    document.addEventListener("keydown", onKey);
    show(0);
    closeBtn.focus();
  }

  /* ---------- Relative Time (Indonesian) ---------- */
  function formatRelativeTime(ts) {
    if (!ts) return "";
    const diffSec = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (diffSec < 60) return "baru saja";
    const units = [
      ["tahun", 31536000],
      ["bulan", 2592000],
      ["minggu", 604800],
      ["hari", 86400],
      ["jam", 3600],
      ["menit", 60]
    ];
    for (const [label, sec] of units) {
      if (diffSec >= sec) {
        return `${Math.floor(diffSec / sec)} ${label} lalu`;
      }
    }
    return "baru saja";
  }

  /* ---------- Helpers for Couple Names ---------- */
  function buildNamesSpans(target, data) {
    const pair = getCouplePair(data);
    target.setAttribute("data-pf-names", "");
    target.replaceChildren(
      el("span", "pf-name-first", pair.first),
      el("span", "pf-name-amp lk-amp-inline", " & "),
      el("span", "pf-name-second", pair.second)
    );
  }

  /* ---------- 1. Section: pembuka (Hero + Parallax + Countdown + Quick Actions) ---------- */
  function renderPembuka(data, theme, labels) {
    const sec = el("section", "lk-section pf-hero");
    sec.id = "pembuka";

    const stage = el("div", "pf-hero-stage");
    const dolly = el("div", "pf-hero-dolly");

    const ornaments = theme.ornaments || {};
    const customFrame = data.hero && data.hero.frame;
    if (!customFrame && typeof ornaments.botanicalScene === "function") {
      sec.classList.add("pf-hero--layered");
      dolly.append(ornaments.botanicalScene("hero"));
    } else {
      const bgLayer = el("div", "pf-hero-layer pf-hero-bg");
      bgLayer.setAttribute("data-depth", "0.14");
      bgLayer.setAttribute("aria-hidden", "true");
      const frameImg = el("img", "pf-hero-frame-img");
      frameImg.src = customFrame || "assets/frame-hero.webp";
      frameImg.alt = "";
      frameImg.decoding = "async";
      bgLayer.append(frameImg);
      dolly.append(bgLayer);
    }

    const veilLayer = el("div", "pf-hero-layer pf-hero-veil");
    veilLayer.setAttribute("data-depth", "0.06");
    veilLayer.setAttribute("aria-hidden", "true");
    dolly.append(veilLayer);

    const content = el("div", "pf-hero-content");
    const initials = getInitials(data);

    if (typeof ornaments.monogram === "function") {
      const monoWrap = el("div", "pf-hero-monogram");
      monoWrap.append(ornaments.monogram(initials));
      content.append(monoWrap);
    }

    const eyebrow = el("p", "lk-section-eyebrow", "The Wedding of");

    const headline = el("h1", "pf-hero-names lk-couple-headline");
    headline.id = "pf-hero-names";
    buildNamesSpans(headline, data);

    const primaryIso = getPrimaryDateIso(data);
    const city = data.kota || (Array.isArray(data.acara) && data.acara[0] && data.acara[0].kota) || "";
    const dateText = data.tanggal_teks || fmtDateID(primaryIso);
    const dateParts = [dateText, city].filter(Boolean);
    const metaLine = el("p", "lk-hero-date pf-hero-meta", dateParts.join(" · "));

    content.append(eyebrow, headline);
    if (metaLine.textContent) content.append(metaLine);

    // Live 4-unit WIB Countdown (#pf-countdown)
    if (primaryIso) {
      const targetMs = new Date(primaryIso).getTime();
      if (!Number.isNaN(targetMs)) {
        const cdHost = el("div", "pf-countdown-wrap");

        const grid = el("div", "lk-countdown");
        grid.id = "pf-countdown";
        grid.setAttribute("aria-label", "Hitung mundur menuju acara");

        const units = [
          ["d", "Hari"],
          ["h", "Jam"],
          ["m", "Menit"],
          ["s", "Detik"]
        ];
        const refs = {};
        units.forEach(([key, label], idx) => {
          const box = el("div", "lk-countdown-unit");
          box.style.setProperty("--n", String(idx));
          const num = el("span", "lk-countdown-num", "00");
          const lbl = el("span", "lk-countdown-label", label);
          refs[key] = num;
          box.append(num, lbl);
          grid.append(box);
        });

        const passed = el("p", "lk-countdown-passed", labels.event_passed);
        passed.hidden = true;
        cdHost.append(grid, passed);
        content.append(cdHost);

        const pad2 = (n) => String(n).padStart(2, "0");
        let timerId = null;

        function tick() {
          const diff = targetMs - Date.now();
          if (diff <= 0) {
            grid.hidden = true;
            passed.hidden = false;
            if (timerId) clearInterval(timerId);
            return;
          }
          const totalSec = Math.floor(diff / 1000);
          refs.d.textContent = String(Math.floor(totalSec / 86400));
          refs.h.textContent = pad2(Math.floor((totalSec % 86400) / 3600));
          refs.m.textContent = pad2(Math.floor((totalSec % 3600) / 60));
          refs.s.textContent = pad2(totalSec % 60);
        }

        tick();
        if (targetMs > Date.now()) {
          timerId = setInterval(tick, 1000);
        }
      }
    }

    // Quick Action Buttons ("Simpan Tanggal" -> .ics, "Lihat Lokasi" -> venue or events)
    const actions = el("div", "pf-hero-actions lk-shortcut-wrap");

    const firstEvent = Array.isArray(data.acara) && data.acara[0]
      ? data.acara[0]
      : (primaryIso ? { judul: "Pernikahan", tanggal_iso: primaryIso, tempat: data.kota || "" } : null);

    if (firstEvent && getEventStart(firstEvent)) {
      const saveBtn = el("button", "lk-btn lk-btn--solid");
      saveBtn.type = "button";
      saveBtn.append(ICONS.calendar(), document.createTextNode(labels.save_date));
      saveBtn.addEventListener("click", () => {
        downloadIcs(firstEvent, data);
        showToast("Undangan kalender (.ics) diunduh");
      });
      actions.append(saveBtn);
    }

    const locBtn = el("a", "lk-btn");
    locBtn.href = getSharedEventVenue(data.acara) ? "#lokasi-acara" : "#acara";
    locBtn.append(ICONS.pin(), document.createTextNode(labels.location_shortcut));
    actions.append(locBtn);

    content.append(actions);
    dolly.append(content);
    stage.append(dolly);
    sec.append(stage);
    return sec;
  }

  /* ---------- 2. Section: ayat (Arched Quote Card + Floral Divider) ---------- */
  function renderAyat(data, theme) {
    if (!data.kutipan || !data.kutipan.teks) return null;

    const sec = el("section", "lk-section pf-ayat");
    sec.id = "ayat";

    const ornaments = theme.ornaments || {};
    if (typeof ornaments.dividerImg === "function") {
      const divWrap = el("div", "lk-divider pf-divider-wrap");
      divWrap.setAttribute("data-reveal", "zoom");
      divWrap.append(ornaments.dividerImg());
      sec.append(divWrap);
    } else if (typeof ornaments.divider === "function") {
      const divWrap = el("div", "lk-divider");
      divWrap.setAttribute("data-reveal", "zoom");
      divWrap.append(ornaments.divider());
      sec.append(divWrap);
    }

    const card = el("blockquote", "pf-arch-card pf-quote-card lk-quote-box");
    card.setAttribute("data-reveal", "rise");
    card.append(el("p", "lk-quote-text", `“${data.kutipan.teks}”`));
    if (data.kutipan.sumber) {
      card.append(el("footer", "lk-quote-source", data.kutipan.sumber));
    }
    sec.append(card);

    return sec;
  }

  /* ---------- 3. Section: mempelai (Bride & Groom Arched Portraits) ---------- */
  function renderMempelai(data, theme, labels) {
    if (!data.mempelai || !data.mempelai.pria || !data.mempelai.wanita) return null;

    const sec = el("section", "lk-section pf-mempelai");
    sec.id = "mempelai";

    const eyebrow = el("p", "lk-section-eyebrow", "Bride & Groom");
    eyebrow.setAttribute("data-reveal", "up");
    const title = el("h2", "lk-section-title", labels.couple_title);
    title.id = "mempelai-title";
    title.setAttribute("data-reveal", "up");
    sec.setAttribute("aria-labelledby", title.id);
    sec.append(eyebrow, title);

    const ornaments = theme.ornaments || {};
    const grid = el("div", "lk-couple-grid");

    function buildParents(person) {
      const p = el("p", "lk-person-parents");
      if (person.peran || person.orang_tua) {
        if (person.peran) p.append(el("span", "lk-person-parents-rel", person.peran));
        if (person.orang_tua) p.append(el("span", "lk-person-parents-names", person.orang_tua));
        return p;
      }
      const text = person.ortu;
      if (text && typeof text === "object") {
        if (text.relasi) p.append(el("span", "lk-person-parents-rel", text.relasi));
        const names = [text.ayah, text.ibu].filter(Boolean).join(" & ");
        if (names) p.append(el("span", "lk-person-parents-names", names));
        return p;
      }
      const m = String(text || "").match(/^(.*?\bdari)\s+(.+)$/i);
      if (!m) {
        p.textContent = text || "";
        return p;
      }
      p.append(
        el("span", "lk-person-parents-rel", m[1]),
        el("span", "lk-person-parents-names", m[2])
      );
      return p;
    }

    function buildPerson(person, roleLabel, roleKey, revealDir) {
      const card = el("article", "lk-person pf-person-card");
      card.setAttribute("data-reveal", revealDir);

      const initial = (Array.from(String(person.nama_panggilan || roleLabel))[0] || "?").toUpperCase();
      const photoWrap = el("div", "lk-person-photo-wrap pf-arch-frame");

      if (person.foto) {
        const img = el("img", "lk-person-photo");
        img.src = person.foto;
        img.alt = `Foto ${person.nama_lengkap}`;
        img.loading = "lazy";
        img.decoding = "async";
        photoWrap.append(
          typeof ornaments.photoFrame === "function" ? ornaments.photoFrame(img) : img
        );
      } else {
        const placeholder = el("div", "lk-person-placeholder");
        if (typeof ornaments.portraitCameo === "function") {
          placeholder.append(ornaments.portraitCameo(roleKey, initial));
        } else if (typeof ornaments.portraitPlaceholder === "function") {
          placeholder.append(ornaments.portraitPlaceholder(initial, person.nama_panggilan));
        } else {
          placeholder.textContent = initial;
        }
        photoWrap.append(
          typeof ornaments.photoFrame === "function" ? ornaments.photoFrame(placeholder) : placeholder
        );
      }

      card.append(
        photoWrap,
        el("p", "lk-person-role", roleLabel),
        el("h3", "lk-person-name", person.nama_lengkap),
        buildParents(person)
      );

      if (person.instagram) {
        const handle = String(person.instagram).replace(/^@/, "").trim();
        if (handle) {
          const ig = el("a", "lk-ig-link");
          ig.href = `https://instagram.com/${encodeURIComponent(handle)}`;
          ig.target = "_blank";
          ig.rel = "noopener noreferrer";
          ig.setAttribute("aria-label", `Instagram ${person.nama_panggilan}`);
          ig.append(ICONS.instagram(), document.createTextNode(`@${handle}`));
          card.append(ig);
        }
      }

      return card;
    }

    const medallion = el("div", "lk-couple-sep pf-amp-medallion");
    medallion.setAttribute("data-reveal", "zoom");
    medallion.append(el("span", "pf-amp-glyph", "&"));

    grid.append(
      buildPerson(data.mempelai.wanita, "Mempelai Wanita", "wanita", "left"),
      medallion,
      buildPerson(data.mempelai.pria, "Mempelai Pria", "pria", "right")
    );

    sec.append(grid);
    return sec;
  }

  /* ---------- 4. Section: acara (Heritage Band + Calendar + Events + Villa) ---------- */
  function buildMonthlyCalendar(iso) {
    const parts = parseWibParts(iso);
    if (!parts) return null;

    const { year, month, day: targetDay } = parts;
    const monthName = MONTHS_ID[month - 1] || "";

    const card = el("div", "pf-calendar-card");
    card.setAttribute("data-reveal", "rise");
    card.setAttribute("aria-label", `Kalender ${monthName} ${year}`);

    const header = el("div", "pf-cal-header");
    header.append(
      el("span", "pf-cal-month", monthName),
      el("span", "pf-cal-year", String(year))
    );
    card.append(header);

    const weekdays = el("div", "pf-cal-weekdays");
    weekdays.setAttribute("aria-hidden", "true");
    WEEKDAYS_SHORT_ID.forEach((wd) => {
      weekdays.append(el("span", "pf-cal-weekday", wd));
    });
    card.append(weekdays);

    const grid = el("div", "pf-cal-grid");
    const firstDow = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
    const leadingEmpty = (firstDow + 6) % 7;
    const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();

    for (let i = 0; i < leadingEmpty; i++) {
      const emptyCell = el("span", "pf-cal-cell is-empty");
      emptyCell.setAttribute("aria-hidden", "true");
      grid.append(emptyCell);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isWedding = d === targetDay;
      const cell = el("span", `pf-cal-cell${isWedding ? " is-wedding-day" : ""}`);
      if (isWedding) {
        cell.setAttribute("aria-label", `Hari Pernikahan, ${d} ${monthName} ${year}`);
        const badge = el("span", "pf-cal-heart");
        badge.setAttribute("aria-hidden", "true");
        // Keep the heart badge compact at the top-right rim so it never clips the date digits.
        badge.style.top = "-5px";
        badge.style.right = "-5px";
        badge.style.width = "16px";
        badge.style.height = "16px";
        badge.style.zIndex = "2";
        badge.style.color = "var(--accent-rose, #C98D96)";
        const heartSvg = ICONS.heart();
        heartSvg.style.width = "13px";
        heartSvg.style.height = "13px";
        heartSvg.style.filter = "drop-shadow(0 1px 2px rgba(22, 4, 9, 0.35))";
        badge.append(heartSvg);
        cell.append(badge, el("span", "pf-cal-num", String(d)));
      } else {
        cell.append(el("span", "pf-cal-num", String(d)));
      }
      grid.append(cell);
    }

    card.append(grid);
    return card;
  }

  function renderAcara(data, theme, labels) {
    const events = Array.isArray(data.acara) ? data.acara : [];
    const primaryIso = getPrimaryDateIso(data);
    if (!events.length && !primaryIso) return null;

    const sec = el("section", "lk-section pf-band-heritage");
    sec.id = "acara";

    const ornaments = theme.ornaments || {};
    if (typeof ornaments.dividerImg === "function") {
      const divWrap = el("div", "lk-divider pf-divider-wrap");
      divWrap.setAttribute("data-reveal", "zoom");
      divWrap.append(ornaments.dividerImg());
      sec.append(divWrap);
    }

    const eyebrow = el("p", "lk-section-eyebrow", "Save the Date");
    eyebrow.setAttribute("data-reveal", "up");
    const title = el("h2", "lk-section-title", labels.events_title);
    title.id = "acara-title";
    title.setAttribute("data-reveal", "up");
    sec.setAttribute("aria-labelledby", title.id);
    sec.append(eyebrow, title);

    // Monthly Visual Calendar
    const calEl = buildMonthlyCalendar(primaryIso);
    if (calEl) sec.append(calEl);

    const sharedVenue = getSharedEventVenue(events);

    // Event Cards
    if (events.length) {
      const list = el("div", "lk-events-list");
      const schedule = events.length > 1 ? el("ol", "pf-event-program-list") : null;
      const eventDates = events.map((ev) =>
        fmtDateID(getEventStart(ev)) || [ev.hari, ev.tanggal_angka, ev.bulan_tahun].filter(Boolean).join(" ")
      );
      const showDates = new Set(eventDates).size > 1;

      events.forEach((ev, index) => {
        const card = el("article", "lk-event-card pf-event-card");
        card.setAttribute("data-reveal", "up");

        const iconWrap = el("div", "lk-event-icon");
        const jenis = String(ev.jenis || "").toLowerCase();
        const eventIcon = jenis === "akad" || jenis === "pemberkatan" ? ICONS.rings : ICONS.champagne;
        iconWrap.append(eventIcon());

        const startIso = getEventStart(ev);
        const endIso = getEventEnd(ev);
        const timeText = ev.waktu || fmtTimeRangeWIB(startIso, endIso);
        const venueText = getEventVenue(ev);

        if (schedule) {
          card.id = `acara-detail-${index + 1}`;
          card.tabIndex = -1;

          const row = el("li");
          const link = el("a", "pf-event-program-link");
          link.href = `#${card.id}`;
          const copy = el("span", "pf-event-program-copy");
          const timing = [showDates && eventDates[index], timeText].filter(Boolean).join(" · ");
          copy.append(el("strong", null, getEventTitle(ev)));
          if (timing) copy.append(el("span", "pf-event-program-time", timing));
          const arrow = el("span", "pf-event-program-arrow");
          arrow.setAttribute("aria-hidden", "true");
          link.append(eventIcon(), copy, arrow);
          row.append(link);
          schedule.append(row);
        }

        let dateNode;
        if (ev.hari && ev.tanggal_angka && ev.bulan_tahun) {
          dateNode = el("p", "lk-event-date");
          dateNode.append(
            el("span", "lk-event-date-wd", ev.hari),
            el("span", "lk-event-date-sep", ", "),
            el("span", "lk-event-date-day", ev.tanggal_angka),
            el("span", "lk-event-date-sep", " "),
            el("span", "lk-event-date-my", ev.bulan_tahun)
          );
        } else {
          dateNode = buildEventDate(startIso);
        }

        card.append(
          iconWrap,
          el("h3", "lk-event-title", getEventTitle(ev)),
          dateNode,
          el("p", "lk-event-time", timeText),
          el("hr", "lk-event-rule")
        );

        if (!sharedVenue && venueText) {
          const venue = el("p", "lk-event-venue");
          const venueIcon = ICONS.pin();
          venueIcon.classList.add("lk-event-venue-icon");
          venue.append(venueIcon, el("span", null, venueText));
          card.append(venue);
        }
        if (!sharedVenue && ev.alamat) card.append(el("p", "lk-event-address", ev.alamat));
        if (ev.catatan) card.append(el("p", "pf-event-note", ev.catatan));

        const actions = el("div", "lk-event-actions");
        if (!sharedVenue && ev.maps_url) {
          actions.append(eventMapLink(ev.maps_url, labels.view_location));
        }

        if (startIso) {
          const cal = el("details", "lk-cal");
          const summary = el("summary", "lk-btn");
          summary.append(ICONS.calendar(), document.createTextNode(labels.add_calendar));

          const menu = el("div", "lk-cal-menu");
          const gcal = el("a", null, "Google Calendar");
          gcal.href = buildGoogleCalUrl(ev, data);
          gcal.target = "_blank";
          gcal.rel = "noopener noreferrer";

          const icsBtn = el("button", null, "Apple / Outlook (.ics)");
          icsBtn.type = "button";
          icsBtn.addEventListener("click", () => {
            downloadIcs(ev, data);
            showToast("Undangan kalender (.ics) diunduh");
            cal.open = false;
          });

          menu.append(gcal, icsBtn);
          cal.append(summary, menu);
          document.addEventListener("click", (e) => {
            if (!cal.contains(e.target)) cal.open = false;
          });

          actions.append(cal);
        }

        if (actions.childElementCount) card.append(actions);
        list.append(card);
      });

      if (schedule) {
        const program = el("nav", "pf-event-program");
        program.setAttribute("aria-labelledby", "pf-event-program-title");
        const programTitle = el("h3", null, "Rangkaian Acara");
        programTitle.id = "pf-event-program-title";
        program.append(programTitle, schedule);
        sec.append(program);
      }
      sec.append(list);
    }

    if (sharedVenue) {
      const location = el("section", "pf-event-location");
      location.id = "lokasi-acara";
      location.tabIndex = -1;

      const heading = el("h3", "pf-event-location-title", "Lokasi Acara");
      heading.id = "lokasi-acara-title";
      location.setAttribute("aria-labelledby", heading.id);

      const figure = el("figure", "pf-villa-figure");
      const image = el("img", "pf-villa-img");
      const source = String(data.villa_ilustrasi || "").trim() || "assets/venue-villa.webp";
      setImageWithSvgFallback(image, source, () => { figure.hidden = true; });
      image.alt = "";
      image.loading = "lazy";
      image.decoding = "async";
      figure.append(image, el("figcaption", "pf-villa-caption", "Ilustrasi lokasi"));

      location.append(heading, figure);
      if (sharedVenue.name) location.append(el("p", "lk-event-venue", sharedVenue.name));
      if (sharedVenue.address) location.append(el("p", "lk-event-address", sharedVenue.address));
      if (sharedVenue.map) location.append(eventMapLink(sharedVenue.map, "Lihat Peta"));
      sec.append(location);
    }

    return sec;
  }

  /* ---------- 5. Section: dresscode ---------- */
  function renderDresscode(data, theme, labels) {
    const dcData = data.dress_code;
    if (!dcData || dcData.aktif === false) return null;

    const paletRaw = Array.isArray(dcData.palet)
      ? dcData.palet
      : (Array.isArray(dcData.warna) ? dcData.warna : []);
    const note = dcData.catatan || dcData.keterangan || dcData.note || "";
    const illus = dcData.ilustrasi ? String(dcData.ilustrasi).trim() : "";

    if (!paletRaw.length && !note && !illus) return null;

    const sec = el("section", "lk-section pf-dresscode");
    sec.id = "dresscode";

    const eyebrow = el("p", "lk-section-eyebrow", "Attire Guide");
    eyebrow.setAttribute("data-reveal", "up");
    const title = el("h2", "lk-section-title", labels.dress_code_title);
    title.id = "dresscode-title";
    title.setAttribute("data-reveal", "up");
    sec.setAttribute("aria-labelledby", title.id);
    sec.append(eyebrow, title);

    const card = el("div", "lk-dresscode pf-dresscode-card");
    card.setAttribute("data-reveal", "rise");

    if (dcData.judul) {
      card.append(el("h3", "pf-dc-subtitle", dcData.judul));
    }

    if (paletRaw.length) {
      const swatches = el("div", "lk-swatches");
      swatches.setAttribute("role", "list");
      swatches.setAttribute("aria-label", "Palet warna dress code");

      paletRaw.forEach((item) => {
        const isObj = item && typeof item === "object";
        const hex = isObj ? (item.hex || item.kode || item.warna || item.color || "#D8C7B4") : String(item);
        const name = isObj ? (item.nama || item.label || item.name || hex) : hex;

        const swItem = el("div", "pf-swatch-item");
        swItem.setAttribute("role", "listitem");

        const circle = el("span", "lk-swatch pf-swatch-circle");
        circle.style.backgroundColor = hex;
        circle.setAttribute("aria-label", `Warna ${name}`);
        circle.title = name;

        const lbl = el("span", "pf-swatch-name", name);
        swItem.append(circle, lbl);
        swatches.append(swItem);
      });

      card.append(swatches);
    }

    if (note) {
      card.append(el("p", "lk-dresscode-desc", note));
    }

    if (illus) {
      const fig = el("figure", "pf-dc-illus");
      fig.setAttribute("data-reveal", "zoom");
      const img = el("img", "pf-dresscode-img pf-dc-illus-img");
      setImageWithSvgFallback(img, illus, () => {
        fig.hidden = true;
      });
      img.alt = "Ilustrasi referensi busana dress code";
      img.loading = "lazy";
      img.decoding = "async";
      fig.append(img);
      card.append(fig);
    }

    sec.append(card);
    return sec;
  }

  /* ---------- 6. Section: cerita (Vertical Botanical Timeline) ---------- */
  function renderCerita(data, theme, labels) {
    const stories = Array.isArray(data.cerita)
      ? data.cerita.filter((s) => s && (s.judul || s.deskripsi || s.bab))
      : [];
    if (!stories.length) return null;

    const sec = el("section", "lk-section pf-cerita");
    sec.id = "cerita";

    const ornaments = theme.ornaments || {};
    if (typeof ornaments.dividerImg === "function") {
      const divWrap = el("div", "lk-divider pf-divider-wrap");
      divWrap.setAttribute("data-reveal", "zoom");
      divWrap.append(ornaments.dividerImg());
      sec.append(divWrap);
    }

    const eyebrow = el("p", "lk-section-eyebrow", "Our Journey");
    eyebrow.setAttribute("data-reveal", "up");
    const title = el("h2", "lk-section-title", labels.story_title);
    title.id = "cerita-title";
    title.setAttribute("data-reveal", "up");
    sec.setAttribute("aria-labelledby", title.id);
    sec.append(eyebrow, title);

    const storyPhoto = data.foto_cerita;
    const source = storyPhoto && String(storyPhoto.src || "").trim();
    if (source) {
      const figure = el("figure", "pf-story-photo");
      figure.setAttribute("data-reveal", "zoom");

      const pin = el("span", "pf-story-pin");
      pin.setAttribute("aria-hidden", "true");
      if (typeof ornaments.waxSealImg === "function") {
        pin.append(ornaments.waxSealImg());
      }

      const frame = el("div", "pf-story-photo-frame");
      const image = el("img");
      image.alt = storyPhoto.alt || "Foto kedua mempelai";
      image.loading = "lazy";
      image.decoding = "async";
      if (storyPhoto.lebar > 0 && storyPhoto.tinggi > 0) {
        image.width = storyPhoto.lebar;
        image.height = storyPhoto.tinggi;
      }
      setImageWithSvgFallback(image, source, () => { figure.hidden = true; });
      frame.append(image);

      if (typeof ornaments.cornerFloral === "function") {
        const cornerTl = ornaments.cornerFloral("tl");
        cornerTl.classList.add("pf-story-corner", "pf-story-corner--tl");
        const cornerBr = ornaments.cornerFloral("br");
        cornerBr.classList.add("pf-story-corner", "pf-story-corner--br");
        figure.append(cornerTl, cornerBr);
      }

      figure.append(pin, frame);

      const capText = storyPhoto.caption && String(storyPhoto.caption).trim();
      const figcaption = el("figcaption", "pf-story-caption");
      if (capText) {
        figcaption.textContent = capText;
      } else {
        const pair = getCouplePair(data);
        const capNames = el("span", "pf-story-caption-names");
        buildNamesSpans(capNames, data);
        figcaption.append(capNames);
        if (stories[0] && stories[0].tanggal) {
          figcaption.append(el("span", "pf-story-caption-sep", "✦"));
          figcaption.append(el("span", "pf-story-caption-meta", stories[0].tanggal));
        } else if (pair.first || pair.second) {
          figcaption.append(el("span", "pf-story-caption-sep", "✦"));
          figcaption.append(el("span", "pf-story-caption-meta", "Our Story"));
        }
      }
      figure.append(figcaption);
      sec.append(figure);
    }

    const timeline = el("div", "lk-timeline pf-timeline");
    stories.forEach((s) => {
      const item = el("article", "lk-timeline-item pf-timeline-item");
      item.setAttribute("data-reveal", "tl");

      const dot = el("span", "lk-timeline-dot pf-timeline-dot");
      dot.setAttribute("aria-hidden", "true");
      item.append(dot);

      if (s.bab) item.append(el("p", "pf-timeline-chapter", s.bab));
      const meta = [s.tanggal, s.kota].filter(Boolean).join(" · ");
      if (meta) item.append(el("p", "lk-timeline-meta", meta));
      if (s.judul) item.append(el("h3", "lk-timeline-title", s.judul));
      if (s.deskripsi) item.append(el("p", "lk-timeline-desc", s.deskripsi));

      timeline.append(item);
    });

    sec.append(timeline);
    return sec;
  }

  /* ---------- 7. Section: galeri (Jendela Kenangan + 2-col Grid + Lightbox) ---------- */
  function ensureGalleryPlateStyles() {
    if (document.getElementById("pf-gallery-plate-style")) return;
    const style = document.createElement("style");
    style.id = "pf-gallery-plate-style";
    style.textContent = [
      ".lk-gallery-grid .lk-gallery-item.pf-gallery-plate {",
      "  display: flex;",
      "  flex-direction: column;",
      "  align-items: stretch;",
      "  justify-content: flex-start;",
      "  aspect-ratio: auto;",
      "  height: 100%;",
      "  padding: 7px 7px 11px;",
      "  text-align: center;",
      "  overflow: hidden;",
      "}",
      ".pf-gallery-plate-media {",
      "  display: block;",
      "  position: relative;",
      "  width: 100%;",
      "  aspect-ratio: 4 / 3;",
      "  min-height: 120px;",
      "  overflow: hidden;",
      "  border-radius: 9px;",
      "  background: var(--bg-parchment, #FAF6EE);",
      "  flex-shrink: 0;",
      "}",
      ".lk-gallery-grid .lk-gallery-item.pf-gallery-plate .pf-gallery-plate-media img {",
      "  position: absolute;",
      "  inset: 0;",
      "  display: block;",
      "  width: 100%;",
      "  height: 100%;",
      "  object-fit: contain;",
      "  padding: 6px;",
      "  mix-blend-mode: multiply;",
      "  border-radius: 9px;",
      "}",
      ".lk-gallery-grid .lk-gallery-item.pf-gallery-plate .pf-gallery-plate-media img.pf-gallery-img--svg {",
      "  object-fit: contain;",
      "  padding: 6px;",
      "  box-sizing: border-box;",
      "}",
      ".pf-gallery-plate-caption {",
      "  display: block;",
      "  margin-top: 8px;",
      "  padding: 0 3px;",
      "  font-family: var(--font-display, Georgia, serif);",
      "  font-style: italic;",
      "  font-size: 12.5px;",
      "  line-height: 1.38;",
      "  color: var(--ink-muted, #5F6554);",
      "}"
    ].join("\n");
    document.head.append(style);
  }

  function renderGaleri(data, theme, labels) {
    const gallery = Array.isArray(data.galeri)
      ? data.galeri
          .map((item, idx) =>
            typeof item === "string"
              ? { src: item.trim(), alt: `Momen ${idx + 1}`, caption: "", featured: false }
              : {
                  src: item && item.src ? String(item.src).trim() : "",
                  srcset: item && item.srcset ? String(item.srcset).trim() : "",
                  sizes: item && item.sizes ? String(item.sizes).trim() : "",
                  alt: (item && item.alt) || `Momen ${idx + 1}`,
                  caption: (item && item.caption) || "",
                  featured: Boolean(item && item.featured),
                  contain: item && item.fit === "contain"
                }
          )
          .filter((item) => item.src)
      : [];

    if (!gallery.length) return null;

    ensureGalleryPlateStyles();

    const sec = el("section", "lk-section pf-galeri");
    sec.id = "galeri";

    const eyebrow = el("p", "lk-section-eyebrow", "Moments");
    eyebrow.setAttribute("data-reveal", "up");
    const title = el("h2", "lk-section-title", labels.gallery_title);
    title.id = "galeri-title";
    title.setAttribute("data-reveal", "up");
    sec.setAttribute("aria-labelledby", title.id);
    sec.append(eyebrow, title);

    // Featured Arched "Jendela Kenangan" Preview
    const featuredIdx = Math.max(0, gallery.findIndex((g) => g.featured));
    const featuredItem = gallery[featuredIdx];
    const featuredBtn = el("button", featuredItem.contain ? "pf-gallery-featured pf-gallery-featured--contain" : "pf-gallery-featured");
    featuredBtn.type = "button";
    featuredBtn.setAttribute("data-reveal", "zoom");
    featuredBtn.setAttribute("aria-label", `Jendela Kenangan: Perbesar ${featuredItem.alt}`);

    const featImg = el("img", "pf-gallery-featured-img");
    setImageWithSvgFallback(featImg, featuredItem.src);
    if (featuredItem.srcset) featImg.srcset = featuredItem.srcset;
    featImg.alt = featuredItem.alt;
    featImg.loading = "eager";
    featImg.decoding = "async";

    const featMeta = el("span", "pf-gallery-featured-meta");
    featMeta.append(
      el("span", "pf-gallery-featured-kicker", "Jendela Kenangan"),
      el("span", "pf-gallery-featured-cap", featuredItem.caption || featuredItem.alt)
    );

    featuredBtn.append(featImg, featMeta);
    featuredBtn.addEventListener("click", () => openLightbox(gallery, featuredIdx, featuredBtn));
    sec.append(featuredBtn);

    // 2-Column Gallery Grid (curated botanical Polaroid plates, excluding featured item)
    const grid = el("div", "lk-gallery-grid pf-gallery-grid");
    gallery.forEach((item, idx) => {
      if (idx === featuredIdx) return;
      const itemClass = item.contain
        ? "lk-gallery-item pf-gallery-plate pf-gallery-item--contain"
        : "lk-gallery-item pf-gallery-plate";
      const btn = el("button", itemClass);
      btn.type = "button";
      btn.setAttribute("data-reveal", "up");
      btn.setAttribute("aria-label", `Perbesar ${item.alt}`);

      const media = el("span", "pf-gallery-plate-media");
      const img = el("img");
      setImageWithSvgFallback(img, item.src);
      if (item.srcset) img.srcset = item.srcset;
      if (item.sizes) img.sizes = item.sizes;
      if (/\.svg(\?.*)?$/i.test(item.src)) img.classList.add("pf-gallery-img--svg");
      img.alt = item.alt;
      img.loading = "eager";
      img.decoding = "async";
      media.append(img);

      btn.append(media);
      const plateCaptionText = item.caption || item.alt;
      if (plateCaptionText) {
        const cap = el("span", "pf-gallery-plate-caption", plateCaptionText);
        btn.append(cap);
      }
      btn.addEventListener("click", () => openLightbox(gallery, idx, btn));
      grid.append(btn);
    });

    if (grid.childElementCount) sec.append(grid);
    return sec;
  }

  /* ---------- 8. Section: hadiah (3D Envelope + Wax Seal + Bank & Gift Address) ---------- */
  function renderHadiah(data, theme, labels) {
    const accounts = Array.isArray(data.amplop) ? data.amplop.filter((a) => a && a.no_rekening) : [];
    const rawGift = data.alamat_kado;
    const giftObj = rawGift && typeof rawGift === "object"
      ? {
          penerima: rawGift.penerima ? String(rawGift.penerima).trim() : "",
          alamat: rawGift.alamat ? String(rawGift.alamat).trim() : "",
          catatan: rawGift.catatan ? String(rawGift.catatan).trim() : ""
        }
      : {
          penerima: "",
          alamat: rawGift ? String(rawGift).trim() : "",
          catatan: ""
        };
    const giftCopyText = [giftObj.penerima, giftObj.alamat].filter(Boolean).join("\n");

    if (!accounts.length && !giftObj.alamat) return null;

    const sec = el("section", "lk-section pf-hadiah");
    sec.id = "hadiah";

    const ornaments = theme.ornaments || {};
    if (typeof ornaments.dividerImg === "function") {
      const divWrap = el("div", "lk-divider pf-divider-wrap");
      divWrap.setAttribute("data-reveal", "zoom");
      divWrap.append(ornaments.dividerImg());
      sec.append(divWrap);
    }

    const title = el("h2", "lk-section-title", labels.gift_title);
    title.id = "hadiah-title";
    sec.setAttribute("aria-labelledby", title.id);
    const lead = el("p", "lk-lead", "Doa restu Anda merupakan karunia terindah bagi kami. Jika berkenan, Anda dapat mengirim tanda kasih melalui pilihan di bawah.");
    sec.append(title, lead);

    const giftCard = el("div", "pf-gift-card");
    giftCard.setAttribute("data-reveal", "rise");

    function copyButton(text, action, description) {
      const button = el("button", "lk-btn lk-copy-btn");
      button.type = "button";
      if (description) button.setAttribute("aria-label", `${action} ${description}`);
      const label = el("span", null, action);
      button.append(ICONS.copy(), label);
      button.addEventListener("click", () => copyToClipboard(text, label, labels.copied));
      return button;
    }

    if (accounts.length) {
      const digital = el("div", "pf-gift-option pf-gift-digital");
      digital.append(el("h3", "pf-gift-heading", "Amplop Digital"));

      const toggle = el("button", "pf-gift-toggle");
      toggle.id = "gift-toggle";
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-controls", "gift-list");

      const stage = el("span", "pf-envelope-stage");
      stage.setAttribute("aria-hidden", "true");
      const letter = el("span", "pf-envelope-letter");
      const names = el("span", "pf-envelope-letter-names");
      buildNamesSpans(names, data);
      letter.append(el("span", "pf-envelope-letter-note", "Tanda kasih untuk"), names);

      const seal = el("span", "pf-envelope-seal-disc");
      if (typeof ornaments.waxSealImg === "function") {
        seal.append(ornaments.waxSealImg());
      } else {
        const image = el("img", "pf-wax-seal");
        image.src = "assets/wax-seal.webp";
        image.alt = "";
        seal.append(image);
      }

      stage.append(
        el("span", "pf-envelope-back"),
        letter,
        el("span", "pf-envelope-front"),
        el("span", "pf-envelope-flap"),
        seal
      );
      const toggleLabel = el("span", "pf-envelope-cta-label", "Buka Amplop");
      toggle.append(stage, toggleLabel);

      const cards = el("div", "lk-gift-cards");
      cards.id = "gift-list";
      cards.hidden = true;
      accounts.forEach((acc) => {
        const card = el("div", "lk-bank-card");
        const bank = acc.bank || "Bank";
        const number = String(acc.no_rekening);
        const face = el("div", "pf-bank-face");
        const chip = el("span", "pf-bank-chip");
        chip.setAttribute("aria-hidden", "true");
        const numRow = el("div", "pf-bank-num-row");
        const copyBtn = copyButton(number.replace(/\s+/g, ""), "Salin", bank);
        copyBtn.classList.add("pf-bank-copy-btn");
        copyBtn.setAttribute("aria-label", `${labels.copy_account} ${bank}`);
        numRow.append(el("p", "lk-bank-num", number), copyBtn);
        face.append(el("h4", "lk-bank-name", bank), chip, numRow);
        if (acc.atas_nama) face.append(el("p", "lk-bank-holder", acc.atas_nama));
        card.append(face);
        cards.append(card);
      });

      toggle.addEventListener("click", () => {
        const open = cards.hidden;
        toggle.setAttribute("aria-expanded", String(open));
        toggleLabel.textContent = open ? "Tutup Amplop" : "Buka Amplop";
        cards.hidden = !open;
      });
      digital.append(toggle, cards);
      giftCard.append(digital);
    }

    if (giftObj.alamat) {
      const address = el("div", "pf-gift-option lk-address-card");
      const icon = el("span", "pf-address-icon");
      icon.append(ICONS.gift());
      address.append(icon, el("h3", "pf-gift-heading", "Kirim Kado Fisik"));
      if (giftObj.penerima) address.append(el("p", "pf-address-recipient", `Penerima: ${giftObj.penerima}`));
      address.append(el("p", "lk-address-text", giftObj.alamat));
      if (giftObj.catatan) address.append(el("p", "pf-address-note", giftObj.catatan));
      address.append(copyButton(giftCopyText, labels.copy_address));
      giftCard.append(address);
    }

    sec.append(giftCard);
    return sec;
  }

  /* ---------- 9. Section: rsvp (Form + Seeded LocalStorage + Wishes List) ---------- */
  function createRsvpStore(data) {
    const endpoint = data.rsvp_endpoint ? String(data.rsvp_endpoint).trim() : "";
    const localKey = `lk-rsvp-${data.slug || "default"}`;
    const coupleShort = getCoupleShort(data) || "kedua mempelai";

    function normalizeItem(raw) {
      const attMap = { y: "hadir", hadir: "hadir", n: "tidak", tidak: "tidak", m: "ragu", ragu: "ragu" };
      const att = attMap[String(raw.att || "").toLowerCase()] || "hadir";
      const guests = Math.min(5, Math.max(1, parseInt(raw.guests, 10) || 1));
      const rawMsg = String(raw.msg || "").trim();
      const msg = /^'?-$/.test(rawMsg) ? "" : rawMsg;
      return {
        ts: Number(raw.ts) || Date.now(),
        name: String(raw.name || "").trim(),
        att,
        guests,
        msg
      };
    }

    function getSeedWishes() {
      const now = Date.now();
      return [
        {
          ts: now - 3 * 3600 * 1000,
          name: "Rania & Bagas",
          att: "hadir",
          guests: 2,
          msg: `Selamat menempuh hidup baru untuk ${coupleShort}. Semoga cinta, tawa, dan keberkahan senantiasa menyertai langkah kalian berdua.`
        },
        {
          ts: now - 19 * 3600 * 1000,
          name: "Ibu Kartika Sari",
          att: "hadir",
          guests: 2,
          msg: "Turut berbahagia dan mendoakan agar menjadi keluarga yang sakinah, mawaddah, warahmah selamanya."
        }
      ];
    }

    return {
      async list() {
        if (endpoint) {
          const sep = endpoint.includes("?") ? "&" : "?";
          const ctrl = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), 12000);
          try {
            const res = await fetch(`${endpoint}${sep}limit=${MAX_WISHES}&t=${Date.now()}`, {
              cache: "no-store",
              signal: ctrl.signal
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json = await res.json();
            if (!Array.isArray(json)) throw new Error("Invalid response");
            return json.map(normalizeItem).filter((w) => w.name).slice(0, MAX_WISHES);
          } finally {
            clearTimeout(timer);
          }
        }
        try {
          const raw = localStorage.getItem(localKey);
          if (raw === null) {
            const seed = getSeedWishes();
            localStorage.setItem(localKey, JSON.stringify(seed));
            return seed.map(normalizeItem);
          }
          const saved = JSON.parse(raw || "[]");
          return Array.isArray(saved) ? saved.map(normalizeItem).filter((w) => w.name).slice(0, MAX_WISHES) : [];
        } catch {
          return getSeedWishes().map(normalizeItem);
        }
      },

      async add(item) {
        if (window.__LK_SIMULATE_RSVP_ERROR) {
          throw new Error("Simulated write failure");
        }
        if (endpoint) {
          const ctrl = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), 12000);
          try {
            await fetch(endpoint, {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "text/plain;charset=utf-8" },
              body: JSON.stringify(item),
              signal: ctrl.signal
            });
            return;
          } finally {
            clearTimeout(timer);
          }
        }
        const current = await this.list();
        current.unshift(normalizeItem(item));
        localStorage.setItem(localKey, JSON.stringify(current.slice(0, MAX_WISHES)));
      }
    };
  }

  function renderRsvp(data, theme, labels, rawGuest) {
    const sec = el("section", "lk-section pf-rsvp");
    sec.id = "rsvp";

    const ornaments = theme.ornaments || {};
    if (typeof ornaments.dividerImg === "function") {
      const divWrap = el("div", "lk-divider pf-divider-wrap");
      divWrap.setAttribute("data-reveal", "zoom");
      divWrap.append(ornaments.dividerImg());
      sec.append(divWrap);
    }

    const eyebrow = el("p", "lk-section-eyebrow", "RSVP");
    eyebrow.setAttribute("data-reveal", "up");
    const title = el("h2", "lk-section-title", labels.rsvp_title);
    title.id = "rsvp-title";
    title.setAttribute("data-reveal", "up");
    sec.setAttribute("aria-labelledby", title.id);
    const lead = el("p", "lk-lead", "Kehadiran serta doa restu Anda sangat berarti bagi kami. Mohon konfirmasi kehadiran melalui formulir di bawah ini.");
    lead.setAttribute("data-reveal", "up");
    sec.append(eyebrow, title, lead);

    const form = el("form", "lk-rsvp-form");
    form.setAttribute("data-reveal", "rise");
    form.noValidate = true;

    // Hidden Honeypot
    const hp = el("input", "lk-honeypot");
    hp.type = "text";
    hp.name = "website";
    hp.tabIndex = -1;
    hp.autocomplete = "off";
    hp.setAttribute("aria-hidden", "true");
    form.append(hp);

    // 1. Name (required, max 60)
    const nameField = el("div", "lk-field");
    const nameLbl = el("label", "lk-label", "Nama Lengkap");
    nameLbl.htmlFor = "lk-rsvp-name";
    const nameInput = el("input", "lk-input");
    nameInput.id = "lk-rsvp-name";
    nameInput.name = "name";
    nameInput.type = "text";
    nameInput.maxLength = 60;
    nameInput.required = true;
    nameInput.autocomplete = "name";
    nameInput.placeholder = "Tulis nama Anda";
    nameInput.setAttribute("aria-describedby", "lk-err-name");
    if (rawGuest) nameInput.value = rawGuest;

    const nameMeta = el("div", "lk-field-meta");
    const nameErr = el("span", "lk-error");
    nameErr.id = "lk-err-name";
    nameMeta.append(nameErr);
    nameField.append(nameLbl, nameInput, nameMeta);

    // 2. Attendance Radio (hadir, ragu, tidak)
    const attFieldset = el("fieldset", "lk-fieldset");
    const attLegend = el("legend", "lk-label", "Konfirmasi Kehadiran");
    const attGroup = el("div", "lk-pill-group");
    const attOptions = [
      ["hadir", "Hadir"],
      ["ragu", "Masih Ragu"],
      ["tidak", "Tidak Hadir"]
    ];
    attOptions.forEach(([val, text]) => {
      const wrap = el("label", "lk-pill-option");
      const radio = el("input");
      radio.type = "radio";
      radio.name = "att";
      radio.value = val;
      radio.id = `lk-att-${val}`;
      wrap.append(radio, el("span", "lk-pill-label", text));
      attGroup.append(wrap);
    });
    const attMeta = el("div", "lk-field-meta");
    const attErr = el("span", "lk-error");
    attErr.id = "lk-err-att";
    attMeta.append(attErr);
    attFieldset.append(attLegend, attGroup, attMeta);

    // 3. Guest Count Radio (1–5, default 1)
    const guestsFieldset = el("fieldset", "lk-fieldset");
    const guestsLegend = el("legend", "lk-label", "Jumlah Tamu (1–5)");
    const guestsGroup = el("div", "lk-guest-counts");
    for (let i = 1; i <= 5; i++) {
      const wrap = el("label", "lk-pill-option");
      const radio = el("input");
      radio.type = "radio";
      radio.name = "guests";
      radio.value = String(i);
      radio.id = `lk-guests-${i}`;
      if (i === 1) radio.checked = true;
      wrap.append(radio, el("span", "lk-pill-label", `${i} Org`));
      guestsGroup.append(wrap);
    }
    const guestsMeta = el("div", "lk-field-meta");
    const guestsErr = el("span", "lk-error");
    guestsErr.id = "lk-err-guests";
    guestsMeta.append(guestsErr);
    guestsFieldset.append(guestsLegend, guestsGroup, guestsMeta);

    // 4. Message Textarea (optional, max 500 + live counter)
    const msgField = el("div", "lk-field");
    const msgLbl = el("label", "lk-label", "Doa & Ucapan (Opsional)");
    msgLbl.htmlFor = "lk-rsvp-msg";
    const msgInput = el("textarea", "lk-textarea");
    msgInput.id = "lk-rsvp-msg";
    msgInput.name = "msg";
    msgInput.maxLength = 500;
    msgInput.placeholder = `Tulis doa terbaik untuk ${getCoupleShort(data)}`;
    msgInput.setAttribute("aria-describedby", "lk-rsvp-counter");
    const msgMeta = el("div", "lk-field-meta");
    const msgCounter = el("span", "lk-counter", "0 / 500");
    msgCounter.id = "lk-rsvp-counter";
    msgMeta.append(msgCounter);
    msgField.append(msgLbl, msgInput, msgMeta);

    // Submit & Status
    const submitBtn = el("button", "lk-btn lk-btn--solid", "Kirim Konfirmasi");
    submitBtn.type = "submit";
    const statusEl = el("p", "lk-form-status");
    statusEl.setAttribute("role", "status");
    statusEl.setAttribute("aria-live", "polite");

    form.append(nameField, attFieldset, guestsFieldset, msgField, submitBtn, statusEl);
    sec.append(form);

    // Buku Ucapan (3-stat summary + paginated wishes)
    const wishesWrap = el("div", "lk-wishes-wrap");
    wishesWrap.setAttribute("data-reveal", "up");
    const wishesHead = el("div", "lk-wishes-head");
    const wishesTitle = el("h3", "lk-wishes-title", labels.wishes_title);
    const wishesSummary = el("div", "lk-wishes-summary");
    wishesHead.append(wishesTitle, wishesSummary);

    const wishesList = el("ul", "lk-wishes-list");
    const moreWrap = el("div", "lk-wishes-more-wrap");
    const moreBtn = el("button", "lk-btn", "Tampilkan Lebih Banyak");
    moreBtn.type = "button";
    moreBtn.hidden = true;
    moreWrap.append(moreBtn);

    wishesWrap.append(wishesHead, wishesList, moreWrap);
    sec.append(wishesWrap);

    const store = createRsvpStore(data);
    let shownCount = WISHES_PAGE;
    let isSubmitting = false;
    let lastSubmitTime = 0;
    let lastSignature = "";

    const attLabelMap = { hadir: "Hadir", ragu: "Ragu", tidak: "Tidak Hadir" };

    msgInput.addEventListener("input", () => {
      msgCounter.textContent = `${msgInput.value.length} / 500`;
    });

    nameInput.addEventListener("input", () => {
      nameErr.textContent = "";
      nameInput.setAttribute("aria-invalid", "false");
    });

    attFieldset.addEventListener("change", () => {
      attErr.textContent = "";
    });

    guestsFieldset.addEventListener("change", () => {
      guestsErr.textContent = "";
    });

    async function renderWishesList() {
      let items = [];
      try {
        items = await store.list();
      } catch {
        wishesList.replaceChildren(el("li", "lk-wishes-empty", "Ucapan belum dapat dimuat. Silakan muat ulang halaman."));
        moreBtn.hidden = true;
        return;
      }

      if (!items.length) {
        wishesSummary.replaceChildren();
        wishesList.replaceChildren(el("li", "lk-wishes-empty", "Belum ada ucapan. Jadilah yang pertama mengirimkan doa restu."));
        moreBtn.hidden = true;
        return;
      }

      const hadirCount = items.filter((w) => w.att === "hadir").length;
      const raguCount = items.filter((w) => w.att === "ragu").length;
      const tidakCount = items.filter((w) => w.att === "tidak").length;

      wishesSummary.replaceChildren();
      [
        [hadirCount, "Hadir", "hadir"],
        [raguCount, "Ragu", "ragu"],
        [tidakCount, "Tidak Hadir", "tidak"]
      ].forEach(([num, text, key]) => {
        const stat = el("div", `lk-wishes-stat lk-wishes-stat--${key}`);
        stat.append(
          el("span", "lk-wishes-stat-num", String(num)),
          el("span", "lk-wishes-stat-label", text)
        );
        wishesSummary.append(stat);
      });

      wishesList.replaceChildren();
      items.slice(0, shownCount).forEach((w) => {
        const li = el("li", "lk-wish-card");
        const top = el("div", "lk-wish-top");

        const whoWrap = el("div", "lk-wish-author");
        const avatar = el("span", "lk-wish-avatar", (Array.from(w.name.trim())[0] || "?").toUpperCase());
        avatar.setAttribute("aria-hidden", "true");
        const who = el("span", "lk-wish-name", w.name);
        whoWrap.append(avatar, who);

        const badges = el("div", "lk-wish-badges");
        const attBadge = el("span", `lk-wish-badge lk-wish-badge--${w.att}`, attLabelMap[w.att] || "Hadir");
        badges.append(attBadge);
        if (w.att !== "tidak" && w.guests >= 1) {
          badges.append(el("span", "lk-wish-badge", `${w.guests} Tamu`));
        }

        top.append(whoWrap, badges);
        li.append(top);

        if (w.msg) {
          li.append(el("p", "lk-wish-msg", w.msg));
        }

        const timeEl = el("time", "lk-wish-time", formatRelativeTime(w.ts));
        timeEl.dateTime = new Date(w.ts).toISOString();
        li.append(timeEl);

        wishesList.append(li);
      });

      const remaining = items.length - shownCount;
      moreBtn.hidden = remaining <= 0;
      if (remaining > 0) {
        moreBtn.textContent = `Tampilkan Lebih Banyak (${remaining})`;
      }
    }

    moreBtn.addEventListener("click", () => {
      shownCount += WISHES_PAGE;
      renderWishesList();
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (isSubmitting) return;

      // Honeypot check
      if (hp.value.trim()) {
        statusEl.className = "lk-form-status";
        statusEl.textContent = "Terima kasih atas konfirmasi Anda.";
        return;
      }

      const name = nameInput.value.trim();
      const attSelected = form.querySelector('input[name="att"]:checked');
      const att = attSelected ? attSelected.value : "";
      const guestsSelected = form.querySelector('input[name="guests"]:checked');
      const guests = guestsSelected ? parseInt(guestsSelected.value, 10) : 0;
      const msg = msgInput.value.trim();

      let firstInvalid = null;
      if (!name) {
        nameErr.textContent = "Nama wajib diisi.";
        nameInput.setAttribute("aria-invalid", "true");
        firstInvalid = firstInvalid || nameInput;
      } else {
        nameErr.textContent = "";
        nameInput.setAttribute("aria-invalid", "false");
      }

      if (!att) {
        attErr.textContent = "Silakan pilih status kehadiran.";
        firstInvalid = firstInvalid || form.querySelector('input[name="att"]');
      } else {
        attErr.textContent = "";
      }

      if (!Number.isInteger(guests) || guests < 1 || guests > 5) {
        guestsErr.textContent = "Pilih jumlah tamu antara 1 hingga 5.";
        firstInvalid = firstInvalid || form.querySelector('input[name="guests"]');
      } else {
        guestsErr.textContent = "";
      }

      if (firstInvalid) {
        statusEl.textContent = "";
        firstInvalid.focus();
        return;
      }

      const now = Date.now();
      const sig = `${name.toLowerCase()}|${att}|${guests}|${msg}`;
      if (sig === lastSignature) {
        statusEl.className = "lk-form-status";
        statusEl.textContent = "Konfirmasi yang sama sudah terkirim. Terima kasih.";
        return;
      }
      if (now - lastSubmitTime < RATE_LIMIT_MS) {
        const waitSec = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
        statusEl.className = "lk-form-status is-error";
        statusEl.textContent = `Mohon tunggu ${waitSec} detik sebelum mengirim kembali.`;
        return;
      }

      isSubmitting = true;
      submitBtn.disabled = true;
      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.textContent = "Mengirim…";
      statusEl.className = "lk-form-status";
      statusEl.textContent = "";

      const payload = {
        ts: now,
        name: name.slice(0, 60),
        att,
        guests,
        msg: msg.slice(0, 500) || "-"
      };

      try {
        await store.add(payload);
        lastSubmitTime = Date.now();
        lastSignature = sig;
        msgInput.value = "";
        msgCounter.textContent = "0 / 500";
        statusEl.className = "lk-form-status";
        statusEl.textContent = "Terima kasih, konfirmasi & doa Anda telah tercatat.";
        showToast("Konfirmasi & doa Anda terkirim");
        await renderWishesList();
      } catch {
        statusEl.className = "lk-form-status is-error";
        statusEl.textContent = "Gagal mengirim, coba lagi.";
      } finally {
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.removeAttribute("aria-busy");
        submitBtn.textContent = "Kirim Konfirmasi";
      }
    });

    renderWishesList();
    return sec;
  }

  /* ---------- 10. Section: penutup (Lace Frame + Closing + Petals + Footer) ---------- */
  function renderPenutup(data, theme, labels) {
    const sec = el("section", "lk-section pf-penutup");
    sec.id = "penutup";

    // Falling petals container
    const petals = el("div", "pf-petals");
    petals.setAttribute("aria-hidden", "true");
    sec.append(petals);

    const closingObj = data.penutup && typeof data.penutup === "object" ? data.penutup : null;
    const closingTitle = (closingObj && closingObj.judul) || labels.closing_title;
    const closingText = typeof data.penutup === "string"
      ? data.penutup
      : ((closingObj && (closingObj.teks || closingObj.pesan || closingObj.ucapan)) || labels.closing);
    const closingSignoff = (closingObj && closingObj.salam) || labels.closing_signoff;
    const familyNote = (closingObj && (closingObj.keluarga || closingObj.catatan_keluarga || closingObj.turut_mengundang)) ||
      data.catatan_keluarga || "";

    const body = el("div", "pf-closing-body");
    if (closingTitle) {
      const title = el("h2", "lk-section-title pf-closing-title", closingTitle);
      title.id = "penutup-title";
      sec.setAttribute("aria-labelledby", title.id);
      body.append(title);
    }
    if (closingText) body.append(el("p", "lk-closing-text", closingText));
    if (closingSignoff) body.append(el("p", "lk-closing-signoff", closingSignoff));

    const names = el("p", "lk-closing-names pf-closing-names");
    buildNamesSpans(names, data);
    body.append(names);

    const primaryIso = getPrimaryDateIso(data);
    if (primaryIso) {
      body.append(el("p", "lk-closing-date", data.tanggal_teks || fmtDateID(primaryIso)));
    }

    if (familyNote) {
      body.append(el("p", "pf-family-note", familyNote));
    }

    const ornaments = theme.ornaments || {};
    if (typeof ornaments.closingEmblem === "function") {
      body.append(ornaments.closingEmblem(getInitials(data)));
    }

    let containerCard;
    if (typeof ornaments.laceFrame === "function") {
      containerCard = ornaments.laceFrame(body);
      containerCard.setAttribute("data-reveal", "rise");
    } else {
      containerCard = el("div", "pf-closing-card");
      containerCard.setAttribute("data-reveal", "rise");
      containerCard.append(body);
    }

    sec.append(containerCard);
    return sec;
  }

  function renderFooter(data, labels) {
    const footer = el("footer", "lk-footer");
    const note = el("p", "lk-footer-note");
    note.append(document.createTextNode("Dirangkai dengan sepenuh hati untuk hari bahagia "));
    const coupleSpan = el("span", "lk-footer-couple");
    if (data) {
      buildNamesSpans(coupleSpan, data);
    }
    note.append(coupleSpan);

    footer.append(note, ...buildStudioCredit(labels.credit_line));
    return footer;
  }

  /* ---------- Scroll Reveal (IntersectionObserver on [data-reveal]) ---------- */
  function initScrollReveal() {
    const targets = document.querySelectorAll("[data-reveal], .lk-reveal");
    if (!targets.length) return;

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      targets.forEach((n) => {
        n.classList.add("is-in", "is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in", "is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );

    targets.forEach((n) => observer.observe(n));
  }

  /* ---------- Live Couple Names & Initials Refresh ---------- */
  function bindNamesUpdated(data) {
    let lastHandledEvent = null;

    function refreshNames(e) {
      if (e && e === lastHandledEvent) return;
      lastHandledEvent = e || null;

      const pair = getCouplePair(data);
      const initials = getInitials(data);

      document.title = `Undangan Pernikahan ${pair.combined}`;

      document.querySelectorAll("[data-pf-names]").forEach((node) => {
        const a = node.querySelector(".pf-name-first");
        const b = node.querySelector(".pf-name-second");
        if (a && b) {
          a.textContent = pair.first;
          b.textContent = pair.second;
        } else {
          node.textContent = pair.combined;
        }
      });

      document.querySelectorAll("[data-lk-initials]").forEach((node) => {
        node.textContent = initials;
      });

      const msgInput = $("#lk-rsvp-msg");
      if (msgInput) {
        msgInput.placeholder = `Tulis doa terbaik untuk ${pair.combined}`;
      }
    }

    document.addEventListener("lk:names-updated", refreshNames);
    window.addEventListener("lk:names-updated", refreshNames);
  }

  /* ---------- Bootstrap ---------- */
  function init() {
    const data = window.INVITATION_DATA;
    if (!data || !window.LKThemes) return;

    const params = new URLSearchParams(window.location.search);
    const queryTema = (params.get("tema") || "").trim();
    const themeId = queryTema && window.LKThemes.has(queryTema)
      ? queryTema
      : (data.tema || "pastel-flowers");
    const theme = window.LKThemes.get(themeId);
    if (!theme) return;

    document.documentElement.dataset.theme = theme.id;

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta && theme.tokens && theme.tokens.bg) {
      themeMeta.setAttribute("content", theme.tokens.bg);
    }

    const labels = Object.assign({}, DEFAULT_LABELS, theme.labels || {});

    // Guest name from ?to= or ?kepada= (trimmed, max 80 chars)
    const rawGuest = (params.get("to") || params.get("kepada") || "").trim().slice(0, 80);
    const displayGuest = rawGuest || labels.default_guest;

    const coupleShort = getCoupleShort(data);
    document.title = `Undangan Pernikahan ${coupleShort}`;

    const audioManager = createAudioManager(data.musik);

    // Desktop sticky aside
    const asideEl = $("#lk-aside") || $("#pf-aside") || $(".pf-aside");
    if (asideEl && theme.aside && typeof theme.aside.render === "function") {
      theme.aside.render(asideEl, data);
    }

    // Render Sections into #lk-main
    const mainEl = $("#lk-main");
    if (!mainEl) return;

    const sectionRenderers = {
      pembuka: () => renderPembuka(data, theme, labels),
      ayat: () => renderAyat(data, theme, labels),
      mempelai: () => renderMempelai(data, theme, labels),
      acara: () => renderAcara(data, theme, labels),
      dresscode: () => renderDresscode(data, theme, labels),
      cerita: () => renderCerita(data, theme, labels),
      galeri: () => renderGaleri(data, theme, labels),
      hadiah: () => renderHadiah(data, theme, labels),
      rsvp: () => renderRsvp(data, theme, labels, rawGuest),
      penutup: () => renderPenutup(data, theme, labels)
    };

    const order = Array.isArray(data.section_order) && data.section_order.length
      ? data.section_order
      : (Array.isArray(theme.section_order) && theme.section_order.length ? theme.section_order : DEFAULT_ORDER);

    mainEl.replaceChildren();
    order.forEach((key) => {
      const renderFn = sectionRenderers[key];
      if (!renderFn) return;
      const secEl = renderFn();
      if (secEl) mainEl.append(secEl);
    });
    mainEl.append(renderFooter(data, labels));

    bindNamesUpdated(data);

    // Cover & Open/Skip State
    const coverEl = $("#lk-cover");
    const reduced = prefersReducedMotion();
    let hasOpened = false;
    let motionEnhanced = false;

    function runEnhanceMotion() {
      if (motionEnhanced) return;
      motionEnhanced = true;
      if (typeof theme.enhanceMotion === "function") {
        theme.enhanceMotion(mainEl, reduced);
      }
    }

    function finishOpen() {
      if (hasOpened) return;
      hasOpened = true;
      document.body.classList.remove("lk-locked");
      document.body.classList.add("lk-opened");
      mainEl.inert = false;
      if (coverEl) {
        coverEl.classList.add("is-gone");
        coverEl.setAttribute("aria-hidden", "true");
        coverEl.hidden = true;
      }
      initScrollReveal();
      runEnhanceMotion();
    }

    function handleOpen() {
      audioManager.startFromGesture();
      if (reduced || !coverEl || !theme.opener || typeof theme.opener.open !== "function") {
        finishOpen();
        return;
      }
      document.body.classList.add("lk-opened");
      runEnhanceMotion();
      theme.opener.open(coverEl, finishOpen);
    }

    function handleSkip() {
      audioManager.revealControlOnly();
      finishOpen();
    }

    // Check URL deep-link #hash matching a section id
    const rawHash = window.location.hash ? window.location.hash.slice(1) : "";
    let hashTarget = null;
    if (rawHash) {
      try {
        const decoded = decodeURIComponent(rawHash);
        const candidate = document.getElementById(decoded);
        if (candidate && mainEl.contains(candidate)) {
          hashTarget = candidate;
        }
      } catch {
        hashTarget = null;
      }
    }

    if (hashTarget) {
      audioManager.revealControlOnly();
      finishOpen();
      requestAnimationFrame(() => {
        hashTarget.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      });
      return;
    }

    // Keep main inert while cover is active
    mainEl.inert = true;

    if (coverEl) {
      if (theme.opener && typeof theme.opener.render === "function") {
        theme.opener.render(coverEl, data, displayGuest, handleOpen, handleSkip);
      } else {
        const wrap = el("div", "lk-cover-fallback");
        wrap.append(
          el("p", "lk-section-eyebrow", "The Wedding of"),
          el("h1", "lk-couple-headline", coupleShort),
          el("p", null, `${labels.to_prefix} ${displayGuest}`)
        );
        const openBtn = el("button", "lk-btn lk-btn--solid", labels.open_button);
        openBtn.type = "button";
        openBtn.addEventListener("click", handleOpen);
        const skipBtn = el("button", "lk-btn lk-btn--ghost", labels.skip_button);
        skipBtn.type = "button";
        skipBtn.addEventListener("click", handleSkip);
        wrap.append(openBtn, skipBtn);
        coverEl.replaceChildren(wrap);
      }
    }
  }

  window.LKApp = { init, showToast };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
