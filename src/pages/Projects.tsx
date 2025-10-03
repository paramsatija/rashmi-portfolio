/**
 * Projects & Programs — Rashmi Agarwal
 * Captures all structured content provided (hero collage, flagships overview, breaks, QIAF timeline,
 * YOUTH Platform focus areas, KSSP w/ partners & metrics, Cultural Exchange, Legacy Projects, final CTAs).
 */

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Users,
  Globe,
  Award,
  Rocket,
  Stars,
  Target,
  GraduationCap,
  Sparkles,
} from "lucide-react";

// import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GradientBackground from "@/components/GradientBackground";
import OvalBreak from "@/components/OvalBreak";

/* ----------------------------- content (from spec) ----------------------------- */

const HERO = {
  heading: "Projects & Programs",
  subheading:
    "A living ecosystem of cultural festivals, youth innovation and science education — building bridges across 70+ countries.",
  ctas: [
    { label: "Join QIAF", href: "/contact?type=qiaf", type: "internal" as const },
    { label: "Partner with MAPS International", href: "/contact?type=partnership", type: "internal" as const },
  ],
  collage: [
    { src: "https://i.postimg.cc/X7qKp7DK/mapsimg2025.jpg", alt: "Festival" },
    { src: "https://i.postimg.cc/8ctFTMSD/qiafimg2025.jpg", alt: "Youth program" },
    { src: "https://i.postimg.cc/yY0RJgyF/qiaf7thed.jpg", alt: "Space science" },
  ],
};

const OUR_PROJECTS_INTRO = {
  title: "Our Projects",
  blurb: "Discover our complete portfolio of cultural initiatives and programs.",
};

const FLAGSHIPS = [
  {
    key: "qiaf",
    title: "QIAF — Qatar International Art Festival",
    category: "Arts & Culture",
    status: "Legacy",
    summary:
      "One of the world's most celebrated art gatherings, connecting 400+ artists from 70+ countries across 7+ editions and 15 major event components. Now integrated in Qatar’s educational calendar.",
    metrics: [
      { label: "editions", value: "7+" },
      { label: "artists", value: "400+" },
      { label: "countries", value: "70+" },
    ],
    cta: { label: "View Project", href: "/projects#qiaf-2025" },
    image: {
      src: "https://qiaf.net/wp-content/uploads/2021/11/249411972_10165732106720113_24742049591562404_n-700x441.jpg.webp",
      alt: "QIAF highlight",
    },
  },
  {
    key: "youth-platform",
    title: "The YOUTH Platform — Coming Soon",
    category: "Youth & Innovation",
    status: "Coming Soon",
    summary:
      "A comprehensive 3-day mega event empowering 500+ young innovators across 8 focus areas spanning technology, arts, culture and STEM. Launching soon with 50+ institutions.",
    metrics: [
      { label: "focus areas", value: "8+" },
      { label: "youth engaged", value: "500+" },
      { label: "institutions", value: "50+" },
    ],
    focus_areas: [
      "Hackathons",
      "Bootcamps",
      "Leadership",
      "Media & Design",
      "STEM Labs",
      "Social Impact",
      "Careers",
      "Wellbeing",
    ],
    cta: { label: "Register interest", href: "/contact?type=youth" },
    image: {
      src: "https://placehold.co/1200x800?text=YOUTH+Platform",
      alt: "The YOUTH Platform (placeholder)",
    },
  },
  {
    key: "kssp",
    title: "Katara Space Science Program (KSSP)",
    category: "Education & STEM",
    status: "Legacy",
    summary:
      "A groundbreaking multi-edition space science program featuring rocket launches, telescope building, and direct interaction with NASA and ISRO scientists.",
    metrics: [
      { label: "editions", value: "6+" },
      { label: "total participants (6 months)", value: "3000+" },
      { label: "students", value: "551+" },
    ],
    partners: [
      { name: "NASA", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg" },
      { name: "ISRO", logo: "https://i.postimg.cc/L5wrSJhj/image.png" },
      { name: "Canadian Space Agency", logo: "https://i.postimg.cc/3N5cfPqB/image.png" },
      { name: "Al Thuraya Planetarium", logo: "https://i.postimg.cc/05VSfpJs/image.png" },
    ],
    cta: { label: "View Project", href: "/projects#kssp" },
    image: { src: "https://i.postimg.cc/TPT33QRd/image.png", alt: "KSSP session" },
  },
];

const BREAK_1 = { src: "https://i.postimg.cc/MTzLzbhk/image.png", alt: "Festival moments" };
const BREAK_2 = { src: "https://i.postimg.cc/YCZk2V3C/image.png", alt: "Ambassador meets" };

const QIAF_TIMELINE = {
  id: "qiaf-2025",
  title_kicker: "Flagship",
  title: "Qatar International Art Festival (QIAF)",
  note: "Snapshot from recent editions; see overview above for full legacy.",
  timeline: [
    {
      year: 2019,
      headline: "232 artists • 64 countries",
      stats: "Second edition. Doha’s art scene blossoms with cross-cultural showcases.",
      image: { src: "https://i.postimg.cc/63hS55bb/image.png", alt: "2019 highlight" },
    },
    {
      year: 2021,
      headline: "250+ artists • 65+ countries",
      stats: "Third edition. Larger symposiums, masterclasses and panel talks.",
      image: { src: "https://i.postimg.cc/XY0wxcYd/image.png", alt: "2021 highlight" },
    },
    {
      year: 2024,
      headline: "Expanded international participation",
      stats: "Sixth edition. Fashion x art integrations and live performances.",
      image: {
        src: "https://qiaf.net/wp-content/uploads/2021/11/249411972_10165732106720113_24742049591562404_n-700x441.jpg.webp",
        alt: "2024 highlight",
      },
    },
    {
      year: 2025,
      headline: "7th Edition • Dec 7–12 • Katara, Doha",
      stats:
        "Theme: Sustainability & Innovation in Art. Expected 400+ artists from 70+ countries.",
      image: { src: "https://i.postimg.cc/fbdJVkXn/image.png", alt: "2025 highlight" },
    },
  ],
  ctas: [
    { label: "Apply to participate", href: "/contact?type=qiaf", type: "internal" as const },
    { label: "Official QIAF site", href: "https://qiaf.net/", type: "external" as const },
  ],
};

const YOUTH_SECTION = {
  id: "youth-platform",
  title_kicker: "Programs",
  title: "The YOUTH Platform — 8 Focus Areas",
  description:
    "A 3-day mega event (coming soon) empowering 500+ youth across technology, arts, culture and STEM—co-created with 50+ institutions.",
  focus_cards: [
    { icon: "⚡️", title: "Hackathons", blurb: "Sprint challenges for real impact." },
    { icon: "🎯", title: "Bootcamps", blurb: "Skill accelerators in tech & arts." },
    { icon: "🧭", title: "Leadership", blurb: "Programs that shape tomorrow." },
    { icon: "🎬", title: "Media & Design", blurb: "From storytelling to UX." },
    { icon: "🧪", title: "STEM Labs", blurb: "Hands-on maker culture." },
    { icon: "🤝", title: "Social Impact", blurb: "Community & volunteering." },
    { icon: "💼", title: "Careers", blurb: "Mentors, portfolio & pitch days." },
    { icon: "🧘‍♀️", title: "Wellbeing", blurb: "Mindfulness & creativity." },
  ],
  ctas: [{ label: "Register interest", href: "/contact?type=youth", type: "internal" as const }],
};

const KSSP_SECTION = {
  id: "kssp",
  title_kicker: "STEM x Culture",
  title: "Katara Space Science Program (KSSP)",
  description:
    "In partnership with Al Thuraya Planetarium and international space agencies, KSSP brings space science closer to young learners through immersive sessions, guest lectures, and maker-style labs.",
  partners: [
    { name: "NASA", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg" },
    { name: "ISRO", logo: "https://i.postimg.cc/L5wrSJhj/image.png" },
    { name: "Canadian Space Agency", logo: "https://i.postimg.cc/3N5cfPqB/image.png" },
    { name: "Al Thuraya Planetarium", logo: "https://i.postimg.cc/05VSfpJs/image.png" },
  ],
  stats: [
    { label: "Editions", value: "6+" },
    { label: "Total participants (6 months)", value: "3000+" },
    { label: "Students", value: "551+" },
  ],
  media: { src: "https://i.postimg.cc/TPT33QRd/image.png", alt: "Space education" },
};

const CULTURAL_EXCHANGE = {
  id: "cultural-exchange",
  title_kicker: "Global reach",
  title: "Cultural Exchange — 70+ countries",
  description:
    "Artist residencies, student exchanges and collaborative showcases in partnership with governments and institutions — nurturing dialogue, innovation and friendship through art.",
  countries: [
    "Qatar",
    "India",
    "Austria",
    "Georgia",
    "Dominican Republic",
    "USA",
    "UK",
    "Canada",
    "France",
    "Japan",
  ],
  map: {
    src: "https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg",
    alt: "World map",
  },
};

const LEGACY = {
  title_kicker: "Legacy",
  title: "Selected Legacy Projects",
  items: [
    {
      key: "colours-of-desert",
      title: "Colours of Desert",
      category: "Heritage & Culture",
      summary:
        "7 editions of cultural heritage celebration showcasing traditional Qatari culture meets contemporary art.",
      metrics: [
        { label: "editions", value: "7+" },
        { label: "artists", value: "150+" },
        { label: "exhibitions", value: "25+" },
      ],
      cta: { label: "View Project", href: "#" },
      image: { src: "https://placehold.co/1200x800?text=Colours+of+Desert", alt: "Colours of Desert" },
    },
    {
      key: "bharat-vastram",
      title: "Bharat Vastram",
      category: "Fashion & Heritage",
      summary:
        "A cultural fashion showcase with 29 State Ambassadors representing India’s diverse heritage (India–Qatar Year of Culture 2019).",
      metrics: [
        { label: "state ambassadors", value: "29+" },
        { label: "audience", value: "200+" },
        { label: "states represented", value: "29+" },
      ],
      cta: { label: "View Project", href: "#" },
      image: { src: "https://placehold.co/1200x800?text=Bharat+Vastram", alt: "Bharat Vastram" },
    },
    {
      key: "astro-fair",
      title: "Astro Fair",
      category: "Science & Education",
      summary:
        "Astronomical workshops and stargazing sessions bringing space science education to the community.",
      metrics: [
        { label: "sessions", value: "12+" },
        { label: "participants", value: "300+" },
        { label: "workshops", value: "8+" },
      ],
      cta: { label: "View Project", href: "#" },
      image: { src: "https://placehold.co/1200x800?text=Astro+Fair", alt: "Astro Fair" },
    },
    {
      key: "cosmic-canvas",
      title: "Cosmic Canvas",
      category: "Science & Art",
      summary:
        "Art & astronomy fusion where desert sky inspiration meets cultural heritage.",
      metrics: [
        { label: "sessions", value: "15+" },
        { label: "participants", value: "400+" },
        { label: "artworks", value: "100+" },
      ],
      cta: { label: "View Project", href: "#" },
      image: { src: "https://placehold.co/1200x800?text=Cosmic+Canvas", alt: "Cosmic Canvas" },
    },
  ],
};

const CTA_FINAL = {
  heading: "Ready to collaborate?",
  subtext:
    "Partner with MAPS International, join QIAF, or explore youth & innovation programs.",
  ctas: [
    { label: "Partnerships", href: "/contact?type=partnership", type: "internal" as const },
    { label: "Join QIAF", href: "/contact?type=qiaf", type: "internal" as const },
  ],
};

const FOOTER_TEXT = "© 2025 Rashmi Agarwal — Projects & Programs.";

/* ----------------------------- page ----------------------------- */

export default function Projects() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "48%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "66%"]);

  useEffect(() => {
    document.title = "Projects & Programs — Rashmi Agarwal";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* <Nav /> */}

      {/* Hero with collage */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24">
        <GradientBackground />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-title font-bold mb-6 gradient-text"
          >
            {HERO.heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xl text-ink/80 max-w-3xl mx-auto"
          >
            {HERO.subheading}
          </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex flex-wrap justify-center gap-3"
        >
          {HERO.ctas.map((c) => (
            <Link
              key={c.label}
              to={c.href}
              className="glass px-5 py-3 font-semibold hover:scale-105 transition inline-flex items-center gap-2"
            >
              {c.label} <ArrowRight size={18} />
            </Link>
          ))}
        </motion.div>
        </div>

        {/* Parallax collage */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.img
            style={{ y: y1 }}
            src={HERO.collage[0].src}
            alt={HERO.collage[0].alt}
            className="absolute top-20 right-10 w-40 h-56 object-cover rounded-2xl opacity-70 shadow-glass"
            loading="lazy"
          />
          <motion.img
            style={{ y: y2 }}
            src={HERO.collage[1].src}
            alt={HERO.collage[1].alt}
            className="absolute top-36 left-10 w-48 h-64 object-cover rounded-2xl opacity-70 shadow-glass"
            loading="lazy"
          />
          <motion.img
            style={{ y: y3 }}
            src={HERO.collage[2].src}
            alt={HERO.collage[2].alt}
            className="absolute bottom-20 right-1/4 w-44 h-60 object-cover rounded-2xl opacity-70 shadow-glass"
            loading="lazy"
          />
        </div>
      </section>

      {/* Our Projects intro */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-title font-bold gradient-text mb-2">
            {OUR_PROJECTS_INTRO.title}
          </h2>
          <p className="text-ink/70">{OUR_PROJECTS_INTRO.blurb}</p>
        </div>
      </section>

      {/* Flagships Overview (3 cards) */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FLAGSHIPS.map((f, idx) => (
            <motion.article
              key={f.key}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="overflow-hidden rounded-3xl bg-white shadow hover:shadow-xl transition"
            >
              <div className="relative h-44 w-full">
                <img src={f.image.src} alt={f.image.alt} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute left-3 bottom-3 flex items-center gap-2">
                  <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs">{f.category}</span>
                  <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs">{f.status}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-ink/70 mt-1">{f.summary}</p>

                {/* Youth Platform focus list */}
                {f.key === "youth-platform" && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {f.focus_areas!.map((fa) => (
                      <span key={fa} className="glass px-2.5 py-1 text-xs">{fa}</span>
                    ))}
                  </div>
                )}

                {/* KSSP partners in card */}
                {f.key === "kssp" && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {f.partners!.map((p) => (
                      <div key={p.name} className="flex items-center gap-2 rounded-xl bg-white p-2 shadow">
                        <img src={p.logo} alt={p.name} className="h-6 w-auto object-contain" />
                        <span className="text-xs text-ink/70">{p.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 text-center mt-4">
                  {f.metrics.map((m) => (
                    <div key={m.label} className="glass p-2">
                      <div className="text-sm font-semibold gradient-text">{m.value}</div>
                      <div className="text-[10px] text-ink/60">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <Link to={f.cta.href} className="text-accent-500 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                    {f.cta.label} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Break 1 */}
      <OvalBreak imageSrc={BREAK_1.src} alt={BREAK_1.alt} />

      {/* QIAF Timeline */}
      <section id={QIAF_TIMELINE.id} className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-ink/60">{QIAF_TIMELINE.title_kicker}</div>
          <h2 className="text-3xl md:text-4xl font-title font-bold gradient-text">{QIAF_TIMELINE.title}</h2>
          <p className="text-ink/70 mt-2">{QIAF_TIMELINE.note}</p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
            {QIAF_TIMELINE.timeline.map((t, i) => (
              <motion.article
                key={t.year}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="overflow-hidden rounded-3xl bg-white/85 p-4 shadow hover:shadow-xl transition"
              >
                <div className="relative h-40 w-full overflow-hidden rounded-2xl">
                  <img src={t.image.src} alt={t.image.alt} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute left-3 bottom-3 rounded-full bg-white/90 px-2 py-0.5 text-xs">{t.year}</div>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{t.headline}</h3>
                <p className="mt-1 text-sm text-ink/70">{t.stats}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {QIAF_TIMELINE.ctas.map((c) =>
              c.type === "internal" ? (
                <Link key={c.label} to={c.href} className="glass px-4 py-2 font-semibold hover:scale-105 transition inline-flex items-center gap-2">
                  {c.label} <ArrowRight size={16} />
                </Link>
              ) : (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-4 py-2 font-semibold hover:scale-105 transition inline-flex items-center gap-2"
                >
                  {c.label} <ArrowRight size={16} />
                </a>
              )
            )}
          </div>
        </div>
      </section>

      {/* Break 2 */}
      <OvalBreak imageSrc={BREAK_2.src} alt={BREAK_2.alt} />

      {/* YOUTH Platform detailed focus area cards */}
      <section id={YOUTH_SECTION.id} className="py-16 bg-primary-900/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-ink/60">{YOUTH_SECTION.title_kicker}</div>
          <h2 className="text-3xl md:text-4xl font-title font-bold gradient-text">{YOUTH_SECTION.title}</h2>
          <p className="text-ink/80 mt-3 max-w-3xl">{YOUTH_SECTION.description}</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
            {YOUTH_SECTION.focus_cards.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass p-6 hover-lift"
              >
                <div className="text-3xl">{f.icon}</div>
                <h4 className="mt-2 font-semibold">{f.title}</h4>
                <p className="text-sm text-ink/70">{f.blurb}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {YOUTH_SECTION.ctas.map((c) => (
              <Link key={c.label} to={c.href} className="glass px-4 py-2 font-semibold hover:scale-105 transition inline-flex items-center gap-2">
                {c.label} <Users size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* KSSP deep section */}
      <section id={KSSP_SECTION.id} className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-stretch">
            <div className="glass p-8 md:p-12">
              <div className="mb-2 text-xs uppercase tracking-[0.2em] text-ink/60">{KSSP_SECTION.title_kicker}</div>
              <h2 className="text-3xl md:text-4xl font-title font-bold gradient-text">{KSSP_SECTION.title}</h2>
              <p className="text-ink/80 mt-4">{KSSP_SECTION.description}</p>

              {/* Partners */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {KSSP_SECTION.partners.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow"
                  >
                    <img src={p.logo} alt={p.name} className="h-8 w-auto object-contain" />
                    <div className="text-sm text-ink/80">{p.name}</div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                {KSSP_SECTION.stats.map((s) => (
                  <div key={s.label} className="glass p-4">
                    <div className="text-2xl font-semibold gradient-text">{s.value}</div>
                    <div className="text-xs text-ink/60">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="glass px-3 py-1 text-sm inline-flex items-center gap-2">
                  <GraduationCap size={16} /> Youth & Schools
                </span>
                <span className="glass px-3 py-1 text-sm inline-flex items-center gap-2">
                  <Sparkles size={16} /> Maker Labs
                </span>
                <span className="glass px-3 py-1 text-sm inline-flex items-center gap-2">
                  <Rocket size={16} /> Rocket Launches
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl shadow-xl"
            >
              <img src={KSSP_SECTION.media.src} alt={KSSP_SECTION.media.alt} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cultural Exchange */}
      <section id={CULTURAL_EXCHANGE.id} className="py-16 bg-primary-900/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-ink/60">{CULTURAL_EXCHANGE.title_kicker}</div>
          <h2 className="text-3xl md:text-4xl font-title font-bold gradient-text">{CULTURAL_EXCHANGE.title}</h2>

          <div className="relative overflow-hidden rounded-3xl bg-white/80 p-6 shadow mt-4">
            <img
              src={CULTURAL_EXCHANGE.map.src}
              alt={CULTURAL_EXCHANGE.map.alt}
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
            />

            <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {CULTURAL_EXCHANGE.countries.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="rounded-full bg-white px-3 py-1 text-sm shadow"
                >
                  {c}
                </motion.span>
              ))}
            </div>

            <p className="relative z-10 mt-4 max-w-3xl text-ink/75">{CULTURAL_EXCHANGE.description}</p>
          </div>
        </div>
      </section>

      {/* Legacy Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-ink/60">{LEGACY.title_kicker}</div>
          <h2 className="text-3xl md:text-4xl font-title font-bold gradient-text">{LEGACY.title}</h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
            {LEGACY.items.map((p, i) => (
              <motion.article
                key={p.key}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="overflow-hidden rounded-3xl bg-white/85 shadow hover:shadow-xl transition"
              >
                <div className="relative h-40 w-full">
                  <img src={p.image.src} alt={p.image.alt} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute left-3 bottom-3 rounded-full bg-white/90 px-2 py-0.5 text-xs">{p.category}</div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm text-ink/70 mt-1">{p.summary}</p>
                  <div className="grid grid-cols-3 gap-2 text-center mt-3">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="glass p-2">
                        <div className="text-sm font-semibold gradient-text">{m.value}</div>
                        <div className="text-[10px] text-ink/60">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <a href={p.cta.href} className="text-accent-500 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                      {p.cta.label} <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid items-center gap-6 rounded-3xl bg-white/80 p-8 shadow md:grid-cols-[1.2fr_1fr]">
            <div>
              <h3 className="text-2xl font-title font-bold text-ink">{CTA_FINAL.heading}</h3>
              <p className="mt-2 text-ink/70">{CTA_FINAL.subtext}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {CTA_FINAL.ctas.map((c) => (
                  <Link
                    key={c.label}
                    to={c.href}
                    className="glass px-4 py-2 font-semibold hover:scale-105 transition inline-flex items-center gap-2"
                  >
                    {c.label} <ArrowRight size={16} />
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative h-36 overflow-hidden rounded-2xl">
              <motion.div
                className="absolute inset-0"
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0 2px, transparent 2px 24px)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Local page footer text from spec */}
      <div className="text-center text-sm text-ink/60 pb-6">{FOOTER_TEXT}</div>

      <Footer />
    </div>
  );
}
