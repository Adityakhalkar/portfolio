"use client";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* Main Content */}
      <main className="pt-16">
        <Hero />
        <About />
      </main>
    </div>
  );
};

export default MainPage;
