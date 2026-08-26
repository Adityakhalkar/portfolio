import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import React from "react";
import SmoothScroll from "../components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import LightbulbAnimation from "@/components/toggle";

const SITE = "https://www.adityakhalkar.me";
const TITLE = "Aditya Khalkar | Freelance Full-Stack Developer & Design Engineer";
const DESCRIPTION =
  "Freelance full-stack developer and design engineer. I design the interface, build the front end, and ship the backend behind it. React, Next.js, Node and Python. Available for contract work, based in India.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s | Aditya Khalkar" },
  description: DESCRIPTION,
  applicationName: "Aditya Khalkar",
  authors: [{ name: "Aditya Khalkar", url: SITE }],
  creator: "Aditya Khalkar",
  publisher: "Aditya Khalkar",
  keywords: [
    "freelance full stack developer",
    "hire full stack developer",
    "freelance design engineer",
    "freelance web designer",
    "Node.js developer for hire",
    "API and backend developer freelance",
    "hire Next.js developer",
    "React developer for hire",
    "GSAP animation developer",
    "landing page designer and developer",
    "product UI designer",
    "web design freelancer India",
    "full stack developer India",
    "design engineer India",
    "Aditya Khalkar",
  ],
  alternates: { canonical: SITE },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Aditya Khalkar",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@adityakhalkar_",
    creator: "@adityakhalkar_",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

/* Structured data. Search engines use it for rich results; answer engines
   lean on it much harder, since it is the only part of the page that states
   plainly what I do, where, and how to reach me. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: "Aditya Khalkar",
      url: SITE,
      email: "mailto:khalkaraditya8@gmail.com",
      jobTitle: "Freelance Full-Stack Developer and Design Engineer",
      description: DESCRIPTION,
      address: { "@type": "PostalAddress", addressCountry: "IN" },
      knowsAbout: [
        "Web design",
        "Design engineering",
        "Full-stack development",
        "Backend development",
        "API design",
        "React",
        "Next.js",
        "Node.js",
        "Python",
        "PostgreSQL",
        "TypeScript",
        "GSAP",
        "Web animation",
        "User interface design",
        "Landing page design",
        "Machine learning education",
      ],
      sameAs: [
        "https://x.com/adityakhalkar_",
        "https://github.com/adityakhalkar",
        "https://www.linkedin.com/in/aditya-khalkar-dsai",
      ],
      worksFor: {
        "@type": "Organization",
        name: "Deep-ML",
        url: "https://deep-ml.com",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#service`,
      name: "Aditya Khalkar - Freelance Full-Stack Development and Design Engineering",
      url: SITE,
      description:
        "Freelance full-stack development and web design. Landing pages, product interfaces, APIs and the backend behind them, designed and built end to end by one person.",
      provider: { "@id": `${SITE}/#person` },
      areaServed: { "@type": "Place", name: "Worldwide" },
      priceRange: "$1800-$8000",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Freelance packages",
        itemListElement: [
          ["Landing page, designed and built", "2500"],
          ["Full-stack application, designed and built end to end", "8000"],
          ["Website and design system, four pages", "5000"],
          ["UI audit and fixes on an existing product", "1800"],
          ["Agent workflow setup for an engineering team", "3000"],
        ].map(([name, price]) => ({
          "@type": "Offer",
          priceCurrency: "USD",
          price,
          itemOffered: { "@type": "Service", name },
        })),
      },
      availableLanguage: ["English", "Hindi", "Marathi"],
      serviceType: [
        "Web design",
        "Front-end development",
        "Full-stack web application development",
        "Backend and API development",
        "Landing page design and development",
        "Product UI design",
        "Web animation and motion design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Aditya Khalkar",
      description: DESCRIPTION,
      publisher: { "@id": `${SITE}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {/* Space Mono, DM Sans, Instrument Serif and IBM Plex Sans were loaded
            but never referenced anywhere in the app. Weights trimmed to the
            ones actually used. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@600;700&family=Manrope:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-background text-foreground selection:bg-accent selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          <SmoothScroll />
          <CustomCursor />
          <GrainOverlay />
          <LightbulbAnimation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
