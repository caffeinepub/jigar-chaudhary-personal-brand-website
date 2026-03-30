import { Brain, Compass, Mountain, Users, Zap } from "lucide-react";
import { useInView } from "../hooks/useInView";

const programs = [
  {
    icon: Zap,
    name: "REVIVE",
    tagline: "Rediscover Your Energy",
    description:
      "Rediscover your energy, purpose and drive. A high-impact session for youth who feel stuck, lost, or disconnected from their potential.",
    isOrange: true,
  },
  {
    icon: Users,
    name: "Master Your Circle",
    tagline: "Build Your Inner Circle",
    description:
      "The power of your relationships defines your future. Learn to build, protect and grow your circle with intention and clarity.",
    isOrange: false,
  },
  {
    icon: Mountain,
    name: "Youth Bootcamps",
    tagline: "Push Your Limits",
    description:
      "Full-day immersive experiences designed to push limits, build confidence and create breakthroughs that last a lifetime.",
    isOrange: true,
  },
  {
    icon: Compass,
    name: "Career Clarity Workshops",
    tagline: "Find Your Direction",
    description:
      "Confused about your path? This workshop brings clarity, direction and a concrete roadmap to your future career.",
    isOrange: false,
  },
  {
    icon: Brain,
    name: "Stress Management Sessions",
    tagline: "Master Your Mind",
    description:
      "Modern tools and mindset shifts to help youth manage pressure, anxiety and overwhelm — and perform at their best.",
    isOrange: true,
  },
];

function ProgramCard({
  program,
  delay,
  onContact,
}: {
  program: (typeof programs)[0];
  delay: number;
  onContact: () => void;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({
    once: true,
    rootMargin: "-40px",
  });
  const Icon = program.icon;

  return (
    <div
      ref={ref}
      className="bg-brand-dark-card border border-white/5 rounded-sm p-7 flex flex-col group cursor-pointer transition-all duration-300 hover:border-brand-orange/30 hover:-translate-y-2 hover:shadow-orange-glow"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-sm flex items-center justify-center mb-5 ${
          program.isOrange ? "bg-brand-orange/15" : "bg-brand-gold/15"
        }`}
      >
        <Icon
          size={22}
          className={program.isOrange ? "text-brand-orange" : "text-brand-gold"}
        />
      </div>

      {/* Content */}
      <div className="flex-1">
        <p
          className={`font-body text-xs tracking-[0.2em] uppercase font-semibold mb-1 ${
            program.isOrange ? "text-brand-orange" : "text-brand-gold"
          }`}
        >
          {program.tagline}
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-brand-light mb-3 leading-tight">
          {program.name}
        </h3>
        <p className="font-body text-sm text-brand-muted leading-relaxed">
          {program.description}
        </p>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onContact}
        className={`mt-6 font-body text-sm font-semibold tracking-wide py-2.5 px-5 rounded-sm border transition-all duration-200 ${
          program.isOrange
            ? "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
            : "border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark"
        }`}
      >
        Register Now →
      </button>
    </div>
  );
}

export default function Programs() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({
    once: true,
    rootMargin: "-60px",
  });

  const handleContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="programs" className="bg-brand-dark section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <span className="font-body text-xs text-brand-orange tracking-[0.3em] uppercase font-semibold">
            What Jigar Delivers
          </span>
          <h2 className="font-display text-6xl md:text-8xl text-brand-light mt-2">
            Signature <span className="text-gradient-orange">Programs</span>
          </h2>
          <p className="font-body text-brand-muted mt-4 max-w-xl mx-auto text-base">
            Each program is designed to create real transformation — not just
            inspiration that fades by Monday.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, i) => (
            <ProgramCard
              key={program.name}
              program={program}
              delay={i * 100}
              onContact={handleContact}
            />
          ))}

          {/* Spacer card */}
          <div className="hidden lg:flex bg-gradient-to-br from-brand-orange/10 to-brand-gold/5 border border-brand-orange/20 rounded-sm p-7 flex-col items-center justify-center text-center">
            <div className="font-display text-4xl text-brand-orange mb-3">
              MORE COMING
            </div>
            <p className="font-body text-sm text-brand-muted">
              New programs launching soon. Stay tuned for more transformative
              experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
