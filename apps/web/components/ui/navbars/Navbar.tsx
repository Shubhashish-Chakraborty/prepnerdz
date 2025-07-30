"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github } from "@/icons/Github";
import { Down } from "@/icons/Down";
import { MenuBars } from "@/icons/MenuBars";
import { EnterDoor } from "@/icons/EnterDoor";
import { Button } from "../buttons/Button";
import { LoadingSpinner } from "@/icons/LoadingSpinner";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CloseCircle } from "@/icons/CloseCircle";
import { LoginModal } from "@/components/modals/Login";
import { SignupModal } from "@/components/modals/Signup";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileStudyMaterialOpen, setIsMobileStudyMaterialOpen] = useState(false);
  const [isMobilePYQOpen, setIsMobilePYQOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  // Check if user is authenticated
  useEffect(() => {
    const checkSession = async () => {
      setAuthLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`,
          { withCredentials: true }
        );
        if (response.data.message.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };
    checkSession();
  }, []);

  // Apply theme on load based on saved preference in localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const root = document.documentElement;
    if (storedTheme === "dark") {
      root.classList.add("dark-mode");
    } else {
      root.classList.remove("dark-mode");
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on window resize to desktop width
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

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

  // Toggle dark mode on <html> element
  const toggleDarkMode = () => {
    const root = document.documentElement;
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      root.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <>
      <header className="sticky top-2 sm:top-4 z-50 w-full px-2 sm:px-4">
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

        <nav className="mx-auto max-w-7xl rounded-xl sm:rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg navbar">
          <div className="flex h-16 sm:h-20 items-center justify-between px-3 sm:px-6">
            {/* Logo */}
            <Link href={"/"} className="flex-shrink-0">
              <Image
                src={"/prepnerdz-logo-zoomed.png"}
                alt="logo"
                width={150}
                height={150}
                className="hover:scale-105 transition-scale duration-500"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6 xl:space-x-8" ref={dropdownRef}>
              <div className="flex items-center space-x-1 xl:space-x-2">
                <Link
                  href="/"
                  className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 xl:px-4 py-2 text-base xl:text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                  onClick={closeAllDropdowns}
                >
                  <span className="hover:text-black hover:bg-amber-300 rounded-2xl p-1 transition-all duration-300 hover:scale-110">
                    Home
                  </span>
                </Link>

                <Link
                  href="/about"
                  className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 xl:px-4 py-2 text-base xl:text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                  onClick={closeAllDropdowns}
                >
                  <span className="hover:text-black hover:bg-amber-300 rounded-2xl p-1 transition-all duration-300 hover:scale-110">
                    About
                  </span>
                </Link>

                {/* StudyMaterial Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("studymaterial")}
                    className="cursor-pointer inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 xl:px-4 py-2 text-base xl:text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                  >
                    <span className="hover:text-black hover:bg-cyan-300 rounded-2xl p-1 transition-all duration-300 hover:scale-110">
                      Study Material
                    </span>
                    <Down className="size-4 xl:size-5 ml-1" />
                  </button>
                  {activeDropdown === "studymaterial" && (
                    <div className="absolute top-full left-0 mt-2 w-[280px] xl:w-[300px] rounded-lg border border-white/20 bg-white/95 backdrop-blur-md shadow-lg p-4 space-y-3 z-50">
                      {[
                        {
                          title: "Shivani PDFs",
                          description: "Comprehensive study materials and notes",
                        },
                        {
                          title: "IMP Questions",
                          description: "Important questions for exam preparation",
                        },
                        {
                          title: "IMP Topics",
                          description: "Get the most important topics unit wise",
                        },
                        {
                          title: "Best Academic Notes",
                          description: "High-quality academic notes and resources",
                        },
                        {
                          title: "Syllabus",
                          description: "Step-by-step manual solutions",
                        },
                        {
                          title: "Lab Manual",
                          description: "All Lab manual and their solutions",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="block cursor-pointer select-none space-y-1 rounded-md p-3 transition-colors hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => handleLinkClick()}
                        >
                          <div className="text-sm font-medium">{item.title}</div>
                          <p className="line-clamp-2 text-sm text-gray-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* PYQ'S Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown("pyqs")}
                    className="cursor-pointer inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 xl:px-4 py-2 text-base xl:text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                  >
                    <span className="hover:text-black hover:bg-cyan-300 rounded-2xl p-1 transition-all duration-300 hover:scale-110">
                      PYQ'S
                    </span>
                    <Down className="size-4 xl:size-5 ml-1" />
                  </button>
                  {activeDropdown === "pyqs" && (
                    <div className="absolute top-full left-0 mt-2 w-[280px] xl:w-[300px] rounded-lg border border-white/20 bg-white/95 backdrop-blur-md shadow-lg p-4 space-y-3 z-50">
                      {[
                        {
                          title: "Syllabus-wise PYQ",
                          description: "PYQs based on syllabus units",
                        },
                        {
                          title: "Complete PYQ",
                          description: "All PYQs from previous years",
                        },
                        {
                          title: "Previous Year Solution",
                          description: "Stepwise solved previous year papers",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="block cursor-pointer select-none space-y-1 rounded-md p-3 transition-colors hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => handleLinkClick()}
                        >
                          <div className="text-sm font-medium">{item.title}</div>
                          <p className="line-clamp-2 text-sm text-gray-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/about/contact"
                  className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 xl:px-4 py-2 text-base xl:text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                  onClick={closeAllDropdowns}
                >
                  <span className="hover:text-black hover:bg-amber-300 rounded-2xl p-1 transition-all duration-300 hover:scale-110">
                    Contact
                  </span>
                </Link>


              </div>
            </div>
                                    {/* Right side buttons */}
                        <div className="hidden md:flex lg:items-center lg:space-x-3 xl:space-x-4">
                            <Link
                                href="https://github.com/Shubhashish-Chakraborty/prepnerdz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-8 w-8 xl:h-9 xl:w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-900 transition-colors"
                            >
                                <Github className="size-8 hover:scale-110 transition-all duration-300" />
                                {/* <span className="sr-only">GitHub</span> */}
                            </Link>
                            {authLoading ? (
                                <Button
                                    text="Loading"
                                    endIcon={<LoadingSpinner className="size-5" />}
                                    colorVariant="yellow"
                                    sizeVariant="medium"
                                />
                            ) : isAuthenticated ? (
                                <Link href={"/dashboard"}>
                                    <Button
                                        text="Dashboard"
                                        endIcon={<EnterDoor className="size-6" />}
                                        sizeVariant="medium"
                                        colorVariant="blue"
                                    />
                                </Link>
                            ) : (
                                <Button
                                    text="Login"
                                    endIcon={<EnterDoor className="size-6" />}
                                    sizeVariant="medium"
                                    colorVariant="yellow"
                                    onClick={() => setIsLoginOpen(true)}
                                />
                            )}
                        </div>


            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-900 transition-colors"
              title="Toggle Theme"
            >
              🌙
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 hover:bg-white/20 text-gray-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <CloseCircle className="size-6" /> : <MenuBars className="size-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden rounded-b-2xl border-t border-white/20 bg-white/10 px-3 py-6 space-y-6">
              <Link
                href="/"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-white/20 hover:text-gray-900"
                onClick={closeMobileMenu}
              >
                Home
              </Link>

              <Link
                href="/about"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-white/20 hover:text-gray-900"
                onClick={closeMobileMenu}
              >
                About
              </Link>

              <button
                onClick={() => setIsMobileStudyMaterialOpen(!isMobileStudyMaterialOpen)}
                className=" dropdown-menu-item block flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-white/20 hover:text-gray-900"
              >
                Study Material
                <Down className={`size-4 transition-transform duration-300 ${isMobileStudyMaterialOpen ? "rotate-180" : ""}`} />
              </button>

              {isMobileStudyMaterialOpen && (
                <div className="space-y-2 pl-4">
                  {[
                    "Shivani PDFs",
                    "IMP Questions",
                    "IMP Topics",
                    "Best Academic Notes",
                    "Syllabus",
                    "Lab Manual",
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="dropdown-menu-item block w-full rounded-md px-3 py-2 text-left text-gray-900 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                      onClick={() => {
                        closeMobileMenu();
                        handleLinkClick();
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => setIsMobilePYQOpen(!isMobilePYQOpen)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-white/20 hover:text-gray-900"
              >
                PYQ'S
                <Down className={`size-4 transition-transform duration-300 ${isMobilePYQOpen ? "rotate-180" : ""}`} />
              </button>

              {isMobilePYQOpen && (
                <div className="space-y-2 pl-4">
                  {[
                    "Syllabus-wise PYQ",
                    "Complete PYQ",
                    "Previous Year Solution",
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="block w-full rounded-md px-3 py-2 text-left text-gray-900 hover:bg-white/20"
                      onClick={() => {
                        closeMobileMenu();
                        handleLinkClick();
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}

              <Link
                href="/about/contact"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-white/20 hover:text-gray-900"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
