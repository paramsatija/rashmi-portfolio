// src/pages/Impact.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, type Transition } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  Award as AwardIcon,
  Building2,
  Landmark,
  Globe,
  Users,
  Library,
  Sparkles,
} from "lucide-react";

// import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GradientBackground from "@/components/GradientBackground";
import OvalBreak from "@/components/OvalBreak";

/* ----------------------------- theme (from code 1) ----------------------------- */
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

/* ------------------------------- content (from code 2) ------------------------------- */
const HERO = {
  heading: "Impact & Recognition",
  subheading:
    "Government partnerships, diplomatic bridges and international media features — a decade of building cultural connections at scale.",
  ctas: [
    { label: "Propose a partnership", href: "/contact?type=partnership", internal: true },
    { label: "Explore programs", href: "/projects#qiaf-2025", internal: true },
  ],
  collage: [
    { src: "https://i.postimg.cc/YCZk2V3C/image.png", alt: "Recognition" },
    { src: "https://i.postimg.cc/MTzLzbhk/image.png", alt: "Feature" },
  ],
};

const NUMBERS = [
  { label: "Countries Reached", value: "70+" },
  { label: "Artists Connected", value: "400+" },
  { label: "Transformative Events", value: "150+" },
  { label: "Young Leaders Empowered", value: "5,000+" },
  { label: "Years of Excellence", value: "11+" },
  { label: "Media Mentions", value: "850+" },
];

const DIPLOMATS = [
  { name: "H.E. Teimuraz Kereselidze", title: "Ambassador of Georgia to Qatar", img: "https://i.postimg.cc/85rt5z7y/image.png" },
  { name: "Ms Pamela Cristina FRIAS DE LA ROSA", title: "Chargé d'Affaires, Dominican Republic", img: "https://i.postimg.cc/MZLtBR7L/image.png" },
  { name: "H.E. Erika Bernhard", title: "Austrian Ambassador to Qatar", img: "https://i.postimg.cc/HxhxxSCG/image.png" },
  { name: "H.E. Mr Vipul", title: "Indian Ambassador to Qatar", img: "https://i.postimg.cc/nzzMYX4S/image.png" },
  { name: "Mr Sachin Dinkar Shankpal", title: "1st Secretary Culture & Education, Indian Embassy", img: "https://i.postimg.cc/15CgXcDG/image.png" },
  { name: "H.E. Mr Pekka Voutilainen", title: "Ambassador of Finland to the State of Qatar", img: "https://i.postimg.cc/TYDw2M2c/image.png" },
];

type PartnerItem = { name: string; city: string; status: string; blurb: string; logo: string };
const PARTNERS: Record<"government" | "embassy" | "ngo" | "cultural", PartnerItem[]> = {
  government: [
    { name: "Ministry of Culture", city: "Doha, Qatar", status: "Strategic", blurb: "Strategic partnership for cultural initiatives and international arts programs.", logo: "https://placehold.co/160x100?text=MoC" },
    { name: "Ministry of Education", city: "Doha, Qatar", status: "Active", blurb: "Educational outreach programs and youth development initiatives.", logo: "https://placehold.co/160x100?text=MoE" },
    { name: "Ministry of Youth and Sports", city: "Doha, Qatar", status: "Active", blurb: "Youth empowerment through arts and cultural sports programs.", logo: "https://placehold.co/160x100?text=Sports" },
    { name: "Ministry of Foreign Affairs", city: "Doha, Qatar", status: "Strategic", blurb: "Cultural diplomacy and international cultural exchange programs.", logo: "https://placehold.co/160x100?text=MFA" },
    { name: "Qatar National Library", city: "Doha, Qatar", status: "Active", blurb: "Literary and cultural programming in Qatar’s premier library space.", logo: "https://placehold.co/160x100?text=QNL" },
  ],
  embassy: [
    { name: "Embassy of India", city: "Doha, Qatar", status: "Long-term", blurb: "Cultural collaboration featuring traditional celebrations and art exhibitions.", logo: "https://placehold.co/160x100?text=IN" },
    { name: "Embassy of France", city: "Doha, Qatar", status: "Active", blurb: "Franco-Qatari cultural exchange and artistic collaboration.", logo: "https://placehold.co/160x100?text=FR" },
    { name: "Embassy of Spain", city: "Doha, Qatar", status: "Active", blurb: "Spanish cultural programs with performances and artistic collaborations.", logo: "https://placehold.co/160x100?text=ES" },
    { name: "Embassy of Germany", city: "Doha, Qatar", status: "Active", blurb: "Contemporary art exhibitions and cultural education.", logo: "https://placehold.co/160x100?text=DE" },
    { name: "Embassy of UK", city: "Doha, Qatar", status: "Long-term", blurb: "Cultural heritage programs and literary festival collaborations.", logo: "https://placehold.co/160x100?text=UK" },
    { name: "Embassy of Austria", city: "Doha, Qatar", status: "Active", blurb: "Classical music and artistic exchanges.", logo: "https://placehold.co/160x100?text=AT" },
    { name: "Embassy of Georgia", city: "Doha, Qatar", status: "Active", blurb: "Cultural heritage programs and art exchange.", logo: "https://placehold.co/160x100?text=GE" },
    { name: "Embassy of Liberia", city: "Doha, Qatar", status: "Active", blurb: "Cultural exchange programs and community initiatives.", logo: "https://placehold.co/160x100?text=LR" },
    { name: "Embassy of Italy", city: "Doha, Qatar", status: "Active", blurb: "Italian cultural programming and arts collaboration.", logo: "https://placehold.co/160x100?text=IT" },
  ],
  ngo: [
    { name: "Education Above All", city: "Doha, Qatar", status: "Strategic", blurb: "Global education initiatives through cultural arts programming.", logo: "https://placehold.co/160x100?text=EAA" },
    { name: "Qatar Charity", city: "Doha, Qatar", status: "Long-term", blurb: "Community-focused cultural and educational development programs.", logo: "https://placehold.co/160x100?text=QC" },
    { name: "Reach Out to Asia", city: "Doha, Qatar", status: "Active", blurb: "Cross-cultural programs promoting Asian heritage and understanding.", logo: "https://placehold.co/160x100?text=ROTA" },
    { name: "Al Fakhoora", city: "Doha, Qatar", status: "Active", blurb: "Educational support and cultural development for underserved communities.", logo: "https://placehold.co/160x100?text=Fakhoora" },
  ],
  cultural: [
    { name: "Katara Cultural Village", city: "Doha, Qatar", status: "Strategic", blurb: "Premier cultural destination hosting major art exhibitions and events.", logo: "https://placehold.co/160x100?text=Katara" },
    { name: "National Museum of Qatar", city: "Doha, Qatar", status: "Active", blurb: "Heritage preservation and cultural education initiatives.", logo: "https://placehold.co/160x100?text=NMoQ" },
    { name: "Fire Station Artists in Residence", city: "Doha, Qatar", status: "Long-term", blurb: "International artist residencies and cultural exchange.", logo: "https://placehold.co/160x100?text=FS+AiR" },
    { name: "Qatar Philharmonic Orchestra", city: "Doha, Qatar", status: "Active", blurb: "Musical collaborations and cross-cultural performances.", logo: "https://placehold.co/160x100?text=QPO" },
  ],
};

const AWARDS_AND_MEDIA = [
  {
    title: "A Visionary at the Crossroads of Art, Business, and Social Impact",
    platform: "Huffmag",
    date: "July 2025",
    quote: "Truly honoured and deeply grateful to be featured as a visionary bridging art, business and impact.",
    link: "https://huffmag.com/rashmi-agarwal-a-visionary-at-the-crossroads-of-art-business-and-social-impact-2/",
    img: "https://i.postimg.cc/28GMwj4d/image.png",
  },
  {
    title: "Top Arab Cultural Leaders 2025",
    platform: "The Arab Leaders",
    date: "August 2025",
    quote: "Honored to be recognized among the Top Arab Cultural Leaders for 2025.",
    link: "https://thearableader.com/rashmi-agarwal-visionary-leader-fostering-cultural-dialogue-and-social-impact-throughart-and-innovation/",
    img: "https://i.postimg.cc/J0JT063V/image.png",
  },
  {
    title: "American Global Business Awards 2025",
    platform: "Summit Leaders Awards LLC (USA)",
    date: "October 2025 · Marrakech, Morocco",
    quote: "I am humbled to receive the American Global Business Awards 2025… reaffirming my commitment to purpose-driven leadership.",
    link: "https://www.linkedin.com/posts/businessawrads_agba2025-businessawards-globalsuccess-activity-7335009363742351360-S-yw?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEHCznIBtSb8OLzxtqaeHSwshSAUu5xvzsg",
    img: "https://i.postimg.cc/KYc03v8v/image.png",
  },
  {
    title: "Qatar Ministry of Culture Recognition",
    platform: "Ministry of Culture — State of Qatar",
    date: "2023–2024",
    quote: "Official recognition for outstanding contribution to Qatar's cultural landscape.",
    link: "#",
    img: "https://i.postimg.cc/jdrVN98Z/image.png",
  },
  {
    title: "Best NRI Women Entrepreneur",
    platform: "—",
    date: "2019",
    quote: "Celebrating exceptional leadership and innovation in cultural entrepreneurship.",
    link: "#",
    img: "https://i.postimg.cc/8cQCLcvk/image.png",
  },
  {
    title: "Asia Pride Award",
    platform: "—",
    date: "2018",
    quote: "Honoring significant contributions to Asian cultural heritage and social impact.",
    link: "#",
    img: "https://i.postimg.cc/qR9LPPtZ/image.png",
  },
];

const PRESS_OUTLETS = [
  { name: "Gulf Times", link: "#" },
  { name: "Qatar News Agency", link: "#" },
  { name: "Al Raya", link: "#" },
  { name: "Al Jazeera", link: "#" },
  { name: "Qatar TV", link: "#" },
  { name: "The Peninsula", link: "#" },
];

const PROGRAM_RECOGNITION = {
  title: "Space Program Recognition",
  by: "Al Thuraya Planetarium",
  context: "Katara Cultural Village",
  note: "Pioneering space science education and youth engagement.",
  link: "#",
};

const GROWTH_STEPS = [
  { year: 2019, text: "232 artists • 64 countries" },
  { year: 2021, text: "250+ artists • 65+ countries" },
  { year: 2025, text: "400+ artists • 70+ countries (target)" },
];

const MEDIA_GALLERY = [
  { src: "https://i.postimg.cc/k4Rb6xQs/image.png", caption: "QIAF panel discussion" },
  { src: "https://i.postimg.cc/xjWWzn2N/image.png", caption: "Live performance night" },
  { src: "https://i.postimg.cc/v8LWg4yT/image.png", caption: "Ambassadors’ meeting" },
  { src: "https://i.postimg.cc/ncXBd07F/image.png", caption: "Masterclass in session" },
  { src: "https://i.postimg.cc/0QVBPccc/image.png", caption: "Red carpet opening" },
  // keep content exactly as in code 2 (even if the URL looks off)
  { src: "https://i.postimg.cc/XvTn7hnh/image.pngs", caption: "American Global Business Awards 2025" },
];

/* ----------------------------- helpers (from code 1 style) ----------------------------- */
const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({ id, className, children }) => (
  <section id={id} className={`mx-auto max-w-7xl px-4 ${className || ""}`}>{children}</section>
);

const Title: React.FC<{ kicker?: string; children: React.ReactNode }> = ({ kicker, children }) => (
  <div className="mb-6">
    {kicker ? <div className="mb-2 text-xs uppercase tracking-[0.2em] text-black/60">{kicker}</div> : null}
    <h2 className="text-3xl sm:text-4xl font-semibold" style={{ color: soft.ink }}>{children}</h2>
  </div>
);

/** Shared reveal helper (single definition, used by bento tiles) */
const fadeUp = (i = 0) => ({
  initial: { opacity: 0, y: 14, filter: "saturate(70%)" },
  whileInView: { opacity: 1, y: 0, filter: "saturate(100%)" },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, delay: 0.05 * i },
});

/* --------------------------------- Hero (code 1 layout) --------------------------------- */
const ImpactHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yTop = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const yBottom = useTransform(scrollYProgress, [0, 1], ["0%", "44%"]);

  return (
    <section ref={heroRef} className="relative pt-24 pb-10">
      <GradientBackground />

      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* LEFT: words */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
            className="text-5xl sm:text-6xl lg:text-7xl leading-[0.95]"
            style={{
              WebkitTextStroke: "1px rgba(0,0,0,0.04)",
              backgroundImage: `linear-gradient(90deg, ${soft.accent} 0%, ${soft.accent2} 50%, ${soft.accent} 100%)`,
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {HERO.heading.split(" ")[0]} <span className="italic font-light">& Recognition</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.08 }}
            className="mt-4 max-w-2xl text-lg text-black/80"
          >
            {HERO.subheading}
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-3">
            {HERO.ctas.map((c, i) => (
              <Link
                key={c.label}
                to={c.href}
                className={i === 0 ? "rounded-full px-4 py-2 text-white shadow btn-magnetic" : "rounded-full px-4 py-2 shadow"}
                style={i === 0 ? { background: soft.accent } : { background: "#fff" }}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT: collage */}
        <div className="relative h-[420px]">
          <div
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] blur-3xl"
            style={{
              background: `radial-gradient(600px circle at 30% 20%, ${soft.accent}33, transparent),
                           radial-gradient(600px circle at 80% 70%, ${soft.accent2}33, transparent)`,
            }}
          />
          {HERO.collage[0] && (
            <motion.img
              style={{ y: yTop }}
              src={HERO.collage[0].src}
              alt={HERO.collage[0].alt}
              className="absolute right-2 top-2 h-64 w-[420px] rounded-3xl object-cover shadow-2xl border-4 border-white"
              loading="lazy"
            />
          )}
          {HERO.collage[1] && (
            <motion.img
              style={{ y: yBottom }}
              src={HERO.collage[1].src}
              alt={HERO.collage[1].alt}
              className="absolute left-0 bottom-0 h-40 w-72 rounded-2xl object-cover shadow-2xl border-4 border-white"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </section>
  );
};

/* --------------------------------- Numbers (code 1 layout) --------------------------------- */
const NumberGrid: React.FC = () => (
  <Section>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {NUMBERS.map((n, i) => (
        <motion.div
          key={n.label}
          className="rounded-3xl bg-white/85 p-6 text-center shadow"
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ...spring, delay: 0.05 * i }}
          viewport={{ once: true }}
        >
          <div className="text-4xl font-semibold gradient-text">{n.value}</div>
          <div className="mt-1 text-sm text-black/60">{n.label}</div>
        </motion.div>
      ))}
    </div>
  </Section>
);

/* ------------------------- Diplomatic meetings (code 1 layout) ------------------------- */
const DiplomaticGrid: React.FC = () => (
  <Section className="py-8">
    <Title kicker="Cultural diplomacy">Ambassador & Embassy Meetings</Title>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {DIPLOMATS.map((d, i) => (
        <motion.article
          key={d.name}
          className="overflow-hidden rounded-3xl bg-white/85 shadow hover:shadow-xl transition"
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ...spring, delay: 0.05 * i }}
          viewport={{ once: true }}
        >
          <div className="relative h-40 w-full">
            <img src={d.img} alt={d.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold" style={{ color: soft.ink }}>{d.name}</h3>
            <p className="text-sm text-black/70">{d.title}</p>
          </div>
        </motion.article>
      ))}
    </div>
  </Section>
);

/* --------------------------- Partnerships (category hub) --------------------------- */
const PartnershipsHub: React.FC = () => {
  const cards = [
    {
      key: "government" as const,
      title: "Government",
      href: "/impact/partners/government",
      icon: <Landmark className="w-7 h-7" />,
      count: PARTNERS?.government?.length ?? 0,
      blurb: "Strategic alliances shaping national cultural policy and education.",
      gradient: `linear-gradient(135deg, ${soft.accent2}22, ${soft.petal}55)`,
      ring: soft.accent2,
      buttonTone: soft.accent2,
    },
    {
      key: "embassy" as const,
      title: "Embassies",
      href: "/impact/partners/embassy",
      icon: <Globe className="w-7 h-7" />,
      count: PARTNERS?.embassy?.length ?? 0,
      blurb: "Cultural diplomacy and international exchange programs.",
      gradient: `linear-gradient(135deg, ${soft.accent}22, ${soft.lilac}55)`,
      ring: soft.accent,
      buttonTone: soft.accent,
    },
    {
      key: "ngo" as const,
      title: "NGOs",
      href: "/impact/partners/ngo",
      icon: <Users className="w-7 h-7" />,
      count: PARTNERS?.ngo?.length ?? 0,
      blurb: "Community impact through education and social development.",
      gradient: `linear-gradient(135deg, ${soft.accent2}22, ${soft.blush}55)`,
      ring: soft.accent2,
      buttonTone: soft.accent2,
    },
    {
      key: "cultural" as const,
      title: "Cultural",
      href: "/impact/partners/cultural",
      icon: <Library className="w-7 h-7" />,
      count: PARTNERS?.cultural?.length ?? 0,
      blurb: "Museums, venues, and institutions powering the arts ecosystem.",
      gradient: `linear-gradient(135deg, ${soft.accent}22, ${soft.mist}66)`,
      ring: soft.accent,
      buttonTone: soft.accent,
    },
  ];

  return (
    <Section className="py-16">
      <Title kicker="Government & institutional">Partnerships</Title>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.article
            key={c.key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring, delay: i * 0.05 }}
            className="relative overflow-hidden rounded-3xl p-5 shadow hover:shadow-xl hover:-translate-y-0.5 transition"
            style={{
              background: c.gradient,
              boxShadow: "0 22px 60px rgba(0,29,57,.12), 0 2px 6px rgba(0,0,0,.04)",
              border: "1px solid rgba(255,255,255,.5)",
            }}
          >
            {/* soft ring + subtle shine */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{ boxShadow: `inset 0 0 0 2px ${c.ring}33` }}
            />
            <div className="shine" />

            <div className="flex items-center justify-between">
              <div
                className="rounded-2xl p-2 bg-white/70 shadow"
                style={{ boxShadow: "0 6px 18px rgba(0,0,0,.08)" }}
              >
                {c.icon}
              </div>
              <span className="chip">{c.count} partners</span>
            </div>

            <h3 className="mt-4 text-xl font-semibold" style={{ color: soft.ink }}>
              {c.title}
            </h3>
            <p className="mt-1 text-sm text-black/70">{c.blurb}</p>

            <div className="mt-4">
              <Link
                to={c.href}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white btn-magnetic"
                style={{ background: c.buttonTone }}
              >
                View {c.title} partners <ArrowRight size={16} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <p className="text-xs text-black/50 mt-3">
        These tiles link to category pages (e.g. <code>/impact/partners/government</code>) where the full list is shown.
      </p>
    </Section>
  );
};

/* ----------------------------- Awards & Features (simple grid from code 1) ---------------------------- */
const AwardsMedia: React.FC = () => (
  <Section className="py-8">
    <Title kicker="Awards & Features">International recognition</Title>
    <div className="grid gap-6 md:grid-cols-2">
      {AWARDS_AND_MEDIA.map((a, i) => (
        <motion.article
          key={a.title}
          className="overflow-hidden rounded-3xl bg-white/85 shadow hover:shadow-xl transition"
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ...spring, delay: 0.05 * i }}
          viewport={{ once: true }}
        >
          <div className="relative h-48 w-full">
            <img src={a.img} alt={a.platform} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
          <div className="p-5">
            <div className="text-xs uppercase tracking-wide text-black/60">
              {a.platform} • {a.date}
            </div>
            <h3 className="mt-1 text-lg font-semibold" style={{ color: soft.ink }}>{a.title}</h3>
            <p className="mt-1 text-sm text-black/70">“{a.quote}”</p>
            <a
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-white hover-lift"
              style={{ background: soft.accent }}
            >
              Read feature <ExternalLink size={16} />
            </a>
          </div>
        </motion.article>
      ))}
    </div>
  </Section>
);

/* ------------------------ Awards/Media — Bento in One Rectangle (UPDATED) ------------------------ */
type AwardCard = {
  title: string;
  platform: string;
  date?: string;
  blurb?: string;        // SHORT description (1–2 lines)
  quote?: string;        // fallback if blurb absent
  link?: string;
  img: string;

  imgFit?: "cover" | "contain";       // default 'contain'
  imgPosition?: "center" | "top" | "bottom" | "left" | "right"; // default 'center'
  imgBg?: string;                     // Tailwind color class for letterbox (default 'bg-white')
};

const normalize = (s: string) => (s || "").toLowerCase();

// Slot plan (unchanged): big, tall, two smalls, bottom wide, bottom extra-wide
const ORDER = [
  "arab women leaders",               // [0] Large feature (left)
  "huffmag visionary at crossroads",  // [1] Tall feature (right)
  "best nri women entrepreneur",      // [2] small mid
  "asia award",                       // [3] small mid
  "qatar ministry of culture",        // [4] bottom wide
  "american business global awards",  // [5] bottom extra-wide
];

// Default image rules: show full logos/plaques without cropping
const FIT_RULES: Record<string, Partial<AwardCard>> = {
  "arab women leaders":              { imgFit: "contain", imgPosition: "center", imgBg: "bg-white" },
  "american business global awards": { imgFit: "contain", imgPosition: "center", imgBg: "bg-white" },
  "huffmag visionary at crossroads": { imgFit: "contain", imgPosition: "center", imgBg: "bg-white" },
  "best nri women entrepreneur":     { imgFit: "contain", imgPosition: "center", imgBg: "bg-white" },
  "asia award":                      { imgFit: "contain", imgPosition: "center", imgBg: "bg-white" },
  "qatar ministry of culture":       { imgFit: "contain", imgPosition: "center", imgBg: "bg-white" },
};

const applyImageRules = (item: AwardCard): AwardCard => {
  const key = normalize(`${item.platform} ${item.title}`);
  const ruleKey = Object.keys(FIT_RULES).find(k => key.includes(k)) || "";
  const rules = FIT_RULES[ruleKey] || {};
  return {
    ...item,
    imgFit: rules.imgFit ?? "contain",
    imgPosition: (rules.imgPosition as AwardCard["imgPosition"]) ?? "center",
    imgBg: rules.imgBg ?? "bg-white",
  };
};

const placeSix = (items: AwardCard[]) => {
  const withRules = items.map(applyImageRules);
  const pick = (token: string) =>
    withRules.find(it => normalize(`${it.platform} ${it.title}`).includes(token)) || null;

  const picked: AwardCard[] = [];
  for (const token of ORDER) {
    const f = pick(token);
    if (f && !picked.includes(f)) picked.push(f);
  }
  for (const it of withRules) {
    if (picked.length >= 6) break;
    if (!picked.includes(it)) picked.push(it);
  }
  return picked.slice(0, 6);
};

const imgFitClass = (fit?: "cover" | "contain") =>
  fit === "cover" ? "object-cover" : "object-contain";

const imgPosClass = (pos?: AwardCard["imgPosition"]) => {
  switch (pos) {
    case "top": return "object-top";
    case "bottom": return "object-bottom";
    case "left": return "object-left";
    case "right": return "object-right";
    default: return "object-center";
  }
};

/** Two-part bento card: image on top (contain), short text bottom */
const BentoTile: React.FC<{
  item: AwardCard;
  className?: string;
  priority?: boolean;
}> = ({ item, className = "", priority }) => (
  <motion.article
    {...fadeUp()}
    className={`relative flex flex-col overflow-hidden rounded-2xl bg-white/90 shadow-sm ring-1 ring-black/5 ${className}`}
  >
    {/* TOP: media (fixed safe height for consistency) */}
    <div className={`relative w-full ${item.imgBg ?? "bg-white"} rounded-t-2xl`}>
      <div className="w-full h-32 sm:h-36 md:h-40 lg:h-44" />
      <img
        src={item.img}
        alt={item.platform || item.title}
        className={`absolute inset-0 h-full w-full ${imgFitClass(item.imgFit)} ${imgPosClass(item.imgPosition)}`}
        loading={priority ? "eager" : "lazy"}
      />
    </div>

    {/* BOTTOM: content */}
    <div className="flex flex-col gap-1.5 p-3 sm:p-4">
      <div className="flex items-center gap-2 text-[12px] sm:text-xs text-neutral-700">
        <AwardIcon className="h-4 w-4 shrink-0 text-neutral-800" />
        <span className="font-semibold">{item.platform}</span>
        {item.date && <span className="opacity-70">• {item.date}</span>}
      </div>

      <h3 className="text-[14px] sm:text-base font-semibold text-neutral-900 leading-snug line-clamp-2">
        {item.title}
      </h3>

      {(item.blurb || item.quote) && (
        <p className="text-[12px] sm:text-sm text-neutral-700 line-clamp-2">
          {item.blurb ?? item.quote}
        </p>
      )}

      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-neutral-900 px-3 py-1.5 text-[12px] sm:text-sm font-medium text-white hover:opacity-90"
        >
          Read feature <ExternalLink size={14} />
        </a>
      )}
    </div>
  </motion.article>
);

export const AwardsMediaBento: React.FC = () => {
  // Use your existing data array
  const items = (AWARDS_AND_MEDIA as unknown as AwardCard[]) || [];
  const six = placeSix(items);
  const extra = items.filter(it => !six.includes(it));

  return (
    <Section className="py-8">
      <Title kicker="Awards & Features">International recognition</Title>

      {/* One big rounded container */}
      <div className="relative overflow-hidden rounded-3xl bg-white/80 p-4 sm:p-6 shadow">
        {/* brand glow background */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] blur-3xl"
          style={{
            background: `radial-gradient(600px circle at 30% 20%, ${soft.accent}22, transparent),
                         radial-gradient(600px circle at 80% 70%, ${soft.accent2}22, transparent)`,
          }}
        />

        {/* Bento grid inside the rectangle */}
        <div
          className="
            grid gap-3 sm:gap-4
            md:grid-cols-12
            auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[150px]
          "
        >
          {/* Large feature (left) */}
          {six[0] && (
            <BentoTile
              item={six[0]}
              priority
              className="md:col-span-7 md:row-span-3 h-[300px] sm:h-[360px] md:h-full rounded-3xl"
            />
          )}

          {/* Tall feature (right) */}
          {six[1] && (
            <BentoTile
              item={six[1]}
              className="md:col-span-5 md:row-span-3 rounded-3xl"
            />
          )}

          {/* Middle smalls */}
          {six[2] && (
            <BentoTile item={six[2]} className="md:col-span-4 md:row-span-2 rounded-2xl" />
          )}
          {six[3] && (
            <BentoTile item={six[3]} className="md:col-span-4 md:row-span-2 rounded-2xl" />
          )}

          {/* Bottom wides */}
          {six[4] && (
            <BentoTile item={six[4]} className="md:col-span-4 md:row-span-2 rounded-2xl" />
          )}
          {six[5] && (
            <BentoTile item={six[5]} className="md:col-span-8 md:row-span-2 rounded-2xl" />
          )}
        </div>

        {/* Extra items row (optional) */}
        {extra.length > 0 && (
          <div className="mt-4 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extra.map((it, i) => (
              <BentoTile key={`${it.title}-${i}`} item={applyImageRules(it)} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

/* --------------------------- Growth timeline (code 1 layout) --------------------------- */
const GrowthTimeline: React.FC = () => (
  <Section>
    <Title kicker="Trajectory">Growth in participation</Title>
    <p className="text-sm text-black/70 mb-6">Note: QIAF is now integrated into Qatar’s educational calendar.</p>
    <div className="relative overflow-hidden rounded-3xl bg-white/80 p-6 shadow">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {GROWTH_STEPS.map((g, i) => (
          <motion.div
            key={g.year}
            className="rounded-2xl bg-white p-6 text-center shadow"
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ...spring, delay: 0.06 * i }}
            viewport={{ once: true }}
          >
            <Building2 className={`w-10 h-10 mx-auto mb-3 ${i === 2 ? "text-ink" : "text-accent-500"}`} />
            <div className={`text-3xl font-semibold ${i === 2 ? "" : "gradient-text"}`}>{g.year}</div>
            <div className="text-sm text-black/70 mt-1">{g.text}</div>
          </motion.div>
        ))}
      </div>
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] blur-2xl"
        style={{
          background: `radial-gradient(600px circle at 30% 20%, ${soft.accent}22, transparent),
                       radial-gradient(600px circle at 80% 70%, ${soft.accent2}22, transparent)`,
        }}
      />
    </div>
  </Section>
);

/* ----------------------------- Media gallery (code 1 layout) ---------------------------- */
const MediaMasonry: React.FC = () => (
  <Section className="py-8">
    <Title kicker="Highlights">Media gallery</Title>
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [column-fill:_balance]">
      {MEDIA_GALLERY.map((g, i) => (
        <motion.figure
          key={`${g.src}-${i}`}
          className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-white/85 shadow"
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ...spring, delay: 0.04 * i }}
          viewport={{ once: true }}
        >
          <img src={g.src} alt={g.caption} className="max-h-[480px] w-full object-cover" />
          <figcaption className="p-3 text-sm text-black/70">{g.caption}</figcaption>
        </motion.figure>
      ))}
    </div>
  </Section>
);

/* ----------------------------- Featured Press + Space Program (code 1 vibe) ---------------------------- */
const FeaturedPressAndProgram: React.FC = () => (
  <Section className="py-8">
    <Title kicker="Media">Featured Recognition — Media</Title>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
      {PRESS_OUTLETS.map((m, i) => (
        <motion.a
          key={m.name}
          href={m.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03 }}
          className="glass p-4 hover-lift flex items-center justify-between"
        >
          <div className="font-semibold" style={{ color: soft.ink }}>{m.name}</div>
          <ExternalLink size={16} className="text-accent-500 shrink-0" />
        </motion.a>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass p-6 flex items-start gap-3"
    >
      <Sparkles className="w-6 h-6 text-accent-500 mt-1 shrink-0" />
      <div>
        <div className="font-semibold" style={{ color: soft.ink }}>{PROGRAM_RECOGNITION.title}</div>
        <p className="text-sm text-ink/70 mt-1">
          {PROGRAM_RECOGNITION.by}, {PROGRAM_RECOGNITION.context} — {PROGRAM_RECOGNITION.note}
        </p>
        <a
          href={PROGRAM_RECOGNITION.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent-500 font-semibold mt-2"
        >
          Learn more <ExternalLink size={16} />
        </a>
      </div>
    </motion.div>
  </Section>
);

/* --------------------------------- Final CTA (code 1 layout) -------------------------------- */
const FinalCTA: React.FC = () => (
  <Section className="pb-24">
    <div className="grid items-center gap-6 rounded-3xl bg-white/80 p-8 shadow md:grid-cols-[1.2fr_1fr]">
      <div>
        <h3 className="text-2xl font-semibold" style={{ color: soft.ink }}>
          Let’s build the next cultural bridge.
        </h3>
        <p className="mt-2 text-black/70">
          Talk to MAPS International about partnerships, media, or ambassadorial collaborations.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/contact?type=partnership"
            className="rounded-full px-4 py-2 text-white btn-magnetic"
            style={{ background: soft.accent }}
          >
            Contact MAPS International
          </Link>
          <Link
            to="/projects"
            className="rounded-full px-4 py-2"
            style={{ background: "white" }}
          >
            Explore Projects
          </Link>
        </div>
      </div>
      <div className="relative h-36 overflow-hidden rounded-2xl">
        <motion.div
          className="absolute inset-0"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0 2px, transparent 2px 24px)",
          }}
        />
      </div>
    </div>
  </Section>
);

/* -------------------------------- page -------------------------------- */
export default function Impact() {
  useEffect(() => {
    document.title = "Impact & Recognition — Rashmi Agarwal";
  }, []);

  return (
    <div className="min-h-screen" style={{ background: soft.cream }}>
      {/* soft layered background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-20 h-[60vh] w-[60vh] rounded-full blur-3xl" style={{ background: soft.blush, opacity: 0.5 }} />
        <div className="absolute -bottom-32 -right-24 h-[55vh] w-[55vh] rounded-full blur-3xl" style={{ background: soft.lilac, opacity: 0.45 }} />
      </div>

      {/* <Nav /> */}

      <main className="mx-auto space-y-16">
        <ImpactHero />
        <NumberGrid />

        <OvalBreak
          src="https://i.postimg.cc/C53XpT0r/image.png"
          alt="Diplomatic collaboration"
          className="px-4"
        />

        <DiplomaticGrid />
        <PartnershipsHub />
      
        <OvalBreak
          src="https://i.postimg.cc/cHpG08Mb/image.png"
          alt="Cultural evening"
          className="px-4"
        />

        {/* Bento version with image-top, text-bottom cards */}
        <AwardsMediaBento />
        <FeaturedPressAndProgram />
        <GrowthTimeline />
        <MediaMasonry />
        <FinalCTA />
      </main>

      <Footer customText="© 2025 Rashmi Agarwal — Impact & Recognition." />
    </div>
  );
}
