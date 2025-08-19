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
  title: "EMR Mobile Detailing - Professional Car Detailing Windsor, Ontario",
  description: "Professional mobile car detailing services in Windsor, Ontario. Interior & exterior packages, precision work, satisfaction guaranteed. Call 519-999-5990 today!",
  keywords: "mobile car detailing, Windsor Ontario detailing, interior exterior packages, precision detailing, satisfaction guaranteed, EMR automotive",
  authors: [{ name: "EMR Mobile Detailing" }],
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
