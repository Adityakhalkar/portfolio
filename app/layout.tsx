import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CursorMask from "../components/CursorMask";
import { ThemeProvider } from "next-themes";
import React from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Aditya Khalkar - Portfolio",
  description: "Aditya Khalkar - Full stack developer -  Freelancer - Deep-ML",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrapping in ThemeProvider */}
        <div className="mask-overlay" />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          <CursorMask />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
