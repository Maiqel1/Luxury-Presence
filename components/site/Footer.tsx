import Image from "next/image";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { InquiryButton } from "@/components/site/InquiryButton";
import { LineReveal } from "@/components/site/LineReveal";
import { ParallaxImage } from "@/components/site/ParallaxImage";
import { Container } from "@/components/site/primitives";
import { SocialLinks } from "@/components/site/SocialLinks";
import { agent, images, menu } from "@/lib/content";
import { AuroraBackground } from "@/components/ui/aurora-background";

async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

const headingClass = "text-[0.7rem] font-semibold tracking-[0.3em] text-rose-light uppercase";

export async function Footer() {
  const year = await copyrightYear();
  const { address } = agent;

  return (
    <footer className="bg-night-deep text-snow/70">
      <div className="relative isolate overflow-hidden">
        <ParallaxImage src={images.search.src} alt="" sizes="100vw" className="absolute inset-0 -z-20" strength={10} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,10,10,0.55)_0%,rgba(10,10,10,0.7)_55%,rgba(10,10,10,1)_100%)]" />
        <Container className="flex min-h-[80svh] flex-col justify-end pt-40 pb-20 text-snow">
          <LineReveal
            as="p"
            className="text-[clamp(2.4rem,5.6vw,5.5rem)] leading-[0.9] tracking-[-0.05em] uppercase"
            lines={[
              <span key="a" className="font-extralight">
                Ready to call
              </span>,
              <span key="b" className="font-black">
                Pahrump <span className="font-extralight text-rose-light italic">home?</span>
              </span>,
            ]}
          />
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <a href={agent.phone.href} className={buttonVariants({ variant: "inverse", size: "lg" })}>
              <Phone aria-hidden />
              Call {agent.phone.display}
            </a>
            <InquiryButton className={buttonVariants({ variant: "light", size: "lg" })}>Send a message</InquiryButton>
          </div>
        </Container>
      </div>

      <div className="relative isolate [clip-path:inset(0)]">
      <AuroraBackground tone="dark" />
      <Container className="pt-20 pb-28 md:pb-10">
        <div className="grid gap-12 border-t border-snow/10 pt-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="md:col-span-2 lg:col-span-5">
            <Image src={images.logo.src} alt={images.logo.alt} sizes="240px" className="h-10 w-auto brightness-0 invert" />
            <p className="mt-6 max-w-sm leading-relaxed">
              {agent.tagline} with {agent.brokerage}. Helping buyers and sellers across Southern Nevada since {agent.licensedSince}.
            </p>
            <SocialLinks className="mt-8" />
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className={headingClass}>Index</h2>
            <ul className="mt-6 space-y-3">
              {menu.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-rose-light">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className={headingClass}>Visit the office</h2>
            <address className="mt-6 space-y-3 not-italic">
              <p>
                {address.street}
                <br />
                {address.city}, {address.regionCode} {address.postalCode}
              </p>
              <p>
                <a href={agent.phone.href} className="transition-colors hover:text-rose-light">
                  {agent.phone.display}
                </a>
              </p>
              <p>
                <a href={`mailto:${agent.email}`} className="break-all transition-colors hover:text-rose-light">
                  {agent.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16">
          <TextHoverEffect text="MARCI METZGER" viewBoxWidth={720} duration={0.15} />
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-snow/10 pt-8 md:mt-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image src={images.equalHousing.src} alt={images.equalHousing.alt} sizes="40px" className="h-10 w-auto opacity-80 brightness-0 invert" />
            <p className="text-sm">Copyright © {year} Marci Metzger - All Rights Reserved</p>
          </div>
        </div>
      </Container>
      </div>
    </footer>
  );
}
