/*
 * TORIUS ATLAS – Gallery & Testimonials Section
 * Design: Editorial Luxury – masonry-style photo grid + quote carousel
 * Shows past successful pop-up events with attendee testimonials
 */

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const galleryImages = [
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411017551/DhCkdXWiKSny2JihDNgmoE/modern-popup-store-RThka6EvEZxAKQXHpVLLrR.webp",
    caption: "Turkish Design Collective Pop-Up Store",
    event: "Modern Retail Experience",
    span: "row-span-2",
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411017551/DhCkdXWiKSny2JihDNgmoE/gallery-1-gkCKie3RCw7BMG7TP2uwvg.webp",
    caption: "Atlas New York — Brooklyn Navy Yard",
    event: "November 2024",
    span: "",
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411017551/DhCkdXWiKSny2JihDNgmoE/gallery-2-7bvpxthkX7vAB2T7oXq9PF.webp",
    caption: "Jewelry & Accessories Showcase",
    event: "Atlas Miami 2024",
    span: "",
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411017551/DhCkdXWiKSny2JihDNgmoE/gallery-5-ncXGoqGDc65yPzczFnbLhJ.webp",
    caption: "Closing Night Reception",
    event: "Atlas Chicago 2024",
    span: "",
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411017551/DhCkdXWiKSny2JihDNgmoE/gallery-3-XP6LKfUS7nx8MAVzZCXRC4.webp",
    caption: "Fashion & Textile Market",
    event: "Atlas New York 2024",
    span: "col-span-2",
  },
  {
    url: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411017551/DhCkdXWiKSny2JihDNgmoE/gallery-4-5edj3G65wjzdSxP2D6La9q.webp",
    caption: "Brand Presentation & Buyer Meetings",
    event: "Atlas Houston 2024",
    span: "",
  },
];

const testimonials = [
  {
    quote:
      "Torius Atlas gave us the opportunity to introduce our brand to American consumers in a way we could never have done on our own. The event was beautifully curated and the foot traffic was incredible.",
    name: "Ayşe Kaya",
    title: "Founder, Kaya Ceramics",
    city: "Istanbul, Turkey",
    initials: "AK",
  },
  {
    quote:
      "I attended the New York event and discovered so many incredible Turkish designers I had never heard of. The quality of the products was outstanding — I left with a full shopping bag and a new appreciation for Turkish craftsmanship.",
    name: "Sarah Mitchell",
    title: "Fashion Buyer",
    city: "New York, USA",
    initials: "SM",
  },
  {
    quote:
      "As a brand looking to expand into the U.S. market, Atlas was the perfect launchpad. We connected with buyers, influencers, and real customers all in one weekend. The ROI was exceptional.",
    name: "Mehmet Demir",
    title: "CEO, Demir Leather",
    city: "Ankara, Turkey",
    initials: "MD",
  },
  {
    quote:
      "The curation at Atlas events is unlike anything else. Every brand feels intentional and the overall experience is premium. I've been to three Atlas events now and each one gets better.",
    name: "Jessica Torres",
    title: "Lifestyle Influencer",
    city: "Miami, USA",
    initials: "JT",
  },
  {
    quote:
      "We sold out of our entire collection on the first day of the Houston event. The American audience was so receptive to our designs. Atlas truly understands how to bridge cultures through commerce.",
    name: "Zeynep Arslan",
    title: "Designer, Arslan Textiles",
    city: "Izmir, Turkey",
    initials: "ZA",
  },
];

export default function GallerySection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const prev = () =>
    setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () =>
    setActiveTestimonial((p) => (p + 1) % testimonials.length);

  return (
    <section id="gallery" className="bg-[#FAFAFA] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="mb-16 lg:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-[#C8102E]" />
            <span
              className="text-xs tracking-[0.35em] uppercase text-[#C8102E]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
            >
              Past Events
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-5xl lg:text-7xl font-display text-[#0A0A0A] leading-none tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
              Moments from
              <br />
              <span className="italic font-normal">the Tour</span>
            </h2>
            <p
              className="text-[#555] text-base lg:text-lg max-w-sm leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              A look inside our curated pop-up experiences across the United States — where Turkish creativity meets American audiences.
            </p>
          </div>
        </div>

        {/* Masonry-style Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-24 lg:mb-32">
          {/* Large image — spans 2 rows on desktop */}
          <div
            className="relative overflow-hidden group cursor-pointer lg:row-span-2"
            onMouseEnter={() => setHoveredImage(0)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <img
              src={galleryImages[0].url}
              alt={galleryImages[0].caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ minHeight: "280px", maxHeight: "600px" }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
                hoveredImage === 0 ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-300 ${
                hoveredImage === 0 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <p
                className="text-white text-sm font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {galleryImages[0].caption}
              </p>
              <p
                className="text-white/60 text-xs mt-1"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {galleryImages[0].event}
              </p>
            </div>
          </div>

          {/* Top-right images */}
          {[1, 2].map((idx) => (
            <div
              key={idx}
              className="relative overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredImage(idx)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img
                src={galleryImages[idx].url}
                alt={galleryImages[idx].caption}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ height: "280px" }}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
                  hoveredImage === idx ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
                  hoveredImage === idx ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <p
                  className="text-white text-sm font-medium"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {galleryImages[idx].caption}
                </p>
                <p
                  className="text-white/60 text-xs mt-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {galleryImages[idx].event}
                </p>
              </div>
            </div>
          ))}

          {/* Wide bottom image */}
          <div
            className="relative overflow-hidden group cursor-pointer col-span-2"
            onMouseEnter={() => setHoveredImage(3)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <img
              src={galleryImages[3].url}
              alt={galleryImages[3].caption}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ height: "280px" }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
                hoveredImage === 3 ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-300 ${
                hoveredImage === 3 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <p
                className="text-white text-sm font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {galleryImages[3].caption}
              </p>
              <p
                className="text-white/60 text-xs mt-0.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {galleryImages[3].event}
              </p>
            </div>
          </div>

          {/* Last image */}
          <div
            className="relative overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredImage(4)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <img
              src={galleryImages[4].url}
              alt={galleryImages[4].caption}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ height: "280px" }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
                hoveredImage === 4 ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
                hoveredImage === 4 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <p
                className="text-white text-sm font-medium"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {galleryImages[4].caption}
              </p>
              <p
                className="text-white/60 text-xs mt-0.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {galleryImages[4].event}
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="border-t border-[#E8E8E8] pt-20 lg:pt-24">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-8 h-px bg-[#C8102E]" />
            <span
              className="text-xs tracking-[0.35em] uppercase text-[#C8102E]"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
            >
              What They Say
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Quote */}
            <div className="lg:col-span-8">
              <Quote
                size={40}
                className="mb-8"
                style={{ color: "oklch(0.42 0.22 25)", opacity: 0.3 }}
              />
              <blockquote
                className="text-2xl lg:text-3xl text-[#0A0A0A] leading-relaxed mb-8 transition-all duration-500"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center text-white text-sm font-bold"
                  style={{
                    backgroundColor: "oklch(0.42 0.22 25)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {testimonials[activeTestimonial].initials}
                </div>
                <div>
                  <p
                    className="text-[#0A0A0A] font-semibold text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {testimonials[activeTestimonial].name}
                  </p>
                  <p
                    className="text-[#888] text-xs mt-0.5"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {testimonials[activeTestimonial].title} · {testimonials[activeTestimonial].city}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation + dots */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full">
              {/* Testimonial list */}
              <div className="space-y-3 mb-8">
                {testimonials.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-full text-left px-4 py-3 border transition-all duration-200 ${
                      i === activeTestimonial
                        ? "border-[#C8102E] bg-[#C8102E]/05"
                        : "border-[#E8E8E8] hover:border-[#C8102E]/40"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium transition-colors ${
                        i === activeTestimonial ? "text-[#0A0A0A]" : "text-[#888]"
                      }`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-xs text-[#AAA] mt-0.5"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {t.city}
                    </p>
                  </button>
                ))}
              </div>

              {/* Prev / Next */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="w-10 h-10 border border-[#E8E8E8] flex items-center justify-center hover:border-[#C8102E] hover:text-[#C8102E] transition-colors duration-200"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 border border-[#E8E8E8] flex items-center justify-center hover:border-[#C8102E] hover:text-[#C8102E] transition-colors duration-200"
                >
                  <ChevronRight size={16} />
                </button>
                <span
                  className="text-xs text-[#AAA] ml-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {activeTestimonial + 1} / {testimonials.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E8E8]">
          {[
            { value: "12+", label: "Successful Events" },
            { value: "200+", label: "Turkish Brands" },
            { value: "50K+", label: "Visitors Reached" },
            { value: "10", label: "U.S. Cities" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#FAFAFA] px-8 py-8 flex flex-col gap-2"
            >
              <span
                className="text-4xl lg:text-5xl font-display text-[#0A0A0A]"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.02em" }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs tracking-[0.2em] uppercase text-[#888]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
