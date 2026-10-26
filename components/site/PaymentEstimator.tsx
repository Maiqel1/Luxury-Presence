"use client";

import { ArrowRight } from "lucide-react";
import { motion, useSpring, useTransform } from "motion/react";
import { useEffect, useId, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { InquiryButton } from "@/components/site/InquiryButton";
import { LineReveal } from "@/components/site/LineReveal";
import { Container, RunningHead, SmallCaps } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { composeLenderInquiry } from "@/lib/inquiry";
import { loanAmount, monthlyPayment, usd } from "@/lib/mortgage";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/ui/aurora-background";

const rowClass = "border-t border-ink/15 py-7";
const labelClass = "text-[0.7rem] font-semibold tracking-[0.3em] text-ink/55 uppercase";

function fill(value: number, min: number, max: number) {
  return { "--fill": `${((value - min) / (max - min)) * 100}%` } as React.CSSProperties;
}

export function PaymentEstimator() {
  const id = useId();
  const [price, setPrice] = useState(400_000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState("6.5");
  const [years, setYears] = useState(30);

  const parsedRate = Number.parseFloat(rate);
  const principal = loanAmount(price, down);
  const payment = monthlyPayment(principal, Number.isFinite(parsedRate) ? parsedRate : 0, years);

  const spring = useSpring(payment, { stiffness: 140, damping: 24 });
  const display = useTransform(spring, (value) => usd.format(Math.round(value)));

  useEffect(() => {
    spring.set(payment);
  }, [payment, spring]);

  return (
    <section id="estimate" className="relative isolate [clip-path:inset(0)] bg-snow pt-6 pb-24 md:pb-32">
      <AuroraBackground tone="light" />
      <Container>
        <RunningHead number="07" title="Plan Your Purchase" />

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <LineReveal
              className="text-[clamp(2.3rem,4.8vw,4.75rem)] leading-[0.92] tracking-[-0.05em] uppercase"
              lines={[
                <span key="a" className="font-extralight">
                  What could
                </span>,
                <span key="b" className="font-extralight">
                  your payment
                </span>,
                <span key="c" className="font-black">
                  be?
                </span>,
              ]}
            />
            <Reveal delay={0.1}>
              <div className="mt-14 border-t border-ink/15 pt-8">
                <SmallCaps className="text-rose">Estimated monthly payment</SmallCaps>
                <p className="mt-4 flex items-baseline gap-3">
                  <motion.span aria-hidden className="text-[clamp(3.2rem,7vw,6.5rem)] leading-none font-extralight tracking-[-0.05em] text-ink tabular-nums">
                    {display}
                  </motion.span>
                  <span className="text-lg font-light text-ink/60">/mo</span>
                  <output htmlFor={`${id}-price ${id}-down ${id}-rate`} className="sr-only">
                    {usd.format(Math.round(payment))} per month
                  </output>
                </p>
                <p className="mt-3 text-sm text-ink/60">
                  Principal &amp; interest on a {usd.format(principal)} loan over {years} years.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.15}>
            <p className="mb-8 max-w-md text-lg leading-relaxed text-ink/75">
              A quick estimate to start the conversation. For real numbers, Marci can connect you with lenders who can answer your
              questions about affordability, credit and loan options.
            </p>

            <div className={rowClass}>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`${id}-price`} className={labelClass}>
                  Home price
                </label>
                <span className="text-2xl font-light text-ink tabular-nums">{usd.format(price)}</span>
              </div>
              <input
                id={`${id}-price`}
                type="range"
                min={100_000}
                max={1_500_000}
                step={5_000}
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
                aria-valuetext={usd.format(price)}
                style={fill(price, 100_000, 1_500_000)}
                className="range-editorial mt-4 w-full"
              />
            </div>

            <div className={rowClass}>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={`${id}-down`} className={labelClass}>
                  Down payment
                </label>
                <span className="text-2xl font-light text-ink tabular-nums">
                  {down}% <span className="text-base text-ink/50">· {usd.format(price - principal)}</span>
                </span>
              </div>
              <input
                id={`${id}-down`}
                type="range"
                min={0}
                max={50}
                step={1}
                value={down}
                onChange={(event) => setDown(Number(event.target.value))}
                aria-valuetext={`${down}%, ${usd.format(price - principal)}`}
                style={fill(down, 0, 50)}
                className="range-editorial mt-4 w-full"
              />
            </div>

            <div className={cn(rowClass, "grid gap-8 sm:grid-cols-2")}>
              <div>
                <label htmlFor={`${id}-rate`} className={labelClass}>
                  Interest rate
                </label>
                <div className="relative mt-3">
                  <input
                    id={`${id}-rate`}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={15}
                    step={0.125}
                    value={rate}
                    onChange={(event) => setRate(event.target.value)}
                    aria-describedby={`${id}-rate-hint`}
                    className="h-12 w-full rounded-none border-b border-ink/30 bg-transparent pr-8 text-2xl font-light text-ink transition-colors hover:border-ink focus-visible:border-rose-light focus-visible:outline-none"
                  />
                  <span aria-hidden className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-lg text-ink/50">
                    %
                  </span>
                </div>
                <p id={`${id}-rate-hint`} className="mt-2 text-xs text-ink/55">
                  Example rate. Adjust to your quote.
                </p>
              </div>
              <fieldset>
                <legend className={labelClass}>Loan term</legend>
                <div className="mt-3 grid grid-cols-2 border border-ink/30">
                  {[15, 30].map((term) => (
                    <label key={term} className="relative">
                      <input
                        type="radio"
                        name={`${id}-term`}
                        value={term}
                        checked={years === term}
                        onChange={() => setYears(term)}
                        className="peer sr-only"
                      />
                      <span className="flex h-12 cursor-pointer items-center justify-center text-sm font-semibold tracking-[0.1em] text-ink transition-colors peer-checked:bg-ink peer-checked:text-snow peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rose-light hover:bg-ink/5">
                        {term} YR
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="border-t border-ink/15 pt-8">
              <InquiryButton message={composeLenderInquiry(price, down, years)} className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}>
                Ask Marci about lenders
                <ArrowRight aria-hidden className="transition-transform duration-300 group-hover/button:translate-x-1" />
              </InquiryButton>
              <p className="mt-4 text-xs leading-relaxed text-ink/55">Estimate only. Taxes, insurance and HOA dues are extra.</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
