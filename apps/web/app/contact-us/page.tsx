// app/contact-us/page.tsx
import { ContactLanding } from "@/components/pages/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact PrepNerdz - Get in Touch with Our Team",
  description:
    "Need help or want to collaborate? Reach out to PrepNerdz for support, partnerships, queries, and more.",
  keywords: [
    "PrepNerdz contact",
    "Contact PrepNerdz",
    "Get in touch with PrepNerdz",
    "PrepNerdz support",
    "Email PrepNerdz",
    "Contact tech startup India",
    "Reach out PrepNerdz",
    "BTech help",
    "Student support platform",
    "PrepNerdz India",
    "EdTech contact",
    "Web development query",
    "Student platform contact",
    "RGPV help desk",
    "Startup India contact",
  ],
  openGraph: {
    title: "Contact Us | PrepNerdz",
    description:
      "Have a question, suggestion, or collaboration idea? Contact the PrepNerdz team — we're here to support students and educators.",
    url: "https://prepnerdz.tech/contact-us",
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
    title: "Contact | PrepNerdz",
    description:
      "Reach out to the team behind PrepNerdz — Let us know what you need help with.",
    images: ["/prepnerdz-only-specs.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function ContactUsPage() {
  return <ContactLanding />;
}
