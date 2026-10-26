import Image from "next/image";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CometCard } from "@/components/ui/comet-card";
import { Affiliations } from "@/components/site/Affiliations";
import { InquiryButton } from "@/components/site/InquiryButton";
import { LineReveal } from "@/components/site/LineReveal";
import { Container, RunningHead, SmallCaps } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { about, agent, images } from "@/lib/content";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function About() {
  return (
    <section id="about" className="relative isolate [clip-path:inset(0)] bg-snow pt-6 pb-24 md:pb-32">
      <AuroraBackground tone="light" />
      <Container>
        <RunningHead number="01" title="About Us" />

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-12">
          <Reveal className="relative lg:col-span-5">
            <p
              aria-hidden
              className="absolute top-0 -left-9 hidden rotate-180 text-[0.7rem] font-semibold tracking-[0.4em] whitespace-nowrap text-ink/40 uppercase [writing-mode:vertical-rl] xl:block"
            >
              Est. {agent.licensedSince} — Pahrump, Nevada
            </p>
            <CometCard className="mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                <Image
                  src={images.portrait.src}
                  alt={images.portrait.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 92vw"
                  className="object-cover object-[50%_18%]"
                />
              </div>
            </CometCard>
            <div className="mx-auto mt-5 flex max-w-md items-baseline justify-between gap-4 text-sm text-ink/60 lg:max-w-none">
              <p className="italic">{agent.name}, REALTOR®</p>
              <p>{agent.brokerage}</p>
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <LineReveal
              className="text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.05em] uppercase"
              lines={[
                <span key="a" className="font-extralight">
                  Marci
                </span>,
                <span key="b" className="font-black">
                  Metzger
                </span>,
              ]}
            />
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <SmallCaps className="text-rose">{agent.experience}</SmallCaps>
                <a href={agent.phone.href} className="text-lg font-semibold tracking-wide text-ink underline-offset-8 hover:underline">
                  {agent.phone.short}
                </a>
              </div>
              <p className="drop-cap mt-10 max-w-xl text-lg leading-[1.85] text-ink/80">{about.bio}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <figure className="relative mt-14 max-w-xl border-t border-ink/15 pt-10">
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-2 right-0 h-[0.62em] overflow-hidden text-[13rem] leading-[0.95] font-black text-rose-light/25 select-none"
                >
                  “
                </span>
                <figcaption className="text-[0.7rem] font-semibold tracking-[0.3em] text-ink/50 uppercase">In Her Words</figcaption>
                <blockquote className="mt-5 space-y-4 text-xl leading-[1.6] font-light text-ink italic md:text-2xl md:leading-[1.55]">
                  {about.quote.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </blockquote>
              </figure>

              <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                <a href={agent.phone.href} className={buttonVariants({ size: "lg" })}>
                  <Phone aria-hidden />
                  Call Marci
                </a>
                <InquiryButton className={buttonVariants({ variant: "outline", size: "lg" })}>Send a message</InquiryButton>
              </div>
            </Reveal>
          </div>
        </div>

        <Affiliations />
      </Container>
    </section>
  );
}
