/**
 * Footer Component
 * Consistent footer across all pages with social links and copyright
 */

import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";

interface FooterProps {
  customText?: string;
}

export default function Footer({ customText }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-ice-200 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-accent text-2xl gradient-text-warm mb-2">
              Rashmi Agarwal
            </h3>
            <p className="text-sm text-ice-200/80">
              Cultural Strategist & Designer
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-title font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link
                to="/projects"
                className="text-sm hover:text-sky-300 transition-colors"
              >
                Projects & Programs
              </Link>
              <Link
                to="/about"
                className="text-sm hover:text-sky-300 transition-colors"
              >
                About
              </Link>
              <Link
                to="/awards"
                className="text-sm hover:text-sky-300 transition-colors"
              >
                Awards & Recognition
              </Link>
              <Link
                to="/contact"
                className="text-sm hover:text-sky-300 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-title font-semibold mb-3">Connect</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/rashmiagarwal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:rashmi@example.com"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-sm text-ice-200/60">
          <p>
            {customText ||
              `© ${currentYear} Rashmi Agarwal — Cultural Strategist & Designer.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
