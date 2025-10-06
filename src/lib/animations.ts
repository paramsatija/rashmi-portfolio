/**
 * Animation Library - Apple-inspired motion variants
 * Using framer-motion for smooth, purposeful animations
 */

import { type Transition, type Variant } from "framer-motion";

/**
 * Apple's signature easing curve
 * More natural than default easeInOut
 */
export const appleEasing = [0.4, 0, 0.2, 1] as const;
export const appleSpring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 16,
  mass: 0.6,
};

/**
 * Fade In Up - Primary entrance animation
 */
export const fadeInUp = {
  initial: { opacity: 0, y: 30, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -20, filter: "blur(4px)" },
  transition: { duration: 0.6, ease: appleEasing },
};

/**
 * Fade In Up with Delay - For staggered lists
 */
export const fadeInUpStagger = (index: number = 0, baseDelay: number = 0.05) => ({
  initial: { opacity: 0, y: 30, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.6, delay: index * baseDelay, ease: appleEasing },
});

/**
 * Scale In - For cards and modals
 */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.9, filter: "blur(8px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
  transition: { duration: 0.5, ease: appleEasing },
};

/**
 * Slide In from Right - For panels and drawers
 */
export const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
  transition: { duration: 0.4, ease: appleEasing },
};

/**
 * Slide In from Left
 */
export const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
  transition: { duration: 0.4, ease: appleEasing },
};

/**
 * Float - Subtle hover effect
 */
export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Glow Pulse - For attention-grabbing elements
 */
export const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(255, 63, 164, 0.3)",
      "0 0 40px rgba(255, 63, 164, 0.5)",
      "0 0 20px rgba(255, 63, 164, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Parallax Scroll - For hero images
 */
export const createParallax = (distance: number = 50) => ({
  initial: { y: 0 },
  animate: { y: distance },
});

/**
 * Stagger Container - For lists and grids
 */
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

/**
 * Stagger Item - Child of stagger container
 */
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: appleEasing },
};

/**
 * Page Transition - For route changes
 */
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: appleEasing },
};

/**
 * Magnetic Button - Interactive hover effect
 */
export const magneticHover = {
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: appleEasing },
  },
  whileTap: {
    scale: 0.95,
  },
};

/**
 * Rotate In - For badges and icons
 */
export const rotateIn = {
  initial: { opacity: 0, rotate: -10, scale: 0.8 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  transition: { duration: 0.5, ease: appleEasing },
};

/**
 * Viewport Reveal - Trigger on scroll
 */
export const viewportReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: appleEasing },
};

/**
 * Glass Card Hover
 */
export const glassCardHover = {
  rest: {
    scale: 1,
    boxShadow: "0 8px 32px rgba(255, 63, 164, 0.08)",
  },
  hover: {
    scale: 1.02,
    y: -8,
    boxShadow: "0 16px 48px rgba(255, 63, 164, 0.15)",
    transition: { duration: 0.3, ease: appleEasing },
  },
};

/**
 * Shimmer Effect - For loading states
 */
export const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

/* ========== APPLE 2025 ADVANCED ANIMATIONS ========== */

/**
 * Word-by-Word Reveal - Dramatic text entrance
 */
export const wordReveal = (wordIndex: number = 0) => ({
  initial: { opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: wordIndex * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

/**
 * Breathe Effect - Subtle pulsing glow
 */
export const breatheGlow = {
  animate: {
    boxShadow: [
      "0 0 40px rgba(255, 63, 164, 0.3)",
      "0 0 80px rgba(255, 63, 164, 0.6), 0 0 120px rgba(124, 77, 255, 0.4)",
      "0 0 40px rgba(255, 63, 164, 0.3)",
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Elastic Scale - Bouncy entrance
 */
export const elasticScale = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 12,
      mass: 0.5,
    },
  },
};

/**
 * 3D Tilt - Interactive card effect
 */
export const tilt3D = {
  rest: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  },
  hover: {
    rotateX: 2,
    rotateY: 2,
    scale: 1.02,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

/**
 * Blur to Focus - Progressive clarity
 */
export const blurFocus = {
  initial: { opacity: 0, filter: "blur(20px)" },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Slide Up Bounce - Playful entrance
 */
export const slideUpBounce = (delay: number = 0) => ({
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: [60, -10, 5, 0],
    transition: {
      duration: 0.8,
      delay,
      times: [0, 0.6, 0.8, 1],
      ease: [0.68, -0.55, 0.265, 1.55],
    },
  },
});

/**
 * Cascade In - Sequential reveal
 */
export const cascadeIn = (index: number = 0) => ({
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

/**
 * Counter Up - Number animation
 */
export const counterUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * Spotlight - Mouse-follow effect
 */
export const spotlightHover = {
  rest: {
    background: "transparent",
  },
  hover: {
    background: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/**
 * Parallax Depth - Multi-layer movement
 */
export const parallaxLayer = (speed: number = 0.5) => ({
  animate: {
    y: ["0%", `${speed * 100}%`],
    transition: {
      duration: 1,
      ease: "linear",
    },
  },
});

/**
 * Text Scramble - Glitch effect
 */
export const textScramble = {
  initial: { opacity: 1 },
  animate: {
    opacity: [1, 0.3, 1],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

/**
 * Liquid Morph - Organic shape animation
 */
export const liquidMorph = {
  animate: {
    borderRadius: [
      "60% 40% 30% 70% / 60% 30% 70% 40%",
      "30% 60% 70% 40% / 50% 60% 30% 60%",
      "60% 40% 30% 70% / 60% 30% 70% 40%",
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Progressive Number Reveal
 */
export const numberReveal = (value: number, duration: number = 1.5) => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

/**
 * Magnetic Pull - Button attraction
 */
export const magneticPull = {
  whileHover: {
    scale: 1.05,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  whileTap: {
    scale: 0.95,
  },
};

/**
 * Glass Reflection - Shine effect
 */
export const glassReflection = {
  rest: {
    background: "transparent",
  },
  hover: {
    background: [
      "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)",
    ],
    backgroundPosition: ["0% 50%", "100% 50%"],
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

