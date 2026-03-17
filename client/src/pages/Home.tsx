/*
 * TORIUS ATLAS – Home Page
 * Design: Editorial Luxury – High-Fashion editorial aesthetic
 * Sections: Hero → About → What We Do → Events → Gallery → Locations → For Brands → Vision → Contact → Footer
 */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import LocationsSection from "@/components/LocationsSection";
import ForBrandsSection from "@/components/ForBrandsSection";
import VisionSection from "@/components/VisionSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WhatWeDoSection />
      <EventsSection />
      <GallerySection />
      <LocationsSection />
      <ForBrandsSection />
      <VisionSection />
      <ContactSection />
      <Footer />
      </div>
    </>
  );
}
