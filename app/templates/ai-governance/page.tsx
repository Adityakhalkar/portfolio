import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import Features from "./components/Features";
import DashboardPreview from "./components/DashboardPreview";
import Metrics from "./components/Metrics";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Grain from "./components/Grain";
import Cursor from "./components/Cursor";
import Quote from "./components/Quote";

export default function AIGovernancePage() {
  return (
    <div
      style={{
        backgroundColor: "#F7F6F3",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "none",
      }}
    >
      <Cursor />
      <Grain />
      <NavBar />
      <Hero />
      <TrustedBy />
      <Metrics />
      <Features />
      <Quote />
      <DashboardPreview />
      <CTASection />
      <Footer />
    </div>
  );
}
