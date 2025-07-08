"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import TypingText from "../ui/TypingTest";
import { Button } from "../ui/buttons/Button";
import { Input } from "../ui/inputs/InputSimple";
import { Card } from "../ui/cards/HeroCards";
import { BookOpen } from "@/icons/BookOpen";
import { Search } from "@/icons/Search";
import { Users } from "@/icons/Users";
import { Target } from "@/icons/Target";
import { Download } from "@/icons/Download";
import { Bookmark } from "@/icons/Bookmark";
import { Upload } from "@/icons/Upload";
import { ShieldColored } from "@/icons/Shield";
import Navbar from "../ui/navbars/Navbar";
import { Footer } from "../ui/Footer";
import ProfileSimple from "../ui/cards/ProfileSimple";
import { LoginModal } from "../modals/Login";
import { SignupModal } from "../modals/Signup";
import Link from "next/link";
import LandingHero from "../ui/cards/HeroCard";
import { ThanksForVisit } from "../ui/ThanksForVisit";
import { EnterDoor } from "@/icons/EnterDoor";
import { Globe } from "@/icons/Globe";


export const HomeLanding = () => {
    const [searchQuery, setSearchQuery] = useState("");
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
                    <div className="min-h-screen bg-gradient-to-br">

                        {/* Hero Section */}
                        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                                {/* Left Column - Text Content */}
                                <div className="space-y-6 animate-fade-in-up">
                                    <div className="space-y-4">
                                        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
                                            <span className="text-[#ffbf23] backdrop-blur-md cursor-pointer bg-black rounded-3xl p-2">
                                                <TypingText text="Notes? Papers? Materials?" typeSpeed={100} />
                                            </span>
                                            <br />
                                            <span className="text-gray-900">
                                                Welcome to {' '}
                                                <span className="font-bold bg-gradient-to-r from-red-600 via-black-500 to-purple-900 bg-clip-text text-transparent">
                                                    PrepNerdz
                                                </span>
                                            </span>
                                        </h1>
                                        <p className="text-lg md:text-xl text-black font-bold italic max-w-2xl">
                                            {`
                                                "No more "Does anyone have…?" messages.
                                                No more dead-end Google searches.
                                                Just the right resources, when you need them."
                                            `}
                                        </p>
                                    </div>

                                    {/* Search Box - Mobile */}
                                    <div className="lg:hidden">
                                        <div className="relative">
                                            <Search className="size-6" />
                                            <Input
                                                type="text"
                                                placeholder="Search for notes, papers, syllabus..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="pl-10 pr-4 py-3 text-base border-2 border-gray-200 focus:border-indigo-500 rounded-lg"
                                            />
                                            <Button sizeVariant="large" colorVariant="black_green" text="Search" />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button colorVariant="black_green" sizeVariant="medium" text="Get Started" endIcon={<EnterDoor className="size-6"/>} onClick={() => setIsSignupOpen(true)} />
                                        <Link href={"/about"}>
                                            <Button colorVariant="yellow" sizeVariant="medium" endIcon={<Globe className="size-6"/>} text="Explore Features" />
                                        </Link>

                                    </div>

                                    {/* Trust Indicators */}
                                    <div className="flex items-center space-x-6 pt-4">
                                        <div className="flex items-center space-x-2">
                                            <Users className="size-6" />
                                            <span className="text-sm text-gray-600">500+ Students</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <ShieldColored className="size-6 text-green-500" />
                                            <span className="text-sm text-gray-600">Verified Content</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Search Box Desktop */}
                                <div className="hidden lg:block">


                                    <Card className="p-6 shadow-xl border-0 backdrop-blur-sm">
                                        <div className="space-y-4">
                                            <div className="text-center">
                                                <h3 className="text-xl font-semibold mb-2">Find Your Resources</h3>
                                                <p className="text-gray-600 text-sm">Search from thousands of verified academic materials</p>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                    <Input
                                                        type="text"
                                                        placeholder="Search for notes, papers, syllabus..."
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        className="pl-10 pr-4 py-3 text-base border-2 border-gray-200 focus:border-indigo-500 rounded-lg"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-2 gap-2">
                                                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:outline-none">
                                                        <option>Select Branch</option>
                                                        <option>Computer Science</option>
                                                        <option>Electronics</option>
                                                        <option>Mechanical</option>
                                                        <option>Civil</option>
                                                    </select>
                                                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-indigo-500 focus:outline-none">
                                                        <option>Semester</option>
                                                        <option>1st Semester</option>
                                                        <option>2nd Semester</option>
                                                        <option>3rd Semester</option>
                                                        <option>4th Semester</option>
                                                    </select>
                                                </div>
                                                <div className="flex justify-center">
                                                    <Button sizeVariant="small" colorVariant="black_green" text="Search Resources" />
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </section>


                        {/* Features Section */}
                        <section id="features" className="py-16">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PrepNerdz?</h2>
                                    <p className="text-black max-w-2xl mx-auto">
                                        Everything you need to excel in your academics
                                    </p>
                                </div>

                                <div className="flex flex-row flex-wrap gap-10 items-center justify-center">
                                    <LandingHero
                                        icon={<BookOpen className="size-6" />}
                                        title="Comprehensive Resources"
                                        description="Access previous year papers, notes, and syllabus all in one place."
                                    />
                                    <LandingHero
                                        icon={<Target className="size-6" />}
                                        title="Organized by Semester"
                                        description="Find exactly what you need with our branch-wise, semester-wise organization."
                                    />
                                    <LandingHero
                                        icon={<Download className="size-6" />}
                                        title="Easy Downloads"
                                        description="One-click downloads with no redirects or annoying popups."
                                    />
                                    <LandingHero
                                        icon={<ShieldColored className="h-6 w-6" />}
                                        title="Verified Content"
                                        description="All resources are verified by faculty and top students."
                                    />
                                    <LandingHero
                                        icon={<Bookmark className="size-6 ml-2" />}
                                        title="Bookmark & Save"
                                        description="Save your favorite resources for quick access later."
                                    />
                                    <LandingHero
                                        icon={<Upload className="size-6 mr-2" />}
                                        title="Contribute and shine"
                                        description="Add value to the platform and get recognized in the community."
                                    />
                                </div>
                            </div>
                        </section>

                        {/* How It Works Section */}
                        <section id="how-it-works" className="py-16">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How to use PrepNerdz?</h2>
                                    <p className="text-gray-600 max-w-2xl mx-auto"> Get started in just 3 simple steps</p>
                                </div>
                                <div className="grid md:grid-cols-3 gap-8">
                                    <StepCard
                                        step="1"
                                        title="Select Your Course and Branch"
                                        description="Choose your program (BTech, etc.) and branch."
                                    />
                                    <StepCard
                                        step="2"
                                        title="Pick Your Semester"
                                        description="Navigate to your current semester and find relevant subjects."
                                    />
                                    <StepCard
                                        step="3"
                                        title="Access Resources"
                                        description="Download notes, question papers, and study materials instantly."
                                    />
                                </div>

                                <div className="text-center mt-8 text-black font-extrabold text-3xl mb-10 animate-bounce">
                                    Watch the video below before getting started! and know how to use PrepNerdz Effectively!
                                </div>
                                <div className="flex justify-center">
                                    {/* <iframe width="660" height="415" src="https://www.youtube.com/embed/p5rl5JK8Z4Y?si=BPYArJllrLpdnlNd" title="YouTube video player" allowfullscreen></iframe> */}
                                    <video width={600} height={600} controls />
                                </div>
                            </div>
                        </section>


                        <section id="resources" className="py-16">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the founders and Developers</h2>
                                    <p className="text-gray-600">Developers</p>
                                </div>

                                <div className="flex items-center space-x-40 justify-center">
                                    <div>
                                        <ThanksForVisit />
                                    </div>
                                    <ProfileSimple x="https://x.com/__Shubhashish__" instagram="https://www.instagram.com/___shubhashish___" github="https://www.github.com/Shubhashish-Chakraborty" linkedin="https://www.linkedin.com/in/Shubhashish-Chakraborty" name="Shubhashish Chakraborty" image="/founders/shubh.png" mail="shubhashish147@gmail.com" />
                                    <div>
                                        <ThanksForVisit />
                                    </div>
                                </div>

                                <div className="mt-10 space-x-10 flex flex-wrap items-center  justify-center">
                                    <ThanksForVisit />
                                    <div>
                                        <ProfileSimple x="https://x.com/MokshMishra1111" instagram="https://www.instagram.com/iammokshmishra" github="https://github.com/MokshMishra" linkedin="https://www.linkedin.com/in/moksh-mishra-956868289/" name="Moksh Mishra" image="/founders/moksh.png" mail="mokshmishra1418@gmail.com" />
                                    </div>
                                    <div>
                                        <ProfileSimple x="https://x.com/yadav_nihalll" instagram="https://www.instagram.com/Nihaaalll_29" linkedin="https://www.linkedin.com/in/Nihal-yadav2" name="Nihal Yadav" image="/founders/nihal.png" mail="yadavnihal544@gmail.com" />
                                    </div>
                                    <ThanksForVisit />
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>

        </div>

    )
}


// Step Card Component
const StepCard = ({ step, title, description }: { step: string; title: string; description: string }) => (
    <div className="text-center group">
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-amber-300 text-black rounded-full text-xl font-bold group-hover:scale-110 transition-transform duration-300">
            {step}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
)