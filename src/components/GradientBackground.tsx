/**
 * GradientBackground Component
 * Animated gradient background with palette blobs
 * Creates ambient atmosphere for hero sections
 */

import { motion } from "framer-motion";

export default function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-ice-200/40 via-sky-300/20 to-accent-400/30" />

      {/* Animated blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-300/25 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/20 rounded-full blur-3xl"
      />
    </div>
  );
}
