"use client";
import React from "react";
import { FaSearch } from "react-icons/fa";

// Type definitions
type HeroData = {
  tag: string;
  headingLines: string[];
  subtext: string;
  ctaButtons: {
    main: string;
    searchPlaceholder: string;
  };
};

// Dynamic content object
const heroData: HeroData = {
  tag: "notes / papers / study materials",
  headingLines: [
    "Find Study Resources Instantly",
    "From Verified Contributors",
  ],
  subtext:
    "No more 'Does anyone have...?' messages. No more dead-end Google searches. Just the right academic resources, exactly when you need them.",
  ctaButtons: {
    main: "Get Started — For Free!",
    searchPlaceholder: "Search Notes And Resources",
  },
};

export default function HeroTitle() {
  return (
    <div className="mt-10">
      {/* Category Tag */}
      <div className="w-full flex justify-center items-center">
        <h1 className="uppercase py-1 px-4 border-2 border-white text-white text-[12px] rounded-4xl font-medium bg-white/10 backdrop-blur-md shadow-lg">
          {heroData.tag}
        </h1>
      </div>

      {/* Main Headings */}
      <div  style={{ fontFamily: "PPEditorialNew" }} className="w-full flex flex-col justify-center items-center font-medium mt-5 space-y-3 text-center">
        <h1 className="text-5xl md:text-8xl text-[#0F1916]">
          <span className="text-inherit">Find</span>{" "}
          <span className="text-inherit">Study</span>{" "}
          <span className="text-inherit">Resources</span> Instantly
        </h1>
        <h1  className="text-5xl md:text-8xl text-[#0F1916]">
          From Verified <span className="text-inherit">Contributors</span>
        </h1>
      </div>

      {/* Subtext */}
      <div className="w-full flex justify-center items-center mt-10">
        <h2 className="w-[20cm] text-center text-md text-[#0F1916] font-medium">
          {heroData.subtext}
        </h2>
      </div>

      {/* CTA Buttons */}
      <div className="w-full flex justify-center items-center text-lg gap-5 mt-10">
        <button   className="bg-[#0F1916] text-white rounded-full p-3 px-10 font-medium ">
          {heroData.ctaButtons.main}
        </button>
        <div style={{ fontFamily: "PPEditorialNew" }} className="border-[1.9px] rounded-full px-4 py-2 flex justify-center items-center gap-2 italic text-white bg-white/10 backdrop-blur-md shadow-lg">
          <input
            className="outline-none w-[7cm] bg-transparent placeholder:text-white text-white"
            type="text"
            placeholder={heroData.ctaButtons.searchPlaceholder}
          />
          <FaSearch />
        </div>
      </div>
    </div>
  );
}
