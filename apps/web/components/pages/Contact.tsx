'use client';
import Navbar from "../ui/navbars/Navbar";
import { motion } from "framer-motion";
import TypingText from "../ui/TypingTest";
import Image from "next/image";
import { Instagram } from "@/icons/Instagram";
import { X } from "@/icons/X";
import { Linkedin } from "@/icons/Linkedin";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Footer } from "../ui/Footer";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { MessageSend } from "@/icons/MessageSend";

export const ContactLanding = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/contact/to-db`, formData);
            if (response.status === 200) {
                toast.success("Thankss!, We'll get back to you within 48 hours!");
                setFormData({
                    fullName: "",
                    email: "",
                    contactNumber: "",
                    message: ""
                });
            }
        } catch (error) {
            toast.error("Server is down for now. Please try again.");
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-mainBgColor">
            {/* Background Animated Circles - More Subtle */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 1 }}
                    className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-red-300/80 blur-[80px] md:blur-[100px]"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute top-0 left-0 w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full bg-purple-500/40 blur-[40px] md:blur-[80px]"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute top-1/2 left-1/2 w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full bg-emerald-500/40 blur-[30px] md:blur-[60px] transform -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            {/* Main container */}
            <div className="relative z-10">
                <Navbar />

                {/* Main page content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl md:text-3xl font-extrabold mb-4">
                            <span className="bg-gradient-to-r from-red-600 via-black to-blue-600 bg-clip-text text-transparent">
                                <TypingText text="Get In Touch With Us"/>
                            </span>
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Have questions or want to learn more? Reach out to us and our team will get back to you as soon as possible.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Contact Information Card */}
                        <div className="w-full lg:w-2/5">
                            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Lets Get In Touch</h2>
                                    
                                    <div className="space-y-5">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-gray-100 p-3 rounded-full">
                                                <Mail className="text-blue-600 w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Email Address</h3>
                                                <p 
                                                    className="text-blue-600 font-bold cursor-pointer hover:underline mt-1"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText("business.prepnerdz@gmail.com");
                                                        toast.success('Email copied to clipboard!');
                                                    }}
                                                >
                                                    business.prepnerdz@gmail.com
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-start gap-4">
                                            <div className="bg-gray-100 p-3 rounded-full">
                                                <Phone className="text-blue-600 w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-700">Phone</h3>
                                                <p className="text-gray-600 mt-1">+91 86020 61128</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Connect With Us</h3>
                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => window.open("https://www.instagram.com/___shubhashish___")}
                                            className="bg-pink-100 cursor-pointer hover:-translate-y-1 hover:bg-pink-200 p-3 rounded-full transition-all duration-500"
                                            aria-label="Instagram"
                                        >
                                            <Instagram className="size-6 text-pink-600" />
                                        </button>
                                        
                                        <button 
                                            onClick={() => window.open("https://www.x.com/__Shubhashish__")}
                                            className="bg-black cursor-pointer hover:-translate-y-1 hover:bg-gray-800 p-3 rounded-full transition-all duration-500"
                                            aria-label="Twitter"
                                        >
                                            <X className="size-6 text-white" />
                                        </button>
                                        
                                        <button 
                                            onClick={() => window.open("https://www.linkedin.com/in/Shubhashish-Chakraborty")}
                                            className="bg-blue-100 cursor-pointer hover:-translate-y-1 hover:bg-blue-200 p-3 rounded-full transition-all duration-500"
                                            aria-label="LinkedIn"
                                        >
                                            <Linkedin className="size-6 text-blue-600" />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="text-center">
                                    <Link href={"/contact-us"}>
                                        <Image
                                            src={"/founders/shubhFull3.png"}
                                            alt="Shubh"
                                            width={300}
                                            height={300}
                                            className="rounded-xl shadow-md mx-auto w-full max-w-[250px] hover:scale-105 transition-transform duration-300"
                                        />
                                    </Link>
                                     <h3 onClick={() =>  {window.open("https://bento.me/imshubh")}} className="mt-6 text-2xl font-extrabold text-transparent cursor-pointer bg-clip-text bg-gradient-to-r from-black to-red-500 transition-all duration-300 hover:text-3xl hover:brightness-110">Shubhashish Chakraborty</h3>
                                    <p className="mt-3 text-sm text-gray-500">Founder & Developer</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Contact Form */}
                        <div className="w-full lg:w-3/5">
                            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-2 text-gray-800">Send Us a Message</h2>
                                    <p className="text-gray-600 mb-6">Fill out the form below and our team will get back to you within 48 hours.</p>
                                    
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your Name"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="Your Email"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="contactNumber"
                                                value={formData.contactNumber}
                                                onChange={handleChange}
                                                placeholder="Your Phone Number"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                                Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your message here..."
                                                rows={5}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                            ></textarea>
                                        </div>
                                        
                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all ${
                                                    isSubmitting 
                                                        ? "bg-gray-700 cursor-not-allowed" 
                                                        : "bg-gray-900 hover:bg-black"
                                                }`}
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center">
                                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Sending...
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-x-2 cursor-pointer">
                                                        Send Message
                                                        <MessageSend  />
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                
                                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                    <h3 className="font-bold animate-pulse text-blue-800 mb-2 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                                        </svg>
                                        What to expect next?
                                    </h3>
                                    <ul className="text-blue-700 list-disc pl-5 space-y-1">
                                        <li>Our team will review your message within 48 hours</li>
                                        <li>We&apos;ll contact you using the email or phone number provided</li>
                                        <li>All inquiries are handled with confidentiality</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <Footer />
                </div>
            </div>
        </div>
    );
};