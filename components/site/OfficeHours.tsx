"use client";

import { useSyncExternalStore } from "react";
import { officeStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";

function subscribe(onChange: () => void) {
  const timer = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(timer);
}

export function OfficeHours() {
  const label = useSyncExternalStore(subscribe, () => officeStatus().label, () => null);
  const open = label?.startsWith("Open") ?? false;

  return (
    <p className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-snow/20 px-3.5 py-1.5 text-sm font-medium">
      <span className="relative flex size-2.5">
        {open && <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />}
        <span className={cn("relative inline-flex size-2.5 rounded-full", open ? "bg-emerald-400" : "bg-snow/40")} />
      </span>
      <span aria-live="polite">{label ?? "Checking office hours…"}</span>
    </p>
  );
}
