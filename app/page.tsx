import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { CookieNotice } from "@/components/site/CookieNotice";
import { Footer } from "@/components/site/Footer";
import { Gallery } from "@/components/site/Gallery";
import { GetItSold } from "@/components/site/GetItSold";
import { Hero } from "@/components/site/Hero";
import { InquiryProvider } from "@/components/site/InquiryProvider";
import { Journey } from "@/components/site/Journey";
import { ListingSearch } from "@/components/site/ListingSearch";
import { MobileActionBar } from "@/components/site/MobileActionBar";
import { PaymentEstimator } from "@/components/site/PaymentEstimator";
import { Services } from "@/components/site/Services";
import { SiteNav } from "@/components/site/SiteNav";
import { agent, socials } from "@/lib/content";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: `${agent.name} - ${agent.brokerage}`,
  telephone: "+1-206-919-6886",
  email: agent.email,
  image: "/images/marci-portrait.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: agent.address.street,
    addressLocality: agent.address.city,
    addressRegion: agent.address.regionCode,
    postalCode: agent.address.postalCode,
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: agent.coordinates.lat, longitude: agent.coordinates.lng },
  openingHours: "Mo-Su 08:00-19:00",
  sameAs: socials.map((social) => social.href),
};

export default function Home() {
  return (
    <InquiryProvider>
      <SiteNav />
      <main id="main">
        <Hero />
        <About />
        <Journey />
        <GetItSold />
        <ListingSearch />
        <Gallery />
        <Services />
        <PaymentEstimator />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
      <CookieNotice />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
    </InquiryProvider>
  );
}
