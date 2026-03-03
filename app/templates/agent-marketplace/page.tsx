import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import FeaturedAgents from "./components/FeaturedAgents";
import Features from "./components/Features";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Grain from "./components/Grain";
import Cursor from "./components/Cursor";

export default function AgentMarketplacePage() {
  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        color: "#E8E8E8",
        minHeight: "100vh",
        fontFamily: "'Space Grotesk', sans-serif",
        cursor: "none",
      }}
    >
      <Cursor />
      <Grain />
      <NavBar />
      <Hero />
      <FeaturedAgents />
      <Features />
      <CTASection />
      <Footer />
    </div>
  );
}
