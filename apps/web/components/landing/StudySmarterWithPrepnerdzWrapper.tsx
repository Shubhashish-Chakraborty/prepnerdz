"use client";
import Image from "next/image";
import React from "react";

type FeatureCard = {
  id: number;
  backgroundColor: string;
  height: string;
  tag: string;
  titleLines: string[];
  description: string;
  imageUrl: string;
};

type PrepNerdzFeatureSectionProps = {
  tagline: string;
  mainHeadingLines: string[];
  features: FeatureCard[];
};

const StudySmarterWithPrepnerdz: React.FC<PrepNerdzFeatureSectionProps> = ({
  tagline,
  mainHeadingLines,
  features,
}) => {
  return (
    <div className="w-full flex justify-center items-center flex-col text-[#0F1916] p-3">
      <div className="w-full flex justify-center items-center">
        <h1 className="uppercase py-1 px-4 border-2 border-[#0F1916] text-[12px] rounded-[40px] font-medium">
          {tagline}
        </h1>
      </div>

      <div className="w-full flex flex-col justify-center items-center font-medium mt-5 space-y-3 text-center">
        {mainHeadingLines.map((line, i) => (
          <h1
            style={{ fontFamily: "PPEditorialNew" }}
            key={i}
            className="text-5xl md:text-8xl"
          >
            {line}
          </h1>
        ))}
      </div>

      <div className="w-full flex flex-col justify-center items-center mt-20 gap-3">
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={feature.id}
              className={`${feature.backgroundColor} w-full ${feature.height} rounded-[40px] p-10`}
            >
              <div className="w-full h-full flex flex-col md:flex-row mt-10">
                <div
                  className={`w-full md:w-1/2 h-[14cm] md:h-[70vh] flex justify-center items-center p-10 ${
                    isEven ? "" : "md:order-2"
                  }`}
                >
                  <div className="relative bg-white h-full w-full rounded-[30px] overflow-hidden">
                    <Image
                      src={feature.imageUrl}
                      alt={feature.titleLines.join(" ")}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Text Section */}
                <div
                  className={`w-full md:w-1/2 h-[15cm] md:h-[65vh] p-10 flex flex-col justify-center ${
                    isEven ? "" : "md:order-1"
                  }`}
                >
                  <div className="w-full flex justify-start items-center">
                    <h1 className="uppercase py-1 px-4 border-2 border-[#0F1916] text-[12px] rounded-[40px] font-medium">
                      {feature.tag}
                    </h1>
                  </div>

                  <div
                    style={{ fontFamily: "PPEditorialNew" }}
                    className="text-5xl md:text-8xl mt-10 space-y-1"
                  >
                    {feature.titleLines.map((line, i) => (
                      <h1 key={i}>{line}</h1>
                    ))}
                  </div>

                  <p className="max-w-[13cm] md:max-w-[50vw] mt-10 text-xl text-[#0F1916]/80 font-light">
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
      imageUrl: "/img1.png",
    },
    {
      id: 2,
      backgroundColor: "bg-[#F7FD8E]",
      height: "h-[90vh]",
      tag: "features",
      titleLines: ["Verified", "by Experts"],
      description:
        "All content is verified by top students and faculty members. PrepNerdz ensures only high-quality academic materials reach you.",
      imageUrl: "/img2.png",
    },
    {
      id: 3,
      backgroundColor: "bg-[#ACA0F8]",
      height: "h-[90vh]",
      tag: "features",
      titleLines: ["Search, Save,", "Contribute"],
      description:
        "Instantly search notes by semester, bookmark important files, and contribute your own to get recognized in the PrepNerdz community.",
      imageUrl: "/img3.png",
    },
  ],
};

export default function StudySmarterWithPrepnerdzWrapper() {
  return <StudySmarterWithPrepnerdz {...featureSectionData} />;
}
