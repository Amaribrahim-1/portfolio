"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type ScrollRevealProps = {
  children: ReactNode;
  /** Alternating rows only (About + case studies): odd rows from the right, even from the left. */
  direction?: "left" | "right";
  /** Stagger offset in seconds for groups of siblings entering together. */
  delay?: number;
  className?: string;
};

const RISE_PX = 10;
const SLIDE_PX = 24;

export function ScrollReveal({
  children,
  direction,
  delay = 0,
  className,
}: ScrollRevealProps) {
  const reducedMotionPreference = useReducedMotion();

  // Defer applying the OS reduced-motion preference until after mount so the
  // server-rendered markup (which never knows the client's preference) always
  // matches the initial client render — avoids a hydration mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const prefersReducedMotion = mounted && Boolean(reducedMotionPreference);

  const initial = prefersReducedMotion
    ? { opacity: 1, x: 0, y: 0 }
    : direction === "left"
      ? { opacity: 0, x: -SLIDE_PX, y: 0 }
      : direction === "right"
        ? { opacity: 0, x: SLIDE_PX, y: 0 }
        : { opacity: 0, x: 0, y: RISE_PX };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.5,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
