"use client"

import { motion } from "framer-motion";
import { useRouter } from "next/navigation"
import { useState } from "react";
import axios from "axios";
import { Back } from "@/icons/Back";
import Navbar from "@/components/ui/navbars/Navbar";
import { Button } from "@/components/ui/buttons/Button";
import InputBulged from "@/components/ui/inputs/InputBulged";
import { Email } from "@/icons/Email";
import { OtpDot } from "@/icons/OtpDot";
import { Key } from "@/icons/Key";
import { LoginModal } from "@/components/modals/Login";
import { SignupModal } from "@/components/modals/Signup";


export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // 1: email input, 2: OTP and new password
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    

    const handleSendOtp = async () => {
        if (!email) {
            showNotification('Please enter your email', 'error');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/send-otp-for-forgot-password`, { email });
            showNotification(response.data.message, 'success');
            setStep(2);
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

    const handleResetPassword = async () => {
        if (!otp || !newPassword || !confirmPassword) {
            showNotification('Please fill all fields', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/reset-password`, {
                email,
                otpEntered: otp,
                newPassword
            });
            showNotification(response.data.message, 'success');
            setTimeout(() => router.push('/'), 2000);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showNotification(error.response?.data?.message || 'Something went wrong. Please try again later.', 'error');
            } else {
                showNotification('An unexpected error occurred.', 'error');
            }
            // const errorMessage = error.response?.data?.message || "Something went wrong. Please try again later.";
            // showNotification(errorMessage, 'error');
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
                    <Button text="Back" colorVariant="black_green" sizeVariant="small" startIcon={<Back className="size-6"/>} onClick={() => router.push("/")} />
                </div>
                <div className="flex flex-col justify-center mt-10 space-y-10 items-center">


                    <div className="animate-pulse text-red-400 font-extrabold text-xl md:text-5xl">
                        Reset Your Password!
                    </div>

                    {step === 1 ? (
                        <div className="w-full flex justify-center items-center max-w-md space-y-4">
                            <div className="space-y-6">
                                <InputBulged
                                    name="email"
                                    type="email"
                                    value={email}
                                    icon={<Email className="size-6" />}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email"
                                />
                                <div className="flex justify-center space-x-5">
                                    <Button
                                        onClick={handleSendOtp}
                                        disabled={loading}
                                        sizeVariant="medium"
                                        colorVariant="blue"
                                        text={loading ? 'Sending OTP...' : 'Send OTP'}
                                    >
                                    </Button>
                                    <Button
                                        text="Back to Login"
                                        colorVariant="black_yellow"
                                        sizeVariant="medium"
                                        onClick={() => { 
                                            setIsLoginOpen(true)
                                            
                                        }}
                                    >
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full max-w-md space-y-4">
                            <InputBulged
                                name="otp"
                                value={otp}
                                type="text"
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                icon={<OtpDot className="size-6" />}
                            />
                            <InputBulged
                                name="newPassword"
                                value={newPassword}
                                icon={<Key className="size-6" />}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type="password"
                                placeholder="New Password"
                            />
                            <InputBulged
                                name="confirmPassword"
                                value={confirmPassword}
                                icon={<Key className="size-6" />}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                placeholder="Confirm New Password"
                            />
                            <Button
                                onClick={handleResetPassword}
                                disabled={loading}
                                colorVariant="black_green"
                                sizeVariant="medium"
                                text={loading ? 'Resetting Password...' : 'Reset Password'}
                            >
                            </Button>
                            <Button
                                onClick={() => setStep(1)}
                                colorVariant="black_green"
                                text="Back to Email"
                                sizeVariant="medium"
                            >
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}