import {
  ArrowLeft,
  Brain,
  Calendar,
  CheckCircle,
  Clock,
  Loader2,
  MapPin,
  Radio,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import { useCountdown } from "../hooks/useCountdown";
import { useSubmitRegistration } from "../hooks/useQueries";

// Session date: Sunday, 8th March 2026 at 10:00 AM IST (UTC+5:30 → UTC 04:30)
const SESSION_DATE = new Date("2026-03-08T04:30:00Z");

const WHATSAPP_LINK = "https://chat.whatsapp.com/CVdWh177lyDA2mLVu7rM8L";

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center bg-reg-card border border-reg-gold/20 rounded-2xl px-4 py-4 min-w-[72px]">
      <span className="text-3xl md:text-4xl font-display text-reg-gold leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-reg-muted text-xs uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  );
}

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    collegeProfession: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const submitRegistration = useSubmitRegistration();
  const formRef = useRef<HTMLDivElement>(null);
  const countdown = useCountdown(SESSION_DATE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.collegeProfession.trim()
    ) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    try {
      await submitRegistration.mutateAsync({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        collegeProfession: form.collegeProfession.trim(),
      });
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (
        msg.includes("Actor not available") ||
        msg.includes("Actor not initialized")
      ) {
        setErrorMsg(
          "Connection not ready. Please wait a moment and try again.",
        );
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-reg-dark flex items-center justify-center p-4">
        <div className="text-center max-w-lg w-full">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>

          <h2 className="text-4xl font-display text-white mb-3">
            You're Registered!
          </h2>
          <p className="text-gray-400 mb-8">
            Thank you,{" "}
            <span className="text-reg-gold font-semibold">{form.name}</span>!
            Your spot for the live session is confirmed. We'll send details to{" "}
            <span className="text-white">{form.email}</span>.
          </p>

          {/* Session Date Reminder */}
          <div className="bg-reg-card border border-reg-gold/20 rounded-2xl p-4 mb-8 flex items-center justify-center gap-3">
            <Calendar className="w-5 h-5 text-reg-gold flex-shrink-0" />
            <div className="text-left">
              <p className="text-reg-muted text-xs uppercase tracking-widest">
                Session Date
              </p>
              <p className="text-white font-semibold text-sm">
                Sunday, 8th March 2026 · 10:00 AM – 12:00 PM IST
              </p>
            </div>
          </div>

          {/* WhatsApp Community CTA */}
          <div className="bg-green-950/60 border-2 border-green-500/50 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <SiWhatsapp className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-display text-white">
                Join Our WhatsApp Community
              </h3>
            </div>
            <p className="text-green-300 text-sm mb-1 font-semibold">
              ⚠️ It's mandatory to join the community!
            </p>
            <p className="text-gray-400 text-sm mb-5">
              All session updates, links, and resources will be shared
              exclusively in the WhatsApp community. Don't miss out!
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors w-full justify-center"
            >
              <SiWhatsapp className="w-6 h-6" />
              Join WhatsApp Community Now
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.hash = "";
            }}
            className="inline-flex items-center gap-2 text-reg-gold hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-reg-dark text-white">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(/assets/generated/register-hero-bg.dim_1440x900.png)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-reg-dark/70 via-reg-dark/50 to-reg-dark" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16">
          <div className="inline-flex items-center gap-2 bg-reg-gold/10 border border-reg-gold/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-reg-gold animate-pulse" />
            <span className="text-reg-gold text-sm font-medium tracking-wide uppercase">
              Live Session
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display text-white mb-4 leading-tight">
            PRESSURE TO
            <br />
            <span className="text-reg-gold">PERFORMANCE</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Join Jigar Chaudhary for an exclusive live session on transforming
            pressure into peak performance.
          </p>

          {/* Date Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 mb-8">
            <Calendar className="w-4 h-4 text-reg-gold" />
            <span className="text-white font-medium text-sm">
              Sunday, 8th March 2026 · 10:00 AM – 12:00 PM IST
            </span>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            {countdown.isLive ? (
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 rounded-full px-6 py-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-bold text-lg tracking-wide">
                  SESSION IS LIVE NOW!
                </span>
              </div>
            ) : (
              <div>
                <p className="text-reg-muted text-xs uppercase tracking-widest mb-3">
                  Session starts in
                </p>
                <div className="flex items-center justify-center gap-3">
                  <CountdownBox value={countdown.days} label="Days" />
                  <span className="text-reg-gold text-2xl font-display mb-4">
                    :
                  </span>
                  <CountdownBox value={countdown.hours} label="Hours" />
                  <span className="text-reg-gold text-2xl font-display mb-4">
                    :
                  </span>
                  <CountdownBox value={countdown.minutes} label="Mins" />
                  <span className="text-reg-gold text-2xl font-display mb-4">
                    :
                  </span>
                  <CountdownBox value={countdown.seconds} label="Secs" />
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-reg-gold text-reg-dark font-bold px-8 py-4 rounded-full text-lg hover:bg-yellow-400 transition-colors"
          >
            <Radio className="w-5 h-5" />
            Register Now — It's Free
          </button>
        </div>
      </section>

      {/* Session Details */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Calendar, label: "Date", value: "8th March 2026" },
            { icon: Clock, label: "Time", value: "10 AM – 12 PM IST" },
            { icon: MapPin, label: "Mode", value: "Online / Live" },
            { icon: Users, label: "Seats", value: "Limited" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-reg-card border border-white/5 rounded-2xl p-5 text-center"
            >
              <Icon className="w-6 h-6 text-reg-gold mx-auto mb-2" />
              <p className="text-reg-muted text-xs uppercase tracking-widest mb-1">
                {label}
              </p>
              <p className="text-white font-semibold text-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* Speaker Section */}
        <div className="mb-16 bg-reg-card border border-white/5 rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto overflow-hidden">
              <img
                src="/assets/jigara1.jpg"
                alt="Jigar Chaudhary"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-reg-card/80 hidden md:block" />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-reg-gold/10 border border-reg-gold/20 rounded-full px-3 py-1 mb-4 w-fit">
                <span className="text-reg-gold text-xs font-medium uppercase tracking-widest">
                  Your Host
                </span>
              </div>
              <h2 className="text-3xl font-display text-white mb-2">
                JIGAR CHAUDHARY
              </h2>
              <p className="text-reg-gold text-sm font-medium mb-4">
                Youth Trainer & Experiential Facilitator
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Jigar Chaudhary has transformed thousands of lives through his
                high-energy sessions on mindset, performance, and personal
                growth. With a unique blend of practical tools and motivational
                storytelling, he helps students and professionals unlock their
                true potential.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "130+ Sessions",
                  "50,000+ Lives Impacted",
                  "Pan-India Reach",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="bg-reg-dark border border-white/10 rounded-full px-3 py-1 text-xs text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-16">
          <h2 className="text-3xl font-display text-white mb-2 text-center">
            WHAT YOU'LL LEARN
          </h2>
          <p className="text-reg-muted text-center text-sm mb-8">
            Practical insights you can apply immediately
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: Brain,
                text: "How to reframe pressure as a performance catalyst",
              },
              {
                icon: Zap,
                text: "Mindset techniques used by top performers worldwide",
              },
              {
                icon: Target,
                text: "Practical tools to stay calm and focused under stress",
              },
              {
                icon: TrendingUp,
                text: "Building mental resilience for long-term success",
              },
              { icon: Star, text: "Live Q&A session with Jigar Chaudhary" },
              {
                icon: Users,
                text: "Exclusive resources, worksheets & action plan",
              },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-3 bg-reg-card border border-white/5 rounded-xl p-4 hover:border-reg-gold/20 transition-colors"
              >
                <Icon className="w-4 h-4 text-reg-gold mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Community Teaser */}
        <div className="mb-16 bg-green-950/40 border border-green-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <SiWhatsapp className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-center md:text-left">
            <p className="text-white font-semibold mb-1">
              Join Our WhatsApp Community — Mandatory!
            </p>
            <p className="text-gray-400 text-sm">
              After registration, you'll receive a link to join our exclusive
              WhatsApp community where all session updates and resources will be
              shared.
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div ref={formRef} id="register-form" className="max-w-lg mx-auto">
          <div className="bg-reg-card border border-white/10 rounded-3xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-display text-white mb-2">
                SECURE YOUR SPOT
              </h2>
              <p className="text-reg-muted text-sm">
                Fill in your details to register for the live session
              </p>
              <div className="mt-3 inline-flex items-center gap-2 bg-reg-gold/10 border border-reg-gold/20 rounded-full px-3 py-1">
                <Calendar className="w-3.5 h-3.5 text-reg-gold" />
                <span className="text-reg-gold text-xs font-medium">
                  8th March 2026 · 10:00 AM – 12:00 PM IST
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                {
                  name: "name",
                  label: "Full Name",
                  placeholder: "Your full name",
                  type: "text",
                },
                {
                  name: "email",
                  label: "Email Address",
                  placeholder: "your@email.com",
                  type: "email",
                },
                {
                  name: "phone",
                  label: "Phone Number",
                  placeholder: "+91 XXXXX XXXXX",
                  type: "tel",
                },
                {
                  name: "collegeProfession",
                  label: "College / Profession",
                  placeholder: "e.g. Student at XYZ College",
                  type: "text",
                },
              ].map(({ name, label, placeholder, type }) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="block text-sm text-reg-muted mb-1.5"
                  >
                    {label}
                  </label>
                  <input
                    id={name}
                    type={type}
                    name={name}
                    value={form[name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={submitRegistration.isPending}
                    className="w-full bg-reg-dark border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-reg-gold/50 transition-colors disabled:opacity-50"
                  />
                </div>
              ))}

              {errorMsg && (
                <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={submitRegistration.isPending}
                className="w-full bg-reg-gold text-reg-dark font-bold py-4 rounded-xl text-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {submitRegistration.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <Radio className="w-5 h-5" />
                    Register for Free
                  </>
                )}
              </button>

              <p className="text-center text-reg-muted text-xs mt-2">
                🔒 Free registration · No spam · Unsubscribe anytime
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-white/5 mt-8">
        <button
          type="button"
          onClick={() => {
            window.location.hash = "";
          }}
          className="inline-flex items-center gap-2 text-reg-muted hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jigar Chaudhary's Website
        </button>
      </footer>
    </div>
  );
}
