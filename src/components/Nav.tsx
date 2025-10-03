// src/components/Nav.tsx
"use client";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects & Programs" },
  // IMPORTANT: your Impact page file is Awards.tsx, so the route is /awards
  { href: "/awards", label: "Impact & Recognition" },
  { href: "/contact", label: "Contact", accent: true },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/50">
      <nav className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2">
          {/* Replace span with <img src="/logo.svg" .../> if you have a logo file */}
          <span className="font-title text-xl gradient-text">Rashmi Agarwal</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.slice(0, -1).map((l) => (
            <li key={l.href}>
              <Link
                to={l.href}
                className={`hover-lift ${
                  isActive(l.href) ? "gradient-text font-semibold" : ""
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          {/* Contact button */}
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
    </header>
  );
}
