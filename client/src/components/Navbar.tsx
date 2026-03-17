/*
 * TORIUS ATLAS – Navbar Component
 * Design: Editorial Luxury – transparent → dark scroll transition
 * Typography: Bebas Neue for logo, DM Sans for nav links
 */

import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Events", href: "#events" },
    { label: "Gallery", href: "#gallery" },
    { label: "Shop", href: "/shop" },
    { label: "For Brands", href: "#for-brands" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A0A] border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex flex-col leading-none group"
            >
              <span
                className="font-display text-2xl lg:text-3xl text-white tracking-widest"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.15em" }}
              >
                TORIUS
              </span>
              <span
                className="font-display text-xs text-turkish-red tracking-[0.35em] -mt-1"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.35em", color: "oklch(0.42 0.22 25)" }}
              >
                ATLAS
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="font-ui text-sm text-white/70 hover:text-white tracking-widest uppercase transition-colors duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
                >
                  {link.label}
                </button>
              ))}
              {user && (
                <>
                  <button
                    onClick={() => scrollTo("/account")}
                    className="flex items-center gap-2 font-ui text-sm text-white/70 hover:text-white tracking-widest uppercase transition-colors duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
                  >
                    <User size={16} />
                    Hesabım
                  </button>
                  {user.role === "admin" && (
                    <button
                      onClick={() => scrollTo("/admin")}
                      className="font-ui text-sm text-white/70 hover:text-white tracking-widest uppercase transition-colors duration-200"
                      style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
                    >
                      Admin
                    </button>
                  )}
                </>
              )}
              <button
                onClick={() => scrollTo("#contact")}
                className="ml-4 px-6 py-2.5 text-white text-sm font-ui tracking-widest uppercase transition-colors duration-200"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em", backgroundColor: "oklch(0.42 0.22 25)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a50d25')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'oklch(0.42 0.22 25)')}
              >
                Apply Now
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0A0A0A] transition-all duration-500 flex flex-col justify-center px-8 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-8 mt-16">
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-left font-display text-5xl text-white hover:text-turkish-red transition-colors duration-200"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.05em",
                animationDelay: `${i * 0.05}s`,
                color: "white",
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="mt-4 self-start px-8 py-3 bg-turkish-red text-white font-ui tracking-widest uppercase text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: "oklch(0.42 0.22 25)" }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </>
  );
}
