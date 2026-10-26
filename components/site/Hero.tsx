"use client";

import Image from "next/image";
import { ArrowDown, Phone } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import { LineReveal } from "@/components/site/LineReveal";
import { agent, flipWords, images } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "16%"]);
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease },
  });

  return (
    <section ref={ref} id="home" aria-label="Introduction" className="relative isolate overflow-hidden bg-night-deep text-snow">
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-20 will-change-transform">
        <motion.div
          initial={reduceMotion ? false : { scale: 1.14 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 6, ease }}
          className="absolute inset-0"
        >
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[50%_62%]"
          />
        </motion.div>
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,10,10,0.6)_0%,rgba(10,10,10,0.12)_28%,rgba(10,10,10,0.35)_58%,rgba(10,10,10,0.92)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,10,0.55)_0%,rgba(10,10,10,0.25)_40%,transparent_65%)]"
      />

      <div className="mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-4 pt-32 pb-10 sm:px-6 lg:px-10 lg:pb-14">
        <motion.p {...rise(0.1)} className="text-[0.7rem] font-semibold tracking-[0.32em] text-rose-light uppercase">
          {agent.name} — {agent.brokerage}
        </motion.p>

        <LineReveal
          as="h1"
          onMount
          delay={0.2}
          className="mt-5 text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] tracking-[-0.05em] uppercase"
          lines={[
            <span key="a" className="font-black">
              Pahrump
            </span>,
            <span key="b" className="font-extralight text-snow italic">
              Realtor
            </span>,
          ]}
        />

        <div className="mt-10 grid gap-8 border-t border-snow/20 pt-8 lg:grid-cols-12 lg:items-end">
          <motion.div {...rise(0.7)} className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-snow/85 md:text-lg">
              {agent.experience}, helping buyers and sellers across Southern Nevada since {agent.licensedSince}.
            </p>
            <p className="mt-3 text-lg font-light md:text-xl">
              Let&apos;s find your <FlipWords words={flipWords} className="font-semibold text-rose-light" />
            </p>
          </motion.div>

          <motion.div {...rise(0.85)} className="flex flex-col gap-3 sm:flex-row lg:col-span-4">
            <a href={agent.phone.href} className={buttonVariants({ variant: "inverse", size: "lg" })}>
              <Phone aria-hidden />
              Call Now
            </a>
            <a href="#listings" className={buttonVariants({ variant: "light", size: "lg" })}>
              Find your home
            </a>
          </motion.div>

          <motion.div
            {...rise(1)}
            className="hidden items-end justify-end gap-6 text-right text-[0.7rem] font-semibold tracking-[0.3em] text-snow/60 uppercase lg:col-span-3 lg:flex"
          >
            <p>
              Mountain Falls
              <br />
              Pahrump, NV
            </p>
            <a
              href="#about"
              aria-label="Scroll to About"
              className="flex size-11 items-center justify-center rounded-full border border-snow/30 text-snow transition-colors hover:border-rose-light hover:text-rose-light"
            >
              <ArrowDown aria-hidden className="size-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
