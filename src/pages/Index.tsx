// src/pages/Index.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
  type Transition,
} from "framer-motion";
import OvalBreak from "@/components/OvalBreak";

/* ----------------------------- theme ----------------------------- */
const soft = {
  blush: "#FFE3F4",
  petal: "#FFD1E8",
  lilac: "#E7D1FF",
  cream: "#FFF7EE",
  mist: "#F3EDFF", // match About.tsx
  accent: "#FF3FA4",
  accent2: "#7C4DFF",
  ink: "#1F1A1D",
};

const spring: Transition = { type: "spring", stiffness: 120, damping: 16, mass: 0.6 };

/* ----------------------------- helpers ----------------------------- */
const GradientBackground: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-40 -left-20 h-[60vh] w-[60vh] rounded-full blur-3xl" style={{ background: soft.blush, opacity: 0.55 }} />
    <div className="absolute -bottom-32 -right-24 h-[55vh] w-[55vh] rounded-full blur-3xl" style={{ background: soft.lilac, opacity: 0.5 }} />
    <div className="absolute top-1/3 left-1/3 h-[40vh] w-[40vh] rounded-full blur-3xl" style={{ background: soft.petal, opacity: 0.4 }} />
    <div className="absolute inset-0" style={{ background: soft.cream, opacity: 0.72 }} />
  </div>
);

const Preloader: React.FC = () => {
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setDone(true), 650);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <motion.div className="fixed inset-0 z-[70] grid place-items-center" style={{ background: soft.cream }}>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1.4 }}
        className="grid h-24 w-24 place-items-center rounded-full"
        style={{ border: `3px solid ${soft.accent}` }}
      >
        <span className="text-sm" style={{ color: soft.ink }}>loading</span>
      </motion.div>
    </motion.div>
  );
};

const RotatingTextBadge: React.FC<{ text: string }> = ({ text }) => {
  const id = "circlePath";
  return (
    <div className="mx-auto grid h-48 w-48 place-items-center">
      <div className="relative h-40 w-40">
        <svg viewBox="0 0 200 200" className="absolute inset-0">
          <defs>
            <path id={id} d="M100,100 m-70,0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
          </defs>
          <motion.text
            initial={{ rotate: 20 }}
            animate={{ rotate: 380 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 18 }}
            className="text-[12px] tracking-[2px]"
            fill={soft.ink}
          >
            <textPath xlinkHref={`#${id}`} startOffset="0%">{text.repeat(3)}</textPath>
          </motion.text>
        </svg>
        <div className="absolute inset-8 rounded-full" style={{ background: "white" }} />
      </div>
    </div>
  );
};

/** Animated number counter (Vite-safe) */
const AnimatedNumber: React.FC<{ value: number; suffix?: string; duration?: number }> = ({ value, suffix = "", duration = 1.8 }) => {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const start = useMotionValue(0);
  const isInViewRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(isInViewRef, { once: true, margin: "0px 0px -20% 0px" });

  React.useEffect(() => {
    if (inView) animate(start, value, { duration, ease: "easeOut" });
  }, [inView, value, duration, start]);

  React.useEffect(() => {
    const unsub = start.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.floor(v).toString();
    });
    return () => unsub();
  }, [start]);

  return (
    <div ref={isInViewRef}>
      <span ref={ref} />{suffix}
    </div>
  );
};

const NameDance: React.FC<{ text: string; accentGradient?: boolean }> = ({ text, accentGradient = false }) => {
  const [hovered, setHovered] = React.useState(false);
  const letters = Array.from(text);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-block cursor-default"
      style={
        accentGradient
          ? {
              WebkitTextStroke: "1px rgba(0,0,0,0.04)",
              backgroundImage: `linear-gradient(90deg, ${soft.accent} 0%, ${soft.accent2} 50%, ${soft.accent} 100%)`,
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }
          : { color: soft.ink }
      }
    >
      {letters.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          style={{ display: "inline-block" }}
          animate={
            hovered
              ? {
                  y: [-2, -14, 0, -8, 0],
                  rotate: [0, -6, 0, 6, 0],
                  transition: {
                    duration: 0.9,
                    delay: i * 0.035,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: "easeInOut",
                  },
                }
              : { y: 0, rotate: 0, transition: { duration: 0.25 } }
          }
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
};

/* ----------------------------- sections ----------------------------- */
const AnimatedHero: React.FC = () => {
  const { scrollY } = useScroll();
  const blobY1 = useTransform(scrollY, [0, 300], [0, -20]);
  const blobY2 = useTransform(scrollY, [0, 300], [0, 24]);
  const [nameHover, setNameHover] = React.useState(false);

  return (
    <section className="relative mx-auto max-w-6xl px-4">
      {/* floating gradient blobs behind hero */}
      <motion.div className="pointer-events-none absolute -left-16 -top-24 h-56 w-56 rounded-full blur-3xl" style={{ background: soft.petal, opacity: 0.7, y: blobY1 }} />
      <motion.div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl" style={{ background: soft.lilac, opacity: 0.6, y: blobY2 }} />

      <div className="grid items-center gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* LEFT: Name + roles + CTAs */}
        <div>
          <motion.h1
            className="leading-[0.95] text-5xl sm:text-6xl lg:text-7xl"
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={spring}
            onMouseEnter={() => setNameHover(true)}
            onMouseLeave={() => setNameHover(false)}
          >
            <NameDance text="Rashmi " />
            <NameDance text="Agarwal" accentGradient />
          </motion.h1>

          <motion.p
            className="mt-4 max-w-2xl text-lg"
            style={{
              color: "rgba(0,0,0,0.85)",
              // use theme accents for shadow hues
              filter: nameHover
                ? `drop-shadow(0 6px 20px ${soft.accent}40)`
                : `drop-shadow(0 4px 6px ${soft.accent2}40)`,
            }}
            animate={nameHover ? { scale: 1.3 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 14, mass: 0.6 }}
          >
            Cultural Diplomat • Founder & President, MAPS International WLL • CEO, Qatar International Art Festival (QIAF)
          </motion.p>

          <div className="mt-5 flex flex-wrap gap-2">
            {["Cultural Diplomacy", "Global Festivals", "Youth & Education", "Innovation in Arts"].map((t, i) => (
              <motion.span
                key={t}
                className="rounded-full bg-white/90 px-3 py-1 text-xs shadow"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...spring, delay: 0.05 * i + 0.15 }}
                whileHover={{ scale: 1.08 }}
                style={{
                  boxShadow: nameHover ? `0 0 0 2px ${soft.accent}20, 0 10px 30px ${soft.accent2}17` : undefined,
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/projects" className="rounded-full px-5 py-2 text-white shadow" style={{ background: soft.accent }}>
              Explore Projects & Programs
            </Link>
            <Link to="/impact" className="rounded-full px-5 py-2 shadow" style={{ background: "white" }}>
              Impact & Recognition
            </Link>
            <Link to="/about" className="rounded-full px-5 py-2 shadow" style={{ background: soft.cream }}>
              About Rashmi
            </Link>
          </div>

          {/* flourish */}
          <motion.svg viewBox="0 0 500 120" className="mt-8 h-24 w-full" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.6 }}>
            <motion.path
              d="M10,60 C120,-20 200,120 300,40 C380,-20 440,110 490,20"
              fill="none"
              stroke={soft.accent}
              strokeWidth={5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </motion.svg>

          {/* rotating badge */}
          <div className="hidden md:block mt-6">
            <RotatingTextBadge text="• cultural diplomat • founder • curator • leader • " />
          </div>
        </div>

        {/* RIGHT: portrait + glow */}
        <div className="relative grid place-items-center">
          <motion.div initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={spring} className="relative">
            <img
              src="https://i.postimg.cc/g0FkD52H/image.png"
              alt="Rashmi Agarwal"
              className="h-64 w-64 rounded-[28px] object-cover shadow-2xl ring-4"
              style={{ ringColor: soft.accent }}
            />
            <div
              className="pointer-events-none absolute -inset-3 -z-10 rounded-[36px] blur-2xl"
              style={{
                background: `radial-gradient(600px circle at 30% 20%, ${soft.accent}33, transparent), radial-gradient(600px circle at 80% 70%, ${soft.accent2}33, transparent)`,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PartnersMarquee: React.FC = () => {
  const logos = [
    "https://i.postimg.cc/pVYkLBrs/image.png",
    "https://i.postimg.cc/RhK0vF4Y/image.png",
    "https://i.postimg.cc/3x3Qz8ZP/image.png",
    "https://i.postimg.cc/YqFFSrdc/image.png",
    "https://i.postimg.cc/sD5mvdcP/image.png",
  ];
  return (
    <section aria-label="Partners" className="mx-auto max-w-7xl px-4">
      <div className="rounded-3xl bg-white/70 p-4 shadow">
        <div className="relative overflow-hidden">
          <div className="flex gap-10 animate-[marquee_28s_linear_infinite] will-change-transform">
            {[...logos, ...logos].map((src, i) => (
              <img key={i} src={src} alt="partner" className="h-14 w-auto object-contain opacity-80" />
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </section>
  );
};

/** MERGED Overview */
const OverviewSplit: React.FC = () => {
  return (
    <section id="overview" className="relative mx-auto max-w-6xl overflow-hidden px-4 py-10 sm:py-12">
      {/* softer gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            `radial-gradient(100% 100% at 50% 50%, ${soft.blush} 0%, ${soft.petal} 40%, ${soft.mist} 75%, transparent 100%)`,
          backgroundColor: soft.cream,
        }}
      />

      <div className="grid items-center gap-6 md:gap-8 lg:grid-cols-2">
        {/* LEFT: frosted-glass text panel */}
        <article className="relative rounded-3xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-xl backdrop-saturate-150 p-6 sm:p-8">
          {/* animated gradient border glow */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-3xl"
            style={{
              background: `conic-gradient(from 0deg at 50% 50%, ${soft.accent}, ${soft.accent2}, ${soft.accent})`,
              filter: "blur(18px)",
              opacity: 0.16,
            }}
          />

          {/* chip/badge */}
          <motion.p
            initial={{ x: -12, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-black/70 backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: soft.accent }} />
            Overview
          </motion.p>

          {/* headline with animated ink/gradient sweep */}
          <motion.h2
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-2 text-3xl sm:text-4xl font-extrabold bg-[length:200%_100%] bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, ${soft.accent} 0%, ${soft.accent2} 50%, ${soft.accent} 100%)`,
              WebkitTextStroke: "1px rgba(0,0,0,0.05)",
              animation: "inkShift 7s linear infinite",
            }}
          >
            Rashmi Agarwal
          </motion.h2>

          {/* sub-sections from both codes */}
          <div className="mt-5 space-y-4 text-[15px] leading-7 text-black/80 max-w-[60ch]">
            {/* Code 1 */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="rounded-2xl border border-white/30 bg-white/40 p-4 backdrop-blur-md"
            >
              <h3 className="text-base font-semibold" style={{ color: soft.accent2 }}>Cultural Entrepreneur</h3>
              <p className="mt-1">
                Rashmi Agarwal works at the crossroads of art, business, and social impact—treating culture as infrastructure
                for connection, learning, and place-making.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="rounded-2xl border border-white/30 bg-white/40 p-4 backdrop-blur-md"
            >
              <h3 className="text-base font-semibold" style={{ color: soft.accent }}>Founder of MAPS</h3>
              <p className="mt-1">
                As Chairperson of MAPS International W.L.L., she builds programs spanning exhibitions, residencies, and international
                collaborations—aligning museums, councils, and brands to measurable goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="rounded-2xl border border-white/30 bg-white/40 p-4 backdrop-blur-md"
            >
              <h3 className="text-base font-semibold" style={{ color: soft.accent2 }}>Bridge Builder</h3>
              <p className="mt-1">
                She mentors emerging talent and women leaders, creates youth pipelines, and strengthens institutional capacity—shaping
                sustainable platforms for cultural growth.
              </p>
            </motion.div>

            {/* Code 2 */}
            <div className="rounded-2xl border border-white/30 bg-white/40 p-4 backdrop-blur-md">
              <h3 className="text-base font-semibold" style={{ color: soft.accent2 }}>
                A Visionary at the Crossroads of Art, Business & Social Impact
              </h3>
              <p className="mt-1">
                Pioneering entrepreneur and strategic leader with 20+ years advancing cultural engagement and social impact. Through
                MAPS International WLL and the Qatar International Art Festival (QIAF), she elevates the region’s art landscape,
                empowering emerging voices and global dialogue.
              </p>
            </div>

            <div className="rounded-2xl border border-white/30 bg-white/40 p-4 backdrop-blur-md">
              <h3 className="text-base font-semibold" style={{ color: soft.accent }}>
                Founder & President, MAPS International WLL • CEO, QIAF
              </h3>
              <p className="mt-1">
                Blending curation, strategy, finance, and management to bridge art and business. Collaborates with governments,
                institutions, and global organizations to amplify art’s impact.
              </p>
            </div>

            <div className="rounded-2xl border border-white/30 bg-white/40 p-4 backdrop-blur-md">
              <h3 className="text-base font-semibold" style={{ color: soft.accent2 }}>
                Global Impact
              </h3>
              <p className="mt-1">
                400+ artists from 70+ countries, 150+ transformative events, and 5,000+ youth empowered under her leadership. Featured
                by <em>HuffMag</em> and recognized among the “Top Arab Cultural Leaders 2025” by The Arab Leaders.
              </p>
            </div>
          </div>

          {/* light sweep across panel */}
          <span className="shine pointer-events-none" aria-hidden />
        </article>

        {/* RIGHT: portrait with glow */}
        <figure className="relative mx-auto w-full max-w-sm">
          <img
            src="https://i.postimg.cc/mkZ5XGXh/image.png"
            alt="Portrait of Rashmi Agarwal"
            className="aspect-[3/4] w-full rounded-3xl object-cover shadow-xl ring-1 ring-white/40"
            loading="lazy"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] blur-2xl"
            style={{
              background:
                `radial-gradient(60% 60% at 30% 30%, ${soft.accent}59, transparent), radial-gradient(60% 60% at 70% 70%, ${soft.accent2}47, transparent)`,
            }}
          />
        </figure>
      </div>

      {/* animations */}
      <style>{`
        @keyframes inkShift { 0% { background-position: 0% 50% } 100% { background-position: 200% 50% } }
        @keyframes sweep {
          0% { transform: translateX(-140%) rotate(10deg); }
          55%,100% { transform: translateX(140%) rotate(10deg); }
        }
        .shine {
          position: absolute; inset: -10%; border-radius: 1.5rem;
          background: linear-gradient(100deg, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0.55) 50%, rgba(255, 255, 255, 0) 75%);
          transform: translateX(-140%) rotate(10deg);
          animation: sweep 7s ease-in-out infinite; opacity: .55; filter: blur(2px);
        }
        @media (prefers-reduced-motion: reduce) { .shine { animation: none; opacity: .25; } }
      `}</style>
    </section>
  );
};

const QIAFTeaser: React.FC = () => (
  <section className="mx-auto max-w-6xl px-4">
    <div className="grid items-stretch gap-6 md:grid-cols-[1.3fr_1fr]">
      <motion.div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow" initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={spring} viewport={{ once: true }}>
        <h3 className="text-2xl font-semibold" style={{ color: soft.ink }}>QIAF 2025 — Sustainability & Innovation in Art</h3>
        <p className="mt-2 text-black/70">December 7–12, 2025 · Katara Cultural Village, Building 12, Doha · 400+ artists from 70+ countries</p>
        <ul className="mt-4 grid gap-2 list-disc pl-4 text-black/80">
          <li>Red Carpet Opening • International Exhibitions • Masterclasses • Live Painting • Panels</li>
          <li>Sustainable Fashion Shows • Musical Evenings • Heritage Tours • Auctions • Awards</li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/projects#qiaf-2025" className="rounded-full px-4 py-2 text-white" style={{ background: soft.accent }}>Learn more</Link>
          <a href="https://qiaf.net/" target="_blank" rel="noreferrer" className="rounded-full px-4 py-2" style={{ background: soft.cream }}>Official site</a>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl" style={{ background: soft.petal, opacity: 0.6 }} />
      </motion.div>

      <motion.div className="relative overflow-hidden rounded-3xl shadow-2xl" initial={{ scale: 0.98, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={spring} viewport={{ once: true }}>
        <img
          src="https://qiaf.net/wp-content/uploads/2021/11/249411972_10165732106720113_24742049591562404_n-700x441.jpg.webp"
          alt="QIAF Red Carpet"
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  </section>
);

const ImpactCounters: React.FC = () => (
  <section className="mx-auto max-w-6xl px-4">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { label: "Countries", value: 70, suffix: "+" },
        { label: "Artists (2025 target)", value: 400, suffix: "+" },
        { label: "Years of Excellence", value: 11, suffix: "+" },
        { label: "Media Mentions", value: 850, suffix: "+" },
      ].map((item, i) => (
        <motion.div key={item.label} className="rounded-3xl bg-white/80 p-6 text-center shadow" initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ ...spring, delay: 0.05 * i }} viewport={{ once: true }}>
          <div className="text-4xl font-semibold" style={{ color: i % 2 ? soft.accent2 : soft.accent }}>
            <AnimatedNumber value={item.value} suffix={item.suffix} />
          </div>
          <div className="mt-1 text-sm text-black/60">{item.label}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

const QuoteStrip: React.FC = () => (
  <section className="mx-auto max-w-5xl px-4">
    <div className="rounded-3xl bg-white/80 p-8 shadow">
      <motion.blockquote initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={spring} viewport={{ once: true }}>
        <p className="text-xl italic" style={{ color: soft.ink }}>
          “All kinds of art have a radiant tool to heal body, soul, mind and emotions… I believe art has a natural healing component of its own.”
        </p>
        <footer className="mt-3 text-sm text-black/60">— Rashmi Agarwal</footer>
      </motion.blockquote>
    </div>
  </section>
);

const FinalCTA: React.FC = () => (
  <section className="mx-auto max-w-6xl px-4">
    <div className="grid items-center gap-6 rounded-3xl bg-white/80 p-8 shadow md:grid-cols-[1.2fr_1fr]">
      <div>
        <h3 className="text-2xl font-semibold" style={{ color: soft.ink }}>Ready to collaborate?</h3>
        <p className="mt-2 text-black/70">Partner with MAPS International, join QIAF, or explore youth & innovation programs.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/contact?type=partnership" className="rounded-full px-4 py-2 text-white" style={{ background: soft.accent }}>
            Partnerships
          </Link>
          <Link to="/contact?type=qiaf" className="rounded-full px-4 py-2 text-white" style={{ background: soft.accent2 }}>
            Join QIAF
          </Link>
          <Link to="/about" className="rounded-full px-4 py-2" style={{ background: soft.cream }}>
            About Rashmi
          </Link>
        </div>
      </div>
      <div className="relative h-36 overflow-hidden rounded-2xl">
        <motion.div className="absolute inset-0" initial={{ x: 0 }} animate={{ x: "-50%" }} transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(0,0,0,0.06) 0 2px, transparent 2px 24px)" }} />
      </div>
    </div>
  </section>
);

/* ----------------------------- page ----------------------------- */
export default function Index() {
  return (
    <div id="home" className="min-h-screen bg-background font-[ui-sans-serif]">
      <Preloader />
      <GradientBackground />

      <main className="mx-auto max-w-7xl space-y-16 py-20">
        <AnimatedHero />
        <PartnersMarquee />
        <OverviewSplit />

        {/* Visual break — include BOTH images */}
        <OvalBreak src="https://i.postimg.cc/d3qwvxTh/image.png" alt="HuffMag feature" />
        <QIAFTeaser />
        <ImpactCounters />
        <OvalBreak src="https://i.postimg.cc/CKFVPVbS/image.png" alt="QIAF 2025 Ambassadors" />
        <QuoteStrip />
        <FinalCTA />

        <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-black/60">
          © {new Date().getFullYear()} Rashmi Agarwal — All rights reserved.
        </footer>
      </main>
    </div>
  );
}
