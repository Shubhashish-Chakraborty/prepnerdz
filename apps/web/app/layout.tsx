import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import BackToTopButton from "../components/ui/BackToTopButton";
import AskNerd from "@/components/ui/AskNerd";
import GssocBanner from "@/components/ui/GssocBanner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // You can adjust weights as needed
});

export const metadata = {
  metadataBase: new URL("https://prepnerdz.tech"),
  title:
    "PrepNerdz – Fueling Your Academic Success | Your Central Hub for RGPV B.Tech Resources",
  description:
    "PrepNerdz is a organized platform providing Previous year papers (RGPV) , Best notes, lab manuals etc.., all in one place",
  keywords: [
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
    "Student platform",
    "College resources",
    "Lecture notes",
    "Code tutorials",
    "Tech blog",
    "Study platform",
    "RGPV study material",
    "Tech education platform",
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
      <body className={`${montserrat.variable} antialiased`}>
        <GssocBanner />
        {children}
        <AskNerd />
        <BackToTopButton />
        <Toaster
          position="top-center"
          containerStyle={{
            zIndex: 999999,
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
