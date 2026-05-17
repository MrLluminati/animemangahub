import type { Metadata } from "next";
import { Epilogue, Hanken_Grotesk, Space_Grotesk } from "next/font/google";

import { CacheDebugPanel } from "@/components/debug/CacheDebugPanel";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GlowBackground } from "@/components/theme/GlowBackground";
import { ThemeBootScript } from "@/components/theme/ThemeBootScript";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

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
  title: "AniManga Hub",
  description: "Discover anime and manga, explore reviews, and find official watch/read sources."
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
