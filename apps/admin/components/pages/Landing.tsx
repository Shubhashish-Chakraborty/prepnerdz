'use client'

import { useEffect, useRef, useState } from 'react'
import GoogleAuthBtn from '../ui/buttons/GoogleAuth'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { User } from '@/icons/User'

export const Landing = () => {
    const [authStatus, setAuthStatus] = useState<'LOADING' | 'UNAUTHENTICATED' | 'ADMIN' | 'STUDENT'>('LOADING');
    const router = useRouter();
    const [avatar, setAvatar] = useState<string | null>(null);
    const avatarMenuRef = useRef<HTMLDivElement>(null);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);


    // Fetch Avatar:
    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/avatar/get-avatar`, {
                    withCredentials: true,
                });
                if (response.data && response.data.url) {
                    setAvatar(response.data.url);
                }
            } catch (err) {
                console.error("Failed to fetch avatar:", err);
            }
        };

        fetchAvatar();
    }, []);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true,
                })

                const data = response.data;

                if (data.message.isAuthenticated) {
                    const role = data.message.user.role
                    if (role === 'ADMIN') {
                        setAuthStatus('ADMIN')
                    } else if (role === 'STUDENT') {
                        setAuthStatus('STUDENT')
                    } else {
                        setAuthStatus('UNAUTHENTICATED')
                    }
                } else {
                    setAuthStatus('UNAUTHENTICATED')
                }
            } catch (error) {
                console.error('Session fetch failed:', error)
                setAuthStatus('UNAUTHENTICATED')
            }
        }

        fetchSession()
    }, [])

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/logout`, {}, { withCredentials: true });
            setAuthStatus('UNAUTHENTICATED')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <div className="bg-mainBgColor text-white h-screen overflow-hidden">
            <div className="flex mt-30 flex-col justify-center items-center">

                {authStatus !== "ADMIN" && (
                    <div className="md:text-4xl text-2xl font-bold text-center">
                        LogIn to your admin account
                    </div>
                )}

                {/* avatar section */}
                {authStatus !== "UNAUTHENTICATED" && (
                    <div className="mt-5">
                        <div className="relative" ref={avatarMenuRef}>
                            <button
                                onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                                className="flex cursor-pointer items-center justify-center w-20 h-20 rounded-full overflow-hidden border-2 border-black hover:border-gray-400 transition-colors"
                            >
                                {avatar ? (
                                    <Image
                                        src={avatar}
                                        alt="User Avatar"
                                        width={64}
                                        height={64}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-amber-300 flex items-center justify-center">
                                        <User className="size-6" />
                                    </div>
                                )}
                            </button>

                        </div>
                    </div>
                )}



                <div className="mt-20">
                    {authStatus === 'LOADING' && <div>Loading...</div>}

                    {authStatus === 'UNAUTHENTICATED' && (
                        <GoogleAuthBtn text="Login with Google" />
                    )}

                    {authStatus === 'STUDENT' && (
                        <div className='flex flex-col justify-center items-center'>
                            <div>
                                <button
                                    className="logout-btn bg-red-600 cursor-pointer hover:bg-red-700 px-4 py-2 rounded-xl text-white font-semibold"
                                    onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                            <div className="mt-8 text-white italic">
                                <div className="cursor-pointer text-center hover:-translate-y-1 transition-all duration-500 font-extrabold text-white text-xl md:text-4xl tracking-tight leading-snug animate-fade-in-up">
                                    Please wait until <Link href={"https://wa.me/918602061128"} target='_blank'> <span className="text-blue-600 hover:underline">Shubhashish</span> </Link> assigns you the admin role.
                                </div>
                            </div>
                        </div>
                    )}

                    {authStatus === 'ADMIN' && (
                        <div className='space-x-6'>
                            <button
                                onClick={() => { router.push('/dashboard') }}
                                className="bg-green-600 cursor-pointer hover:bg-green-700 px-4 py-2 rounded-xl text-white font-semibold"
                            >
                                Go to Admin Dashboard
                            </button>

                            <button
                                onClick={handleLogout}
                                className=" logout-btn bg-red-600 cursor-pointer hover:bg-red-700 px-4 py-2 rounded-xl text-white font-semibold"
                            >
                                Logout
                            </button>
                        </div>
                    )}

                    {authStatus === 'ADMIN' && (
                        <div className='mt-5 flex justify-center'>
                            <button
                                onClick={() => {window.location.href = "https://prepnerdz.tech/dashboard"}}
                                className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-4 py-2 rounded-xl text-white font-semibold"
                            >
                                Go to PrepNerdz Dashboard
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
