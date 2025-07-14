"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

// ------------------
// Types
// ------------------
type FeatureKey =
  | "Coupous"
  | "Polls"
  | "Question & Answers"
  | "Product Cards"
  | "Pins"
  | "Comments";

type FeatureData = {
  heading: string;
  description: string;
};

type FeatureSectionProps = {
  features: Record<FeatureKey, FeatureData>;
  titleLines: string[];
};

const FeatureSection: React.FC<FeatureSectionProps> = ({ features, titleLines }) => {
  const featureKeys = Object.keys(features) as FeatureKey[];
  const [selected, setSelected] = useState<FeatureKey>(featureKeys[0]);

  return (
    <div className="w-full bg-[#FED2F1] min-h-screen pt-28 text-[#111111]">
      {/* Heading */}
      <div className="w-full flex flex-col justify-center items-center font-medium space-y-3 text-center">
        {titleLines.map((line, i) => (
          <h1 key={i} className="text-5xl md:text-7xl">
            {line}
          </h1>
        ))}
      </div>

      {/* Feature Selectors */}
      <div className="w-full flex justify-center items-center gap-3 mt-20 flex-wrap px-4">
        {featureKeys.map((feature) => (
          <h1
            key={feature}
            onClick={() => setSelected(feature)}
            className={`uppercase cursor-pointer py-2 px-5 text-md rounded-4xl font-medium ${
              selected === feature ? "bg-white" : "border-2 border-[#111111]"
            }`}
          >
            {feature}
          </h1>
        ))}
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col md:flex-row mt-20 px-4 md:px-20">
        {/* Left Side: Placeholder for image or visual */}
        <div className="w-full md:w-1/2 h-[11cm] flex justify-center items-center">
          {/* You can add an image here */}
          <div className="w-[80%] h-[80%] bg-white border-2 border-[#111111] rounded-2xl flex justify-center items-center text-2xl text-gray-400">
            Image or Animation
          </div>
        </div>

        {/* Right Side: Text + Buttons */}
        <div className="w-full md:w-1/2 h-full p-6 md:p-20">
          <h1 className="text-3xl md:text-4xl font-semibold">
            {features[selected].heading}
          </h1>
          <p className="max-w-[10cm] mt-4 text-gray-600">
            {features[selected].description}
          </p>

          {/* CTA Buttons */}
          <div className="w-full flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 font-bold mt-10">
            <div className="flex bg-[#111111] text-white px-6 py-3 rounded-full italic font-light gap-2 items-center">
              <input
                className="bg-transparent outline-none placeholder-white text-white w-36"
                type="text"
                placeholder="Search Notes"
              />
              <FaSearch />
            </div>
            <button className="px-8 py-3 bg-white text-md rounded-full border border-[#111111]">
              Get Started — For Free!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------------
// Example Usage
// ------------------
export default function DynamicFeatureSection() {
  const features: Record<FeatureKey, FeatureData> = {
    Coupous: {
      heading: "Save Big with Exclusive Coupons!",
      description:
        "Find and share exclusive student discount codes and coupons for study materials, software, and more.",
    },
    Polls: {
      heading: "Engage Students with Polls",
      description:
        "Create quick polls to understand what resources students need most — and deliver effectively.",
    },
    "Question & Answers": {
      heading: "Solve Doubts Instantly",
      description:
        "Ask and answer academic questions to build a peer-supported knowledge base for your semester.",
    },
    "Product Cards": {
      heading: "Showcase Your Academic Tools",
      description:
        "Highlight top-rated study kits, guides, and more in a clean product card layout.",
    },
    Pins: {
      heading: "Pin Resources for Later",
      description:
        "Bookmark important notes and papers — so you never lose track of what matters.",
    },
    Comments: {
      heading: "Community-Driven Comments",
      description:
        "Leave feedback or additional tips on study materials. Learn from your peers!",
    },
  };

  const titleLines = ["Drive Higher Click Rates With", "Awesome Features"];

  return <FeatureSection features={features} titleLines={titleLines} />;
}
