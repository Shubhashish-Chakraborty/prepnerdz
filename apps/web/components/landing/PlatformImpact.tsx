"use client";
import React from "react";

type StatCard = {
  icon: string;
  color: string;
  percentage: string;
  text: string;
};

type Banner = {
  imageUrl: string;
  text: string;
};

type PlatformImpactProps = {
  tag: string;
  headings: string[];
  banner: Banner;
  stats: StatCard[];
};

const PlatformImpact: React.FC<PlatformImpactProps> = ({
  tag,
  headings,
  banner,
  stats,
}) => {
  return (
    <div className="mt-20 w-full flex flex-col justify-center items-center text-[#0F1916]">
      <div className="w-full flex justify-center items-center">
        <h1 className="uppercase py-1 px-4 border-2 border-[#0F1916] text-[12px] rounded-4xl font-medium">
          {tag}
        </h1>
      </div>

      <div className="w-full flex flex-col justify-center items-center font-medium mt-5 space-y-3 text-center">
        {headings.map((line, i) => (
          <h1
            style={{ fontFamily: "PPEditorialNew" }}
            key={i}
            className="text-5xl md:text-8xl"
          >
            {line}
          </h1>
        ))}
      </div>

      <div className="w-full flex justify-center items-center mt-10">
        <div className="py-2 px-6 bg-[#0F1916] text-xl rounded-4xl text-white flex justify-center items-center gap-2">
          <span dangerouslySetInnerHTML={{ __html: banner.text }} />
        </div>
      </div>

      <div className="w-[60%] flex flex-wrap gap-5 justify-center items-center pt-10 pb-40">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="w-[11cm] h-[5cm] rounded-3xl border-2 border-[#0F1916]/30 flex"
          >
            <div className="w-[30%] h-full flex justify-center items-center">
              <h1
                className="px-5 py-3 rounded-full font-bold text-4xl"
                style={{ backgroundColor: stat.color }}
              >
                {stat.icon}
              </h1>
            </div>

            <div className="w-[70%] h-full flex flex-col justify-center items-start px-4">
              <h1 className="text-6xl font-semibold">{stat.percentage}</h1>
              <h1 className="mt-5 text-xl line-clamp-1">{stat.text}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function PlatformImpactWrapper() {
  const props: PlatformImpactProps = {
    tag: "platform impact",
    headings: ["Helping Students Achieve", "Academic Excellence"],
    banner: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      text: `ReelUp ranks <span class="font-bold">No.1</span> app on the <span class="italic font-extralight underline">Google</span> app store`,
    },
    stats: [
      {
        icon: "📚",
        color: "#FED2F1",
        percentage: "5x",
        text: "More syllabus coverage using PrepNerdz materials",
      },
      {
        icon: "✅",
        color: "#F7FD8E",
        percentage: "98%",
        text: "Verified content accuracy from top students",
      },
      {
        icon: "🎓",
        color: "#ACA0F8",
        percentage: "82%",
        text: "Improved semester performance (user feedback)",
      },
      {
        icon: "📈",
        color: "#52A381",
        percentage: "392%",
        text: "More engagement vs other platforms",
      },
    ],
  };

  return <PlatformImpact {...props} />;
}
