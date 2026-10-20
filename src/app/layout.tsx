import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { COMPANY } from "@/config/company";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EnquiryProvider } from "@/context/EnquiryContext";
import { EnquiryModal } from "@/components/forms/EnquiryModal";

const cormorant = Cormorant_Garamond({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#111C30",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.siteUrl),
  title: {
    default: "Anvard Global Pvt. Ltd. | Business Consultancy & Advisory",
    template: "%s | Anvard Global Pvt. Ltd.",
  },
  description:
    "Explore business consultancy and advisory services at Anvard Global Private Limited, Delhi. Discover practical approaches to business strategy, operations, and growth.",
  keywords: [
    "Anvard Global",
    "Anvard Global Private Limited",
    "Business Consultancy Delhi",
    "Business Advisory India",
    "Business Strategy Consulting",
    "Operations Consulting Delhi",
    "Corporate Growth Opportunities",
    "Ankit Sharma Director",
    "Najafgarh Delhi Corporate Advisory",
  ],
  authors: [{ name: "Anvard Global Private Limited" }],
  creator: "Anvard Global Private Limited",
  publisher: "Anvard Global Private Limited",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: COMPANY.siteUrl,
    siteName: COMPANY.legalName,
    title: "Anvard Global Pvt. Ltd. | Business Consultancy & Advisory",
    description:
      "Explore business consultancy and advisory services at Anvard Global Private Limited, Delhi. Practical approaches to business strategy, operations, and growth.",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anvard Global Private Limited Corporate Identity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anvard Global Pvt. Ltd. | Business Consultancy & Advisory",
    description:
      "Practical business solutions designed to help organizations navigate challenges, strengthen operations, and pursue sustainable growth.",
    images: ["/brand/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${COMPANY.siteUrl}/#organization`,
        name: COMPANY.legalName,
        alternateName: COMPANY.displayName,
        legalName: COMPANY.legalName,
        url: COMPANY.siteUrl,
        logo: `${COMPANY.siteUrl}/brand/logo-light-bg.png`,
        image: `${COMPANY.siteUrl}/brand/og-image.png`,
        telephone: COMPANY.phone,
        email: COMPANY.email,
        description:
          "Indian business consultancy and advisory company providing business strategy, operations consulting, and growth advisory.",
        taxID: COMPANY.cin,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${COMPANY.address.line1}, ${COMPANY.address.line2}`,
          addressLocality: COMPANY.address.locality,
          addressRegion: COMPANY.address.state,
          postalCode: COMPANY.address.postalCode,
          addressCountry: "IN",
        },
        founder: {
          "@type": "Person",
          name: COMPANY.director,
          jobTitle: "Director",
        },
        knowsAbout: [
          "Business Strategy",
          "Operations Consulting",
          "Business Advisory",
          "Organizational Growth",
        ],
        slogan: "Integrity • Innovation • Growth • Excellence",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-navy-950 font-sans selection:bg-gold-500 selection:text-navy-950">
        <EnquiryProvider>
          <Navbar />
          {children}
          <Footer />
          <EnquiryModal />
        </EnquiryProvider>
      </body>
    </html>
  );
}
