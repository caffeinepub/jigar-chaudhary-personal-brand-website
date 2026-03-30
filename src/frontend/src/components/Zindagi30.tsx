import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const programBenefits = [
  "Discover their true potential",
  "Build confidence and self-esteem",
  "Improve communication and presentation skills",
  "Develop emotional intelligence and empathy",
  "Strengthen discipline and focus",
  "Learn teamwork and leadership",
];

const trainerHighlights = [
  "Practical learning approach",
  "Real-life examples",
  "Deep participant engagement",
  "Transformational outcomes",
];

const programStructure = [
  "SWOT Analysis (Strengths & Weaknesses)",
  "Self-Esteem & Confidence Building",
  "Empathy & Emotional Intelligence",
  "Self-Discipline & Focus",
  "Teamwork & Collaboration",
  "Body Language & Grooming",
  "Presentation & Communication Skills",
];

const audience = [
  "Students",
  "Young Professionals",
  "Aspiring Leaders",
  "Anyone who wants to grow personally and professionally",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const scrollToRegister = () => {
  document
    .getElementById("zindagi-register")
    ?.scrollIntoView({ behavior: "smooth" });
};

export default function Zindagi30() {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light overflow-x-hidden">
      {/* Back to Home */}
      <div className="fixed top-4 left-4 z-50">
        <a
          href="/#"
          data-ocid="zindagi.link"
          className="inline-flex items-center gap-2 bg-brand-dark/80 backdrop-blur-md border border-white/10 text-brand-muted hover:text-brand-light px-4 py-2 rounded-full text-sm font-body transition-all duration-200 hover:border-white/30"
        >
          <ArrowLeft size={14} />
          Back
        </a>
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[oklch(0.13_0.02_255)] to-brand-dark" />
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-brand-orange/6 blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center py-32">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 border border-brand-gold/40 bg-brand-gold/10 text-brand-gold text-xs font-body font-semibold tracking-[0.2em] uppercase px-5 py-2 rounded-full mb-8"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 100ms, transform 0.7s ease 100ms",
            }}
          >
            <Sparkles size={12} />
            Premium Workshop Experience
          </div>

          {/* Title */}
          <h1
            className="font-display text-[5rem] sm:text-[7rem] md:text-[9rem] leading-none mb-4"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s ease 250ms, transform 0.7s ease 250ms",
            }}
          >
            <span className="text-gradient-orange">Zindagi</span>{" "}
            <span className="text-brand-gold">3.0</span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-body text-xl md:text-2xl text-brand-light/70 tracking-[0.15em] uppercase mb-8"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 400ms, transform 0.7s ease 400ms",
            }}
          >
            A 3-Day Transformation Experience
          </p>

          {/* Description */}
          <p
            className="font-body text-base md:text-lg text-brand-muted max-w-2xl mx-auto mb-6 leading-relaxed"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 550ms, transform 0.7s ease 550ms",
            }}
          >
            Zindagi 3.0 is a powerful, immersive 3-day experience designed to
            help individuals upgrade their mindset, confidence, communication,
            and overall life direction. This is not just a workshop — it is a
            life-changing journey of self-discovery, growth, and transformation.
          </p>

          {/* Highlighted line */}
          <p
            className="font-body text-base md:text-xl font-bold text-brand-gold border border-brand-gold/30 bg-brand-gold/10 rounded-sm px-6 py-3 inline-block mb-10"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 700ms, transform 0.7s ease 700ms",
            }}
          >
            "This is not just a workshop, it's a life-changing experience."
          </p>

          {/* CTA */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 850ms, transform 0.7s ease 850ms",
            }}
          >
            <button
              type="button"
              data-ocid="zindagi.primary_button"
              onClick={scrollToRegister}
              className="inline-flex items-center gap-2 bg-brand-orange text-white font-body font-semibold px-10 py-4 text-lg tracking-wide hover:bg-brand-orange/90 hover:shadow-[0_0_30px_oklch(0.65_0.18_40/0.4)] transition-all duration-300 rounded-sm"
            >
              Register Now — Limited Seats
            </button>
          </div>
        </div>
      </section>

      {/* ===== SECTION 1: ABOUT THE PROGRAM ===== */}
      <section className="py-20 md:py-28 bg-[oklch(0.14_0.012_260)]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn className="text-center mb-14">
            <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-brand-orange mb-3">
              Program Overview
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-brand-light">
              About the Program
            </h2>
            <div className="w-16 h-0.5 bg-brand-orange mx-auto mt-6" />
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {programBenefits.map((benefit, i) => (
              <FadeIn key={benefit} delay={i * 80}>
                <div className="flex items-start gap-4 bg-brand-dark/60 border border-white/5 rounded-sm p-5 hover:border-brand-orange/30 transition-colors duration-200">
                  <CheckCircle2
                    size={20}
                    className="text-brand-orange flex-shrink-0 mt-0.5"
                  />
                  <span className="font-body text-brand-light/85 text-base">
                    {benefit}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: ABOUT THE TRAINER ===== */}
      <section className="py-20 md:py-28 bg-brand-dark">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn className="text-center mb-14">
            <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-brand-gold mb-3">
              Meet Your Trainer
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-brand-light">
              About the Trainer
            </h2>
            <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-6" />
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <FadeIn>
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-brand-gold/40 to-brand-orange/20 blur-[20px]" />
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-orange/10 border-2 border-brand-gold/40 flex items-center justify-center">
                    <span className="font-display text-4xl text-brand-gold">
                      RS
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-brand-light mb-2">
                  Ms. Rikita Swaroop
                </h3>
                <p className="font-body text-brand-orange text-sm font-semibold tracking-[0.15em] uppercase mb-1">
                  Soft Skills Trainer & Learning Consultant
                </p>
                <p className="font-body text-brand-gold text-xs tracking-[0.1em] mb-6">
                  Heartfulness Meditation Facilitator • 20+ Years Experience
                </p>
                <div className="w-full text-left">
                  <p className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-brand-muted mb-4">
                    Her sessions are known for:
                  </p>
                  <div className="space-y-2">
                    {trainerHighlights.map((h) => (
                      <div key={h} className="flex items-center gap-3">
                        <Star
                          size={14}
                          className="text-brand-gold flex-shrink-0"
                        />
                        <span className="font-body text-brand-light/80 text-sm">
                          {h}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="border-l-2 border-brand-gold/30 pl-8">
                <p className="font-body text-brand-light/75 text-base leading-relaxed mb-6">
                  Ms. Rikita Swaroop is a highly experienced Soft Skills
                  Trainer, Learning Consultant, and Heartfulness Meditation
                  Facilitator with over 20+ years of experience across
                  corporate, government, and educational sectors.
                </p>
                <p className="font-body text-brand-light/75 text-base leading-relaxed mb-6">
                  She has delivered impactful training programs for
                  organizations such as{" "}
                  <span className="text-brand-gold font-semibold">
                    Infosys, Mahindra Engineering, Nirma University, PDEU
                  </span>
                  , and many more.
                </p>
                <p className="font-body text-brand-light/75 text-base leading-relaxed">
                  She is a certified Master Trainer and a Heartfulness
                  Meditation Trainer who believes in integrating personal
                  growth, professional excellence, and inner balance.
                </p>
                <div className="flex flex-wrap gap-2 mt-8">
                  {[
                    "Infosys",
                    "Mahindra Engineering",
                    "Nirma University",
                    "PDEU",
                  ].map((org) => (
                    <span
                      key={org}
                      className="font-body text-xs border border-brand-gold/30 text-brand-gold/80 px-3 py-1 rounded-full"
                    >
                      {org}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: PROGRAM STRUCTURE ===== */}
      <section className="py-20 md:py-28 bg-[oklch(0.14_0.012_260)]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn className="text-center mb-14">
            <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-brand-orange mb-3">
              Curriculum
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-brand-light">
              What You Will Experience
            </h2>
            <div className="w-16 h-0.5 bg-brand-orange mx-auto mt-6" />
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            {programStructure.map((item, i) => (
              <FadeIn key={item} delay={i * 70}>
                <div className="flex items-center gap-5 border-b border-white/5 py-5 group hover:border-brand-orange/20 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange/20 transition-colors duration-200">
                    <span className="font-display text-brand-orange text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="font-body text-brand-light/85 text-base">
                    {item}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: DURATION ===== */}
      <section className="py-20 md:py-28 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-sm border border-brand-gold/40 bg-gradient-to-br from-brand-gold/10 via-brand-dark to-brand-orange/5 p-10 md:p-16 text-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent" />
              <Clock size={32} className="text-brand-gold mx-auto mb-6" />
              <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-brand-muted mb-3">
                Workshop Format
              </p>
              <h2 className="font-display text-5xl md:text-7xl text-brand-gold mb-6">
                3 Days · 15 Hours
              </h2>
              <div className="inline-flex items-center gap-3 bg-brand-orange/10 border border-brand-orange/30 px-8 py-4 rounded-sm">
                <span className="w-2 h-2 rounded-full bg-brand-orange" />
                <span className="font-body text-brand-light font-semibold text-lg tracking-wide">
                  2 Half Days + 1 Full Day
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== SECTION 5: WHO SHOULD ATTEND ===== */}
      <section className="py-20 md:py-28 bg-[oklch(0.14_0.012_260)]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <FadeIn className="text-center mb-14">
            <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-brand-orange mb-3">
              Ideal For
            </p>
            <h2 className="font-display text-5xl md:text-6xl text-brand-light">
              Who Should Attend
            </h2>
            <div className="w-16 h-0.5 bg-brand-orange mx-auto mt-6" />
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {audience.map((item, i) => (
              <FadeIn key={item} delay={i * 80}>
                <div className="bg-brand-dark border border-white/5 hover:border-brand-orange/30 rounded-sm p-6 text-center group transition-all duration-200 hover:bg-brand-orange/5">
                  <Users
                    size={24}
                    className="text-brand-orange mx-auto mb-4 group-hover:scale-110 transition-transform duration-200"
                  />
                  <p className="font-body text-brand-light/85 text-sm leading-snug">
                    {item}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: CERTIFICATION ===== */}
      <section className="py-20 md:py-28 bg-brand-dark">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <FadeIn>
            <div className="relative text-center border border-brand-gold/30 rounded-sm p-10 md:p-14 bg-gradient-to-br from-brand-gold/5 to-transparent overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[40px]" />
              <Award size={48} className="text-brand-gold mx-auto mb-6" />
              <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-brand-muted mb-4">
                Recognition
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-brand-light mb-4">
                Certificate of Completion
              </h2>
              <p className="font-body text-brand-muted text-base max-w-lg mx-auto">
                Every participant who completes Zindagi 3.0 will receive an{" "}
                <span className="text-brand-gold font-semibold">
                  official Certificate of Completion
                </span>{" "}
                — a testament to your commitment to growth and transformation.
              </p>
              <div className="flex items-center justify-center gap-2 mt-8 text-brand-gold">
                <BookOpen size={16} />
                <span className="font-body text-sm font-semibold tracking-wide">
                  Recognised Achievement
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== SECTION 7: CTA ===== */}
      <section
        id="zindagi-register"
        className="py-20 md:py-28 bg-[oklch(0.14_0.012_260)] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-brand-gold/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 text-center">
          <FadeIn>
            <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-brand-gold mb-4">
              Take Action
            </p>
            <h2 className="font-display text-5xl md:text-7xl text-brand-light mb-6">
              Ready to Transform Your Life?
            </h2>
            <p className="font-body text-brand-muted text-lg mb-10 max-w-xl mx-auto">
              Join Zindagi 3.0 and embark on a 3-day journey that will redefine
              who you are and who you can become.
            </p>

            <button
              type="button"
              data-ocid="zindagi.primary_button"
              className="inline-flex items-center gap-3 bg-brand-orange text-white font-body font-bold px-12 py-5 text-xl tracking-wide hover:bg-brand-orange/90 hover:shadow-[0_0_40px_oklch(0.65_0.18_40/0.5)] transition-all duration-300 rounded-sm"
            >
              <Sparkles size={20} />
              Register Now
            </button>

            <p className="font-body text-brand-orange text-sm font-semibold mt-5 tracking-[0.15em] uppercase animate-pulse">
              ⚡ Limited Seats Available
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <section className="py-12 bg-[oklch(0.11_0.01_260)] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <p className="font-body text-brand-muted text-xs tracking-[0.2em] uppercase mb-3">
            Hosted by
          </p>
          <p className="font-display text-3xl md:text-4xl text-brand-light mb-1">
            Jigar Chaudhary
          </p>
          <p className="font-body text-brand-orange text-sm tracking-[0.15em] uppercase mb-6">
            Entrepreneur | Trainer | Experience Architect
          </p>
          <a
            href="/#"
            data-ocid="zindagi.link"
            className="inline-flex items-center gap-2 font-body text-sm text-brand-muted hover:text-brand-light transition-colors duration-200 border border-white/10 hover:border-white/30 px-5 py-2 rounded-full"
          >
            <ChevronLeft size={14} />
            Back to Main Site
          </a>
          <p className="font-body text-xs text-brand-muted/50 mt-8">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              className="hover:text-brand-muted transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
