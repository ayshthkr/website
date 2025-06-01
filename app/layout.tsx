import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sfpro = localFont({
  src: "./fonts/SFPRO.otf",
  variable: "--font-sfpro",
});

export const metadata: Metadata = {
  title: "AYSHTHKR",
  description: "Ayush Thakur - Portfolio",
  metadataBase: new URL('https://ayshthkr.vercel.app')
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sfpro.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
