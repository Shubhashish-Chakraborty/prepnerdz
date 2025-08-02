"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Linkedin } from "@/icons/Linkedin";
import { X } from "@/icons/X"; // Assuming X is your Twitter/X icon
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import axios from "axios";
import GithubStar from "./buttons/GithubStar"; // Assuming this is correct path for your custom component

interface userCountResponse {
  totalUsers : NumberConstructor;
}

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const [userCount, setUserCount] = useState(0);

  // Requirement: Enhance professionalism and user experience through subtle animations
  // Intersection Observer for animations
  useEffect(() => {
    const footerElement = footerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after it becomes visible if animation should only play once
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px", // Give a little buffer
      }
    );

    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  // Requirement: Provide key information (dynamic user count)
  // Fetch user count
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get<userCountResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
        );
        setUserCount(response.data.totalUsers);
      } catch (error) {
        console.error("Failed to fetch user count:", error);
        // Fallback to a default count if fetch fails for better UX
        setUserCount(1000);
      }
    };
    fetchUserCount();
  }, []);

  // Data for various sections of the footer
  const reviews = [
    "Best platform to prepare!",
    "Love the UI and flow!",
    "Great content and community!",
    "Easy to use and informative!",
    "Helped me a lot in my journey!",
    "Impressive layout and UX!",
    "High-quality learning material!",
    "Highly recommended for coding prep!", // Added for variety
    "The best resource for interview preparation!", // Added for variety
  ];

  const socialLinks = [
    {
      icon: X,
      name: "X (formerly Twitter)",
      url: "https://www.x.com/__Shubhashish__",
      colorClass: "text-gray-700 hover:text-black", // Stronger contrast
      bgClass: "bg-gray-100 hover:bg-gray-200",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/Shubhashish-Chakraborty",
      colorClass: "text-blue-700 hover:text-blue-800",
      bgClass: "bg-blue-100 hover:bg-blue-200",
    },
  ];

  // Requirement: Serve as a site map - categorized quick links
  const quickLinks = [
    { name: "Home Page", href: "/" },
    { name: "About Us", href: "/about-us" }, // Important for site map
    { name: "Contact Us", href: "/contact-us" },
    {
      name: "Open Source Project", // More descriptive link
      href: "https://github.com/Shubhashish-Chakraborty/prepnerdz",
      external: true,
    },
  ];

  // Requirement: Provide key information and links - Developer info
  const developerLinks = [
    { name: "Developer's Portfolio", href: "https://imshubh.site", external: true },
  ];

  // Requirement: Provide key information and links - Legal info
  const legalLinks = [
    { name: "Terms and Conditions", href: "/terms-and-conditions" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Cookie Policy", href: "/cookie-policy" }, // Example: common legal link
  ];

  return(
    <div
      ref={footerRef}
      className={`relative pt-12 pb-8 md:pt-16 md:pb-10 transition-all duration-1000 ease-out 
        ${isVisible ? "opacity-100" : "opacity-0"}`} // Controls main fade-in
    >
      
    <div
        className={`absolute inset-0 z-0 
        ${isVisible ? "backdrop-blur-xl bg-gradient-to-br from-blue-50/70 via-purple-50/70 to-pink-50/70" : "bg-transparent"}
        transition-all duration-1000 ease-out`}    >
      <div
        className={`absolute inset-0 z-0 bg-white/50 border-t border-gray-100
        ${isVisible ? "opacity-100" : "opacity-0"}
        transition-opacity duration-1000 ease-out`}
      />

      {/* Main Content Container */}
      <div
        className={`relative z-10 px-4 transition-all duration-1000 delay-300 
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        {/* Layout: More professional and organized grid for site map */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">

          {/* Section 1: Brand Reinforcement (Logo, Tagline), Socials, Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left lg:col-span-2">
            <Link href="/" className="inline-block mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
              <div className="relative group">
                <Image
                  src="/prepnerdz-logo-with-code.png"
                  alt="PrepNerdz Logo"
                  width={220} // Slightly larger for prominence
                  height={220}
                  className="hover:scale-105 transition-transform duration-500 drop-shadow-md"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
              </div>
            </Link>

            <p className="text-gray-700 leading-relaxed text-sm md:text-base font-medium mb-6 max-w-sm">
              We&apos;re just getting started! Join us on our journey to build something
              that the community will *love*.
            </p>

            {/* Social Links: Key information and useful links, with accessibility */}
            <div className="flex justify-center md:justify-start gap-4 mb-6">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Link to PrepNerdz on ${social.name}`} // Accessibility: crucial for screen readers
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
                >
                  <button
                    className={`p-3 rounded-full shadow-lg ${social.bgClass} ${social.colorClass} 
                                 hover:scale-110 hover:shadow-xl transition-all duration-300`}
                  >
                    <social.icon className="size-5" />
                  </button>
                </Link>
              ))}
            </div>

            {/* Contact Email: Key information, made more useful and professional */}
            <div className="text-sm md:text-base text-center md:text-start">
              <span className="text-gray-700 font-medium">
                Having issues? Write us at{" "}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("business.prepnerdz@gmail.com");
                  toast.success("Email copied to clipboard!");
                }}
                className="text-blue-600 hover:text-blue-700 cursor-pointer 
                           hover:underline font-bold transition-colors duration-300
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 -mx-1" // Larger click area, better focus
              >
                business.prepnerdz@gmail.com
              </button>
            </div>
          </div>

          {/* Section 2: Quick Links (Part of Site Map) */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg mb-5 text-gray-900 border-b-2 border-blue-300 pb-2 inline-block">
              Quick Links
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <div key={index}>
                  <Link
                    href={link.href}
                    {...(link.external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="block text-gray-700 hover:text-blue-600 transition-all duration-300 
                               font-medium hover:translate-x-1 hover:font-semibold
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 -mx-1"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Legal Links & Developer (Key Information & Site Map) */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg mb-5 text-gray-900 border-b-2 border-purple-300 pb-2 inline-block">
              Legal
            </h3>
            <div className="space-y-3 mb-6"> {/* Added margin bottom for separation */}
              {legalLinks.map((link, index) => (
                <div key={index}>
                  <Link
                    href={link.href}
                    className="block text-gray-700 hover:text-blue-600 transition-all duration-300 
                               font-medium hover:translate-x-1 hover:font-semibold
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 -mx-1"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
            {/* Developer Links */}
            <h3 className="font-bold text-lg mb-5 text-gray-900 border-b-2 border-pink-300 pb-2 inline-block">
              Developer
            </h3>
            <div className="space-y-3">
              {developerLinks.map((link, index) => (
                <div key={index}>
                  <Link
                    href={link.href}
                    {...(link.external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="block text-gray-700 hover:text-blue-600 transition-all duration-300 
                               font-medium hover:translate-x-1 hover:font-semibold
                               focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1 -mx-1"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User Count & Github Star: Informative and brand reinforcement */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-12 mb-10 border-t pt-8 border-gray-200">
          <div className="text-center md:text-left text-gray-800 text-lg font-semibold max-w-md">
            Sign up now and be a part of our growing family — we&apos;re now a
            community of over{" "}
            <span className="text-blue-600 text-2xl font-bold">
              <CountUp end={userCount} duration={2.5} separator="," />
            </span>
            + learners and counting!
          </div>
          <div className="flex-shrink-0">
            <GithubStar />
          </div>
        </div>

        {/* Reviews Marquee: Reinforce brand and provide social proof */}
        <div className="overflow-hidden mb-12" aria-hidden="true">
          <motion.div
            className="flex items-center space-x-10 animate-marquee whitespace-nowrap py-2"
            animate={{ x: ["0%", "-100%"] }} // Use percentages for smoother looping
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }} // Slightly slower for better readability
          >
            {reviews.concat(reviews).map((review, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-6 py-3 bg-white/70 rounded-full shadow-sm text-sm text-gray-800 
                           border border-gray-200 hover:scale-105 transition-transform duration-300 flex-shrink-0" // Individual review item styling for professionalism
              >
                <span className="text-yellow-500 text-base">★★★★★</span>
                <span className="font-medium">{review}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Copyright: Key information, professional presentation */}
        <div
          className={`mt-8 pt-6 border-t border-gray-200/60 
            ${isVisible ? "opacity-100" : "opacity-0"}
            transition-all duration-1000 delay-500`}
        >
          <div className="text-center text-sm text-gray-600">
            <p className="font-medium">
              © {new Date().getFullYear()} PrepNerdz. Made with{" "}
              <span className="text-red-500">❤</span> for the community.
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-marquee {
          display: inline-flex;
          white-space: nowrap;
          will-change: transform;
        }
      `}</style>
    </div>
  );
</div>)}
