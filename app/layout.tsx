import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import localFont from "next/font/local";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

const sansation = localFont({
  src: [
    { path: "../public/fonts/Sansation-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/Sansation-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Sansation-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-sansation",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://distributed-async-await.io"),
  title: {
    template: "%s — Distributed Async Await",
    default: "Distributed Async Await — the SDK author's handbook",
  },
  description:
    "How to build a Resonate SDK. A handbook for developers implementing the Distributed Async Await protocol in any language — from the protocol mental model to production concerns.",
  icons: {
    icon: "/images/favicon.png",
  },
  openGraph: {
    title: "Distributed Async Await — the SDK author's handbook",
    description: "How to build a Resonate SDK in any language, from first principles to production.",
    url: "https://distributed-async-await.io",
    siteName: "Distributed Async Await",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Distributed Async Await — the SDK author's handbook",
    description: "How to build a Resonate SDK in any language, from first principles to production.",
  },
  alternates: {
    canonical: "https://distributed-async-await.io",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sansation.variable} ${lora.variable} ${inter.className}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <body className="bg-surface-light dark:bg-dark min-h-screen font-serif">
        <Navigation />
        <div className="max-w-[1400px] mx-auto">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
