"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  strength = 8,
  priority = false,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  strength?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y: reduceMotion ? 0 : y }} className="absolute inset-x-0 -inset-y-[12%] will-change-transform">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} placeholder="blur" className={cn("object-cover", imageClassName)} />
      </motion.div>
    </div>
  );
}
