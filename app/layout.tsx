"use client";
import { useEffect } from "react";
import type { Metadata } from "next";
import Lenis from "@studio-freight/lenis";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  
  return (
    <html lang="en">
      <head>
        <title>Aditya Khalkar</title>
        {/* Use a standard link tag for stylesheets */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400..900&family=Poppins:wght@400..900&family=Nunito:wght@400..900&family=Montserrat:wght@400..900&family=Georgia:wght@400..900&family=Anton:wght@400..900&family=Open+Sans:wght@400..900&family=Press+Start+2P&family=Orbitron:wght@400..900&family=Bebas+Neue:wght@400..900&family=Pacifico&family=Audiowide&family=Bungee&family=Caveat:wght@400..700&family=Cinzel:wght@400..900&display=swap" 
          rel="stylesheet" 
        />
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        
        {children}
      </body>
    </html>
  );
}
