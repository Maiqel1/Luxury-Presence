"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, useSyncExternalStore } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cookieNotice } from "@/lib/content";

const STORAGE_KEY = "mm-cookie-notice";

function readAccepted() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export function CookieNotice() {
  const accepted = useSyncExternalStore(subscribe, readAccepted, () => true);
  const [dismissed, setDismissed] = useState(false);

  function accept() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {}
    setDismissed(true);
  }

  return (
    <AnimatePresence>
      {!accepted && !dismissed && (
        <motion.section
          aria-label="Cookie notice"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.2, duration: 0.5 } }}
          exit={{ opacity: 0, y: 24 }}
          className="fixed right-4 bottom-24 left-4 z-40 max-w-sm border border-ink/15 bg-snow p-6 text-ink shadow-[0_30px_80px_-30px_rgba(10,10,10,0.5)] sm:right-auto sm:left-6 md:bottom-6"
        >
          <h2 className="text-[0.7rem] font-bold tracking-[0.3em] uppercase">{cookieNotice.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/70">{cookieNotice.body}</p>
          <button type="button" onClick={accept} className={buttonVariants({ size: "sm", className: "mt-5" })}>
            Accept
          </button>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
