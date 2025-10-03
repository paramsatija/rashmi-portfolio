// src/pages/Projects.tsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type Transition } from "framer-motion";

//import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GradientBackground from "@/components/GradientBackground";
import OvalBreak from "@/components/OvalBreak";

/* ----------------------------- theme ----------------------------- */
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

/* --------------------------- hard-coded data (Code 1) --------------------------- */
const QIAF_YEARS: Array<{
  year: number;
  headline: string;
  stats: string;
  img: string;
}> = [
  { year: 2019, headline: "232 artists • 64 countries", stats: "Second edition. Doha’s art scene blossoms with cross-cultural showcases.", img: "https://i.postimg.cc/63hS55bb/image.png" },
  { year: 2021, headline: "250+ artists • 65+ countries", stats: "Third edition. Larger symposiums, masterclasses and panel talks.", img: "https://i.postimg.cc/XY0wxcYd/image.png" },
  { year: 2024, headline: "Expanded international participation", stats: "Sixth edition. Fashion x art integrations and live performances.", img: "https://qiaf.net/wp-content/uploads/2021/11/249411972_10165732106720113_24742049591562404_n-700x441.jpg.webp" },
  { year: 2025, headline: "7th Edition • Dec 7–12 • Katara, Doha", stats: "Theme: Sustainability & Innovation in Art. Expected 400+ artists from 70+ countries.", img: "https://i.postimg.cc/fbdJVkXn/image.png" },
];

const YOUTH_FOCUS: Array<{ title: string; blurb: string; icon: string }> = [
  { title: "Hackathons", blurb: "Sprint challenges for real impact.", icon: "⚡️" },
  { title: "Bootcamps", blurb: "Skill accelerators in tech & arts.", icon: "🎯" },
  { title: "Leadership", blurb: "Programs that shape tomorrow.", icon: "🧭" },
  { title: "Media & Design", blurb: "From storytelling to UX.", icon: "🎬" },
  { title: "STEM Labs", blurb: "Hands-on maker culture.", icon: "🧪" },
  { title: "Social Impact", blurb: "Community & volunteering.", icon: "🤝" },
  { title: "Careers", blurb: "Mentors, portfolio & pitch days.", icon: "💼" },
  { title: "Wellbeing", blurb: "Mindfulness & creativity.", icon: "🧘‍♀️" },
];

const KSSP_PARTNERS: Array<{ name: string; logo: string }> = [
  { name: "NASA", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg" },
  { name: "ISRO", logo: "https://i.postimg.cc/L5wrSJhj/image.png" },
  { name: "Canadian Space Agency", logo: "https://i.postimg.cc/3N5cfPqB/image.png" },
  { name: "Al Thuraya Planetarium", logo: "https://i.postimg.cc/05VSfpJs/image.png" },
];

/* ----------------------------- helpers ----------------------------- */
const Section: React.FC<{ id?: string; className?: string; children: React.ReactNode }> = ({ id, className, children }) => (
  <section id={id} className={`mx-auto max-w-7xl px-4 ${className || ""}`}>{children}</section>
);

const Title: React.FC<{ children: React.ReactNode; kicker?: string }> = ({ children, kicker }) => (
  <div className="mb-6">
    {kicker ? <div className="mb-2 text-xs uppercase tracking-[0.2em] text-black/60">{kicker}</div> : null}
    <h2 className="text-3xl sm:text-4xl font-semibold" style={{ color: soft.ink }}>{children}</h2>
  </div>
);

/* --------------------------- hero / collage (merged) --------------------------- */
const ProjectsHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // subtle parallax for the three images on the right
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "36%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "48%"]);

  return (
    <section
      ref={heroRef}
      className="relative pt-24 pb-10"
    >
      {/* keep gradient behind everything */}
      <GradientBackground />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-[1.3fr_1fr]">
        {/* LEFT: headline, sub, CTAs */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="leading-[0.95] text-5xl sm:text-6xl lg:text-7xl font-title font-bold ink-shift"
          >
            Projects <span className="italic font-light">&amp; Programs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg text-ink/80"
          >
            A living ecosystem of cultural festivals, youth innovation and science education — building
            bridges across 70+ countries.
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact?type=qiaf" className="btn btn-accent hover-scale">
              Join QIAF
            </Link>
            <Link to="/contact?type=partnership" className="btn btn-secondary hover-scale">
              Partner with MAPS International
            </Link>
          </div>
        </div>

        {/* RIGHT: image collage with parallax */}
        <div className="relative z-0 h-[480px]">
          {/* soft brand glow behind cards */}
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[36px] blur-3xl brand-blob" />

          <motion.img
            style={{ y: y1 }}
            src="https://i.postimg.cc/X7qKp7DK/mapsimg2025.jpg"
            alt="Festival highlight"
            className="absolute left-2 top-2 h-52 w-80 rounded-2xl object-cover shadow-glass"
            loading="lazy"
          />
          <motion.img
            style={{ y: y2 }}
            src="https://i.postimg.cc/8ctFTMSD/qiafimg2025.jpg"
            alt="Youth program"
            className="absolute right-3 top-16 h-60 w-80 rounded-2xl object-cover shadow-glass"
            loading="lazy"
          />
          <motion.img
            style={{ y: y3 }}
            src="https://i.postimg.cc/yY0RJgyF/qiaf7thed.jpg"
            alt="Space science initiative"
            className="absolute bottom-3 left-10 h-64 w-[22rem] rounded-2xl object-cover shadow-glass"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};


/* --------------------------- QIAF timeline (merged) --------------------------- */
const QIAFTimeline: React.FC = () => {
  return (
    <Section id="qiaf-2025" className="py-8">
      <Title kicker="Flagship">Qatar International Art Festival (QIAF)</Title>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {QIAF_YEARS.map((yr, i) => (
          <motion.article
            key={yr.year}
            className={`overflow-hidden rounded-3xl bg-white/85 p-4 shadow hover:shadow-xl transition ${yr.year === 2025 ? "ring-2" : ""}`}
            style={yr.year === 2025 ? { ringColor: soft.accent } : {}}
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ...spring, delay: i * 0.05 }}
            viewport={{ once: true }}
          >
            <div className="relative h-40 w-full overflow-hidden rounded-2xl">
              <img src={yr.img} className="h-full w-full object-cover" alt={`${yr.year} highlight`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute left-3 bottom-3 rounded-full bg-white/90 px-2 py-0.5 text-xs">{yr.year}</div>
            </div>
            <h3 className="mt-3 text-lg font-semibold" style={{ color: soft.ink }}>{yr.headline}</h3>
            <p className="mt-1 text-sm text-black/70">{yr.stats}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/contact?type=qiaf" className="glass px-4 py-2 font-semibold hover:scale-105 transition inline-flex items-center gap-2">
          Apply to participate
        </Link>
        <a href="https://qiaf.net/" target="_blank" rel="noopener noreferrer"
           className="glass px-4 py-2 font-semibold hover:scale-105 transition inline-flex items-center gap-2">
          Official QIAF site
        </a>
      </div>
    </Section>
  );
};

/* ------------------------------ Youth.qa (merged) ------------------------------ */
const YouthPrograms: React.FC = () => {
  return (
    <Section className="py-8">
      <Title kicker="Programs">YOUTH.qa — Empowering 500+ youth</Title>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {YOUTH_FOCUS.map((x, i) => (
          <motion.div key={x.title}
            className="rounded-3xl bg-white/85 p-5 shadow hover:-translate-y-1 hover:shadow-xl transition"
            initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
            transition={{ ...spring, delay: i * 0.04 }} viewport={{ once: true }}>
            <div className="text-3xl">{x.icon}</div>
            <h4 className="mt-2 font-semibold" style={{ color: soft.ink }}>{x.title}</h4>
            <p className="text-sm text-black/70">{x.blurb}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-6">
        <Link to="/contact?type=youth" className="glass px-4 py-2 font-semibold hover:scale-105 transition inline-flex items-center gap-2">
          Register interest
        </Link>
      </div>
    </Section>
  );
};

/* ------------------------------ KSSP (merged) ------------------------------ */
const KSSP: React.FC = () => {
  return (
    <Section className="py-8">
      <Title kicker="STEM x Culture">Katara Space Science Program (KSSP)</Title>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <motion.div className="rounded-3xl bg-white/85 p-6 shadow"
          initial={{ y: 24, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
          transition={spring} viewport={{ once: true }}>
          <p className="text-black/80">
            In partnership with Al Thuraya Planetarium and international space agencies, KSSP brings space science closer
            to young learners through immersive sessions, guest lectures and maker-style labs.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {KSSP_PARTNERS.map((p, i) => (
              <motion.div key={p.name}
                className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow"
                initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: i * 0.05 }} viewport={{ once: true }}>
                <img src={p.logo} alt={p.name} className="h-8 w-auto object-contain" />
                <div className="text-sm text-black/80">{p.name}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-white p-4 shadow">
              <div className="text-3xl font-semibold" style={{ color: soft.accent }}>200+</div>
              <div className="text-xs text-black/60">Students</div>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow">
              <div className="text-3xl font-semibold" style={{ color: soft.accent2 }}>12+</div>
              <div className="text-xs text-black/60">Sessions</div>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow">
              <div className="text-3xl font-semibold" style={{ color: soft.accent }}>3</div>
              <div className="text-xs text-black/60">Agencies</div>
            </div>
          </div>
        </motion.div>

        <motion.div className="relative overflow-hidden rounded-3xl shadow-2xl"
          initial={{ scale: 0.98, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
          transition={spring} viewport={{ once: true }}>
          <img src="https://i.postimg.cc/TPT33QRd/image.png" className="h-full w-full object-cover" alt="Space education" />
        </motion.div>
      </div>
    </Section>
  );
};

/* ------------------------- Cultural Exchange (merged) ------------------------- */
const CulturalExchange: React.FC = () => {
  return (
    <Section className="py-8">
      <Title kicker="Global reach">Cultural Exchange — 70+ countries</Title>

      <div className="relative overflow-hidden rounded-3xl bg-white/80 p-6 shadow">
        {/* background map */}
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
             alt="World map" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20" />

        {/* floating country chips */}
        <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {["Qatar","India","Austria","Georgia","Dominican Republic","USA","UK","Canada","France","Japan"].map((c, i) => (
            <motion.span key={c}
              className="rounded-full bg-white px-3 py-1 text-sm shadow"
              initial={{ y: 8, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
              transition={{ ...spring, delay: i * 0.03 }} viewport={{ once: true }}>
              {c}
            </motion.span>
          ))}
        </div>

        <p className="relative z-10 mt-4 max-w-3xl text-black/75">
          Artist residencies, student exchanges and collaborative showcases in partnership with governments and institutions — nurturing dialogue,
          innovation and friendship through art.
        </p>
      </div>
    </Section>
  );
};

/* ------------------------------ page ------------------------------ */
export default function Projects() {
  useEffect(() => {
    document.title = "Projects & Programs — Rashmi Agarwal";
  }, []);

  return (
    <div className="min-h-screen" style={{ background: soft.cream }}>
      {/* <Nav /> */}

      {/* gentle background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-20 h-[60vh] w-[60vh] rounded-full blur-3xl" style={{ background: soft.blush, opacity: 0.5 }} />
        <div className="absolute -bottom-32 -right-24 h-[55vh] w-[55vh] rounded-full blur-3xl" style={{ background: soft.lilac, opacity: 0.45 }} />
      </div>

      <main className="mx-auto space-y-16">
        <ProjectsHero />

        <OvalBreak src="https://i.postimg.cc/MTzLzbhk/image.png" alt="Festival moments" className="px-4" />

        <QIAFTimeline />

        <OvalBreak src="https://i.postimg.cc/YCZk2V3C/image.png" alt="Ambassador meets" className="px-4" />

        <YouthPrograms />
        <KSSP />
        <CulturalExchange />
        {/* LegacyGrid could render here in future if re-enabled */}
        {/* <LegacyGrid /> */}

        <Section className="pb-24">
          <div className="grid items-center gap-6 rounded-3xl bg-white/80 p-8 shadow md:grid-cols-[1.2fr_1fr]">
            <div>
              <h3 className="text-2xl font-semibold" style={{ color: soft.ink }}>Ready to collaborate?</h3>
              <p className="mt-2 text-black/70">
                Partner with MAPS International, join QIAF, or explore youth & innovation programs.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/contact?type=partnership" className="rounded-full px-4 py-2 text-white" style={{ background: soft.accent }}>
                  Partnerships
                </Link>
                <Link to="/contact?type=qiaf" className="rounded-full px-4 py-2 text-white" style={{ background: soft.accent2 }}>
                  Join QIAF
                </Link>
              </div>
            </div>
            <div className="relative h-36 overflow-hidden rounded-2xl">
              <motion.div className="absolute inset-0" initial={{ x: 0 }} animate={{ x: "-50%" }}
                transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0 2px, transparent 2px 24px)" }} />
            </div>
          </div>

          <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-black/60">
            © 2025 Rashmi Agarwal — Projects & Programs.
          </footer>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
