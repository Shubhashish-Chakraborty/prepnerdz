"use client"

import { useEffect, useRef, useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "./buttons/Button";
import { MenuDots } from "@/icons/MenuDots";
import TypingText from "./TypingTest";
import { User } from "@/icons/User";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Home } from "@/icons/Home";
import { Download } from "@/icons/Download";
import { Bookmark } from "@/icons/Bookmark";
import { Settings } from "@/icons/Settings";
import { Right } from "@/icons/Right";
import { Question } from "@/icons/Question";
interface HeaderProps {
    userName: string
    setIsSidebarOpen: (open: boolean) => void
}

export default function Header({ userName, setIsSidebarOpen }: HeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const router = useRouter();
    const [avatar, setAvatar] = useState<string | null>(null);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const avatarMenuRef = useRef<HTMLDivElement>(null);
    const [username, setUsername] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [joined, setJoined] = useState("");
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [contactProvided, setContactProvided] = useState(false);

    useEffect(() => {
        console.log();
    }, [loading]);

    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true,
                });
                setUsername(response.data.message.user.username);
                setEmail(response.data.message.user.email);
                setContact(response.data.message.user.contactNumber);
                setJoined(response.data.message.user.UserAddedAt.split("T")[0].split("-").reverse().join("-"));

                if (response.data.message.user.contactNumber !== "NOT_PROVIDED") {
                    setContactProvided(true);
                }
            } catch (err) {
                console.error("Failed to fetch user data:", err);
            } finally {
                setLoading(false);
            }
        }
        getUserData();
    }, []);


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

    // Dropdown menu items - easily extensible
    // const dropdownItems = [
    //     { label: "Home", icon: <Home />, action: () => console.log("Profile clicked") },
    //     { label: "Profile", icon: "👤", action: () => console.log("Profile clicked") },
    //     { label: "Settings", icon: "⚙️", action: () => console.log("Settings clicked") },
    //     { label: "Help", icon: "❓", action: () => console.log("Help clicked") },
    //     // Add more dropdown items here
    //     // { label: 'Notifications', icon: '🔔', action: () => console.log('Notifications clicked') },
    // ]

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/logout`, {}, { withCredentials: true });
            // setIsLoggedIn(false);
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm sticky z-50 top-0 w-full">
            <div className="flex items-center justify-between h-24 px-4 lg:px-8">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Welcome Message */}
                <div className="flex-1 lg:flex-none">
                    <div className="flex items-center">
                        <div className="hidden sm:block">
                            <h2 className="md:text-3xl text-lg transition-all duration-300 font-semibold text-gray-800">
                                <TypingText text={getGreeting()} /> <span className="text-blue-600 hover:underline cursor-pointer">{userName}</span>! 👋
                            </h2>
                        </div>
                        <div className="sm:hidden">
                            <h2 className="text-lg font-semibold text-gray-800">Hi, {userName}! 👋</h2>
                        </div>
                    </div>
                </div>

                {/* Right Side Actions */}

                <div className="flex items-center space-x-4">
                    {/* avatar section */}
                    <div className="hidden md:block">
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

                            <AnimatePresence>
                                {avatarMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-full mt-2 w-52 bg-emerald-400 hover:bg-emerald-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                                    >
                                        <div className="py-1">
                                            <button
                                                onClick={() => {
                                                    router.push("/upload-avatar");
                                                    setAvatarMenuOpen(false);
                                                }}
                                                className="block w-full text-left px-4 py-2 cursor-pointer text-black font-bold hover:bg-emerald-200 transition-colors"
                                            >
                                                Change Profile Image
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Dropdown Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div className="ml-4">
                                <MenuDots />
                            </div>
                        </button>

                        {/* Dropdown Content */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-72 cursor-pointer bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                                {/* User info section */}
                                <div className="px-4 py-3 border-b text-center border-gray-100">
                                    <p className="font-bold text-lg text-gray-900 truncate">{username}</p>
                                    <p className="text-sm truncate text-blue-500 font-bold">{email}</p>
                                    {contact !== "NOT_PROVIDED" && (
                                        <p className="text-sm truncate">{contact}</p>
                                    )}
                                </div>

                                {/* Main menu items */}
                                <div className="py-1">
                                    <button
                                        onClick={() => {
                                            router.push("/");
                                            setIsDropdownOpen(false);
                                        }}
                                        className="w-full flex cursor-pointer items-center px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="mr-3"><Home /></span>
                                        <span className="text-gray-700">Home</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            router.push("/bookmarks");
                                            setIsDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center cursor-pointer px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="mr-3"><Bookmark className="size-5" /></span>
                                        <span className="text-gray-700">Bookmarks</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            router.push("/downloads");
                                            setIsDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center cursor-pointer px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="mr-3"><Download className="size-5" /></span>
                                        <span className="text-gray-700">Downloads</span>
                                    </button>

                                    {/* Settings with nested panel */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setSettingsOpen(!settingsOpen)}
                                            className="w-full flex items-center cursor-pointer justify-between px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center">
                                                <span className="mr-3"><Settings /></span>
                                                <span className="text-gray-700">Settings</span>
                                            </div>
                                            <Right className={`size-5 transition-transform ${settingsOpen ? 'transform rotate-90' : ''}`} />
                                        </button>

                                        {settingsOpen && (
                                            <div className="ml-2 pl-2 border-l-2 border-gray-200">
                                                <button
                                                    onClick={() => {
                                                        router.push("/change-username");
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="w-full flex items-center px-4 py-2 cursor-pointer text-left hover:bg-cyan-100 transition-colors"
                                                >
                                                    <span className="text-gray-700">Change Username</span>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        router.push("/forgot-password");
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="w-full flex items-center px-4 py-2 cursor-pointer text-left hover:bg-cyan-100 transition-colors"
                                                >
                                                    <span className="text-gray-700">Change Password</span>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        router.push("/change-contact");
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="w-full flex items-center px-4 py-2 cursor-pointer text-left hover:bg-cyan-100 transition-colors"
                                                >
                                                    <span
                                                        className={`text-gray-700 ${!contactProvided ? "bg-red-100 text-red-700 px-2 py-1 rounded" : ""
                                                            }`}
                                                    >
                                                        {contactProvided ? "Change Contact Number" : "Contact Number (required)"}
                                                    </span>
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        router.push("/upload-avatar");
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="w-full flex items-center px-4 py-2 cursor-pointer text-left hover:bg-cyan-100 transition-colors"
                                                >
                                                    <span className="text-gray-700">Change Profile Picture</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => {
                                            router.push("/help");
                                            setIsDropdownOpen(false);
                                        }}
                                        className="w-full flex cursor-pointer items-center px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="mr-3"><Question className="size-5" /></span>
                                        <span className="text-gray-700">Help</span>
                                    </button>
                                </div>

                                {/* Footer section */}
                                <div className="px-4 text-center py-2 border-t border-gray-100 text-sm font-bold">
                                    Member since: {joined}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Logout Button */}
                    <Button
                        text="LogOut"
                        colorVariant="red"
                        sizeVariant="medium"
                        onClick={handleLogout}
                    />
                </div>

            </div>

            {/* Close dropdown when clicking outside */}
            {isDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />}
        </header>
    )
}
