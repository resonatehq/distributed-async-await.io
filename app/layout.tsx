import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import localFont from "next/font/local";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ConsentManager from "@/components/ConsentManager";
import { Analytics } from "@vercel/analytics/next";
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

const SITE_URL = "https://www.distributed-async-await.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s — Distributed Async Await",
    default: "Distributed Async Await — the SDK author's handbook",
  },
  description:
    "How to build a Resonate SDK. A handbook for developers implementing the Distributed Async Await protocol in any language — from the protocol mental model to production concerns.",
  icons: {
    icon: [
      { url: "/images/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon.png", type: "image/png", sizes: "256x256" },
    ],
    shortcut: "/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    title: "Distributed Async Await — the SDK author's handbook",
    description: "How to build a Resonate SDK in any language, from first principles to production.",
    url: SITE_URL,
    siteName: "Distributed Async Await",
    type: "website",
    images: [
      {
        url: "/images/og-default.png",
        width: 2400,
        height: 1260,
        alt: "Distributed Async Await — the SDK author's handbook",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Distributed Async Await — the SDK author's handbook",
    description: "How to build a Resonate SDK in any language, from first principles to production.",
    images: ["/images/og-default.png"],
  },
  alternates: {
    canonical: SITE_URL,
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
      <head>
        {/* Consent Mode v2 — default everything to denied before any tag runs.
            Google Analytics is not loaded until the visitor opts in via ConsentManager. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:2000});`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "Distributed Async Await",
                  description:
                    "How to build a Resonate SDK. A handbook for developers implementing the Distributed Async Await protocol in any language — from the protocol mental model to production concerns.",
                },
                {
                  "@type": "Organization",
                  "@id": "https://resonatehq.io/#organization",
                  name: "ResonateHQ",
                  url: "https://resonatehq.io",
                  sameAs: [
                    "https://twitter.com/resonatehqio",
                    "https://github.com/resonatehq",
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-surface-light dark:bg-dark min-h-screen font-serif">
        <Navigation />
        <div className="max-w-[1400px] mx-auto">
          {children}
        </div>
        <Footer />
        <ConsentManager />
        <Analytics />
      </body>
    </html>
  );
}
