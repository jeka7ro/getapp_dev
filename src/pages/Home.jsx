import React from "react";
import { LanguageProvider } from "@/components/LanguageContext";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import LoginPortalSection from "@/components/landing/LoginPortalSection";
import BentoGrid from "@/components/landing/BentoGrid";
import { DigitalizareIMMContent } from "@/pages/DigitalizareIMM";
import ServicesSection from "@/components/landing/ServicesSection";
import ProcessSection from "@/components/landing/ProcessSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTAFooter from "@/components/landing/CTAFooter";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0a0e27] text-white overflow-x-hidden">
        <Navbar />
        <BentoGrid />
        <HeroSection />
        <div id="digitalizare-section">
          <DigitalizareIMMContent />
        </div>
        <LoginPortalSection />
        <ServicesSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTAFooter />
      </div>
    </LanguageProvider>
  );
}