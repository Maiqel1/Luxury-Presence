"use client";
import React, { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

type StickyItem = {
  title: string;
  description: string;
  image: { src: StaticImageData; alt: string };
};

const numerals = ["I", "II", "III", "IV", "V"];

export const StickyScroll = ({
  content,
  className,
}: {
  content: StickyItem[];
  className?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setActiveCard(Math.min(cardLength - 1, Math.max(0, Math.floor(latest * cardLength))));
  });

  return (
    <div className={cn("relative lg:grid lg:grid-cols-12 lg:gap-10", className)}>
      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-[14vh] h-[72vh] overflow-hidden bg-night">
          {content.map((item, index) => (
            <div
              key={item.title}
              aria-hidden={activeCard !== index}
              className="absolute inset-0 transition-[clip-path] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ clipPath: index <= activeCard ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
            >
              <Image src={item.image.src} alt={item.image.alt} fill sizes="48vw" placeholder="blur" className="object-cover" />
            </div>
          ))}
          <p className="absolute bottom-6 left-6 z-10 bg-night-deep/80 px-4 py-2 text-[0.7rem] font-semibold tracking-[0.3em] text-snow uppercase">
            {numerals[activeCard]} / {numerals[cardLength - 1]}
          </p>
        </div>
      </div>

      <div ref={ref} className="lg:col-span-6">
        {content.map((item, index) => (
          <article
            key={item.title}
            data-active={activeCard === index}
            className="group border-t border-snow/15 py-12 md:py-16 lg:flex lg:min-h-[72vh] lg:flex-col lg:justify-center lg:py-0"
          >
            <div className="relative mb-8 aspect-[3/2] overflow-hidden lg:hidden">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(min-width: 768px) 90vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <p className="text-[0.7rem] font-semibold tracking-[0.3em] text-rose-light uppercase">Service {numerals[index]}</p>
            <h3 className="mt-5 text-[clamp(1.9rem,3.3vw,3.1rem)] leading-[1] font-extralight tracking-[-0.04em] uppercase transition-colors duration-500 lg:text-snow/35 lg:group-data-[active=true]:text-snow">
              {item.title}
            </h3>
            <p className="mt-6 max-w-lg text-lg leading-[1.8] text-snow/70 transition-opacity duration-500 lg:opacity-40 lg:group-data-[active=true]:opacity-100">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};
