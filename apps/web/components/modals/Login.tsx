import { Button } from "../ui/buttons/Button";
import { CloseCircle } from "@/icons/CloseCircle";
import TypingText from "../ui/TypingTest";
import InputBulged from "../ui/inputs/InputBulged";
import { Email } from "@/icons/Email";
import { Key } from "@/icons/Key";
import { EnterDoor } from "@/icons/EnterDoor";
import GoogleAuthBtn from "../ui/buttons/GoogleAuth";
import GithubAuthBtn from "../ui/buttons/GithubAuth";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

interface LoginProps {
    open: boolean;
    onClose: () => void;
    onSwitchToSignup: () => void;
}

export const LoginModal = ({ open, onClose, onSwitchToSignup }: LoginProps) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
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
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Basic validation
            if (!loginData.email || !loginData.password) {
                toast.error('Please fill all fields');
                setIsLoading(false);
                return;
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/signin`,
                loginData,
                {
                    withCredentials: true
                }
            );

            // console.log('Login response:', response.data); // Debug log

            if (response.data.success) {
                toast.success('Login successful!');

                // Store the token in localStorage or cookies
                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                }

                // Store user data if available
                if (response.data.user) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }

                // Redirect to dashboard
                router.push('/dashboard');
                onClose(); // Close the modal
            } else {
                toast.error(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'An error occurred during login');
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
                    {/* Modal Container - now properly centered */}
                    <div className="mx-auto w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[800px] px-4">
                        <div className="bg-white p-4 rounded-2xl w-full max-h-[90vh] h-auto md:h-[850px] overflow-y-auto">
                            {/* Close Button - Adjusted for mobile */}
                            <div className="flex justify-end cursor-pointer sticky top-0 bg-white pb-2">
                                <div onClick={onClose} className="p-1">
                                    <CloseCircle className="size-6 md:size-10 hover:text-red-500 transition-all duration-300" />
                                </div>
                            </div>

                            {/* Title */}
                            <div className="flex justify-center mt-2 md:mt-0">
                                <span className="bg-gradient-to-r text-xl md:text-4xl text-center font-extrabold from-blue-600 to-cyan-600 bg-clip-text text-transparent decoration-cyan-800 cursor-pointer hover:underline">
                                    <TypingText text="Login to your PrepNerdz Account!" />
                                </span>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleLogin}>
                                <div className="flex flex-col items-center space-y-4 md:space-y-8 justify-center mt-4 md:mt-6">
                                    <div className="w-full max-w-xs md:max-w-md">
                                        <InputBulged
                                            type="email"
                                            placeholder="Enter Email:"
                                            icon={<Email className="size-5" />}
                                            name="email"
                                            onChange={handleInputChange}
                                            value={loginData.email}
                                        />
                                    </div>

                                    <div className="w-full max-w-xs md:max-w-md">
                                        <InputBulged
                                            type="password"
                                            placeholder="Enter Password:"
                                            icon={<Key className="size-5" />}
                                            name="password"
                                            onChange={handleInputChange}
                                            value={loginData.password}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-center mt-6 md:mt-8">
                                    <Button
                                        colorVariant="black_green"
                                        endIcon={<EnterDoor className="size-6" />}
                                        sizeVariant="medium"
                                        text={isLoading ? "Logging in..." : "Login"}
                                        type="submit"
                                        disabled={isLoading}
                                    />
                                </div>
                            </form>

                            {/* OR Divider */}
                            <div className="flex justify-center mt-6 md:mt-10 items-center">
                                <div className="flex justify-center items-center w-full cursor-default max-w-sm">
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                                    <span className="px-4 text-sm font-medium text-black">OR CONTINUE WITH</span>
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                                </div>
                            </div>

                            {/* Social Auth Buttons */}
                            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mt-3 md:mt-3">
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

                            {/* Signup Prompt */}
                            <p className="text-black font-bold text-center text-lg md:text-2xl mt-6 md:mt-10 px-2">
                                Don&apos;t have an account?
                                {" "}
                                <span
                                    onClick={onSwitchToSignup}
                                    className="text-blue-600 font-extrabold cursor-pointer hover:underline"
                                >
                                    SignUp
                                </span>
                            </p>

                            {/* Forgot Password */}
                            <div className="flex justify-center transition-all text-base md:text-xl duration-500 hover:text-blue-600 font-bold mt-2 md:mt-0">
                                <Link href={"/forgot-password"} onClick={()=>{ onClose()}}>
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};