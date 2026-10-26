import WorldMap from "@/components/ui/world-map";
import { CountUp } from "@/components/site/CountUp";
import { LineReveal } from "@/components/site/LineReveal";
import { Container, RunningHead, SmallCaps } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { journey, stats } from "@/lib/content";
import mapData from "@/lib/journey-map.json";
import { AuroraBackground } from "@/components/ui/aurora-background";

const { pins } = mapData;

export function Journey() {
  return (
    <section aria-labelledby="journey-title" className="relative isolate [clip-path:inset(0)] overflow-hidden bg-night-deep pt-6 pb-24 text-snow md:pb-32">
      <AuroraBackground tone="dark" />
      <Container>
        <RunningHead number="02" title="The Record" tone="dark" />

        <div className="mt-16 grid items-center gap-16 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <LineReveal
              id="journey-title"
              className="text-[clamp(2.1rem,4.2vw,4rem)] leading-[0.95] tracking-[-0.045em] uppercase"
              lines={[
                <span key="a" className="font-extralight">
                  From Washington
                </span>,
                <span key="b" className="font-extralight">
                  to the Nevada
                </span>,
                <span key="c" className="font-black text-rose-light">
                  sunshine.
                </span>,
              ]}
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-lg text-lg leading-[1.8] text-snow/75">{journey.body}</p>
            </Reveal>

            <Reveal delay={0.15} className="mt-14">
              <SmallCaps className="text-rose-light">Top Residential Sales Last 5 Years</SmallCaps>
              <ul className="mt-6 grid border-t border-snow/15 sm:grid-cols-3">
                {stats.map((stat) => (
                  <li key={stat.label} className="border-snow/15 py-6 max-sm:[&:not(:first-child)]:border-t sm:pr-3 sm:pb-0 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-6">
                    <p className="text-[0.7rem] font-semibold tracking-[0.24em] text-snow/50 uppercase">{stat.lead}</p>
                    <p className="text-outline mt-3 text-[clamp(1.9rem,3.4vw,3.4rem)] leading-none font-extrabold tracking-[-0.04em] text-rose-light">
                      <CountUp value={stat.value} decimals={stat.decimals} prefix={stat.prefix} suffix={stat.suffix} />
                    </p>
                    <p className="mt-3 text-sm leading-snug text-snow/75">{stat.label}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <WorldMap
              src="/images/journey-map.svg"
              width={mapData.width}
              height={mapData.height}
              className="mx-auto max-w-2xl"
              arcs={[
                { start: pins.seattle, end: pins.pahrump, bend: 0.28 },
                { start: pins.pahrump, end: pins.vegas, bend: 0.9 },
              ]}
              places={[
                { ...pins.seattle, label: "Washington State", note: "REALTOR, then Broker · 1995" },
                { ...pins.pahrump, label: "Pahrump, NV", note: "Home & office today", align: "left" },
                { ...pins.vegas, label: "Las Vegas", note: "Easy access" },
              ]}
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
