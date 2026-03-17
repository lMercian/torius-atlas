/*
 * TORIUS ATLAS – Vision Section
 * Design: Full-width dark editorial quote section
 * Large italic Italiana font for the vision statement
 */

import { useEffect, useRef, useState } from "react";

export default function VisionSection() {
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
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#0A0A0A] py-24 lg:py-40 overflow-hidden relative">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.03) 40px,
            rgba(255,255,255,0.03) 41px
          )`,
        }}
      />

      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Label */}
          <div
            className="lg:col-span-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-20px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <div className="flex flex-col gap-3">
              <span
                className="w-px h-16 bg-turkish-red"
                style={{ backgroundColor: "oklch(0.42 0.22 25)" }}
              />
              <span
                className="text-xs tracking-[0.4em] uppercase font-ui text-white/30"
                style={{ fontFamily: "'DM Sans', sans-serif", writingMode: "vertical-rl" }}
              >
                Our Vision
              </span>
            </div>
          </div>

          {/* Center: Vision statement */}
          <div
            className="lg:col-span-8"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
            }}
          >
            <p
              className="font-accent text-[clamp(1.8rem,3.5vw,3.5rem)] leading-tight text-white italic mb-8"
              style={{ fontFamily: "'Italiana', serif" }}
            >
              "To become the leading gateway for Turkish brands entering the U.S. market, 
              creating a vibrant community of designers, creators, and entrepreneurs who 
              want to expand globally while maintaining their unique identity."
            </p>
            <div className="flex items-center gap-4">
              <span
                className="w-8 h-px"
                style={{ backgroundColor: "oklch(0.42 0.22 25)" }}
              />
              <span
                className="text-white/40 text-sm tracking-[0.2em] uppercase font-ui"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Torius Atlas — Mission Statement
              </span>
            </div>
          </div>

          {/* Right: Decorative */}
          <div
            className="lg:col-span-2 hidden lg:flex lg:justify-end"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.7s ease 0.5s",
            }}
          >
            <div
              className="font-display text-[8rem] leading-none text-white/04 select-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              TA
            </div>
          </div>
        </div>

        {/* Three pillars */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-20 border-t border-white/10 pt-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
          }}
        >
          {[
            {
              title: "TURKISH CREATIVITY",
              body: "Celebrating the rich heritage of Turkish design, craftsmanship, and innovation that has shaped global fashion for centuries.",
            },
            {
              title: "AMERICAN OPPORTUNITY",
              body: "The U.S. market represents the world's largest consumer economy — a destination where Turkish brands can achieve global recognition.",
            },
            {
              title: "GLOBAL IDENTITY",
              body: "Expansion without compromise. We help brands grow internationally while preserving the authentic identity that makes them unique.",
            },
          ].map((pillar, i) => (
            <div
              key={pillar.title}
              className="border-r border-white/10 last:border-r-0 px-8 first:pl-0 last:pr-0"
            >
              <div
                className="w-8 h-0.5 mb-6"
                style={{ backgroundColor: "oklch(0.42 0.22 25)" }}
              />
              <h3
                className="font-display text-xl text-white mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}
              >
                {pillar.title}
              </h3>
              <p
                className="text-white/45 text-sm leading-relaxed font-ui"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
