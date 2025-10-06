# 🎨 RASHMI AGARWAL PORTFOLIO — DESIGN SYSTEM BIBLE
## Apple-Level Consistency Guide

**Version:** 1.0.0  
**Last Updated:** 2025  
**Status:** Production Ready

---

## 📐 DESIGN PRINCIPLES

### **1. Clarity First**
Every element serves a purpose. No decoration without function.

### **2. Systematic Rhythm**
All spacing follows an 8px baseline grid. No arbitrary values.

### **3. Intentional Motion**
Animations reveal meaning, not just add polish. Physical, purposeful.

### **4. Emotional Resonance**
Microcopy and interactions should feel human, warm, inviting—not corporate.

### **5. Performance as a Feature**
Fast is beautiful. 60fps is non-negotiable.

---

## 🎨 COLOR SYSTEM

### **Primary Palette**

```
Coral (Primary Action)
├─ Base:  #FF6B4A
├─ Light: #FF8A6F
└─ Dark:  #E54E2E

Sky (Secondary)
├─ Base:  #4A9EFF
├─ Light: #6FB3FF
└─ Dark:  #2E7FE5

Amber (Accent)
├─ Base:  #FFB84D
├─ Light: #FFC970
└─ Dark:  #E59E2E
```

### **Neutrals**

```
Canvas:  #FDFCF9  (Warm off-white background)
Frost:   #F7F9FC  (Lightest sky tint)
Mist:    #EEF4FB  (Soft sky wash)
Surface: #FFFFFF  (Pure white)
```

### **Text Hierarchy**

```
Primary:   #1A2332  (Almost black - headlines, body)
Secondary: #4A5568  (Medium gray - subheads, captions)
Tertiary:  #718096  (Light gray - labels, metadata)
Disabled:  #A0AEC0  (Ghost - inactive states)
```

### **Usage Rules**

- **Headlines:** Primary text on Canvas
- **Body copy:** Secondary text on Canvas/Surface
- **CTAs:** White text on Coral/Sky gradients
- **Links:** Coral with 1px underline
- **Glassmorphism:** Surface with 85-95% opacity

### **Contrast Requirements**

- Primary text: 4.5:1 minimum (WCAG AA)
- Large text (>18px): 3:1 minimum
- Interactive elements: 3:1 minimum

---

## 📝 TYPOGRAPHY SYSTEM

### **Font Families**

```css
Display: -apple-system, BlinkMacSystemFont, "SF Pro Display"
Text:    -apple-system, BlinkMacSystemFont, "SF Pro Text"
Mono:    ui-monospace, "SF Mono", "Cascadia Code"
```

### **Type Scale**

```
Display (H1)   96px / 6rem     (mobile: 64px / 4rem)
Headline (H2)  64px / 4rem     (mobile: 48px / 3rem)
Title (H3)     48px / 3rem     (mobile: 32px / 2rem)
Subhead (H4)   32px / 2rem     (mobile: 24px / 1.5rem)
Body Large     20px / 1.25rem
Body Base      16px / 1rem
Body Small     14px / 0.875rem
Caption        12px / 0.75rem
```

### **Font Weights**

```
Normal:    400  (Body text)
Medium:    500  (Emphasis)
Semibold:  600  (Subheadings)
Bold:      700  (Headlines)
```

### **Letter Spacing**

```
Display:  -0.02em  (tighter for large text)
Headline: -0.01em  (slightly tight)
Body:      0em     (default)
Caption:  +0.01em  (wider for legibility)
```

### **Line Heights**

```
Display:  1.1   (tight for impact)
Headline: 1.2   (snug for rhythm)
Body:     1.6   (relaxed for reading)
Caption:  1.4   (balanced)
```

### **Usage Examples**

```jsx
// Hero Title
<h1 className="text-6xl font-bold leading-tight tracking-tighter">
  Rashmi Agarwal
</h1>

// Section Headline
<h2 className="text-4xl font-semibold leading-snug tracking-tight">
  Transformative Impact
</h2>

// Body Text
<p className="text-lg leading-relaxed text-secondary">
  Bridging art, business, and social change...
</p>

// Caption
<span className="text-sm tracking-wide text-tertiary">
  Featured in HuffMag • July 2025
</span>
```

---

## 📏 SPACING SYSTEM (8px Grid)

### **Scale**

```
4px   (0.25rem) - hairline      [spacing-1]
8px   (0.5rem)  - tight         [spacing-2]
12px  (0.75rem) - compact       [spacing-3]
16px  (1rem)    - base          [spacing-4]
24px  (1.5rem)  - comfortable   [spacing-6]
32px  (2rem)    - relaxed       [spacing-8]
48px  (3rem)    - spacious      [spacing-12]
64px  (4rem)    - generous      [spacing-16]
80px  (5rem)    - section       [spacing-20]
128px (8rem)    - major         [spacing-32]
```

### **Component Spacing**

```
Card Padding:
  Small:   16px (p-4)
  Medium:  24px (p-6)
  Large:   32px (p-8)
  Feature: 48px (p-12)

Section Padding:
  Hero:    128px top, 64px bottom (pt-32 pb-16)
  Content: 64px vertical (py-16)
  Compact: 48px vertical (py-12)

Element Gaps:
  Tight:   8px  (gap-2)
  Base:    16px (gap-4)
  Wide:    24px (gap-6)
  Section: 48px (gap-12)
```

### **Vertical Rhythm Rules**

1. All margins/padding MUST be divisible by 8px
2. Section spacing = 64px (py-16) standard
3. Hero to first section = 80px gap
4. Between sections = 48-64px
5. Within sections = 24-32px

---

## 🎭 MOTION SYSTEM

### **Duration (Fibonacci-based)**

```
Instant:   0ms    (no animation)
Fast:      150ms  (micro-interactions)
Base:      300ms  (standard transitions)
Moderate:  450ms  (emphasis)
Slow:      600ms  (dramatic reveals)
Leisurely: 900ms  (hero entrances)
```

### **Easing Curves**

```css
/* Standard */
ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)
ease-out:    cubic-bezier(0.16, 1, 0.3, 1)
ease-in:     cubic-bezier(0.7, 0, 0.84, 0)

/* Apple-style */
apple-ease:   [0.4, 0, 0.2, 1]
apple-spring: [0.22, 1, 0.36, 1]
```

### **Spring Physics**

```typescript
default: { type: 'spring', stiffness: 300, damping: 30 }
bounce:  { type: 'spring', stiffness: 400, damping: 10 }
```

### **Stagger Timing**

```
Fast:     50ms between items
Base:     80ms between items
Slow:     120ms between items
```

### **Usage Rules**

1. **Always use `transform` and `opacity`** (GPU accelerated)
2. **Never animate `left`, `top`, `width`, `height`** (causes reflow)
3. **Stagger sequential elements** (cards, list items)
4. **Respect `prefers-reduced-motion`**

### **Animation Examples**

```jsx
// Card Entrance
initial={{ opacity: 0, y: 24 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}

// Hover Lift
whileHover={{ y: -4, scale: 1.02 }}
transition={{ duration: 0.3 }}

// Button Press
whileTap={{ scale: 0.95 }}
```

---

## 🌟 GLASSMORPHISM SYSTEM

### **Opacity Levels**

```
Heavy:  98% - Critical overlays (modals)
Base:   92% - Standard cards
Light:  85% - Secondary surfaces
Subtle: 75% - Background elements
```

### **Blur Levels**

```
sm:   8px  - Minimal depth
base: 16px - Standard glass
md:   24px - Prominent cards
lg:   32px - Hero elements
xl:   48px - Background orbs
```

### **Glass Recipes**

```css
/* Standard Glass Card */
background: linear-gradient(135deg, 
  rgba(255,255,255,0.95) 0%, 
  rgba(247,249,252,0.92) 100%);
border: 1px solid rgba(255,255,255,0.8);
backdrop-filter: blur(32px) saturate(180%);
box-shadow: 0 8px 32px rgba(74,158,255,0.08);

/* Accent Glass */
background: linear-gradient(135deg,
  rgba(255,107,74,0.12) 0%,
  rgba(255,184,77,0.10) 100%);
border: 1px solid rgba(255,107,74,0.25);
backdrop-filter: blur(32px) saturate(200%);
```

---

## 🎯 COMPONENT PATTERNS

### **Buttons**

```jsx
// Primary
<button className="btn-primary">
  Explore Projects
</button>
// → Coral-to-Amber gradient, white text, shadow

// Secondary
<button className="btn-secondary">
  Learn More
</button>
// → Sky-to-Light-Sky gradient, white text

// Ghost
<button className="btn-ghost">
  Contact
</button>
// → Transparent with border, slate text
```

**Specs:**
- Padding: `12px 24px` (py-3 px-6)
- Border radius: `9999px` (rounded-full)
- Font size: `14px` (text-sm)
- Font weight: 600 (semibold)
- Hover: scale(1.05), translateY(-2px)
- Transition: 300ms

---

### **Cards**

```jsx
// Bento Card
<div className="bento-card p-8">
  {content}
</div>
// → 28px radius, glass background, shadow-md

// Accent Card
<div className="bento-card-accent p-8">
  {content}
</div>
// → Coral/Amber tinted glass

// Feature Card
<div className="bento-card-large p-12">
  {content}
</div>
// → Spans 2x2 grid, larger padding
```

**Specs:**
- Border radius: `28px` (rounded-3xl)
- Padding: Small `16px`, Medium `24px`, Large `32px`
- Shadow: `0 8px 32px rgba(74,158,255,0.08)`
- Hover: translateY(-6px), scale(1.01)

---

### **Tags/Chips**

```jsx
<span className="chip">
  Cultural Diplomacy
</span>
```

**Specs:**
- Padding: `8px 16px` (py-2 px-4)
- Border radius: `9999px` (rounded-full)
- Font size: `12px` (text-xs)
- Font weight: 500 (medium)
- Background: white 95% opacity
- Border: 1px rgba(74,158,255,0.2)

---

## 🔲 LAYOUT SYSTEM

### **Container Widths**

```
Content: max-w-7xl (1280px)
Reading: max-w-2xl (672px)
Forms:   max-w-xl  (576px)
```

### **Grid Systems**

```jsx
// Hero (40/60 split)
<div className="grid lg:grid-cols-[40fr_60fr] gap-12">

// Bento (3-column)
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

// Feature + Sidebar
<div className="grid lg:grid-cols-[2fr_1fr] gap-8">
```

### **Responsive Breakpoints**

```
sm:  640px  - Mobile landscape
md:  768px  - Tablet
lg:  1024px - Desktop
xl:  1280px - Wide desktop
2xl: 1536px - Ultra-wide
```

---

## 🎪 ELEVATION SYSTEM

### **Shadow Hierarchy**

```
Level 1 (sm):   Subtle hover, tags
Level 2 (base): Standard cards
Level 3 (md):   Elevated cards, nav
Level 4 (lg):   Modals, popovers
Level 5 (xl):   Hero images, key visuals
```

### **Z-Index Scale**

```
base:          0   (default layer)
dropdown:      10  (menus)
sticky:        20  (sticky nav)
fixed:         30  (fixed elements)
modalBackdrop: 40  (overlays)
modal:         50  (dialogs)
popover:       60  (tooltips, popovers)
tooltip:       70  (highest priority)
```

---

## ♿ ACCESSIBILITY STANDARDS

### **Contrast Ratios**

- Body text (16px): 4.5:1 minimum
- Large text (24px+): 3:1 minimum
- Interactive elements: 3:1 minimum

### **Focus States**

```css
.btn:focus-visible {
  outline: 2px solid var(--color-coral);
  outline-offset: 2px;
}
```

### **Motion Preferences**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### **Keyboard Navigation**

- All interactive elements must be keyboard accessible
- Tab order follows visual hierarchy
- Skip links for screen readers
- ARIA labels on icon-only buttons

---

## 📱 RESPONSIVE RULES

### **Mobile-First Approach**

1. Design for 375px first (iPhone SE)
2. Touch targets minimum 44x44px
3. Thumb-zone optimization (bottom 2/3)
4. Font size never below 16px (prevents zoom)

### **Breakpoint Strategy**

```
Mobile:  Base styles (375px+)
Tablet:  md: prefix (768px+)
Desktop: lg: prefix (1024px+)
Wide:    xl: prefix (1280px+)
```

### **Image Optimization**

```jsx
<img
  src="image.jpg"
  srcSet="image@1x.jpg 1x, image@2x.jpg 2x"
  loading="lazy"
  alt="Descriptive text"
/>
```

---

## 🚀 PERFORMANCE TARGETS

### **Lighthouse Scores**

- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

### **Core Web Vitals**

- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### **Optimization Checklist**

- [ ] Images lazy-loaded below fold
- [ ] Code-split by route
- [ ] Font-display: swap
- [ ] Preload critical assets
- [ ] Animations use transform/opacity only
- [ ] No layout shift on load

---

## 📚 USAGE GUIDE

### **Import Tokens**

```typescript
import { tokens } from '@/lib/tokens';
import { motionVariants } from '@/lib/motion-variants';

// Use in components
<div style={{ color: tokens.colors.coral.base }}>
  Branded text
</div>

// Use motion variants
<motion.div {...motionVariants.fadeInUp}>
  Content
</motion.div>
```

### **CSS Custom Properties**

```css
/* Available in all CSS files */
var(--color-coral)
var(--spacing-6)
var(--radius-2xl)
var(--shadow-md)
```

---

## 🔧 MAINTENANCE

### **Adding New Colors**

1. Define in `/src/lib/tokens.ts`
2. Add CSS variable in `/src/index.css`
3. Create utility class if needed
4. Update this document

### **Adding New Components**

1. Follow existing patterns
2. Use tokens for all values
3. Import motion variants
4. Test accessibility
5. Document usage

### **Version Control**

- Major version: Breaking changes to tokens
- Minor version: New tokens/components
- Patch version: Bug fixes, optimizations

---

## 📞 SUPPORT

For questions about this design system:
1. Check this document first
2. Review `/src/lib/tokens.ts`
3. Examine existing components
4. Test in Storybook (if available)

---

**Last Updated:** 2025  
**Maintained by:** Design Team  
**Status:** ✅ Production Ready


