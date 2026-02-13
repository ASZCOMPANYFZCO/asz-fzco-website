import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "ASZ Company FZCO | International Noble & Ferro Alloy Trading",
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "noble alloys",
    "ferro alloys",
    "minor metals",
    "ferro silicon",
    "ferro chrome",
    "ferro manganese",
    "ferro molybdenum",
    "ferro vanadium",
    "ferro titanium",
    "ferro tungsten",
    "ferro niobium",
    "ferro boron",
    "antimony",
    "chromium",
    "cobalt",
    "hafnium",
    "manganese",
    "molybdenum",
    "niobium",
    "silicon",
    "titanium",
    "tungsten",
    "vanadium",
    "yttrium",
    "zirconium",
    "metal trading",
    "Dubai",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "ASZ Company FZCO | International Noble & Ferro Alloy Trading",
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Ferro Alloys & Minor Metals`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Global Metal Trading`,
    description: SITE_CONFIG.description,
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
