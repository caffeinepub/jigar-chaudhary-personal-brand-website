import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Corporate', href: '#corporate' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-brand-dark/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.8)]'
            : 'bg-transparent'
        } ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}
        style={{ transitionProperty: 'transform, opacity, background-color, box-shadow' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col leading-none group"
          >
            <span className="font-display text-2xl md:text-3xl text-brand-light tracking-wider group-hover:text-brand-orange transition-colors duration-200">
              JIGAR
            </span>
            <span className="font-display text-xs text-brand-orange tracking-[0.3em] -mt-1">
              CHAUDHARY
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-body text-sm font-medium text-brand-muted hover:text-brand-light transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* Book Now CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleNavClick('#contact')}
              className="font-body text-sm font-semibold bg-brand-orange text-white px-5 py-2.5 rounded-sm hover:bg-brand-orange/90 hover:shadow-orange-glow transition-all duration-200 tracking-wide"
            >
              BOOK NOW
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-brand-light p-2 z-50 relative"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-brand-dark flex flex-col items-center justify-center transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-display text-4xl text-brand-light hover:text-brand-orange transition-colors duration-200 tracking-wider"
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms',
                transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
                opacity: mobileOpen ? 1 : 0,
                transition: 'transform 0.3s ease, opacity 0.3s ease, color 0.2s ease',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contact')}
            className="mt-4 font-body font-semibold bg-brand-orange text-white px-8 py-3 rounded-sm text-lg tracking-wide hover:bg-brand-orange/90 transition-colors duration-200"
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 60}ms` : '0ms',
              transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
              opacity: mobileOpen ? 1 : 0,
              transition: 'transform 0.3s ease, opacity 0.3s ease, background-color 0.2s ease',
            }}
          >
            BOOK NOW
          </button>
        </div>
      </div>
    </>
  );
}
