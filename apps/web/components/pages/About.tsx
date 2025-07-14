"use client";

import { useState } from "react";
import Navbar from "../ui/navbars/Navbar";
import { LoginModal } from "../modals/Login";
import { SignupModal } from "../modals/Signup";
import New8 from "../New8";

export const AboutLanding = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-mainBgColor p-3">
      {/* Main container */}
      <div className="relative z-10 bg-[url('')] bg-cover bg-center bg-no-repeat rounded-4xl bg-[#F2F2F2]">
        <Navbar />

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

        <div className="w-full flex justify-center items-center relative">
          <div className="relative w-[15cm] h-[20cm]">
            <img
              className="w-full h-full object-cover z-0"
              src="https://cdsassets.apple.com/live/7WUAS350/images/ios/ios-18-iphone15-pro-messages-imessage.png"
              alt=""
            />

            <div className="absolute top-[324px] right-[40px] w-[11cm] h-[2cm] flex justify-center items-center bg-[#007AFF] z-10 rounded-4xl">
              <h1 className="text-3xl font-bold text-white">
                Why PrepNerdz exists?
              </h1>
            </div>
            <div className="absolute bottom-[100px] left-[40px] w-[11cm] h-[2cm] flex justify-start items-center bg-gray-300 z-10 rounded-4xl">
              <h1 className="text-3xl font-bold text-black ml-10">
                What we do .?
              </h1>
            </div>
          </div>
        </div>

        <div className="absolute top-[450px] left-[50px] w-[11cm] h-[9cm] bg-gray-300 rounded-4xl">
          <h1 className="text-2xl font-bold text-black p-6">
            Centralized & Organized Study Hub PrepNerdz combines all your
            academic resources—notes, papers, lab manuals, and syllabus—sorted
            by course, branch, and semester. Find what you need instantly
            without chasing files.
          </h1>
        </div>

        <div className="absolute top-[150px] right-[50px] w-[11cm] h-[9cm] bg-[#007AFF] rounded-4xl">
          <h1 className="text-2xl font-bold text-white p-6">
            College students waste countless hours wandering WhatsApp groups,
            requesting seniors, or digging through disorganized drives for study
            materials and all. PrepNerdz solves this chaos by providing a
            centralized and organized repository.
          </h1>
        </div>

        {/* Main page content starts here in this div!!! */}
        <New8 />
      </div>
    </div>
  );
};
