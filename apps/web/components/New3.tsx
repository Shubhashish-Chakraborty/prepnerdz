"use client";
import React from "react";

// ------------------
// Type Definitions
// ------------------
type FeatureCard = {
  id: number;
  backgroundColor: string;
  height: string;
  tag: string;
  titleLines: string[];
  description: string;
  imageUrl: string; // Dynamic image field
};

type PrepNerdzFeatureSectionProps = {
  tagline: string;
  mainHeadingLines: string[];
  features: FeatureCard[];
};

// ------------------
// Component
// ------------------
const PrepNerdzFeatureSection: React.FC<PrepNerdzFeatureSectionProps> = ({
  tagline,
  mainHeadingLines,
  features,
}) => {
  return (
    <div className="w-full flex justify-center items-center flex-col text-[#111111] p-3">
      {/* Header Tag */}
      <div className="w-full flex justify-center items-center">
        <h1 className="uppercase py-1 px-4 border-2 border-[#111111] text-[12px] rounded-4xl font-medium">
          {tagline}
        </h1>
      </div>

      {/* Main Headings */}
      <div className="w-full flex flex-col justify-center items-center font-medium mt-5 space-y-3 text-center">
        {mainHeadingLines.map((line, i) => (
          <h1 key={i} className="text-5xl md:text-7xl">
            {line}
          </h1>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="w-full flex flex-col justify-center items-center mt-20 gap-3">
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={feature.id}
              className={`${feature.backgroundColor} w-full ${feature.height} rounded-[40px] p-10`}
            >
              <div className="w-full h-full flex flex-col md:flex-row mt-10">
                {/* Image Section */}
                <div
                  className={`w-full md:w-1/2 h-[14cm] flex justify-center items-center p-10 ${
                    isEven ? "" : "md:order-2"
                  }`}
                >
                  <div className="bg-white h-full w-full rounded-[30px] overflow-hidden">
                    <img
                      src={feature.imageUrl}
                      alt="feature"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Text Section */}
                <div
                  className={`w-full md:w-1/2 h-[15cm] p-10 md:p-20 flex flex-col justify-center ${
                    isEven ? "" : "md:order-1"
                  }`}
                >
                  <div className="w-full flex justify-start items-center">
                    <h1 className="uppercase py-1 px-4 border-2 border-[#111111] text-[12px] rounded-4xl font-medium">
                      {feature.tag}
                    </h1>
                  </div>
                  <div className="text-5xl md:text-7xl mt-10 space-y-1">
                    {feature.titleLines.map((line, i) => (
                      <h1 key={i}>{line}</h1>
                    ))}
                  </div>
                  <p className="w-[10cm] mt-10 text-xl text-gray-800 font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ------------------
// Default Export with Data
// ------------------
const featureSectionData: PrepNerdzFeatureSectionProps = {
  tagline: "study smarter with prepnerdz",
  mainHeadingLines: ["Over 1 Billion Students Helped", "And Counting"],
  features: [
    {
      id: 1,
      backgroundColor: "bg-[#4EA27F]",
      height: "h-[90vh]",
      tag: "features",
      titleLines: ["Comprehensive", "Study Resources"],
      description:
        "Access previous year RGPV papers, Shivani books, lab manuals, important questions, and much more — all curated and organized in one place.",
      imageUrl:
        "https://images.unsplash.com/photo-1581090700227-1e8a7b1b9297?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: 2,
      backgroundColor: "bg-[#F7FD8E]",
      height: "h-[90vh]",
      tag: "features",
      titleLines: ["Verified", "by Experts"],
      description:
        "All content is verified by top students and faculty members. PrepNerdz ensures only high-quality academic materials reach you.",
      imageUrl:
        "https://images.unsplash.com/photo-1603575448374-c38ec5d19c1a?auto=format&fit=crop&w=1400&q=80",
    },
    {
      id: 3,
      backgroundColor: "bg-[#ACA0F8]",
      height: "h-[90vh]",
      tag: "features",
      titleLines: ["Search, Save,", "Contribute"],
      description:
        "Instantly search notes by semester, bookmark important files, and contribute your own to get recognized in the PrepNerdz community.",
      imageUrl:
        "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1400&q=80",
    },
  ],
};

export default function PrepNerdzFeatureSectionWrapper() {
  return <PrepNerdzFeatureSection {...featureSectionData} />;
}
