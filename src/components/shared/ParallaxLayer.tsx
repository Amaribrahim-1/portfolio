"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type ParallaxLayerProps = {
  children: ReactNode;
  /** Vertical travel in pixels across the layer's scroll range. Positive moves down, negative moves up. */
  offset?: number;
  className?: string;
};

/**
 * Hero-only signature moment: moves its contents at a different speed than the
 * rest of the page as the user scrolls past. Do not reuse outside the Hero
 * per motion-performance-budget.mdc.
 */
export function ParallaxLayer({
  children,
  offset = 60,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotionPreference = useReducedMotion();

  // Deferred like ScrollReveal — keeps the first client render identical to
  // the server render regardless of the visitor's OS motion preference.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const prefersReducedMotion = mounted && Boolean(reducedMotionPreference);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div style={prefersReducedMotion ? undefined : { y }}>
        {children}
      </motion.div>
    </div>
  );
}
