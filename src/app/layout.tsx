import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TradeHub - Global B2B Marketplace for Smart Business",
  description:
    "Connect with verified suppliers worldwide. Source quality products, negotiate directly, and grow your business with confidence on the most trusted B2B platform.",
  keywords: [
    "B2B marketplace",
    "global trade",
    "suppliers",
    "wholesale",
    "international sourcing",
    "trade platform",
  ],
  openGraph: {
    title: "TradeHub - Global B2B Marketplace",
    description: "Connect with verified suppliers worldwide",
    type: "website",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-secondary font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
