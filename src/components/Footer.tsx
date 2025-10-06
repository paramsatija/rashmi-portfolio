/**
 * Footer Component - Sky & Warmth Edition
 * Minimal, clean footer with social links
 */

import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, ExternalLink } from "lucide-react";

const palette = {
  coral: "#FF6B4A",
  sky: "#4A9EFF",
  slate: "#2D3748",
  textSoft: "#4A5568",
};

const footerLinks = {
  navigation: [
    { label: "About", href: "/about" },
    { label: "Projects & Programs", href: "/projects" },
    { label: "Impact & Recognition", href: "/awards" },
    { label: "Contact", href: "/contact" },
  ],
  organizations: [
    { label: "MAPS International WLL", href: "#" },
    { label: "Qatar International Art Festival", href: "https://qiaf.net/", external: true },
    { label: "Al Thuraya Planetarium", href: "#" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com/rashmiagarwal", icon: Instagram },
    { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "Email", href: "mailto:contact@qiaf.org", icon: Mail },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-gray-200/50 bg-white/40 backdrop-blur-strong">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-xl gradient-text mb-4">
              Rashmi Agarwal
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: palette.textSoft }}>
              Cultural Diplomat, Entrepreneur, and Founder bridging art, business, and social impact.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: palette.slate }}>
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:gradient-text transition-all"
                    style={{ color: palette.textSoft }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizations */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: palette.slate }}>
              Organizations
            </h4>
            <ul className="space-y-2">
              {footerLinks.organizations.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:gradient-text transition-all inline-flex items-center gap-1"
                      style={{ color: palette.textSoft }}
                    >
                      {link.label}
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm hover:gradient-text transition-all"
                      style={{ color: palette.textSoft }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: palette.slate }}>
              Connect
            </h4>
            <div className="flex gap-3 mb-4">
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-frosted p-3 rounded-xl hover:scale-110 transition-transform"
                    aria-label={social.label}
                  >
                    <Icon size={20} style={{ color: palette.coral }} />
                  </a>
                );
              })}
            </div>
            <p className="text-xs" style={{ color: palette.textSoft }}>
              Doha, Qatar
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm" style={{ color: palette.textSoft }}>
            © {currentYear} Rashmi Agarwal. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs" style={{ color: palette.textSoft }}>
            <Link to="/contact" className="hover:gradient-text transition-all">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:gradient-text transition-all">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
