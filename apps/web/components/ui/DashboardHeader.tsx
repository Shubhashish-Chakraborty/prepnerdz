"use client"

import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
interface HeaderProps {
    userName: string
    setIsSidebarOpen: (open: boolean) => void
}

export default function Header({ userName, setIsSidebarOpen }: HeaderProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const router = useRouter();
    
    // Dropdown menu items - easily extensible
    const dropdownItems = [
        { label: "Profile", icon: "👤", action: () => console.log("Profile clicked") },
        { label: "Settings", icon: "⚙️", action: () => console.log("Settings clicked") },
        { label: "Help", icon: "❓", action: () => console.log("Help clicked") },
        // Add more dropdown items here
        // { label: 'Notifications', icon: '🔔', action: () => console.log('Notifications clicked') },
    ]

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/logout`, {}, { withCredentials: true });
            // setIsLoggedIn(false);
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between h-16 px-4 lg:px-8">
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
                            <h2 className="text-lg font-semibold text-gray-800">
                                Welcome back, <span className="text-blue-600">{userName}</span>! 👋
                            </h2>
                            <p className="text-sm text-gray-600">
                                {new Date().toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                        <div className="sm:hidden">
                            <h2 className="text-lg font-semibold text-gray-800">Hi, {userName}! 👋</h2>
                        </div>
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-4">
                    {/* Dropdown Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                            </svg>
                        </button>

                        {/* Dropdown Content */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                                {dropdownItems.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            item.action()
                                            setIsDropdownOpen(false)
                                        }}
                                        className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        <span className="text-gray-700">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 transform hover:scale-105"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>

            {/* Close dropdown when clicking outside */}
            {isDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />}
        </header>
    )
}
