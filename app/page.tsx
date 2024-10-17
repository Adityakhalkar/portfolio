"use client";
import Hero from "@/components/hero";
import About from "@/components/about";
import Skillset from "@/components/skillset";
import InteractiveText3D from "@/components/AnimatedText";
const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <main>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <InteractiveText3D />
    </div>
        <Hero />
        <Skillset />
        <About />
      </main>
    </div>
  );
};

export default MainPage;
