"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import TypingText from "../ui/TypingTest";
import { Button } from "../ui/buttons/Button";
import { Input } from "../ui/inputs/InputSimple";
import { Card, CardContent } from "../ui/cards/HeroCards";
import { BookOpen } from "@/icons/BookOpen";
import { Search } from "@/icons/Search";
import { Users } from "@/icons/Users";
import { Target } from "@/icons/Target";
import { Download } from "@/icons/Download";
import { Bookmark } from "@/icons/Bookmark";
import { Upload } from "@/icons/Upload";
import { ShieldColored } from "@/icons/Shield";
import ProfileCard from "../ui/cards/ProfileCard";
import Navbar from "../ui/navbars/Navbar";
import { Footer } from "../ui/Footer";


export const HomeLanding = () => {
    const [searchQuery, setSearchQuery] = useState("");
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
                                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                                            {`"Discover, Download, Dominate - Your Ultimate Academic Companion"`}
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
                                        <Button colorVariant="black_green" sizeVariant="medium" text="Get Started" />
                                        <Button colorVariant="yellow" sizeVariant="medium" text="Explore Features" />

                                    </div>

                                    {/* Trust Indicators */}
                                    <div className="flex items-center space-x-6 pt-4">
                                        <div className="flex items-center space-x-2">
                                            <Users className="size-6" />
                                            <span className="text-sm text-gray-600">500+ Students</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Star className="h-5 w-5 text-yellow-500" filled={true} />
                                            <span className="text-sm text-gray-600">4.9/5 Rating</span>
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

                                            {/* <div className="pt-2">
                                                <p className="text-xs text-gray-500 text-center">Popular searches:</p>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    <Badge variant="secondary" className="text-xs">
                                                        Data Structures
                                                    </Badge>
                                                    <Badge variant="secondary" className="text-xs">
                                                        Physics Notes
                                                    </Badge>
                                                    <Badge variant="secondary" className="text-xs">
                                                        Previous Papers
                                                    </Badge>
                                                </div>
                                            </div> */}
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
                                    <p className="text-black max-w-2xl mx-auto">
                                        No more wasting time in scrolling WhatsApp, asking for resources , all your study resources in one place!
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <FeatureCard
                                        icon={<BookOpen className="size-6" />}
                                        title="Comprehensive Resources"
                                        description="Access previous year papers, notes, and syllabus all in one place."
                                    />
                                    <FeatureCard
                                        icon={<Target className="size-6" />}
                                        title="Organized by Semester"
                                        description="Find exactly what you need with our branch-wise, semester-wise organization."
                                    />
                                    <FeatureCard
                                        icon={<Download className="size-6" />}
                                        title="Easy Downloads"
                                        description="One-click downloads with no redirects or annoying popups."
                                    />
                                    <FeatureCard
                                        icon={<ShieldColored className="h-6 w-6" />}
                                        title="Verified Content"
                                        description="All resources are verified by faculty and top students."
                                    />
                                    <FeatureCard
                                        icon={<Bookmark className="size-6 ml-2" />}
                                        title="Bookmark & Save"
                                        description="Save your favorite resources for quick access later."
                                    />
                                    <FeatureCard
                                        icon={<Upload className="size-6 mr-2" />}
                                        title="Contribute & Earn"
                                        description="Upload useful resources and get recognized in the community."
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
                                <div className="flex justify-center">
                                    {/* <iframe width="660" height="415" src="https://www.youtube.com/embed/p5rl5JK8Z4Y?si=BPYArJllrLpdnlNd" title="YouTube video player" allowfullscreen></iframe> */}
                                    <video width={600} height={600} controls />
                                </div>
                                {/* <div className="grid md:grid-cols-3 gap-8">
                                    <StepCard
                                        step="1"
                                        title="Select Your Course"
                                        description="Choose your program (BTech, Diploma, etc.) and branch."
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
                                </div> */}
                            </div>
                        </section>


                        <section id="resources" className="py-16">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the founders and Developers</h2>
                                    <p className="text-gray-600">Developers</p>
                                </div>

                                <div className="flex justify-center">
                                    <ProfileCard website="https://imshubh.site" mailid="shubhashish147@gmail.com" github="https://github.com/Shubhashish-Chakraborty" linkedin="https://linkedin.com/in/Shubhashish-Chakraborty" instagram="https://www.instagram.com/___shubhashish___" name="Shubhashish Chakraborty" about="Lead Developer" image="/developers/shubh.png" />
                                </div>
                            </div>
                        </section>

                        {/* Testimonials */}
                        <section id="testimonials" className="py-16">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center mb-12">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4">What Students Say</h2>
                                    <p className="text-gray-600">Join thousands of successful students</p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                    <TestimonialCard
                                        quote="PrepNerdz saved me during exams! Found all previous year papers in one place."
                                        author="Rahul, CSE 3rd Year"
                                    />
                                    <TestimonialCard
                                        quote="The organized notes helped me understand concepts better than my textbooks."
                                        author="Priya, ECE 2nd Year"
                                    />
                                    <TestimonialCard
                                        quote="Amazing platform! The search feature makes finding resources so easy."
                                        author="Amit, Mechanical 4th Year"
                                    />
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


// Custom Badge Component
// const Badge = ({
//     children,
//     variant = "default",
//     className = "",
//     ...props
// }: {
//     children: React.ReactNode
//     variant?: "default" | "secondary"
//     className?: string
//     // [key: string]: any
// }) => {
//     const variants = {
//         default: "bg-indigo-100 text-indigo-800",
//         secondary: "bg-gray-100 text-gray-800",
//     }

//     return (
//         <span
//             className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
//             {...props}
//         >
//             {children}
//         </span>
//     )
// }


const Star = ({ className = "h-6 w-6", filled = false }: { className?: string; filled?: boolean }) => (
    <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
    </svg>
)

// Feature Card Component
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
        <CardContent className="p-6 text-center cursor-pointer">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg group-hover:bg-amber-400 group-hover:text-white transition-colors duration-300">
                {icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
        </CardContent>
    </Card>
)

// Step Card Component
// const StepCard = ({ step, title, description }: { step: string; title: string; description: string }) => (
//     <div className="text-center group">
//         <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full text-xl font-bold group-hover:scale-110 transition-transform duration-300">
//             {step}
//         </div>
//         <h3 className="text-xl font-semibold mb-2">{title}</h3>
//         <p className="text-gray-600">{description}</p>
//     </div>
// )

// Testimonial Card Component
const TestimonialCard = ({ quote, author }: { quote: string; author: string }) => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
            <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400" filled={true} />
                ))}
            </div>
            <p className="text-gray-700 mb-4 italic">&apos;{quote}&apos;</p>
            <p className="font-semibold text-indigo-600">- {author}</p>
        </CardContent>
    </Card>
)

// Stat Card Component
// const StatCard = ({ number, label }: { number: string; label: string }) => (
//     <div className="text-center">
//         <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">{number}</div>
//         <div className="text-gray-600">{label}</div>
//     </div>
// )

// // Resource Card Component
// const ResourceCard = ({ title, downloads, type }: { title: string; downloads: string; type: string }) => (
//     <Card className="hover:shadow-md transition-shadow duration-300">
//         <CardContent className="p-4">
//             <div className="flex items-start justify-between mb-2">
//                 <h4 className="font-medium text-sm">{title}</h4>
//                 <Badge variant="secondary" className="text-xs">
//                     {type}
//                 </Badge>
//             </div>
//             <div className="flex items-center text-xs text-gray-500">
//                 <Download className="h-3 w-3 mr-1" />
//                 {downloads} downloads
//             </div>
//         </CardContent>
//     </Card>
// )