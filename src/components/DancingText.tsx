/**
 * DancingText Component
 * Per-letter hover animation with gradient text support
 * Creates playful "dancing" effect on mouse hover
 */

import { motion } from "framer-motion";

interface DancingTextProps {
  text: string;
  className?: string;
  gradient?: boolean;
}

export default function DancingText({
  text,
  className = "",
  gradient = false,
}: DancingTextProps) {
  const letters = text.split("");

  return (
    <span className={`inline-block ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className={`inline-block ${gradient ? "gradient-text" : ""}`}
          whileHover={{
            y: [-2, -8, -2],
            rotate: [-2, 2, -2],
            transition: {
              duration: 0.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            },
          }}
          style={{ display: letter === " " ? "inline" : "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}
