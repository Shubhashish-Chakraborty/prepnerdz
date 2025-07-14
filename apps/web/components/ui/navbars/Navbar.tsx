"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Github } from "@/icons/Github";
import { Down } from "@/icons/Down";
import { MenuBars } from "@/icons/MenuBars";
import { EnterDoor } from "@/icons/EnterDoor";
import { CloseCircle } from "@/icons/CloseCircle";
import { Button } from "../buttons/Button";
import { LoadingSpinner } from "@/icons/LoadingSpinner";
import { LoginModal } from "@/components/modals/Login";
import { SignupModal } from "@/components/modals/Signup";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useAuthSession } from "@/hooks/useAuthSession";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, authLoading } = useAuthSession();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileStudyMaterialOpen, setIsMobileStudyMaterialOpen] = useState(false);
  const [isMobilePYQOpen, setIsMobilePYQOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeAllDropdowns = () => setActiveDropdown(null);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileStudyMaterialOpen(false);
    setIsMobilePYQOpen(false);
  };

  const handleLinkClick = () => {
    closeAllDropdowns();
    if (isAuthenticated) {
      router.push("/dashboard");
      toast.success("Explore the resources here in Dashboard!");
    } else {
      setIsLoginOpen(true);
      toast.error("You must login to access the resources!");
    }
  };

  return (
    <>
   <div className=" relative z-[100000]">
       {/* Modals */}
      <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSwitchToSignup={() => {
        setIsLoginOpen(false); setIsSignupOpen(true);
      }} />
      <SignupModal open={isSignupOpen} onClose={() => setIsSignupOpen(false)} onSwitchToLogin={() => {
        setIsSignupOpen(false); setIsLoginOpen(true);
      }} />
   </div>

      {/* Main Header */}
      <header className="sticky top-[20px] z-50 w-full flex justify-center items-center">
        <nav className="w-[80%] border border-white/20 bg-white/10 backdrop-blur-md shadow-lg rounded-full flex h-[1.5cm]">
          <div className="w-[15%] flex justify-center items-center">
            <Link href="/">
              <Image src="/prepnerdz-logo-zoomed.png" alt="logo" width={100} height={100} />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="w-[65%] flex justify-start items-center border-l-2 border-white/20">
            <div className="hidden lg:flex lg:items-center lg:space-x-6 xl:space-x-8" ref={dropdownRef}>
              <div className={`flex items-center space-x-1 xl:space-x-2 ${["/about", "/contact-us"].includes(pathname) ? "text-black" : "text-white"}`}>
                <Link href="/" onClick={closeAllDropdowns} className="inline-flex h-9 items-center justify-center rounded-md px-3 xl:px-4 py-2 text-base">Home</Link>
                <Link href="/about" onClick={closeAllDropdowns} className="inline-flex h-9 items-center justify-center rounded-md px-3 xl:px-4 py-2 text-base">About</Link>

                {/* Study Material */}
                <div className="relative">
                  <button onClick={() => toggleDropdown("studymaterial")} className="inline-flex h-9 items-center gap-2 rounded-md px-3 xl:px-4 py-2 text-base">
                    Study Material <FaChevronDown />
                  </button>
                  {activeDropdown === "studymaterial" && (
                    <div className="absolute top-full left-0 mt-3 w-[280px] xl:w-[350px] rounded-lg border border-white/30 bg-white/20 backdrop-blur-md shadow-lg p-4 space-y-3 z-50">
                      {[
                        { title: "Shivani PDFs", description: "Comprehensive study materials and notes" },
                        { title: "IMP Questions", description: "Important questions for exam preparation" },
                        { title: "IMP Topics", description: "Get the most important topics unit wise" },
                        { title: "Best Academic Notes", description: "High-quality academic notes and resources" },
                        { title: "Syllabus", description: "Step-by-step manual solutions" },
                        { title: "Lab Manual", description: "All Lab manual and their solutions" }
                      ].map((item, idx) => (
                        <div key={idx} onClick={handleLinkClick} className="cursor-pointer rounded-full p-1 bg-[#0788FD]/80 border border-white/30 backdrop-blur-md shadow-lg">
                          <div className="ml-10">
                            <div className="text-md font-medium">{item.title}</div>
                            <p className="line-clamp-1 text-md text-[#1B1B1B]">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* PYQs */}
                <div className="relative">
                  <button onClick={() => toggleDropdown("pyqs")} className="inline-flex h-9 items-center gap-2 rounded-md px-3 xl:px-4 py-2 text-base">
                    PYQ's <FaChevronDown />
                  </button>
                  {activeDropdown === "pyqs" && (
                    <div className="absolute top-full left-0 mt-3 w-[260px] xl:w-[350px] rounded-lg border border-white/30 bg-white/20 backdrop-blur-md shadow-lg p-4 space-y-3 z-50 text-white">
                      {[
                        { title: "Mid Term PYQ'S", description: "Previous year mid-term questions" },
                        { title: "End Sem PYQ'S", description: "Previous year end semester questions" }
                      ].map((item, idx) => (
                        <div key={idx} onClick={handleLinkClick} className="cursor-pointer rounded-full p-1 bg-[#0788FD]/80 border border-white/30 backdrop-blur-md shadow-lg">
                          <div className="ml-10">
                            <div className="text-md font-medium">{item.title}</div>
                            <p className="line-clamp-1 text-md text-[#1B1B1B]">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/contact-us" onClick={closeAllDropdowns} className="inline-flex h-9 items-center justify-center rounded-md px-3 xl:px-4 py-2 text-base">Contact</Link>
              </div>
            </div>
          </div>

          {/* Auth + Mobile Button */}
          <div className="w-[20%] flex justify-end items-center gap-10 mr-5">
            <div className="hidden md:flex lg:items-center lg:space-x-3 xl:space-x-4">
              {authLoading ? (
                <button className="font-semibold">Sign up</button>
              ) : isAuthenticated ? (
                <Link href="/dashboard">
                  <button className="bg-gradient-to-b from-[#1B1B1B] to-white/30 px-4 py-2 text-white rounded-2xl font-semibold text-md backdrop-blur-md">Dashboard</button>
                </Link>
              ) : (
                <button onClick={() => setIsSignupOpen(true)} className="font-semibold">Sign up</button>
              )}
            </div>

            <button onClick={() => setIsLoginOpen(true)} className="bg-gradient-to-b from-[#0059E7] to-white/30 px-4 py-2 text-white rounded-2xl font-semibold text-md backdrop-blur-md">
              Sign in
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex h-16 sm:h-20 items-center justify-between px-3 sm:px-6 lg:hidden">
            <Link href="https://github.com/Shubhashish-Chakraborty/prepnerdz" target="_blank" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-900">
              <Github className="size-5" />
            </Link>
            <button onClick={toggleMobileMenu} className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              {isMobileMenuOpen ? <CloseCircle className="size-5 sm:size-6" /> : <MenuBars className="size-5 sm:size-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu remains unchanged */}
      {/* ... (your mobile menu code continues exactly as you have it) */}
    </>
  );
};

export default Navbar;
