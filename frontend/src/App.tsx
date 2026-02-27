import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Corporate from './components/Corporate';
import Testimonials from './components/Testimonials';
import MediaCertifications from './components/MediaCertifications';
import CTABanner from './components/CTABanner';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function getIsAdminRoute(): boolean {
  const hash = window.location.hash;
  const pathname = window.location.pathname;

  // Check pathname-based routing
  if (pathname === '/admin') return true;

  // Parse the hash: strip the leading '#', then get the path portion
  // before any '?' or additional params
  // Handles: #/admin, #/admin?foo=bar, #/admin/
  if (hash.startsWith('#/admin')) return true;

  // Also handle hash like #/admin with query string inside hash
  const hashPath = hash.replace(/^#/, '').split('?')[0];
  if (hashPath === '/admin' || hashPath === '/admin/') return true;

  return false;
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(getIsAdminRoute);

  useEffect(() => {
    const handleHashChange = () => setIsAdmin(getIsAdminRoute());
    const handlePopState = () => setIsAdmin(getIsAdminRoute());

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Programs />
        <Corporate />
        <Testimonials />
        <MediaCertifications />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
