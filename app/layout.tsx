import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import React from "react";
import SmoothScroll from "../components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import LightbulbAnimation from "@/components/toggle";

export const metadata: Metadata = {
  title: "Aditya Khalkar | Creative Technologist",
  description: "Portfolio of Aditya Khalkar - Full Stack Developer, Data Scientist, and Creative Technologist.",
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
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&family=Syne:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600;700;800&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground selection:bg-accent selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <SmoothScroll />
          <CustomCursor />
          <GrainOverlay />
          <LightbulbAnimation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
