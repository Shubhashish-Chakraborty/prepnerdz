"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Github } from "@/icons/Github";
import { MenuBars } from "@/icons/MenuBars";
import { CloseCircle } from "@/icons/CloseCircle";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useAuthSession } from "@/hooks/useAuthSession";

/**
 * Navbar component - responsive navigation bar with dropdowns and auth buttons.
 *
 * Features:
 * - Desktop and mobile menu handling
 * - Dropdown menus with click outside to close
 * - Auth-aware buttons and routing
 * - Toast notifications on link click when accessing protected resources
 */
export const Navbar = () => {
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? ""; // Safe string fallback if null
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Authentication state from custom hook
  const { isAuthenticated, authLoading } = useAuthSession();

  // State for mobile menu open/close
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Tracks which dropdown is currently active/open
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // State to control login/signup modal visibility (not implemented here)
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  /**
   * Close dropdown menu when clicking outside of it.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Automatically close mobile menu if window resized to desktop width.
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Toggle dropdown menu by key. Clicking same dropdown closes it.
   * @param dropdown - dropdown identifier string
   */
  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  /** Close all dropdown menus */
  const closeAllDropdowns = () => setActiveDropdown(null);

  /** Toggle mobile menu open/close */
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  /**
   * Handle clicking on study material or PYQ links:
   * - If authenticated, navigate to dashboard and show success toast
   * - Else open login modal and show error toast
   */
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
      {/* Main Header */}
      <header className="sticky top-[20px] z-50 w-full flex justify-center items-center">
        <nav className="w-[80%] border border-white/20 bg-white/10 backdrop-blur-md shadow-lg rounded-full flex h-[1.5cm]">
          {/* Logo Section */}
          <div className="w-[15%] flex justify-center items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/prepnerdz-logo-zoomed.png"
                alt="logo"
                width={100}
                height={100}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="w-[65%] flex justify-start items-center border-l-2 border-white/20">
            <div
              className="hidden lg:flex lg:items-center lg:space-x-6 xl:space-x-8"
              ref={dropdownRef}
            >
              <Link
                href="/"
                onClick={closeAllDropdowns}
                className={`inline-flex h-9 items-center justify-center rounded-md px-3 xl:px-4 py-2 text-base ${
                  ["/about", "/contact-us"].includes(pathname)
                    ? "text-black"
                    : "text-white"
                }`}
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={closeAllDropdowns}
                className="inline-flex h-9 items-center justify-center rounded-md px-3 xl:px-4 py-2 text-base text-white"
              >
                About
              </Link>

              {/* Study Material Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("studymaterial")}
                  className="inline-flex h-9 items-center gap-2 rounded-md px-3 xl:px-4 py-2 text-base text-white cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "studymaterial"}
                >
                  Study Material <FaChevronDown />
                </button>
                {activeDropdown === "studymaterial" && (
                  <div className="absolute top-full left-0 mt-3 w-[250px] rounded-lg border border-white/30 bg-white/80 backdrop-blur-md shadow-lg p-4 space-y-3 z-50 cursor-pointer">
                    {[
                      "Shivani PDFs",
                      "IMP Questions",
                      "IMP Topics",
                      "Best Academic Notes",
                      "Syllabus",
                      "Lab Manual",
                    ].map((title, idx) => (
                      <div
                        key={idx}
                        onClick={handleLinkClick}
                        className="cursor-pointer rounded-md p-1 bg-white/30 border border-white/10 backdrop-blur-md shadow-lg"
                        role="menuitem"
                        tabIndex={0}
                      >
                        <div className="ml-4 text-md font-medium text-black">
                          {title}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PYQs Dropdown */}
              <div className="relative  ">
                <button
                  onClick={() => toggleDropdown("pyqs")}
                  className="inline-flex h-9 items-center gap-2 rounded-md px-3 xl:px-4 py-2 text-base text-white cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === "pyqs"}
                >
                  PYQ's <FaChevronDown />
                </button>
                {activeDropdown === "pyqs" && (
                  <div className="absolute top-full left-0 mt-3 w-[250px] rounded-lg border border-white/30 bg-white/80 backdrop-blur-md shadow-lg p-4 space-y-3 z-50">
                    {["Mid Term PYQ'S", "End Sem PYQ'S"].map((title, idx) => (
                      <div
                        key={idx}
                        onClick={handleLinkClick}
                        className="cursor-pointer  rounded-md p-1 bg-white/30 border border-white/10 backdrop-blur-md "
                        role="menuitem"
                        tabIndex={0}
                      >
                        <div className="ml-4 text-md font-medium text-black">
                          {title}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                onClick={closeAllDropdowns}
                className="inline-flex h-9 items-center justify-center rounded-md px-3 xl:px-4 py-2 text-base text-white cursor-pointer"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Authentication Buttons */}
          <div className="w-[20%] flex justify-end items-center gap-4 mr-5">
            <div className="hidden md:flex lg:items-center lg:space-x-3 xl:space-x-4">
              {authLoading ? (
                <button className="font-semibold text-white" disabled>
                  Loading...
                </button>
              ) : isAuthenticated ? (
                <Link href="/dashboard">
                  <button className="bg-gradient-to-b from-[#1B1B1B] to-white/30 px-4 py-2 text-white rounded-2xl font-semibold text-md backdrop-blur-md cursor-pointer">
                    Dashboard
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => setIsSignupOpen(true)}
                  className="font-semibold text-white cursor-pointer"
                >
                  Sign up
                </button>
              )}
            </div>

            <button
              onClick={() => setIsLoginOpen(true)}
              className="bg-gradient-to-b from-[#0059E7] to-white/30 px-4 py-2 text-white rounded-2xl font-semibold text-md backdrop-blur-md  cursor-pointer"
            >
              Sign in
            </button>
          </div>

          {/* Mobile Menu Icons */}
          <div className="flex h-16 sm:h-20 items-center justify-between px-3 sm:px-6 lg:hidden">
            <Link
              href="https://github.com/Shubhashish-Chakraborty/prepnerdz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="GitHub Repository"
            >
              <Github className="size-5" />
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <CloseCircle className="size-5 sm:size-6" />
              ) : (
                <MenuBars className="size-5 sm:size-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* TODO: Mobile menu JSX here */}
    </>
  );
};

export default Navbar;
