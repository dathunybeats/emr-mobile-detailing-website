import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = localFont({
  src: [
    {
      path: "../public/barlowcondensed-htx3l3i-jcgchyj8vi-l6oo_au7b6xht2g.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/barlowcondensed-htxwl3i-jcgchyj8vi-l6oo_au7b4-lwz3bwuq.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/barlowcondensed-htxwl3i-jcgchyj8vi-l6oo_au7b4873z3bwuq.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-barlow-condensed",
});

export const metadata: Metadata = {
  title: "Auto Detailing Pro - Professional Car Detailing Services",
  description: "Premium car detailing services including ceramic coating, paint protection, interior cleaning, and full-service auto detailing. Professional results guaranteed.",
  keywords: "car detailing, auto detailing, ceramic coating, paint protection, interior cleaning, car wash, professional detailing",
  authors: [{ name: "Auto Detailing Pro" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
