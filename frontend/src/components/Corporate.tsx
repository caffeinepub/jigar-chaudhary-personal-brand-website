import { useInView } from '../hooks/useInView';
import { Users, TrendingUp, MessageSquare, HeartPulse, Rocket, ArrowRight } from 'lucide-react';

const topics = [
  { icon: Users, label: 'Team Dynamics & Collaboration' },
  { icon: TrendingUp, label: 'Leadership for Young Professionals' },
  { icon: MessageSquare, label: 'Communication & Influence' },
  { icon: HeartPulse, label: 'Stress & Burnout Management' },
  { icon: Rocket, label: 'High-Performance Mindset' },
];

export default function Corporate() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({ once: true, rootMargin: '-60px' });
  const [cardRef, cardInView] = useInView<HTMLDivElement>({ once: true, rootMargin: '-40px' });

  const handleContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="corporate" className="bg-brand-dark-alt section-padding">
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
            For Organizations &amp; Teams
          </span>
          <h2 className="font-display text-6xl md:text-8xl text-brand-light mt-2">
            Corporate <span className="text-gradient-orange">Workshops</span>
          </h2>
        </div>

        {/* Main Card */}
        <div
          ref={cardRef}
          className="relative bg-brand-dark-card border border-brand-orange/20 rounded-sm overflow-hidden"
          style={{
            opacity: cardInView ? 1 : 0,
            transform: cardInView ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* Orange accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-brand-gold to-brand-orange" />

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left: Description */}
            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
              <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-body font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full mb-6">
                Corporate &amp; Enterprise
              </div>
              <h3 className="font-display text-4xl md:text-5xl text-brand-light mb-6 leading-tight">
                Bring Jigar's Energy to Your Team
              </h3>
              <p className="font-body text-brand-light/70 text-base leading-relaxed mb-8">
                Corporate sessions designed for leadership, communication, team dynamics, and high-performance mindset. Jigar's experiential approach ensures your team doesn't just learn — they transform.
              </p>
              <button
                onClick={handleContact}
                className="inline-flex items-center gap-2 font-body font-semibold bg-brand-orange text-white px-7 py-3.5 rounded-sm hover:bg-brand-orange/90 hover:shadow-orange-glow transition-all duration-300 tracking-wide"
              >
                Request a Custom Workshop
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Right: Topics */}
            <div className="p-8 md:p-12">
              <p className="font-body text-xs text-brand-muted tracking-[0.2em] uppercase font-semibold mb-6">
                Workshop Topics
              </p>
              <div className="space-y-4">
                {topics.map((topic, i) => {
                  const Icon = topic.icon;
                  return (
                    <div
                      key={topic.label}
                      className="flex items-center gap-4 group"
                      style={{
                        opacity: cardInView ? 1 : 0,
                        transform: cardInView ? 'translateX(0)' : 'translateX(20px)',
                        transition: `opacity 0.5s ease ${i * 80 + 200}ms, transform 0.5s ease ${i * 80 + 200}ms`,
                      }}
                    >
                      <div className="w-10 h-10 rounded-sm bg-brand-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange/20 transition-colors duration-200">
                        <Icon size={18} className="text-brand-orange" />
                      </div>
                      <span className="font-body text-brand-light/80 text-sm font-medium group-hover:text-brand-light transition-colors duration-200">
                        {topic.label}
                      </span>
                      <div className="ml-auto w-6 h-px bg-brand-orange/20 group-hover:w-10 group-hover:bg-brand-orange/50 transition-all duration-300" />
                    </div>
                  );
                })}
              </div>

              {/* Stats row — only 100% Custom and Pan-India Reach */}
              <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                {[
                  { value: '100%', label: 'Custom' },
                  { value: 'Pan-India', label: 'Reach' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-display text-2xl text-brand-orange">{s.value}</div>
                    <div className="font-body text-xs text-brand-muted">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
