import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const title = "Marci Metzger | Pahrump Realtor · The Ridge Realty Group";
const description =
  "Marci Metzger of The Ridge Realty Group has been a Realtor for nearly three decades. Buy, sell or invest in Pahrump and Southern Nevada.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Marci Metzger Homes",
    images: [{ url: "/images/hero-mountain-falls.jpg", width: 2560, height: 1700, alt: "Mountain Falls, Pahrump" }],
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0a1422",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-[3px] bg-night px-4 py-3 text-sm font-semibold text-snow focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
