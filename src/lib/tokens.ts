/**
 * RASHMI AGARWAL PORTFOLIO - DESIGN SYSTEM TOKENS
 * Apple-level consistency: Every value intentional, systematic, scalable
 * 
 * Last updated: 2025
 * Version: 1.0.0
 */

// ============================================
// COLOR SYSTEM
// ============================================

export const colors = {
  // Primary Palette
  coral: {
    base: '#FF6B4A',
    light: '#FF8A6F',
    dark: '#E54E2E',
    alpha: (opacity: number) => `rgba(255, 107, 74, ${opacity})`,
  },
  sky: {
    base: '#4A9EFF',
    light: '#6FB3FF',
    dark: '#2E7FE5',
    alpha: (opacity: number) => `rgba(74, 158, 255, ${opacity})`,
  },
  amber: {
    base: '#FFB84D',
    light: '#FFC970',
    dark: '#E59E2E',
    alpha: (opacity: number) => `rgba(255, 184, 77, ${opacity})`,
  },

  // Neutrals
  canvas: '#FDFCF9',
  frost: '#F7F9FC',
  mist: '#EEF4FB',
  
  // Text Hierarchy
  text: {
    primary: '#1A2332',
    secondary: '#4A5568',
    tertiary: '#718096',
    disabled: '#A0AEC0',
  },

  // Surface
  surface: {
    base: '#FFFFFF',
    elevated: '#FAFBFC',
    overlay: 'rgba(255, 255, 255, 0.92)',
  },

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

// ============================================
// TYPOGRAPHY SYSTEM
// ============================================

export const typography = {
  // Font Families
  fontFamily: {
    display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
    text: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", system-ui, sans-serif',
    mono: 'ui-monospace, "SF Mono", Monaco, "Cascadia Code", monospace',
  },

  // Type Scale (based on 16px = 1rem)
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '2rem',      // 32px
    '4xl': '3rem',      // 48px
    '5xl': '4rem',      // 64px
    '6xl': '6rem',      // 96px
  },

  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line Heights (relative to font size)
  lineHeight: {
    tight: 1.1,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.75,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '0em',
    wide: '0.01em',
    wider: '0.02em',
  },
} as const;

// ============================================
// SPACING SYSTEM (8px Grid)
// ============================================

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px  - hairline
  2: '0.5rem',    // 8px  - tight
  3: '0.75rem',   // 12px - compact
  4: '1rem',      // 16px - base
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px - comfortable
  8: '2rem',      // 32px - relaxed
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px - spacious
  16: '4rem',     // 64px - generous
  20: '5rem',     // 80px - section
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const;

// ============================================
// BORDER RADIUS SYSTEM
// ============================================

export const radius = {
  none: '0',
  sm: '0.5rem',    // 8px
  base: '0.75rem', // 12px
  md: '1rem',      // 16px
  lg: '1.25rem',   // 20px
  xl: '1.5rem',    // 24px
  '2xl': '1.75rem', // 28px
  '3xl': '2rem',    // 32px
  full: '9999px',
} as const;

// ============================================
// SHADOW SYSTEM (Elevation)
// ============================================

export const shadows = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.02)',
  base: '0 4px 16px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03)',
  md: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04)',
  lg: '0 16px 48px rgba(0, 0, 0, 0.10), 0 8px 24px rgba(0, 0, 0, 0.05)',
  xl: '0 24px 64px rgba(0, 0, 0, 0.12), 0 12px 32px rgba(0, 0, 0, 0.06)',
  
  // Colored shadows for brand elements
  coral: `0 8px 24px ${colors.coral.alpha(0.25)}, 0 2px 8px ${colors.coral.alpha(0.15)}`,
  sky: `0 8px 24px ${colors.sky.alpha(0.20)}, 0 2px 8px ${colors.sky.alpha(0.12)}`,
  amber: `0 8px 24px ${colors.amber.alpha(0.22)}, 0 2px 8px ${colors.amber.alpha(0.14)}`,
} as const;

// ============================================
// MOTION SYSTEM
// ============================================

export const motion = {
  // Duration (Fibonacci-based)
  duration: {
    instant: 0,
    fast: 150,
    base: 300,
    moderate: 450,
    slow: 600,
    leisurely: 900,
  },

  // Easing Curves
  ease: {
    // Standard easing
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
    in: 'cubic-bezier(0.7, 0, 0.84, 0)',
    
    // Apple-style easing
    appleEase: [0.4, 0, 0.2, 1] as const,
    appleSpring: [0.22, 1, 0.36, 1] as const,
    
    // Spring physics
    spring: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
    springBounce: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 10,
    },
  },

  // Stagger (for sequential animations)
  stagger: {
    base: 0.08,    // 80ms between items
    fast: 0.05,    // 50ms
    slow: 0.12,    // 120ms
  },
} as const;

// ============================================
// BLUR SYSTEM (Glassmorphism)
// ============================================

export const blur = {
  none: '0',
  sm: '8px',
  base: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
} as const;

// ============================================
// BREAKPOINTS (Responsive)
// ============================================

export const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Wide desktop
  '2xl': '1536px', // Ultra-wide
} as const;

// ============================================
// Z-INDEX SYSTEM
// ============================================

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;

// ============================================
// COMPONENT TOKENS
// ============================================

export const components = {
  // Glassmorphic Cards
  glass: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(247, 249, 252, 0.92) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(32px) saturate(180%)',
    borderRadius: radius['2xl'],
    shadow: shadows.md,
  },

  // Buttons
  button: {
    padding: {
      sm: `${spacing[2]} ${spacing[4]}`,
      base: `${spacing[3]} ${spacing[6]}`,
      lg: `${spacing[4]} ${spacing[8]}`,
    },
    borderRadius: radius.full,
    transition: `all ${motion.duration.base}ms ${motion.ease.inOut}`,
  },

  // Input Fields
  input: {
    padding: spacing[4],
    borderRadius: radius.xl,
    border: `1px solid ${colors.sky.alpha(0.2)}`,
    transition: `all ${motion.duration.base}ms ${motion.ease.inOut}`,
  },
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

export const helpers = {
  /**
   * Get spacing value with multiplier
   */
  spacing: (multiplier: number) => {
    const base = 8; // 8px
    return `${multiplier * base}px`;
  },

  /**
   * Create rgba color with opacity
   */
  rgba: (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },

  /**
   * Clamp value between min and max
   */
  clamp: (min: number, value: number, max: number) => {
    return Math.min(Math.max(value, min), max);
  },
} as const;

// ============================================
// TYPE EXPORTS
// ============================================

export type ColorToken = typeof colors;
export type TypographyToken = typeof typography;
export type SpacingToken = typeof spacing;
export type MotionToken = typeof motion;
export type RadiusToken = typeof radius;
export type ShadowToken = typeof shadows;
export type BlurToken = typeof blur;

// Default export
export const tokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  motion,
  blur,
  breakpoints,
  zIndex,
  components,
  helpers,
} as const;

export default tokens;

