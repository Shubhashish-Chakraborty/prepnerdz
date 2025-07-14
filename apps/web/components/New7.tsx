"use client";

import React from "react";
import { FaArrowRight } from "react-icons/fa";

type DeveloperCard = {
  type: "image" | "cta";
  imgUrl?: string;
  bgColor: string;
  rounded: "full" | "rounded-[40px]";
};

const developerData: DeveloperCard[] = [
  {
    type: "image",
    imgUrl:
      "https://www.prepnerdz.tech/_next/image?url=%2Ffounders%2Fmoksh.png&w=640&q=75",
    bgColor: "#911911",
    rounded: "full",
  },
  {
    type: "image",
    imgUrl:
      "https://www.prepnerdz.tech/_next/image?url=%2Ffounders%2Fnihal.png&w=640&q=75",
    bgColor: "#B7846A",
    rounded: "rounded-[40px]",
  },
  {
    type: "cta",
    bgColor: "#53A825",
    rounded: "full",
  },
  {
    type: "image",
    imgUrl:
      "https://www.prepnerdz.tech/_next/image?url=%2Ffounders%2Fshubh.png&w=640&q=75",
    bgColor: "#66ADC5",
    rounded: "rounded-[40px]",
  },
  {
    type: "image",
    imgUrl:
      "https://pbs.twimg.com/profile_images/1933222335932477441/2UeTXJXZ_400x400.jpg",
    bgColor: "#F9D526",
    rounded: "full",
  },
];

export default function DeveloperShowcase() {
  return (
    <div>
      <div>
        <div>
          <h1 className="text-[290px] font-bold text-[#111111]">Developers</h1>
          <div className="flex justify-center items-center w-full p-5">
            {developerData.map((dev, index) => {
              const commonClasses = `w-[20%] h-[8cm] bg-[${dev.bgColor}] border-4 border-black/20 ${
                dev.rounded === "full" ? "rounded-full" : dev.rounded
              } overflow-hidden`;

              if (dev.type === "image" && dev.imgUrl) {
                return (
                  <div key={index} className={commonClasses}>
                    <img
                      className="w-full h-full object-cover"
                      src={dev.imgUrl}
                      alt=""
                    />
                  </div>
                );
              }

              if (dev.type === "cta") {
                return (
                  <div
                    key={index}
                    className={`${commonClasses} flex justify-center items-center flex-col  bg-[#53A825] text-white`}
                  >
                    <h1 className="text-3xl">You Can Become</h1>
                    <h1 className="text-3xl">One Of Us</h1>
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
      </div>
    </div>
  );
}
