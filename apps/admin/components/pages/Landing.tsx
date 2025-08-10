'use client'

import { useEffect, useRef, useState } from 'react'
import GoogleAuthBtn from '../ui/buttons/GoogleAuth'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { User } from '@/icons/User'
import GithubAuthBtn from '../ui/buttons/GIthubAuth'
import InputStraightLine from '../ui/inputs/StraightLine'

export const Landing = () => {
    const [authStatus, setAuthStatus] = useState<'LOADING' | 'UNAUTHENTICATED' | 'ADMIN' | 'STUDENT'>('LOADING');
    const router = useRouter();
    const [avatar, setAvatar] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const avatarMenuRef = useRef<HTMLDivElement>(null);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

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
                        setAuthStatus('ADMIN');
                        setUsername(data.message.user.username);
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

    const handleLogin = async () => {
        if (!email || !password) {
            setLoginError('Please enter both email and password');
            return;
        }

        setIsLoggingIn(true);
        setLoginError('');

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/signin`, {
                email,
                password
            }, {
                withCredentials: true
            });

            if (response.data.message.isAuthenticated) {
                const role = response.data.message.user.role;
                if (role === 'ADMIN') {
                    setAuthStatus('ADMIN');
                    setUsername(response.data.message.user.username);
                } else if (role === 'STUDENT') {
                    setAuthStatus('STUDENT');
                }
            }
            window.location.reload();
        } catch (error: unknown) {
            console.error('Login failed:', error);

            if (axios.isAxiosError(error)) {
                setLoginError(error.response?.data?.message || 'Login failed. Please try again.');
            } else {
                setLoginError('Login failed. Please try again.');
            }
            // console.error('Login failed:', error);
            // setLoginError(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoggingIn(false);
        }
    }

    return (
        <div className="bg-mainBgColor text-white h-screen overflow-hidden">

            <div className="flex items-center justify-center">
                <div>
                    <Image
                        src="/pn_specs.png"
                        alt="PrepNerdz Logo"
                        className='hover:scale-105 transition-all duration-300 cursor-pointer'
                        width={100}
                        height={100}
                    />
                </div>

                <Link href={"https://prepnerdz.tech"} target='_blank' >
                    <div className='text-3xl cursor-pointer hover:text-blue-400 font-bold'>
                        PrepNerdz
                    </div>
                </Link>
            </div>
            <div className="flex mt-10 flex-col justify-center items-center">

                {authStatus !== "ADMIN" && (
                    <div className="md:text-4xl text-2xl font-bold text-center">
                        Login to your Admin Account...
                    </div>
                )}

                {/* avatar section */}
                {authStatus !== "UNAUTHENTICATED" && (
                    <div className="mt-5">
                        <div className="relative" ref={avatarMenuRef}>
                            <div>
                                {authStatus === "LOADING" ? (
                                    "Loading..."
                                ) : authStatus === "ADMIN" ? (
                                    <>hey {username} !!</>
                                ) : null}
                            </div>
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

                <div className="mt-20 flex md:flex-row flex-col items-center">
                    {authStatus === 'LOADING' && <div>Loading...</div>}

                    {authStatus === 'UNAUTHENTICATED' && (
                        <div className='flex justify-center items-center gap-5 flex-col'>
                            <div className='flex gap-5 md:flex-row flex-col'>
                                <GoogleAuthBtn text="Login with Google" />
                                <GithubAuthBtn text="Login with Github" />
                            </div>

                            <div className="text-center text-gray-400 my-4">OR</div>

                            <div className='flex flex-col gap-4 w-full max-w-md'>
                                <InputStraightLine
                                    type='email'
                                    label='Email'
                                    id='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <InputStraightLine
                                    type='password'
                                    label='Password'
                                    id='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                {loginError && (
                                    <div className="text-red-500 text-sm text-center">{loginError}</div>
                                )}

                                <button
                                    onClick={handleLogin}
                                    disabled={isLoggingIn}
                                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoggingIn ? 'Logging in...' : 'Login with Email'}
                                </button>
                            </div>
                        </div>
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
                        <div className='gap-6 flex md:flex-row flex-col'>
                            <button
                                onClick={() => { router.push('/dashboard') }}
                                className="bg-purple-500 text-white cursor-pointer hover:bg-purple-700 px-4 py-2 rounded-xl font-semibold"
                            >
                                Go to Admin Dashboard
                            </button>

                            <button
                                onClick={handleLogout}
                                className="bg-red-600 cursor-pointer hover:bg-red-700 px-4 py-2 rounded-xl text-white font-semibold"
                            >
                                Logout
                            </button>
                        </div>
                    )}

                    {authStatus === 'ADMIN' && (
                        <div className='flex md:ml-5 mt-5 md:mt-0 items-center justify-center'>
                            <button
                                onClick={() => { window.location.href = "https://prepnerdz.tech/dashboard" }}
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