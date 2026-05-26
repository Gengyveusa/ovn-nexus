"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** translate distance in px; default 16 */
  y?: number;
  /** once: only animate first time it enters viewport (default true) */
  once?: boolean;
  as?: "div" | "section" | "article" | "header" | "footer";
}

/**
 * Reveal — subtle scroll-triggered fade + translate.
 * Apple-style: very small movement (8–16px), quiet ease, ~700ms.
 * Respects prefers-reduced-motion automatically.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 16,
  once = true,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = motion[as] as React.ComponentType<MotionProps & { className?: string }>;

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1], // Apple-ish cubic-bezier (easeOutExpo-ish)
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
