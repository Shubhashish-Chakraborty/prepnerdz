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

interface SignupProps {
    open: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

export const SignupModal = ({ open, onClose, onSwitchToLogin }: SignupProps) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
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
            if (!formData.username || !formData.email || !formData.password) {
                toast.error('Please fill all fields');
                setIsLoading(false);
                return;
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/signup`,
                formData
            );

            console.log('Signup response:', response.data); // Debug log

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

            console.log('Verification response:', response.data); // Debug log

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

    return (
        <>
            {open && (
                <div className="flex justify-center items-center h-screen w-screen bg-black/50 fixed top-0 left-0 z-50">
                    <div className="flex flex-col justify-center">
                        <div className="bg-white p-4 rounded-2xl w-[800px] h-[850px]">
                            <div className="flex justify-end cursor-pointer">
                                <div onClick={onClose}>
                                    <CloseCircle className="md:size-10 size-6 hover:text-red-500 transition-all duration-300" />
                                </div>
                            </div>

                            {!showOtpInput ? (
                                <>
                                    <div className="flex justify-center">
                                        <span className="bg-gradient-to-r text-2xl md:text-4xl text-center font-extrabold from-red-600 via-black-500 to-blue-600 bg-clip-text text-transparent decoration-cyan-800 cursor-pointer hover:underline">
                                            <TypingText text="Create your PrepNerdz Account!!" />
                                        </span>
                                    </div>

                                    <form onSubmit={handleSignup}>
                                        <div className="flex flex-col items-center space-y-8 justify-center mt-6">
                                            <div>
                                                <InputBulged
                                                    type="text"
                                                    placeholder="Enter Username:"
                                                    icon={<User className="size-5" />}
                                                    name="username"
                                                    onChange={handleInputChange}
                                                    value={formData.username}
                                                />
                                            </div>

                                            <div>
                                                <InputBulged
                                                    type="email"
                                                    placeholder="Enter Email:"
                                                    icon={<Email className="size-5" />}
                                                    name="email"
                                                    onChange={handleInputChange}
                                                    value={formData.email}
                                                />
                                            </div>

                                            <div>
                                                <InputBulged
                                                    type="password"
                                                    placeholder="Enter Password:"
                                                    icon={<Key className="size-5" />}
                                                    name="password"
                                                    onChange={handleInputChange}
                                                    value={formData.password}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-center mt-8">
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

                                    <div className="flex justify-center mt-10 items-center">
                                        <div className="flex justify-center items-center w-full cursor-default max-w-sm">
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                                            <span className="px-4 text-sm font-medium text-black">OR CONTINUE WITH</span>
                                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center flex-row space-x-10 mt-3">
                                        <div>
                                            <GoogleAuthBtn text="Google" />
                                        </div>
                                        <div>
                                            <GithubAuthBtn text="Github" />
                                        </div>
                                    </div>

                                    <p className="text-black animate-bounce text-2xl font-bold text-center mt-6">
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
                                    <div className="flex justify-center">
                                        <span className="bg-gradient-to-r text-2xl md:text-4xl text-center font-extrabold from-red-600 via-black-500 to-blue-600 bg-clip-text text-transparent decoration-cyan-800 cursor-pointer hover:underline">
                                            Verify Your Email
                                        </span>
                                    </div>

                                    <form onSubmit={handleOtpVerification}>
                                        <div className="flex flex-col items-center space-y-8 justify-center mt-16">
                                            <div>
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
                                        <div className="flex justify-center mt-8">
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

                                    <p className="text-center mt-4 text-sm text-gray-600">
                                        Didn&apos;t receive OTP?{" "}
                                        <button
                                            className="text-blue-600 hover:underline"
                                            onClick={handleSignup}
                                            disabled={isLoading}
                                        >
                                            Resend OTP
                                        </button>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};