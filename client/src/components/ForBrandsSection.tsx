/*
 * TORIUS ATLAS – For Brands Section
 * Design: White background, editorial opportunity cards with red accents
 * Large numbered list with visual hierarchy
 */

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const opportunities = [
  {
    number: "01",
    title: "Pop-Up Retail Opportunities",
    description:
      "Secure a curated space in major U.S. markets. Each pop-up is designed to maximize visibility and sales, with professional display setups tailored to your brand.",
  },
  {
    number: "02",
    title: "Direct Consumer Exposure",
    description:
      "Meet American consumers face-to-face. Understand their preferences, gather feedback, and build a loyal customer base from the ground up.",
  },
  {
    number: "03",
    title: "Curated Brand Visibility",
    description:
      "Be featured in premium fashion and lifestyle events alongside other distinguished Turkish brands, creating a powerful collective presence.",
  },
  {
    number: "04",
    title: "Low-Risk Market Testing",
    description:
      "Validate your products and pricing in the U.S. market before investing in permanent retail. Reduce risk while gaining invaluable market intelligence.",
  },
  {
    number: "05",
    title: "Industry Networking",
    description:
      "Connect with American buyers, influencers, stylists, and media professionals who can amplify your brand's reach and open new distribution channels.",
  },
  {
    number: "06",
    title: "International Growth Platform",
    description:
      "A professional, structured pathway for global expansion. We handle the logistics, marketing, and venue — you focus on your brand.",
  },
];

export default function ForBrandsSection() {
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

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="for-brands" ref={ref} className="bg-[#FAFAFA] py-24 lg:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-8">
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
                className="text-xs tracking-[0.4em] uppercase font-ui text-[#8A8A8A]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Brand Opportunities
              </span>
            </div>
            <h2
              className="font-display text-[clamp(3rem,6vw,6.5rem)] leading-none text-[#0A0A0A]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.03em",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
              }}
            >
              OPPORTUNITIES
              <br />
              FOR
              <span style={{ color: "oklch(0.42 0.22 25)" }}> BRANDS</span>
            </h2>
          </div>
          <div
            className="lg:col-span-4 lg:flex lg:items-end"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            <div>
              <p
                className="text-[#0A0A0A]/60 text-base leading-relaxed mb-6 font-serif-body"
                style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 300 }}
              >
                Brands that join Torius Atlas gain access to a comprehensive 
                suite of market expansion tools and opportunities.
              </p>
              <button
                onClick={scrollToContact}
                className="group flex items-center gap-3 text-sm tracking-widest uppercase font-ui hover:gap-5 transition-all duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "0.15em",
                  color: "oklch(0.42 0.22 25)",
                }}
              >
                Apply Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Opportunities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {opportunities.map((opp, i) => (
            <div
              key={opp.number}
              className="group border border-[#0A0A0A]/10 p-8 lg:p-10 hover:bg-[#0A0A0A] transition-all duration-300 relative overflow-hidden"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.7s ease ${0.1 + i * 0.07}s, transform 0.7s ease ${0.1 + i * 0.07}s`,
              }}
            >
              {/* Red accent line on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                style={{ backgroundColor: "oklch(0.42 0.22 25)" }}
              />

              <span
                className="font-display text-6xl text-[#0A0A0A]/06 group-hover:text-white/05 transition-colors duration-300 block mb-4 leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {opp.number}
              </span>
              <h3
                className="font-display text-xl lg:text-2xl text-[#0A0A0A] group-hover:text-white transition-colors duration-300 mb-4 leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
              >
                {opp.title}
              </h3>
              <p
                className="text-[#0A0A0A]/55 group-hover:text-white/50 transition-colors duration-300 text-sm leading-relaxed font-ui"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                {opp.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className="mt-16 bg-[#0A0A0A] p-10 lg:p-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s",
          }}
        >
          <div>
            <h3
              className="font-display text-3xl lg:text-5xl text-white mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
            >
              READY TO ENTER THE
              <span style={{ color: "oklch(0.42 0.22 25)" }}> U.S. MARKET?</span>
            </h3>
            <p
              className="text-white/50 text-base font-serif-body"
              style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 300 }}
            >
              Join the growing community of Turkish brands expanding globally.
            </p>
          </div>
          <button
            onClick={scrollToContact}
            className="shrink-0 px-10 py-4 text-white font-ui text-sm tracking-widest uppercase transition-colors duration-200"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.15em",
              backgroundColor: "oklch(0.42 0.22 25)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a50d25')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'oklch(0.42 0.22 25)')}
          >
            Apply as a Brand
          </button>
        </div>
      </div>
    </section>
  );
}
