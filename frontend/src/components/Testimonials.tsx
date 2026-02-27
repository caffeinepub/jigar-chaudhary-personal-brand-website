import { useInView } from '../hooks/useInView';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Jigar's session on REVIVE completely changed how our students approach their goals. The energy, the activities, the clarity — it was unlike any workshop we've seen.",
    initials: 'MP',
  },
  {
    quote:
      'His Youth Bootcamp was a turning point for our placement batch. Students left feeling unstoppable. The transformation was visible within hours.',
    initials: 'RS',
  },
  {
    quote:
      "The stress management session Jigar conducted for our team was incredibly impactful. Practical, engaging and results-driven — exactly what we needed.",
    initials: 'AD',
  },
  {
    quote:
      "Jigar has a rare gift — he doesn't just speak, he transforms the room. Every student should experience this at least once in their academic journey.",
    initials: 'KM',
  },
];

function TestimonialCard({ t, delay }: { t: typeof testimonials[0]; delay: number }) {
  const [ref, inView] = useInView<HTMLDivElement>({ once: true, rootMargin: '-40px' });

  return (
    <div
      ref={ref}
      className="bg-brand-dark-card border border-white/5 rounded-sm p-7 md:p-8 flex flex-col hover:border-brand-orange/20 transition-colors duration-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, border-color 0.3s ease`,
      }}
    >
      {/* Stars */}
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} className="text-brand-gold fill-brand-gold" />
        ))}
      </div>

      {/* Quote icon */}
      <Quote size={28} className="text-brand-orange/30 mb-4" />

      {/* Quote text */}
      <p className="font-body text-brand-light/80 text-base leading-relaxed flex-1 italic">
        "{t.quote}"
      </p>
    </div>
  );
}

export default function Testimonials() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ once: true, rootMargin: '-60px' });

  return (
    <section id="testimonials" className="bg-brand-dark section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <span className="font-body text-xs text-brand-orange tracking-[0.3em] uppercase font-semibold">
            Real Voices, Real Impact
          </span>
          <h2 className="font-display text-6xl md:text-8xl text-brand-light mt-2">
            What People <span className="text-gradient-orange">Say</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
