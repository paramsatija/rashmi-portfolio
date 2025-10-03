// src/components/OvalBreak.tsx
import * as React from "react";

type Size = "sm" | "md" | "lg";

type Props = {
  src: string;
  alt?: string;
  size?: Size; // default "sm"
  glow?: string;
  glow2?: string;
  className?: string;
};

const SIZE_MAP: Record<Size, { w: string; h: string }> = {
  sm: { w: "min(90vw, 680px)", h: "clamp(180px, 28vw, 300px)" },
  md: { w: "min(92vw, 820px)", h: "clamp(200px, 32vw, 360px)" },
  lg: { w: "min(94vw, 1000px)", h: "clamp(240px, 40vw, 520px)" },
};

export default function OvalBreak({
  src,
  alt = "section image",
  size = "sm",
  glow = "#FF3FA4",
  glow2 = "#7C4DFF",
  className = "",
}: Props) {
  const [hovered, setHovered] = React.useState(false);
  const dims = SIZE_MAP[size];

  return (
    <div
      className={`relative my-12 md:my-16 flex items-center justify-center ${className}`}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      aria-label="Decorative oval image divider"
      role="img"
      style={{ zIndex: 0 }}
    >
      {/* Glow background */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[60px] blur-2xl"
        style={{
          background: `radial-gradient(70% 70% at 30% 30%, ${glow}40 0%, transparent 60%),
                       radial-gradient(70% 70% at 70% 70%, ${glow2}30 0%, transparent 60%)`,
          filter: "saturate(120%)",
        }}
      />

      {/* Glassmorphism Oval */}
      <div
        className="relative overflow-hidden rounded-[60px] shadow-2xl backdrop-blur-lg backdrop-saturate-150 border border-white/30"
        style={{
          width: dims.w,
          height: dims.h,
          clipPath: "ellipse(100% 65% at 50% 50%)",
          background: "rgba(255, 255, 255, 0.25)",
          transform: `scale(${hovered ? 1.02 : 1})`,
          transition: "transform 600ms ease-in-out",
        }}
      >
        {/* Image */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transform: `scale(${hovered ? 1.05 : 1})`,
            transition: "transform 600ms ease-in-out",
            filter: "brightness(1.05) contrast(1.05)",
          }}
          loading="lazy"
        />

        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </div>
  );
}
