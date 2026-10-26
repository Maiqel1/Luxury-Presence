"use client";

import { MessageSquare, Phone } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { InquiryButton } from "@/components/site/InquiryButton";
import { agent } from "@/lib/content";
import { cn } from "@/lib/utils";

export function MobileActionBar() {
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    const contact = document.getElementById("contact");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setPastHero(!entry.isIntersecting);
        if (entry.target === contact) setAtContact(entry.isIntersecting);
      }
    });
    if (hero) observer.observe(hero);
    if (contact) observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {pastHero && !atContact && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-snow/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
        >
          <div className="grid grid-cols-2 gap-3">
            <a href={agent.phone.href} className={cn(buttonVariants({ size: "sm" }), "h-11")}>
              <Phone aria-hidden />
              Call Marci
            </a>
            <InquiryButton className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-11")}>
              <MessageSquare aria-hidden />
              Message
            </InquiryButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
