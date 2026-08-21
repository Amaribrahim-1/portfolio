"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

const DESKTOP_MQ = "(min-width: 48rem)";
const MASK_ID = "homepage-scroll-path-mask";
const MOBILE_DOT_COUNT = 6;
const DASH_ARRAY = "10 14";
const START_DOT_R = 6;
const END_DOT_R = 4.5;

type PathPoint = {
  x: number;
  y: number;
};

type PathGeometry = {
  d: string;
  start: PathPoint;
  end: PathPoint;
};

type PathElements = {
  svg: SVGSVGElement;
  revealPath: SVGPathElement;
  dashPath: SVGPathElement;
  startDot: SVGCircleElement;
  endDot: SVGCircleElement;
};

function roundCoord(value: number): number {
  return Math.round(value * 10) / 10;
}

function buildJourneyPath(width: number, height: number): PathGeometry {
  const inset = Math.max(width * 0.045, 28);
  const left = roundCoord(inset);
  const right = roundCoord(width - inset);
  const start = {
    x: roundCoord(right - inset * 0.35),
    y: roundCoord(height * 0.055),
  };
  const end = { x: roundCoord(width * 0.2), y: roundCoord(height * 0.965) };

  const d = [
    `M ${start.x} ${start.y}`,
    `C ${right} ${roundCoord(height * 0.14)}, ${right} ${roundCoord(height * 0.2)}, ${right} ${roundCoord(height * 0.27)}`,
    `C ${right} ${roundCoord(height * 0.35)}, ${left} ${roundCoord(height * 0.37)}, ${left} ${roundCoord(height * 0.45)}`,
    `C ${left} ${roundCoord(height * 0.53)}, ${right} ${roundCoord(height * 0.55)}, ${right} ${roundCoord(height * 0.63)}`,
    `C ${right} ${roundCoord(height * 0.71)}, ${left} ${roundCoord(height * 0.73)}, ${left} ${roundCoord(height * 0.81)}`,
    `C ${left} ${roundCoord(height * 0.89)}, ${roundCoord(width * 0.3)} ${roundCoord(height * 0.93)}, ${end.x} ${end.y}`,
  ].join(" ");

  return { d, start, end };
}

function applyPathGeometry(
  elements: PathElements,
  width: number,
  height: number,
): void {
  const { d, start, end } = buildJourneyPath(width, height);
  elements.svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  elements.revealPath.setAttribute("d", d);
  elements.dashPath.setAttribute("d", d);
  elements.startDot.setAttribute("cx", String(start.x));
  elements.startDot.setAttribute("cy", String(start.y));
  elements.endDot.setAttribute("cx", String(end.x));
  elements.endDot.setAttribute("cy", String(end.y));
}

function layoutPath(root: HTMLElement, elements: PathElements): void {
  const width = root.offsetWidth;
  const height = root.offsetHeight;
  if (width === 0 || height === 0) {
    return;
  }

  applyPathGeometry(elements, width, height);
}

function scrubPathReveal(
  root: HTMLElement,
  elements: PathElements,
): (() => void) | void {
  layoutPath(root, elements);
  elements.svg.classList.remove("invisible");

  if (prefersReducedMotion()) {
    gsap.set(elements.revealPath, { attr: { "stroke-dashoffset": 0 } });
    return;
  }

  gsap.fromTo(
    elements.revealPath,
    { attr: { "stroke-dashoffset": 1 } },
    {
      attr: { "stroke-dashoffset": 0 },
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );

  const resizeObserver = new ResizeObserver(() => {
    layoutPath(root, elements);
    ScrollTrigger.refresh();
  });
  resizeObserver.observe(root);

  return () => {
    resizeObserver.disconnect();
  };
}

function MobileSpineDots() {
  return (
    <div className="absolute inset-y-10 left-3 flex flex-col justify-between md:hidden">
      {Array.from({ length: MOBILE_DOT_COUNT }, (_, index) => (
        <span key={index} className="size-1.5 rounded-full bg-mustard" />
      ))}
    </div>
  );
}

/**
 * Homepage-only mustard spine. Desktop scrubs stroke-dashoffset along one
 * dashed SVG from Hero toward Contact. Mobile hides the long path and keeps
 * small static dots — no SVG scrub. Reduced-motion shows the static path.
 */
export function ScrollPath() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const revealPathRef = useRef<SVGPathElement>(null);
  const dashPathRef = useRef<SVGPathElement>(null);
  const startDotRef = useRef<SVGCircleElement>(null);
  const endDotRef = useRef<SVGCircleElement>(null);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const svg = svgRef.current;
      const revealPath = revealPathRef.current;
      const dashPath = dashPathRef.current;
      const startDot = startDotRef.current;
      const endDot = endDotRef.current;
      if (!overlay || !svg || !revealPath || !dashPath || !startDot || !endDot) {
        return;
      }

      const root = overlay.parentElement;
      if (!root) {
        return;
      }

      const media = gsap.matchMedia();
      media.add(DESKTOP_MQ, () =>
        scrubPathReveal(root, { svg, revealPath, dashPath, startDot, endDot }),
      );
    },
    { revertOnUpdate: true },
  );

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[12] overflow-hidden"
    >
      <MobileSpineDots />
      <svg
        ref={svgRef}
        className="invisible hidden h-full w-full text-mustard md:block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id={MASK_ID}>
            <path
              ref={revealPathRef}
              pathLength={1}
              fill="none"
              stroke="#fff"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={1}
              strokeDashoffset={1}
            />
          </mask>
        </defs>
        <circle ref={startDotRef} r={START_DOT_R} fill="currentColor" />
        <g mask={`url(#${MASK_ID})`}>
          <path
            ref={dashPathRef}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={DASH_ARRAY}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle ref={endDotRef} r={END_DOT_R} fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}
