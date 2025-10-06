/**
 * AWARDS PAGE — THE TROPHY CASE
 * Museum Display with Spotlight | Glass reflections | 3D hover tilt
 * Cursor creates spotlight effect (radial gradient follows mouse)
 * Diplomat photos with iOS 17-style tilt
 */

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
} from "framer-motion";
import {
  Award,
  Trophy,
  Star,
  Globe,
  Users,
  Newspaper,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Heart,
} from "lucide-react";
import { tokens } from "@/lib/tokens";

/* ==========================================
   ANIMATED NUMBER COUNTER
   ========================================== */
const AnimatedNumber: React.FC<{ 
  value: number; 
  suffix?: string;
}> = ({ value, suffix = "" }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    damping: 30, 
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { 
        duration: 2.5, 
        ease: [0.16, 1, 0.3, 1],
      });
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.floor(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

/* ==========================================
   3D TILT CARD (iOS 17 style)
   ========================================== */
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateXValue = ((e.clientY - centerY) / rect.height) * -10;
    const rotateYValue = ((e.clientX - centerX) / rect.width) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`perspective-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
};

/* ==========================================
   SPOTLIGHT CONTAINER
   ========================================== */
const SpotlightContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.12) 0%, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
};

/* ==========================================
   MAIN AWARDS COMPONENT
   ========================================== */
export default function Awards() {
  const DIPLOMATS = [
    { name: "H.E. Teimuraz Kereselidze", title: "Ambassador of Georgia to Qatar", img: "https://i.postimg.cc/85rt5z7y/image.png" },
    { name: "Ms Pamela Cristina FRIAS DE LA ROSA", title: "Chargé d'Affaires, Dominican Republic", img: "https://i.postimg.cc/MZLtBR7L/image.png" },
    { name: "H.E. Erika Bernhard", title: "Austrian Ambassador to Qatar", img: "https://i.postimg.cc/HxhxxSCG/image.png" },
    { name: "H.E. Mr Vipul", title: "Indian Ambassador to Qatar", img: "https://i.postimg.cc/nzzMYX4S/image.png" },
    { name: "Mr Sachin Dinkar Shankpal", title: "1st Secretary Culture & Education, Indian Embassy", img: "https://i.postimg.cc/15CgXcDG/image.png" },
    { name: "H.E. Mr Pekka Voutilainen", title: "Ambassador of Finland to Qatar", img: "https://i.postimg.cc/TYDw2M2c/image.png" },
];

const AWARDS = [
  {
    title: "Top Arab Cultural Leader 2025",
    org: "The Arab Leaders",
    year: 2025,
    description: "Recognized among the most influential cultural leaders shaping the Arab world's artistic landscape.",
      featured: true,
      icon: Trophy,
  },
  {
    title: "Featured by HuffMag",
    org: "HuffPost Magazine",
    year: 2024,
    description: "Profile feature highlighting impact on international cultural diplomacy and youth empowerment.",
      link: "https://huffmag.com/rashmi-agarwal-a-visionary-at-the-crossroads-of-art-business-and-social-impact-2/",
      icon: Star,
  },
  {
    title: "Cultural Diplomacy Award",
    org: "Qatar Ministry of Culture",
    year: 2023,
    description: "Excellence in fostering international cultural exchange through Qatar International Art Festival.",
      icon: Globe,
  },
  {
    title: "Women in Leadership",
    org: "Gulf Business",
    year: 2022,
    description: "Recognition for pioneering leadership in cultural entrepreneurship and social impact.",
      icon: Award,
    },
  ];

  return (
    <main className="relative bg-canvas">
      {/* BOLD HERO SECTION */}
      <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
        {/* Background Image Layer - Elegant award ceremony/diplomatic setting */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80)',
              opacity: 0.12,
            }}
          />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-canvas via-canvas/95 to-mist/90" />
        </div>

        {/* Animated gradient orbs */}
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-amber/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Trophy className="w-4 h-4 text-amber" />
                <span className="text-sm font-semibold text-amber">Recognition & Impact</span>
          </motion.div>

              {/* Main headline */}
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block gradient-text mb-3">15 Years of Recognition</span>
                <span className="block gradient-text mb-3">As a Top Arab</span>
                <span className="block gradient-text">Cultural Leader</span>
              </h1>

              {/* Description */}
              <p className="text-2xl text-secondary leading-relaxed">
                Honored by <span className="text-amber font-semibold">governments, embassies, and international institutions</span> for contributions to cultural diplomacy, youth empowerment, and building bridges between <span className="text-sky font-semibold">100+ nationalities</span>.
              </p>

              {/* Featured Awards */}
              <div className="space-y-4 pt-4">
                {[
                  { award: "Top Arab Cultural Leader", org: "The Arab Leaders 2025" },
                  { award: "Featured Profile", org: "HuffPost Magazine 2024" },
                  { award: "Cultural Diplomacy Award", org: "Qatar Ministry of Culture" },
                ].map((item, i) => (
                  <motion.div
                    key={item.org}
                    className="flex items-start gap-3 p-4 glass rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber/30 to-coral/30 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-4 h-4 text-amber" />
                    </div>
                    <div>
                      <span className="font-semibold text-primary">{item.award}</span>
                      <br />
                      <span className="text-sm text-secondary">{item.org}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                className="flex items-center gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <a href="#awards" className="btn btn-primary">
                  View All Awards
                </a>
                <Link to="/projects" className="btn btn-ghost">
                  See Projects
              </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT: Featured Recognition Image - Premium Layered */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              {/* Decorative background frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber/20 to-coral/20 rounded-3xl blur-2xl scale-105 -z-10" />
              
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <img
                  src="https://i.postimg.cc/YCZk2V3C/image.png"
                  alt="Rashmi Agarwal - Awards and Recognition"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Featured stats */}
                <div className="absolute bottom-8 left-8 right-8">
                  <motion.div
                    className="glass-frosted rounded-2xl p-6"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2">Global Impact</h3>
                      <p className="text-white/80 text-sm">
                        Recognized across Qatar and internationally
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-2xl font-bold text-white">850+</div>
                        <div className="text-xs text-white/60">Media Features</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">32+</div>
                        <div className="text-xs text-white/60">Ambassadors</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">15+</div>
                        <div className="text-xs text-white/60">Years</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
        </div>
      </div>
    </section>

      {/* Impact Numbers */}
      <section id="awards" className="py-20 bg-gradient-to-b from-canvas to-mist">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-5xl font-bold gradient-text mb-4">
              Impact at a Glance
          </h2>
            <p className="text-xl text-secondary">
              Numbers that tell a story of dedication and excellence
          </p>
        </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Trophy, value: 15, suffix: "+", label: "Awards", color: tokens.colors.coral.base },
              { icon: Globe, value: 50, suffix: "+", label: "Partnerships", color: tokens.colors.sky.base },
              { icon: Users, value: 100, suffix: "+", label: "Events", color: tokens.colors.amber.base },
              { icon: Newspaper, value: 850, suffix: "+", label: "Media Features", color: "#9B59B6" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="bento-card p-8 text-center"
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                </div>
                <div className="text-5xl font-bold mb-2" style={{ color: stat.color }}>
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-tertiary font-medium">{stat.label}</div>
              </motion.div>
            ))}
            </div>
      </div>
    </section>

      {/* Awards Showcase with Spotlight */}
      <SpotlightContainer>
        <section className="py-20 bg-slate-900 text-white relative">
          <div className="max-w-7xl mx-auto px-8 relative z-20">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-5xl font-bold mb-4">
                Honors & Accolades
          </h2>
              <p className="text-xl text-white/70">
                Recognition from leading institutions and media
          </p>
        </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
          {AWARDS.map((award, i) => (
            <motion.div
              key={award.title}
                  className={`glass-frosted p-8 rounded-3xl relative overflow-hidden group ${
                    award.featured ? "lg:col-span-2 border-2 border-amber/30" : ""
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 150,
                  }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber/20 to-coral/20 flex items-center justify-center"
                          whileHover={{ rotate: 15, scale: 1.1 }}
                        >
                          <award.icon className="w-8 h-8 text-amber" />
                        </motion.div>
                        <div>
                          <span className="text-xs text-white/50 uppercase tracking-wider">{award.year}</span>
                          <div className="text-sm text-white/70">{award.org}</div>
                        </div>
                      </div>

                      {award.link && (
                        <a
                          href={award.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/50 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold mb-3">{award.title}</h3>
                    <p className="text-white/70 leading-relaxed">{award.description}</p>

                    {award.featured && (
                      <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/20 border border-amber/30">
                        <Star className="w-4 h-4 text-amber" />
                        <span className="text-sm font-medium text-amber">Featured Recognition</span>
                </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 📸 PLACEHOLDER Note */}
            <motion.div
              className="mt-12 glass-frosted rounded-2xl p-6 border-2 border-dashed border-amber/30"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              <div className="flex items-start gap-4">
                <Trophy className="w-6 h-6 text-amber flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-white/70">
                    <strong className="text-amber">📸 Award Certificates Needed:</strong> High-res scans of award certificates, trophy photos (white background), 
                    ceremony moments. Will create interactive gallery with confetti animations on click.
                  </p>
                </div>
          </div>
            </motion.div>
      </div>
    </section>
      </SpotlightContainer>

      {/* Diplomatic Partners with 3D Tilt */}
      <section className="py-20 bg-gradient-to-b from-mist to-canvas">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-5xl font-bold gradient-text mb-4">
            Diplomatic Partnerships
          </h2>
            <p className="text-xl text-secondary">
              Building cultural bridges with embassies worldwide
          </p>
        </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {DIPLOMATS.map((diplomat, i) => (
              <TiltCard key={diplomat.name}>
            <motion.div
                  className="bento-card overflow-hidden group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 150,
                  }}
                >
                  <div className="relative aspect-[3/4]">
                <img
                  src={diplomat.img}
                  alt={diplomat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-bold text-lg mb-1">{diplomat.name}</h3>
                      <p className="text-sm text-white/80">{diplomat.title}</p>
    </div>
        </div>
            </motion.div>
              </TiltCard>
            ))}
          </div>

          {/* 📸 PLACEHOLDER Note */}
          <motion.div
            className="mt-12 glass rounded-2xl p-6 border-2 border-dashed border-sky/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-sky flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-secondary">
                  <strong className="text-sky">📸 More Diplomat Photos Needed:</strong> Additional headshots of ambassadors and cultural attachés from partner countries. 
                  Square crop (500x500px), formal attire. Will expand gallery with more partnerships.
                </p>
              </div>
            </div>
          </motion.div>
      </div>
    </section>

      {/* Media Coverage */}
      <section className="py-20 bg-gradient-to-b from-canvas to-mist">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-5xl font-bold gradient-text mb-4">
              Global Media Recognition
          </h2>
            <p className="text-xl text-secondary">
              Featured in international publications and networks
          </p>
        </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              "Gulf Times", "Al Jazeera", "Qatar TV", "The Peninsula",
              "Al Raya", "QNA", "Gulf Business", "HuffMag",
              "Arab Leaders", "Doha News", "Qatar Tribune", "Middle East Eye"
            ].map((outlet, i) => (
          <motion.div
                key={outlet}
                className="bento-card p-6 text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: i * 0.05,
                  type: "spring",
                  stiffness: 150,
                }}
                whileHover={{ y: -6, scale: 1.05 }}
              >
                <Newspaper className="w-8 h-8 mx-auto mb-3 text-coral group-hover:text-sky transition-colors" />
                <div className="text-sm font-semibold text-primary">{outlet}</div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>

      {/* CTA */}
      <section className="py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-5xl font-bold gradient-text mb-6">
                Let's Create Impact Together
            </h2>
            <p className="text-xl text-secondary mb-12">
              Partnerships, collaborations, and cultural initiatives welcome.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/contact" className="btn btn-primary">
                Start a Partnership
                </Link>
              <Link to="/projects" className="btn btn-ghost">
                View Projects
          </Link>
          </div>
        </motion.div>
      </div>
    </section>
    </main>
  );
}
