"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Point = { x: number; y: number };

interface MapProps {
  src: string;
  width: number;
  height: number;
  arcs: { start: Point; end: Point; bend?: number }[];
  places: (Point & { label: string; note?: string; align?: "left" | "right" })[];
  lineColor?: string;
  className?: string;
}

function curve(start: Point, end: Point, bend: number) {
  const cx = (start.x + end.x) / 2 + (end.y - start.y) * bend;
  const cy = (start.y + end.y) / 2 - (end.x - start.x) * bend;
  return `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`;
}

export default function WorldMap({
  src,
  width,
  height,
  arcs,
  places,
  lineColor = "#c2a3a3",
  className,
}: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={cn("relative w-full", className)} style={{ aspectRatio: `${width} / ${height}` }}>
      <Image
        src={src}
        alt=""
        fill
        unoptimized
        draggable={false}
        className="pointer-events-none select-none [mask-image:radial-gradient(ellipse_at_center,white_55%,transparent_80%)]"
      />
      <svg viewBox={`0 0 ${width} ${height}`} className="pointer-events-none absolute inset-0 h-full w-full select-none" aria-hidden>
        {arcs.map((arc, i) => (
          <motion.path
            key={`arc-${i}`}
            d={curve(arc.start, arc.end, arc.bend ?? 0.25)}
            fill="none"
            stroke={lineColor}
            strokeWidth={0.3}
            strokeLinecap="round"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 1 }}
            animate={
              reduceMotion || !inView
                ? undefined
                : { pathLength: [0, 1, 1, 1], opacity: [1, 1, 1, 0] }
            }
            transition={{
              duration: 4.2,
              times: [0, 0.45, 0.85, 1],
              delay: i * 0.9,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
          />
        ))}
        {places.map((place) => (
          <g key={place.label}>
            <circle cx={place.x} cy={place.y} r={0.6} fill={lineColor} />
            {!reduceMotion && inView && (
              <circle cx={place.x} cy={place.y} r={0.6} fill={lineColor} opacity={0.5}>
                <animate attributeName="r" from="0.6" to="2.4" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}
      </svg>
      {places.map((place) => (
        <div
          key={place.label}
          className={cn(
            "absolute -translate-y-1/2 whitespace-nowrap",
            place.align === "left" ? "-translate-x-full pr-4 text-right" : "pl-4",
          )}
          style={{ left: `${(place.x / width) * 100}%`, top: `${(place.y / height) * 100}%` }}
        >
          <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-snow uppercase sm:text-xs">{place.label}</p>
          {place.note && <p className="mt-0.5 text-[0.7rem] text-snow/60 italic sm:text-xs">{place.note}</p>}
        </div>
      ))}
    </div>
  );
}
