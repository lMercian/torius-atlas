/*
 * TORIUS ATLAS – What We Do Section
 * Design: Dark background, editorial grid of services
 * Alternating red accent lines and large numbers
 */

import { useEffect, useRef, useState } from "react";

const BRAND_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663411017551/DhCkdXWiKSny2JihDNgmoE/WhatsAppImage2026-03-09at10.57.26AM_6181cb1f.jpeg";

const services = [
  {
    number: "01",
    title: "CURATED POP-UP EVENTS",
    description:
      "We organize premium pop-up retail markets across major U.S. cities, creating high-end shopping experiences that highlight the quality, design, and craftsmanship of Turkish brands.",
  },
  {
    number: "02",
    title: "DIRECT MARKET ACCESS",
    description:
      "Turkish brands gain direct exposure to American consumers, buyers, and industry professionals without the overhead of permanent retail locations.",
  },
  {
    number: "03",
    title: "BRAND VISIBILITY",
    description:
      "Through curated fashion and lifestyle events, your brand is positioned alongside other premium Turkish labels in a context that elevates perception and drives discovery.",
  },
  {
    number: "04",
    title: "MARKET TESTING",
    description:
      "Test your products in the U.S. market before committing to permanent expansion. Gather real consumer data and feedback in a low-risk environment.",
  },
  {
    number: "05",
    title: "INDUSTRY NETWORKING",
    description:
      "Connect with buyers, influencers, press, and industry partners at every event. Build relationships that open doors to long-term U.S. market opportunities.",
  },
  {
    number: "06",
    title: "GLOBAL GROWTH PLATFORM",
    description:
      "A professional launchpad for international expansion — helping you maintain your unique identity while scaling your brand to a global audience.",
  },
];

export default function WhatWeDoSection() {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="what-we-do" ref={ref} className="bg-[#0A0A0A] py-24 lg:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
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
                Our Services
              </span>
            </div>
            <h2
              className="font-display text-[clamp(3rem,6vw,6.5rem)] leading-none text-white"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.03em",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
              }}
            >
              WHAT WE
              <br />
              <span style={{ color: "oklch(0.42 0.22 25)" }}>DO</span>
            </h2>
          </div>
          <div
            className="lg:col-span-5 lg:flex lg:items-end"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            <p
              className="text-white/50 text-base leading-relaxed font-serif-body"
              style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 300 }}
            >
              Through exclusive pop-up events, Torius Atlas provides a premium 
              environment where brands can present clothing, accessories, and 
              lifestyle products directly to American customers.
            </p>
          </div>
        </div>

        {/* Services grid + image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Services list */}
          <div className="lg:col-span-7">
            {services.map((service, i) => (
              <div
                key={service.number}
                className="group border-t border-white/10 py-8 flex gap-6 hover:border-white/30 transition-colors duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-20px)",
                  transition: `opacity 0.7s ease ${0.1 + i * 0.08}s, transform 0.7s ease ${0.1 + i * 0.08}s`,
                }}
              >
                <span
                  className="font-display text-5xl text-white/10 group-hover:text-turkish-red transition-colors duration-300 shrink-0 leading-none"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: "rgba(255,255,255,0.08)",
                  }}
                >
                  {service.number}
                </span>
                <div>
                  <h3
                className="font-display text-xl lg:text-2xl mb-3 transition-colors duration-300"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em", color: 'white' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-white/50 text-sm leading-relaxed font-ui"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sticky image */}
          <div
            className="lg:col-span-5"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
            }}
          >
            <div className="lg:sticky lg:top-24">
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img
                  src={BRAND_IMAGE}
                  alt="Turkish brand showcase"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p
                    className="font-display text-3xl text-white mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                  >
                    PREMIUM EXPERIENCE
                  </p>
                  <p
                    className="text-white/60 text-xs tracking-[0.2em] uppercase font-ui"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Curated retail environments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
