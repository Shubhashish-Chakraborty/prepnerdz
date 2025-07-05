"use client"

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

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [isMobileStudyMaterialOpen, setIsMobileStudyMaterialOpen] = useState(false)
    const [isMobilePYQOpen, setIsMobilePYQOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);

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
                                    <span className="hover:text-black hover:bg-amber-300 rounded-2xl p-1 transition-all duration-300 hover:-translate-y-1"> Home </span>
                                </Link>

                                <Link
                                    href="/about"
                                    className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                                    onClick={closeAllDropdowns}
                                >
                                    <span className="hover:text-black hover:bg-amber-300 rounded-2xl p-1 transition-all duration-300 hover:-translate-y-1"> About </span>
                                </Link>

                                {/* StudyMaterial Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => toggleDropdown("studymaterial")}
                                        className="cursor-pointer inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                                    >
                                        <span className="hover:text-black hover:bg-cyan-300 rounded-2xl p-1 transition-all duration-300 hover:-translate-y-1"> StudyMaterial </span>
                                        <Down className="size-6" />
                                    </button>

                                    {activeDropdown === "studymaterial" && (
                                        <div className="absolute top-full left-0 mt-2 w-[300px] rounded-lg border border-white/20 bg-white/95 backdrop-blur-md shadow-lg p-4 space-y-3">
                                            <Link
                                                href="/study-material/shivani-pdfs"
                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                                                onClick={closeAllDropdowns}
                                            >
                                                <div className="text-sm font-medium leading-none">Shivani PDFs</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                                                    Comprehensive study materials and notes
                                                </p>
                                            </Link>
                                            <Link
                                                href="/study-material/imp-questions"
                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                                                onClick={closeAllDropdowns}
                                            >
                                                <div className="text-sm font-medium leading-none">IMP Questions</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                                                    Important questions for exam preparation
                                                </p>
                                            </Link>
                                            <Link
                                                href="/study-material/academic-notes"
                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                                                onClick={closeAllDropdowns}
                                            >
                                                <div className="text-sm font-medium leading-none">Best Academic Notes</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                                                    High-quality academic notes and resources
                                                </p>
                                            </Link>
                                            <Link
                                                href="/study-material/manual-solutions"
                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                                                onClick={closeAllDropdowns}
                                            >
                                                <div className="text-sm font-medium leading-none">Manual Solutions</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-gray-600">Step-by-step manual solutions</p>
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* PYQ'S Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => toggleDropdown("pyqs")}
                                        className="cursor-pointer inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                                    >
                                        <span className="hover:text-black hover:bg-cyan-300 rounded-2xl p-1 transition-all duration-300 hover:-translate-y-1"> {"PYQ'S"} </span>
                                        <Down className="size-6" />
                                    </button>

                                    {activeDropdown === "pyqs" && (
                                        <div className="absolute top-full left-0 mt-2 w-[280px] rounded-lg border border-white/20 bg-white/95 backdrop-blur-md shadow-lg p-4 space-y-3">
                                            <Link
                                                href="/pyqs/end-sem"
                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                                                onClick={closeAllDropdowns}
                                            >
                                                <div className="text-sm font-medium leading-none">End Sem {"PYQ'S"}</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                                                    Previous year end semester questions
                                                </p>
                                            </Link>
                                            <Link
                                                href="/pyqs/mid-term"
                                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                                                onClick={closeAllDropdowns}
                                            >
                                                <div className="text-sm font-medium leading-none">Mid Term {"PYQ'S"}</div>
                                                <p className="line-clamp-2 text-sm leading-snug text-gray-600">
                                                    Previous year mid-term questions
                                                </p>
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                <Link
                                    href="/contact"
                                    className="inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-lg font-medium text-gray-900 transition-colors hover:bg-white/20 hover:text-gray-900 focus:bg-white/20 focus:text-gray-900 focus:outline-none"
                                    onClick={closeAllDropdowns}
                                >
                                    <span className="hover:text-black hover:bg-amber-300 rounded-2xl p-1 transition-all duration-300 hover:-translate-y-1"> Contact us </span>
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
                            <Button text="Login" endIcon={<EnterDoor className="size-6"/>} sizeVariant="medium" colorVariant="yellow" onClick={() => setIsLoginOpen(true)} />
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
