import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Features from "./components/Features";
import Showcase from "./components/Showcase";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Grain from "./components/Grain";
import Cursor from "./components/Cursor";

export default function MotionDesignPage() {
  return (
    <div
      style={{
        backgroundColor: "#FAFAF8",
        minHeight: "100vh",
        fontFamily: "'Manrope', sans-serif",
        cursor: "none",
      }}
    >
      <Cursor />
      <Grain />
      <NavBar />
      <Hero />
      <Marquee />
      <Features />
      <Showcase />
      <CTASection />
      <Footer />
    </div>
  );
}
