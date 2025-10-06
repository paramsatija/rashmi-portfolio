/**
 * ABOUT PAGE — THE JOURNEY
 * Vertical Scroll Timeline with smooth reveals
 * Each chapter = fullscreen section with fade-in animations
 * 
 * CHAPTERS:
 * 1. Origins - Early life, inspiration
 * 2. Education - Study, foundation
 * 3. QIAF Foundation - The big idea
 * 4. Building Bridges - International expansion
 * 5. Empowering Youth - Education initiatives
 * 6. Signature Collaborations - Designer partnerships
 * 7. Recognition - Awards, impact
 * 8. Personal Philosophy - Vision, manifesto
 */

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  motion,
  useInView,
} from "framer-motion";
import {
  Sparkles,
  Heart,
  Palette,
  Users,
  Globe,
  Award,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Briefcase,
  Rocket,
} from "lucide-react";
import { tokens } from "@/lib/tokens";

/* ==========================================
   TYPEWRITER TEXT COMPONENT
   ========================================== */
const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedText, setDisplayedText] = useState("");

  React.useEffect(() => {
    if (!isInView) return;
    
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, text, delay]);

  return (
    <p ref={ref} className="text-xl text-secondary leading-relaxed">
      {displayedText}
      {displayedText.length < text.length && (
        <span className="inline-block w-1 h-6 bg-coral ml-1 animate-pulse" />
      )}
    </p>
  );
};

/* ==========================================
   CHAPTER COMPONENT
   ========================================== */
interface ChapterProps {
  chapter: number;
  title: string;
  icon: React.ElementType;
  text: string;
  image: string;
  color: string;
}

const Chapter: React.FC<ChapterProps> = ({ chapter, title, icon: Icon, text, image, color }) => {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center px-8 lg:px-16"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT: Image */}
      <motion.div
          className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
          style={{
              background: `linear-gradient(135deg, ${color}20 0%, transparent 60%)`,
            }}
          />

          {/* Chapter number */}
          <div className="absolute top-8 left-8">
            <div className="glass rounded-2xl px-4 py-2">
              <span className="text-6xl font-bold" style={{ color }}>
                {chapter}
              </span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div
              className="p-3 rounded-2xl"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <span className="text-sm font-semibold text-tertiary uppercase tracking-wider">
              Chapter {chapter}
            </span>
          </div>

          <h2 className="text-5xl font-bold leading-tight" style={{ color }}>
            {title}
          </h2>

          <TypewriterText text={text} delay={600} />

          <motion.div
            className="pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <div className="w-16 h-1 rounded-full" style={{ backgroundColor: color }} />
          </motion.div>
      </motion.div>
    </div>
            </motion.div>
  );
};

/* ==========================================
   DESIGNER SHOWCASE (Flip Cards)
   ========================================== */
const DesignerShowcase: React.FC = () => {
  const designers = [
    { name: "Abu Jani", specialty: "Couture Master", img: "https://i.postimg.cc/Y0bzNYNd/image.png" },
    { name: "Sandeep Khosla", specialty: "Design Visionary", img: "https://i.postimg.cc/sgn4GYf1/image.png" },
    { name: "Manish Malhotra", specialty: "Fashion Icon", img: "https://i.postimg.cc/YSkbQrYP/image.png" },
    { name: "Tarun Tahiliani", specialty: "Contemporary Elegance", img: "https://i.postimg.cc/g0FkD52H/image.png" },
    { name: "Ritu Kumar", specialty: "Heritage Couture", img: "https://i.postimg.cc/x1jWS3FM/image.png" },
    { name: "JJ Valaya", specialty: "Royal Grandeur", img: "https://thearableader.com/wp-content/uploads/2025/08/Jihane-Arfaoui-42-1536x819.jpg" },
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
            Signature Designer Collaborations
          </h2>
          <p className="text-xl text-secondary">
            Partnering with India's finest to showcase excellence
          </p>
          </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {designers.map((designer, i) => (
          <motion.div
              key={designer.name}
              className="group perspective-container"
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                type: "spring",
              }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden glass shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                {/* 📸 PLACEHOLDER: Designer Photos */}
                <img
                  src={designer.img}
                  alt={designer.name}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-sm mb-1">{designer.name}</h3>
                    <p className="text-xs opacity-80">{designer.specialty}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note for missing images */}
              <motion.div 
          className="mt-12 glass rounded-2xl p-6 border-2 border-dashed border-coral/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="flex items-start gap-4">
            <Palette className="w-6 h-6 text-coral flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-secondary">
                <strong className="text-coral">📸 Designer Photos Needed:</strong> Professional headshots of each signature designer (500x500px, square crop). 
                Will create individual cards with hover effects showcasing your collaborations.
              </p>
            </div>
          </div>
        </motion.div>
        </div>
      </section>
  );
};

/* ==========================================
   MAIN ABOUT COMPONENT
   ========================================== */
export default function About() {
  const chapters = [
    {
      chapter: 1,
      title: "Origins",
      icon: Sparkles,
      text: "Born with a passion for art and culture, Rashmi's journey began in the vibrant cultural landscape of Mumbai. From an early age, she was captivated by the power of art to bridge communities and tell stories that transcend boundaries.",
      image: "https://i.postimg.cc/x1jWS3FM/image.png", // 📸 PLACEHOLDER: Young Rashmi or family photo
      color: tokens.colors.coral.base,
    },
    {
      chapter: 2,
      title: "Education & Foundation",
      icon: BookOpen,
      text: "Formal training in cultural management and arts administration laid the groundwork. Each course, mentor, and experience shaped a vision: to create platforms where art becomes a catalyst for dialogue, understanding, and social change.",
      image: "https://i.postimg.cc/g0FkD52H/image.png", // 📸 PLACEHOLDER: University or early career photo
      color: tokens.colors.sky.base,
    },
    {
      chapter: 3,
      title: "QIAF Foundation",
      icon: Palette,
      text: "The Qatar International Art Festival was born from a simple yet powerful idea: bring together artists from around the world to celebrate cultural diversity. What started as a vision in 2018 has grown into one of the region's most prestigious art platforms.",
      image: "https://i.postimg.cc/fbdJVkXn/image.png", // 📸 PLACEHOLDER: First QIAF event
      color: tokens.colors.amber.base,
    },
    {
      chapter: 4,
      title: "Building Bridges",
      icon: Globe,
      text: "Cultural diplomacy became the cornerstone. Through partnerships with embassies, governments, and international institutions across 25+ countries, QIAF transformed into more than an art festival—it became a platform for global dialogue.",
      image: "https://i.postimg.cc/d3qwvxTh/image.png", // Embassy events
      color: "#9B59B6",
    },
    {
      chapter: 5,
      title: "Empowering Youth",
      icon: Users,
      text: "The next generation became the focus. Youth programs, hackathons, and mentorship initiatives were launched to ensure that young leaders have the tools, confidence, and networks to drive cultural and technological innovation.",
      image: "https://i.postimg.cc/CKFVPVbS/image.png", // Youth programs
      color: "#E74C3C",
    },
    {
      chapter: 6,
      title: "Signature Collaborations",
      icon: Heart,
      text: "Partnering with India's finest designers—Abu Jani, Sandeep Khosla, Manish Malhotra, and more—created a unique fusion of fashion and art. These collaborations showcased how traditional craftsmanship meets contemporary vision.",
      image: "https://i.postimg.cc/YSkbQrYP/image.png", // 📸 PLACEHOLDER: Designer collaboration photo
      color: "#16A085",
    },
    {
      chapter: 7,
      title: "Recognition & Impact",
      icon: Award,
      text: "Awards and media features followed—not as an end goal, but as validation of the mission. Recognition from Gulf Business, HuffMag, and cultural institutions across the Arab world reflected the ripple effect of this work.",
      image: "https://i.postimg.cc/YCZk2V3C/image.png", // 📸 PLACEHOLDER: Award ceremony
      color: "#F39C12",
    },
    {
      chapter: 8,
      title: "Personal Philosophy",
      icon: Lightbulb,
      text: "At the core is a simple belief: art is not decoration—it's transformation. Every exhibition, program, and partnership is designed to spark conversations, challenge perspectives, and create lasting change. This is just the beginning.",
      image: "https://thearableader.com/wp-content/uploads/2025/08/Jihane-Arfaoui-42-1536x819.jpg", // Featured media
      color: "#8E44AD",
    },
  ];

  return (
    <main className="relative bg-canvas overflow-hidden">
      {/* BOLD HERO SECTION */}
      <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
        {/* Background Image Layer - Bridge/pathway representing journey */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920&q=80)',
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-coral/30"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Heart className="w-4 h-4 text-coral" />
                <span className="text-sm font-semibold text-coral">The Journey</span>
            </motion.div>

              {/* Main headline */}
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block gradient-text mb-3">From Law & Finance</span>
                <span className="block gradient-text mb-3">to Cultural Visionary</span>
                <span className="block gradient-text">Redefining Qatar's Arts Scene</span>
              </h1>

              {/* Quote */}
              <motion.blockquote
                className="border-l-4 border-coral pl-6 py-4 italic text-xl text-secondary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                "Art itself is a healing force. Art is an ultimate form of meditation."
              </motion.blockquote>

              {/* Quick roles */}
              <div className="space-y-3">
                {[
                  { role: "CEO & Founder", org: "Qatar International Art Festival" },
                  { role: "Founder & President", org: "MAPS International WLL" },
                  { role: "Board Director", org: "Silk Painters International, USA" },
                  { role: "Chairperson (Qatar)", org: "Human Rights International Federation" },
                ].map((item, i) => (
                  <motion.div
                    key={item.org}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-coral mt-2 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-primary">{item.role}</span>
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
                <Link to="/projects" className="btn btn-primary">
                  Explore Work
                </Link>
                <Link to="/awards" className="btn btn-ghost">
                  Recognition
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT: Featured Image - Premium Layered */}
          <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              {/* Decorative background frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-coral/20 to-sky/20 rounded-3xl blur-2xl scale-105 -z-10" />
              
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20">
              <img
                src="https://i.postimg.cc/x1jWS3FM/image.png"
                  alt="Rashmi Agarwal - Cultural Visionary"
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
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold text-white">15+</div>
                        <div className="text-xs text-white/70 mt-1">Years</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">100+</div>
                        <div className="text-xs text-white/70 mt-1">Nationalities</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">70+</div>
                        <div className="text-xs text-white/70 mt-1">Countries</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
            </div>
          </motion.div>
          </div>
        </div>
      </section>

      {/* Vertical Timeline - Each chapter scrolls in smoothly */}
      <section className="bg-gradient-to-b from-mist to-canvas py-20">
        <div className="max-w-4xl mx-auto px-8 mb-16 text-center">
          <h2 className="text-5xl font-bold gradient-text mb-4">
            The Journey in 8 Chapters
          </h2>
          <p className="text-xl text-secondary">
            From Mumbai to Qatar: Building bridges through art when the world needed them most
          </p>
        </div>
        {chapters.map((chapter) => (
          <div key={chapter.chapter} className="min-h-screen">
            <Chapter {...chapter} />
          </div>
        ))}
      </section>

      {/* Designer Showcase */}
      <DesignerShowcase />

      {/* Bio Section */}
      <section className="py-20 bg-gradient-to-b from-mist to-canvas">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl font-bold gradient-text mb-6">About Rashmi</h2>
                <div className="space-y-4 text-lg text-secondary leading-relaxed">
                  <p>
                    Rashmi Agarwal is the visionary founder and president of MAPS International WLL, Qatar's premier cultural bridge-building organization. Born with a passion for cultural diplomacy and international collaboration, Rashmi has dedicated over 11 years to transforming Qatar's cultural landscape through innovative programming and strategic partnerships.
                  </p>
                  <p>
                    Her journey began in 2014 when she recognized the need for a platform that could connect Qatar with the world through art and culture. Starting with local art workshops and summer camps, Rashmi's vision evolved into creating Qatar's most successful international cultural festival, QIAF, which now attracts 400+ artists from 70+ countries annually.
                  </p>
                  <p>
                    The turning point came in 2019 when QIAF's 2nd edition brought together 232 artists from 64 countries, establishing Qatar as a major player in international cultural diplomacy. This success led to government endorsement, partnerships with Katara Cultural Village, and recognition as one of the world's most celebrated art gatherings.
                  </p>
                  <p>
                    Today, Rashmi's vision extends beyond art festivals to encompass youth development, space science education, and comprehensive cultural bridge-building. Her work directly supports Qatar National Vision 2030, creating lasting impact through education, innovation, and international collaboration.
                  </p>
                </div>
            </motion.div>
            </div>

            {/* Milestones Sidebar */}
            <div className="space-y-4">
              {[
                { year: "2014", label: "MAPS International Founded", icon: Sparkles },
                { year: "2019", label: "QIAF International Breakthrough", icon: Globe },
                { year: "2021", label: "UNESCO Partnership", icon: Award },
                { year: "2024", label: "KSSP Launch", icon: Rocket },
                { year: "2025", label: "QIAF 7th Edition", icon: TrendingUp },
              ].map((milestone, i) => (
                <motion.div 
                  key={milestone.year}
                  className="bento-card p-6"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: -4 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-coral/20 to-sky/20 flex items-center justify-center flex-shrink-0">
                      <milestone.icon className="w-6 h-6 text-coral" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold gradient-text">{milestone.year}</div>
                      <div className="text-sm text-secondary mt-1">{milestone.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Expertise Section */}
      <section className="py-20 bg-gradient-to-b from-canvas to-mist">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold gradient-text mb-4">
              Core Expertise
            </h2>
            <p className="text-xl text-secondary">
              Building cultural impact through strategic excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Globe,
                title: "International Cultural Diplomacy",
                desc: "Building bridges between 70+ countries through art and cultural exchange",
                color: tokens.colors.coral.base,
              },
              {
                icon: Briefcase,
                title: "Strategic Partnership Development",
                desc: "Government and institutional partnerships with Katara, British Council, NASA",
                color: tokens.colors.sky.base,
              },
              {
                icon: Lightbulb,
                title: "Educational Program Innovation",
                desc: "Creating cutting-edge programs like KSSP and The YOUTH platform",
                color: tokens.colors.amber.base,
              },
              {
                icon: Award,
                title: "Event Management Excellence",
                desc: "Delivering world-class cultural festivals with 11+ years proven success",
                color: "#9B59B6",
              },
              {
                icon: Users,
                title: "Youth Development Leadership",
                desc: "Empowering Qatar's next generation through comprehensive initiatives",
                color: "#E74C3C",
              },
              {
                icon: BookOpen,
                title: "Government Relations",
                desc: "Maintaining strong partnerships with Qatar government entities",
                color: "#16A085",
              },
              {
                icon: Sparkles,
                title: "Media & Communications",
                desc: "Managing comprehensive press coverage across 8+ Qatar publications",
                color: "#F39C12",
              },
              {
                icon: Heart,
                title: "Cultural Tourism Development",
                desc: "Contributing to Qatar's tourism strategy through cultural programming",
                color: "#3498DB",
              },
            ].map((expertise, i) => (
              <motion.div
                key={expertise.title}
                className="bento-card p-8 text-center group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12"
                  style={{ backgroundColor: `${expertise.color}20` }}
                >
                  <expertise.icon className="w-8 h-8" style={{ color: expertise.color }} />
                  </div>
                <h3 className="text-xl font-bold text-primary mb-3">{expertise.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{expertise.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Philosophy Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
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

        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-4">
              Guiding Principles
            </h2>
            <p className="text-xl text-white/70">
              The values that shape every initiative and partnership
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                number: "01",
                title: "Mapping Possibilities, Building Impact",
                desc: "Every initiative must create measurable positive change. We don't just organize events—we build lasting platforms for cultural transformation and social progress.",
                color: tokens.colors.coral.base,
              },
              {
                number: "02",
                title: "Cultural Bridge-Building",
                desc: "Art and culture are the universal languages that connect humanity. Through exhibitions, programs, and partnerships, we create spaces where diverse voices find common ground.",
                color: tokens.colors.sky.base,
              },
              {
                number: "03",
                title: "Youth Empowerment",
                desc: "Investing in young people today creates tomorrow's leaders. Our programs provide tools, networks, and confidence for the next generation to drive innovation.",
                color: tokens.colors.amber.base,
              },
              {
                number: "04",
                title: "International Collaboration",
                desc: "Global partnerships amplify local impact. By connecting 70+ countries, we demonstrate that collaboration—not competition—builds sustainable cultural development.",
                color: "#9B59B6",
              },
              {
                number: "05",
                title: "Innovation Through Tradition",
                desc: "Honoring cultural heritage while embracing modern innovation. We preserve what matters while creating new forms of expression for contemporary audiences.",
                color: "#16A085",
              },
            ].map((principle, i) => (
              <motion.div 
                key={principle.number}
                className="glass-frosted p-8 rounded-3xl relative overflow-hidden group"
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className="absolute top-0 right-0 text-8xl font-bold opacity-5">
                  {principle.number}
                </div>
                <div className="relative z-10">
                  <div
                    className="text-6xl font-bold mb-4 opacity-50"
                    style={{ color: principle.color }}
                  >
                    {principle.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: principle.color }}>
                    {principle.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">{principle.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-canvas to-mist">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-5xl font-bold gradient-text mb-6">
              Let's Write the Next Chapter
            </h2>
            <p className="text-xl text-secondary mb-12">
              Every partnership, project, and program is an opportunity to create impact.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/projects" className="btn btn-primary">
                Explore Projects
                    </Link>
              <Link to="/contact" className="btn btn-ghost">
                Start a Conversation
                    </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image placeholders note */}
      <section className="py-12 bg-mist">
        <div className="max-w-4xl mx-auto px-8">
          <div className="glass rounded-3xl p-8 border-2 border-dashed border-sky/30">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-sky" />
              📸 Images Needed for Timeline
            </h3>
            <ul className="space-y-2 text-sm text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-coral mt-1">•</span>
                <span><strong>Chapter 1:</strong> Young Rashmi or family photo (origin story)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-coral mt-1">•</span>
                <span><strong>Chapter 2:</strong> University/early career photo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-coral mt-1">•</span>
                <span><strong>Chapter 3:</strong> First QIAF event (2018-2019)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-coral mt-1">•</span>
                <span><strong>Chapter 7:</strong> Award ceremony moments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-coral mt-1">•</span>
                <span><strong>Designers:</strong> 6 headshots (Abu Jani, Sandeep Khosla, Manish Malhotra, Tarun Tahiliani, Ritu Kumar, JJ Valaya)</span>
              </li>
            </ul>
          </div>
    </div>
      </section>
    </main>
  );
}
