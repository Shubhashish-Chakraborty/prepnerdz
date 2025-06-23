'use client';

import { Home } from "@repo/ui/icons/Home";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLanding() {
    const router = useRouter();
    const [authStatus, setAuthStatus] = useState<'LOADING' | 'UNAUTHENTICATED' | 'ADMIN' | 'STUDENT'>('LOADING');
    const [username, setUsername] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        console.log("Welcome to dashboard!!");
    }, [isAuthenticated, authLoading, authStatus]);

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

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true,
                })

                const data = response.data;

                if (data.message.isAuthenticated) {
                    if (data.message.user.role === 'ADMIN') {
                        setUsername(data.message.user.username);
                    } else {
                        setAuthStatus('UNAUTHENTICATED');
                        router.push("/");
                    }
                } else {
                    setAuthStatus('UNAUTHENTICATED');
                    router.push("/");
                }
            } catch (error) {
                console.error('Session fetch failed:', error)
                setAuthStatus('UNAUTHENTICATED')
            }
        }

        fetchSession()
    }, [router]);

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/logout`, {}, { withCredentials: true });
            setAuthStatus('UNAUTHENTICATED');
            router.push("/");
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <div className="bg-mainBgColor text-white h-screen overflow-hidden">
            <div className="flex justify-center items-center space-x-25 mt-10">
                <div onClick={() => { router.push("/") }} className="bg-white p-2 rounded-xl cursor-pointer hover:scale-110 transition-all duration-500">
                    <Home />
                </div>

                <div className="cursor-pointer text-center hover:-translate-y-1 transition-all duration-500 font-extrabold text-white text-xl md:text-4xl tracking-tight leading-snug animate-fade-in-up">
                    Welcome <span className="text-blue-500 hover:underline"> {username}</span>!
                </div>

                <div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 cursor-pointer hover:bg-red-700 px-4 py-2 rounded-xl text-white font-semibold"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="mt-20 flex justify-center items-center flex-col space-y-5">
                <div className="text-3xl font-bold text-amber-300">
                    Add Course:                    
                </div>
                <div>
                    <input type="text" placeholder="Course Name (Btech, Diploma..)" className="border bg-white placeholder:text-gray-500 placeholder:font-extrabold font-bold text-black border-gray-300 p-2 w-72 text-center rounded-md" />
                </div>
            </div>
        </div>
    )
}