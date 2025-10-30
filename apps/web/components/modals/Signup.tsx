import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from "../ui/buttons/Button";

import TypingText from "../ui/TypingTest";
import InputBulged from "../ui/inputs/InputBulged";
import GoogleAuthBtn from "../ui/buttons/GoogleAuth";
import GithubAuthBtn from "../ui/buttons/GithubAuth";
import { CloseCircle } from '@/icons/CloseCircle';
import { User } from '@/icons/User';
import { Email } from '@/icons/Email';
import { Key } from '@/icons/Key';
import { EnterDoor } from '@/icons/EnterDoor';
import { OtpDot } from '@/icons/OtpDot';
import { Tick } from '@/icons/Tick';
import { Phone } from '@/icons/Phone';

interface SignupProps {
    open: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export const SignupModal = ({ open, onClose, onSwitchToLogin }: SignupProps) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword : '',
        contact: ''
    });
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        if (open) {
            document.addEventListener("keydown", handleKeyDown);
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, onClose]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Basic validation
            if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
                toast.error('Please fill all fields');
                setIsLoading(false);
                return;
            }

            if(formData.password != formData.confirmPassword){
                toast.error('Passwords do not match');
                setIsLoading(false);
                return;
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/signup`,
                formData
            );

            // Debug log removed

            if (response.data.success) {
                toast.success('OTP sent to your email!');
                setShowOtpInput(true); // This should trigger the OTP input to show
            } else {
                toast.error(response.data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error); // Debug log
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'An error occurred during signup');
            } else {
                toast.error('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!otp) {
                toast.error('Please enter OTP');
                setIsLoading(false);
                return;
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/verify-mail`,
                {
                    otpEntered: otp,
                    email: formData.email
                }
            );

            // Debug log removed

            if (response.data.success) {
                toast.success('Email verified successfully! Please login');
                onClose();
                onSwitchToLogin();
            } else {
                toast.error(response.data.message || 'Verification failed');
            }
        } catch (error) {
            console.error('Verification error:', error); // Debug log
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'An error occurred during verification');
            } else {
                toast.error('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDirectMailVerification = async () => {
        setIsLoading(true);

        try {
            // Enhanced validation
            if (!formData.email || !formData.contact) {
                toast.error('Both email and contact number are required');
                setIsLoading(false);
                return;
            }

            // Debug log removed

            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/direct-otp-verification`,
                {
                    email: formData.email,
                    contact: formData.contact
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Debug log removed

            if (response.data.success) {
                toast.success('Email verified successfully! Please login');
                onClose();
                onSwitchToLogin();
            } else {
                toast.error(response.data.message || 'Verification failed');
            }
        } catch (error) {
            console.error('Direct verification error:', error);
            if (axios.isAxiosError(error)) {
                console.error('Error details:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    config: error.config
                });
                toast.error(error.response?.data?.message || 'An error occurred during verification');
            } else {
                toast.error('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-4">
                    {/* Modal Container - properly centered */}
                    <div className="mx-auto w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[800px] px-4">
                        <div className="bg-white p-4 rounded-2xl w-full max-h-[95vh] h-auto md:h-[850px] overflow-y-auto">
                            {/* Close Button - Adjusted for mobile */}
                            <div className="flex justify-end cursor-pointer sticky top-0 bg-white pb-2">
                                <div onClick={onClose} className="p-1">
                                    <CloseCircle className="size-6 md:size-10 hover:text-red-500 transition-all duration-300" />
                                </div>
                            </div>

                            {!showOtpInput ? (
                                <>
                                    {/* Signup Title */}
                                    <div className="flex justify-center mt-2 md:mt-0">
                                        <span className="bg-gradient-to-r text-xl md:text-4xl text-center font-extrabold from-red-600 via-black to-blue-600 bg-clip-text text-transparent decoration-cyan-800 cursor-pointer hover:underline">
                                            <TypingText text="Create your PrepNerdz Account!!" />
                                        </span>
                                    </div>

                                    {/* Signup Form */}
                                    <form onSubmit={handleSignup}>
                                        <div className="flex flex-col items-center space-y-4 md:space-y-8 justify-center mt-4 md:mt-6">
                                            <div className="w-full max-w-xs md:max-w-md">
                                                <InputBulged
                                                    type="text"
                                                    placeholder="Enter Username:"
                                                    icon={<User className="size-5" />}
                                                    name="username"
                                                    onChange={handleInputChange}
                                                    value={formData.username}
                                                />
                                            </div>

                                            <div className="w-full max-w-xs md:max-w-md">
                                                <InputBulged
                                                    type="email"
                                                    placeholder="Enter Email:"
                                                    icon={<Email className="size-5" />}
                                                    name="email"
                                                    onChange={handleInputChange}
                                                    value={formData.email}
                                                />
                                            </div>

                                            <div className="w-full max-w-xs md:max-w-md">
                                                <InputBulged
                                                    type="password"
                                                    placeholder="Enter Password:"
                                                    icon={<Key className="size-5" />}
                                                    name="password"
                                                    onChange={handleInputChange}
                                                    value={formData.password}
                                                />
                                            </div>
                                            <div className="w-full max-w-xs md:max-w-md">
                                                <InputBulged
                                                    type="password"
                                                    placeholder="Confirm Password:"
                                                    icon={<Key className="size-5" />}
                                                    name="confirmPassword"
                                                    onChange={handleInputChange}
                                                    value={formData.confirmPassword}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-6 md:mt-8">
                                            <Button
                                                colorVariant="black_green"
                                                endIcon={<EnterDoor className="size-6" />}
                                                sizeVariant="medium"
                                                text={isLoading ? "Processing..." : "Register"}
                                                type="submit"
                                                disabled={isLoading}                
                                            />
                                        </div>
                                    </form>

                                    {/* Social Auth Divider */}
                                    <div className="flex justify-center mt-6 md:mt-10 items-center">
                                        <div className="flex justify-center items-center w-full cursor-default max-w-sm">
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                                            <span className="px-4 text-sm font-medium text-black">OR CONTINUE WITH</span>
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                                        </div>
                                    </div>

                                    {/* Social Auth Buttons */}
                                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 md:space-x-10 mt-3">
                                        <div>
                                            <GoogleAuthBtn text="Google" />
                                        </div>
                                        <div>
                                            <GithubAuthBtn text="Github" />
                                        </div>
                                        {/* <div>
                                            <TwitterAuthBtn text="Twitter(X)" />
                                        </div> */}
                                    </div>

                                    {/* Login Prompt */}
                                    <p className="text-black text-lg md:text-2xl font-bold text-center mt-6 px-2">
                                        Already have an account?{" "}
                                        <span
                                            onClick={onSwitchToLogin}
                                            className="text-blue-700 font-extrabold cursor-pointer hover:underline"
                                        >
                                            Login
                                        </span>
                                    </p>
                                </>
                            ) : (
                                <>
                                    {/* OTP Verification Title */}
                                    <div className="flex justify-center mt-2 md:mt-0">
                                        <span className="bg-gradient-to-r text-xl md:text-4xl text-center font-extrabold from-red-600 via-black-500 to-blue-600 bg-clip-text text-transparent decoration-cyan-800 cursor-pointer hover:underline">
                                            Verify Your Email
                                        </span>
                                    </div>

                                    {/* OTP Form */}
                                    <form onSubmit={handleOtpVerification}>
                                        <div className="flex flex-col items-center space-y-4 md:space-y-8 justify-center mt-8 md:mt-16">
                                            <div className="w-full max-w-xs md:max-w-md">
                                                <InputBulged
                                                    type="text"
                                                    placeholder="Enter OTP:"
                                                    icon={<OtpDot className="size-5" />}
                                                    name="otp"
                                                    onChange={handleOtpChange}
                                                    value={otp}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-6 md:mt-8">
                                            <Button
                                                colorVariant="black_green"
                                                endIcon={<EnterDoor className="size-6" />}
                                                sizeVariant="medium"
                                                text={isLoading ? "Verifying..." : "Verify OTP"}
                                                type="submit"
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </form>

                                    {/* Verify directly if facing otp issue! */}
                                    <div className="text-center mt-8">
                                        <div className="text-xl md:text-2xl text-red-600 font-bold animate-bounce"> If you didn&apos;t received the OTP:</div>
                                        <div className="text-lg md:text-xl text-blue-600 font-bold"> Enter your contact number & click to verify your email directly!</div>

                                        <div className='flex justify-center mt-6'>
                                            <InputBulged
                                                type="text"
                                                placeholder="Contact Number:"
                                                icon={<Phone className="size-5" />}
                                                name="contact"
                                                onChange={handleInputChange} // This will now update formData.contact
                                                value={formData.contact}
                                            />
                                        </div>

                                        <div className='flex justify-center mt-10'>
                                            <Button
                                                colorVariant="black_green"
                                                endIcon={<Tick className="size-6" />}
                                                sizeVariant="small"
                                                text={isLoading ? "Verifying..." : "VERIFY MAIL"}
                                                onClick={handleDirectMailVerification}
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};