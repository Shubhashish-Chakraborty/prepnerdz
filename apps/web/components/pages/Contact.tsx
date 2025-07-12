'use client';
import Navbar from "../ui/navbars/Navbar"
import { motion } from "framer-motion";
import TypingText from "../ui/TypingTest";
import Image from "next/image";
import { Instagram } from "@/icons/Instagram";
import { X } from "@/icons/X";
import { Linkedin } from "@/icons/Linkedin";
import InputStraightLine from "../ui/inputs/InputStarightLine";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Button } from "../ui/buttons/Button";
import { Footer } from "../ui/Footer";
import { MessageSend } from "@/icons/MessageSend";
import Link from "next/link";

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
                toast.success("Thankss!, We'll get back to you within 24 hours!");
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
                    <div className="mt-10 md:mt-20 flex flex-col md:flex-row justify-center md:justify-around items-center md:items-start gap-10">
                        {/* Left Side - Contact Info */}
                        <div className="w-full md:w-auto flex flex-col items-center md:items-start">
                            <div className="text-3xl md:text-5xl font-extrabold text-center md:text-left">
                                <TypingText text="Lets Get In Touch!" />
                            </div>

                            <div className="mt-5 flex flex-col items-center md:items-start">
                                <div className="mt-5 mb-8 flex flex-wrap justify-center gap-4 md:gap-8 md:justify-start">
                                    <div
                                        onClick={() => { window.open("https://www.instagram.com/___shubhashish___") }}
                                        className="flex flex-col items-center cursor-pointer font-bold hover:underline"
                                    >
                                        Instagram
                                        <Instagram className="size-8 text-pink-600" />
                                    </div>

                                    <div
                                        onClick={() => { window.open("https://www.x.com/__Shubhashish__") }}
                                        className="flex flex-col items-center cursor-pointer font-bold hover:underline"
                                    >
                                        X(Twitter)
                                        <X className="size-8" />
                                    </div>

                                    <div
                                        onClick={() => { window.open("https://www.linkedin.com/in/Shubhashish-Chakraborty") }}
                                        className="flex flex-col items-center cursor-pointer font-bold hover:underline"
                                    >
                                        LinkedIn
                                        <Linkedin className="size-8 text-blue-600" />
                                    </div>
                                </div>

                                <Link href={"/contact-us"}>
                                    <Image
                                        src={"/founders/shubhFull3.png"}
                                        alt="Shubh"
                                        width={350}
                                        height={350}
                                        className="hover:rotate-10 transition-all duration-300 cursor-pointer w-[250px] md:w-[350px]"
                                    />
                                </Link>

                                <div className="mt-6 text-base md:text-lg font-bold text-center md:text-left">
                                    Or just reach out manually to{' '}
                                    <span
                                        onClick={() => {
                                            navigator.clipboard.writeText("business.prepnerdz@gmail.com");
                                            toast.success('Email copied to clipboard!');
                                        }}
                                        className="text-blue-600 cursor-pointer hover:underline"
                                    >
                                        business.prepnerdz@gmail.com
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="w-full md:w-auto">
                            <div className="text-center text-xl md:text-2xl lg:text-3xl font-bold italic mb-6">
                                <TypingText text="Have a message for us? drop here!" />
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto md:mx-0">
                                <div className="flex flex-col md:flex-row gap-6 md:gap-20">
                                    <InputStraightLine
                                        id="fullName"
                                        label="Full Name *"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required

                                    />
                                    <InputStraightLine
                                        type="email"
                                        id="email"
                                        label="Email Address *"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col gap-6">
                                    <InputStraightLine
                                        type="tel"
                                        id="contactNumber"
                                        label="Phone Number"
                                        value={formData.contactNumber}
                                        onChange={handleChange}

                                    />

                                    <InputStraightLine
                                        id="message"
                                        label="Message *"
                                        value={formData.message}
                                        onChange={handleChange}
                                        textarea
                                        rows={5}
                                        required

                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <Button
                                            text="Sending..."
                                            disabled={true}
                                            endIcon={<MessageSend />}
                                            colorVariant="black_green"
                                            sizeVariant="medium"
                                        />
                                    ) : (
                                        <Button
                                            text="Send Message"
                                            endIcon={<MessageSend />}
                                            colorVariant="black_green"
                                            sizeVariant="medium"
                                        />
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <Footer />
                </div>
            </div>
        </div>
    )
}