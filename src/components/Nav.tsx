/**
 * Navigation Component — Apple-Level Redesign 2025
 * Progressive reveal on scroll | Token-based | Smooth animations
 */

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { tokens } from "@/lib/tokens";
import { motionVariants } from "@/lib/motion-variants";

const links = [
  { href: "/about", label: "About", icon: null },
  { href: "/projects", label: "Projects", icon: null },
  { href: "/awards", label: "Recognition", icon: null },
  { href: "/contact", label: "Let's Connect", accent: true, icon: Sparkles },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { scrollY } = useScroll();

  // Progressive reveal: opacity and blur based on scroll
  const navOpacity = useTransform(scrollY, [0, 100], [0.5, 1]);
  const navBlur = useTransform(scrollY, [0, 100], [0, 24]);
  const logoScale = useTransform(scrollY, [0, 100], [1.1, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <motion.header
      style={{
        opacity: navOpacity,
        backdropFilter: scrolled ? `blur(${navBlur}px)` : "blur(0px)",
      }}
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 border-b border-white/60 shadow-soft"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="relative group">
          <motion.div
            style={{ scale: logoScale }}
            className="flex items-center gap-2"
          >
            {/* Logo Mark */}
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-br from-coral via-amber to-sky p-[2px] shadow-coral"
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.6, ease: tokens.motion.ease.appleEase }}
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="text-lg font-bold gradient-text">RA</span>
              </div>
            </motion.div>

            {/* Name */}
            <div className="hidden sm:flex flex-col leading-none">
              <motion.span
                className="text-lg font-bold text-primary tracking-tight"
                whileHover={{ letterSpacing: "0.05em" }}
                transition={{ duration: 0.3 }}
              >
                Rashmi Agarwal
              </motion.span>
              <span className="text-xs text-secondary tracking-wide">
                Cultural Curator
              </span>
            </div>
          </motion.div>

          {/* Hover glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, ${tokens.colors.coral.base}, ${tokens.colors.sky.base})`,
            }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.slice(0, -1).map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.1,
                duration: 0.3,
                ease: tokens.motion.ease.appleEase,
              }}
            >
              <Link
                to={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 group ${
                  isActive(link.href)
                    ? "text-coral"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {/* Active indicator */}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gradient-to-r from-coral/10 via-amber/10 to-sky/10 rounded-full border border-coral/20"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                {/* Hover underline */}
                <span className="relative z-10">{link.label}</span>
                <motion.span
                  className="absolute bottom-1 left-4 right-4 h-[2px] bg-gradient-to-r from-coral to-sky rounded-full opacity-0 group-hover:opacity-100"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.li>
          ))}

          {/* CTA Button */}
          <motion.li
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Link
              to={links[links.length - 1].href}
              className="btn btn-primary ml-2 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {links[links.length - 1].label}
                {links[links.length - 1].icon && (
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                )}
              </span>
            </Link>
          </motion.li>
        </ul>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden chip relative"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Drawer with Stagger Animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: tokens.motion.ease.appleEase }}
            className="md:hidden"
          >
            <div className="glass mx-4 mb-4 p-6 rounded-3xl border border-white/50 shadow-lg">
              <motion.ul
                className="flex flex-col gap-2"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
                initial="hidden"
                animate="visible"
              >
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{
                      duration: 0.3,
                      ease: tokens.motion.ease.appleEase,
                    }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-2xl transition-all duration-300 ${
                        link.accent
                          ? "btn btn-primary w-full text-center py-4 shadow-coral"
                          : `py-3 px-4 ${
                              isActive(link.href)
                                ? "bg-gradient-to-r from-coral/10 to-sky/10 text-coral font-semibold border border-coral/20"
                                : "text-secondary hover:bg-white/60 hover:text-primary"
                            }`
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {link.label}
                        {link.icon === Sparkles && <Sparkles className="w-5 h-5" />}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Mobile menu footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6 pt-6 border-t border-white/30"
              >
                <p className="text-xs text-center text-tertiary">
                  © {new Date().getFullYear()} Rashmi Agarwal
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
