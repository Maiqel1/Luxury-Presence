"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: StaticImageData[];
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduceMotion = useReducedMotion();
  const running = inView && !reduceMotion;

  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div ref={ref} aria-hidden className={cn("relative overflow-hidden", className)}>
      <div className="absolute top-1/2 left-1/2 size-0 scale-[0.5] sm:scale-[0.65] lg:left-[64%] lg:scale-[0.8] 2xl:scale-95">
        <div
          style={{
            transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
          }}
          className="absolute top-0 -left-[1216px] grid size-[1720px] origin-top-left grid-cols-4 gap-8 transform-3d"
        >
          {chunks.map((subarray, colIndex) => (
            <motion.div
              animate={running ? { y: colIndex % 2 === 0 ? 100 : -100 } : undefined}
              transition={{
                duration: colIndex % 2 === 0 ? 10 : 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              key={colIndex + "marquee"}
              className="flex flex-col items-start gap-8"
            >
              {subarray.map((image, imageIndex) => (
                <div className="relative w-full" key={imageIndex + image.src}>
                  <Image
                    src={image}
                    alt=""
                    sizes="(min-width: 1024px) 360px, 220px"
                    className="aspect-[970/700] w-full object-cover ring-1 ring-snow/10"
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
