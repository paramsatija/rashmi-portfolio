import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useEffect } from "react";
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
  const linkBase =
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition";
  const active =
    "bg-black/90 text-white shadow-sm";
  const inactive =
    "bg-white text-black/80 shadow hover:shadow-md";

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <NavLink to="/" className="font-semibold tracking-wide">
          MAPS • Rashmi Agarwal
        </NavLink>

        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
          >
            Projects
          </NavLink>
          <NavLink
            to="/awards"
            className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
            title="Impact & Recognition"
          >
            Impact
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
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
