"use client"

import { motion } from "framer-motion";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Close } from "@/icons/Close";
import { Button } from "@/components/ui/buttons/Button";
import { Back } from "@/icons/Back";
import { Cloud } from "@/icons/Cloud";
import { ArrowUp } from "@/icons/ArrowUp";

export default function UploadAvatar() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        console.log("Welcome to PrepNerdz!");
    }, [isAuthenticated, authLoading]);

    // Checking authentication status
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true
                });
                setIsAuthenticated(response.status === 200);
            } catch (error) {
                console.error("Authentication check failed:", error);
                setIsAuthenticated(false);
                router.push("/");
            } finally {
                setAuthLoading(false);
            }
        };

        checkAuth();
    }, [router]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                showNotification("File size should be less than 5MB", "error");
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    };

    const uploadImage = async () => {
        if (!selectedFile) {
            showNotification("Please select an image first", "error");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/avatar/upload`, formData, {
                withCredentials: true
            });

            console.log(response.data);
            showNotification("Image uploaded successfully!", "success");
            // Clear the file after successful upload
            removeFile();
            // Redirecting the user to the dashboard after successfully uploading the image
            router.push("/dashboard");
        } catch (error) {
            console.error("Upload error:", error);
            showNotification("Failed to upload image", "error");
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    return (
        <div className="relative min-h-screen bg-mainBgColor overflow-hidden">
            {/* Notification Popup */}
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${notification.type === 'success'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                        }`}
                >
                    {notification.message}
                </motion.div>
            )}

            {/* Fixed glow effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1 }}
                    className="absolute animate-pulse bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-pink-600/30 blur-[80px] md:blur-[150px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1.2 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute animate-pulse top-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-cyan-500/20 blur-[60px] md:blur-[120px]"
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 2.4 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute animate-pulse top-1/2 left-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-red-500/20 blur-[50px] md:blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            <div className="relative z-10 text-white container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-10">
                    <Button text="Back" colorVariant="black_green" sizeVariant="small" endIcon={<Back className="size-6" />} onClick={() => router.push("/dashboard")} />
                </div>

                {/* Image Upload Section */}
                <div className="max-w-md text-black mx-auto mt-20 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                    <h2 className="text-2xl font-bold mb-6 text-center">Set Profile Image</h2>

                    {/* Drag and Drop Area */}
                    <div className="mb-6">
                        <label
                            htmlFor="file-upload"
                            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer 
                                ${previewUrl ? 'border-green-400' : 'border-gray-300 hover:border-gray-400'}`}
                        >
                            {previewUrl ? (
                                <div className="relative w-full h-full">
                                    <Image
                                        src={previewUrl}
                                        alt="preview"
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-contain rounded-lg"
                                    />
                                    {/* <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-full object-contain rounded-lg"
                                    /> */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile();
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 rounded-full p-1 hover:bg-red-600"
                                    >
                                        <Close />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Cloud />
                                    <p className="mb-2 text-sm text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        PNG, JPG, JPEG (MAX. 5MB)
                                    </p>
                                </div>
                            )}
                            <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/png, image/jpeg, image/jpg"
                            />
                        </label>
                    </div>

                    <div className="flex justify-center">
                        {/* Upload Button */}
                        <Button
                            text={loading ? "Uploading..." : "Upload Image"}
                            colorVariant="blue"
                            disabled={loading}
                            sizeVariant="medium"
                            onClick={uploadImage}
                            startIcon={<ArrowUp />}
                        >
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}