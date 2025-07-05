"use client"

import Image from "next/image"
import Link from "next/link"
import type { Dispatch, SetStateAction } from "react"
import DateTimeCard from "../cards/DateTime"

interface NavigationItem {
    id: string
    label: string
    icon: string
}

interface SidebarProps {
    navigationItems: NavigationItem[]
    activeNavItem: string
    setActiveNavItem: (item: string) => void
    isSidebarOpen: boolean
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export default function Sidebar({
    navigationItems,
    activeNavItem,
    setActiveNavItem,
    isSidebarOpen,
    setIsSidebarOpen,
}: SidebarProps) {
    const handleNavClick = (itemId: string) => {
        setActiveNavItem(itemId)
        setIsSidebarOpen(false) // Close sidebar on mobile after selection
    }

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200 shadow-sm">
                <div className="flex flex-col flex-1">
                    {/* Logo/Brand Area */}
                    <div className="flex mt-4 items-center justify-center h-16 px-4">
                        <Link href={"/"}>
                            <Image
                                src={"/prepnerdz-logo-with-code.png"}
                                alt="logo"
                                width={150}
                                height={150}
                                className="hover:scale-105 transition-all duration-500"
                            />
                        </Link>
                    </div>

                    <div className="mt-10">
                        <DateTimeCard />
                    </div>

                    {/* Navigation Menu */}
                    <nav className="mt-5 flex-1 px-4 py-6 space-y-2">
                        {navigationItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`w-full cursor-pointer flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 hover:bg-amber-100 group ${activeNavItem === item.id
                                    ? "bg-amber-50 text-yellow-600 border-l-4 border-red-500"
                                    : "text-gray-700 hover:text-gray-900"
                                    }`}
                            >
                                <span className="text-lg mr-3">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                                {activeNavItem === item.id && (
                                    <div className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="text-xs text-gray-500 text-center">© {new Date().getFullYear()} PrepNerdz</div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {navigationItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 hover:bg-gray-100 ${activeNavItem === item.id
                                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                                    : "text-gray-700 hover:text-gray-900"
                                    }`}
                            >
                                <span className="text-lg mr-3">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                                {activeNavItem === item.id && (
                                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    )
}
