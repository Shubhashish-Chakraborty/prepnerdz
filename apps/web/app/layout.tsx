import Script from 'next/script';
import { Saira, Josefin_Sans, Share_Tech } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import BackToTopButton from "../components/ui/BackToTopButton";
import AskNerd from "@/components/ui/AskNerd";
import ConditionalFluidCursor from "@/components/ConditionalCompos/ConditionalFluidCursor";
import ConditionalComingSoon from '@/components/ConditionalCompos/ConditionalComingSoon';

// Root font - default
const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  display: "swap",
});

// Big headings
const specialGothic = localFont({
  src: "../public/fonts/SpecialGothicExpandedOne-Regular.ttf",
  variable: "--font-special-gothic",
  display: "swap",
});

// For Later Use
const shareTech = Share_Tech({
  weight: "400",
  variable: "--font-myfont2",
  subsets: ["latin"],
  display: "swap",
});

const josefinSans = Josefin_Sans({
  variable: "--font-myfont3",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://prepnerdz.tech"), // deployed domain
  title:
    "PrepNerdz – Fueling Your Academic Success | Your Central Hub for RGPV B.Tech Resources",
  description:
    "PrepNerdz is a organized platform providing Previous year papers (RGPV) , Best notes, lab manuals etc.., all in one place",
  keywords: [
    // Brand Variants
    "prepnerdz",
    "PrepNerdz",
    "PREPNERDZ",
    "Prep Nerdz",
    "prep nerdz",
    "prepnerdz tech",
    "PrepNerds",
    "Prep Nerds",
    "prepnerds",
    "PREPNERDS",

    // Educational Intent
    "RGPV",
    "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
    "RGPV notes",
    "RGPV syllabus",
    "RGPV students",
    "BTECH",
    "btech",
    "Bachelor of Technology",
    "BTech resources",
    "Engineering students",
    "CS students",

    // Services & Offerings
    "Student platform",
    "College resources",
    "Lecture notes",
    "Code tutorials",
    "Tech blog",
    "Study platform",
    "RGPV study material",
    "Tech education platform",

    // SEO-friendly Tech Tags
    "Tech startup India",
    "Tech company in India",
    "Indian edtech startup",
    "EdTech India",
    "Engineering help India",
    "Online learning for engineers",
    "RGPV study help",
    "Top BTech platform",
  ],
  openGraph: {
    title: "PrepNerdz",
    description:
      "PrepNerdz is a organized platform providing Previous year papers (RGPV) , Best notes, lab manuals etc.., all in one place",
    url: "https://prepnerdz.tech",
    siteName: "PrepNerdz",
    images: [
      {
        url: "/prepnerdz-only-specs.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrepNerdz",
    description:
      "PrepNerdz is a organized platform providing Previous year papers (RGPV) , Best notes, lab manuals etc.., all in one place",
    images: ["/prepnerdz-only-specs.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "google-site-verification": "pbq2rU_s7burZieDaz5NbKU-YLZvO-qj0eTNWOYNlqs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-8097731478229459"></meta>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8097731478229459"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${saira.variable} ${specialGothic.variable} ${shareTech.variable} ${josefinSans.variable} font-saira antialiased`}
      >
     
   
        {children}
        <AskNerd />
        <BackToTopButton />
        <Toaster
          position="top-center"
          containerStyle={{
            zIndex: 999999, // Higher than your modal's z-index
          }}
          toastOptions={{
            style: {
              background: "#363636",
              color: "#fff",
              zIndex: 999999,
            },
          }}
        />
      </body>
    </html>
  );
}