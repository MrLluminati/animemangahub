import type { Metadata } from "next";

import { CacheDebugPanel } from "@/components/debug/CacheDebugPanel";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GlowBackground } from "@/components/theme/GlowBackground";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

import "./globals.css";

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
      <body className="min-h-screen antialiased">
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
