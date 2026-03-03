import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import Metrics from "./components/Metrics";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Grain from "./components/Grain";

export default function SupplyChainPage() {
  return (
    <div
      style={{
        backgroundColor: "#0C0A09",
        color: "#EDE8E0",
        minHeight: "100vh",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <Grain />
      <NavBar />
      <Hero />
      <Problem />
      <Solution />
      <Metrics />
      <CTASection />
      <Footer />
    </div>
  );
}
