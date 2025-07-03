"use client";
import { Navbar } from "../ui/Navbar"
import { motion } from "framer-motion";
import { BookOpenIcon, AcademicCapIcon, DocumentMagnifyingGlassIcon, ArrowDownTrayIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';


export const HomeLanding = () => {
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
                    <div className="min-h-screen text-gray-900">
                        {/* Hero Section */}
                        <section className="container mx-auto px-6 py-16 md:py-24 text-center">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                <span className="text-indigo-600">Master Your Semester</span> with PrepNerdz
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                               {`"Discover, Download, Dominate - Your Ultimate Academic Companion"`}
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a href="/signup" className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition font-medium">
                                    Get Started Free
                                </a>
                                <a href="#features" className="px-8 py-3 border border-gray-300 rounded-md hover:border-indigo-600 hover:text-indigo-600 transition font-medium">
                                    Explore Features
                                </a>
                            </div>
                        </section>

                        {/* Features Section */}
                        <section id="features" className="py-16">
                            <div className="container mx-auto px-6">
                                <h2 className="text-3xl font-bold text-center mb-12">Why PrepNerdz?</h2>
                                <div className="grid md:grid-cols-3 gap-8">
                                    <FeatureCard
                                        icon={<BookOpenIcon className="h-8 w-8" />}
                                        title="Comprehensive Resources"
                                        description="Access previous year papers, notes, and syllabus all in one place."
                                    />
                                    <FeatureCard
                                        icon={<DocumentMagnifyingGlassIcon className="h-8 w-8" />}
                                        title="Organized by Semester"
                                        description="Find exactly what you need with our branch-wise, semester-wise organization."
                                    />
                                    <FeatureCard
                                        icon={<ArrowDownTrayIcon className="h-8 w-8" />}
                                        title="Easy Downloads"
                                        description="One-click downloads with no redirects or annoying popups."
                                    />
                                    <FeatureCard
                                        icon={<ShieldCheckIcon className="h-8 w-8" />}
                                        title="Verified Content"
                                        description="All resources are verified by faculty and top students."
                                    />
                                    <FeatureCard
                                        icon={<AcademicCapIcon className="h-8 w-8" />}
                                        title="Bookmark & Save"
                                        description="Save your favorite resources for quick access later."
                                    />
                                    <FeatureCard
                                        icon={<AcademicCapIcon className="h-8 w-8" />}
                                        title="Contribute & Earn"
                                        description="Upload useful resources and get recognized in the community."
                                    />
                                </div>
                            </div>
                        </section>

                        {/* How It Works Section */}
                        <section id="how-it-works" className="py-16">
                            <div className="container mx-auto px-6">
                                <h2 className="text-3xl font-bold text-center mb-12">How PrepNerdz Works</h2>
                                <div className="grid md:grid-cols-3 gap-8">
                                    <StepCard
                                        step="1"
                                        title="Select Your Course"
                                        description="Choose your program (BTech, Diploma, etc.) and branch."
                                    />
                                    <StepCard
                                        step="2"
                                        title="Pick Your Semester"
                                        description="Navigate to your current semester."
                                    />
                                    <StepCard
                                        step="3"
                                        title="Access Resources"
                                        description="Find notes, question papers, and more for each subject."
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Testimonials */}
                        <section id="testimonials" className="py-16">
                            <div className="container mx-auto px-6">
                                <h2 className="text-3xl font-bold text-center mb-12">What Students Say</h2>
                                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                    <TestimonialCard
                                        quote="PrepNerdz saved me during exams! Found all previous year papers in one place."
                                        author="Rahul, CSE 3rd Year"
                                    />
                                    <TestimonialCard
                                        quote="The organized notes helped me understand concepts better than my textbooks."
                                        author="Priya, ECE 2nd Year"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* CTA Section */}
                        <section className="py-16 bg-indigo-600 text-white">
                            <div className="container mx-auto px-6 text-center">
                                <h2 className="text-3xl font-bold mb-6">Ready to Ace Your Exams?</h2>
                                <p className="text-xl mb-8 max-w-2xl mx-auto">
                                    Join thousands of students who are already using PrepNerdz to boost their grades.
                                </p>
                                <a href="/signup" className="px-8 py-3 bg-white text-indigo-600 rounded-md hover:bg-gray-100 transition font-medium inline-block">
                                    Get Started Now
                                </a>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>

    )
}
// Component for Feature Cards
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

// Component for How It Works Steps
function StepCard({ step, title, description }: { step: string, title: string, description: string }) {
    return (
        <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">{step}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

// Component for Testimonials
function TestimonialCard({ quote, author }: { quote: string, author: string }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                ))}
            </div>
            <blockquote className="text-lg italic mb-4">&apos;{quote}&apos;</blockquote>
            <p className="font-medium text-indigo-600">— {author}</p>
        </div>
    )
}