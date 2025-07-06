"use client"

import axios from "axios";
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github } from "@/icons/Github"
import { Down } from "@/icons/Down"
import { MenuBars } from "@/icons/MenuBars"
import { Close } from "@/icons/Close"
import { EnterDoor } from "@/icons/EnterDoor"
import { LoginModal } from "@/components/modals/Login"
import { SignupModal } from "@/components/modals/Signup"
import { Button } from "../buttons/Button"
import { LoadingSpinner } from "@/icons/LoadingSpinner";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";

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
            toast.success("✅ Explore the resources here in Dashboard!");
        } else {
            toast.error("⚠️ You must login to access the resources!");
        }
    };

    return (
        <>
            <header className="sticky top-4 z-50 w-full px-4">
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
                <nav className="mx-auto max-w-7xl rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg">
                    <div className="flex h-20 items-center justify-between px-6">
                        {/* Logo */}
                        <Link href={"/"}>
                            <Image
                                src={"/prepnerdz-logo-zoomed.png"}
                                alt="logo"
                                width={150}
                                height={150}
                                className="hover:scale-105 transition-all duration-500"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-8" ref={dropdownRef}>
                            <div className="flex items-center space-x-2">
                                <Link
                                    href="/"
                                    className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                                    onClick={closeAllDropdowns}
                                >
                                    <span className="hover:text-black hover:bg-amber-300 rounded-2xl p-1 transition-all duration-300 hover:scale-110"> Home </span>
                                </Link>

                                <Link
                                    href="/about"
                                    className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                                    onClick={closeAllDropdowns}
                                >
                                    <span className="hover:text-black hover:bg-amber-300 rounded-2xl p-1 transition-all duration-300 hover:scale-110"> About </span>
                                </Link>

                                {/* StudyMaterial Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => toggleDropdown("studymaterial")}
                                        className="cursor-pointer inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                                    >
                                        <span className="hover:text-black hover:bg-cyan-300 rounded-2xl p-1 transition-all duration-300 hover:scale-110">
                                            StudyMaterial
                                        </span>
                                        <Down className="size-6" />
                                    </button>

                                    {activeDropdown === "studymaterial" && (
                                        <div className="absolute top-full left-0 mt-2 w-[300px] rounded-lg border border-white/20 bg-white/95 backdrop-blur-md shadow-lg p-4 space-y-3">
                                            {[
                                                {
                                                    title: "Shivani PDFs",
                                                    description: "Comprehensive study materials and notes",
                                                    href: "/study-material/shivani-pdfs",
                                                },
                                                {
                                                    title: "IMP Questions",
                                                    description: "Important questions for exam preparation",
                                                    href: "/study-material/imp-questions",
                                                },
                                                {
                                                    title: "Best Academic Notes",
                                                    description: "High-quality academic notes and resources",
                                                    href: "/study-material/academic-notes",
                                                },
                                                {
                                                    title: "Manual Solutions",
                                                    description: "Step-by-step manual solutions",
                                                    href: "/study-material/manual-solutions",
                                                },
                                            ].map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="block cursor-pointer select-none space-y-1 rounded-md p-3 transition-colors hover:bg-gray-100 hover:text-gray-900"
                                                    onClick={() => handleLinkClick()}
                                                >
                                                    <div className="text-sm font-medium">{item.title}</div>
                                                    <p className="line-clamp-2 text-sm text-gray-600">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* PYQ'S Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => toggleDropdown("pyqs")}
                                        className="cursor-pointer inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                                    >
                                        <span className="hover:text-black hover:bg-cyan-300 rounded-2xl p-1 transition-all duration-300 hover:scale-110">
                                            {"PYQ'S"}
                                        </span>
                                        <Down className="size-6" />
                                    </button>

                                    {activeDropdown === "pyqs" && (
                                        <div className="absolute top-full left-0 mt-2 w-[280px] rounded-lg border border-white/20 bg-white/95 backdrop-blur-md shadow-lg p-4 space-y-3">
                                            {[
                                                {
                                                    title: "End Sem PYQ'S",
                                                    description: "Previous year end semester questions",
                                                    href: "/pyqs/end-sem",
                                                },
                                                {
                                                    title: "Mid Term PYQ'S",
                                                    description: "Previous year mid-term questions",
                                                    href: "/pyqs/mid-term",
                                                },
                                            ].map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="block cursor-pointer select-none space-y-1 rounded-md p-3 transition-colors hover:bg-gray-100 hover:text-gray-900"
                                                    onClick={() => handleLinkClick()}
                                                >
                                                    <div className="text-sm font-medium">{item.title}</div>
                                                    <p className="line-clamp-2 text-sm text-gray-600">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <Link
                                    href="/contact"
                                    className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                                    onClick={closeAllDropdowns}
                                >
                                    <span className="hover:text-black hover:bg-amber-300 rounded-2xl p-1 transition-all duration-300 hover:scale-110"> Contact us </span>
                                </Link>
                            </div>
                        </div>

                        {/* Right side buttons */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-4">
                            <Link
                                href="https://github.com/Shubhashish-Chakraborty/prepnerdz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-900 transition-colors"
                            >
                                <Github className="size-8 hover:scale-110 transition-all duration-300" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            {authLoading ? (
                                <Button
                                    text="Loading"
                                    sizeVariant="medium"
                                    colorVariant="yellow"
                                    endIcon={<LoadingSpinner className="size-6" />}
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
                        <div className="lg:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-900 transition-colors"
                            >
                                {isMobileMenuOpen ? <Close /> : <MenuBars />}
                                <span className="sr-only">Toggle menu</span>
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={closeMobileMenu} />
                    <div className="fixed right-0 top-0 h-full w-[300px] bg-white/95 backdrop-blur-md border-l border-white/20 shadow-xl">
                        <div className="flex flex-col p-6 pt-20 space-y-4">
                            <Link
                                href="/"
                                className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors py-2"
                                onClick={closeMobileMenu}
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors py-2"
                                onClick={closeMobileMenu}
                            >
                                About
                            </Link>

                            {/* Mobile StudyMaterial Dropdown */}
                            <div>
                                <button
                                    onClick={() => setIsMobileStudyMaterialOpen(!isMobileStudyMaterialOpen)}
                                    className="flex items-center justify-between w-full text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors py-2"
                                >
                                    StudyMaterial
                                    <div className={`transform transition-transform ${isMobileStudyMaterialOpen ? "rotate-180" : ""}`}>
                                        <Down className="size-6" />
                                    </div>
                                </button>
                                {isMobileStudyMaterialOpen && (
                                    <div className="mt-2 space-y-2 pl-4">
                                        <Link
                                            href="/study-material/shivani-pdfs"
                                            className="block text-gray-700 hover:text-blue-600 transition-colors py-1"
                                            onClick={closeMobileMenu}
                                        >
                                            Shivani PDFs
                                        </Link>
                                        <Link
                                            href="/study-material/imp-questions"
                                            className="block text-gray-700 hover:text-blue-600 transition-colors py-1"
                                            onClick={closeMobileMenu}
                                        >
                                            IMP Questions
                                        </Link>
                                        <Link
                                            href="/study-material/academic-notes"
                                            className="block text-gray-700 hover:text-blue-600 transition-colors py-1"
                                            onClick={closeMobileMenu}
                                        >
                                            Best Academic Notes
                                        </Link>
                                        <Link
                                            href="/study-material/manual-solutions"
                                            className="block text-gray-700 hover:text-blue-600 transition-colors py-1"
                                            onClick={closeMobileMenu}
                                        >
                                            Manual Solutions
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Mobile PYQ'S Dropdown */}
                            <div>
                                <button
                                    onClick={() => setIsMobilePYQOpen(!isMobilePYQOpen)}
                                    className="flex items-center justify-between w-full text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors py-2"
                                >
                                    {"PYQ'S"}
                                    <div className={`transform transition-transform ${isMobilePYQOpen ? "rotate-180" : ""}`}>
                                        <Down className="size-6" />
                                    </div>
                                </button>
                                {isMobilePYQOpen && (
                                    <div className="mt-2 space-y-2 pl-4">
                                        <Link
                                            href="/pyqs/end-sem"
                                            className="block text-gray-700 hover:text-blue-600 transition-colors py-1"
                                            onClick={closeMobileMenu}
                                        >
                                            End Sem {"PYQ'S"}
                                        </Link>
                                        <Link
                                            href="/pyqs/mid-term"
                                            className="block text-gray-700 hover:text-blue-600 transition-colors py-1"
                                            onClick={closeMobileMenu}
                                        >
                                            Mid Term {"PYQ'S"}
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link
                                href="/contact"
                                className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors py-2"
                                onClick={closeMobileMenu}
                            >
                                Contact us
                            </Link>

                            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                                <Link
                                    href="https://github.com/Shubhashish-Chakraborty/prepnerdz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 transition-colors"
                                >
                                    <Github />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                                <Button text="Login" sizeVariant="medium" colorVariant="yellow" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
