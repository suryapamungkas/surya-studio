# 🚀 Surya Jasa — High-Conversion Portfolio & Web Builder

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js%2015-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![License MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)

<br />

**Website Portofolio & Jasa Pembuatan Website Profesional Berkonversi Tinggi**  
*Dirancang dengan estetika gelap modern (Linear & Vercel style), animasi interaktif halus 60fps, dan kalkulator simulasi biaya instan.*

[Demo Lokal](http://localhost:3000) • [Laporkan Masalah](https://github.com/suryapamungkas/surya-jasa/issues) • [Kontak WhatsApp](https://wa.me/6281913130232)

</div>

---

## 📌 Ringkasan Proyek

**Surya Jasa** adalah website portofolio dan landing page layanan pembuatan website kelas enterprise yang menargetkan pemilik bisnis, UMKM, startup, dan korporasi di Indonesia. Website ini tidak hanya berfungsi sebagai etalase karya, melainkan sebagai **mesin konversi bisnis** yang mengubah pengunjung menjadi prospek WhatsApp secara otomatis.

### 🌟 Fitur Unggulan

- 🧮 **Kalkulator Estimasi Biaya Interaktif**: Simulasi biaya pembuatan website secara *real-time* berdasarkan tipe website, fitur tambahan (CMS, payment gateway, analytics), dan target kecepatan. Otomatis menghasilkan tautan pesan WhatsApp terstruktur.
- ⚡ **Bento Grid Modern**: Menampilkan keunggulan kompetitif dengan indikator performa Google PageSpeed 99/100, node alur ekosistem pembayaran lokal, toggle arsitektur Frontend vs Backend, serta jam zona waktu (WIB/WITA/WIT) *real-time*.
- 📱 **Floating Glass Dock & WhatsApp Widget**: Navigasi *dock* dengan indikator pil geser (*layoutId*) dan *floating action button* WhatsApp dengan lencana notifikasi yang melebar saat *hover*.
- 📂 **Showcase Portofolio & Drawer Studi Kasus**: Filter kategori instan, pratinjau media dengan efek pembesaran halus, serta modal drawer studi kasus dengan *scroll-lock*.
- 🎨 **Estetika Kelas Global**: Palet warna obsidian (`#09090B`), aksen indigo-violet gradient (`#6366F1` ke `#8B5CF6`), border tipis bercahaya, dan efek *radial spotlight* mengikuti kursor mouse tanpa memicu *re-render* React.
- 🚀 **Performa Ekstrem**: Integrasi *Lenis Smooth Scroll*, Next.js 15 App Router, format gambar otomatis AVIF/WebP, dan penghormatan penuh terhadap preferensi `prefers-reduced-motion`.

---

## 🛠️ Tech Stack

| Layer | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) | Server-side rendering, static generation, dan routing modern |
| **Library UI** | [React 19](https://react.dev/) | Primitif reaktivitas dan komponen berbasis TypeScript |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Sistem token warna kustom dan utilitas CSS berbasis performa |
| **Animasi** | [Framer Motion](https://www.framer.com/motion/) | Transisi pegas fisika, layoutId, dan animasi gestur |
| **Smooth Scroll** | [Lenis](https://github.com/darkroomengineering/lenis) | Pengguliran inersia halus berbasis compositor thread |
| **Komponen Primitif** | [@radix-ui/react-accordion](https://www.radix-ui.com/) | Accordion FAQ yang dapat diakses penuh (WAI-ARIA) |
| **Ikon** | [Lucide React](https://lucide.dev/) & [Simple Icons](https://simpleicons.org/) | Ikon antarmuka dan logo teknologi resmi SVG |

---

## 📁 Struktur Direktori

```text
surya-jasa/
├── public/                     # Aset publik statis (gambar mockups, avatars, OG banner)
│   ├── images/
│   │   ├── avatars/            # Foto testimonial klien
│   │   └── projects/           # Mockup proyek portofolio
│   └── og-image.jpg            # Open Graph social media banner
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Tailwind v4 import, theme tokens & custom animations
│   │   ├── layout.tsx          # Root layout, metadata SEO, JSON-LD schema
│   │   └── page.tsx            # Komposisi halaman utama
│   ├── components/
│   │   ├── layout/
│   │   │   └── DockNav.tsx     # Floating glass dock navigation bar
│   │   ├── sections/
│   │   │   ├── Hero.tsx        # Hero section dengan per-word reveal & dual CTA
│   │   │   ├── BentoGrid.tsx   # Bento grid fitur & keunggulan kompetitif
│   │   │   ├── ProjectShowcase.tsx # Portofolio & drawer studi kasus
│   │   │   ├── InteractiveCostCalculator.tsx # Kalkulator simulasi biaya real-time
│   │   │   ├── PricingSection.tsx # Kartu paket harga transparan
│   │   │   ├── WorkflowTimeline.tsx # Timeline alur kerja 4 tahap
│   │   │   ├── Testimonials.tsx # Marquee ulasan klien
│   │   │   ├── FaqSection.tsx  # Accordion FAQ
│   │   │   ├── FooterCta.tsx   # Footer konversi & tombol salin email
│   │   │   └── FloatingWhatsApp.tsx # Widget WhatsApp melayang kanan bawah
│   │   └── ui/                 # Komponen antarmuka modular
│   │       ├── AnimatedNumber.tsx # Counter angka halus tanpa re-render React
│   │       ├── Button.tsx      # Tombol bergradasi & efek kilau
│   │       ├── Magnetic.tsx    # Pembungkus tombol berdaya tarik kursor
│   │       ├── Marquee.tsx     # Ticker horizontal tanpa lag (CSS pure)
│   │       ├── Reveal.tsx      # Animasi elemen saat masuk viewport
│   │       ├── SpotlightCard.tsx # Kartu spotlight radial mengikuti pointer
│   │       └── Toast.tsx       # Pemberitahuan mengambang
│   ├── data/
│   │   └── content.ts          # SINGLE SOURCE OF TRUTH (Data, teks, harga, kontak)
│   └── lib/
│       ├── lenis.ts            # Handler controller smooth scroll
│       └── utils.ts            # Penggabung class Tailwind (clsx & twMerge)
├── package.json
├── tsconfig.json
├── LICENSE                     # Lisensi MIT
└── README.md
```

---

## ⚡ Memulai (Getting Started)

### Prasyarat
- [Node.js](https://nodejs.org/) versi `18.18.0` atau yang lebih baru (disarankan Node.js 20+).
- Paket manager `npm`, `pnpm`, atau `yarn`.

### Instalasi Langkah demi Langkah

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/suryapamungkas/surya-jasa.git
   cd surya-jasa
   ```

2. **Pasang Dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembangan (Dev Mode)**:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

4. **Kompilasi untuk Produksi (Build)**:
   ```bash
   npm run build
   npm run start
   ```

---

## ⚙️ Kustomisasi Data Konten

Seluruh teks, nomor WhatsApp, akun media sosial, portofolio, harga paket, dan konfigurasi kalkulator dikelola terpusat di satu file:

👉 **[`src/data/content.ts`](src/data/content.ts)**

Contoh konfigurasi kontak:
```typescript
export const SITE_CONFIG = {
  name: "Surya Pamungkas",
  fullName: "Nur Hidayat Surya Pamungkas",
  role: "Full-Stack Developer & Website Builder",
  location: "Indonesia (WIB / GMT+7)",
  whatsappNumber: "6281913130232",
  email: "suryapamungkas0799@gmail.com",
  githubUrl: "https://github.com/suryapamungkas",
  linkedinUrl: "https://www.linkedin.com/in/suryapamungkas",
  instagramUrl: "https://www.instagram.com/lionelehe",
  // ...
};
```

---

## 🚀 Panduan Deployment

Website ini siap dideploy secara instan ke berbagai penyedia hosting modern:

### 1. Vercel (Direkomendasikan)
1. Buat akun di [Vercel](https://vercel.com/).
2. Hubungkan repositori GitHub ini.
3. Vercel akan otomatis mendeteksi konfigurasi Next.js dan melakukan build produksi.
4. Set variabel lingkungan opsional: `NEXT_PUBLIC_SITE_URL=https://domainanda.com`.

### 2. Node.js VPS / Docker
Proyek dapat dijalankan menggunakan proses manager seperti `pm2`:
```bash
npm run build
pm2 start npm --name "surya-jasa" -- start
```

---

## 👤 Author & Owner

**Nur Hidayat Surya Pamungkas**
- 💼 **Role:** Full-Stack Developer & Website Builder
- 🌐 **GitHub:** [@suryapamungkas](https://github.com/suryapamungkas)
- 🔗 **LinkedIn:** [Nur Hidayat Surya Pamungkas](https://www.linkedin.com/in/suryapamungkas)
- 📸 **Instagram:** [@lionelehe](https://www.instagram.com/lionelehe)
- 📧 **Email:** [suryapamungkas0799@gmail.com](mailto:suryapamungkas0799@gmail.com)
- 💬 **WhatsApp:** [+62 819-1313-0232](https://wa.me/6281913130232)

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi **MIT** — lihat berkas [LICENSE](LICENSE) untuk rincian lengkap.  
Hak Cipta © 2026 **Nur Hidayat Surya Pamungkas**. Seluruh hak cipta dilindungi undang-undang.
