import type { Metadata } from "next";
import { DashboardLanding } from "@/components/pages/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard | PrepNerdz Student Platform",
  description:
    "Access your personalized dashboard to explore tools, resources, and insights tailored for BTech students.",
  keywords: [
    "PrepNerdz Dashboard",
    "Student Dashboard",
    "BTech platform",
    "Personalized student tools",
    "Learning dashboard",
    "PrepNerdz student portal",
  ],
  openGraph: {
    title: "PrepNerdz Dashboard",
    description:
      "Manage your tools and content with the personalized PrepNerdz dashboard built for students.",
    url: "https://prepnerdz.tech/dashboard",
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
    title: "PrepNerdz Dashboard",
    description:
      "Your student dashboard for open source tools, notes, and more.",
    images: ["/prepnerdz-only-specs.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function DashboardPage() {
  return <DashboardLanding />;
}
