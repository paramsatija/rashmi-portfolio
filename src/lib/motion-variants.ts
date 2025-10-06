/**
 * MOTION VARIANTS LIBRARY
 * Reusable Framer Motion animation variants
 * Apple-level consistency across all animations
 */

import { Variant, type Transition } from 'framer-motion';
import { motion } from './tokens';

// ============================================
// BASE TRANSITIONS
// ============================================

const baseTransition: Transition = {
  duration: motion.duration.base / 1000,
  ease: motion.ease.appleEase,
};

const springTransition: Transition = {
  ...motion.ease.spring,
};

// ============================================
// ENTRANCE ANIMATIONS
// ============================================

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: baseTransition,
};

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: baseTransition,
};

export const fadeInDown = {
  initial: { opacity: 0, y: -24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
  transition: baseTransition,
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 12 },
  transition: baseTransition,
};

export const fadeInRight = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -12 },
  transition: baseTransition,
};

// ============================================
// SCALE ANIMATIONS
// ============================================

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: springTransition,
};

export const scaleInBounce = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: {
    ...motion.ease.springBounce,
  },
};

// ============================================
// BLUR ANIMATIONS (Apple-style reveal)
// ============================================

export const blurFadeIn = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, filter: 'blur(10px)' },
  transition: {
    duration: motion.duration.slow / 1000,
    ease: motion.ease.appleSpring,
  },
};

export const blurSlideUp = {
  initial: { opacity: 0, y: 40, filter: 'blur(10px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -20, filter: 'blur(5px)' },
  transition: {
    duration: motion.duration.slow / 1000,
    ease: motion.ease.appleSpring,
  },
};

// ============================================
// STAGGER UTILITIES
// ============================================

export const createStaggerVariant = (index: number, baseDelay = motion.stagger.base) => ({
  initial: { opacity: 0, y: 24 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      ...baseTransition,
      delay: index * baseDelay,
    },
  },
});

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: motion.stagger.base,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: baseTransition,
  },
};

// ============================================
// HOVER ANIMATIONS
// ============================================

export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: { 
    y: -4, 
    scale: 1.02,
    transition: {
      duration: motion.duration.base / 1000,
      ease: motion.ease.out,
    },
  },
};

export const hoverScale = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: motion.duration.base / 1000,
      ease: motion.ease.out,
    },
  },
};

export const hoverGlow = {
  rest: { 
    boxShadow: '0 8px 32px rgba(74, 158, 255, 0.08)',
  },
  hover: { 
    boxShadow: '0 16px 48px rgba(74, 158, 255, 0.15), 0 0 40px rgba(255, 107, 74, 0.2)',
    transition: {
      duration: motion.duration.base / 1000,
      ease: motion.ease.out,
    },
  },
};

// ============================================
// VIEWPORT ANIMATIONS (Scroll-triggered)
// ============================================

export const viewportReveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: {
    duration: motion.duration.moderate / 1000,
    ease: motion.ease.appleSpring,
  },
};

export const viewportSlideIn = (direction: 'left' | 'right' = 'left') => ({
  initial: { 
    opacity: 0, 
    x: direction === 'left' ? -40 : 40,
  },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: {
    duration: motion.duration.moderate / 1000,
    ease: motion.ease.appleSpring,
  },
});

// ============================================
// SPECIAL EFFECTS
// ============================================

export const magneticPull = {
  whileHover: { 
    scale: 1.05, 
    y: -2,
    transition: {
      ...motion.ease.springBounce,
      duration: motion.duration.fast / 1000,
    },
  },
  whileTap: { scale: 0.95 },
};

export const breathe = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: {
    duration: motion.duration.moderate / 1000,
    ease: motion.ease.appleEase,
  },
};

// ============================================
// MODAL/OVERLAY ANIMATIONS
// ============================================

export const modalBackdrop = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: motion.duration.base / 1000,
  },
};

export const modalContent = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 10 },
  transition: {
    ...springTransition,
    duration: motion.duration.moderate / 1000,
  },
};

// ============================================
// EXPORT ALL
// ============================================

export const motionVariants = {
  // Entrance
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleInBounce,
  
  // Blur effects
  blurFadeIn,
  blurSlideUp,
  
  // Stagger
  staggerContainer,
  staggerItem,
  createStaggerVariant,
  
  // Hover
  hoverLift,
  hoverScale,
  hoverGlow,
  
  // Viewport
  viewportReveal,
  viewportSlideIn,
  
  // Special
  magneticPull,
  breathe,
  float,
  
  // Page
  pageTransition,
  
  // Modal
  modalBackdrop,
  modalContent,
} as const;

export default motionVariants;

