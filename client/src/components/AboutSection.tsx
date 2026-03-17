/*
 * TORIUS ATLAS – About Section
 * Design: Asymmetric two-column layout, editorial typography
 * Left: Large display text + body copy | Right: Craftsmanship image
 */

import { useEffect, useRef, useState } from "react";

const ABOUT_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663411017551/DhCkdXWiKSny2JihDNgmoE/about-section-C29PXxtajap6joLTFzjm22.webp";
const ISTANBUL_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663411017551/DhCkdXWiKSny2JihDNgmoE/istanbul-bridge-A3AKv53DT5HyTokTQc7RHc.webp";

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="bg-[#FAFAFA] py-24 lg:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Section label */}
        <div
          className="flex items-center gap-4 mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span
            className="w-12 h-px"
            style={{ backgroundColor: "oklch(0.42 0.22 25)" }}
          />
          <span
            className="text-xs tracking-[0.4em] uppercase font-ui text-[#8A8A8A]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Our Mission
          </span>
        </div>

        {/* Main layout: asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
          
          {/* Left: Text content */}
          <div className="lg:col-span-6 lg:pr-16">
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
              }}
            >
              <h2
                className="font-display text-[clamp(3.5rem,7vw,7rem)] leading-none text-[#0A0A0A] mb-8"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
              >
                BRIDGING
                <br />
                <span style={{ color: "oklch(0.42 0.22 25)" }}>TURKISH</span>
                <br />
                CREATIVITY
              </h2>
            </div>

            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
              }}
            >
              <p
                className="text-[#0A0A0A]/70 text-lg leading-relaxed mb-6 font-serif-body"
                style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 300 }}
              >
                Torius Atlas is a market expansion platform designed to introduce 
                and grow Turkish fashion, lifestyle, and accessory brands in the 
                United States through curated pop-up retail experiences across 
                key American cities.
              </p>
              <p
                className="text-[#0A0A0A]/60 text-base leading-relaxed mb-10 font-serif-body"
                style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 300 }}
              >
                Our mission is to bridge Turkish creativity with the U.S. consumer 
                market, giving emerging and established brands a unique opportunity 
                to showcase their products, build brand awareness, and test new 
                markets without the high cost of permanent retail locations.
              </p>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-6 pt-8 border-t border-[#0A0A0A]/10"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
              }}
            >
              {[
                { number: "10+", label: "U.S. Markets" },
                { number: "100%", label: "Turkish Brands" },
                { number: "2025", label: "Launch Year" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-display text-4xl lg:text-5xl text-[#0A0A0A] mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-xs tracking-[0.2em] uppercase text-[#8A8A8A] font-ui"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Images stacked */}
          <div className="lg:col-span-6 relative pb-8">
            <div
              className="relative"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(50px)",
                transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
              }}
            >
              {/* Main image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                <img
                  src={ABOUT_IMAGE}
                  alt="Turkish craftsmanship and textiles"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                {/* Red accent overlay strip */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: "oklch(0.42 0.22 25)" }}
                />
              </div>

              {/* Floating secondary image */}
              <div
                className="absolute -bottom-6 -left-6 w-2/5 overflow-hidden border-4 border-[#FAFAFA] shadow-xl"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={ISTANBUL_IMAGE}
                  alt="Istanbul – the bridge between two worlds"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption */}
              <div
                className="absolute top-6 right-6 bg-[#0A0A0A]/80 backdrop-blur-sm px-4 py-3"
              >
                <p
                  className="text-white/80 text-xs tracking-[0.2em] uppercase font-ui"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Est. Istanbul
                </p>
                <p
                  className="font-display text-white text-2xl"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                >
                  2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
