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
                <div className="flex justify-center items-center h-screen w-screen bg-black/50 fixed top-0 left-0 z-50">
                    <div className="flex flex-col justify-center">
                        <div className="bg-white p-4 rounded-2xl w-[800px] h-[850px]">
                            <div className="flex justify-end cursor-pointer">
                                <div onClick={onClose}>
                                    <CloseCircle className="md:size-10 size-6 hover:text-red-500 transition-all duration-300" />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <span className="bg-gradient-to-r text-2xl md:text-4xl text-center font-extrabold from-blue-600 via-black-500 to-cyan-600 bg-clip-text text-transparent decoration-cyan-800 cursor-pointer hover:underline">
                                    <TypingText text="Login to your PrepNerdz Account!" />
                                </span>
                            </div>

                            <form onSubmit={handleLogin}>
                                <div className="flex flex-col items-center space-y-8 justify-center mt-6">
                                    <div>
                                        <InputBulged
                                            type="email"
                                            placeholder="Enter Email:"
                                            icon={<Email className="size-5" />}
                                            name="email"
                                            onChange={handleInputChange}
                                            value={loginData.email}
                                        />
                                    </div>

                                    <div>
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
                                <div className="flex justify-center mt-8">
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

                            <div className="flex justify-center mt-10 items-center">
                                <div className="flex justify-center items-center w-full cursor-default max-w-sm">
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                                    <span className="px-4 text-sm font-medium text-black">OR CONTINUE WITH</span>
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-row space-x-8 mt-3">
                                <div>
                                    <GoogleAuthBtn text="Google" />
                                </div>

                                <div>
                                    <GithubAuthBtn text="Github" />
                                </div>
                            </div>

                            <p className="text-black font-bold animate-bounce text-center text-2xl mt-10">
                                Don&apos;t have an account?
                                {" "}
                                <span
                                    onClick={onSwitchToSignup}
                                    className="text-blue-600 font-extrabold cursor-pointer hover:underline"
                                >
                                    SignUp
                                </span>
                            </p>
                            <div className="flex justify-center transition-all text-xl duration-500 hover:text-blue-600 font-bold">
                                <Link href={"/forgot-password"}>
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