/**
 * HOMEPAGE — THE CINEMATIC REVEAL
 * 5-Act Scroll Storytelling | Apple-Level Transformation | World-Class
 * 
 * ACT 1: The Entrance (0-20%) - Fullscreen portrait
 * ACT 2: The Work Reveals (20-40%) - Cascading images
 * ACT 3: The Impact (40-60%) - Stats with physics
 * ACT 4: The Showcase (60-80%) - Bento portals
 * ACT 5: The Invitation (80-100%) - CTA with gravity
 */

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  animate,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { 
  Sparkles, 
  Award, 
  Users, 
  Globe, 
  ArrowRight,
  Zap,
  Heart,
  Palette,
  TrendingUp,
} from "lucide-react";
import { tokens } from "@/lib/tokens";
import { motionVariants } from "@/lib/motion-variants";

/* ==========================================
   MAGNETIC CURSOR HOOK
   ========================================== */
const useMagneticCursor = (ref: React.RefObject<HTMLElement>, strength: number = 30) => {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      
      if (distance < 200) {
        const pullX = (distanceX / distance) * strength * (1 - distance / 200);
        const pullY = (distanceY / distance) * strength * (1 - distance / 200);
        setOffset({ x: pullX, y: pullY });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [ref, strength]);

  return offset;
};

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
        ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
};

/* ==========================================
   ACT 1: THE ENTRANCE
   Fullscreen portrait with magnetic cursor
   ========================================== */
const Act1Entrance: React.FC<{ scrollProgress: any }> = ({ scrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const magneticOffset = useMagneticCursor(imageRef, 20);

  const opacity = useTransform(scrollProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollProgress, [0, 0.2], [1, 0.95]);
  const blur = useTransform(scrollProgress, [0, 0.2], [0, 10]);
  
  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale }}
      className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none"
    >
      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: `radial-gradient(circle, ${tokens.colors.sky.base} 0%, transparent 70%)`,
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-8 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* LEFT: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: tokens.motion.ease.appleEase }}
          className="space-y-6"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-coral/20"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-coral" />
            <span className="text-sm font-medium text-coral">Cultural Visionary</span>
          </motion.div>

          <h1 className="text-7xl lg:text-8xl font-bold leading-none tracking-tight">
            <motion.span
              className="block gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Rashmi
            </motion.span>
            <motion.span
              className="block gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Agarwal
            </motion.span>
          </h1>

          <motion.p
            className="text-2xl text-secondary leading-relaxed max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Curator
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {["Qatar International Art Festival", "15+ Years", "Cultural Diplomacy"].map((tag, i) => (
              <motion.span
                key={tag}
                className="chip"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + i * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: Image with magnetic effect */}
        <motion.div
          ref={imageRef}
          className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0"
          style={{
            x: magneticOffset.x,
            y: magneticOffset.y,
            filter: blurFilter,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          {/* 📸 PLACEHOLDER: Hero Portrait */}
          <div className="relative w-full h-full rounded-3xl overflow-hidden glass shadow-xl">
            <img
              src="https://i.postimg.cc/x1jWS3FM/image.png"
              alt="Rashmi Agarwal"
              className="w-full h-full object-cover"
            />
            
            {/* Breathing glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                boxShadow: `0 0 60px rgba(255, 107, 74, 0.4), 0 0 120px rgba(74, 158, 255, 0.3)`,
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Floating badge */}
          <motion.div
            className="absolute -bottom-6 -right-6 glass rounded-2xl p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.05, rotate: 3 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">15+</div>
              <div className="text-xs text-secondary mt-1">Years Leading</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

/* ==========================================
   ACT 2: THE WORK REVEALS
   Images cascade in with 3D tilt
   ========================================== */
const Act2WorkReveals: React.FC<{ scrollProgress: any }> = ({ scrollProgress }) => {
  const opacity = useTransform(scrollProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.2, 0.4], [100, -100]);

  const works = [
    {
      title: "QIAF 2024",
      img: "https://i.postimg.cc/fbdJVkXn/image.png",
      position: { top: "10%", left: "10%" },
    },
    {
      title: "Embassy Reception",
      img: "https://i.postimg.cc/d3qwvxTh/image.png",
      position: { top: "15%", right: "15%" },
    },
    {
      title: "Youth Programs",
      img: "https://i.postimg.cc/CKFVPVbS/image.png",
      position: { bottom: "20%", left: "20%" },
    },
    {
      title: "Cultural Diplomacy",
      img: "https://i.postimg.cc/g0FkD52H/image.png",
      position: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    },
  ];

  return (
    <motion.section
      style={{ opacity }}
      className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center"
    >
      <motion.div style={{ y }} className="relative w-full h-full">
        {works.map((work, i) => (
          <motion.div
            key={work.title}
            className="absolute w-64 h-80 rounded-2xl overflow-hidden shadow-2xl perspective-container"
            style={work.position as any}
            initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{
              delay: i * 0.15,
              duration: 0.8,
              ease: tokens.motion.ease.appleEase,
            }}
            whileHover={{
              scale: 1.05,
              rotateY: 10,
              rotateX: 5,
              z: 50,
            }}
          >
            <img
              src={work.img}
              alt={work.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
              <span className="text-white font-semibold text-sm">{work.title}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

/* ==========================================
   ACT 3: THE IMPACT
   Stats with physics bounce
   ========================================== */
const Act3Impact: React.FC<{ scrollProgress: any }> = ({ scrollProgress }) => {
  const opacity = useTransform(scrollProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.4, 0.5, 0.6], [0.8, 1, 0.95]);

  // Background color morphing
  const bgHue = useTransform(scrollProgress, [0.4, 0.5, 0.6], [10, 36, 210]); // coral → amber → sky
  const bgColor = useMotionTemplate`hsl(${bgHue}, 100%, 64.5%)`;

  const stats = [
    { icon: TrendingUp, value: 15, suffix: "+", label: "Years Leading" },
    { icon: Globe, value: 25, suffix: "+", label: "Countries" },
    { icon: Users, value: 40, suffix: "+", label: "Youth Programs" },
    { icon: Award, value: 850, suffix: "+", label: "Media Features" },
  ];

  return (
    <motion.section
      style={{ opacity }}
      className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center"
    >
      <motion.div
        style={{ scale }}
        className="relative max-w-5xl mx-auto px-8"
      >
        {/* Background morphing orb */}
        <motion.div
          className="absolute inset-0 blur-3xl opacity-20 rounded-full"
          style={{ background: bgColor }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-6xl font-bold gradient-text mb-4">
            Impact by Numbers
          </h2>
          <p className="text-xl text-secondary">
            15 years of cultural transformation
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="glass rounded-3xl p-8 text-center relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-coral/10 to-sky/10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.3 }}
              />
              
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-coral" />
              <div className="text-5xl font-bold gradient-text mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={2.5} />
              </div>
              <div className="text-sm text-secondary font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

/* ==========================================
   ACT 4: THE SHOWCASE
   Bento grid portals
   ========================================== */
const Act4Showcase: React.FC<{ scrollProgress: any }> = ({ scrollProgress }) => {
  const opacity = useTransform(scrollProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
  const y = useTransform(scrollProgress, [0.6, 0.7], [100, 0]);

  const projects = [
    {
      id: 1,
      title: "Qatar International Art Festival",
      subtitle: "7th Edition • 2025",
      image: "https://i.postimg.cc/fbdJVkXn/image.png",
      size: "large",
    },
    {
      id: 2,
      title: "Youth Empowerment",
      subtitle: "5,000+ leaders",
      image: "https://i.postimg.cc/CKFVPVbS/image.png",
      size: "medium",
    },
    {
      id: 3,
      title: "Cultural Diplomacy",
      subtitle: "15+ partnerships",
      image: "https://i.postimg.cc/d3qwvxTh/image.png",
      size: "medium",
    },
    {
      id: 4,
      title: "Space Science Program",
      subtitle: "NASA • ISRO",
      image: "https://i.postimg.cc/mkZ5XGXh/image.png",
      size: "small",
    },
    {
      id: 5,
      title: "Media Recognition",
      subtitle: "850+ features",
      image: "https://i.postimg.cc/YCZk2V3C/image.png",
      size: "small",
    },
  ];

  return (
    <motion.section
      style={{ opacity }}
      className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y }} className="max-w-7xl mx-auto px-8 w-full">
        <motion.h2
          className="text-5xl font-bold text-center gradient-text mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Featured Work
        </motion.h2>

        <div className="grid grid-cols-4 gap-6 auto-rows-[200px]">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: i * 0.1,
                type: "spring",
                stiffness: 150,
                damping: 20,
              }}
              whileHover={{
                scale: 1.05,
                z: 50,
              }}
              className={`bento-card group cursor-pointer overflow-hidden ${
                project.size === "large"
                  ? "col-span-2 row-span-2"
                  : project.size === "medium"
                  ? "col-span-2 row-span-1"
                  : "col-span-1 row-span-1"
              }`}
            >
              <div className="relative w-full h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                  <p className="text-white/80 text-sm">{project.subtitle}</p>
                  
                  <motion.div
                    className="mt-4 opacity-0 group-hover:opacity-100"
                    transition={{ delay: 0.1 }}
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

/* ==========================================
   ACT 5: THE INVITATION
   CTA with gravitational pull
   ========================================== */
const Act5Invitation: React.FC<{ scrollProgress: any }> = ({ scrollProgress }) => {
  const opacity = useTransform(scrollProgress, [0.8, 0.9], [0, 1]);
  const scale = useTransform(scrollProgress, [0.8, 0.95], [0.9, 1]);

  const ctaRef = useRef<HTMLDivElement>(null);
  const magneticOffset = useMagneticCursor(ctaRef, 40);

  return (
    <motion.section
      style={{ opacity, scale }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Aurora background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(255,107,74,0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(255,184,77,0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(74,158,255,0.1) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        ref={ctaRef}
        className="relative text-center max-w-3xl mx-auto px-8"
        style={{
          x: magneticOffset.x,
          y: magneticOffset.y,
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-coral/30 mb-8"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-4 h-4 text-coral" />
          <span className="text-sm font-medium text-coral">Ready to collaborate?</span>
        </motion.div>

        <h2 className="text-6xl lg:text-7xl font-bold gradient-text mb-6 leading-tight">
          Let's Create Something
          <br />
          Extraordinary Together
        </h2>

        <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto">
          Whether it's a cultural initiative, youth program, or international collaboration,
          every great project starts with a conversation.
        </p>

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

            {/* Animated glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-coral via-amber to-sky opacity-0 group-hover:opacity-50 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.button>
        </Link>

        {/* Contact preview */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-8 text-sm text-secondary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Available for partnerships</span>
          </div>
          <div>•</div>
          <div>Response within 24 hours</div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

/* ==========================================
   MAIN HOMEPAGE COMPONENT
   ========================================== */
export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={containerRef} className="relative bg-canvas">
      {/* Container needs to be tall for scroll-based animations */}
      <div className="h-[500vh] relative">
        <Act1Entrance scrollProgress={scrollYProgress} />
        <Act2WorkReveals scrollProgress={scrollYProgress} />
        <Act3Impact scrollProgress={scrollYProgress} />
        <Act4Showcase scrollProgress={scrollYProgress} />
        <Act5Invitation scrollProgress={scrollYProgress} />
      </div>

      {/* Final static footer section */}
      <section className="relative py-20 bg-gradient-to-b from-canvas to-mist">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <Link to="/about" className="btn btn-ghost">
                Learn More About Me
              </Link>
              <Link to="/projects" className="btn btn-ghost">
                Explore Projects
              </Link>
              <Link to="/awards" className="btn btn-ghost">
                View Recognition
              </Link>
            </div>

            <p className="text-sm text-tertiary mt-12">
              © {new Date().getFullYear()} Rashmi Agarwal. All rights reserved.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
