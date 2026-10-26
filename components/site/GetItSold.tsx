import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { InquiryButton } from "@/components/site/InquiryButton";
import { LineReveal } from "@/components/site/LineReveal";
import { ParallaxImage } from "@/components/site/ParallaxImage";
import { Container, RunningHead } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { sellPoints } from "@/lib/content";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/ui/aurora-background";

const valuationMessage =
  "Hi Marci, I'm thinking about selling my home and would love a market analysis. Could we set up a time to talk?";

const numerals = ["I", "II", "III"];

const layouts = [
  {
    image: "lg:col-span-8 aspect-[4/3] lg:aspect-[16/10]",
    text: "lg:col-span-5 lg:col-start-8 lg:-mt-48",
  },
  {
    image: "lg:col-span-5 lg:col-start-7 lg:row-start-1 aspect-[4/5]",
    text: "lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:self-center",
  },
  {
    image: "lg:col-span-6 aspect-[3/2]",
    text: "lg:col-span-5 lg:col-start-8 lg:self-end",
  },
];

export function GetItSold() {
  return (
    <section id="sell" className="relative isolate [clip-path:inset(0)] bg-mist pt-6 pb-24 md:pb-32">
      <AuroraBackground tone="light" />
      <Container>
        <RunningHead number="03" title="Get It Sold" />

        <div className="mt-16 flex flex-col gap-10 md:mt-24 lg:flex-row lg:items-end lg:justify-between">
          <LineReveal
            className="text-[clamp(2.4rem,5.6vw,5.5rem)] leading-[0.9] tracking-[-0.05em] uppercase"
            lines={[
              <span key="a" className="font-extralight">
                Don&apos;t just
              </span>,
              <span key="b" className="font-extralight">
                list it.
              </span>,
              <span key="c" className="font-black text-rose">
                Get it sold.
              </span>,
            ]}
          />
          <Reveal className="max-w-sm lg:pb-4">
            <p className="text-lg leading-relaxed text-ink/75">
              Pricing, marketing and negotiation from an agent who has been doing it since 1995.
            </p>
            <InquiryButton message={valuationMessage} className={cn(buttonVariants({ variant: "outline" }), "mt-6")}>
              Request a market analysis
              <ArrowRight aria-hidden className="transition-transform duration-300 group-hover/button:translate-x-1" />
            </InquiryButton>
          </Reveal>
        </div>

        <div className="mt-20 space-y-20 md:mt-28 md:space-y-28">
          {sellPoints.map((point, index) => (
            <article key={point.title} className="grid gap-8 lg:grid-cols-12 lg:gap-x-10">
              <ParallaxImage
                src={point.image.src}
                alt={point.image.alt}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className={layouts[index].image}
              />
              <Reveal
                className={cn(
                  "relative lg:p-12",
                  index === 0 && "lg:bg-snow lg:shadow-[0_40px_80px_-40px_rgba(10,10,10,0.35)]",
                  layouts[index].text,
                )}
              >
                <p className="text-5xl leading-none font-extralight text-rose">{numerals[index]}</p>
                <h3 className="mt-6 text-2xl leading-tight font-bold tracking-[-0.02em] text-ink uppercase md:text-3xl">{point.title}</h3>
                <span aria-hidden className="mt-6 block h-px w-16 bg-rose-light" />
                {point.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="mt-5 text-base leading-[1.85] text-ink/75 md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
