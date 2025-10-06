"use client";

import React from "react";
import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import { Landmark, ArrowLeft, ArrowRight } from "lucide-react";

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

/* ----------------------------- shared mini-helpers ----------------------------- */
const Section: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <section className={`mx-auto max-w-7xl px-4 ${className || ""}`}>{children}</section>
);
const Title: React.FC<{ kicker?: string; children: React.ReactNode }> = ({ kicker, children }) => (
  <div className="mb-6">
    {kicker ? <div className="mb-2 text-xs uppercase tracking-[0.2em] text-black/60">{kicker}</div> : null}
    <h1 className="text-3xl sm:text-4xl font-semibold" style={{ color: soft.ink }}>{children}</h1>
  </div>
);

/* ----------------------------- DATA (Government) ----------------------------- */
type PartnerItem = { name: string; city: string; status: string; blurb: string; logo: string };

const GOVERNMENT: PartnerItem[] = [
  { name: "Ministry of Culture", city: "Doha, Qatar", status: "Strategic", blurb: "Strategic partnership for cultural initiatives and international arts programs.", logo: "https://placehold.co/200x120?text=MoC" },
  { name: "Ministry of Education", city: "Doha, Qatar", status: "Active", blurb: "Educational outreach programs and youth development initiatives.", logo: "https://placehold.co/200x120?text=MoE" },
  { name: "Ministry of Youth and Sports", city: "Doha, Qatar", status: "Active", blurb: "Youth empowerment through arts and cultural sports programs.", logo: "https://placehold.co/200x120?text=Sports" },
  { name: "Ministry of Foreign Affairs", city: "Doha, Qatar", status: "Strategic", blurb: "Cultural diplomacy and international cultural exchange programs.", logo: "https://placehold.co/200x120?text=MFA" },
  // Real QNL logo was not provided earlier—placeholder kept:
  { name: "Qatar National Library", city: "Doha, Qatar", status: "Active", blurb: "Literary and cultural programming in Qatar’s premier library space.", logo: "https://placehold.co/200x120?text=QNL" },
];

/* ---------------------------------- PAGE ---------------------------------- */
export default function GovernmentPartnersPage() {
  return (
    <div className="min-h-screen" style={{ background: soft.cream }}>
      {/* gentle background blobs */}
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
            <div className="inline-flex items-center gap-2 rounded-full glass-white px-3 py-1.5 text-sm shadow">
              <Landmark size={16} /> Government
            </div>
          </div>
          <Title kicker="Government & institutional">Government partners</Title>
          <p className="max-w-3xl text-black/75">
            Strategic ministries and national bodies collaborating on policy-aligned cultural initiatives, education, and international exchange.
          </p>
        </Section>

        <Section>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GOVERNMENT.map((p, i) => (
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
            <Link href="/impact/partners/embassy" className="rounded-full px-4 py-2 text-white btn-magnetic" style={{ background: soft.accent }}>
              View Embassies <ArrowRight size={16} />
            </Link>
            <Link href="/impact/partners/ngo" className="rounded-full px-4 py-2 glass-white shadow hover-lift">
              View NGOs
            </Link>
            <Link href="/impact/partners/cultural" className="rounded-full px-4 py-2 glass-white shadow hover-lift">
              View Cultural Partners
            </Link>
          </div>
        </Section>
      </main>
    </div>
  );
}
