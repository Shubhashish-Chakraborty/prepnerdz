'use client';
import { Github } from "@/icons/Github";
import Navbar from "../ui/navbars/Navbar"
import { motion } from "framer-motion";
import { BookOpen } from "@/icons/BookOpen";


export const AboutLanding = () => {
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
                     <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">About PrepNerdz</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The ultimate academic companion for college students - where finding study materials stops being a struggle!
        </p>
      </div>

      {/* What We Do Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <Github className="h-10 w-10 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Centralized Academic Resources</h3>
            <p className="text-gray-600">
              PrepNerdz brings together all your study materials - previous year papers, subject notes, lab manuals, and syllabus - 
              in one organized platform. No more scavenging through WhatsApp groups or begging seniors for files!
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <BookOpen className="h-10 w-10 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Semester-Wise Organization</h3>
            <p className="text-gray-600">
              Everything is neatly categorized by course, branch, and semester. Whether you&apos;re in CSE Semester 3 or Mechanical Semester 5, 
              you&apos;ll find exactly what you need in seconds.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features */}
      {/* <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Students Love PrepNerdz</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* How It Works */}
      {/* <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">How PrepNerdz Works</h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 rounded-full h-10 w-10 flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-bold">{index + 1}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Call to Action */}
      <div className="bg-indigo-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Ready to boost your grades?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of students who are already acing their exams with PrepNerdz
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition">
          Get Started Now
        </button>
      </div>
    </div>
                </div>
            </div>
        </div>
    )
}
