/**
 * CounterCard Component
 * Animated number counter with label
 * Encapsulates the animated number hook to satisfy rules-of-hooks
 */

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterCardProps {
  end: number;
  label: string;
  suffix?: string;
  duration?: number;
}

export default function CounterCard({
  end,
  label,
  suffix = "",
  duration = 2,
}: CounterCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(end);
    }
  }, [isInView, end, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass p-6 text-center hover-lift"
    >
      <div className="text-4xl md:text-5xl font-bold font-title gradient-text mb-2">
        0{suffix}
      </div>
      <div className="text-sm text-ink/70 font-medium">{label}</div>
    </motion.div>
  );
}
