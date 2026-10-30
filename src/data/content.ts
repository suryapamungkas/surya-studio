// src/data/content.ts

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: "landing-page" | "e-commerce" | "web-app";
  categoryLabel: string;
  description: string;
  impactMetrics: string[];
  techStack: string[];
  imageUrl: string;
  liveUrl: string;
  featured: boolean;
  /** Opsional: video pratinjau pendek (mp4/webm, muted) yang diputar saat hover */
  videoUrl?: string;
}

export interface CalculatorOption {
  id: string;
  label: string;
  description: string;
  price: number; // dalam Rupiah
  estimatedDays: number;
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  targetAudience: string;
  priceLabel: string;
  startingPrice: number;
  description: string;
  deliverables: string[];
  notIncluded?: string[];
  ctaText: string;
  waTemplate: string;
  isPopular: boolean;
}

// ==========================================
// 1. KONFIGURASI UTAMA & KONTAK
// ==========================================
export const SITE_CONFIG = {
  name: "Surya Pamungkas",
  fullName: "Nur Hidayat Surya Pamungkas",
  role: "Full-Stack Developer & Website Builder",
  location: "Indonesia (WIB / GMT+7)",
  whatsappNumber: "6281913130232", // WA aktif (format 628...) dari 081913130232
  email: "suryapamungkas0799@gmail.com",
  githubUrl: "https://github.com/suryapamungkas",
  linkedinUrl: "https://www.linkedin.com/in/suryapamungkas",
  instagramUrl: "https://www.instagram.com/lionelehe",
  availability: {
    isAvailable: true,
    statusText: "Tersedia untuk Proyek Baru — Sisa 2 Slot Bulan Ini",
    responseGuarantee: "Balasan rata-rata < 15 menit pada jam kerja",
  },
};

// Navigasi dock (id = id section pada halaman)
export const NAV_LINKS = [
  { id: "hero", label: "Beranda" },
  { id: "keunggulan", label: "Keunggulan" },
  { id: "portofolio", label: "Portofolio" },
  { id: "calculator", label: "Kalkulator" },
  { id: "harga", label: "Harga" },
  { id: "faq", label: "FAQ" },
];

// ==========================================
// 2. HERO SECTION COPYWRITING
// ==========================================
export const HERO_CONTENT = {
  badge: SITE_CONFIG.availability.statusText,
  headline: "Bukan Sekadar Website. Saya Membangun Mesin Pertumbuhan Bisnis Anda.",
  highlightedWords: ["Mesin Pertumbuhan", "Bisnis Anda."],
  subheadline:
    "Bantu bisnis Anda tampil lebih kredibel, muat dalam hitungan milidetik, dan ubah pengunjung menjadi pembeli. Spesialis pembuatan Landing Page konversi tinggi, E-Commerce otomatis, hingga Custom Web App skala perusahaan.",
  primaryCta: {
    label: "Konsultasi Gratis via WhatsApp",
    subtext: "Diskusi santai tanpa komitmen biaya",
  },
  secondaryCta: {
    label: "Hitung Estimasi Biaya",
    targetId: "#calculator",
  },
  trustBadges: [
    "Garansi Kecepatan PageSpeed 95+",
    "Bebas Pusing Urusan Server & Domain",
    "Pembayaran Aman Bertahap (DP & Termin)",
  ],
  techAndLocalEcosystem: [
    { name: "Next.js", category: "Framework" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Node.js", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Midtrans (QRIS & VA)", category: "Payment" },
    { name: "Xendit", category: "Payment" },
    { name: "Prisma", category: "ORM" },
    { name: "WhatsApp API", category: "Automation" },
    { name: "AWS / Vercel", category: "Cloud" },
  ],
};

// ==========================================
// 3. BENTO GRID (KEUNGGULAN KOMPETITIF)
// ==========================================
export const BENTO_ITEMS = [
  {
    id: "speed-performance",
    colSpan: "md:col-span-2",
    badge: "Performa Ekstrem",
    title: "Website Lambat = Kehilangan Pelanggan. Saya Menjamin Waktu Muat < 1 Detik.",
    description:
      "53% pengunjung di Indonesia menutup website jika loading lebih dari 3 detik. Saya membangun dengan arsitektur modern (Next.js) yang membuat website Anda super ringan, hemat kuota pengunjung, dan disukai algoritma Google.",
    metrics: [
      { label: "Google PageSpeed", value: 99, suffix: "/100" },
      { label: "Waktu Muat Rata-rata", value: 0.6, suffix: "s" },
    ],
  },
  {
    id: "local-integration",
    colSpan: "md:col-span-1",
    badge: "Ekosistem Lokal Siap Pakai",
    title: "Terhubung Otomatis dengan Pembayaran Digital & WhatsApp",
    description:
      "Terima pembayaran otomatis 24 jam via QRIS, Virtual Account (BCA, Mandiri, BNI, BRI), E-Wallet, serta kirim invoice dan notifikasi langsung ke WhatsApp pelanggan.",
    integrations: ["QRIS", "BCA VA", "Mandiri", "GoPay", "OVO / Dana", "WA Notif"],
  },
  {
    id: "code-vs-client",
    colSpan: "md:col-span-1",
    badge: "Mudah Dikelola",
    title: "Kodingan Rumit Urusan Saya, Dashboard Simpel untuk Anda",
    description:
      "Tidak perlu paham pemrograman untuk mengganti foto produk, mengubah harga, atau menulis artikel. Anda mendapatkan Admin Panel yang semudah mengoperasikan media sosial.",
  },
  {
    id: "transparent-communication",
    colSpan: "md:col-span-2",
    badge: "Anti-Ghosting Developer",
    title: "Komunikasi Transparan, Tepat Waktu, dan Bergaransi Penuh",
    description:
      "Kejadian developer menghilang di tengah jalan tidak akan Anda alami di sini. Anda mendapatkan link pantauan progres langsung (live staging) 24/7, jadwal mingguan yang jelas, serta garansi pemeliharaan pasca-rilis.",
  },
];

// ==========================================
// 4. PORTOFOLIO & STUDI KASUS
// ==========================================
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Transformasi E-Commerce & Sistem Katalog B2B Manufaktur",
    client: "PT Karya Logam Nusantara",
    category: "e-commerce",
    categoryLabel: "E-Commerce & B2B",
    description:
      "Membangun ulang platform katalog ribuan produk dengan sistem pencarian instan, kalkulator estimasi penawaran harga otomatis, dan integrasi permintaan penawaran (RFQ) langsung ke WhatsApp tim sales.",
    impactMetrics: [
      "+165% Peningkatan Leads B2B dalam 3 Bulan",
      "Waktu muat turun dari 6.2 detik ke 0.7 detik",
      "Hemat 15 jam/minggu kerja admin rekap pesanan",
    ],
    techStack: ["Next.js", "PostgreSQL", "Tailwind CSS", "WhatsApp Gateway", "Prisma"],
    imageUrl: "/images/projects/b2b-catalog.jpg",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "proj-2",
    title: "Web App Reservasi Klinik & Pembayaran QRIS Otomatis",
    client: "Aesthetic Glow Clinic Jakarta",
    category: "web-app",
    categoryLabel: "Custom Web App",
    description:
      "Sistem booking jadwal dokter real-time terintegrasi dengan pembayaran DP via QRIS (Midtrans) dan pengingat jadwal otomatis H-1 ke WhatsApp pasien.",
    impactMetrics: [
      "Tingkat batal hadir (No-Show) turun 78%",
      "Rekonsiliasi pembayaran 100% otomatis",
      "Digunakan oleh 4.500+ pasien aktif",
    ],
    techStack: ["Next.js", "TypeScript", "Prisma", "Midtrans Payment", "Cron Jobs"],
    imageUrl: "/images/projects/clinic-booking.jpg",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    id: "proj-3",
    title: "High-Conversion Landing Page Properti & Simulasi KPR",
    client: "Grand Harmoni Residence",
    category: "landing-page",
    categoryLabel: "Landing Page & Properti",
    description:
      "Landing page khusus untuk kampanye iklan Meta Ads & Google Ads, dilengkapi fitur tur visual interaktif dan kalkulator simulasi cicilan KPR instan.",
    impactMetrics: [
      "Cost Per Lead (CPL) iklan turun 42%",
      "Skor Google PageSpeed Mobile 99/100",
      "Konversi pengunjung ke jadwal survei naik 2.8x",
    ],
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "Meta Pixel CAPI"],
    imageUrl: "/images/projects/property-lp.jpg",
    liveUrl: "https://example.com",
    featured: true,
  },
];

export const PROJECT_FILTERS: { id: "all" | ProjectItem["category"]; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "landing-page", label: "Company Profile & Landing Page" },
  { id: "e-commerce", label: "E-Commerce & Katalog" },
  { id: "web-app", label: "Custom Web App / SaaS" },
];

// ==========================================
// 5. KALKULATOR ESTIMASI BIAYA (INTERAKTIF)
// ==========================================
export const CALCULATOR_CONFIG = {
  projectTypes: [
    {
      id: "type-lp",
      label: "Landing Page / Promosi Iklan",
      description: "1 halaman panjang fokus konversi penjualan/leads (Cocok untuk UMKM & Iklan).",
      price: 2500000,
      estimatedDays: 7,
    },
    {
      id: "type-compro",
      label: "Company Profile Profesional",
      description: "Multi-halaman (5-8 halaman) untuk kredibilitas perusahaan, portofolio, & blog.",
      price: 5500000,
      estimatedDays: 14,
    },
    {
      id: "type-ecommerce",
      label: "Toko Online / E-Commerce Custom",
      description: "Katalog produk lengkap, keranjang belanja, manajemen stok & laporan pesanan.",
      price: 9000000,
      estimatedDays: 21,
    },
    {
      id: "type-webapp",
      label: "Custom Web App / Sistem Bisnis",
      description: "Aplikasi web kustom sesuai alur bisnis (Booking, SaaS, ERP/CRM internal, Portal Member).",
      price: 15000000,
      estimatedDays: 30,
    },
  ] as CalculatorOption[],

  addons: [
    {
      id: "addon-cms",
      label: "Custom Admin Panel (CMS Mudah Edit)",
      description: "Ubah teks, gambar, produk, & artikel sendiri kapan saja tanpa koding.",
      price: 1500000,
      estimatedDays: 3,
    },
    {
      id: "addon-payment",
      label: "Integrasi Pembayaran Otomatis (QRIS, VA Bank, E-Wallet)",
      description: "Verifikasi pembayaran otomatis 24 jam via Midtrans / Xendit.",
      price: 1750000,
      estimatedDays: 4,
    },
    {
      id: "addon-analytics",
      label: "Integrasi Pelacakan & Analitik (Meta Pixel & GA4)",
      description: "Lacak traffic akurat, konversi klik WhatsApp, & performa iklan secara real-time.",
      price: 950000,
      estimatedDays: 2,
    },
    {
      id: "addon-wa",
      label: "Notifikasi & Otomatisasi WhatsApp",
      description: "Kirim invoice, OTP, atau pengingat pesanan otomatis ke WA pelanggan.",
      price: 1250000,
      estimatedDays: 2,
    },
    {
      id: "addon-seo",
      label: "Paket Optimasi SEO Teknis & Google Bisnisku",
      description: "Riset kata kunci dasar, Schema Markup, Sitemap, & indeks cepat di Google.",
      price: 1200000,
      estimatedDays: 2,
    },
    {
      id: "addon-multilang",
      label: "Multi-Bahasa (Indonesia & Inggris)",
      description: "Tampilan dua bahasa profesional untuk menjangkau klien internasional.",
      price: 1500000,
      estimatedDays: 3,
    },
  ] as CalculatorOption[],

  urgencyMultipliers: [
    {
      id: "standard",
      label: "Jadwal Standar",
      description: "Waktu pengerjaan normal sesuai antrean standar.",
      priceMultiplier: 1.0,
      timeMultiplier: 1.0,
    },
    {
      id: "express",
      label: "Prioritas Express (Lebih Cepat 40%)",
      description: "Pengerjaan diprioritaskan untuk mengejar jadwal rilis mendesak.",
      priceMultiplier: 1.3, // +30% biaya lembur/prioritas
      timeMultiplier: 0.6, // Waktu dipangkas 40%
    },
  ],
};

// ==========================================
// 6. PAKET HARGA TETAP (PRICING TIERS)
// ==========================================
export const PRICING_TIERS: PricingTier[] = [
  {
    id: "tier-starter",
    name: "Starter UMKM & Ads",
    targetAudience: "Untuk bisnis baru, peluncuran produk, atau kampanye iklan digital.",
    priceLabel: "Mulai Rp 2,5 Juta",
    startingPrice: 2500000,
    description:
      "Solusi cepat dan hemat untuk memiliki halaman penawaran yang meyakinkan dan langsung menghasilkan kontak pelanggan via WhatsApp.",
    deliverables: [
      "Desain Eksklusif 1 Halaman Panjang (Bukan Template Pasaran)",
      "Bantuan Penyusunan Kalimat Promosi (Copywriting Persuasif)",
      "Tombol & Formulir Order Langsung ke WhatsApp",
      "Integrasi Meta Pixel & Google Analytics",
      "Kecepatan Loading Tinggi (Skor PageSpeed 95+)",
      "Gratis Setup Domain (.com / .id) & Cloud Hosting 1 Tahun",
      "Garansi Maintenance & Revisi Minor 30 Hari",
    ],
    ctaText: "Pilih Paket Starter",
    waTemplate:
      "Halo, saya tertarik dengan *Paket Starter UMKM & Ads (Mulai Rp 2,5 Juta)*. Boleh diskusi untuk kebutuhan bisnis saya?",
    isPopular: false,
  },
  {
    id: "tier-business",
    name: "Business Growth",
    badge: "Paling Banyak Dipilih",
    targetAudience: "Untuk Perusahaan (PT/CV), Klinik, Agensi, atau Toko Online berkembang.",
    priceLabel: "Mulai Rp 6,5 Juta",
    startingPrice: 6500000,
    description:
      "Website multi-halaman berkelas korporat yang dilengkapi halaman Admin (CMS) agar tim Anda leluasa mengelola konten atau produk setiap hari.",
    deliverables: [
      "Hingga 8 Halaman Kustom (Home, Tentang, Layanan, Katalog, Blog, dll)",
      "Dashboard Admin (CMS) Mudah Digunakan Tanpa Koding",
      "Desain UI/UX Interaktif dengan Animasi Halus & Modern",
      "Optimasi SEO On-Page Lengkap (Mudah Ditemukan di Google)",
      "Opsional: Integrasi Payment Gateway (QRIS/VA) & WhatsApp Bot",
      "Gratis Domain, Cloud Server Cepat & SSL Keamanan 1 Tahun",
      "Video Panduan Penggunaan Admin & Garansi 60 Hari",
    ],
    ctaText: "Konsultasi Paket Business",
    waTemplate:
      "Halo, saya tertarik dengan *Paket Business Growth (Mulai Rp 6,5 Juta)*. Bisa jadwalkan diskusi singkat mengenai fitur yang saya butuhkan?",
    isPopular: true,
  },
  {
    id: "tier-custom",
    name: "Custom Full-Stack & Web App",
    targetAudience: "Untuk Startup, Korporasi, SaaS, atau Sistem Operasional Khusus.",
    priceLabel: "Mulai Rp 15 Juta",
    startingPrice: 15000000,
    description:
      "Pengembangan aplikasi web dari nol (Frontend + Backend + Database) yang dirancang khusus mengikuti alur proses bisnis unik perusahaan Anda.",
    deliverables: [
      "Arsitektur Full-Stack Skalabel (Next.js, Node.js, PostgreSQL)",
      "Sistem Login Multi-Role (Admin, Staff, Customer/Member)",
      "Integrasi API Pihak Ketiga (ERP, CRM, Midtrans, Xendit, WA API)",
      "Dashboard Analitik & Export Laporan (Excel / PDF)",
      "Keamanan Data Berlapis & Backup Database Otomatis",
      "Dokumentasi Teknis Lengkap & Hak Milik Source Code 100%",
      "Dukungan Teknis Prioritas (SLA) & Garansi 90 Hari",
    ],
    ctaText: "Diskusi Arsitektur Sistem",
    waTemplate:
      "Halo, saya ingin mendiskusikan pembuatan *Custom Web App / Sistem Full-Stack* untuk perusahaan kami. Kapan kita bisa meeting singkat?",
    isPopular: false,
  },
];

// ==========================================
// 7. ALUR KERJA (WORKFLOW TIMELINE)
// ==========================================
export const WORKFLOW_STEPS = [
  {
    stepNumber: "01",
    title: "Diskusi & Bedah Kebutuhan (Gratis)",
    duration: "Hari ke-1",
    description:
      "Kita ngobrol santai via WhatsApp atau Google Meet. Anda ceritakan target bisnis Anda, dan saya berikan saran fitur serta rincian biaya yang transparan tanpa biaya tersembunyi.",
    deliverable: "Dokumen Proposal & Kesepakatan Fitur (MoU)",
  },
  {
    stepNumber: "02",
    title: "Desain Visual & Preview Struktur",
    duration: "Hari ke-2 s/d 5",
    description:
      "Sebelum masuk ke tahap pemrograman rumit, saya buatkan rancangan tampilan (UI/UX) sesuai identitas brand Anda. Anda bisa memberi masukan hingga tampilannya benar-benar pas.",
    deliverable: "Desain Interaktif & Persetujuan Visual",
  },
  {
    stepNumber: "03",
    title: "Development & Pantauan Progres Live",
    duration: "Minggu ke-1 s/d 3",
    description:
      "Website mulai dibangun dengan kode berkualitas tinggi. Anda akan diberikan tautan khusus (Staging Link) untuk memantau progres pembuatan website secara langsung dari HP/Laptop Anda.",
    deliverable: "Staging Website Siap Uji Coba",
  },
  {
    stepNumber: "04",
    title: "Peluncuran, Panduan & Garansi",
    duration: "Hari Peluncuran",
    description:
      "Setelah semua fitur diuji dan disetujui, website resmi diluncurkan ke domain Anda. Saya berikan video tutorial cara mengelola web serta dukungan garansi penuh.",
    deliverable: "Website Live, Akses Penuh & Video Tutorial",
  },
];

// ==========================================
// 8. TESTIMONI KLIEN
// ==========================================
export const TESTIMONIALS = [
  {
    id: "testi-1",
    name: "Hendra Wijaya",
    role: "Direktur Operasional, PT Karya Logam Nusantara",
    avatar: "/images/avatars/client-1.jpg",
    comment:
      "Sebelumnya sudah 2 kali kecewa pakai jasa web lain karena lambat dan susah dihubungi. Di sini komunikasinya luar biasa jelas, web kami selesai tepat waktu, dan permintaan penawaran dari klien korporat naik drastis.",
    rating: 5,
  },
  {
    id: "testi-2",
    name: "dr. Clarissa Putri",
    role: "Founder, Aesthetic Glow Clinic",
    avatar: "/images/avatars/client-2.jpg",
    comment:
      "Sistem reservasi dan pembayaran QRIS otomatis yang dibuat benar-benar meringankan kerja resepsionis kami. Tampilannya sangat mewah dan pasien sering memuji betapa cepatnya proses booking sekarang.",
    rating: 5,
  },
  {
    id: "testi-3",
    name: "Rizky Pratama",
    role: "Digital Marketing Lead, Grand Harmoni",
    avatar: "/images/avatars/client-3.jpg",
    comment:
      "Sebagai pengiklan, kecepatan landing page adalah segalanya. Begitu pindah ke landing page baru buatan Mas, rasio klik ke konversi WhatsApp naik hampir 3 kali lipat dengan budget iklan yang sama.",
    rating: 5,
  },
];

// ==========================================
// 9. PERTANYAAN UMUM (FAQ)
// ==========================================
export const FAQS = [
  {
    question: "Bagaimana sistem pembayarannya? Apakah harus bayar lunas di awal?",
    answer:
      "Tidak perlu lunas di awal. Pembayaran dilakukan secara bertahap yang aman bagi Anda: DP 40% saat kesepakatan kerja dimulai, dan pelunasan 60% hanya setelah website selesai dibangun, diuji coba, dan siap diluncurkan.",
  },
  {
    question: "Apakah saya perlu paham koding untuk mengubah isi website nantinya?",
    answer:
      "Sama sekali tidak. Untuk website dengan fitur CMS/Admin Panel, Anda bisa mengubah teks, mengganti foto, menambah produk, atau menulis berita semudah mengunggah status di media sosial. Saya juga menyiapkan video panduan khusus dalam bahasa Indonesia untuk Anda.",
  },
  {
    question: "Apakah harga sudah termasuk Domain (.com/.id) dan Hosting/Server?",
    answer:
      "Ya! Untuk paket Starter dan Business Growth, biaya tahun pertama sudah termasuk pendaftaran nama domain resmi (.com atau .co.id/.id) serta layanan Cloud Server berkecepatan tinggi. Hak milik domain sepenuhnya atas nama Anda/perusahaan Anda.",
  },
  {
    question: "Bagaimana jika saya belum punya materi tulisan (copywriting) atau foto?",
    answer:
      "Tenang saja, saya akan membantu menyusun struktur kalimat promosi (copywriting) yang rapi dan menjual berdasarkan informasi singkat dari Anda. Untuk aset visual, saya juga menyediakan akses ke ribuan ilustrasi dan foto lisensi resmi berkualitas tinggi.",
  },
  {
    question: "Apakah ada biaya bulanan wajib setelah website jadi?",
    answer:
      "Tidak ada biaya bulanan wajib kepada saya. Anda hanya perlu memperpanjang biaya sewa tahunan Domain & Server di tahun berikutnya (estimasi mulai Rp 600rb - Rp 1,5 juta/tahun tergantung kapasitas server). Jika butuh bantuan pengelolaan rutin, tersedia juga paket maintenance opsional.",
  },
  {
    question: "Bagaimana jika terjadi error setelah website diserahkan?",
    answer:
      "Setiap proyek dilindungi oleh Garansi Teknis (30 hingga 90 hari tergantung paket). Jika ada fitur yang tidak berjalan sesuai kesepakatan awal atau kendala teknis pada sistem, saya akan memperbaikinya 100% gratis tanpa biaya tambahan.",
  },
];

// Footer CTA & widget WhatsApp
export const FOOTER_CONTENT = {
  headline: "Siap Meningkatkan Kredibilitas & Omzet Bisnis Anda?",
  subheadline:
    "Ceritakan ide Anda hari ini. Konsultasi gratis, proposal transparan, dan tanpa kewajiban apa pun.",
  waMessage: "Halo, saya ingin konsultasi gratis mengenai pembuatan website untuk bisnis saya.",
  floatingLabel: "Tanya-tanya dulu? Gratis!",
  copyToast: "Email berhasil disalin!",
};

// ==========================================
// 10. HELPER FUNCTIONS (UNTUK KOMPONEN UI)
// ==========================================

/**
 * Memformat angka menjadi mata uang Rupiah (contoh: Rp 2.500.000)
 */
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Menghasilkan URL WhatsApp otomatis dengan pesan yang sudah di-encode
 */
export function generateWhatsAppLink(customMessage: string): string {
  const encodedMessage = encodeURIComponent(customMessage);
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedMessage}`;
}

/**
 * Menghasilkan teks pesan WhatsApp otomatis dari hasil Kalkulator Proyek
 */
export function buildCalculatorWhatsAppMessage(
  selectedType: CalculatorOption,
  selectedAddons: CalculatorOption[],
  urgencyLabel: string,
  totalEstimatedPrice: number,
  totalEstimatedDays: number
): string {
  const addonsList =
    selectedAddons.length > 0
      ? selectedAddons.map((a) => `  • ${a.label}`).join("\n")
      : "  • Tanpa fitur tambahan";

  return [
    `Halo ${SITE_CONFIG.name}, saya baru saja mencoba simulasi biaya di website Anda.`,
    ``,
    `*Rincian Kebutuhan Proyek Saya:*`,
    `📌 *Tipe Website:* ${selectedType.label}`,
    `⚡ *Target Waktu:* ${urgencyLabel} (~${totalEstimatedDays} hari kerja)`,
    `🧩 *Fitur Tambahan:*`,
    addonsList,
    ``,
    `💰 *Estimasi di Website:* ${formatIDR(totalEstimatedPrice)}`,
    ``,
    `Apakah kita bisa diskusi lebih lanjut mengenai proyek ini?`,
  ].join("\n");
}