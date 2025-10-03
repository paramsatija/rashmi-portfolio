// src/pages/About.tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  type Transition,
} from "framer-motion";

// import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GradientBackground from "@/components/GradientBackground";
import OvalBreak from "@/components/OvalBreak";

import {
  ArrowRight,
  Award,
  Heart,
  Landmark,
  Newspaper,
  Rocket,
  ShieldCheck,
  Target,
  Scale,
  Globe,
} from "lucide-react";

/* ----------------------------- theme ----------------------------- */
const spring: Transition = { type: "spring", stiffness: 120, damping: 16, mass: 0.6 };

const soft = {
  blush: "#FFE3F4",
  petal: "#FFD1E8",
  lilac: "#E7D1FF",
  cream: "#FFF7EE",
  mist:  "#F3EDFF",
  ink:   "#1F1A1D",
  accent:  "#FF3FA4",
  accent2: "#7C4DFF",
};

/* ----------------------------- Reusable bits ----------------------------- */
const Section: React.FC<{ id?: string; children: React.ReactNode; className?: string }> = ({ id, children, className }) => (
  <section id={id} className={`mx-auto max-w-6xl px-4 ${className || ""}`}>{children}</section>
);

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="rounded-full bg-white/80 px-3 py-1 text-xs shadow">{children}</span>
);

/* Decorative break from Code 1 (kept for continuity) */
const BigBreak: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const s = useTransform(scrollYProgress, [0, 1], [0.85, 1.1]);
  const r = useTransform(scrollYProgress, [0, 1], [0, 12]);

  return (
    <div className="relative my-20 h-56">
      <motion.div
        style={{ scale: s, rotate: r }}
        className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${soft.accent}66, transparent 60%), ${soft.petal}`,
            boxShadow: `0 30px 100px ${soft.accent}33`,
          }}
        />
      </motion.div>
    </div>
  );
};

/* ----------------------------- Static content (from Code 2) ----------------------------- */
const HERO = {
  heading: "About Rashmi Agarwal",
  subheading:
    "Founder & President, MAPS International WLL • CEO, Qatar International Art Festival (QIAF)",
  badges: [
    "Entrepreneur",
    "Founder",
    "CEO, QIAF",
    "Curator",
    "Producer",
    "Collector",
    "Artist & Designer",
  ],
  pull_quote: {
    text: "A Visionary at the Crossroads of Art, Business, and Social Impact",
    attribution: "HuffMag Magazine, July 2025",
    link:
      "https://huffmag.com/rashmi-agarwal-a-visionary-at-the-crossroads-of-art-business-and-social-impact-2/",
  },
};

const BIO = {
  paragraphs: [
    "Rashmi Agarwal is a pioneering entrepreneur and strategic leader with over 20 years of experience driving innovation, cultural engagement, and social impact in the fine arts industry.",
    "At MAPS International WLL and QIAF, she has been instrumental in elevating the region's art landscape, creating platforms that empower emerging voices and foster meaningful global cultural dialogue.",
    "Her blend of curation, strategic planning, finance, and management bridges the worlds of art and business. Through collaborations with government bodies, cultural institutions, dignitaries, and global organizations, she amplifies art’s impact for positive social change.",
  ],
  highlights: [
    "400+ artists connected from 70+ countries",
    "150+ transformative events",
    "5,000+ young leaders empowered",
  ],
};

const VISION = {
  left: [
    "Rashmi Agarwal’s vision is to create platforms that unite people across cultural and geographical boundaries, celebrating the universal language of art. Through MAPS International WLL and QIAF, she fosters collaborations that transcend borders and empower the next generation of artists.",
    "She is especially passionate about nurturing emerging talent and educational opportunities that help creators learn, grow, and thrive.",
  ],
  right: {
    paragraphs: [
      "She envisions a world where education and art intersect to inspire innovation and cultural dialogue, giving future artists a global stage. Through these efforts, she aims to shape a future where creativity and learning create lasting impact.",
    ],
    stats: [
      { value: "100+", label: "Nationalities United" },
      { value: "QIAF", label: "Global Festival" },
      { value: "MAPS", label: "International WLL" },
    ],
  },
};

const EXPERTISE = [
  {
    icon: <Globe className="w-7 h-7 text-accent-500" />,
    heading: "Cultural Curation",
    subtext: "20+ years of curating transformative cultural experiences",
  },
  {
    icon: <Scale className="w-7 h-7 text-accent-500" />,
    heading: "Strategic Planning",
    subtext: "Bridging art and business through innovative strategies",
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-accent-500" />,
    heading: "Global Leadership",
    subtext: "Leading international organizations and cultural diplomacy",
  },
  {
    icon: <Heart className="w-7 h-7 text-accent-500" />,
    heading: "Social Impact",
    subtext: "Driving positive change through art and cultural engagement",
  },
];

const LEADERSHIP = [
  {
    group: "International Organizations",
    items: [
      {
        role: "Chairperson & International Director",
        org: "Human Rights International Federation",
        location: "India",
        period: "2019–present",
        notes: "Leading global human rights advocacy and policy development",
      },
      {
        role: "International Director & National Chairperson",
        org: "Anti-Corruption Foundation",
        location: "Qatar",
        period: "2018–present",
        notes: "Championing transparency and ethical governance",
      },
      {
        role: "Board Member",
        org: "Silk Painters International",
        location: "USA",
        period: "—",
        notes: "Supporting global artistic excellence and cultural exchange",
      },
    ],
  },
  {
    group: "Arts & Media",
    items: [
      {
        role: "Proprietor",
        org: "Oyster Silk Art Gallery",
        location: "—",
        period: "Since 2006",
        notes:
          "Curating and promoting contemporary art and cultural heritage",
      },
    ],
  },
];

/* ----------------------------- Page ----------------------------- */
export default function About() {
  useEffect(() => {
    document.title = "About — Rashmi Agarwal";
  }, []);

  return (
    <div className="min-h-screen" style={{ background: soft.cream }}>
      {/* <Nav /> */}

      {/* soft layered background (from Code 1) */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-20 h-[60vh] w-[60vh] rounded-full blur-3xl" style={{ background: soft.blush, opacity: 0.5 }} />
        <div className="absolute -bottom-32 -right-24 h-[55vh] w-[55vh] rounded-full blur-3xl" style={{ background: soft.lilac, opacity: 0.45 }} />
      </div>

      {/* HERO — merged content */}
      <Section className="pt-24 pb-10">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] items-center">
          <div>
            <motion.h1
              className="leading-tight text-5xl sm:text-6xl lg:text-7xl gradient-text"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={spring}
            >
              {HERO.heading}
            </motion.h1>

            <motion.p
              className="mt-5 max-w-2xl text-lg text-black/80"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...spring, delay: 0.08 }}
            >
              {HERO.subheading}
            </motion.p>

            {/* badges union (Code 1 + Code 2 -> de-duped) */}
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from(new Set([
                "Entrepreneur",
                "Founder",
                "Curator",
                "Producer",
                "Collector",
                "Artist & Designer",
                ...HERO.badges,
              ])).map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>

            {/* pull quote (from Code 2) */}
            <a
              href={HERO.pull_quote.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-4 py-3 rounded-xl inline-flex items-start gap-3 mt-6 hover-lift"
            >
              <Newspaper className="w-5 h-5 text-accent-500 mt-0.5" />
              <div>
                <p className="text-sm italic leading-snug">“{HERO.pull_quote.text}”</p>
                <p className="text-xs text-ink/60 mt-1">— {HERO.pull_quote.attribution}</p>
              </div>
            </a>

            {/* CTAs union (normalize to your routes) */}
            <div className="mt-8 flex gap-3">
              <Link to="/" className="rounded-full px-4 py-2 text-white shadow btn-magnetic" style={{ background: soft.accent }}>
                ← Back home
              </Link>
              <Link to="/impact" className="rounded-full px-4 py-2 shadow hover-scale" style={{ background: "white" }}>
                Impact & Recognition
              </Link>
            </div>
          </div>

          {/* Portrait with glow (Next/Image → <img/>) */}
          <motion.div
            className="relative mx-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={spring}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/30 to-sky-300/30 blur-3xl rounded-3xl" />
            <img
              src="https://i.postimg.cc/x1jWS3FM/image.png"
              alt="Rashmi Agarwal portrait"
              className="relative h-auto w-full max-w-[420px] rounded-[28px] object-cover shadow-2xl ring-4 border-white"
              loading="lazy"
            />
            <div
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[36px] blur-2xl"
              style={{
                background: `radial-gradient(600px circle at 30% 20%, ${soft.accent}33, transparent),
                             radial-gradient(600px circle at 80% 70%, ${soft.accent2}33, transparent)`,
              }}
            />
          </motion.div>
        </div>
      </Section>

      {/* BREAK 1 */}
      <OvalBreak src="https://i.postimg.cc/qRpDH8L8/image.png" alt="Rashmi portrait" />

      {/* BIO (from Code 2) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-title font-bold mb-6 gradient-text">Biography</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {BIO.paragraphs.map((p, i) => (
                <p key={i} className="text-ink/80 leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="space-y-3">
              {BIO.highlights.map((h) => (
                <div key={h} className="glass p-4 text-sm">{h}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION (merged) */}
      <Section id="vision">
        <motion.h2
          className="text-3xl font-semibold gradient-text"
          initial={{ x: -12, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={spring}
          viewport={{ once: true }}
        >
          Vision & Mission
        </motion.h2>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <motion.div
            className="rounded-3xl bg-white/80 p-6 shadow glass"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={spring}
            viewport={{ once: true }}
          >
            <Target className="w-7 h-7 text-accent-500 mb-3" />
            {VISION.left.map((p, i) => (
              <p key={i} className="text-black/80 mb-4">{p}</p>
            ))}
          </motion.div>

          <motion.div
            className="rounded-3xl bg-white/80 p-6 shadow glass"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ...spring, delay: 0.05 }}
            viewport={{ once: true }}
          >
            <Heart className="w-7 h-7 text-accent-500 mb-3" />
            {VISION.right.paragraphs.map((p, i) => (
              <p key={i} className="text-black/80 mb-4">{p}</p>
            ))}
            <div className="mt-4 grid grid-cols-3 items-center gap-4 text-center">
              {VISION.right.stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white p-4 shadow">
                  <div className="text-3xl font-semibold gradient-text">{s.value}</div>
                  <div className="text-xs text-black/60">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* BREAK 2 */}
      <OvalBreak src="https://i.postimg.cc/CKFVPVbS/image.png" alt="Rashmi portrait" />

      {/* VOLUNTEER EXPERIENCE (from Code 1) */}
      <Section id="volunteer">
        <motion.h2
          className="text-3xl font-semibold"
          style={{ color: soft.ink }}
          initial={{ x: -12, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={spring}
          viewport={{ once: true }}
        >
          Volunteer Experience
        </motion.h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            {
              title:
                "Chairperson (Qatar) & International Director — Human Rights International Federation (2019–present) – Registered by the Indian Trust Act (Govt. of India)",
              color: soft.accent,
            },
            {
              title:
                "International Director & Chairperson (Qatar) — Anti-Corruption Foundation of India (2018–present) – Registered by the Indian Trust Act (Govt. of India)",
              color: soft.accent2,
            },
          ].map((item, i) => (
            <motion.article
              key={i}
              className="rounded-3xl bg-white/80 p-6 shadow"
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ ...spring, delay: i * 0.04 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full" style={{ background: item.color }} />
                <p className="text-black/80">{item.title}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* EXPERTISE & LEADERSHIP CARDS (from Code 2) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-title font-bold mb-8 gradient-text">
            Expertise & Leadership
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {EXPERTISE.map((e) => (
              <div key={e.heading} className="glass p-6">
                <div className="mb-2">{e.icon}</div>
                <h3 className="font-semibold mb-1">{e.heading}</h3>
                <p className="text-sm text-ink/70">{e.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BREAK 3 */}
      <OvalBreak src="https://i.postimg.cc/267G0PFN/image.png" alt="Bespoke design details" />

      {/* SIGNATURE DESIGNER ENGAGEMENTS (from Code 1) */}
      <Section id="designer">
        <motion.h2
          className="text-3xl font-semibold"
          style={{ color: soft.ink }}
          initial={{ x: -12, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={spring}
          viewport={{ once: true }}
        >
          Signature Designer Engagements
        </motion.h2>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            className="rounded-3xl bg-white/80 p-6 shadow"
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={spring}
            viewport={{ once: true }}
          >
            <p className="text-black/80">
              Artistic fashion designer based in Qatar, known for bespoke creations blending artistry with couture craftsmanship. With a deep appreciation for individuality, her
              designs transcend trends, offering timeless elegance tailored exclusively to each client’s distinct
              personality and preferences.
            </p>
            <p className="mt-4 text-black/80">
              Every piece is a testament to meticulous attention to detail, where luxurious fabrics,
              intricate embellishments, and masterful silhouettes come together to form wearable art.
            </p>
            <p className="mt-4 text-black/80">
              By-commission engagements deliver one-of-a-kind pieces that reflect the client’s story and aspirations.
              Handcrafted techniques, sustainable luxury, and personalized detailing turn ideas into collector’s pieces.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Bespoke scarves", "Embroidery", "Cultural fusion", "Sustainable luxury", "Collector’s pieces"].map(
                (t) => (
                  <Badge key={t}>{t}</Badge>
                )
              )}
            </div>

            <div className="mt-7">
              <Link to="/contact" className="rounded-full px-4 py-2 text-white shadow" style={{ background: soft.accent }}>
                Commission an engagement
              </Link>
            </div>
          </motion.div>

          {/* Visual side: animated collage with real images (from Code 1/2) */}
          <motion.div
            className="relative overflow-hidden rounded-3xl shadow-xl"
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={spring}
            viewport={{ once: true }}
          >
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${soft.accent}33, ${soft.accent2}22)` }}
            />
            <div className="grid grid-cols-2 gap-2 p-2 relative z-10">
              {[
                "https://thearableader.com/wp-content/uploads/2025/08/Jihane-Arfaoui-42-1536x819.jpg",
                "https://i.postimg.cc/g0FkD52H/image.png",
                "https://i.postimg.cc/YSkbQrYP/image.png",
                "https://i.postimg.cc/Y0bzNYNd/image.png",
                "https://i.postimg.cc/sgn4GYf1/image.png",
                "https://i.postimg.cc/x1jWS3FM/image.png",
              ].map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 16, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ ...spring, delay: 0.05 * i }}
                  viewport={{ once: true }}
                >
                  <img
                    src={src}
                    alt={`About collage image ${i + 1}`}
                    className="aspect-[4/3] w-full rounded-2xl object-cover shadow-md"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* RECOGNITION (from Code 2) */}
      <section id="recognition" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-title font-bold mb-6 gradient-text">
            Featured Recognition
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              { outlet: "Gulf Times", type: "International Media", link: "#" },
              { outlet: "Qatar News Agency", type: "International Media", link: "#" },
              { outlet: "Al Raya", type: "International Media", link: "#" },
              { outlet: "Al Jazeera", type: "International Media", link: "#" },
              { outlet: "Qatar TV", type: "International Media", link: "#" },
              { outlet: "The Peninsula", type: "International Media", link: "#" },
            ].map((r) => (
              <a key={r.outlet} href={r.link} className="glass p-5 hover-lift">
                <div className="flex items-center gap-2 mb-1">
                  <Newspaper className="w-5 h-5 text-accent-500" />
                  <span className="font-semibold">{r.outlet}</span>
                </div>
                <div className="text-xs text-ink/60">{r.type}</div>
              </a>
            ))}
          </div>

          <div className="glass p-6 flex items-start gap-3">
            <Rocket className="w-6 h-6 text-accent-500 mt-0.5" />
            <div>
              <div className="font-semibold">Space Program Recognition</div>
              <p className="text-sm text-ink/80">
                Al Thuraya Planetarium, Katara Cultural Village — pioneering space science education and youth engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative brandy break (optional visual) */}
      <OvalBreak src="https://i.postimg.cc/267G0PFN/image.png" alt="Bespoke design details" />

      {/* FINAL CTA (merged wording) */}
      <Section className="pb-24">
        <div className="grid items-center gap-6 rounded-3xl bg-white/80 p-8 shadow md:grid-cols-[1.2fr_1fr]">
          <div>
            <h3 className="text-2xl font-semibold" style={{ color: soft.ink }}>
              Continue exploring
            </h3>
            <p className="mt-2 text-black/70">
              Discover flagship programs and measurable outcomes, or get in touch to collaborate.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/projects" className="rounded-full px-4 py-2 text-white shadow" style={{ background: soft.accent }}>
                Explore Projects & Programs
              </Link>
              <Link to="/impact" className="rounded-full px-4 py-2 shadow" style={{ background: "white" }}>
                Impact & Recognition
              </Link>
              <Link to="/contact" className="rounded-full px-4 py-2 text-white shadow" style={{ background: soft.accent2 }}>
                Contact
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

        <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-black/60">
          © {new Date().getFullYear()} Rashmi Agarwal — All rights reserved.
        </footer>
      </Section>

      <Footer />
    </div>
  );
}
