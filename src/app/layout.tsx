import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SITE_CONFIG } from "@/data/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://domainanda.com";
const title = `Jasa Pembuatan Website Profesional | ${SITE_CONFIG.name} — Full Stack Developer Indonesia`;
const description =
  "Jasa bikin web custom berperforma tinggi: Landing Page UMKM, Company Profile, Toko Online dengan QRIS otomatis, hingga Custom Web App. Konsultasi gratis via WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "Jasa Pembuatan Website Profesional",
    "Full Stack Developer Indonesia",
    "Jasa Bikin Web Custom",
    "Jasa Website UMKM",
    "Jasa Pembuatan Toko Online",
    "Jasa Landing Page",
    "Web Developer Jakarta",
    "Integrasi Midtrans Xendit QRIS",
  ],
  authors: [
    { name: SITE_CONFIG.fullName, url: SITE_CONFIG.githubUrl },
    { name: SITE_CONFIG.name, url: SITE_CONFIG.githubUrl },
  ],
  creator: SITE_CONFIG.fullName,
  publisher: SITE_CONFIG.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: SITE_CONFIG.name,
    title,
    description,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Jasa Pembuatan Website Profesional" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE_CONFIG.fullName} (${SITE_CONFIG.name})`,
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.fullName,
      url: SITE_CONFIG.githubUrl,
    },
    description,
    url: SITE_URL,
    email: SITE_CONFIG.email,
    telephone: `+${SITE_CONFIG.whatsappNumber}`,
    areaServed: "ID",
    priceRange: "Rp 2.500.000 - Rp 50.000.000",
  };

  return (
    <html lang="id" className={`${inter.variable} ${jakarta.variable} ${jetbrains.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
