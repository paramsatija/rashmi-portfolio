"use client";

import React from "react";
import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import { Library, ArrowLeft } from "lucide-react";

/* ----------------------------- theme + animation ----------------------------- */
const soft = {
  blush: "#FFE3F4",
  petal: "#FFD1E8",
  lilac: "#E7D1FF",
  cream: "#FFF7EE",
  mist: "#F3EDFF",
  accent: "#FF3FA4",
  accent2: "#7C4DFF",
  ink: "#1F1A1D",
};
const spring: Transition = { type: "spring", stiffness: 120, damping: 16, mass: 0.6 };

const Section: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <section className={`mx-auto max-w-7xl px-4 ${className || ""}`}>{children}</section>
);
const Title: React.FC<{ kicker?: string; children: React.ReactNode }> = ({ kicker, children }) => (
  <div className="mb-6">
    {kicker ? <div className="mb-2 text-xs uppercase tracking-[0.2em] text-black/60">{kicker}</div> : null}
    <h1 className="text-3xl sm:text-4xl font-semibold" style={{ color: soft.ink }}>{children}</h1>
  </div>
);

/* ----------------------------- DATA (Cultural) ----------------------------- */
type PartnerItem = { name: string; city: string; status: string; blurb: string; logo: string };

const CULTURAL: PartnerItem[] = [
  // We have a real logo URL for Katara from your earlier INSTITUTIONS block:
  { name: "Katara Cultural Village", city: "Doha, Qatar", status: "Strategic", blurb: "Premier cultural destination hosting major art exhibitions and events.", logo: "https://i.postimg.cc/0yrsfhrW/image.png" },
  { name: "National Museum of Qatar", city: "Doha, Qatar", status: "Active", blurb: "Heritage preservation and cultural education initiatives.", logo: "https://placehold.co/200x120?text=NMoQ" },
  { name: "Fire Station — Artists in Residence", city: "Doha, Qatar", status: "Long-term", blurb: "International artist residencies and cultural exchange.", logo: "https://placehold.co/200x120?text=FS+AiR" },
  { name: "Qatar Philharmonic Orchestra", city: "Doha, Qatar", status: "Active", blurb: "Musical collaborations and cross-cultural performances.", logo: "https://placehold.co/200x120?text=QPO" },
  // From your INSTITUTIONS list with real logos:
  { name: "British Council Qatar", city: "Doha, Qatar", status: "Active", blurb: "Education & cultural exchange programs.", logo: "https://i.postimg.cc/TYV9sP5R/image.png" },
  { name: "Qatar Museums", city: "Doha, Qatar", status: "Active", blurb: "Collaborations across Qatar’s museum ecosystem.", logo: "https://i.postimg.cc/fyX6phYz/image.png" },
  { name: "321 Olympic & Sports Museum", city: "Doha, Qatar", status: "Active", blurb: "Sports, culture and education integration.", logo: "https://i.postimg.cc/TYnKqLLN/image.png" },
];

/* ---------------------------------- PAGE ---------------------------------- */
export default function CulturalPartnersPage() {
  return (
    <div className="min-h-screen" style={{ background: soft.cream }}>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-20 h-[60vh] w-[60vh] rounded-full blur-3xl" style={{ background: soft.blush, opacity: 0.5 }} />
        <div className="absolute -bottom-32 -right-24 h-[55vh] w-[55vh] rounded-full blur-3xl" style={{ background: soft.lilac, opacity: 0.45 }} />
      </div>

      <main className="mx-auto space-y-10 pt-20 pb-16">
        <Section>
          <div className="flex items-center justify-between gap-3 mb-2">
            <Link href="/impact#partners" className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-white" style={{ background: soft.accent2 }}>
              <ArrowLeft size={16} /> Back to Partnerships
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-sm shadow"><Library size={16} /> Cultural</span>
          </div>
          <Title kicker="Government & institutional">Cultural partners</Title>
          <p className="max-w-3xl text-black/75">
            Institutions, museums, and venues enabling large-scale exhibitions, residencies, and cross-disciplinary programs.
          </p>
        </Section>

        <Section>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CULTURAL.map((p, i) => (
              <motion.article
                key={`${p.name}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: i * 0.05 }}
                className="glass p-5 flex items-start gap-4 hover-lift"
              >
                <img src={p.logo} alt={`${p.name} logo`} className="h-14 w-24 object-contain shrink-0" />
                <div>
                  <div className="font-semibold" style={{ color: soft.ink }}>{p.name}</div>
                  <div className="text-xs text-black/60">{p.city} • {p.status}</div>
                  <p className="text-sm text-black/80 mt-2">{p.blurb}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/impact/partners/government" className="rounded-full px-4 py-2 bg-white shadow hover-lift">
              View Government
            </Link>
            <Link href="/impact/partners/embassy" className="rounded-full px-4 py-2 bg-white shadow hover-lift">
              View Embassies
            </Link>
            <Link href="/impact/partners/ngo" className="rounded-full px-4 py-2 bg-white shadow hover-lift">
              View NGOs
            </Link>
          </div>
        </Section>
      </main>
    </div>
  );
}
