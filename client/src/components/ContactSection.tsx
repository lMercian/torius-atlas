/*
 * TORIUS ATLAS – Contact Section
 * Design: Light warm background, editorial contact form
 * Clean form with red accent buttons
 */

import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle, Instagram, Linkedin, Mail, Phone, Globe, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function ContactSection() {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    email: "",
    website: "",
    category: "",
    message: "",
  });
  const ref = useRef<HTMLDivElement>(null);

  const submitApplication = trpc.applications.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (err) => {
      toast.error("Submission failed. Please try again.");
      console.error(err);
    },
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplication.mutate({
      brandName: form.brand,
      contactName: form.name,
      email: form.email,
      website: form.website || undefined,
      category: form.category || undefined,
      message: form.message || undefined,
    });
  };

  const inputClass =
    "w-full bg-transparent border-b border-[#0A0A0A]/20 py-3 text-[#0A0A0A] placeholder-[#8A8A8A] text-sm font-ui focus:outline-none focus:border-[#0A0A0A]/60 transition-colors duration-200";

  return (
    <section id="contact" ref={ref} className="bg-[#F0EBE3] py-24 lg:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Info */}
          <div className="lg:col-span-5">
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
                Get In Touch
              </span>
            </div>

            <h2
              className="font-display text-[clamp(3rem,5vw,5.5rem)] leading-none text-[#0A0A0A] mb-8"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.03em",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
              }}
            >
              APPLY AS
              <br />A{" "}
              <span style={{ color: "oklch(0.42 0.22 25)" }}>BRAND</span>
            </h2>

            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
              }}
            >
              <p
                className="text-[#0A0A0A]/65 text-base leading-relaxed mb-10 font-serif-body"
                style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 300 }}
              >
                Ready to bring your Turkish brand to the American market? 
                Fill out the form and our team will be in touch within 48 hours 
                to discuss your participation in upcoming Torius Atlas events.
              </p>

              <div className="space-y-6">
                {[
                  { label: "What We Look For", items: ["Established Turkish brands", "Emerging designers", "Fashion & lifestyle labels", "Accessory makers"] },
                  { label: "What Happens Next", items: ["48-hour response time", "Brand review & selection", "Event placement discussion", "Contract & logistics"] },
                ].map((block) => (
                  <div key={block.label}>
                    <h4
                      className="font-display text-lg text-[#0A0A0A] mb-3"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}
                    >
                      {block.label}
                    </h4>
                    <ul className="space-y-1.5">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: "oklch(0.42 0.22 25)" }}
                          />
                          <span
                            className="text-sm text-[#0A0A0A]/60 font-ui"
                            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-10 pt-8 border-t border-[#0A0A0A]/10">
                <h4
                  className="font-display text-lg text-[#0A0A0A] mb-5"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}
                >
                  Direct Contact
                </h4>
                <div className="space-y-3">
                  <a
                    href="mailto:info@toriusatlas.com"
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-sm"
                      style={{ backgroundColor: "oklch(0.42 0.22 25)", opacity: 0.9 }}
                    >
                      <Mail size={13} className="text-white" />
                    </div>
                    <span
                      className="text-sm text-[#0A0A0A]/60 group-hover:text-[#0A0A0A] transition-colors duration-200 font-ui"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      info@toriusatlas.com
                    </span>
                  </a>
                  <a
                    href="tel:+13468234535"
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-sm"
                      style={{ backgroundColor: "oklch(0.42 0.22 25)", opacity: 0.9 }}
                    >
                      <Phone size={13} className="text-white" />
                    </div>
                    <span
                      className="text-sm text-[#0A0A0A]/60 group-hover:text-[#0A0A0A] transition-colors duration-200 font-ui"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      +1 346 823 4535
                    </span>
                  </a>
                  <a
                    href="https://www.toriusatlas.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-sm"
                      style={{ backgroundColor: "oklch(0.42 0.22 25)", opacity: 0.9 }}
                    >
                      <Globe size={13} className="text-white" />
                    </div>
                    <span
                      className="text-sm text-[#0A0A0A]/60 group-hover:text-[#0A0A0A] transition-colors duration-200 font-ui"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      www.toriusatlas.com
                    </span>
                  </a>
                </div>

                {/* Social Media */}
                <div className="mt-6">
                  <p
                    className="text-xs tracking-[0.3em] uppercase text-[#8A8A8A] mb-3 font-ui"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Follow Us
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://instagram.com/toriusatlas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-[#0A0A0A]/15 hover:border-[#0A0A0A]/40 hover:bg-[#0A0A0A]/04 transition-all duration-200 group"
                    >
                      <Instagram size={13} className="text-[#0A0A0A]/50 group-hover:text-[#0A0A0A] transition-colors" />
                      <span
                        className="text-xs text-[#0A0A0A]/50 group-hover:text-[#0A0A0A] transition-colors font-ui"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        @toriusatlas
                      </span>
                    </a>
                    <a
                      href="https://linkedin.com/company/toriusatlas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-[#0A0A0A]/15 hover:border-[#0A0A0A]/40 hover:bg-[#0A0A0A]/04 transition-all duration-200 group"
                    >
                      <Linkedin size={13} className="text-[#0A0A0A]/50 group-hover:text-[#0A0A0A] transition-colors" />
                      <span
                        className="text-xs text-[#0A0A0A]/50 group-hover:text-[#0A0A0A] transition-colors font-ui"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Torius Atlas
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="lg:col-span-7"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <CheckCircle
                  size={48}
                  className="mb-6"
                  style={{ color: "oklch(0.42 0.22 25)" }}
                />
                <h3
                  className="font-display text-4xl text-[#0A0A0A] mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
                >
                  APPLICATION RECEIVED
                </h3>
                <p
                  className="text-[#0A0A0A]/60 text-base font-serif-body max-w-sm"
                  style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 300 }}
                >
                  Thank you for your interest. Our team will review your application 
                  and reach out within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      className="block text-xs tracking-[0.3em] uppercase text-[#8A8A8A] mb-2 font-ui"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                      className={inputClass}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs tracking-[0.3em] uppercase text-[#8A8A8A] mb-2 font-ui"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.brand}
                      onChange={(e) => setForm({ ...form, brand: e.target.value })}
                      placeholder="Your brand"
                      className={inputClass}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label
                      className="block text-xs tracking-[0.3em] uppercase text-[#8A8A8A] mb-2 font-ui"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className={inputClass}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs tracking-[0.3em] uppercase text-[#8A8A8A] mb-2 font-ui"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      Website / Instagram
                    </label>
                    <input
                      type="text"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      placeholder="www.yourbrand.com"
                      className={inputClass}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs tracking-[0.3em] uppercase text-[#8A8A8A] mb-2 font-ui"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Brand Category *
                  </label>
                  <select
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={`${inputClass} appearance-none`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="fashion">Fashion & Clothing</option>
                    <option value="accessories">Accessories & Jewelry</option>
                    <option value="lifestyle">Lifestyle & Home</option>
                    <option value="leather">Leather Goods & Bags</option>
                    <option value="textiles">Textiles & Fabrics</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-xs tracking-[0.3em] uppercase text-[#8A8A8A] mb-2 font-ui"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Tell Us About Your Brand
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Briefly describe your brand, products, and why you want to enter the U.S. market..."
                    className={`${inputClass} resize-none`}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitApplication.isPending}
                  className="group flex items-center gap-3 px-10 py-4 text-white font-ui text-sm tracking-widest uppercase transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.15em",
                    backgroundColor: '#0A0A0A',
                  }}
                  onMouseEnter={(e) => !submitApplication.isPending && (e.currentTarget.style.backgroundColor = 'oklch(0.42 0.22 25)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0A0A0A')}
                >
                  {submitApplication.isPending ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <Send
                        size={14}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
