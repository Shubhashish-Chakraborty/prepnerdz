import { ReactNode } from "react";
import { AboutLanding } from "@/components/pages/About";

export const metadata = {
  title: "About PrepNerdz - Know our initiative",
  description:
    "Learn more about PrepNerdz — a tech-driven platform built by engineers to support BTech students of RGPV with resources, and mentorship.",
  keywords: [
    "PrepNerdz",
    "prepnerdz",
    "About PrepNerdz",
    "PrepNerdz Team",
    "PrepNerdz Founders",
    "Tech startup India",
    "Student startup India",
    "EdTech India",
    "BTech platform",
    "Engineering student support",
    "RGPV community",
    "Who is PrepNerdz",
    "Startup story",
    "Indian edtech startup",
    "RGPV platform",
    "BTech education tools",
    "Student-led startup",
  ],
  openGraph: {
    title: "About PrepNerdz",
    description:
      "Get to know the mission, team, and journey behind PrepNerdz — built by engineers for engineers.",
    url: "https://prepnerdz.tech/about",
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
    title: "About | PrepNerdz",
    description:
      "Discover who we are and why we built PrepNerdz for BTech students in India, We're here to assist BTech students, educators, and tech enthusiasts.",
    images: ["/prepnerdz-only-specs.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function AboutPage() {
  return <AboutLanding />;
}
