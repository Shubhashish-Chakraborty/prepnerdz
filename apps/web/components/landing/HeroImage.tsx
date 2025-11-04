"use client";
import Image from "next/image";
import React from "react";

type HeroImageProps = {
  imageSrc: string;
  altText?: string;
  widthClass?: string;
  heightClass?: string;
  containerClass?: string;
};

const HeroImage: React.FC<HeroImageProps> = ({
  imageSrc,
  altText = "Preview Image",
  widthClass = "w-[75vw]",
  heightClass = "h-[85vh]",
  containerClass = "rounded-2xl",
}) => {
  return (
    <div className="mt-20">
      <section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div
              className={`relative ${widthClass} ${heightClass} ${containerClass} overflow-hidden`}
            >
              <Image
                src={imageSrc}
                alt={altText}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 75vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroImage;
