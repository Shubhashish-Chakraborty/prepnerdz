import React, { ReactNode } from 'react';

const LandingHero = ({ icon, title, description }: {
  icon?: ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="relative w-[400px] h-[250px] text-white transition duration-500 cursor-pointer group hover:-translate-y-5">
      {/* ::before gradient background */}
      <div className="absolute inset-0 rounded-[1.2em] bg-gradient-to-br from-[#ffbc00] to-[#ff0058]" />

      {/* ::after blurred background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffbc00] to-[#ff0058] blur-[30px]" />

      {/* inner dark span */}
      <span className="absolute top-[6px] left-[6px] right-[6px] bottom-[6px] bg-[rgba(0,0,0,0.6)] z-[2] rounded-[1em] before:content-[''] before:absolute before:top-0 before:left-0 before:w-1/2 before:h-full before:bg-[rgba(255,255,255,0.1)]" />

      {/* content */}
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center font-extrabold text-white z-10 px-6">
        {icon && <div className="mb-4 text-4xl">{icon}</div>}
        <div className="text-2xl mb-2">{title}</div>
        <div className="text-base font-medium text-white/80">{description}</div>
      </div>
    </div>
  );
};

export default LandingHero;