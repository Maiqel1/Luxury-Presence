"use client";
import { useInView } from "motion/react";
import React, { useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

const bands =
  "repeating-linear-gradient(100deg, var(--a1) 0%, var(--a2) 6%, var(--a3) 12%, var(--a4) 18%, var(--a1) 24%)";
const streaks =
  "repeating-linear-gradient(100deg, transparent 0%, rgba(0,0,0,0.25) 3%, black 6.5%, rgba(0,0,0,0.25) 10%, transparent 13%, transparent 16%)";

const tones = {
  dark: { a1: "#9a6f6f", a2: "#d9a9a9", a3: "#7a5252", a4: "#ecc6c6", opacity: "opacity-60" },
  light: { a1: "#c4a2a2", a2: "#ead2d2", a3: "#b38f8f", a4: "#f5e6e6", opacity: "opacity-60" },
};

export const AuroraBackground = ({
  tone = "dark",
  className,
}: {
  tone?: keyof typeof tones;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "50% 0px" });
  const palette = tones[tone];

  const syncToPageClock = useCallback((node: HTMLDivElement | null) => {
    node?.getAnimations({ subtree: true }).forEach((animation) => {
      animation.startTime = 0;
    });
  }, []);

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
      {inView && (
        <div
          ref={syncToPageClock}
          className="fixed inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_95%_85%_at_85%_0%,black_20%,transparent_75%)]"
          style={{ "--a1": palette.a1, "--a2": palette.a2, "--a3": palette.a3, "--a4": palette.a4 } as React.CSSProperties}
        >
          <div
            className={cn(
              "absolute inset-y-0 left-0 w-[200%] will-change-transform md:animate-aurora motion-reduce:animate-none",
              palette.opacity,
            )}
            style={{
              backgroundImage: bands,
              maskImage: streaks,
              WebkitMaskImage: streaks,
              backgroundSize: "60% 100%",
              maskSize: "60% 100%",
              WebkitMaskSize: "60% 100%",
            }}
          />
        </div>
      )}
    </div>
  );
};
