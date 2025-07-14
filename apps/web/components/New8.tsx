"use client";
import React from "react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

type FooterLinkSection = {
  heading: string;
  links: (string | { type: "image"; src: string; alt?: string })[];
};

const footerSections: FooterLinkSection[] = [
  {
    heading: "Company",
    links: ["About Us", "Case Studies", "Blogs", "Book a Demo"],
  },
  {
    heading: "Resources",
    links: [
      "Integrations",
      "Blog",
      "Become a Partner",
      "Partners Directory",
      "Demo store",
    ],
  },
  {
    heading: "Product",
    links: [
      "On-store Shoppable Videos",
      "Interactive & Quiz Videos",
      "Video Marketing",
      "Live stream shopping",
      {
        type: "image",
        src: "https://cdn.shopify.com/shopifycloud/web/assets/v1/app-store-badge.3b85c6bd.svg",
      },
    ],
  },
];

const socialIcons = [
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
];

export default function Footer() {
  return (
    <footer className="bg-white text-[#111111] w-full">
      <div className="p-16">
        {/* CTA Section */}
        <div className="bg-[#111111] rounded-[40px] p-16 flex flex-col md:flex-row justify-between items-center text-white mb-16 h-[7cm]">
          <h2 className="text-5xl font-medium mb-4 w-[20cm]">
            Ready to improve your <br className="md:hidden" />
            sales & conversions
          </h2>
          <div className="flex gap-4 text-lg">
            <button className="bg-white text-[#111111] rounded-full px-6 py-2 font-medium">
              Book Demo
            </button>
            <button className="bg-[#82F97C] text-[#111111] rounded-full px-6 py-2 font-medium">
              Try Reelup — For Free!
            </button>
          </div>
        </div>

        {/* Main Footer Sections */}
        <div className="flex justify-between items-start gap-8 text-3xl text-gray-700 flex-wrap">
          {footerSections.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold mb-2 text-[#111111]">{section.heading}</h4>
              <ul className="space-y-1 text-lg">
                {section.links.map((item, i) =>
                  typeof item === "string" ? (
                    <li key={i}>{item}</li>
                  ) : (
                    <li key={i}>
                      <img
                        src={item.src}
                        alt={item.alt || "app badge"}
                        className="mt-2 w-32"
                      />
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Logo & Socials */}
        <div className="mt-20 text-[#111111]">
          <div className="flex justify-start items-center gap-10">
            <img
              src="https://www.prepnerdz.tech/_next/image?url=%2Fprepnerdz-logo-zoomed.png&w=384&q=75"
              alt="PrepNerdz Logo"
              className="w-28"
            />
            <div className="flex gap-3 text-2xl">
              {socialIcons.map((Icon, idx) => (
                <Icon key={idx} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-md text-gray-500 mt-10 border-t">
          <div className="w-full flex flex-col md:flex-row justify-between items-center mt-5 gap-4">
            <h1>© 2025 Prepnerdz.Tech – All rights reserved.</h1>
            <div className="flex justify-center items-center gap-10">
              <a href="#">Privacy Policy</a>
              <a href="#">Security</a>
              <a href="#">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
