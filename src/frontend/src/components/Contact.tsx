import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { SiInstagram, SiLinkedin, SiYoutube } from "react-icons/si";
import { useInView } from "../hooks/useInView";
import { useSubmitBooking } from "../hooks/useQueries";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/the_jigara?igsh=MThkY2V3andqbHJkbA==",
  youtube: "https://youtube.com/@the_jigara?si=TbPBh5u_wpsy-1hS",
  linkedin:
    "https://www.linkedin.com/in/jigar-chaudhary-8573ab251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
};

const eventTypes = [
  "College Event",
  "Corporate Workshop",
  "Youth Bootcamp",
  "Speaking Engagement",
  "Other",
];

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  eventType: "",
  message: "",
};

export default function Contact() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({
    once: true,
    rootMargin: "-60px",
  });
  const [formRef, formInView] = useInView<HTMLDivElement>({
    once: true,
    rootMargin: "-40px",
  });
  const [infoRef, infoInView] = useInView<HTMLDivElement>({
    once: true,
    rootMargin: "-40px",
  });

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submitBooking = useSubmitBooking();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    try {
      await submitBooking.mutateAsync(formData);
      setSubmitted(true);
      setFormData(EMPTY_FORM);
    } catch (_err) {
      setSubmitError(
        "Something went wrong. Please try again or reach out via WhatsApp.",
      );
    }
  };

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/916351622776?text=Hi%20Jigar%2C%20I%20would%20like%20to%20book%20a%20session.",
      "_blank",
    );
  };

  const inputClass =
    "w-full bg-brand-dark border border-white/10 rounded-sm px-4 py-3 font-body text-sm text-brand-light placeholder-brand-muted focus:outline-none focus:border-brand-orange/60 transition-colors duration-200";

  const isSubmitting = submitBooking.isPending;

  return (
    <section id="contact" className="bg-brand-dark-alt section-padding">
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
            Start the Conversation
          </span>
          <h2 className="font-display text-6xl md:text-8xl text-brand-light mt-2">
            Get in <span className="text-gradient-orange">Touch</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div
            ref={formRef}
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <CheckCircle2 size={56} className="text-brand-orange mb-4" />
                <h3 className="font-display text-4xl text-brand-light mb-3">
                  Booking Request Sent!
                </h3>
                <p className="font-body text-brand-muted text-base">
                  Your booking request has been sent! Jigar's team will get back
                  to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-body text-sm text-brand-orange underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="font-body text-xs text-brand-muted tracking-wide uppercase block mb-1.5"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-body text-xs text-brand-muted tracking-wide uppercase block mb-1.5"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="font-body text-xs text-brand-muted tracking-wide uppercase block mb-1.5"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-org"
                      className="font-body text-xs text-brand-muted tracking-wide uppercase block mb-1.5"
                    >
                      Organization
                    </label>
                    <input
                      type="text"
                      id="contact-org"
                      name="organization"
                      placeholder="College / Company name"
                      value={formData.organization}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-event"
                    className="font-body text-xs text-brand-muted tracking-wide uppercase block mb-1.5"
                  >
                    Type of Event *
                  </label>
                  <select
                    id="contact-event"
                    name="eventType"
                    required
                    value={formData.eventType}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select event type
                    </option>
                    {eventTypes.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="bg-brand-dark-card"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="contact-msg"
                    className="font-body text-xs text-brand-muted tracking-wide uppercase block mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-msg"
                    name="message"
                    rows={4}
                    placeholder="Tell Jigar about your event, audience size, and what you're looking to achieve..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {submitError && (
                  <p className="font-body text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-sm px-4 py-3">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 font-body font-semibold bg-brand-orange text-white px-6 py-4 rounded-sm hover:bg-brand-orange/90 hover:shadow-orange-glow transition-all duration-300 tracking-wide text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Book Jigar Now
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div
            ref={infoRef}
            className="flex flex-col gap-6"
            style={{
              opacity: infoInView ? 1 : 0,
              transform: infoInView ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.8s ease 100ms, transform 0.8s ease 100ms",
            }}
          >
            {/* WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex items-center gap-4 bg-brand-green/10 border border-brand-green/30 rounded-sm p-5 hover:bg-brand-green/20 hover:border-brand-green/60 transition-all duration-300 group text-left"
            >
              <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center flex-shrink-0">
                <MessageCircle size={22} className="text-white" />
              </div>
              <div>
                <div className="font-body font-semibold text-brand-light text-base group-hover:text-brand-green transition-colors duration-200">
                  Chat on WhatsApp
                </div>
                <div className="font-body text-sm text-brand-muted">
                  Quick response within 2 hours
                </div>
              </div>
            </button>

            {/* Phone */}
            <div className="flex items-center gap-4 bg-brand-dark-card border border-white/5 rounded-sm p-5">
              <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-brand-orange" />
              </div>
              <div>
                <div className="font-body text-xs text-brand-muted tracking-wide uppercase mb-0.5">
                  Phone
                </div>
                <a
                  href="tel:+916351622776"
                  className="font-body text-brand-light text-sm hover:text-brand-orange transition-colors duration-200"
                >
                  +91 63516 22776
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 bg-brand-dark-card border border-white/5 rounded-sm p-5">
              <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-brand-orange" />
              </div>
              <div>
                <div className="font-body text-xs text-brand-muted tracking-wide uppercase mb-0.5">
                  Email
                </div>
                <a
                  href="mailto:jigarchaudhary2005@gmail.com"
                  className="font-body text-brand-light text-sm hover:text-brand-orange transition-colors duration-200"
                >
                  jigarchaudhary2005@gmail.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4 bg-brand-dark-card border border-white/5 rounded-sm p-5">
              <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-brand-orange" />
              </div>
              <div>
                <div className="font-body text-xs text-brand-muted tracking-wide uppercase mb-0.5">
                  Location
                </div>
                <div className="font-body text-brand-light text-sm">
                  Based in Ahmedabad, Available Pan-India
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-brand-dark-card border border-white/5 rounded-sm p-5">
              <p className="font-body text-xs text-brand-muted tracking-[0.2em] uppercase font-semibold mb-4">
                Follow Jigar
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-sm bg-brand-dark border border-white/10 flex items-center justify-center hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all duration-200 group"
                  aria-label="Instagram"
                >
                  <SiInstagram
                    size={16}
                    className="text-brand-muted group-hover:text-brand-orange transition-colors duration-200"
                  />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-sm bg-brand-dark border border-white/10 flex items-center justify-center hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all duration-200 group"
                  aria-label="LinkedIn"
                >
                  <SiLinkedin
                    size={16}
                    className="text-brand-muted group-hover:text-brand-orange transition-colors duration-200"
                  />
                </a>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-sm bg-brand-dark border border-white/10 flex items-center justify-center hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all duration-200 group"
                  aria-label="YouTube"
                >
                  <SiYoutube
                    size={16}
                    className="text-brand-muted group-hover:text-brand-orange transition-colors duration-200"
                  />
                </a>
              </div>
            </div>

            {/* Availability note */}
            <div className="border border-brand-orange/20 bg-brand-orange/5 rounded-sm p-5">
              <p className="font-body text-sm text-brand-light/80 leading-relaxed">
                <span className="text-brand-orange font-semibold">
                  Currently accepting bookings
                </span>{" "}
                for college events, corporate workshops, and youth conferences
                across India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
