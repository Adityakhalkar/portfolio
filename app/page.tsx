"use client";

import React, { useState, useCallback } from "react";
import Loader from "@/components/Loader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MyWork from "@/components/MyWork";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact, { EMAIL, MAILTO } from "@/components/Contact";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <Loader onComplete={handleLoaderComplete} />}
      <main className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navigation />
        <Hero startAnimation={loaded} />
        <MyWork />
        <About />
        <Skills />
        <Contact />

        <footer className="py-12 px-6 text-center text-secondary font-['Inter'] text-sm">
          <a
            href={MAILTO}
            className="font-mono text-black dark:text-white border-b border-current
              pb-0.5 hover:pb-1 transition-all duration-200 break-all"
          >
            {EMAIL}
          </a>
          <p className="mt-6">&copy; {new Date().getFullYear()} Aditya Khalkar. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
