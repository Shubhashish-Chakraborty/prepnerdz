import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prepnerdz!!",
  description: "Developer: Shubhashish Chakraborty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-center"
          containerStyle={{
            zIndex: 999999 // Higher than your modal's z-index
          }}
          toastOptions={{
            style: {
              background: '#363636',
              color: '#fff',
              zIndex: 999999
            },
          }}
        />
      </body>
    </html>
  );
}
