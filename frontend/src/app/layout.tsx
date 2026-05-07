import type { Metadata } from "next";
import "./globals.css";
import { CacheDebugPanel } from "@/components/debug/CacheDebugPanel";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "AniManga Hub",
  description: "Discover anime and manga, track lists, reviews, and legal watch/read links."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Header />
        <main className="mx-auto min-h-[calc(100vh-160px)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <CacheDebugPanel />
        <Footer />
      </body>
    </html>
  );
}
