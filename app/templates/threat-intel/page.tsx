import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import ThreatFeed from "./components/ThreatFeed";
import Metrics from "./components/Metrics";
import Features from "./components/Features";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Grain from "./components/Grain";
import Scanline from "./components/Scanline";
import Cursor from "./components/Cursor";

export default function ThreatIntelPage() {
  return (
    <div
      style={{
        backgroundColor: "#0B0D11",
        minHeight: "100vh",
        fontFamily: "'IBM Plex Sans', sans-serif",
        cursor: "none",
      }}
    >
      <Cursor />
      <Grain />
      <Scanline />
      <NavBar />
      <Hero />
      <ThreatFeed />
      <Metrics />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
}
