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
import useFluidCursor from '../../hooks/use-FluidCursor';
import FluidCursor from "../FluidCursor";
import { FlipHorizontal } from "lucide-react";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const [userCount, setUserCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const targetRef = useRef<HTMLImageElement | null>(null);
  const [controller, setController] = useState<{ start: () => void; stop: () => void }>();

  {/* For Fluid Effect in footer */}
  useEffect(() => {
    if (canvasRef.current) {
      const ctrl = useFluidCursor(canvasRef.current);
      setController(ctrl);
    }
  }, []);

  {/* Intersection Observer to trigger fluid effect when footer is in view */}
  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controller?.start();  // activate fluid effect
          } else {
            controller?.stop();   // stop fluid effect
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [controller]);

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

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.body.scrollHeight;

      if (scrollPosition >= pageHeight - 1000 && scrollPosition < pageHeight - 700) {
        setShowVideo(true);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    { name: "Developer", href: "https://bento.me/imshubh", external: true },
  ];

  const legalLinks = [
    { name: "Terms and Conditions", href: "/terms-and-conditions" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    // Top level div for footer background and canvas positioning.
    <div className="relative" ref={footerRef}>
      {/* ::after blurred background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C65BCF] to-[#874CCC] blur-[30px]" />

      {/* inner dark span */}
      <span className="absolute top-[0px] left-[0px] right-[0px] bottom-[0px] bg-[radial-gradient(circle_at_center,#9D44C0,#211951)] z-[2] blur-xl before:content-[''] before:absolute before:top-0 before:left-0 before:w-1/2 before:h-full" />
      
      {/* fluid cursor canvas */}
      {/* Sent canvasRef instead of fetching it through id*/}
      <div className="absolute inset-0 pointer-events-none z-[9999]">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div
        className={`relative min-h-[400px] transition-all duration-1000 ease-out mt-[100px] bg-gradient-from-[#FF2DD1] ${
          isVisible
            ? "border-t border-gray-200/60 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        {/* Background Image */}
        <Link href="/">
          <div className="relative w-full group justify-center">
            {/* Background GIF */}
            {showVideo && 
            <img src="/prepnerdz-logo-giff.gif" 
            alt="logo-gif" width={1024} 
            className="bg-transparent border-none m-auto absolute sm:left-20 md:left-0 md:top-[-35vh] lg:left-0 xl:left-60 2xl:left-60 lg:top-[-42vh] z-[10]" 
            onLoad={() => {
              setTimeout(() => {
                setShowVideo(false);
              }, 2300); // 2.3s = duration of GIF
            }}
            />}
            {/* Static Image */}
            {!showVideo && 
            <img 
            ref={targetRef} 
            id="prepnerdz-logo-footer" 
            src="/prepnerdz-logo-with-code.png" 
            alt="background-logo" 
            width={1024} 
            height={500} 
            className="hover:scale-105 transition-all duration-500 m-auto absolute top-[-9vh] sm:left-20 sm:top-[-20vh] md:left-0 md:top-[-50vh] lg:left-0 lg:top-[-60vh] xl:left-60 2xl:left-60 z-10 drop-shadow-xl/50 mask-b-from-73% mask-b-to-81% bg-transparent"
            />}

            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
          </div>
        </Link>
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
          className={`relative z-10 px-4 py-8 md:py-12 transition-all duration-1000 delay-300 mt-[250px] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="max-w-7xl mx-auto text-center sm:p-6 sm:mt-0 sm:flex sm:flex-col">
            <div className="flex flex-col lg:flex-row justify-center items-center lg:items-center sm:mt-0 lg:mt-[90px]">
              {/* Footer Links*/}
              <div className="relative p-[20px] sm:w-[100%] sm:h-[100vh] lg:w-[100%] lg:h-[50vh] md:w-[100%] md:h-[50vh] lg:mt-[50px] text-white transition duration-500 cursor-pointer group hover:-translate-y-5 sm:flex sm:flex-col md:flex-row lg:flex-row justify-between">
                {/* ::before gradient background */}
                <div className="absolute inset-0 rounded-[1.2em] bg-gradient-to-br from-[#64CCDA] to-[#5F939A]" />

                {/* ::after blurred background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3396D3] to-[#1C6EA4] blur-[30px]" />

                {/* inner dark span */}
                <span className="absolute top-[6px] left-[6px] right-[6px] bottom-[6px] bg-[rgba(79, 127, 215, 0.6)] z-[0] rounded-[1em] before:content-[''] before:absolute before:top-0 before:left-0 before:w-1/2 before:h-full before:bg-[rgba(110, 19, 246, 0.6)]" />

                {/* Left Side */}
                <div className="flex-1 max-w-md text-left md:text-left relative m-auto pb-[20px] md:p-6">
                  <p className="text-white-700 text-center leading-relaxed text-sm md:text-base font-medium mb-8">
                    We&apos;re just getting started! Join us on our journey to build something that the community will love.
                  </p>

                  <div className="flex justify-center md:justify-center gap-4 mb-8 w-[25%] m-auto">
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

                  <div className="text-sm md:text-base text-center md:text-center">
                    <span className="text-white-700 font-medium">Having issues? Write us at </span>
                    <span
                      onClick={() => {
                        navigator.clipboard.writeText("business.prepnerdz@gmail.com");
                        toast.success("Email copied to clipboard!");
                      }}
                      className="text-[#FCC61D] hover:text-blue-700 cursor-pointer hover:underline font-bold transition-colors duration-300"
                    >
                      business.prepnerdz@gmail.com
                    </span>
                  </div>
                </div>

              {/* Right Side Links */}
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 lg:gap-16 relative m-auto">
                <div className="text-center sm:text-left">
                  <h3 className="font-bold text-lg mb-4 text-white-900">Quick Links</h3>
                  <div className="space-y-3">
                    {quickLinks.map((link, index) => (
                      <div key={index}>
                        <Link
                          href={link.href}
                          {...(link.external && {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          })}
                          className="block text-white-700 hover:text-blue-600 transition-all duration-300 font-medium hover:translate-x-1 hover:font-semibold"
                        >
                          {link.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <h3 className="font-bold text-lg mb-4 text-white-900">Legal</h3>
                  <div className="space-y-3">
                    {legalLinks.map((link, index) => (
                      <div key={index}>
                        <Link
                          href={link.href}
                          className="block text-white-700 hover:text-blue-600 transition-all duration-300 font-medium hover:translate-x-1 hover:font-semibold"
                        >
                          {link.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            </div>
            <div className="flex justify-center mt-6 md:justify-center">
              <GithubStar />
            </div>

            {/* CountUp + Reviews */}
            <div className="text-center text-[#FFB22C] text-base font-medium mt-10">
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
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-white hover:scale-105 transition-transform"
                  >
                    <span className="text-yellow-400 text-sm">★★★★★</span>
                    <span>{review}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Thanks for Visiting */}
            <div className={`mt-8 text-center transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"
            }`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-2xl font-bold inline-block bg-gradient-to-r animate-bounce from-red-600 via-yellow-600 to-pink-600 bg-clip-text text-transparent mb-6">
                  Thanks for Visiting PrepNerdz!
                </h3>
              </motion.div>
            </div>

            {/* Copyright */}
            <div
              className={`mt-12 pt-8 border-t border-gray-200/60 transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="text-center text-sm text-[#FFB22C]">
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
    </div>
  );
};