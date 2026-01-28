import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";
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
  title: "Ratio",
  description: "Ratio web application",
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
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1" role="main">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
