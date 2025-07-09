"use client"

import { motion } from "framer-motion";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import axios from "axios";
import { Back } from "@/icons/Back";
import Navbar from "@/components/ui/navbars/Navbar";
import { Button } from "@/components/ui/buttons/Button";
import InputBulged from "@/components/ui/inputs/InputBulged";
import { Phone } from "@/icons/Phone";
import { toast } from "react-hot-toast";

export default function ChangeContactPage() {
    const router = useRouter();
    const [contact, setContact] = useState('');
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
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

    const handleUpdateContact = async () => {
        if (!contact) {
            showNotification('Please enter a new contact number', 'error');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/update-contact`, { contact }, { withCredentials: true });
            console.log(response.data);
            router.push('/dashboard');
            toast.success('Contact Number Updated Successfully!');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showNotification(error.response?.data?.message || 'Something went wrong. Please try again later.', 'error');
            } else {
                showNotification('An unexpected error occurred.', 'error');
            }
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

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <Navbar />
                <div className="mt-10">
                    <Button text="Back" colorVariant="black_green" sizeVariant="small" startIcon={<Back className="size-6" />} onClick={() => router.push("/dashboard")} />
                </div>
                <div className="flex flex-col justify-center mt-10 space-y-10 items-center">


                    <div className="animate-pulse text-red-400 font-extrabold text-xl md:text-5xl">
                        Update Your Contact Number!
                    </div>

                    <div className="w-full flex justify-center items-center max-w-md space-y-4">
                        <div className="space-y-6">
                            <InputBulged
                                name="contact number"
                                type="contact number"
                                value={contact}
                                icon={<Phone className="size-6" />}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder="Enter new Number"
                            />
                            <div className="flex space-x-5">
                                <Button
                                    onClick={handleUpdateContact}
                                    disabled={loading}
                                    sizeVariant="medium"
                                    colorVariant="blue"
                                    text={loading ? 'Updating...' : 'Update'}
                                >
                                </Button>
                                <Button
                                    text="Back to Dashboard"
                                    colorVariant="black_yellow"
                                    sizeVariant="medium"
                                    onClick={() => router.push('/dashboard')}
                                >
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}