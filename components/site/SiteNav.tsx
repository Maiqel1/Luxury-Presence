"use client";

import Image from "next/image";
import { Phone, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogClose, DialogDescription, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { SocialLinks } from "@/components/site/SocialLinks";
import { agent, images, menu, nav } from "@/lib/content";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

function goTo(href: string) {
  window.setTimeout(() => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}

function MenuOverlay({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [preview, setPreview] = useState(0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogPrimitive.Content className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-night-deep text-snow outline-none data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0">
          <div className="mx-auto flex h-18 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10">
            <DialogTitle className="text-[0.7rem] font-semibold tracking-[0.3em] text-rose-light uppercase">Index</DialogTitle>
            <DialogDescription className="sr-only">Jump to a section of the page</DialogDescription>
            <DialogClose className="inline-flex h-11 items-center gap-3 text-[0.7rem] font-semibold tracking-[0.3em] uppercase transition-colors hover:text-rose-light">
              Close
              <X aria-hidden className="size-5" />
            </DialogClose>
          </div>

          <div className="mx-auto grid w-full max-w-[1600px] flex-1 gap-10 px-4 pt-6 pb-10 sm:px-6 lg:grid-cols-12 lg:px-10">
            <nav aria-label="Index" className="lg:col-span-7">
              <ol>
                {menu.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 * index, ease }}
                    className="border-b border-snow/10"
                  >
                    <a
                      href={item.href}
                      onMouseEnter={() => setPreview(index)}
                      onFocus={() => setPreview(index)}
                      onClick={(event) => {
                        event.preventDefault();
                        onOpenChange(false);
                        goTo(item.href);
                      }}
                      className="group flex items-baseline gap-5 py-3 sm:py-4"
                    >
                      <span className="w-8 text-xs font-semibold text-rose-light tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-[clamp(1.8rem,4.4vw,3.4rem)] leading-none font-extralight tracking-[-0.03em] uppercase transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-rose-light group-focus-visible:text-rose-light">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ol>
            </nav>

            <div className="relative hidden overflow-hidden lg:col-span-5 lg:block">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={preview}
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={{ clipPath: "inset(0% 0 0 0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease }}
                  className="absolute inset-0"
                >
                  <Image src={menu[preview].image} alt="" fill sizes="40vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 border-t border-snow/10 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
            <div className="text-sm text-snow/70">
              <p>
                {agent.address.street}, {agent.address.city}, {agent.address.regionCode} {agent.address.postalCode}
              </p>
              <p className="mt-1">
                <a href={agent.phone.href} className="hover:text-rose-light">
                  {agent.phone.display}
                </a>
                <span className="mx-3 text-snow/30">/</span>
                <a href={`mailto:${agent.email}`} className="hover:text-rose-light">
                  {agent.email}
                </a>
              </p>
            </div>
            <SocialLinks />
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setSolid(latest > 60);
    setHidden(latest > 480 && latest > previous);
  });

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease }}
        data-solid={solid}
        className="group/nav fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "border-b transition-[background-color,border-color] duration-500",
            solid ? "border-ink/10 bg-snow/95" : "border-snow/15 bg-transparent",
          )}
        >
          <div className="mx-auto grid h-18 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-10">
            <div className="flex items-center gap-8">
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                className="group inline-flex h-11 items-center gap-3 text-[0.7rem] font-semibold tracking-[0.3em] text-snow uppercase transition-colors group-data-[solid=true]/nav:text-ink"
              >
                <span aria-hidden className="flex w-6 flex-col gap-1.5">
                  <span className="h-px w-full bg-current transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="h-px w-2/3 bg-current transition-[width] duration-300 group-hover:w-full" />
                </span>
                Menu
              </button>
              <nav aria-label="Primary" className="hidden xl:block">
                <ul className="flex items-center gap-7">
                  {nav.slice(1).map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="relative text-[0.7rem] font-semibold tracking-[0.24em] text-snow/80 uppercase transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-rose-light after:transition-[width] after:duration-300 hover:text-snow hover:after:w-full group-data-[solid=true]/nav:text-ink/70 group-data-[solid=true]/nav:hover:text-ink"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <a href="#home" aria-label="Marci Metzger Homes, back to top" className="block">
              <Image
                src={images.logo.src}
                alt=""
                priority
                sizes="200px"
                className="h-7 w-auto brightness-0 invert transition-[filter] duration-500 group-data-[solid=true]/nav:filter-none sm:h-9"
              />
            </a>

            <div className="flex justify-end">
              <a
                href={agent.phone.href}
                aria-label={`Call ${agent.phone.display}`}
                className={cn(buttonVariants({ variant: "inverse", size: "sm" }), "group-data-[solid=true]/nav:bg-ink group-data-[solid=true]/nav:text-snow group-data-[solid=true]/nav:hover:bg-rose max-sm:size-11 max-sm:px-0 max-sm:tracking-normal")}
              >
                <Phone aria-hidden />
                <span className="hidden sm:inline">{agent.phone.display}</span>
              </a>
            </div>
          </div>
        </div>
      </motion.header>
      <MenuOverlay open={open} onOpenChange={setOpen} />
    </>
  );
}
