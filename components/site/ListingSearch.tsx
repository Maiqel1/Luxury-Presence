"use client";

import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { toast } from "sonner";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { buttonVariants } from "@/components/ui/button";
import { useInquiry } from "@/components/site/InquiryProvider";
import { LineReveal } from "@/components/site/LineReveal";
import { Container, RunningHead } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { agent, marqueeImages, search } from "@/lib/content";
import { composeSearchInquiry, formatPrice, priceError } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

const typeOptions: Option[] = search.propertyTypes.map((type) => ({ value: type.label, label: type.phrase }));
const bedOptions: Option[] = search.bedrooms.map((value) => ({
  value,
  label: value === "Any Number" ? "any number of bedrooms" : value === "Studio" ? "a studio layout" : `${value} bedrooms`,
}));
const bathOptions: Option[] = search.baths.map((value) => ({
  value,
  label: value === "Any Number" ? "any number of baths" : `${value} baths`,
}));
const minOptions: Option[] = [{ value: "", label: "$0" }, ...search.prices.map((p) => ({ value: String(p), label: formatPrice(p) }))];
const maxOptions: Option[] = [{ value: "", label: "no limit" }, ...search.prices.map((p) => ({ value: String(p), label: formatPrice(p) }))];

const blankClass =
  "absolute inset-0 h-full w-full min-w-0 rounded-none border-b-2 border-rose-light/60 bg-transparent p-0 font-semibold text-rose-light transition-colors hover:border-rose-light focus-visible:border-snow focus-visible:outline-none aria-[invalid=true]:border-red-400";

function Blank({
  id,
  label,
  value,
  onChange,
  options,
  invalid,
  describedBy,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  invalid?: boolean;
  describedBy?: string;
}) {
  const current = options.find((option) => option.value === value)?.label ?? "";
  return (
    <span className="relative inline-block max-w-full align-baseline">
      <span aria-hidden className="invisible pr-[1.1em] font-semibold whitespace-pre">
        {current}
      </span>
      <select
        id={id}
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={cn(blankClass, "cursor-pointer appearance-none pr-[1.1em]")}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-0 size-[0.6em] -translate-y-1/2 text-rose-light" />
    </span>
  );
}

export function ListingSearch() {
  const id = useId();
  const { startInquiry } = useInquiry();
  const [location, setLocation] = useState("Pahrump, NV");
  const [type, setType] = useState(typeOptions[0].value);
  const [beds, setBeds] = useState(search.bedrooms[0]);
  const [baths, setBaths] = useState(search.baths[0]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState(search.sortOptions[0]);
  const [error, setError] = useState<string | null>(null);

  const min = minPrice ? Number(minPrice) : null;
  const max = maxPrice ? Number(maxPrice) : null;
  const errorId = `${id}-error`;

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem = priceError(min, max);
    setError(problem);
    if (problem) return;

    const property = search.propertyTypes.find((option) => option.label === type)?.phrase ?? "a home";
    startInquiry(composeSearchInquiry({ location, property, beds, baths, minPrice: min, maxPrice: max, sort }));
    toast.success("Your search is ready to send", {
      description: "We've written it up as a message to Marci below. Add your details and send.",
    });
  }

  return (
    <section id="listings" className="relative isolate overflow-hidden bg-night-deep pt-6 pb-24 text-snow md:pb-32">
      <ThreeDMarquee images={marqueeImages} className="absolute inset-0 -z-20 h-full" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,10,0.97)_0%,rgba(10,10,10,0.9)_45%,rgba(10,10,10,0.55)_80%,rgba(10,10,10,0.4)_100%)] max-lg:bg-night-deep/85" />

      <Container>
        <RunningHead number="04" title="Search Listings" tone="dark" />

        <LineReveal
          className="mt-16 text-[clamp(2.4rem,5.6vw,5.5rem)] leading-[0.9] tracking-[-0.05em] uppercase md:mt-24"
          lines={[
            <span key="a" className="font-extralight">
              Find your
            </span>,
            <span key="b" className="font-black">
              dream home.
            </span>,
          ]}
        />
        <Reveal>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-snow/70">
            Fill in the blanks. Your sentence becomes a note to Marci, and she replies with homes that fit.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} noValidate className="mt-14 border-t border-snow/15 pt-12 md:mt-20 md:pt-16">
            <p className="max-w-5xl text-[clamp(1.3rem,2.5vw,2.25rem)] leading-[1.75] font-extralight tracking-[-0.01em] text-snow">
              I&apos;m looking for{" "}
              <Blank id={`${id}-type`} label="Type" value={type} onChange={setType} options={typeOptions} /> in{" "}
              <span className="relative inline-block max-w-full align-baseline">
                <span aria-hidden className="invisible pr-[0.2em] font-semibold whitespace-pre">
                  {location || "anywhere"}
                </span>
                <input
                  id={`${id}-location`}
                  aria-label="Location"
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="anywhere"
                  autoComplete="off"
                  className={cn(blankClass, "placeholder:text-rose-light/50")}
                />
              </span>
{" "}
              with <Blank id={`${id}-beds`} label="Bedrooms" value={beds} onChange={setBeds} options={bedOptions} /> and{" "}
              <Blank id={`${id}-baths`} label="Baths" value={baths} onChange={setBaths} options={bathOptions} />, priced from{" "}
              <Blank
                id={`${id}-min`}
                label="Min Price"
                value={minPrice}
                onChange={setMinPrice}
                options={minOptions}
                invalid={Boolean(error)}
                describedBy={error ? errorId : undefined}
              />{" "}
              to{" "}
              <Blank
                id={`${id}-max`}
                label="Max Price"
                value={maxPrice}
                onChange={setMaxPrice}
                options={maxOptions}
                invalid={Boolean(error)}
                describedBy={error ? errorId : undefined}
              />
              .
            </p>

            <p id={errorId} role="alert" className="mt-4 min-h-6 text-base font-medium text-red-300">
              {error}
            </p>

            <div className="mt-8 flex flex-col gap-8 border-t border-snow/15 pt-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
                <div className="flex items-center gap-4">
                  <label htmlFor={`${id}-sort`} className="text-[0.7rem] font-semibold tracking-[0.3em] text-snow/60 uppercase">
                    Sort By
                  </label>
                  <span className="relative">
                    <select
                      id={`${id}-sort`}
                      value={sort}
                      onChange={(event) => setSort(event.target.value)}
                      className="h-11 cursor-pointer appearance-none rounded-none border-b border-snow/30 bg-transparent pr-8 text-sm font-medium tracking-normal text-snow normal-case transition-colors hover:border-rose-light focus-visible:border-rose-light focus-visible:outline-none"
                    >
                      {search.sortOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 text-rose-light" />
                  </span>
                </div>
                <a
                  href={agent.listingsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.3em] text-snow/80 uppercase transition-colors hover:text-rose-light"
                >
                  Browse all listings
                  <ArrowUpRight aria-hidden className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
              <button type="submit" className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "w-full sm:w-auto")}>
                Search Now
                <ArrowRight aria-hidden className="transition-transform duration-300 group-hover/button:translate-x-1" />
              </button>
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
