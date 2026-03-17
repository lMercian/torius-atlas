/*
 * TORIUS ATLAS – Hero Section
 * Design: Full-screen editorial hero with large typography and asymmetric layout
 * Image: Turkish fashion pop-up event in American gallery space
 */

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663411017551/DhCkdXWiKSny2JihDNgmoE/fashion-runway-cpqzAb9ZkaPeiBMywEoKSP.webp";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollDown = () => {
    const el = document.querySelector("#about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <img
          src={HERO_IMAGE}
          alt="Torius Atlas – Turkish Fashion Pop-Up"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.45) contrast(1.1)" }}
          onLoad={() => setLoaded(true)}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-[#0A0A0A]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end min-h-screen max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 lg:pb-28">
        {/* Top label */}
        <div
          className="mb-6 flex items-center gap-4"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
          }}
        >
          <span
            className="text-xs tracking-[0.4em] uppercase text-white/50 font-ui"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Turkish Brands
          </span>
          <span className="w-8 h-px bg-turkish-red" style={{ backgroundColor: "oklch(0.42 0.22 25)" }} />
          <span
            className="text-xs tracking-[0.4em] uppercase text-white/50 font-ui"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            American Markets
          </span>
        </div>

        {/* Main headline */}
        <div className="overflow-hidden mb-2">
          <h1
            className="font-display text-[clamp(4rem,12vw,11rem)] leading-none text-white"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "0.03em",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(60px)",
              transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
            }}
          >
            BRINGING
          </h1>
        </div>
        <div className="overflow-hidden mb-2">
          <h1
            className="font-display text-[clamp(4rem,12vw,11rem)] leading-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "0.03em",
              color: "oklch(0.42 0.22 25)",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(60px)",
              transition: "opacity 0.9s ease 0.55s, transform 0.9s ease 0.55s",
            }}
          >
            TURKISH
          </h1>
        </div>
        <div className="overflow-hidden mb-8">
          <h1
            className="font-display text-[clamp(4rem,12vw,11rem)] leading-none text-white"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "0.03em",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(60px)",
              transition: "opacity 0.9s ease 0.7s, transform 0.9s ease 0.7s",
            }}
          >
            BRANDS
          </h1>
        </div>

        {/* Subtext + CTA */}
        <div
          className="flex flex-col gap-8"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.9s, transform 0.8s ease 0.9s",
          }}
        >
          <p
            className="max-w-sm text-white/55 text-base leading-relaxed font-serif-body"
            style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 300 }}
          >
            Curated pop-up retail experiences connecting Turkish fashion and lifestyle brands with the American consumer.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                const el = document.querySelector("#for-brands");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 text-white font-ui text-sm tracking-widest uppercase transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.15em", backgroundColor: "oklch(0.42 0.22 25)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a50d25')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'oklch(0.42 0.22 25)')}
            >
              Apply as a Brand
            </button>
            <button
              onClick={() => {
                const el = document.querySelector("#what-we-do");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 border border-white/30 text-white font-ui text-sm tracking-widest uppercase hover:border-white/70 transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.15em" }}
            >
              Discover More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 right-8 lg:right-12 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors duration-200"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease 1.2s",
        }}
      >
        <span
          className="text-xs tracking-[0.3em] uppercase font-ui"
          style={{ fontFamily: "'DM Sans', sans-serif", writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <ChevronDown size={16} className="animate-bounce" />
      </button>

      {/* Issue number – editorial detail */}
      <div
        className="absolute top-24 right-8 lg:right-12 z-10 text-white/20 font-display text-sm tracking-widest"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          writingMode: "vertical-rl",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease 1.0s",
        }}
      >
        TORIUS ATLAS — 2025
      </div>
    </section>
  );
}
