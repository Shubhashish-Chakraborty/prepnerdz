"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../ui/navbars/Navbar";
import { LoginModal } from "../modals/Login";
import { SignupModal } from "../modals/Signup";
import New1 from "../New1";
import New2 from "../New2";
import New3 from "../New3";
import New4 from "../New4";
import New5 from "../New5";
import New6 from "../New6";
import New7 from "../New7";
import Logo from "../Logo";
import LogoRight from "../Logoright";

export const LandingPage: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false);

  useEffect(() => {
    const isBrave =
      (navigator as any).brave !== undefined || navigator.userAgent.includes("Brave");

    if (isBrave) {
      const alertDiv = document.createElement("div");
      alertDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 360px;
        padding: 16px 20px;
        background: #fff;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #1f2937;
        animation: slideUp 0.3s ease;
      `;

      alertDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <div style="flex: 1;">
            <p style="font-weight: 600; margin-bottom: 8px; font-size: 16px; color: #111827;">
              Cookie Settings Required 🍪
            </p>
            <p style="font-size: 14px; margin-bottom: 8px;">
              To use login features properly, please allow all cookies:
            </p>
            <ul style="margin-left: 20px; font-size: 14px; margin-bottom: 8px;">
              <li>Click the <strong>Brave Shields</strong> icon (🦁)</li>
              <li>Go to <strong>Advanced Controls</strong></li>
              <li>Set <strong>Cookies</strong> to <strong>Allow all cookies</strong></li>
              <li>Then <strong>refresh</strong> the page</li>
            </ul>
            <p style="font-size: 12px; color: #6b7280;">
              You can re-enable shields after logging in.
            </p>
          </div>
          <button style="
            background: none;
            border: none;
            font-size: 18px;
            font-weight: bold;
            color: #9ca3af;
            cursor: pointer;
            margin-left: 8px;
          " aria-label="Dismiss Brave Notice" onclick="this.parentNode.parentNode.remove()">×</button>
        </div>
      `;

      document.body.appendChild(alertDiv);
      setTimeout(() => alertDiv.remove(), 8000);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-mainBgColor">
      <div className="relative z-10">
        <div className="p-3">
          <div className="bg-[url('https://images6.alphacoders.com/123/thumb-1920-1232063.jpg')] bg-cover bg-center bg-no-repeat rounded-4xl">
            <Navbar />
            <New1 />
            <New2 imageSrc="/Screenshot (329).png" />
          </div>
        </div>

        <div className="bg-yellow-200">
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
          <Logo />
        </div>
        <div className="mt-20 mb-20">
          <LogoRight />
        </div>

        <New3 />
        <New4 />
        <New5 />
        <New6 />
        <New7 />
      </div>
    </div>
  );
};
