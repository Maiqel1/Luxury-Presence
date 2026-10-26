import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { LineReveal } from "@/components/site/LineReveal";
import { Container, RunningHead } from "@/components/site/primitives";
import { services } from "@/lib/content";
import { AuroraBackground } from "@/components/ui/aurora-background";

const content = services.map((service) => ({
  title: service.title,
  description: service.body,
  image: service.image,
}));

export function Services() {
  return (
    <section id="services" className="relative isolate [clip-path:inset(0)] bg-night-deep pt-6 pb-24 text-snow md:pb-32">
      <AuroraBackground tone="dark" />
      <Container>
        <RunningHead number="06" title="Our Services" tone="dark" />
        <div className="mt-16 flex flex-col gap-6 md:mt-24 lg:flex-row lg:items-end lg:justify-between">
          <LineReveal
            className="text-[clamp(2.4rem,5.6vw,5.5rem)] leading-[0.9] tracking-[-0.05em] uppercase"
            lines={[
              <span key="a" className="font-extralight">
                Our
              </span>,
              <span key="b" className="font-black text-rose-light">
                Services
              </span>,
            ]}
          />
          <p className="max-w-sm text-lg leading-relaxed text-snow/65 lg:pb-4">Buying, selling and investing, residential and commercial.</p>
        </div>
        <StickyScroll content={content} className="mt-16 md:mt-24" />
      </Container>
    </section>
  );
}
