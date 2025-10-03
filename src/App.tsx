import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

/* -------------------- Pages -------------------- */
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
/** Awards page = Impact & Recognition */
import Awards from "./pages/Awards";
import NotFound from "./pages/NotFound";

/* -------------------- Query client -------------------- */
const queryClient = new QueryClient();

/* -------------------- App -------------------- */
const App = () => {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Shared layout wraps all main routes */}
            <Route element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/awards" element={<Awards />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

/* ==================================================================== */
/* -------------------- Helpers / Inline Components -------------------- */
/* ==================================================================== */

/** Scroll to the top on route change (Lenis-friendly). */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Let the next tick happen so route content mounts, then scroll.
    const id = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }));
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}

/** Minimal site layout with accessible header/footer. */
function Layout() {
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--app-bg,#FFF7EE)] text-[var(--app-ink,#1F1A1D)]">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 rounded bg-white px-3 py-2 shadow"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="content" tabIndex={-1} className="flex-1">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects & Programs" },
    // NOTE: the route stays /awards, only the label changes:
    { href: "/awards", label: "Rewards & Recognitions" },
    { href: "/contact", label: "Contact", accent: true },
  ];

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className="w-full sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/50"
    >
      <nav className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-title text-xl gradient-text">Rashmi Agarwal</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-2">
          {links.slice(0, -1).map((l) => (
            <li key={l.href} className="relative">
              <Link
                to={l.href}
                className={`relative inline-flex items-center rounded-full px-3 py-1.5 transition hover:translate-y-[-1px]
                  ${isActive(l.href) ? "text-white" : "text-black/80 hover:text-black"}`}
              >
                {/* Animated active pill */}
                <AnimatePresence>
                  {isActive(l.href) && (
                    <motion.span
                      layoutId="navActive"
                      className="absolute inset-0 -z-10 rounded-full bg-black/90 shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
                {l.label}
              </Link>
            </li>
          ))}
          {/* Contact button (accent) */}
          <li>
            <Link
              to={links[links.length - 1].href}
              className="btn btn-accent btn-magnetic"
            >
              {links[links.length - 1].label}
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden chip"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          Menu
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="glass mx-4 mt-2 p-4">
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className={`block ${
                    l.accent
                      ? "btn btn-accent w-full text-center"
                      : `py-2 ${isActive(l.href) ? "gradient-text font-semibold" : ""}`
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.header>
  );
}


function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/5">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-black/60 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>© {year} Rashmi Agarwal — All rights reserved.</div>
        <div className="flex gap-3">
          <a href="/awards" className="underline decoration-dotted">Impact & Recognition</a>
          <a href="/projects" className="underline decoration-dotted">Projects</a>
          <a href="/contact" className="underline decoration-dotted">Work with us</a>
        </div>
      </div>
    </footer>
  
  );
}
