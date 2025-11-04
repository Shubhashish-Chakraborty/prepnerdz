"use client";

import React, { useState } from "react";
import Navbar from "../ui/navbars/Navbar";
import { LoginModal } from "../modals/Login";
import { SignupModal } from "../modals/Signup";
import HeroTitle from "./HeroTitle";
import HeroImage from "./HeroImage";
import LogoLeft from "./LogoLeft";
import LogoRight from "./Logoright";
import StudySmarterWithPrepnerdzWrapper from "./StudySmarterWithPrepnerdzWrapper";
import AwesomeFeaturesSection from "./AwesomeFeaturesSection";
import OurBlogs from "./OurBlogs";
import DeveloperShowcase from "./Developers";
import FooterCTA from "./FooterCTA";
import PlatformImpactWrapper from "./PlatformImpact";

export const LandingPage: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-mainBgColor font-special">
      <div className="relative z-10">
        <div className="p-3">
          <div className="bg-[url('https://images6.alphacoders.com/123/thumb-1920-1232063.jpg')] bg-cover bg-center bg-no-repeat rounded-4xl">
            <Navbar />

            <HeroTitle />
            <HeroImage imageSrc="./Screenshot (500).png" />
          </div>
        </div>

        <div>
          <LoginModal
            open={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onSwitchToSignup={() => {
              setIsLoginOpen(false);
              setIsSignupOpen(true);
            }}
          />

          <SignupModal
            open={isSignupOpen}
            onClose={() => setIsSignupOpen(false)}
            onSwitchToLogin={() => {
              setIsSignupOpen(false);
              setIsLoginOpen(true);
            }}
          />
        </div>

        <div className="mt-20">
          <LogoLeft />
        </div>
        <div className="mt-20 mb-20">
          <LogoRight />
        </div>

        <StudySmarterWithPrepnerdzWrapper />

        <PlatformImpactWrapper />
        <AwesomeFeaturesSection />
        <OurBlogs />
        <DeveloperShowcase />
        <FooterCTA />
      </div>
    </div>
  );
};

export default LandingPage;
