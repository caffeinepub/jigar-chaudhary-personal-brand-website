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
import RegisterPage from './components/RegisterPage';

type Route = 'main' | 'admin' | 'register';

function getCurrentRoute(): Route {
  const hash = window.location.hash;
  const pathname = window.location.pathname;

  // Admin route
  if (pathname === '/admin') return 'admin';
  if (hash.startsWith('#/admin')) return 'admin';
  const hashPath = hash.replace(/^#/, '').split('?')[0];
  if (hashPath === '/admin' || hashPath === '/admin/') return 'admin';

  // Register route
  if (hash.startsWith('#/register')) return 'register';
  if (hashPath === '/register' || hashPath === '/register/') return 'register';

  return 'main';
}

export default function App() {
  const [route, setRoute] = useState<Route>(getCurrentRoute);

  useEffect(() => {
    const handleRouteChange = () => setRoute(getCurrentRoute());

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  if (route === 'admin') {
    return <AdminPanel />;
  }

  if (route === 'register') {
    return <RegisterPage />;
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
