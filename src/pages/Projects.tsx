/**
 * PROJECTS PAGE — THE VIRTUAL GALLERY
 * 3D Perspective Walk-Through | Scroll forward = Move through space
 * Projects appear on "walls" with perspective shifts
 * 
 * WINGS:
 * 1. QIAF Exhibitions (Timeline)
 * 2. Youth Programs (Grid)
 * 3. Embassy Collaborations (Carousel)
 * 4. Space Science Program (Featured)
 */

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { 
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  Calendar,
  Users,
  Globe,
  Rocket,
  Award,
  ExternalLink,
  ArrowRight,
  Zap,
  Heart,
  Sparkles,
  Palette,
} from "lucide-react";
import { tokens } from "@/lib/tokens";

/* ==========================================
   3D PROJECT CARD
   ========================================== */
interface ProjectCardProps {
  title: string;
  year: string;
  description: string;
  image: string;
  stats?: { label: string; value: string }[];
  position: "left" | "right";
  index: number;
}

const ProjectCard3D: React.FC<ProjectCardProps> = ({
  title,
  year,
  description,
  image,
  stats,
  position,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.4 });

  return (
            <motion.div
      ref={ref}
      className="perspective-container mb-32"
      style={{
        transformStyle: "preserve-3d",
      }}
      initial={{
        opacity: 0,
        rotateY: position === "left" ? -45 : 45,
        x: position === "left" ? -200 : 200,
      }}
      whileInView={{
        opacity: 1,
        rotateY: 0,
        x: 0,
      }}
      transition={{
        duration: 1,
        delay: index * 0.2,
        ease: tokens.motion.ease.appleEase,
      }}
    >
      <div
        className={`grid lg:grid-cols-2 gap-12 items-center ${
          position === "right" ? "lg:grid-flow-col-dense" : ""
        }`}
      >
        {/* Image */}
        <motion.div
          className={`relative aspect-video rounded-3xl overflow-hidden shadow-2xl group ${
            position === "right" ? "lg:col-start-2" : ""
          }`}
          whileHover={{
            scale: 1.02,
            rotateY: position === "left" ? 5 : -5,
            z: 50,
          }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Year badge */}
          <div className="absolute top-6 left-6 glass rounded-xl px-4 py-2">
            <span className="text-2xl font-bold gradient-text">{year}</span>
          </div>
        </motion.div>

        {/* Content */}
          <motion.div
          className={position === "right" ? "lg:col-start-1 lg:row-start-1" : ""}
          initial={{ opacity: 0, x: position === "left" ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              <span className="text-sm font-semibold text-tertiary uppercase tracking-wider">
                Project #{index + 1}
              </span>
            </div>

            <h3 className="text-4xl font-bold text-primary leading-tight">
              {title}
            </h3>

            <p className="text-lg text-secondary leading-relaxed">
              {description}
            </p>

            {stats && (
              <div className="grid grid-cols-2 gap-4 pt-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="glass rounded-xl p-4">
                    <div className="text-2xl font-bold gradient-text mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-tertiary">{stat.label}</div>
                  </div>
                ))}
            </div>
            )}

            <motion.button
              className="btn btn-ghost group mt-4"
              whileHover={{ x: 5 }}
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            </div>
          </motion.div>
      </div>
    </motion.div>
  );
};

/* ==========================================
   YOUTH PROGRAMS GRID
   ========================================== */
const YouthProgramsGrid: React.FC = () => {
  const programs = [
    { 
      icon: Zap, 
      title: "Innovation & Technology", 
      participants: "200+",
      desc: "AI workshops, robotics, app development, blockchain education",
      color: tokens.colors.coral.base 
    },
    { 
      icon: Palette, 
      title: "Arts & Creative Expression", 
      participants: "180+",
      desc: "Live painting, digital art, sculpture, photography, creative writing",
      color: tokens.colors.sky.base 
    },
    { 
      icon: Globe, 
      title: "Culture & Heritage", 
      participants: "150+",
      desc: "Qatari heritage showcases, language learning, traditional arts",
      color: tokens.colors.amber.base 
    },
    { 
      icon: Rocket, 
      title: "STEM & Research", 
      participants: "220+",
      desc: "Science fairs, lab skills, space science, environmental research",
      color: "#9B59B6" 
    },
    { 
      icon: Users, 
      title: "Music & Performance", 
      participants: "160+",
      desc: "Music production, cultural exchange, performance training",
      color: "#16A085" 
    },
    { 
      icon: Heart, 
      title: "Fashion & Design", 
      participants: "140+",
      desc: "Sustainable fashion, traditional clothing innovation, wearable tech",
      color: "#E74C3C" 
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-mist to-canvas">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">
            Youth Empowerment Programs
          </h2>
          <p className="text-xl text-secondary">
            5,000+ young leaders across 50+ programs
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              className="bento-card p-8 group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                stiffness: 150,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                style={{ backgroundColor: `${program.color}20` }}
              >
                <program.icon className="w-8 h-8" style={{ color: program.color }} />
              </div>

              <h3 className="text-xl font-bold text-primary mb-2">{program.title}</h3>
              <p className="text-sm text-secondary mb-4 leading-relaxed">{program.desc}</p>
              <div className="text-3xl font-bold mb-1" style={{ color: program.color }}>
                {program.participants}
                    </div>
              <p className="text-xs text-tertiary">Participants</p>
            </motion.div>
        ))}
      </div>

        {/* 📸 PLACEHOLDER Note */}
        <motion.div
          className="mt-12 glass rounded-2xl p-6 border-2 border-dashed border-sky/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="flex items-start gap-4">
            <Users className="w-6 h-6 text-sky flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-secondary">
                <strong className="text-sky">📸 Youth Program Photos Needed:</strong> 3-4 action shots per program showing students working with mentors, hands-on activities, presentations. 
                Will create rich galleries with before/after showcases.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ==========================================
   SPACE PROGRAM FEATURE
   ========================================== */
const SpaceProgram: React.FC = () => {
  const partners = [
    { name: "NASA", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg" },
    { name: "ISRO", logo: "https://i.postimg.cc/L5wrSJhj/image.png" },
    { name: "Canadian Space Agency", logo: "https://i.postimg.cc/3N5cfPqB/image.png" },
    { name: "Al Thuraya Planetarium", logo: "https://i.postimg.cc/05VSfpJs/image.png" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-canvas to-slate-900 text-white relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-medium">Space & Society Initiative</span>
          </motion.div>

          <h2 className="text-5xl font-bold mb-4">
            Pioneering STEM Education
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Partnering with world's leading space agencies to inspire the next generation
            of scientists, engineers, and explorers.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
              <motion.div
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            {/* 📸 PLACEHOLDER: Space program photo */}
            <img
              src="https://i.postimg.cc/mkZ5XGXh/image.png"
              alt="Space Program"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Al Thuraya Planetarium Partnership
              </h3>
              <p className="text-white/70 leading-relaxed">
                Hands-on workshops, telescope sessions, and interactive exhibits
                connecting students with space exploration and cutting-edge technology.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">
                Partner Organizations
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {partners.map((partner, i) => (
                <motion.div
                  key={partner.name}
                    className="bg-white/10 rounded-xl p-4 flex items-center justify-center h-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                      className="max-h-10 max-w-full object-contain filter brightness-0 invert"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ==========================================
   MAIN PROJECTS COMPONENT
   ========================================== */
export default function Projects() {
  const qiafProjects = [
    {
      title: "QIAF 2025 - 7th Edition",
      year: "2025",
      description: "Qatar's premier international art festival bringing together 400+ artists from 70+ countries for a 6-day celebration of sustainability and innovation in art. First sustainability-focused edition with largest international participation ever. Featured sustainable fashion shows, environmental art installations, and green technology integration across 15 major components including workshops, panels, and masterclasses. Direct investment of $2-3M with projected tourism revenue of $5-8M and media value exceeding $10M.",
      image: "https://i.postimg.cc/fbdJVkXn/image.png",
      stats: [
        { label: "Artists", value: "400+" },
        { label: "Countries", value: "70+" },
        { label: "Days", value: "6" },
        { label: "Expected Visitors", value: "10K+" },
      ],
    },
    {
      title: "QIAF 2024 - 6th Edition",
      year: "2024",
      description: "Cultural Heritage and Innovation edition with expanded international participation. Seamlessly integrated traditional Qatari arts with modern technology, creating unique fusion exhibitions. Government recognition led to enhanced media coverage across 8+ Qatar publications. Featured heritage preservation showcases, contemporary art installations, and international cultural exchange programs that attracted record attendance.",
      image: "https://qiaf.net/wp-content/uploads/2021/11/249411972_10165732106720113_24742049591562404_n-700x441.jpg.webp",
      stats: [
        { label: "Artists", value: "350+" },
        { label: "Countries", value: "65+" },
        { label: "Visitors", value: "25K+" },
        { label: "Media Features", value: "50+" },
      ],
    },
    {
      title: "QIAF 2021 - 3rd Edition",
      year: "2021",
      description: "Resilience and Adaptation edition during global challenges. Pioneered hybrid cultural programming with UNESCO partnership, combining physical exhibitions with virtual components to reach global audiences. Featured 250+ artists across 65+ countries with masterclasses, panel discussions, and heritage-focused programming. Virtual exhibitions expanded reach beyond Qatar, establishing new models for international cultural exchange.",
      image: "https://i.postimg.cc/XY0wxcYd/image.png",
      stats: [
        { label: "Artists", value: "250+" },
        { label: "Countries", value: "65+" },
        { label: "Panels", value: "20+" },
        { label: "Virtual Reach", value: "Global" },
      ],
    },
    {
      title: "QIAF 2019 - 2nd Edition",
      year: "2019",
      description: "International breakthrough edition that established Qatar as a major player in global cultural diplomacy. Brought together 232 artists from 64 countries with red carpet opening, international exhibitions, and cultural symposiums. British Council partnership and government endorsement solidified QIAF as premier regional art platform. This edition marked the turning point for Qatar's international cultural recognition.",
      image: "https://i.postimg.cc/63hS55bb/image.png",
      stats: [
        { label: "Artists", value: "232" },
        { label: "Countries", value: "64" },
        { label: "Duration", value: "7 Days" },
        { label: "Recognition", value: "International" },
      ],
    },
  ];

  return (
    <main className="relative bg-canvas">
      {/* BOLD HERO SECTION */}
      <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
        {/* Animated background */}
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
                <span className="text-sm font-semibold text-coral">Cultural Impact Portfolio</span>
              </motion.div>

              {/* Main headline */}
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block gradient-text mb-3">Transforming Qatar's</span>
                <span className="block gradient-text mb-3">Cultural Landscape</span>
                <span className="block gradient-text">One Festival at a Time</span>
              </h1>

              {/* Description */}
              <p className="text-2xl text-secondary leading-relaxed">
                From <span className="text-coral font-semibold">QIAF's 7 editions</span> to youth programs reaching <span className="text-sky font-semibold">10,000+ students</span>—building bridges through art, education, and international collaboration.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                {[
                  { value: "7", label: "QIAF Editions", icon: Award },
                  { value: "70+", label: "Countries", icon: Globe },
                  { value: "10K+", label: "Youth Reached", icon: Users },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-coral/20 to-sky/20 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-coral" />
                    </div>
                    <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-xs text-tertiary mt-1">{stat.label}</div>
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
                <a href="#qiaf" className="btn btn-primary group">
                  <span>QIAF 2025</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <Link to="/about" className="btn btn-ghost">
                  The Story
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT: Featured QIAF 2025 Image */}
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
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2">QIAF 2025</h3>
                      <p className="text-white/80 text-sm">
                        7th Edition • December 7-12, 2025
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-2xl font-bold text-white">400+</div>
                        <div className="text-xs text-white/60">Artists</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">70+</div>
                        <div className="text-xs text-white/60">Countries</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">6</div>
                        <div className="text-xs text-white/60">Days</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
              </div>
            </div>
      </section>

      {/* QIAF Timeline - 3D Gallery Walk */}
      <section id="qiaf" className="py-20">
        <div className="max-w-7xl mx-auto px-8">
                <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <h2 className="text-5xl font-bold gradient-text mb-4">
              Qatar International Art Festival
            </h2>
            <p className="text-xl text-secondary">
              A journey through 7 editions of cultural excellence
            </p>
                </motion.div>

          <div className="space-y-0">
            {qiafProjects.map((project, i) => (
              <ProjectCard3D
                key={project.year}
                {...project}
                position={i % 2 === 0 ? "left" : "right"}
                index={i}
              />
            ))}
          </div>

          {/* 📸 PLACEHOLDER Note */}
          <motion.div
            className="mt-12 glass rounded-2xl p-6 border-2 border-dashed border-coral/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div className="flex items-start gap-4">
              <Calendar className="w-6 h-6 text-coral flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-secondary">
                  <strong className="text-coral">📸 QIAF Photos Needed:</strong> 3-5 high-res images per edition showing:
                  exhibition floors, artwork close-ups, visitors, artist presentations, red carpet moments. 
                  Will create rich galleries for each year with hover effects.
                </p>
        </div>
          </div>
        </motion.div>
      </div>
    </section>

      {/* Youth Programs */}
      <YouthProgramsGrid />

      {/* Space Program */}
      <SpaceProgram />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-canvas to-mist">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-5xl font-bold gradient-text mb-6">
              Let's Build Something Together
            </h2>
            <p className="text-xl text-secondary mb-12">
              Every project starts with a shared vision and commitment to impact.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/contact" className="btn btn-primary">
                Start a Partnership
              </Link>
              <Link to="/awards" className="btn btn-ghost">
                View Recognition
              </Link>
            </div>
          </motion.div>
    </div>
      </section>
    </main>
  );
}
