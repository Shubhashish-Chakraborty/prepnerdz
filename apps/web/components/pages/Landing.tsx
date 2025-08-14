"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TypingText from "../ui/TypingTest";
import { Button } from "../ui/buttons/Button";
import { Card } from "../ui/cards/HeroCards";
import { BookOpen } from "@/icons/BookOpen";
import { Search } from "@/icons/Search";
import { Users } from "@/icons/Users";
import { Target } from "@/icons/Target";
import { Download } from "@/icons/Download";
import { Bookmark } from "@/icons/Bookmark";
import { Upload } from "@/icons/Upload";
import { ShieldColored } from "@/icons/Shield";
import Navbar from "../ui/navbars/Navbar";
import { Footer } from "../ui/Footer";
import ProfileSimple from "../ui/cards/ProfileSimple";
import { LoginModal } from "../modals/Login";
import { SignupModal } from "../modals/Signup";
import Link from "next/link";
import LandingHero from "../ui/cards/HeroCard";
import { ThanksForVisit } from "../ui/ThanksForVisit";
import { EnterDoor } from "@/icons/EnterDoor";
import { Globe } from "@/icons/Globe";
import axios from "axios";
import { Paper } from "@/icons/Paper";
import { toast } from "react-hot-toast";
import FloatingFeatures from "../ui/cards/FloatingSimple";
import { Question } from "@/icons/Question";
import { Carousel } from "../carousel/LandingCarousle";
import CountUp from "react-countup";
import RecentlyAddedResources from "./RecentlyAddedResources";

declare global {
  interface Navigator {
    brave?: {
      isBrave?: unknown;
    };
  }
}

const featureItems = [
  {
    icon: <BookOpen className="size-5 md:size-6" aria-hidden="true" />,
    title: "Comprehensive Resources",
    description:
      "Access previous year RGPV papers, notes, and syllabus all in one place.",
  },
  {
    icon: <Target className="size-5 md:size-6" aria-hidden="true" />,
    title: "Organized by Semester",
    description:
      "Find exactly what you need with our branch-wise, semester-wise organization.",
  },
  {
    icon: <ShieldColored className="size-5 md:size-6" aria-hidden="true" />,
    title: "Verified Content",
    description: "All resources are verified by faculty and top students.",
  },
  {
    icon: <Bookmark className="size-5 md:size-6" aria-hidden="true" />,
    title: "Bookmark & Save",
    description: "Save your favorite resources for quick access later.",
  },
  {
    icon: <Upload className="size-5 md:size-6" aria-hidden="true" />,
    title: "Contribute and shine",
    description:
      "Add value to the platform and get recognized in the community.",
  },
];

const teamMembers = [
  {
    x: "https://x.com/__Shubhashish__",
    instagram: "https://www.instagram.com/___shubhashish___",
    github: "https://www.github.com/Shubhashish-Chakraborty",
    linkedin: "https://www.linkedin.com/in/Shubhashish-Chakraborty",
    name: "Shubhashish Chakraborty",
    image: "/founders/shubh.png",
    mail: "shubhashish147@gmail.com",
    role: "Founder & Developer",
  },
  {
    x: "https://x.com/MokshMishra1111",
    instagram: "https://www.instagram.com/iammokshmishra",
    github: "https://github.com/MokshMishra",
    linkedin: "https://www.linkedin.com/in/moksh-mishra-956868289/",
    name: "Moksh Mishra",
    image: "/founders/moksh.png",
    mail: "mokshmishra1418@gmail.com",
    role: "Co-Founder",
  },
  {
    x: "https://x.com/yadav_nihalll",
    instagram: "https://www.instagram.com/Nihaaalll_29",
    linkedin: "https://www.linkedin.com/in/Nihal-yadav2",
    name: "Nihal Yadav",
    image: "/founders/nihal.png",
    mail: "yadavnihal544@gmail.com",
    role: "Co-Founder",
  },
];

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

const features = [
  "Complete BTECH Study Materials",
  "RGPV Previous year papers (Mid-Sem & End-Sem)",
  "Study Materials (Shivani Books, IMP Questions, Best Academic Notes, Lab Manual & etc.)",
];

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
  const [studentCount, setStudentCount] = useState(0);

  const guideRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
        );
        setStudentCount(response.data.totalUsers);
      } catch (error) {
        console.error("Failed to fetch user count:", error);
      }
    };
    fetchUserCount();
  }, []);

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
      alertDiv.setAttribute("role", "alert");
      alertDiv.setAttribute("aria-live", "polite");
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
        <button 
          aria-label="Close browser settings notification"
          style="
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #666;
          " 
          onclick="this.parentNode.remove()"
        >×</button>
        <strong style="display: block; margin-bottom: 10px; color: #4C6EF5">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" style="vertical-align: middle; margin-right: 8px;">
            <path fill="#4C6EF5" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
          </svg>
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
      setTimeout(() => alertDiv.remove(), 20 * 1000);
    }
  }, []);

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      const safariAlert = document.createElement("div");
      safariAlert.setAttribute("role", "alert");
      safariAlert.setAttribute("aria-live", "polite");
      safariAlert.style.cssText = `
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
      `;
      safariAlert.innerHTML = `
        <button 
          aria-label="Close Safari settings notification"
          style="
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: #666;
          " 
          onclick="this.parentNode.remove()"
        >×</button>
        <strong style="display: block; margin-bottom: 10px; color: #4C6EF5">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" style="vertical-align: middle; margin-right: 8px;">
            <path fill="#4C6EF5" d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/>
          </svg>
          Safari Cookie Warning
        </strong>
        <p>For login to work correctly, please:</p>
        <ol style="padding-left: 20px; margin: 10px 0;">
          <li>Ensure "Prevent cross-site tracking" is <strong>disabled</strong> in Safari settings</li>
          <li>Use the latest version of Safari</li>
          <li>Login must be initiated via direct user action (click)</li>
        </ol>
      `;
      document.body.appendChild(safariAlert);
      setTimeout(() => safariAlert.remove(), 20000);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-mainBgColor font-special">
      {/* Skip to content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Background Animated Circles */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute animate-pulse bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-red-300/80 blur-[80px] md:blur-[150px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1.2 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute animate-pulse top-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-purple-500/40 blur-[60px] md:blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 2.4 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute animate-pulse top-1/2 left-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-emerald-500/40 blur-[50px] md:blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Main container */}
      <div className="relative z-10">
        <Navbar />

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

        {/* Main page content */}
        <div
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          ref={mainContentRef}
          id="main-content"
        >
          <div className="min-h-screen bg-gradient-to-br">
            {/* Hero Section */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                {/* Left Column - Text Content */}
                <div className="space-y-6 animate-fade-in-up order-2 lg:order-1 w-full lg:w-1/2">
                  <div className="space-y-4">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                      <span className="text-[#ffbf23] flex md:inline-block justify-center backdrop-blur-md cursor-default bg-black rounded-3xl p-2">
                        <TypingText
                          text="Notes? Papers? Materials?"
                          typeSpeed={100}
                        />
                      </span>
                      <br />
                      <span className="text-gray-900 flex md:justify-start justify-center">
                        Welcome to{" "}
                        <span className="font-bold ml-2 bg-gradient-to-r from-red-600 via-black-500 to-purple-900 bg-clip-text text-transparent">
                          PrepNerdz
                        </span>
                      </span>
                    </h1>
                    <p className="text-base md:text-lg text-black md:text-start text-center font-bold italic max-w-2xl">
                      &apos;No more &apos;Does anyone have...?&apos; messages.
                      No more dead-end Google searches. Just the right
                      resources, when you need them.&apos;
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex md:justify-start justify-center gap-4">
                    <div className="md:hidden block">
                      <Button
                        colorVariant="black_green"
                        sizeVariant="small"
                        text="Get Started"
                        endIcon={
                          <EnterDoor className="size-6" aria-hidden="true" />
                        }
                        onClick={() => setIsSignupOpen(true)}
                        aria-label="Get started on mobile"
                      />
                    </div>
                    <div className="md:block hidden">
                      <Button
                        colorVariant="black_green"
                        sizeVariant="medium"
                        text="Get Started"
                        endIcon={
                          <EnterDoor className="size-6" aria-hidden="true" />
                        }
                        onClick={() => setIsSignupOpen(true)}
                        aria-label="Get started"
                      />
                    </div>
                    <div className="md:hidden block">
                      <Link href={"/about"} passHref legacyBehavior>
                        <Button
                          colorVariant="yellow"
                          sizeVariant="small"
                          endIcon={
                            <Globe className="size-6" aria-hidden="true" />
                          }
                          text="Explore Features"
                          aria-label="Explore features on mobile"
                        />
                      </Link>
                    </div>
                    <div className="md:block hidden">
                      <Link href={"/about"} passHref legacyBehavior>
                        <Button
                          colorVariant="yellow"
                          sizeVariant="medium"
                          endIcon={
                            <Globe className="size-6" aria-hidden="true" />
                          }
                          text="Explore Features"
                          aria-label="Explore features"
                        />
                      </Link>
                    </div>
                    <div className="md:block hidden">
                      <Button
                        colorVariant="blue"
                        sizeVariant="medium"
                        text="How to use"
                        endIcon={
                          <Question className="size-6" aria-hidden="true" />
                        }
                        onClick={() => {
                          guideRef.current?.scrollIntoView({
                            behavior: "smooth",
                          });
                          toast.success("Watch the PrepNerdz Guide Tutorial");
                        }}
                        aria-label="Learn how to use PrepNerdz"
                      />
                    </div>
                  </div>
                  <div className="flex md:hidden justify-center">
                    <Button
                      colorVariant="blue"
                      sizeVariant="small"
                      text="How to use"
                      endIcon={
                        <Question className="size-6" aria-hidden="true" />
                      }
                      onClick={() => {
                        guideRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                        toast.success("Watch the PrepNerdz Guide Tutorial");
                      }}
                      aria-label="Learn how to use PrepNerdz on mobile"
                    />
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap md:justify-start justify-center items-center gap-4 md:gap-6 pt-4">
                    <div className="flex items-center gap-2">
                      <Users className="size-5 md:size-6" aria-hidden="true" />
                      <span className="text-sm text-gray-600">
                        <CountUp end={studentCount} duration={2.5} />+ Students
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldColored
                        className="size-5 md:size-6 text-green-500"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-gray-600">
                        Verified Content
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Search Box */}
                <div className="order-1 lg:order-2 w-full lg:w-1/2">
                  <Card className="p-4 md:p-6 shadow-xl border-0 backdrop-blur-sm">
                    <div className="space-y-4">
                      <div className="text-center">
                        <h2 className="text-lg md:text-xl special font-semibold mb-2">
                          Find Your Resources
                        </h2>
                        <p className="text-gray-600 text-sm">
                          Search from thousands of verified academic materials
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="relative">
                          <label htmlFor="search-input" className="sr-only">
                            Search resources
                          </label>
                          <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5"
                            aria-hidden="true"
                          />
                          <input
                            id="search-input"
                            type="text"
                            placeholder="Search for notes, papers, syllabus..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 md:py-3 text-sm md:text-base border-2 border-gray-200 focus:border-indigo-500 rounded-lg"
                            aria-describedby="search-description"
                          />
                          <div id="search-description" className="sr-only">
                            Search for academic resources by subject name
                          </div>
                        </div>

                        {/* Filter Dropdowns */}
                        <div className="grid grid-cols-2 gap-2 md:gap-4">
                          {/* Semester Dropdown */}
                          <div>
                            <label
                              htmlFor="semester-select"
                              className="sr-only"
                            >
                              Select semester
                            </label>
                            <select
                              id="semester-select"
                              value={semester}
                              onChange={(e) => setSemester(e.target.value)}
                              className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:border-indigo-500 focus:ring-indigo-500 w-full"
                              aria-label="Select semester"
                            >
                              <option value="">Select Semester</option>
                              <option value="1">1st Semester</option>
                              <option value="2">2nd Semester</option>
                              <option value="3">3rd Semester</option>
                              <option value="4">4th Semester</option>
                            </select>
                          </div>

                          {/* Resources Dropdown */}
                          <div>
                            <label
                              htmlFor="resource-type-select"
                              className="sr-only"
                            >
                              Select resource type
                            </label>
                            <select
                              id="resource-type-select"
                              value={resourceType}
                              onChange={(e) => setResourceType(e.target.value)}
                              className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:border-indigo-500 focus:ring-indigo-500 w-full"
                              aria-label="Select resource type"
                            >
                              <option value="">Resource Type</option>
                              <option value="SHIVANI_BOOKS">
                                Shivani Books
                              </option>
                              <option value="MID_SEM_PAPER">
                                Mid Sem Papers
                              </option>
                              <option value="END_SEM_PAPER">
                                End Sem Papers
                              </option>
                              <option value="NOTES">Notes</option>
                              <option value="LAB_MANUAL">Lab Manuals</option>
                              <option value="SYLLABUS">Syllabus</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <Button
                            sizeVariant="medium"
                            colorVariant="yellow"
                            onClick={handleSearch}
                            disabled={loading}
                            text={loading ? "Searching..." : "Search Resources"}
                            aria-busy={loading}
                            aria-live="polite"
                          />
                        </div>

                        {/* Results Section */}
                        {results.length > 0 && (
                          <div
                            className="bg-white p-4 md:p-6 rounded-xl shadow-md mt-4"
                            aria-live="polite"
                          >
                            {/* Login Prompt */}
                            {hasSearched && results.length > 0 && hasMore && (
                              <div className="mt-4 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
                                  <p className="text-blue-800 text-sm md:text-base text-center md:text-left">
                                    To access all resources, please login to
                                    your PrepNerdz account
                                  </p>
                                  <Button
                                    colorVariant="blue"
                                    text="Login Now"
                                    sizeVariant="medium"
                                    onClick={() => setIsLoginOpen(true)}
                                    aria-label="Login to access all resources"
                                  />
                                </div>
                              </div>
                            )}
                            <h3 className="text-lg md:text-xl font-semibold mb-4 md:mb-6 text-gray-800">
                              Search Results
                            </h3>
                            <div className="space-y-4 md:space-y-6" role="list">
                              {results.map((resource, index) => (
                                <div
                                  key={index}
                                  className="border-b border-gray-200 pb-4 md:pb-6 last:border-0"
                                  role="listitem"
                                  aria-labelledby={`resource-title-${index}`}
                                >
                                  <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                                    <div className="bg-indigo-100 p-2 md:p-3 rounded-lg w-fit">
                                      {resource.type === "NOTES" ? (
                                        <Paper
                                          className="size-4 md:size-6 text-indigo-600"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <BookOpen
                                          className="size-4 md:size-6 text-indigo-600"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4
                                        id={`resource-title-${index}`}
                                        className="font-medium text-base md:text-lg text-gray-900"
                                      >
                                        {resource.title}
                                      </h4>
                                      <p className="text-xs md:text-sm text-gray-600 mt-1 md:mt-2">
                                        {resource.subject?.semester?.branch
                                          ?.name || "General"}{" "}
                                        • Semester{" "}
                                        {resource.subject?.semester?.semNumber}
                                      </p>
                                      <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2 text-xs md:text-sm text-gray-500">
                                        <span>
                                          Type:{" "}
                                          {resource.type.replace(/_/g, " ")}
                                        </span>
                                        <span aria-hidden="true">•</span>
                                        <span>
                                          Uploaded by{" "}
                                          {resource.uploadedBy?.username ||
                                            "System"}
                                        </span>
                                        <span aria-hidden="true">•</span>
                                        <span>
                                          {new Date(
                                            resource.createdAt
                                          ).toLocaleDateString()}
                                        </span>
                                      </div>
                                    </div>
                                    <a
                                      href={resource.fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="px-3 py-1 md:px-4 md:py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center gap-1 md:gap-2 self-start md:self-center text-xs md:text-sm"
                                      aria-label={`Download ${resource.title}`}
                                    >
                                      <Download
                                        className="h-3 w-3 md:h-4 md:w-4"
                                        aria-hidden="true"
                                      />
                                      Download
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Empty State */}
                        {hasSearched && results.length === 0 && !loading && (
                          <div
                            className="bg-white p-4 md:p-8 rounded-xl shadow-md text-center mt-4"
                            aria-live="polite"
                          >
                            <div className="mx-auto h-12 w-12 md:h-16 md:w-16 text-gray-400">
                              <BookOpen
                                className="h-full w-full"
                                aria-hidden="true"
                              />
                            </div>
                            <h3 className="mt-2 md:mt-4 text-base md:text-lg font-medium text-gray-900">
                              No resources found
                            </h3>
                            <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-500">
                              Try different search terms or filters
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </section>

            {/* Recently Added Resources Section */}
            <RecentlyAddedResources limit={10} />

            {/* Features Section */}
            <section
              id="features"
              className="py-12 md:py-16"
              aria-labelledby="features-heading"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:mb-10">
                  <h2
                    id="features-heading"
                    className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
                  >
                    What PrepNerdz Provides?
                  </h2>
                  <FloatingFeatures features={features} />
                </div>
                <div className="text-center mb-8 md:mb-12">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl special font-bold mb-4">
                    Why Choose PrepNerdz?
                  </h2>
                  <p className="text-black max-w-2xl mx-auto text-sm md:text-base">
                    Everything you need to excel in your academics
                  </p>
                </div>

                {/* Desktop Grid */}
                <div
                  className="hidden md:flex flex-row flex-wrap gap-4 md:gap-6 lg:gap-10 items-center justify-center"
                  role="list"
                >
                  {featureItems.map((item, index) => (
                    <LandingHero
                      key={index}
                      icon={item.icon}
                      title={item.title}
                      description={item.description}
                    />
                  ))}
                </div>

                {/* Mobile Carousel */}
                <div className="md:hidden">
                  <Carousel autoSlide={true} autoSlideInterval={2000}>
                    {featureItems.map((item, index) => (
                      <LandingHero
                        key={index}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                      />
                    ))}
                  </Carousel>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section
              id="how-it-works"
              ref={guideRef}
              className="py-12 md:py-16"
              aria-labelledby="how-it-works-heading"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:mb-12">
                  <h2
                    id="how-it-works-heading"
                    className="text-2xl md:text-3xl lg:text-4xl special font-bold mb-4"
                  >
                    How to use PrepNerdz?
                  </h2>
                </div>
                <div className="text-center mt-6 md:mt-8 text-black font-bold text-lg md:text-2xl mb-6 md:mb-10 animate-bounce">
                  Start watching from{" "}
                  <span className="text-red-500 font-extrabold hover:underline">
                    07:00/19:50
                  </span>{" "}
                  to direct jump into dashboard part!
                </div>
                <div className="flex justify-center">
                  <iframe
                    src="https://drive.google.com/file/d/1GtZTJOtWrtou08zl8Zgm4W7vVtYPkRPW/preview"
                    className="w-full md:w-[60vw] h-[20vh] md:h-[60vh] rounded-lg shadow-2xl hover:shadow-cyan-700 cursor-pointer transition-all duration-500 shadow-amber-300"
                    allowFullScreen
                    title="PrepNerdz Tutorial Video"
                    aria-label="PrepNerdz tutorial video showing how to use the platform"
                  ></iframe>
                </div>
              </div>
            </section>

            {/* Team Section */}
            <section
              id="team"
              className="py-12 md:py-16"
              aria-labelledby="team-heading"
            >
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:mb-12">
                  <h2
                    id="team-heading"
                    className="text-2xl md:text-3xl lg:text-4xl special font-bold mb-4"
                  >
                    Meet the founders and Developers
                  </h2>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block">
                  <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8 lg:space-x-40 mb-8">
                    <ThanksForVisit />
                    <ProfileSimple {...teamMembers[0]} />
                    <ThanksForVisit />
                  </div>
                  <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 md:gap-8 lg:gap-10">
                    <ThanksForVisit />
                    <ProfileSimple {...teamMembers[1]} />
                    <ProfileSimple {...teamMembers[2]} />
                    <ThanksForVisit />
                  </div>
                </div>

                {/* Mobile Carousel */}
                <div className="md:hidden">
                  <Carousel autoSlide={true} autoSlideInterval={3000}>
                    {teamMembers.map((member, index) => (
                      <ProfileSimple key={index} {...member} />
                    ))}
                  </Carousel>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
