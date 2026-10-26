import heroImage from "@/public/images/hero-mountain-falls.jpg";
import portraitImage from "@/public/images/marci-portrait.jpg";
import searchImage from "@/public/images/search-bg.jpg";
import logoImage from "@/public/images/logo.png";
import ridgeLogo from "@/public/images/affiliations/ridge-realty.png";
import realtorLogo from "@/public/images/affiliations/realtor.jpg";
import chamberLogo from "@/public/images/affiliations/chamber.jpg";
import equalHousingLogo from "@/public/images/affiliations/equal-housing.png";
import topSalesImage from "@/public/images/sold/top-sales.jpg";
import listItImage from "@/public/images/sold/list-it.jpg";
import buyersGuideImage from "@/public/images/sold/buyers-guide.jpg";
import doneRightImage from "@/public/images/services/done-right.jpg";
import commercialImage from "@/public/images/services/commercial-residential.jpg";
import expertiseImage from "@/public/images/services/expertise.jpg";
import gallery01 from "@/public/images/gallery/01.jpg";
import gallery02 from "@/public/images/gallery/02.jpg";
import gallery03 from "@/public/images/gallery/03.jpg";
import gallery04 from "@/public/images/gallery/04.jpg";
import gallery05 from "@/public/images/gallery/05.jpg";
import gallery06 from "@/public/images/gallery/06.jpg";
import gallery07 from "@/public/images/gallery/07.jpg";

export const images = {
  hero: { src: heroImage, alt: "Fountains in the pond at Mountain Falls in Pahrump, with mountains beyond" },
  portrait: { src: portraitImage, alt: "Marci Metzger, Realtor with The Ridge Realty Group" },
  search: { src: searchImage, alt: "" },
  logo: { src: logoImage, alt: "Marci Metzger Homes" },
  equalHousing: { src: equalHousingLogo, alt: "Equal Housing Opportunity" },
};

export const agent = {
  name: "Marci Metzger",
  brokerage: "The Ridge Realty Group",
  tagline: "Pahrump Realtor",
  experience: "Realtor for nearly 3 decades",
  licensedSince: 1995,
  phone: { display: "(206) 919-6886", short: "206-919-6886", href: "tel:+12069196886" },
  altPhone: { display: "(425) 941-2560", href: "tel:+14259412560" },
  email: "marcimetzger@gmail.com",
  address: {
    street: "3190 HW-160, Suite F",
    city: "Pahrump",
    region: "Nevada",
    regionCode: "NV",
    postalCode: "89048",
    country: "United States",
  },
  coordinates: { lat: 36.184402445333134, lng: -115.95528754494798 },
  listingsUrl: "https://marcimetzger.com/listings",
};

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${agent.coordinates.lat},${agent.coordinates.lng}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${agent.coordinates.lat},${agent.coordinates.lng}&z=14&output=embed`;

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Listings", href: "#listings" },
  { label: "Let's Move", href: "#contact" },
];

export const stats = [
  { lead: "Nearly", value: 90, decimals: 0, prefix: "", suffix: "", label: "clients helped in 2021" },
  { lead: "Closed", value: 28.5, decimals: 1, prefix: "$", suffix: "M", label: "in sales in 2021" },
  { lead: "Nearly", value: 3, decimals: 0, prefix: "", suffix: "", label: "decades as a REALTOR" },
];

export const about = {
  bio: "Marci was a REALTOR, then licensed Broker, in Washington State. Now, she is enjoying the sunshine, and helping clients in Southern Nevada. Having helped buyers and sellers in many markets since 1995, she is a wealth of knowledge.",
  quote: [
    "I love that small-town feeling that our community offers. Spectacular golf courses, parks, pool, and easy access to Las Vegas make Pahrump a great place to call home. Working or retired, fast-paced or looking to relax... there's a place for you here!",
    "I enjoy living in the Mountain Falls community and will strive to find you a home that will suit you just as this community does me.",
  ],
};

export const affiliations = [
  { name: "The Ridge Realty Group", src: ridgeLogo },
  { name: "National Association of REALTORS®", src: realtorLogo },
  { name: "Pahrump Valley Chamber of Commerce", src: chamberLogo },
  { name: "Equal Housing Opportunity", src: equalHousingLogo },
];

export const sellPoints = [
  {
    title: "Top Residential Sales Last 5 Years",
    body: [
      "We helped nearly 90 clients in 2021, and closed 28.5 million in sales!",
      "Our team works hard every day to grow and learn, so that we may continue to excel in our market. Our clients deserve our best, & we want to make sure our best is better every year.",
    ],
    image: { src: topSalesImage, alt: "Bright open-plan kitchen with a stone island and pendant lights" },
  },
  {
    title: "Don't Just List it...",
    body: [
      "Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips of every possible buyer, getting you top dollar for your home.",
    ],
    image: { src: listItImage, alt: "Spanish-style home with a lit pool and patio at dusk" },
  },
  {
    title: "Guide to Buyers",
    body: [
      "Nobody knows the market like we do. Enjoy having a pro at your service. Market analysis, upgrade lists, contractors on speed dial, & more!",
    ],
    image: { src: buyersGuideImage, alt: "House keys on a red house-shaped key ring resting on weathered wood" },
  },
];

export const search = {
  propertyTypes: [
    { label: "Any type", phrase: "a home" },
    { label: "Single Family", phrase: "a single-family home" },
    { label: "Condo / Townhome", phrase: "a condo or townhome" },
    { label: "Manufactured", phrase: "a manufactured home" },
    { label: "Land", phrase: "land" },
    { label: "Multi-Family", phrase: "a multi-family property" },
    { label: "Commercial", phrase: "a commercial property" },
  ],
  sortOptions: [
    "Newest",
    "Oldest",
    "Least Expensive to Most",
    "Most Expensive to Least",
    "Bedrooms (Low to High)",
    "Bedrooms (High to Low)",
    "Bathrooms (Low to High)",
    "Bathrooms (High to Low)",
  ],
  bedrooms: ["Any Number", "Studio", "1+", "2+", "3+", "4+", "5+", "6+"],
  baths: ["Any Number", "1+", "2+", "3+", "4+", "5+", "6+"],
  prices: [100_000, 150_000, 200_000, 250_000, 300_000, 400_000, 500_000, 750_000, 1_000_000, 1_500_000, 2_000_000],
};

export const gallery = [
  { src: gallery01, caption: "The clubhouse", alt: "Aerial view of a resort-style clubhouse with pools beside a lake, mountains on the horizon" },
  { src: gallery02, caption: "Sunroom", alt: "Sunroom with a red leather armchair and floor-to-ceiling windows onto a desert garden" },
  { src: gallery03, caption: "Cul-de-sac living", alt: "Aerial view of single-story homes around a cul-de-sac with mountain views" },
  { src: gallery04, caption: "Pool & spa", alt: "Aerial view of a tile-roofed home with a private pool and spa" },
  { src: gallery05, caption: "Courts & center", alt: "Aerial view of a community center with tennis and pickleball courts" },
  { src: gallery06, caption: "Desert landscaping", alt: "Clubhouse and courts surrounded by desert landscaping" },
  { src: gallery07, caption: "On the green", alt: "Homes lining a golf course pond with mountains beyond" },
];

export const marqueeImages = [
  gallery01,
  listItImage,
  gallery05,
  topSalesImage,
  gallery03,
  searchImage,
  doneRightImage,
  gallery07,
  heroImage,
  gallery02,
  gallery04,
  buyersGuideImage,
  gallery06,
  commercialImage,
  listItImage,
  gallery01,
  commercialImage,
  gallery06,
  topSalesImage,
  gallery05,
];

export const menu = [
  { label: "Home", href: "#home", image: heroImage },
  { label: "About Us", href: "#about", image: portraitImage },
  { label: "Get It Sold", href: "#sell", image: topSalesImage },
  { label: "Listings", href: "#listings", image: searchImage },
  { label: "Photo Gallery", href: "#gallery", image: gallery01 },
  { label: "Our Services", href: "#services", image: commercialImage },
  { label: "Let's Move", href: "#contact", image: gallery07 },
];

export const flipWords = ["condo", "mansion", "fixer-upper", "luxury home"];

export const journey = {
  body: "A REALTOR, then licensed Broker, in Washington State, Marci has helped buyers and sellers in many markets since 1995. Today she is enjoying the sunshine and her own Mountain Falls community in Pahrump.",
};

export const services = [
  {
    title: "Real Estate Done Right",
    body: "Nervous about your property adventure? Don't be. Whether you're getting ready to buy or sell your residence, looking at investment properties, or just curious about the markets, our team ensures you get the best experience possible!",
    image: { src: doneRightImage, alt: "Staged living room with a white coffee table, books and a potted succulent" },
  },
  {
    title: "Commercial & Residential",
    body: "Large or small, condo or mansion, we can find it and get it at the price that's right. Fixer-uppers? Luxury? We can help with all of it! We live, work, and play in this community. Happy to help you find where to put your hard-earned dollars.",
    image: { src: commercialImage, alt: "Modern two-story home with a lawn and pool set against green hills" },
  },
  {
    title: "Rely on Expertise",
    body: "If you have questions about affordability, credit, and loan options, trust us to connect you with the right people to get the answers you need in a timely fashion. We make sure you feel confident and educated every step of the way.",
    image: { src: expertiseImage, alt: "Smiling couple shaking hands with an advisor across a laptop" },
  },
];

export const hours = {
  summary: "Open daily 8:00 am – 7:00 pm",
  note: "Appointments outside office hours available upon request. Just call!",
};

export const socials = [
  { name: "Facebook", href: "https://www.facebook.com/MarciHomes/" },
  { name: "Instagram", href: "https://www.instagram.com/marcimetzger_theridge/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/marci-metzger-30642496/" },
  { name: "Yelp", href: "https://www.yelp.com/biz/xr3yQN_m2SgO0R_7S6p62w" },
] as const;

export const cookieNotice = {
  title: "This website uses cookies.",
  body: "We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data.",
};
