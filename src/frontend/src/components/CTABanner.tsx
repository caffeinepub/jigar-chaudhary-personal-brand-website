import { ArrowRight, MessageCircle } from "lucide-react";
import { useInView } from "../hooks/useInView";

export default function CTABanner() {
  const [ref, inView] = useInView<HTMLDivElement>({
    once: true,
    rootMargin: "-60px",
  });

  const handleContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/919999999999?text=Hi%20Jigar%2C%20I%20would%20like%20to%20book%20a%20session.",
      "_blank",
    );
  };

  return (
    <section className="relative bg-brand-dark overflow-hidden py-24 px-4">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/8 via-transparent to-brand-gold/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent" />

      {/* Subtle decorative dots pattern instead of large TRANSFORM text */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FF6B00 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Soft glow orbs for visual interest */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-brand-orange/5 blur-[100px] pointer-events-none" />

      <div
        ref={ref}
        className="relative z-10 max-w-4xl mx-auto text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <span className="font-body text-xs text-brand-orange tracking-[0.3em] uppercase font-semibold">
          Let's Create Impact Together
        </span>
        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-brand-light mt-3 mb-6 leading-none">
          Ready to <span className="text-gradient-orange">Transform</span>
          <br />
          Your Audience?
        </h2>
        <p className="font-body text-brand-light/70 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Whether it's a college event, corporate workshop, or a large-scale
          youth conference — Jigar is ready to deliver an unforgettable
          experience that creates real, lasting change.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleContact}
            className="inline-flex items-center gap-2 font-body font-semibold bg-brand-orange text-white px-8 py-4 text-base tracking-wide hover:bg-brand-orange/90 hover:shadow-orange-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-sm w-full sm:w-auto justify-center"
          >
            Book Jigar Now
            <ArrowRight size={18} />
          </button>
          <button
            type="button"
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-2 font-body font-semibold bg-brand-green text-white px-8 py-4 text-base tracking-wide hover:bg-brand-green/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-sm w-full sm:w-auto justify-center"
          >
            <MessageCircle size={18} />
            WhatsApp Us
          </button>
        </div>
      </div>
    </section>
  );
}
