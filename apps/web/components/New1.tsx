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

export default function HeroSectionPrepNerdz() {
  return (
    <div className="mt-10">
      {/* Category Tag */}
      <div className="w-full flex justify-center items-center">
        <h1 className="uppercase py-1 px-4 border-2 border-white text-white text-[12px] rounded-4xl font-medium  bg-white/10  backdrop-blur-md shadow-lg  ">
          <span className="">notes</span> / papers / study
          materials
        </h1>
      </div>

      {/* Main Headings */}
      <div className="w-full flex flex-col justify-center items-center font-medium mt-5 space-y-3 text-center ">
        <h1 className="text-5xl md:text-7xl  text-[#1B1B1B] ">
          <h1 className="">
            <span className="text-[]">Find</span>{" "}
            <span className="text-[]"> Study</span>
            <span className="text-[]">Resources</span> Instantly
          </h1>
          <h1 className="">
            From Verified <span className="text-[]  ">Contributors</span>
          </h1>
        </h1>
      </div>

      {/* Subtext */}
      <div className="w-full flex justify-center items-center mt-10">
        <h1 className="w-[18cm] text-center text-lg text-[#1B1B1B]  font-medium ">
          {heroData.subtext}
        </h1>
      </div>

      {/* CTA Buttons */}
      <div className="w-full flex justify-center items-center text-lg gap-5 mt-10">
        <button className="bg-[#1B1B1B] text-white rounded-full p-3 px-10 font-medium">
          {heroData.ctaButtons.main}
        </button>
        <button className="border-[1.9px] rounded-full px-10 p-3 flex justify-center items-center gap-2 italic text-white  placeholder:text-white  bg-white/10 backdrop-blur-md shadow-lg   ">
          <input
            className="outline-none w-[7cm] bg-transparent"
            type="text"
            placeholder={heroData.ctaButtons.searchPlaceholder}
          />
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
