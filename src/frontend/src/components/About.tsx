import { Award, Layers, Users } from "lucide-react";
import { useInView } from "../hooks/useInView";
import CounterAnimation from "./CounterAnimation";

const achievements = [
  { icon: Award, value: 130, suffix: "+", label: "Sessions Conducted" },
  { icon: Users, value: 5000, suffix: "+", label: "Youth Impacted" },
  { icon: Layers, value: 5, suffix: "+", label: "Signature Programs" },
];

function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const [ref, inView] = useInView<HTMLDivElement>({
    once: true,
    rootMargin: "-60px",
  });

  const translateInit =
    direction === "up"
      ? "translateY(40px)"
      : direction === "left"
        ? "translateX(-40px)"
        : "translateX(40px)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0,0)" : translateInit,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="bg-brand-dark-alt section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <FadeIn className="text-center mb-16">
          <span className="font-body text-xs text-brand-orange tracking-[0.3em] uppercase font-semibold">
            The Man Behind The Movement
          </span>
          <h2 className="font-display text-6xl md:text-8xl text-brand-light mt-2">
            Who is <span className="text-gradient-orange">Jigar?</span>
          </h2>
        </FadeIn>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          {/* Profile Image — ws9-about.jpeg classroom selfie with students */}
          <FadeIn direction="left" className="relative flex justify-center">
            <div className="relative">
              {/* Gradient border frame */}
              <div className="absolute -inset-1 rounded-sm bg-gradient-to-br from-brand-orange via-brand-gold to-brand-orange/30 blur-sm opacity-70" />
              <div className="absolute -inset-1 rounded-sm bg-gradient-to-br from-brand-orange via-brand-gold to-brand-orange/30 opacity-50" />
              <div className="relative rounded-sm overflow-hidden">
                <img
                  src="/assets/generated/ws9-about.dim_1200x800.jpeg"
                  alt="Jigar Chaudhary with students in a classroom workshop session"
                  className="w-full max-w-sm md:max-w-md object-cover block"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-brand-orange text-white font-display text-lg px-4 py-2 rounded-sm shadow-orange-glow">
                130+ SESSIONS
              </div>
            </div>
          </FadeIn>

          {/* Bio Text */}
          <FadeIn direction="right" delay={100}>
            <p className="font-body text-lg md:text-xl text-brand-light/90 leading-relaxed mb-6 font-light">
              <span className="text-brand-orange font-semibold">
                Jigar Chaudhary
              </span>{" "}
              is one of India's youngest experiential facilitators — a Youth
              Trainer, Motivational Speaker, and Workshop Designer who believes{" "}
              <span className="text-brand-gold italic">
                learning must be felt, not just heard.
              </span>
            </p>
            <p className="font-body text-base md:text-lg text-brand-light/70 leading-relaxed mb-8">
              With 130+ sessions conducted across colleges, universities, and
              institutions, Jigar has impacted thousands of young minds through
              immersive, high-energy experiences that create real, lasting
              transformation.
            </p>

            {/* Key traits */}
            <div className="space-y-3">
              <p className="font-body text-xs text-brand-muted tracking-[0.2em] uppercase font-semibold mb-4">
                What Jigar Brings
              </p>
              {[
                "High-energy experiential workshops",
                "Customised programs for colleges & corporates",
                "Proven frameworks for youth leadership",
              ].map((trait) => (
                <div key={trait} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                  <span className="font-body text-sm text-brand-light/80">
                    {trait}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Achievement Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {achievements.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.label} delay={i * 80}>
                <div className="bg-brand-dark-card border border-white/5 rounded-sm p-5 text-center hover:border-brand-orange/30 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-sm bg-brand-orange/10 flex items-center justify-center mx-auto mb-3">
                    <Icon size={20} className="text-brand-orange" />
                  </div>
                  <div className="font-display text-4xl text-brand-orange mb-1">
                    <CounterAnimation
                      target={item.value}
                      suffix={item.suffix}
                    />
                  </div>
                  <div className="font-body text-xs text-brand-muted tracking-wide uppercase">
                    {item.label}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
