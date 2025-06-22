'use client'

import { useEffect, useState } from 'react'
import GoogleAuthBtn from '../ui/buttons/GoogleAuth'
import axios from 'axios'
import Link from 'next/link'


export const Landing = () => {
    const [authStatus, setAuthStatus] = useState<'LOADING' | 'UNAUTHENTICATED' | 'ADMIN' | 'STUDENT'>('LOADING')

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
                <div className="md:text-4xl text-2xl font-bold text-center">
                    LogIn to your admin account
                </div>

                <div className="mt-20">
                    {authStatus === 'LOADING' && <div>Loading...</div>}

                    {authStatus === 'UNAUTHENTICATED' && (
                        <GoogleAuthBtn text="Login with Google" />
                    )}

                    {authStatus === 'STUDENT' && (
                        <div className='flex flex-col justify-center items-center'>
                            <div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 cursor-pointer hover:bg-red-700 px-4 py-2 rounded-xl text-white font-semibold"
                                >
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
                                className="bg-green-600 cursor-pointer hover:bg-green-700 px-4 py-2 rounded-xl text-white font-semibold"
                            >
                                Go to Dashboard
                            </button>

                            <button
                                onClick={handleLogout}
                                className="bg-red-600 cursor-pointer hover:bg-red-700 px-4 py-2 rounded-xl text-white font-semibold"
                            >
                                Logout
                            </button>
                        </div>

                    )}
                </div>
            </div>
        </div>
    )
}
