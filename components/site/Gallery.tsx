"use client";

import { useState } from "react";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import { LineReveal } from "@/components/site/LineReveal";
import { Lightbox } from "@/components/site/Lightbox";
import { Container, RunningHead } from "@/components/site/primitives";
import { gallery } from "@/lib/content";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative isolate [clip-path:inset(0)] overflow-hidden bg-snow pt-6 pb-8 md:pb-12">
      <AuroraBackground tone="light" />
      <Container>
        <RunningHead number="05" title="Photo Gallery" />
        <div className="mt-16 flex flex-col gap-8 md:mt-24 lg:flex-row lg:items-end lg:justify-between">
          <LineReveal
            className="text-[clamp(2.4rem,5.6vw,5.5rem)] leading-[0.9] tracking-[-0.05em] uppercase"
            lines={[
              <span key="a" className="font-extralight">
                Photo
              </span>,
              <span key="b" className="font-black">
                Gallery
              </span>,
            ]}
          />
          <div className="flex flex-col items-start gap-4 lg:items-end lg:pb-3">
            <p className="text-sm text-ink/60">{gallery.length} photos from homes and the community. Select one to enlarge.</p>
            <button
              type="button"
              onClick={() => setSelected(0)}
              className="text-[0.7rem] font-semibold tracking-[0.3em] text-ink uppercase underline-offset-8 hover:underline"
            >
              View as slideshow
            </button>
          </div>
        </div>
        <ParallaxScroll images={gallery} onSelect={setSelected} />
      </Container>
      <Lightbox photos={gallery} index={selected} onIndexChange={setSelected} />
    </section>
  );
}
