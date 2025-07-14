"use client";
import React from "react";

// Define the props type
type New2Props = {
  imageSrc: string;
  altText?: string;
  widthClass?: string;
  heightClass?: string;
  containerClass?: string;
};

const New2: React.FC<New2Props> = ({
  imageSrc,
  altText = "Preview Image",
  widthClass = "w-[70vw]",
  heightClass = "h-[80vh]",
  containerClass = "rounded-2xl",
}) => {
  return (
    <div className="mt-20">
      <section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <img
              src={imageSrc}
              alt={altText}
              className={`${widthClass} ${heightClass} ${containerClass}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default New2;
