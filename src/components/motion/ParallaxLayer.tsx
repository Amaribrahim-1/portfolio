"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useGSAP } from "@gsap/react";

import { gsap, MOTION_MQ } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ParallaxLayerConfig = {
  node: HTMLElement;
  offset: number;
  opacityFrom?: number;
  opacityTo?: number;
};

type ParallaxContextValue = {
  register: (layer: ParallaxLayerConfig) => () => void;
};

const ParallaxContext = createContext<ParallaxContextValue | null>(null);

type ParallaxRootProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
};

function scrubParallaxLayers(
  root: HTMLElement,
  layers: readonly ParallaxLayerConfig[],
): void {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  layers.forEach(({ node, offset, opacityFrom, opacityTo }) => {
    const from: gsap.TweenVars = { y: 0 };
    const to: gsap.TweenVars = { y: offset, ease: "none", duration: 1 };

    if (opacityFrom !== undefined && opacityTo !== undefined) {
      from.opacity = opacityFrom;
      to.opacity = opacityTo;
    }

    timeline.fromTo(node, from, to, 0);
  });
}

/**
 * Owns the Hero's single ScrollTrigger. Layers register here so five
 * parallax speeds share one scrub instead of five identical ranges.
 */
export function ParallaxRoot({
  children,
  className,
  id,
  "aria-labelledby": ariaLabelledBy,
}: ParallaxRootProps) {
  const rootRef = useRef<HTMLElement>(null);
  const layersRef = useRef<ParallaxLayerConfig[]>([]);
  const [layerCount, setLayerCount] = useState(0);

  const register = useCallback((layer: ParallaxLayerConfig) => {
    layersRef.current.push(layer);
    setLayerCount((count) => count + 1);
    return () => {
      layersRef.current = layersRef.current.filter(
        (entry) => entry.node !== layer.node,
      );
      setLayerCount((count) => count - 1);
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const layers = layersRef.current;
      if (!root || layers.length === 0) {
        return;
      }

      const media = gsap.matchMedia();
      media.add(MOTION_MQ.allow, () => {
        scrubParallaxLayers(root, layers);
      });
    },
    { dependencies: [layerCount], revertOnUpdate: true },
  );

  const contextValue = useMemo(() => ({ register }), [register]);

  return (
    <ParallaxContext.Provider value={contextValue}>
      <section
        ref={rootRef}
        id={id}
        aria-labelledby={ariaLabelledBy}
        data-parallax-root
        className={className}
      >
        {children}
      </section>
    </ParallaxContext.Provider>
  );
}

type ParallaxLayerProps = {
  children: ReactNode;
  /** Vertical travel in pixels across the root's scroll range. Positive moves down. */
  offset?: number;
  /** Opacity from→to across the same range. Omit to leave opacity unchanged. */
  opacity?: readonly [number, number];
  className?: string;
};

/**
 * Hero-only signature moment: scrubs transform (and optional opacity) as the
 * user scrolls past `ParallaxRoot`. Do not reuse outside the Hero per
 * motion-performance-budget.mdc. Reduced-motion keeps the readable layout
 * (no offset, no fade) instead of the scrub end state.
 */
export function ParallaxLayer({
  children,
  offset = 80,
  opacity,
  className,
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const parallax = useContext(ParallaxContext);
  const opacityFrom = opacity?.[0];
  const opacityTo = opacity?.[1];

  useLayoutEffect(() => {
    const node = layerRef.current;
    if (!node || !parallax) {
      return;
    }

    return parallax.register({ node, offset, opacityFrom, opacityTo });
  }, [parallax, offset, opacityFrom, opacityTo]);

  return (
    <div ref={layerRef} className={cn(className)}>
      {children}
    </div>
  );
}
