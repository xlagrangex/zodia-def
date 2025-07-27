import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  icons: {
    icon: "/faviconzodia.svg",
    shortcut: "/faviconzodia.svg",
    apple: "/faviconzodia.svg",
  },
  openGraph: {
    title: "ZODIA - Nebula Immersion",
    description: "Dive deep into the cosmic nebula where stellar formations birth the future of decentralized astrology.",
    url: "https://zodia-def.vercel.app",
    siteName: "ZODIA",
    images: [
      {
        url: "/ZODIA-BANNER-Dexscreen-1500x500px.png",
        width: 1500,
        height: 500,
        alt: "ZODIA - Nebula Immersion Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZODIA - Nebula Immersion",
    description: "Dive deep into the cosmic nebula where stellar formations birth the future of decentralized astrology.",
    images: ["/ZODIA-BANNER-Dexscreen-1500x500px.png"],
    creator: "@zodia_project",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/faviconzodia.svg" />
        <link rel="shortcut icon" href="/faviconzodia.svg" />
        <link rel="apple-touch-icon" href="/faviconzodia.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
