"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

export function LineReveal({
  lines,
  id,
  as: Tag = "h2",
  className,
  delay = 0,
  onMount = false,
}: {
  lines: React.ReactNode[];
  id?: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  onMount?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduceMotion = useReducedMotion();
  const shown = onMount || inView;

  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line, index) => (
        <span key={index} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <motion.span
            className="block"
            initial={reduceMotion ? false : { y: "110%" }}
            animate={shown ? { y: "0%" } : undefined}
            transition={{ duration: 1.1, delay: delay + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
