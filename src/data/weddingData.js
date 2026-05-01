/**
 * ================================================
 * FILE KONFIGURASI PERNIKAHAN - EDIT DI SINI
 * ================================================
 * 
 * PANDUAN ASSET:
 * - Taruh foto/video di folder: public/assets/main/
 * - Taruh foto galeri di:       public/assets/gallery/
 * - Taruh logo bank di:         public/assets/logos/
 * 
 * NAMA FILE YANG DIREKOMENDASIKAN:
 * - public/assets/main/hero.jpg        -> Foto hero (kiri/cover)
 * - public/assets/main/story.jpg       -> Foto cerita
 * - public/assets/main/bg.jpg          -> Background halaman
 * - public/assets/main/music.mp3       -> Musik latar
 * - public/assets/main/video.mp4       -> Video sinematik
 * - public/assets/main/bride.jpg       -> Foto mempelai wanita
 * - public/assets/main/groom.jpg       -> Foto mempelai pria
 * - public/assets/logos/bca.png        -> Logo BCA
 * - public/assets/logos/mandiri.png    -> Logo Mandiri
 * - public/assets/gallery/1.jpg        -> Foto galeri 1
 * ...dst
 */

export const weddingData = {
  settings: {
    // hero_greeting: "The Wedding Of",
    hero_date: "2026-06-06",
    quote_text: "Dan di antara tanda-tanda (kebesaran Allah) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
    quote_author: "QS Ar-Rum : 21",
    intro_text: "Dengan memohon Rahmat & Ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.",
    // Ganti path berikut dengan file Anda
    hero_greeting: "THE WEDDING OF",
    photo_hero: "/assets/main/hero.jpg",
    photo_bride: "/assets/main/bride.jpg",
    photo_groom: "/assets/main/groom.jpg",
    photo_story: "/assets/main/story.jpg",
    bg_image_url: "/assets/main/bg.jpg",  // Kosongkan jika tidak pakai background
    music_url: "/assets/main/music.mp3",
    video_url: "/assets/main/video.mp4",
    video_rewind_time: 13.5, // Ganti angka ini untuk menentukan ke detik berapa video mundur (misal 10.5 detik)
  },

  couples: {
    bride: {
      full_name: "Deby Azizah",
      nickname: "Deby",
      parent_prefix: "Putri Bungsu dari",
      father_name: "Bapak H. Jamaludin",
      mother_name: "Ibu Hj. Inah Maryanah H. Baman",
      instagram_url: "https://instagram.com/",
    },
    groom: {
      full_name: "M. Rifqi Alam Ramadhan",
      nickname: "Alam",
      parent_prefix: "Putra Pertama dari ",
      father_name: "Bapak Bambang Agung Muljanto",
      mother_name: "Ibu Irmawati",
      instagram_url: "https://instagram.com/",
    },
  },

  events: [
    {
      type: "Akad Nikah",
      date: "2026-06-06",
      start_time: "08:00",
      end_time: "10:00",
      location_name: "Kediaman Mempelai Wanita",
      address: "Lapangan Komplek Huma Akasia RT 001 RW 008, Kelurahan Jatiwarna, Kecamatan Pondok Melati, Kota Bekasi",
      map_url: "https://maps.app.goo.gl/kUcmyQwGxN3GoHmR6?g_st=iw",
    },
    {
      type: "Resepsi",
      date: "2026-06-06",
      start_time: "11:00",
      end_time: "16:00",
      location_name: "Kediaman Mempelai Wanita",
      address: "Lapangan Komplek Huma Akasia RT 001 RW 008, Kelurahan Jatiwarna, Kecamatan Pondok Melati, Kota Bekasi",
      map_url: "https://maps.app.goo.gl/kUcmyQwGxN3GoHmR6?g_st=iw",
    },
    
  ],

  stories: [
    {
      date: "Januari 2020",
      title: "Pertama Bertemu",
      description: "Awal mula perjalanan cinta kami dimulai di sini.",
      image_url: "/assets/gallery/story1.jpg",
    },
    {
      date: "Maret 2024",
      title: "Lamaran",
      description: "Momen bahagia saat kami memutuskan untuk melangkah lebih jauh.",
      image_url: "/assets/gallery/story2.jpg",
    },
    {
      date: "April 2025",
      title: "Hari Pernikahan",
      description: "Hari yang paling kami nantikan, menjadi satu dalam ikatan suci.",
      image_url: "/assets/gallery/story3.jpg",
    },
  ],

  // Format gallery: array objek dengan image_url dan span_type ('normal', 'wide', 'tall', 'large')
  gallery: [
    { image_url: "/assets/gallery/1.jpg", span_type: "tall" },
    { image_url: "/assets/gallery/2.jpg", span_type: "normal" },
    { image_url: "/assets/gallery/3.jpg", span_type: "normal" },
    { image_url: "/assets/gallery/4.jpg", span_type: "wide" },
    { image_url: "/assets/gallery/5.jpg", span_type: "normal" },
    { image_url: "/assets/gallery/6.jpg", span_type: "normal" },
    { image_url: "/assets/gallery/7.jpg", span_type: "tall" },
    { image_url: "/assets/gallery/8.jpg", span_type: "large" },
    { image_url: "/assets/gallery/9.jpg", span_type: "normal" },
    { image_url: "/assets/gallery/10.jpg", span_type: "normal" },
    { image_url: "/assets/gallery/11.jpg", span_type: "normal" },
    { image_url: "/assets/gallery/12.jpg", span_type: "normal" },
  ],

  gifts: [
    {
      bank_name: "BCA",
      account_number: "6872312338",
      account_name: "Deby Azizah",
      is_address: false,
      logo_url: "/assets/logos/bca.png",
    },
    
    // Uncomment berikut jika ingin tambah alamat pengiriman fisik:
    // {
    //   bank_name: "Alamat Kado",
    //   account_number: "",
    //   account_name: "",
    //   is_address: true,
    //   text_content: "Jl. Contoh Alamat No. 1, Kota Anda",
    // },
  ],

  // Nomor WhatsApp untuk konfirmasi kehadiran (tanpa +, gunakan kode negara)
  // Contoh: "6281234567890" untuk +62 812 3456 7890
  rsvp_whatsapp: "6281234567890",
};
