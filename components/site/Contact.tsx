import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ContactForm } from "@/components/site/ContactForm";
import { LineReveal } from "@/components/site/LineReveal";
import { OfficeHours } from "@/components/site/OfficeHours";
import { Container, RunningHead, SmallCaps } from "@/components/site/primitives";
import { Reveal } from "@/components/site/Reveal";
import { SocialLinks } from "@/components/site/SocialLinks";
import { agent, directionsUrl, hours, mapEmbedUrl } from "@/lib/content";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function Contact() {
  const { address } = agent;

  return (
    <section id="contact" className="relative isolate [clip-path:inset(0)] bg-mist pt-6 pb-24 md:pb-32">
      <AuroraBackground tone="light" />
      <Container>
        <RunningHead number="08" title="Let's Move" />

        <LineReveal
          className="mt-16 text-[clamp(2.4rem,5.6vw,5.5rem)] leading-[0.9] tracking-[-0.05em] uppercase md:mt-24"
          lines={[
            <span key="a" className="font-black">
              Call
            </span>,
            <span key="b" className="font-extralight text-rose italic">
              or visit.
            </span>,
          ]}
        />

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="flex h-full flex-col gap-10 bg-night p-8 text-snow sm:p-10">
              <div>
                <SmallCaps className="text-rose-light">{agent.brokerage}</SmallCaps>
                <h3 className="mt-3 text-3xl font-extralight tracking-[-0.03em] uppercase">{agent.name}</h3>
              </div>

              <ul className="space-y-5 text-snow/85">
                <li className="flex gap-4">
                  <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-rose-light" strokeWidth={1.5} />
                  <address className="not-italic">
                    {address.street}
                    <br />
                    {address.city}, {address.region} {address.postalCode}, {address.country}
                  </address>
                </li>
                <li className="flex gap-4">
                  <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-rose-light" strokeWidth={1.5} />
                  <span className="flex flex-wrap gap-x-3 gap-y-1">
                    <a href={agent.phone.href} className="hover:text-rose-light">
                      {agent.phone.display}
                    </a>
                    <span aria-hidden className="text-snow/30">
                      /
                    </span>
                    <a href={agent.altPhone.href} className="hover:text-rose-light">
                      {agent.altPhone.display}
                    </a>
                  </span>
                </li>
                <li className="flex gap-4">
                  <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-rose-light" strokeWidth={1.5} />
                  <a href={`mailto:${agent.email}`} className="break-all hover:text-rose-light">
                    {agent.email}
                  </a>
                </li>
              </ul>

              <div className="border-t border-snow/15 pt-8">
                <h4 className="text-[0.7rem] font-semibold tracking-[0.3em] text-rose-light uppercase">Office Hours</h4>
                <OfficeHours />
                <p className="mt-4 text-snow/85">{hours.summary}</p>
                <p className="mt-2 text-sm leading-relaxed text-snow/60">{hours.note}</p>
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-6 border-t border-snow/15 pt-8">
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "inverse" })}>
                  <Navigation aria-hidden />
                  Get directions
                  <span className="sr-only">(opens Google Maps in a new tab)</span>
                </a>
                <SocialLinks />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 overflow-hidden border border-ink/15">
          <iframe
            title={`Map of ${address.street}, ${address.city}, ${address.regionCode}`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-72 w-full grayscale-[85%] md:h-[26rem]"
          />
        </div>
      </Container>
    </section>
  );
}
