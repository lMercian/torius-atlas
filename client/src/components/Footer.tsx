/*
 * TORIUS ATLAS – Footer
 * Design: Dark editorial footer with logo, links, social media, and contact info
 * Curated by Nilufer Satorius
 */

import { Instagram, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "What We Do", href: "#what-we-do" },
    { label: "Locations", href: "#locations" },
    { label: "For Brands", href: "#for-brands" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/08 py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

          {/* Logo + tagline + social */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <div
                className="font-display text-3xl text-white tracking-widest"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.15em" }}
              >
                TORIUS
              </div>
              <div
                className="font-display text-sm tracking-[0.35em] -mt-1"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: "0.35em",
                  color: "oklch(0.42 0.22 25)",
                }}
              >
                ATLAS
              </div>
            </div>
            <p
              className="text-white/40 text-sm leading-relaxed font-ui max-w-xs mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              Bringing Turkish fashion, lifestyle, and accessory brands to the
              American market through curated pop-up retail experiences.
            </p>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.42 0.22 25)", opacity: 0.7 }}
            >
              Curated by Nilufer Satorius
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/toriusatlas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/15 hover:border-white/40 hover:bg-white/05 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={14} className="text-white/50" />
              </a>
              <a
                href="https://linkedin.com/company/toriusatlas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/15 hover:border-white/40 hover:bg-white/05 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={14} className="text-white/50" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h4
              className="font-display text-sm text-white/30 tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/50 hover:text-white text-sm font-ui tracking-wide transition-colors duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-4 lg:col-start-9">
            <h4
              className="font-display text-sm text-white/30 tracking-[0.3em] uppercase mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Contact
            </h4>
            <div className="space-y-3 mb-8">
              <a
                href="mailto:info@toriusatlas.com"
                className="flex items-center gap-3 group"
              >
                <Mail size={13} className="text-white/30 group-hover:text-white/60 transition-colors" />
                <span
                  className="text-white/50 group-hover:text-white text-sm font-ui transition-colors duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  info@toriusatlas.com
                </span>
              </a>
              <a
                href="tel:+13468234535"
                className="flex items-center gap-3 group"
              >
                <Phone size={13} className="text-white/30 group-hover:text-white/60 transition-colors" />
                <span
                  className="text-white/50 group-hover:text-white text-sm font-ui transition-colors duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  +1 346 823 4535
                </span>
              </a>
            </div>

            <div>
              <h4
                className="font-display text-sm text-white/30 tracking-[0.3em] uppercase mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                2026 Tour Cities
              </h4>
              <p
                className="text-white/40 text-xs font-ui leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
              >
                Houston · Miami · New York · Chicago · Washington DC · Los Angeles ·
                Seattle · Arizona · North Carolina · South Carolina
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/08 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p
            className="text-white/25 text-xs font-ui tracking-wide"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            © 2026 Torius Atlas. All rights reserved.
          </p>
          <p
            className="text-white/20 text-xs font-ui tracking-widest uppercase"
            style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2em" }}
          >
            Turkish Brands · American Markets
          </p>
        </div>
      </div>
    </footer>
  );
}
