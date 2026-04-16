import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import FleetSection from "@/components/FleetSection";
import AboutSection from "@/components/AboutSection";
import PricesSection from "@/components/PricesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <FleetSection />
      <AboutSection />
      <PricesSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
