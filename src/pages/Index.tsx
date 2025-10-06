/**
 * HOMEPAGE — THE BOLD STATEMENT
 * 3-Act Structure | Content-Rich | Impact-Driven
 * 
 * ACT 1: HERO — Bold statement + Trust bar + Featured QIAF image
 * ACT 2: IMPACT — Stats cascade + Rich project grid with real content
 * ACT 3: INVITATION — Strong CTA to start conversations
 */

import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  animate,
  useSpring,
  useInView,
} from "framer-motion";
import { 
  Sparkles, 
  Award, 
  Users, 
  Globe, 
  ArrowRight,
  Heart,
  TrendingUp,
  Building2,
  Rocket,
} from "lucide-react";
import { tokens } from "@/lib/tokens";

/* ==========================================
   ANIMATED NUMBER COUNTER
   ========================================== */
const AnimatedNumber: React.FC<{ 
  value: number; 
  suffix?: string;
  prefix?: string;
  duration?: number;
}> = ({ value, suffix = "", prefix = "", duration = 2 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    damping: 30, 
    stiffness: 100,
    mass: 1,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { 
        duration, 
        ease: [0.16, 1, 0.3, 1],
      });
    }
  }, [isInView, value, duration, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>0</span>;
};

/* ==========================================
   ACT 1: THE HERO
   Bold statement + Trust bar + QIAF featured image
   ========================================== */
const Act1Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
      <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
              background: `radial-gradient(circle, ${
                i === 0 ? tokens.colors.coral.base : i === 1 ? tokens.colors.sky.base : tokens.colors.amber.base
              }, transparent)`,
              left: `${i * 40}%`,
              top: `${20 + i * 20}%`,
            }}
          animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
              duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Bold Statement */}
      <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
      >
        {/* Badge */}
        <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-coral/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Sparkles className="w-4 h-4 text-coral" />
              <span className="text-sm font-semibold text-coral">Cultural Visionary & Founder</span>
            </motion.div>

            {/* Main headline */}
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block gradient-text mb-3">The Woman Who</span>
              <span className="block gradient-text mb-3">Brought 70+ Countries</span>
              <span className="block gradient-text">Together Through Art</span>
        </h1>

            {/* Subtitle */}
            <p className="text-2xl text-secondary leading-relaxed max-w-xl">
              From Law & Finance to Cultural Diplomacy: <span className="text-coral font-semibold">15 years</span> of uniting <span className="text-sky font-semibold">100+ nationalities</span> through the healing power of art.
            </p>

            {/* Quote */}
            <motion.blockquote
              className="border-l-4 border-coral pl-6 py-4 italic text-lg text-secondary"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              "Art itself is a healing force. Art is an ultimate form of meditation."
            </motion.blockquote>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              {[
                { value: "400+", label: "Artists" },
                { value: "70+", label: "Countries" },
                { value: "15+", label: "Years" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-tertiary mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex items-center gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <Link to="/projects" className="btn btn-primary group">
                <span>Explore QIAF 2025</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="btn btn-ghost">
                The Journey
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT: Featured QIAF Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://i.postimg.cc/fbdJVkXn/image.png"
                alt="QIAF 2025 - Qatar International Art Festival"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Featured badge */}
              <div className="absolute bottom-8 left-8 right-8">
                <motion.div
                  className="glass-frosted rounded-2xl p-6"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">QIAF 2025</h3>
                      <p className="text-white/80 text-sm mb-4">
                        Qatar's Premier International Art Festival
                      </p>
                      <div className="flex items-center gap-4 text-xs text-white/60">
                        <span>Dec 7-12</span>
                        <span>•</span>
                        <span>400+ Artists</span>
                        <span>•</span>
                        <span>70 Countries</span>
                      </div>
                    </div>
                    <Sparkles className="w-8 h-8 text-amber flex-shrink-0" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Bar - Partner Logos */}
        <motion.div
          className="mt-20 pt-12 border-t border-slate/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-center text-sm text-tertiary mb-8">
            Board Member • Cultural Ambassador • Humanitarian Leader
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap opacity-60 hover:opacity-100 transition-opacity">
            {[
              "Qatar Government",
              "Katara Cultural Village",
              "UNESCO",
              "British Council",
              "Silk Painters International (USA)",
              "Human Rights Int'l Federation",
            ].map((partner, i) => (
        <motion.div
                key={partner}
                className="text-sm font-semibold text-slate"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + i * 0.1 }}
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ==========================================
   ACT 2: IMPACT & PROJECTS
   Stats cascade + Rich project grid
   ========================================== */
const Act2Impact: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "QIAF 2025 - 7th Edition",
      category: "International Art Festival",
      description: "Qatar's premier international art festival bringing together 400+ artists from 70+ countries. First sustainability-focused edition with largest international participation ever.",
      stats: {
        artists: "400+",
        countries: "70+",
        days: "6",
        investment: "$2-3M",
      },
      highlights: [
        "Sustainable fashion shows",
        "Environmental art installations",
        "Green technology integration",
        "15 major components",
      ],
      image: "https://i.postimg.cc/fbdJVkXn/image.png",
      color: tokens.colors.coral.base,
      size: "large", // 2x2
    },
    {
      id: 2,
      title: "The YOUTH Platform",
      category: "Youth Development",
      description: "Empowering Qatar's next generation through innovation and creativity across 8 focus areas with 500+ participants from 50+ institutions.",
      stats: {
        participants: "500+",
        institutions: "50+",
        focusAreas: "8",
      },
      highlights: [
        "AI & Robotics workshops",
        "Arts & Creative expression",
        "STEM & Research programs",
        "Music & Performance training",
      ],
      image: "https://i.postimg.cc/CKFVPVbS/image.png",
      color: tokens.colors.sky.base,
      size: "medium", // 1x2
    },
    {
      id: 3,
      title: "Cultural Bridge-Building",
      category: "International Diplomacy",
      description: "11+ years of international partnerships connecting cultures through art and education across embassies, governments, and cultural institutions.",
      stats: {
        countries: "70+",
        ambassadors: "32+",
        years: "11+",
      },
      highlights: [
        "Embassy partnerships",
        "Government collaborations",
        "Cultural exchange programs",
        "International media coverage",
      ],
      image: "https://i.postimg.cc/d3qwvxTh/image.png",
      color: tokens.colors.amber.base,
      size: "medium", // 1x2
    },
    {
      id: 4,
      title: "Katara Space Science Program",
      category: "STEM Education",
      description: "Revolutionary 4th annual space science education program connecting youth with NASA/ISRO, featuring cutting-edge space technology and research.",
      stats: {
        duration: "3 days",
        sessions: "6hrs/day",
      },
      highlights: [
        "NASA partnership",
        "ISRO collaboration",
        "Hands-on space tech",
        "Youth researchers",
      ],
      image: "https://i.postimg.cc/mkZ5XGXh/image.png",
      color: "#9B59B6",
      size: "small", // 1x1
    },
    {
      id: 5,
      title: "Global Media Recognition",
      category: "Press & Coverage",
      description: "850+ media features across Qatar's leading publications and international outlets, establishing Qatar as a cultural diplomacy leader.",
      stats: {
        features: "850+",
        outlets: "8+",
      },
      highlights: [
        "The Peninsula",
        "Gulf Times",
        "Qatar Living",
        "International press",
      ],
      image: "https://i.postimg.cc/YCZk2V3C/image.png",
      color: "#16A085",
      size: "small", // 1x1
    },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-canvas via-mist to-canvas">
      {/* Impact Stats Header */}
      <div className="max-w-7xl mx-auto px-8 mb-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky/30 mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
          >
            <TrendingUp className="w-4 h-4 text-sky" />
            <span className="text-sm font-semibold text-sky">Measurable Impact</span>
          </motion.div>

          <h2 className="text-6xl font-bold gradient-text mb-6">
            15 Years of Building Bridges
          </h2>
          <p className="text-2xl text-secondary max-w-3xl mx-auto">
            From local workshops to Qatar's most celebrated international cultural platform
          </p>
        </motion.div>

        {/* Big Impact Numbers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: Globe, 
              value: 70, 
              suffix: "+", 
              label: "Countries Connected",
              color: tokens.colors.coral.base,
              desc: "Building bridges across continents"
            },
            { 
              icon: Users, 
              value: 400, 
              suffix: "+", 
              label: "Artists Empowered",
              color: tokens.colors.sky.base,
              desc: "Providing platforms for creativity"
            },
            { 
              icon: Rocket, 
              value: 10000, 
              suffix: "+", 
              label: "Youth Reached",
              color: tokens.colors.amber.base,
              desc: "Investing in the next generation"
            },
            { 
              icon: Award, 
              value: 850, 
              suffix: "+", 
              label: "Media Features",
              color: "#9B59B6",
              desc: "International recognition"
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bento-card p-8 text-center group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div
                className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                    </div>

              <div className="text-5xl font-bold mb-2" style={{ color: stat.color }}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={2.5} />
                  </div>

              <h3 className="text-lg font-bold text-primary mb-2">{stat.label}</h3>
              <p className="text-sm text-tertiary">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
    </div>

      {/* Featured Projects Grid */}
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">
            Featured Work
          </h2>
          <p className="text-xl text-secondary">
            Transforming Qatar's cultural landscape through strategic initiatives
          </p>
            </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className={`bento-card group cursor-pointer overflow-hidden relative ${
                project.size === "large"
                  ? "lg:col-span-2 lg:row-span-2"
                  : project.size === "medium"
                  ? "lg:col-span-1 lg:row-span-2"
                  : "lg:col-span-1 lg:row-span-1"
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="mb-3">
                  <span 
                    className="text-xs font-bold uppercase tracking-wider mb-2 block"
                    style={{ color: project.color }}
                  >
                    {project.category}
                  </span>
                  <h3 className="text-white font-bold text-xl mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed line-clamp-2 mb-3">
                    {project.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-3 flex-wrap text-xs text-white/60 mb-3">
                  {Object.entries(project.stats).slice(0, 3).map(([key, value]) => (
                    <span key={key} className="font-semibold">
                      {value} {key}
                    </span>
                  ))}
                </div>

                {/* Hover: Show highlights */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    {project.highlights.slice(0, 2).map((highlight) => (
                      <span
                        key={highlight}
                        className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/90 backdrop-blur-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/projects" className="btn btn-primary text-lg group">
            <span>View All Projects</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

/* ==========================================
   ACT 3: THE INVITATION
   Strong CTA to start conversations
   ========================================== */
const Act3Invitation: React.FC = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-slate-900">
        {[...Array(3)].map((_, i) => (
          <motion.div
                key={i} 
            className="absolute w-96 h-96 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${
                i === 0 ? tokens.colors.coral.base : i === 1 ? tokens.colors.sky.base : tokens.colors.amber.base
              }, transparent)`,
              left: `${i * 35}%`,
              top: `${20 + i * 15}%`,
              opacity: 0.2,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
              />
            ))}
            </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-frosted border border-white/20 mb-8"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 text-coral" />
            <span className="text-sm font-medium text-white">Ready to Collaborate?</span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Let's Create Something
            <br />
            <span className="gradient-text">Extraordinary Together</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether it's a cultural initiative, youth program, or international collaboration—
            every great project starts with a conversation.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
            <Link to="/contact">
          <motion.button
                className="btn btn-primary text-lg px-12 py-6 shadow-2xl relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start the Conversation
                  <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-coral via-amber to-sky opacity-0 group-hover:opacity-50 blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
          </motion.button>
            </Link>

            <Link to="/awards" className="btn btn-ghost-white text-lg px-12 py-6">
              View Recognition
            </Link>
          </div>

          {/* Availability Status */}
          <motion.div
            className="flex items-center justify-center gap-8 text-sm text-white/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Available for partnerships</span>
            </div>
            <div>•</div>
            <div>Response within 24 hours</div>
          </motion.div>
        </motion.div>
      </div>
  </section>
);
};

/* ==========================================
   MAIN HOMEPAGE COMPONENT
   ========================================== */
export default function Index() {
  return (
    <main className="relative bg-canvas">
      <Act1Hero />
      <Act2Impact />
      <Act3Invitation />

      {/* Footer Links */}
      <section className="relative py-16 bg-gradient-to-b from-canvas to-mist border-t border-slate/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Link to="/about" className="btn btn-ghost">
              The Journey
            </Link>
            <Link to="/projects" className="btn btn-ghost">
              All Projects
            </Link>
            <Link to="/awards" className="btn btn-ghost">
              Recognition
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Get in Touch
            </Link>
          </div>

          <p className="text-sm text-tertiary text-center mt-12">
            © {new Date().getFullYear()} Rashmi Agarwal • MAPS International WLL • All rights reserved
          </p>
    </div>
      </section>
    </main>
  );
}