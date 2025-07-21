import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { trajan } from "@/lib/fonts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZODIA - Nebula Immersion",
  description: "Dive deep into the cosmic nebula where stellar formations birth the future of decentralized astrology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${trajan.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
