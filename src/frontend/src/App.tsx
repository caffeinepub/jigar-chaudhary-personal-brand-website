import { useEffect, useState } from "react";
import About from "./components/About";
import AdminPanel from "./components/AdminPanel";
import CTABanner from "./components/CTABanner";
import Contact from "./components/Contact";
import Corporate from "./components/Corporate";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import MediaCertifications from "./components/MediaCertifications";
import Navigation from "./components/Navigation";
import Programs from "./components/Programs";
import RegisterPage from "./components/RegisterPage";
import Testimonials from "./components/Testimonials";
import Zindagi30 from "./components/Zindagi30";

type Route = "main" | "admin" | "register" | "zindagi30";

function getCurrentRoute(): Route {
  const hash = window.location.hash;
  const pathname = window.location.pathname;

  // Admin route
  if (pathname === "/admin") return "admin";
  if (hash.startsWith("#/admin")) return "admin";
  const hashPath = hash.replace(/^#/, "").split("?")[0];
  if (hashPath === "/admin" || hashPath === "/admin/") return "admin";

  // Register route
  if (hash.startsWith("#/register")) return "register";
  if (hashPath === "/register" || hashPath === "/register/") return "register";

  // Zindagi 3.0 route
  if (hash.startsWith("#/zindagi30")) return "zindagi30";
  if (hashPath === "/zindagi30" || hashPath === "/zindagi30/")
    return "zindagi30";

  return "main";
}

export default function App() {
  const [route, setRoute] = useState<Route>(getCurrentRoute);

  useEffect(() => {
    const handleRouteChange = () => setRoute(getCurrentRoute());

    window.addEventListener("hashchange", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  if (route === "admin") {
    return <AdminPanel />;
  }

  if (route === "register") {
    return <RegisterPage />;
  }

  if (route === "zindagi30") {
    return <Zindagi30 />;
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
