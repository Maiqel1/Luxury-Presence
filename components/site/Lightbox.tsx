"use client";

import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from "motion/react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useState } from "react";
import { Dialog, DialogClose, DialogDescription, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Photo = { src: StaticImageData; alt: string };

const pad = (n: number) => String(n).padStart(2, "0");

const arrowClass =
  "absolute top-1/2 z-10 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-snow/25 bg-night-deep/60 text-snow transition-colors hover:border-rose-light hover:bg-night-deep sm:size-12";

export function Lightbox({
  photos,
  index,
  onIndexChange,
}: {
  photos: Photo[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
}) {
  const reduceMotion = useReducedMotion();
  const [direction, setDirection] = useState(0);
  const current = index ?? 0;
  const photo = photos[current];
  const offset = reduceMotion ? 0 : 80;

  function go(step: number) {
    setDirection(step);
    onIndexChange((current + step + photos.length) % photos.length);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -80 || info.velocity.x < -500) go(1);
    else if (info.offset.x > 80 || info.velocity.x > 500) go(-1);
  }

  return (
    <Dialog open={index !== null} onOpenChange={(open) => !open && onIndexChange(null)}>
      <DialogPortal>
        <DialogOverlay className="bg-night-deep/95 supports-backdrop-filter:backdrop-blur-none" />
        <DialogPrimitive.Content
          onKeyDown={onKeyDown}
          className="fixed inset-0 z-50 flex flex-col text-snow outline-none data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <DialogTitle className="text-[0.7rem] font-semibold tracking-[0.3em] text-snow uppercase">
              Photo {pad(current + 1)} <span className="text-snow/50">/ {pad(photos.length)}</span>
            </DialogTitle>
            <DialogClose
              aria-label="Close gallery"
              className="inline-flex size-11 items-center justify-center rounded-[3px] text-snow/80 transition-colors hover:bg-snow/10 hover:text-snow"
            >
              <X className="size-6" />
            </DialogClose>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-20">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={current}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d >= 0 ? offset : -offset, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d >= 0 ? -offset : offset, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={onDragEnd}
                className="relative h-[58vh] w-full max-w-[1024px] cursor-grab touch-pan-y active:cursor-grabbing sm:h-[66vh]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1100px) 1024px, 100vw"
                  draggable={false}
                  className="pointer-events-none object-contain select-none"
                />
              </motion.div>
            </AnimatePresence>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={cn(arrowClass, "left-2 sm:left-5")}>
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={cn(arrowClass, "right-2 sm:right-5")}>
              <ChevronRight className="size-5" />
            </button>
          </div>

          <DialogDescription className="mx-auto max-w-2xl px-6 pt-4 text-center text-sm text-snow/70">{photo.alt}</DialogDescription>

          <ul className="no-scrollbar flex justify-start gap-2 overflow-x-auto px-4 py-5 sm:justify-center">
            {photos.map((item, i) => (
              <li key={item.src.src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    onIndexChange(i);
                  }}
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                  className={cn(
                    "relative block h-12 w-16 overflow-hidden rounded-[3px] opacity-50 ring-1 ring-transparent transition sm:h-14 sm:w-20",
                    i === current ? "opacity-100 ring-rose-light" : "hover:opacity-80",
                  )}
                >
                  <Image src={item.src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
