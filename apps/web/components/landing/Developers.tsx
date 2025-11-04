"use client";

import React from "react";
import { FaArrowRight, FaXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";

// ------------------
// Type Definitions
// ------------------
type DeveloperCard = {
  type: "image" | "cta";
  imgUrl?: string;
  bgColor: string;
  rounded: "full" | "rounded-[40px]";
  xUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
};

// ------------------
// Developer Data
// ------------------
const developerData: DeveloperCard[] = [
  {
    type: "image",
    imgUrl:
      "https://www.prepnerdz.tech/_next/image?url=%2Ffounders%2Fmoksh.png&w=640&q=75",
    bgColor: "#4EA27F",
    rounded: "full",
    xUrl: "https://x.com/moksh",
    linkedinUrl: "https://linkedin.com/in/moksh",
    githubUrl: "https://github.com/moksh",
  },
  {
    type: "image",
    imgUrl:
      "https://www.prepnerdz.tech/_next/image?url=%2Ffounders%2Fnihal.png&w=640&q=75",
    bgColor: "#F7FD8E",
    rounded: "rounded-[40px]",
    xUrl: "https://x.com/nihal",
    linkedinUrl: "https://linkedin.com/in/nihal",
    githubUrl: "https://github.com/nihal",
  },
  {
    type: "cta",
    bgColor: "#82F97C",
    rounded: "full",
  },
  {
    type: "image",
    imgUrl:
      "https://www.prepnerdz.tech/_next/image?url=%2Ffounders%2Fshubh.png&w=640&q=75",
    bgColor: "#ACA0F8",
    rounded: "rounded-[40px]",
    xUrl: "https://x.com/shubh",
    linkedinUrl: "https://linkedin.com/in/shubh",
    githubUrl: "https://github.com/shubh",
  },
  {
    type: "image",
    imgUrl:
      "https://pbs.twimg.com/profile_images/1933222335932477441/2UeTXJXZ_400x400.jpg",
    bgColor: "#82F97C",
    rounded: "full",
    xUrl: "https://x.com/ajinkya",
    linkedinUrl: "https://linkedin.com/in/ajinkya",
    githubUrl: "https://github.com/ajinkya",
  },
];

// ------------------
// Component
// ------------------
export default function DeveloperShowcase() {
  return (
    <div className="flex flex-col items-center w-full">
      <h1
        style={{ fontFamily: "PPEditorialNew" }}
        className="text-[380px] font-bold text-[#0F1916] leading-none"
      >
        Developers
      </h1>

      <div className="flex justify-center items-center w-full p-5 mt-16">
        {developerData.map((dev, index) => {
          const commonClasses = `relative w-[20%] h-[8cm] border-4 border-black/20 overflow-hidden ${
            dev.rounded === "full" ? "rounded-full" : dev.rounded
          }`;

          // ------------------
          // IMAGE CARD
          // ------------------
          if (dev.type === "image" && dev.imgUrl) {
            return (
              <div
                key={index}
                className={`${commonClasses} group`}
                style={{ backgroundColor: dev.bgColor }}
              >
                <img
                  src={dev.imgUrl}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center gap-5">
                  {dev.xUrl && (
                    <a
                      href={dev.xUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300 text-3xl"
                    >
                      <FaXTwitter />
                    </a>
                  )}
                  {dev.linkedinUrl && (
                    <a
                      href={dev.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300 text-3xl"
                    >
                      <FaLinkedinIn />
                    </a>
                  )}
                  {dev.githubUrl && (
                    <a
                      href={dev.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-300 text-3xl"
                    >
                      <FaGithub />
                    </a>
                  )}
                </div>
              </div>
            );
          }

          // ------------------
          // CTA CARD
          // ------------------
          if (dev.type === "cta") {
            return (
              <div
                key={index}
                style={{ backgroundColor: dev.bgColor, fontFamily: "PPEditorialNew" }}
                className={`bg-[#82F97C] ${commonClasses} flex flex-col justify-center items-center text-[#0F1916] `}
              >
                <h1 className="text-4xl text-center">You Can Become</h1>
                <h1 className="text-4xl text-center">One Of Us</h1>
                <span className="px-5 py-5 bg-white text-[#53A825] rotate-[-20deg] rounded-full mt-5">
                  <FaArrowRight />
                </span>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
