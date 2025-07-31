"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Linkedin } from "@/icons/Linkedin";
import { X } from "@/icons/X";
import Image from "next/image";
import Link from "next/link";
import CountUp from "react-countup";
import axios from "axios";
import GithubStar from "./buttons/GithubStar";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const footerElement = footerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
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

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
        );
        setUserCount(response.data.totalUsers);
      } catch (error) {
        console.error("Failed to fetch user count:", error);
      }
    };
    fetchUserCount();
  }, []);

  const reviews = [
    "Best platform to prepare!",
    "Love the UI and flow!",
    "Great content and community!",
    "Easy to use and informative!",
    "Helped me a lot in my journey!",
    "Impressive layout and UX!",
    "High-quality learning material!",
  ];

  const socialLinks = [
    {
      icon: X,
      url: "https://www.x.com/__Shubhashish__",
      color: "text-gray-800 hover:text-gray-900",
      hoverBg: "hover:bg-gray-50",
    },
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/in/Shubhashish-Chakraborty",
      color: "text-blue-600 hover:text-blue-700",
      hoverBg: "hover:bg-blue-50",
    },
  ];

  const quickLinks = [
    { name: "Home Page", href: "/" },
    { name: "Contact Us", href: "/contact-us" },
    {
      name: "Open Source",
      href: "https://github.com/Shubhashish-Chakraborty/prepnerdz",
      external: true,
    },
    { name: "Developer", href: "https://imshubh.site", external: true },
  ];

  const legalLinks = [
    { name: "Terms and Conditions", href: "/terms-and-conditions" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <div
      ref={footerRef}
      className={`relative min-h-[400px] transition-all duration-1000 ease-out ${
        isVisible
          ? "backdrop-blur-xl border-t border-gray-200/60 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      {/* Background Layers */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-pink-100/40 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute inset-0 backdrop-blur-sm bg-gradient-to-t from-white/60 to-white/20 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Main Content */}
      <div
        className={`relative z-10 px-4 py-8 md:py-12 transition-all duration-1000 delay-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-center items-center md:justify-between md:items-start lg:items-center gap-8 lg:gap-12">
            {/* Left Side */}
            <div className="flex-1 max-w-md">
              <div className="mb-6 flex md:justify-start justify-center">
                <Link href="/" className="inline-block">
                  <div className="relative group">
                    <Image
                      src="/prepnerdz-logo-with-code.png"
                      alt="PrepNerdz Logo"
                      width={200}
                      height={200}
                      className="hover:scale-105 transition-all duration-500 drop-shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                  </div>
                </Link>
              </div>

              <p className="text-gray-700 md:text-left text-center leading-relaxed text-sm md:text-base font-medium mb-8">
                We&apos;re just getting started! Join us on our journey to build something that the community will love.
              </p>

              <div className="flex justify-center md:justify-start gap-4 mb-8">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className={`p-3 rounded-full backdrop-blur-sm bg-white/60 border border-gray-200/50 shadow-lg ${social.color} ${social.hoverBg} hover:scale-110 hover:shadow-xl transition-all duration-300 group`}
                    >
                      <social.icon className="size-5" />
                    </button>
                  </Link>
                ))}
              </div>

              <div className="text-sm md:text-base text-center md:text-start">
                <span className="text-gray-700 font-medium">Having issues? Write us at </span>
                <span
                  onClick={() => {
                    navigator.clipboard.writeText("business.prepnerdz@gmail.com");
                    toast.success("Email copied to clipboard!");
                  }}
                  className="text-blue-600 hover:text-blue-700 cursor-pointer hover:underline font-bold transition-colors duration-300"
                >
                  business.prepnerdz@gmail.com
                </span>
              </div>
            </div>

            {/* Right Side Links */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-16">
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Quick Links</h3>
                <div className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <div key={index}>
                      <Link
                        href={link.href}
                        {...(link.external && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                        className="block text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:translate-x-1 hover:font-semibold"
                      >
                        {link.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center sm:text-left">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Legal</h3>
                <div className="space-y-3">
                  {legalLinks.map((link, index) => (
                    <div key={index}>
                      <Link
                        href={link.href}
                        className="block text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:translate-x-1 hover:font-semibold"
                      >
                        {link.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6 md:justify-end">
            <GithubStar />
          </div>

          {/* CountUp + Reviews */}
          <div className="text-center text-gray-800 text-base font-medium mt-10">
            Sign up now and be a part of our growing family — we&apos;re now a community of over <CountUp end={userCount} duration={2.5} />+ learners and counting!
          </div>

          <div className="overflow-hidden mt-6" aria-hidden="true">
            <motion.div
              className="flex space-x-10 animate-marquee whitespace-nowrap"
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              {reviews.concat(reviews).map((review, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:scale-105 transition-transform"
                >
                  <span className="text-yellow-400 text-sm">★★★★★</span>
                  <span>{review}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Copyright */}
          <div
            className={`mt-12 pt-8 border-t border-gray-200/60 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="text-center text-sm text-gray-600">
              <p className="font-medium">
                © {new Date().getFullYear()} PrepNerdz. Made with ❤️ for the community.
              </p>
            </div>
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
};
