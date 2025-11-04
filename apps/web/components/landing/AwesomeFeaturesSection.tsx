"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

// ------------------
// Types
// ------------------
type FeatureKey =
  | "Coupons"
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

const AwesomeFeatures: React.FC<FeatureSectionProps> = ({
  features,
  titleLines,
}) => {
  const featureKeys = Object.keys(features) as FeatureKey[];
  const [selected, setSelected] = useState<FeatureKey>(featureKeys[0]);
  const [search, setSearch] = useState("");

  return (
    <div className="w-full bg-[#FED2F1] min-h-screen pt-28 text-[#0F1916]">
      {/* Heading */}
      <div className="w-full flex flex-col justify-center items-center font-medium space-y-3 text-center px-4">
        {titleLines.map((line, i) => (
          <h1
            style={{ fontFamily: "PPEditorialNew" }}
            key={i}
            className="text-4xl md:text-6xl lg:text-8xl leading-tight"
          >
            {line}
          </h1>
        ))}
      </div>

      {/* Feature Selectors */}
      <div className="w-full flex justify-center items-center gap-3 mt-10 flex-wrap px-4">
        {featureKeys.map((feature) => (
          <button
            key={feature}
            onClick={() => setSelected(feature)}
            aria-pressed={selected === feature}
            className={`uppercase cursor-pointer py-2 px-5 text-sm rounded-3xl font-medium transition-shadow duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              selected === feature
                ? "bg-white shadow"
                : "border-2 border-[#0F1916] bg-transparent"
            }`}
          >
            {feature}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="w-full flex flex-col md:flex-row mt-12 md:mt-20 px-4 md:px-20 gap-6 md:gap-0">
        {/* Left Side: Image/visual */}
        <div className="w-full md:w-1/2 h-[11cm]  flex justify-center items-center">
          <div className="relative w-[80%] h-[80%] bg-white border-2 border-[#0F1916] rounded-2xl overflow-hidden">
            <Image
              src="/img4.png"
              alt="PrepNerdz feature banner"
              fill
              className=""
              priority
            />
          </div>
        </div>

        {/* Right Side: Text + Buttons */}
        <div className="w-full md:w-1/2 h-full p-6 md:p-20 flex flex-col justify-start">
          <h2
            style={{ fontFamily: "PPEditorialNew" }}
            className="text-2xl md:text-4xl lg:text-5xl font-semibold"
          >
            {features[selected].heading}
          </h2>

          <p className="max-w-[40ch] mt-4 text-gray-600">
            {features[selected].description}
          </p>

          {/* CTA Buttons + Search */}
          <div className="w-full flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 font-bold mt-10">
            <div className="flex bg-[#0F1916] text-white px-4 py-2 rounded-full italic font-light gap-2 items-center">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none placeholder-white text-white w-40 md:w-56"
                type="text"
                placeholder="Search Notes"
                aria-label="Search notes"
              />
              <FaSearch />
            </div>

            <button className="px-6 py-3 bg-white text-md rounded-full border border-[#0F1916] hover:shadow">
              Get Started — For Free!
            </button>
          </div>

          {/* Optional small note */}
          <span className="mt-4 text-sm text-gray-500">
            Tip: click the feature pills above to switch content.
          </span>
        </div>
      </div>
    </div>
  );
};

// ------------------
// Example Usage
// ------------------
export default function AwesomeFeaturesSection() {
  const features: Record<FeatureKey, FeatureData> = {
    Coupons: {
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

  return <AwesomeFeatures features={features} titleLines={titleLines} />;
}
