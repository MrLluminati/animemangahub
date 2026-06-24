import type { Metadata } from "next";
import { Epilogue, Hanken_Grotesk, Space_Grotesk } from "next/font/google";

import { CacheDebugPanel } from "@/components/debug/CacheDebugPanel";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GlowBackground } from "@/components/theme/GlowBackground";
import { ThemeBootScript } from "@/components/theme/ThemeBootScript";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { brand } from "@/config/brand";

import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap"
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.websiteUrl),
  title: "AniManga Wire — Anime News, Manga Updates & Release Dates",
  description: brand.description,
  openGraph: {
    title: "AniManga Wire — Anime News, Manga Updates & Release Dates",
    description: brand.description,
    url: brand.websiteUrl,
    siteName: brand.brandName,
    images: [
      {
        url: brand.banner.youtubePreview,
        width: 2048,
        height: 1152,
        alt: brand.brandName
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AniManga Wire — Anime News, Manga Updates & Release Dates",
    description: brand.description,
    images: [brand.banner.youtubePreview]
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
      { url: brand.logo.abbreviated, type: "image/png", sizes: "512x512" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <ThemeBootScript />
      </head>
      <body className={`${epilogue.variable} ${hankenGrotesk.variable} ${spaceGrotesk.variable} min-h-screen antialiased`}>
        <ThemeProvider>
          <GlowBackground />
          <Header />
          <main className="relative z-10 mx-auto min-h-[calc(100vh-180px)] max-w-[1800px] px-4 py-8 sm:px-6 lg:px-12 2xl:px-20">
            {children}
          </main>
          <CacheDebugPanel />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
