import { Heart } from 'lucide-react';
import { SiInstagram, SiLinkedin, SiYoutube } from 'react-icons/si';

const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/the_jigara?igsh=MThkY2V3andqbHJkbA==',
  youtube: 'https://youtube.com/@the_jigara?si=TbPBh5u_wpsy-1hS',
  linkedin: 'https://www.linkedin.com/in/jigar-chaudhary-8573ab251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
};

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Corporate', href: '#corporate' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const appId = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'jigar-chaudhary'
  );

  return (
    <footer className="bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col leading-none mb-4 group"
            >
              <span className="font-display text-3xl text-brand-light tracking-wider group-hover:text-brand-orange transition-colors duration-200">
                JIGAR
              </span>
              <span className="font-display text-sm text-brand-orange tracking-[0.3em] -mt-1">
                CHAUDHARY
              </span>
            </button>
            <p className="font-display text-xl text-brand-muted tracking-wider mb-4">
              Ignite. Grow. Lead.
            </p>
            <p className="font-body text-xs text-brand-muted leading-relaxed max-w-xs">
              India's boldest youth trainer and experiential facilitator, transforming young minds one session at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-body text-xs text-brand-muted tracking-[0.2em] uppercase font-semibold mb-5">
              Quick Links
            </p>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="font-body text-sm text-brand-muted hover:text-brand-orange transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <p className="font-body text-xs text-brand-muted tracking-[0.2em] uppercase font-semibold mb-5">
              Connect
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-sm bg-brand-dark-card border border-white/10 flex items-center justify-center hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all duration-200 group"
              >
                <SiInstagram size={14} className="text-brand-muted group-hover:text-brand-orange transition-colors duration-200" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-sm bg-brand-dark-card border border-white/10 flex items-center justify-center hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all duration-200 group"
              >
                <SiLinkedin size={14} className="text-brand-muted group-hover:text-brand-orange transition-colors duration-200" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-sm bg-brand-dark-card border border-white/10 flex items-center justify-center hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all duration-200 group"
              >
                <SiYoutube size={14} className="text-brand-muted group-hover:text-brand-orange transition-colors duration-200" />
              </a>
            </div>
            <button
              onClick={() => handleNavClick('#contact')}
              className="font-body text-sm font-semibold bg-brand-orange text-white px-5 py-2.5 rounded-sm hover:bg-brand-orange/90 transition-all duration-200 tracking-wide"
            >
              Book a Session
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-brand-muted">
            © {new Date().getFullYear()} Jigar Chaudhary. All Rights Reserved.
          </p>
          <p className="font-body text-xs text-brand-muted flex items-center gap-1.5">
            Built with{' '}
            <Heart size={12} className="text-brand-orange fill-brand-orange" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-orange hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
