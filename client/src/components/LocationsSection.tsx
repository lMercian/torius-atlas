/*
 * TORIUS ATLAS – Locations Section
 * Design: Light background, editorial city grid with red accents
 * Cities displayed as large typographic elements
 */

import { useEffect, useRef, useState } from "react";
import { MapPin } from "lucide-react";

const CITIES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663411017551/DhCkdXWiKSny2JihDNgmoE/cities-bg-dDDuGTuyjH4dC8mTu2NPh7.webp";

const cities = [
  { name: "NEW YORK", state: "NY", description: "Fashion capital of America" },
  { name: "WASHINGTON DC", state: "DC", description: "Political & cultural hub" },
  { name: "CHICAGO", state: "IL", description: "Midwest's premier market" },
  { name: "TEXAS", state: "TX", description: "Dallas, Houston & beyond" },
  { name: "FLORIDA", state: "FL", description: "Miami, Orlando & more" },
  { name: "CALIFORNIA", state: "CA", description: "LA & San Francisco" },
  { name: "ARIZONA", state: "AZ", description: "Phoenix & Scottsdale" },
  { name: "SEATTLE", state: "WA", description: "Pacific Northwest gateway" },
  { name: "NORTH CAROLINA", state: "NC", description: "Charlotte & Raleigh" },
  { name: "SOUTH CAROLINA", state: "SC", description: "Charleston & Columbia" },
];

export default function LocationsSection() {
  const [visible, setVisible] = useState(false);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="locations" ref={ref} className="overflow-hidden">
      {/* Top: Dark banner with city background */}
      <div className="relative bg-[#0A0A0A] py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={CITIES_BG}
            alt="American cities"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 to-[#0A0A0A]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div
            className="flex items-center gap-4 mb-8"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span className="w-12 h-px" style={{ backgroundColor: "oklch(0.42 0.22 25)" }} />
            <span
              className="text-xs tracking-[0.4em] uppercase font-ui text-white/40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Pop-Up Locations
            </span>
          </div>

          <h2
            className="font-display text-[clamp(3rem,6vw,6.5rem)] leading-none text-white mb-6"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: "0.03em",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
            }}
          >
            ACROSS
            <br />
            <span style={{ color: "oklch(0.42 0.22 25)" }}>AMERICA</span>
          </h2>

          <p
            className="max-w-lg text-white/50 text-base leading-relaxed font-serif-body mb-4"
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontWeight: 300,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            Torius Atlas organizes curated pop-up retail markets across 10 major 
            U.S. locations, each designed to create a high-end shopping experience 
            that showcases the finest Turkish brands.
          </p>
        </div>
      </div>

      {/* Cities grid */}
      <div className="bg-[#F0EBE3] py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0">
            {cities.map((city, i) => (
              <div
                key={city.name}
                className="group border border-[#0A0A0A]/10 p-6 lg:p-8 hover:bg-[#0A0A0A] transition-colors duration-300 cursor-default"
                onMouseEnter={() => setHoveredCity(city.name)}
                onMouseLeave={() => setHoveredCity(null)}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.6s ease ${0.05 + i * 0.05}s, transform 0.6s ease ${0.05 + i * 0.05}s`,
                }}
              >
                <div className="flex items-start gap-2 mb-3">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0 text-[#8A8A8A] group-hover:text-turkish-red transition-colors duration-300"
                    style={{ color: hoveredCity === city.name ? "oklch(0.42 0.22 25)" : "#8A8A8A" }}
                  />
                  <span
                    className="text-xs tracking-[0.3em] uppercase font-ui text-[#8A8A8A] group-hover:text-white/50 transition-colors duration-300"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {city.state}
                  </span>
                </div>
                <h3
                  className="font-display text-xl lg:text-2xl text-[#0A0A0A] group-hover:text-white transition-colors duration-300 leading-tight mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
                >
                  {city.name}
                </h3>
                <p
                  className="text-xs text-[#8A8A8A] group-hover:text-white/40 transition-colors duration-300 font-ui"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                >
                  {city.description}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div
            className="mt-12 flex items-center gap-6"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.8s ease 0.8s",
            }}
          >
            <span
              className="w-8 h-px"
              style={{ backgroundColor: "oklch(0.42 0.22 25)" }}
            />
            <p
              className="text-[#8A8A8A] text-sm font-ui"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              More locations being added for 2025 — stay tuned for announcements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
