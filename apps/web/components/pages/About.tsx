'use client';

import Navbar from "../ui/navbars/Navbar"
import { motion } from "framer-motion";
import { BookOpen } from "@/icons/BookOpen";
import TypingText from "../ui/TypingTest";
import { InfiniteMovingCards } from "../ui/cards/InfiniteMoving";
import { BookClose } from "@/icons/BookClose";
import { Flask } from "@/icons/Flask";
import { Star } from "@/icons/Star";
import { Rocket } from "@/icons/Rocket";
import { User } from "@/icons/User";
import { Database } from "@/icons/Database";
import { Paper } from "@/icons/Paper";
import { Download } from "@/icons/Download";
import Link from "next/link";
import { Button } from "../ui/buttons/Button";
import { Footer } from "../ui/Footer";
import { useState } from "react";
import { LoginModal } from "../modals/Login";
import { SignupModal } from "../modals/Signup";

const features = [
    {
        text: "Important questions, Important Topics & reference books",
        icon: <Star className="size-6" />,
        className: "bg-purple-50 border-purple-200"
    },
    {
        text: "Subject notes (Faculty & Topper-curated)",
        icon: <BookOpen className="size-6" />,
        className: "bg-blue-50 border-blue-200"
    },
    {
        text: "RGPV Previous year papers (Mid-Sem & End-Sem)",
        icon: <BookClose className="size-6" />,
    },
    {
        text: "Lab manuals",
        icon: <Flask className="size-6" />,
        className: "bg-green-50 border-green-200"
    },
    {
        text: "Career Advancement",
        icon: <Rocket className="size-6" />,
        className: "bg-orange-50 border-orange-200"
    },
];

const features2 = [
    {
        text: "Student/faculty accounts with role-based access",
        icon: <User className="size-6" />,
        className: "bg-black border-cyan-200 text-amber-400"
    },
    {
        text: "Branches → Semesters → Subjects: Hierarchical organization",
        icon: <Database className="size-6" />,
        className: "bg-black border-cyan-200 text-amber-400"
    },
    {
        text: "Files (PDFs/DOCs) with metadata (type, year, uploader)",
        icon: <Paper className="size-6" />,
        className: "bg-black border-cyan-200 text-amber-400"
    },
    {
        text: "Bookmarks/Downloads for Tracking student activity",
        icon: <Download className="size-6" />,
        className: "bg-black border-cyan-200 text-amber-400"
    },
]

export const AboutLanding = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    return (
        <div className="relative min-h-screen bg-mainBgColor">
            {/* Background Animated Circles */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
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

                {/* Main page content starts here in this div!!! */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                        {/* Hero Section */}
                        <div className="text-center mb-16">
                            <span className="bg-gradient-to-r text-2xl md:text-4xl text-center font-extrabold from-red-600 via-black to-blue-600 bg-clip-text text-transparent decoration-cyan-800 cursor-pointer hover:underline">
                                <TypingText text="Why PrepNerdz exists?" />
                            </span>
                            <p className="text-lg md:text-xl text-black font-bold mt-4 max-w-3xl mx-auto">
                                College students waste countless hours wandering WhatsApp groups, requesting seniors, or digging through disorganized drives for study materials and all. PrepNerdz solves this chaos by providing a centralized and organized repository of:
                            </p>

                            <InfiniteMovingCards
                                items={features}
                                direction="left"
                                speed="slow"
                                pauseOnHover={true}
                                className="my-12"
                            />


                        </div>

                        {/* What We Do Section */}
                        <div className="mb-16 text-center">
                            <span className="bg-gradient-to-r text-2xl md:text-4xl text-center font-extrabold from-red-600 via-black to-blue-600 bg-clip-text text-transparent decoration-cyan-800 cursor-pointer hover:underline">
                                What we do .?
                            </span>
                            <div className="grid mt-5 md:grid-cols-2 gap-8">
                                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                                    <div className="flex justify-center">
                                        <Database className="size-10 text-indigo-600 mb-4" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">Centralized Academic Resources</h3>
                                    <p className="text-black">
                                        PrepNerdz brings together all your study materials - previous year papers, subject notes, lab manuals, and syllabus -
                                        in one organized platform. No more scavenging through WhatsApp groups or begging seniors for files!
                                    </p>
                                </div>

                                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                                    <div className="flex justify-center">
                                        <BookOpen className="size-10 text-indigo-600 mb-4" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">Semester-Wise Organization</h3>
                                    <p className="text-black">
                                        Everything is neatly categorized by course, branch, and semester. Whether you&apos;re in CSE Semester 3 or Mechanical Semester 4,
                                        you&apos;ll find exactly what you need in seconds.
                                    </p>
                                </div>
                            </div>
                            <InfiniteMovingCards
                                items={features2}
                                direction="left"
                                speed="slow"
                                pauseOnHover={true}
                                className="my-12"
                            />

                            {/* Community Story Section */}
                        <div className="my-12 px-4 md:px-0 max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
                              About PrepNerdz
                            </h2>
                            <p className="text-zinc-700 text-lg mb-4">
                              <strong>PrepNerdz</strong> is a student-led community built to empower tomorrow’s developers with hands-on experience in tech, open source, and real-world collaboration.
                            </p>

                            <p className="text-zinc-700 text-lg mb-4">
                               We started with a simple goal: to eliminate the chaos of scattered resources and provide students with a one-stop platform where everything — from notes to projects — is organized and accessible. No more random Google Drive folders or WhatsApp forwards.
                            </p>

                             <p className="text-zinc-700 text-lg mb-4">
                              Through open-source projects, curated study material, mentorship, and events like GSSoC and Hacktoberfest, PrepNerdz helps you learn by doing — not just reading.
                            </p>

                             <p className="text-zinc-700 text-lg mb-4">
                              If you're someone who’s tired of passive learning and ready to build, ship, and grow in public — welcome home.
                            </p>

                             <p className="text-red-600 text-lg font-semibold italic mt-6">
                              PrepNerdz — Shaping Tomorrow’s Developers.
                            </p>
                        </div>


                            <div className="text-xl md:text-2xl font-black">
                                Wanna Know more? <Link target="_blank" href={"https://github.com/Shubhashish-Chakraborty/prepnerdz/blob/main/apps/backend/prisma/schema.prisma"}> <span className="font-bold text-blue-600 hover:underline" > Check out the Database Structure/Schema </span> </Link>
                            </div>
                        </div>



                        {/* Call to Action */}
                        <div className="bg-cyan-200 rounded-xl p-8 text-center">
                            <h2 className="text-2xl font-bold text-black mb-4">Ready to boost your grades?</h2>
                            <p className="text-black mb-6 max-w-2xl mx-auto">
                                Join thousands of students who are already acing their exams with PrepNerdz
                            </p>
                            <div className="flex justify-center">
                                <Button text="Get Started Now" onClick={() => setIsSignupOpen(true)} endIcon={<Rocket className="size-6" />} sizeVariant="medium" colorVariant="black_green" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <Footer />
                </div>
            </div>
        </div>
    )
}
