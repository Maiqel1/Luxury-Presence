"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type InquiryContextValue = {
  message: string;
  setMessage: (message: string) => void;
  sentBy: string | null;
  setSentBy: (name: string | null) => void;
  startInquiry: (message?: string) => void;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

export const CONTACT_NAME_ID = "contact-name";

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");
  const [sentBy, setSentBy] = useState<string | null>(null);

  const startInquiry = useCallback((next?: string) => {
    setSentBy(null);
    if (next) setMessage(next);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("contact")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => document.getElementById(CONTACT_NAME_ID)?.focus({ preventScroll: true }), reduceMotion ? 0 : 700);
  }, []);

  const value = useMemo(
    () => ({ message, setMessage, sentBy, setSentBy, startInquiry }),
    [message, sentBy, startInquiry],
  );

  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) throw new Error("useInquiry must be used inside InquiryProvider");
  return context;
}
