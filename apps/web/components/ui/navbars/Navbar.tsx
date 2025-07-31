"use client"

import axios from "axios";
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github } from "@/icons/Github"
import { Down } from "@/icons/Down"
import { MenuBars } from "@/icons/MenuBars"
import { EnterDoor } from "@/icons/EnterDoor"
import { Button } from "../buttons/Button"
import { LoadingSpinner } from "@/icons/LoadingSpinner";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CloseCircle } from "@/icons/CloseCircle";
import { LoginModal } from "@/components/modals/Login";
import { SignupModal } from "@/components/modals/Signup";

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [isMobileStudyMaterialOpen, setIsMobileStudyMaterialOpen] = useState(false)
    const [isMobilePYQOpen, setIsMobilePYQOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
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
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true,
                });
                if (response.data.message.isAuthenticated) {
                    setIsAuthenticated(true);
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

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Close mobile menu when window is resized to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const toggleDropdown = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
    }

    const closeAllDropdowns = () => {
        setActiveDropdown(null)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
        setIsMobileStudyMaterialOpen(false)
        setIsMobilePYQOpen(false)
    }

    const handleLinkClick = () => {
        closeAllDropdowns();
        if (isAuthenticated) {
            router.push('/dashboard');
            toast.success("Explore the resources here in Dashboard!");
        } else {
            setIsLoginOpen(true);
            toast.error("You must login to access the resources!");
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

                <nav className="mx-auto max-w-7xl rounded-xl sm:rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg">
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

                                <Link
                                    href="/leaderboard"
                                    className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 xl:px-4 py-2 text-base xl:text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                                    onClick={closeAllDropdowns}
                                >
                                    <span className="hover:text-black hover:bg-amber-300 rounded-2xl p-1 transition-all duration-300 hover:scale-110">
                                        Leaderboard
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
                                                    description: "All Lab manual and there solutions",
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
                                            {"PYQ'S"}
                                        </span>
                                        <Down className="size-4 xl:size-5 ml-1" />
                                    </button>
                                    {activeDropdown === "pyqs" && (
                                        <div className="absolute top-full left-0 mt-2 w-[260px] xl:w-[280px] rounded-lg border border-white/20 bg-white/95 backdrop-blur-md shadow-lg p-4 space-y-3 z-50">
                                            {[
                                                {
                                                    title: "Mid Term PYQ'S",
                                                    description: "Previous year mid-term questions",
                                                },
                                                {
                                                    title: "End Sem PYQ'S",
                                                    description: "Previous year end semester questions",
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
                                    href="/contact-us"
                                    className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 xl:px-4 py-2 text-base xl:text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                                    onClick={closeAllDropdowns}
                                >
                                    <span className="hover:text-black hover:bg-amber-300 rounded-2xl p-1 transition-all duration-300 hover:scale-110">
                                        Contact us
                                    </span>
                                </Link>
                                
                                <Link
                                    href="/contributors"
                                    className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-3 xl:px-4 py-2 text-base xl:text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                                    onClick={closeAllDropdowns}
                                >
                                    <span className="hover:text-black hover:bg-purple-300 rounded-2xl p-1 transition-all duration-300 hover:scale-110">
                                        Contributors
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

                        {/* Mobile menu button */}
                        <div className="flex items-center space-x-2 md:space-x-3 lg:hidden">
                            {/* Mobile GitHub link */}
                            <Link
                                href="https://github.com/Shubhashish-Chakraborty/prepnerdz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-900 transition-colors md:hidden"
                            >
                                <Github className="size-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>

                            <button
                                onClick={toggleMobileMenu}
                                className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-900 transition-colors touch-manipulation"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <CloseCircle className="size-5 sm:size-6" /> : <MenuBars className="size-5 sm:size-6" />}
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={closeMobileMenu} aria-hidden="true" />
                    <div className="fixed right-0 top-0 h-full w-[280px] sm:w-[320px] bg-white/95 backdrop-blur-md border-l border-white/20 shadow-xl overflow-y-auto">
                        <div className="flex flex-col p-4 sm:p-6 pt-16 sm:pt-20 space-y-3 sm:space-y-4">
                            <Link
                                href="/"
                                className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors py-2 px-2 rounded-md hover:bg-gray-100 touch-manipulation"
                                onClick={closeMobileMenu}
                            >
                                Home
                            </Link>

                            <Link
                                href="/about"
                                className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors py-2 px-2 rounded-md hover:bg-gray-100 touch-manipulation"
                                onClick={closeMobileMenu}
                            >
                                About
                            </Link>

                            {/* Mobile StudyMaterial Dropdown */}
                            <div>
                                <button
                                    onClick={() => setIsMobileStudyMaterialOpen(!isMobileStudyMaterialOpen)}
                                    className="flex items-center justify-between w-full text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors py-2 px-2 rounded-md hover:bg-gray-100 touch-manipulation"
                                >
                                    Study Material
                                    <div
                                        className={`transform transition-transform duration-200 ${isMobileStudyMaterialOpen ? "rotate-180" : ""}`}
                                    >
                                        <Down className="size-5" />
                                    </div>
                                </button>
                                {isMobileStudyMaterialOpen && (
                                    <div className="mt-2 space-y-1 pl-4 border-l-2 border-gray-200">
                                        {[
                                            { title: "Shivani PDFs" },
                                            { title: "IMP Questions" },
                                            { title: "IMP Topics" },
                                            { title: "Best Academic Notes" },
                                            { title: "Syllabus" },
                                            { title: "Lab Manual" },
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                className="block text-gray-700 hover:text-blue-600 transition-colors py-2 px-2 rounded-md hover:bg-gray-50 touch-manipulation"
                                                onClick={handleLinkClick}
                                            >
                                                {item.title}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Mobile PYQ'S Dropdown */}
                            <div>
                                <button
                                    onClick={() => setIsMobilePYQOpen(!isMobilePYQOpen)}
                                    className="flex items-center justify-between w-full text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors py-2 px-2 rounded-md hover:bg-gray-100 touch-manipulation"
                                >
                                    {"PYQ'S"}
                                    <div className={`transform transition-transform duration-200 ${isMobilePYQOpen ? "rotate-180" : ""}`}>
                                        <Down className="size-5" />
                                    </div>
                                </button>
                                {isMobilePYQOpen && (
                                    <div className="mt-2 space-y-1 pl-4 border-l-2 border-gray-200">
                                        <div
                                            className="block text-gray-700 hover:text-blue-600 transition-colors py-2 px-2 rounded-md hover:bg-gray-50 touch-manipulation"
                                            onClick={handleLinkClick}
                                        >
                                            Mid Term {"PYQ'S"}
                                        </div>
                                        <div
                                            className="block text-gray-700 hover:text-blue-600 transition-colors py-2 px-2 rounded-md hover:bg-gray-50 touch-manipulation"
                                            onClick={handleLinkClick}
                                        >
                                            End Sem {"PYQ'S"}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/contact-us"
                                className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors py-2 px-2 rounded-md hover:bg-gray-100 touch-manipulation"
                                onClick={closeMobileMenu}
                            >
                                Contact us
                            </Link>

                            {/* Mobile Auth Section */}
                            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                                <div className="hidden md:flex items-center space-x-4">
                                    <Link
                                        href="https://github.com/Shubhashish-Chakraborty/prepnerdz"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 transition-colors"
                                    >
                                        <Github className="size-5" />
                                        <span className="sr-only">GitHub</span>
                                    </Link>
                                </div>

                                {authLoading ? (
                                    <Button
                                        text="Loading"
                                        endIcon={<LoadingSpinner className="size-6" />}
                                        sizeVariant="medium"
                                        colorVariant="yellow"
                                        onClick={() => setIsLoginOpen(true)}
                                    />
                                ) : isAuthenticated ? (
                                    <Link href={"/dashboard"} className="w-full">

                                        <Button
                                            text="Dashboard"
                                            endIcon={<EnterDoor className="size-6" />}
                                            sizeVariant="medium"
                                            colorVariant="blue"
                                            onClick={() => setIsLoginOpen(true)}
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
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
