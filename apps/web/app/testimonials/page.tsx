import { TestimonialPage } from "@/components/pages/Testimonial";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Student Testimonials | PrepNerdz - Real Experiences",
  description:
    "Hear from students who transformed their learning with PrepNerdz. Read authentic testimonials about our BTech education platform.",
  keywords: [
    "PrepNerdz testimonials",
    "student reviews",
    "BTech platform feedback",
    "engineering student experiences",
    "PrepNerdz success stories",
    "RGPV student testimonials",
    "education platform reviews",
    "PrepNerdz user feedback",
  ],
  openGraph: {
    title: "Student Testimonials | PrepNerdz",
    description:
      "Real stories from students who achieved academic success with PrepNerdz learning resources.",
    url: "https://prepnerdz.tech/testimonials",
    siteName: "PrepNerdz",
    images: [
      {
        url: "/prepnerdz-only-specs.png",
        width: 1200,
        height: 630,
        alt: "PrepNerdz Student Testimonials",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Student Testimonials | PrepNerdz",
    description:
      "See what students say about their PrepNerdz learning experience",
    images: ["/prepnerdz-only-specs.png"],
  },
  alternates: {
    canonical: "https://prepnerdz.tech/testimonials",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TestimonialPageSeparate() {
  return <TestimonialPage />;
}
