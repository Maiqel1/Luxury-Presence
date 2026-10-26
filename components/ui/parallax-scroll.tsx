"use client";
import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Expand } from "lucide-react";

import { cn } from "@/lib/utils";

type ParallaxImage = { src: StaticImageData; alt: string; caption: string };
type Placed = ParallaxImage & { index: number };

const pad = (n: number) => String(n).padStart(2, "0");

function deal(images: ParallaxImage[], columns: number) {
  return Array.from({ length: columns }, (_, column) =>
    images.map((image, index) => ({ ...image, index })).filter((image) => image.index % columns === column),
  );
}

function Column({
  items,
  y,
  total,
  stretch,
  onSelect,
}: {
  items: Placed[];
  y: MotionValue<number>;
  total: number;
  stretch: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <motion.div style={{ y }} className="flex flex-col gap-5 md:gap-8">
      {items.map((item) => {
        const index = item.index;
        return (
          <button
            key={item.src.src}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={`Open photo ${index + 1} of ${total}: ${item.alt}`}
            className={cn(
              "group relative block w-full overflow-hidden bg-cloud text-left",
              stretch ? "min-h-40 flex-1" : "aspect-[4/3]",
            )}
          >
            <Image
              src={item.src}
              alt=""
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 32vw, 48vw"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-night-deep/75 to-transparent p-4 pt-14 text-snow opacity-100 transition-opacity duration-500 md:p-5 md:pt-16 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
              <span>
                <span className="block text-[0.7rem] font-semibold tracking-[0.25em]">Nº {pad(index + 1)}</span>
                <span className="mt-1 block text-sm font-light italic">{item.caption}</span>
              </span>
              <Expand aria-hidden className="size-4 shrink-0" />
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}

export const ParallaxScroll = ({
  images,
  onSelect,
  className,
}: {
  images: ParallaxImage[];
  onSelect: (index: number) => void;
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });
  const distance = reduceMotion ? 0 : 90;
  const up = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const down = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  const threeUp = deal(images, 3);
  const twoUp = deal(images, 2);
  const tallest = (columns: Placed[][]) => Math.max(...columns.map((column) => column.length));

  return (
    <div ref={gridRef} className={cn("w-full overflow-hidden py-16 md:py-24", className)}>
      <div className="hidden grid-cols-3 gap-8 lg:grid">
        {threeUp.map((column, i) => (
          <Column
            key={i}
            items={column}
            y={i % 2 ? down : up}
            total={images.length}
            stretch={column.length < tallest(threeUp)}
            onSelect={onSelect}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:hidden">
        {twoUp.map((column, i) => (
          <Column
            key={i}
            items={column}
            y={i % 2 ? down : up}
            total={images.length}
            stretch={column.length < tallest(twoUp)}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
};
