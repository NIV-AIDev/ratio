import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GoogleTagManager from "@/components/analytics/google-tag-manager";
import JsonLd from "@/components/seo/json-ld";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { localBusinessJsonLd, siteConfig } from "@/lib/seo";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Open Graph`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-white text-zinc-900 antialiased">
        <GoogleTagManager />
        <JsonLd data={localBusinessJsonLd} id="json-ld-local-business" />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1" role="main">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
