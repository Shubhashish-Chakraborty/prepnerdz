'use client';
import Navbar from "../ui/navbars/Navbar";
import { motion } from "framer-motion";
import TypingText from "../ui/TypingTest";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Footer } from "../ui/Footer";
import { MessageSend } from "@/icons/MessageSend";
import { Upload } from "@/icons/Upload";
import { Star } from "@/icons/Star";
import { Close } from "@/icons/Close";

export const FeedbackLanding = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        category: '',
        rating: 0,
        title: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
    const [hoveredRating, setHoveredRating] = useState(0);

    const categories = [
        { value: 'BUG', label: '🐛 Bug Report', description: 'Report a technical issue or bug' },
        { value: 'SUGGESTION', label: '💡 Suggestion', description: 'Share ideas for improvement' },
        { value: 'CONTENT_ISSUE', label: '📄 Content Issue', description: 'Report problems with study materials' },
        { value: 'GENERAL', label: '📝 General Feedback', description: 'General comments about the platform' },
        { value: 'MENTORSHIP', label: '👨‍🏫 Mentorship', description: 'Feedback about mentorship experience' }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleRatingChange = (rating: number) => {
        setFormData(prev => ({
            ...prev,
            rating
        }));
    };

    const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error("Screenshot must be less than 5MB");
                return;
            }
            
            if (!file.type.startsWith('image/')) {
                toast.error("Please upload an image file");
                return;
            }

            setScreenshot(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setScreenshotPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeScreenshot = () => {
        setScreenshot(null);
        setScreenshotPreview(null);
    };

    const uploadScreenshot = async (file: File): Promise<string> => {
        // For now, we'll use a placeholder. In production, you'd upload to Cloudinary or similar
        // This is a simplified version - you might want to implement actual file upload
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let screenshotUrl = null;
            if (screenshot) {
                screenshotUrl = await uploadScreenshot(screenshot);
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/feedback/submit`, {
                ...formData,
                screenshot: screenshotUrl
            });

            if (response.status === 200) {
                toast.success("Thank you for your feedback! We'll review it and get back to you soon.");
                setFormData({
                    fullName: "",
                    email: "",
                    category: "",
                    rating: 0,
                    title: "",
                    description: ""
                });
                setScreenshot(null);
                setScreenshotPreview(null);
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(errorMessage);
            console.error("Feedback submission error:", error);
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
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-3xl font-extrabold mb-4">
                            <span className="bg-gradient-to-r from-red-600 via-black to-blue-600 bg-clip-text text-transparent">
                                <TypingText text="Share Your Feedback"/>
                            </span>
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Help us improve PrepNerdz! Share your thoughts, report issues, or suggest new features. Your feedback is invaluable to us.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-2 text-gray-800">Tell Us What You Think</h2>
                                <p className="text-gray-600 mb-6">Your feedback helps us make PrepNerdz better for everyone.</p>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Basic Information */}
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
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Your Email (for follow-up)"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Category Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Feedback Category *
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {categories.map((category) => (
                                                <button
                                                    key={category.value}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                                                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                                                        formData.category === category.value
                                                            ? 'border-blue-500 bg-blue-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                                >
                                                    <div className="font-medium text-gray-800">{category.label}</div>
                                                    <div className="text-sm text-gray-600 mt-1">{category.description}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Rating System */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Overall Rating (Optional)
                                        </label>
                                        <div className="flex items-center gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => handleRatingChange(star)}
                                                    onMouseEnter={() => setHoveredRating(star)}
                                                    onMouseLeave={() => setHoveredRating(0)}
                                                    className="transition-transform hover:scale-110"
                                                >
                                                    <Star 
                                                        className={`w-8 h-8 ${
                                                            star <= (hoveredRating || formData.rating)
                                                                ? 'text-yellow-400 fill-current'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                            <span className="ml-3 text-sm text-gray-600">
                                                {formData.rating > 0 ? `${formData.rating}/5` : 'Click to rate'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title and Description */}
                                    <div>
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                            Feedback Title *
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                            placeholder="Brief title for your feedback"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                            Detailed Description *
                                        </label>
                                        <textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                            placeholder="Please provide detailed information about your feedback..."
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    {/* Screenshot Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Screenshot (Optional)
                                        </label>
                                        <p className="text-sm text-gray-600 mb-3">
                                            If you're reporting a bug or issue, please include a screenshot to help us understand the problem better.
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Upload className="w-8 h-8 mb-2 text-gray-500" />
                                                        <p className="mb-2 text-sm text-gray-500">
                                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                                        </p>
                                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleScreenshotUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                            
                                            {screenshotPreview && (
                                                <div className="relative inline-block">
                                                    <img
                                                        src={screenshotPreview}
                                                        alt="Screenshot preview"
                                                        className="max-w-xs rounded-lg border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeScreenshot}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                                    >
                                                        <Close />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
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
                                                    Submitting...
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    Submit Feedback
                                                    <MessageSend />
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            
                            {/* Information Box */}
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                <h3 className="font-bold text-blue-800 mb-2 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                                    </svg>
                                    What happens next?
                                </h3>
                                <ul className="text-blue-700 list-disc pl-5 space-y-1">
                                    <li>We review all feedback within 24-48 hours</li>
                                    <li>If you provided an email, we&apos;ll follow up with updates</li>
                                    <li>Your feedback helps us prioritize improvements</li>
                                    <li>We may reach out for more details if needed</li>
                                </ul>
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