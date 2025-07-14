"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "../ui/navbars/Navbar";
import { LoginModal } from "../modals/Login";
import { SignupModal } from "../modals/Signup";
import { Footer } from "../ui/Footer";

import New1 from "../New1";
import New2 from "../New2";
import New3 from "../New3";
import New4 from "../New4";
import New5 from "../New5";
import New6 from "../New6";
import New7 from "../New7";
import New8 from "../New8";
import LogoRight from "../Logoright";
import Logo from "../Logo";

declare global {
  interface Navigator {
    brave?: {
      isBrave?: unknown;
    };
  }
}

interface ResourceResult {
  id: string;
  title: string;
  type: string;
  fileUrl: string;
  createdAt: string;
  uploadedBy?: {
    username?: string;
  };
  subject?: {
    semester?: {
      semNumber: number;
      branch?: {
        name: string;
      };
    };
  };
}

export const HomeLanding = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [semester, setSemester] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [results, setResults] = useState<ResourceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const guideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("scrollTo") === "guide" && guideRef.current) {
      guideRef.current.scrollIntoView({ behavior: "smooth" });
      toast.success("Watch the PrepNerdz Guide Tutorial");
    }
  }, []);

  const handleSearch = async () => {
    if (!searchQuery || !semester || !resourceType) {
      toast.error("Please fill in all search fields");
      return;
    }

    const adjustedSemester =
      semester === "1" || semester === "2" ? "0" : semester;

    setLoading(true);
    setHasSearched(true);
    setResults([]);
    setHasMore(false);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/search/landing`,
        {
          params: {
            subject: searchQuery,
            semester: adjustedSemester,
            landingResourceType: resourceType,
          },
        }
      );

      setResults(response.data.data);
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isBrave =
      navigator.brave !== undefined || navigator.userAgent.includes("Brave");

    if (isBrave) {
      const alertDiv = document.createElement("div");
      alertDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 400px;
                padding: 20px;
                background: #f0f3ff;
                border-left: 5px solid #4C6EF5;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                color: #333;
                line-height: 1.5;
            `;

      alertDiv.innerHTML = `
                <button style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    color: #666;
                " onclick="this.parentNode.remove()">×</button>
                <strong style="display: block; margin-bottom: 10px; color: #4C6EF5">
                    Brave Browser Settings Required
                </strong>
                <p>For login to work properly:</p>
                <ol style="padding-left: 20px; margin: 10px 0;">
                    <li>Click the <strong>Brave Shields icon</strong> (🦁) in address bar</li>
                    <li>Select <strong>"Advanced Controls"</strong></li>
                    <li>Under <strong>"Cookies"</strong>, choose <strong>"Allow all cookies"</strong></li>
                    <li><strong>Refresh</strong> the page</li>
                </ol>
                <p style="font-size: 0.9em; color: #666; margin-top: 10px;">
                    <em>Note: You can re-enable shields after logging in.</em><br>
                    This is required because Brave blocks authentication cookies by default.
                </p>
            `;

      document.body.appendChild(alertDiv);
      setTimeout(() => alertDiv.remove(), 20000);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-mainBgColor">
      <div className="relative z-10  ">
       <div className="pl-3  pr-3  ">
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
        <New8 />
      </div>
    </div>
  );
};
