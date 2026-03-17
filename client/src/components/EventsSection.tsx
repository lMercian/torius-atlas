/*
 * TORIUS ATLAS – Events Section
 * Design: Editorial Luxury – dark cards with red status badges
 * Real event data from Atlas app screenshots
 * Curated by Nilufer Satorius
 */

import { useEffect, useRef, useState } from "react";
import { MapPin, Calendar, DollarSign, Users, Tag, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

const CITIES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663411017551/DhCkdXWiKSny2JihDNgmoE/cities-bg-dDDuGTuyjH4dC8mTu2NPh7.webp";

interface Event {
  id: string;
  name: string;
  city: string;
  state: string;
  venue: string;
  address: string;
  dates: string;
  status: "Open for Applications" | "Coming Soon" | "Sold Out";
  boothFee: string;
  vendorSpots: string;
  expectedAttendance: string;
  description: string;
  highlights: string[];
  categories: string[];
}

const events: Event[] = [
  {
    id: "los-angeles",
    name: "Atlas Los Angeles",
    city: "Los Angeles",
    state: "CA",
    venue: "The Reef, Los Angeles",
    address: "The Reef, Los Angeles, California",
    dates: "Jun 5 – Jun 7, 2026",
    status: "Coming Soon",
    boothFee: "$1,050",
    vendorSpots: "40 available",
    expectedAttendance: "12,000",
    description:
      "Atlas arrives in Los Angeles — bringing the finest Turkish brands to the city of style. From hand-loomed textiles to luxury leather goods, experience an unparalleled edit of Turkish creativity.",
    highlights: ["Sunset Venue", "Brand Networking", "Styling Sessions", "Craft Demonstrations", "VIP Reception"],
    categories: ["fashion", "jewelry", "leather goods", "textiles", "accessories"],
  },
  {
    id: "houston",
    name: "Atlas Houston — Opening Edition",
    city: "Houston",
    state: "TX",
    venue: "POST Houston",
    address: "POST Houston, Houston, Texas",
    dates: "Apr 23 – Apr 25, 2026",
    status: "Open for Applications",
    boothFee: "$850",
    vendorSpots: "35 available",
    expectedAttendance: "9,000",
    description:
      "The inaugural Atlas pop-up experience lands in Houston, Texas. Discover an exclusive curation of Turkish fashion, jewelry, ceramics, and design brands — all under one roof. A celebration of craft, culture, and style.",
    highlights: ["Opening Ceremony", "Live Music", "Turkish Coffee Bar", "Meet the Makers", "Styling Sessions"],
    categories: ["fashion", "jewelry", "ceramics", "accessories", "leather goods"],
  },
  {
    id: "miami",
    name: "Atlas Miami — Luxury Edition",
    city: "Miami",
    state: "FL",
    venue: "3300 Collins Ave",
    address: "3300 Collins Ave, Miami Beach, FL 33140",
    dates: "Jun 2026",
    status: "Open for Applications",
    boothFee: "$1,200",
    vendorSpots: "28 available",
    expectedAttendance: "7,000",
    description:
      "Atlas arrives on the shores of Miami Beach. A luxury pop-up experience blending Turkish craftsmanship with Miami's vibrant fashion scene — waterfront venue, sunset receptions, and curated brand showcases.",
    highlights: ["Waterfront Venue", "Sunset Cocktail Reception", "Fashion Preview", "Luxury Lounge", "Private Styling"],
    categories: ["fashion", "jewelry", "skincare", "accessories", "leather goods"],
  },
  {
    id: "new-york",
    name: "Atlas New York — Flagship Edition",
    city: "New York",
    state: "NY",
    venue: "Industry City, Brooklyn",
    address: "220 36th St, Brooklyn, NY 11232",
    dates: "Sep 2026",
    status: "Coming Soon",
    boothFee: "$1,100",
    vendorSpots: "50 available",
    expectedAttendance: "15,000",
    description:
      "The flagship Atlas experience comes to New York City. Set in Brooklyn's iconic Industry City, this is the largest Atlas event to date — bringing together the finest Turkish brands for America's most discerning fashion audience.",
    highlights: ["Fashion Preview Night", "Buyer Meetings", "Press & Media Day", "Live Artisans", "Craft Workshops"],
    categories: ["fashion", "jewelry", "textiles", "home decor", "ceramics"],
  },
  {
    id: "chicago",
    name: "Atlas Chicago",
    city: "Chicago",
    state: "IL",
    venue: "Navy Pier Festival Hall",
    address: "600 E Grand Ave, Chicago, IL 60611",
    dates: "Nov 12 – Nov 14, 2026",
    status: "Coming Soon",
    boothFee: "$850",
    vendorSpots: "35 available",
    expectedAttendance: "9,000",
    description:
      "The Windy City welcomes Atlas. A curated Turkish brand experience set against Chicago's iconic architecture — where timeless craft meets modern design.",
    highlights: ["Waterfront Venue", "Cooking Demonstrations", "Craft Workshops", "Live Artisans", "Brand Networking"],
    categories: ["ceramics", "textiles", "food & beverage", "home decor", "jewelry"],
  },
];

const statusColors: Record<Event["status"], { bg: string; text: string; dot: string }> = {
  "Open for Applications": {
    bg: "rgba(16, 185, 129, 0.12)",
    text: "rgb(16, 185, 129)",
    dot: "rgb(16, 185, 129)",
  },
  "Coming Soon": {
    bg: "rgba(99, 102, 241, 0.12)",
    text: "rgb(129, 140, 248)",
    dot: "rgb(129, 140, 248)",
  },
  "Sold Out": {
    bg: "rgba(239, 68, 68, 0.12)",
    text: "rgb(239, 68, 68)",
    dot: "rgb(239, 68, 68)",
  },
};

function EventCard({ event, index, visible }: { event: Event; index: number; visible: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const sc = statusColors[event.status];

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="border border-white/10 overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${0.1 + index * 0.1}s, transform 0.7s ease ${0.1 + index * 0.1}s`,
      }}
    >
      {/* Card header */}
      <div className="p-6 lg:p-8 bg-[#111111]">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span
              className="font-display text-4xl text-white/08 leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs tracking-[0.3em] uppercase font-ui"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.42 0.22 25)" }}
                >
                  {event.city}, {event.state}
                </span>
              </div>
              <h3
                className="font-display text-xl lg:text-2xl text-white leading-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
              >
                {event.name}
              </h3>
            </div>
          </div>
          {/* Status badge */}
          <span
            className="shrink-0 px-3 py-1 text-xs font-ui tracking-wide rounded-full flex items-center gap-1.5"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              backgroundColor: sc.bg,
              color: sc.text,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sc.dot }} />
            {event.status}
          </span>
        </div>

        {/* Date & Venue */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2 text-white/50 text-sm font-ui" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <Calendar size={13} />
            <span>{event.dates}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-sm font-ui" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <MapPin size={13} />
            <span>{event.address}</span>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { icon: <DollarSign size={13} />, label: "Booth Fee", value: event.boothFee },
            { icon: <Users size={13} />, label: "Vendor Spots", value: event.vendorSpots },
            { icon: <Users size={13} />, label: "Expected Attendance", value: event.expectedAttendance },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/04 px-3 py-3 rounded-sm">
              <div className="flex items-center gap-1.5 text-white/30 text-xs font-ui mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {stat.icon}
                <span>{stat.label}</span>
              </div>
              <div
                className="font-display text-lg text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p
          className="text-white/50 text-sm leading-relaxed font-ui mb-5"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
        >
          {event.description}
        </p>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-ui text-white/40 hover:text-white/70 transition-colors duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {expanded ? "Hide Details" : "View Details"}
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-white/08 bg-[#0D0D0D] p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Highlights */}
          <div>
            <h4
              className="font-display text-base text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em" }}
            >
              Event Highlights
            </h4>
            <ul className="space-y-2">
              {event.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3">
                  <CheckCircle2 size={14} style={{ color: "rgb(16, 185, 129)", flexShrink: 0 }} />
                  <span className="text-white/60 text-sm font-ui" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4
              className="font-display text-base text-white mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em" }}
            >
              Categories Wanted
            </h4>
            <div className="flex flex-wrap gap-2">
              {event.categories.map((cat) => (
                <span
                  key={cat}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-ui rounded-sm"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: "rgba(201, 160, 76, 0.1)",
                    color: "rgb(201, 160, 76)",
                    border: "1px solid rgba(201, 160, 76, 0.2)",
                  }}
                >
                  <Tag size={10} />
                  {cat}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-6">
              {event.status === "Open for Applications" ? (
                <button
                  onClick={scrollToContact}
                  className="px-6 py-3 text-white text-xs font-ui tracking-widest uppercase transition-colors duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.15em",
                    backgroundColor: "oklch(0.42 0.22 25)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#a50d25")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "oklch(0.42 0.22 25)")}
                >
                  Apply for This Event
                </button>
              ) : (
                <button
                  onClick={scrollToContact}
                  className="px-6 py-3 text-white/60 text-xs font-ui tracking-widest uppercase border border-white/20 hover:border-white/40 transition-colors duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.15em" }}
                >
                  Join Waitlist
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EventsSection() {
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
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="events" ref={ref} className="overflow-hidden">
      {/* Header banner */}
      <div className="relative bg-[#0A0A0A] py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={CITIES_BG}
            alt="American cities"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 to-[#0A0A0A]" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div
            className="flex items-center gap-4 mb-6"
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
              On Tour · 2026
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
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
                POP-UP
                <br />
                <span style={{ color: "oklch(0.42 0.22 25)" }}>EVENTS</span>
              </h2>
            </div>
            <div
              className="lg:max-w-sm"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
              }}
            >
              <p
                className="text-white/45 text-sm leading-relaxed font-serif-body mb-3"
                style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 300 }}
              >
                Atlas pop-up experiences happening across the United States. Find your city and apply for a vendor spot.
              </p>
              <p
                className="text-xs tracking-[0.3em] uppercase font-ui"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.42 0.22 25)" }}
              >
                Curated by Nilufer Satorius
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Events list */}
      <div className="bg-[#0A0A0A] pb-20 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} visible={visible} />
            ))}
          </div>

          {/* Bottom note */}
          <div
            className="mt-12 flex items-center gap-4"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.8s ease 0.8s",
            }}
          >
            <span className="w-8 h-px" style={{ backgroundColor: "oklch(0.42 0.22 25)" }} />
            <p
              className="text-white/30 text-sm font-ui"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
            >
              More cities being announced throughout 2026 — Seattle, Washington DC, Los Angeles, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
