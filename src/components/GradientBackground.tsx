/**
 * Gradient Background - Sky & Warmth Edition
 * Animated ambient background with parallax orbs
 */

import { motion, useScroll, useTransform } from "framer-motion";

const palette = {
  coral: "#FF6B4A",
  sky: "#4A9EFF",
  amber: "#FFB84D",
  canvas: "#FDFCF9",
};

export default function GradientBackground() {
  const { scrollY } = useScroll();
  
  const orb1Y = useTransform(scrollY, [0, 1000], [0, -200]);
  const orb1X = useTransform(scrollY, [0, 1000], [0, 100]);
  const orb2Y = useTransform(scrollY, [0, 1000], [0, 150]);
  const orb2X = useTransform(scrollY, [0, 1000], [0, -100]);
  const orb3Y = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: palette.canvas }}>
      {/* Orb 1 - Sky Blue */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `radial-gradient(circle, ${palette.sky} 0%, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* Orb 2 - Amber/Warm */}
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute top-1/3 right-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `radial-gradient(circle, ${palette.amber} 0%, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* Orb 3 - Coral */}
      <motion.div
        style={{ y: orb3Y }}
        className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-18"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `radial-gradient(circle, ${palette.coral} 0%, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* Mesh Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(at 20% 30%, ${palette.sky}15 0px, transparent 50%),
            radial-gradient(at 80% 70%, ${palette.amber}12 0px, transparent 50%),
            radial-gradient(at 50% 50%, ${palette.coral}10 0px, transparent 50%)
          `,
        }}
      />
    </div>
  );
}
