import { ChevronDown, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import CounterAnimation from "./CounterAnimation";

const stats = [
  { value: 130, suffix: "+", label: "Sessions" },
  { value: 5000, suffix: "+", label: "Youth Impacted" },
  { value: 5, suffix: "+", label: "Signature Programs" },
  { value: 3, suffix: "+", label: "Years Experience" },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark-alt to-brand-dark" />

      {/* Orange accent glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-brand-orange/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none" />

      {/* Content layout: text left, image right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 flex flex-col lg:flex-row items-center justify-between gap-8 min-h-screen">
        {/* Left: Text content */}
        <div className="flex-1 text-center lg:text-left max-w-2xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 border border-brand-orange/40 bg-brand-orange/10 text-brand-orange text-xs font-body font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-8"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 200ms, transform 0.7s ease 200ms",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
            India's Youngest Experiential Facilitator
          </div>

          {/* Main Headline */}
          <h1
            className="font-display text-[4.5rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[8rem] leading-none text-brand-light mb-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s ease 300ms, transform 0.7s ease 300ms",
            }}
          >
            <span className="text-gradient-orange">Ignite.</span>{" "}
            <span>Grow.</span> <span className="text-brand-gold">Lead.</span>
          </h1>

          {/* Sub-headline with highlighted name */}
          <p
            className="font-body text-lg md:text-2xl font-light text-brand-light/80 mb-4 tracking-wide"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 500ms, transform 0.7s ease 500ms",
            }}
          >
            <span className="text-brand-orange font-semibold">
              Jigar Chaudhary
            </span>{" "}
            — India's Boldest Youth Trainer &amp; Experiential Facilitator
          </p>

          {/* Supporting text */}
          <p
            className="font-body text-sm md:text-base text-brand-muted tracking-[0.15em] uppercase mb-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 650ms, transform 0.7s ease 650ms",
            }}
          >
            130+ Sessions &nbsp;|&nbsp; Real Transformations
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 mb-12"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 800ms, transform 0.7s ease 800ms",
            }}
          >
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={() => handleScroll("#contact")}
              className="font-body font-semibold bg-brand-orange text-white px-8 py-4 text-base tracking-wide hover:bg-brand-orange/90 hover:shadow-orange-glow transition-all duration-300 rounded-sm w-full sm:w-auto"
            >
              Book Jigar Now
            </button>
            <button
              type="button"
              data-ocid="hero.secondary_button"
              onClick={() => handleScroll("#programs")}
              className="font-body font-semibold border-2 border-brand-orange text-brand-orange px-8 py-4 text-base tracking-wide hover:bg-brand-orange/10 transition-all duration-300 rounded-sm w-full sm:w-auto"
            >
              Explore Programs
            </button>
            <a
              href="/#/register"
              data-ocid="hero.link"
              className="inline-flex items-center justify-center gap-2 font-body font-semibold border-2 border-brand-gold text-brand-gold px-8 py-4 text-base tracking-wide hover:bg-brand-gold/10 transition-all duration-300 rounded-sm w-full sm:w-auto relative overflow-hidden group"
            >
              <span className="relative flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                <Radio size={16} className="text-brand-gold" />
                Live Session
              </span>
            </a>
            <a
              href="/#/zindagi30"
              data-ocid="hero.secondary_button"
              className="inline-flex items-center justify-center gap-2 font-body font-semibold border-2 border-white/30 text-brand-light px-8 py-4 text-base tracking-wide hover:bg-white/10 hover:border-white/60 transition-all duration-300 rounded-sm w-full sm:w-auto"
            >
              ✨ Zindagi 3.0
            </a>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-xl mx-auto lg:mx-0"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.7s ease 1000ms, transform 0.7s ease 1000ms",
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="font-display text-4xl md:text-5xl text-brand-orange leading-none mb-1">
                  <CounterAnimation
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2200}
                  />
                </div>
                <div className="font-body text-xs text-brand-muted tracking-[0.15em] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Jigar's photo */}
        <div
          className="flex-shrink-0 flex items-center justify-center lg:justify-end w-full lg:w-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(40px)",
            transition: "opacity 0.9s ease 400ms, transform 0.9s ease 400ms",
          }}
        >
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-brand-orange/20 blur-[60px] pointer-events-none" />
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-brand-orange via-brand-gold to-brand-orange/40 opacity-80" />
            <img
              src="/assets/generated/ws4.dim_800x800.jpeg"
              alt="Jigar Chaudhary — Motivational Speaker with headset mic"
              className="relative z-10 w-64 sm:w-80 md:w-96 lg:w-[400px] xl:w-[440px] rounded-full object-cover aspect-square"
              style={{ filter: "drop-shadow(0 0 40px rgba(255,107,0,0.3))" }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-muted"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease 1500ms",
        }}
      >
        <span className="font-body text-xs tracking-[0.2em] uppercase">
          Scroll
        </span>
        <ChevronDown size={20} className="text-brand-orange animate-bounce" />
      </div>
    </section>
  );
}
