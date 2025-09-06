"use client"

import Image from "next/image"
import Link from "next/link"
import type { Dispatch, ReactNode, SetStateAction } from "react"
import { useState, useEffect } from "react"
import DateTimeCard from "../cards/DateTime"

interface NavigationItem {
    id: string
    label: string
    icon: ReactNode
}

interface SidebarProps {
    navigationItems: NavigationItem[]
    activeNavItem: string
    setActiveNavItem: (item: string) => void
    isSidebarOpen: boolean
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>
    isCollapsed: boolean
    setIsCollapsed: Dispatch<SetStateAction<boolean>>
}

export default function Sidebar({
    navigationItems,
    activeNavItem,
    setActiveNavItem,
    isSidebarOpen,
    setIsSidebarOpen,
    isCollapsed,
    setIsCollapsed,
}: SidebarProps) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleNavClick = (itemId: string) => {
        setActiveNavItem(itemId)
        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }

    const toggleCollapse = () => {
        if (!isMobile) {
            setIsCollapsed(!isCollapsed)
        }
    }

    return (
        <>
            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, #f59e0b, #d97706);
                    border-radius: 10px;
                    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, #d97706, #b45309);
                }
                
                /* Firefox */
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #f59e0b transparent;
                }
            `}</style>

            {/* Desktop Sidebar */}
            <div className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 bg-gradient-to-b from-amber-50 to-white border-r border-amber-200 shadow-xl transition-all duration-300 ease-in-out ${
                isCollapsed ? 'lg:w-20' : 'lg:w-72'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Logo/Brand Area */}
                    <div className="flex-shrink-0 flex items-center justify-between h-20 px-4 border-b border-amber-200">
                        {!isCollapsed && (
                            <Link href={"/"} className="flex items-center space-x-3">
                                <Image
                                    src={"/prepnerdz-logo-with-code.png"}
                                    alt="logo"
                                    width={120}
                                    height={40}
                                    className="hover:scale-105 transition-all duration-500"
                                />
                            </Link>
                        )}
                        {isCollapsed && (
                            <Link href={"/"} className="flex items-center justify-center w-full">
                                <Image
                                    src={"/prepnerdz-only-specs.png"}
                                    alt="logo"
                                    width={40}
                                    height={40}
                                    className="hover:scale-110 transition-all duration-500"
                                />
                            </Link>
                        )}
                        <button
                            onClick={toggleCollapse}
                            className="p-2 rounded-lg hover:bg-amber-100 transition-colors duration-200"
                        >
                            <svg 
                                className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>

                    {/* DateTime Card - Only show when not collapsed */}
                    {!isCollapsed && (
                        <div className="flex-shrink-0 mt-6 px-4">
                            <DateTimeCard />
                        </div>
                    )}

                    {/* Scrollable Navigation*/}
                    <div className="flex-1 overflow-hidden px-4 min-h-0">
                        <div className="h-full overflow-y-auto space-y-2 py-6 custom-scrollbar">
                            <nav className="space-y-2">
                                {navigationItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavClick(item.id)}
                                        className={`w-full cursor-pointer flex items-center px-4 py-3 text-left rounded-xl transition-all duration-300 group relative ${
                                            activeNavItem === item.id
                                                ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg transform scale-105"
                                                : "text-gray-700 hover:bg-gradient-to-r hover:from-amber-100 hover:to-yellow-50 hover:text-gray-900 hover:shadow-md"
                                        }`}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        <span className={`text-lg transition-all duration-200 ${
                                            activeNavItem === item.id ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                                        }`}>
                                            {item.icon}
                                        </span>
                                        {!isCollapsed && (
                                            <>
                                                <span className="font-medium ml-3">{item.label}</span>
                                                {activeNavItem === item.id && (
                                                    <div className="ml-auto">
                                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {activeNavItem === item.id && (
                                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex-shrink-0 p-4 border-t border-amber-200">
                        {!isCollapsed && (
                            <div className="text-xs text-gray-500 text-center">
                                © {new Date().getFullYear()} PrepNerdz
                            </div>
                        )}
                        {isCollapsed && (
                            <div className="flex justify-center">
                                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">P</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

                        
            {/* Mobile Sidebar */}
            <div
                className={`lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-amber-50 to-white border-r border-amber-200 shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between h-20 px-6 border-b border-amber-200 bg-gradient-to-r from-amber-500 to-yellow-600">
                        <div className="flex items-center space-x-3">
                            <Image
                                src={"/prepnerdz-only-specs.png"}
                                alt="logo"
                                width={32}
                                height={32}
                                className="rounded-lg"
                            />
                            <h1 className="text-xl font-bold text-white">Dashboard</h1>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile DateTime Card */}
                    <div className="flex-shrink-0 mt-6 px-6">
                        <DateTimeCard />
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-3 custom-scrollbar">
                        {navigationItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className={`w-full flex items-center px-4 py-4 text-left rounded-xl transition-all duration-300 group relative ${
                                    activeNavItem === item.id
                                        ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg transform scale-105"
                                        : "text-gray-700 hover:bg-gradient-to-r hover:from-amber-100 hover:to-yellow-50 hover:text-gray-900 hover:shadow-md"
                                }`}
                            >
                                <span className={`text-xl transition-all duration-200 ${
                                    activeNavItem === item.id ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                                }`}>
                                    {item.icon}
                                </span>
                                <span className="font-medium ml-4 text-lg">{item.label}</span>
                                {activeNavItem === item.id && (
                                    <>
                                        <div className="ml-auto">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                        </div>
                                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-white rounded-r-full" />
                                    </>
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Footer */}
                    <div className="flex-shrink-0 p-6 border-t border-amber-200">
                        <div className="text-center">
                            <div className="text-sm text-gray-500 mb-2">© {new Date().getFullYear()} PrepNerdz</div>
                            <div className="flex justify-center">
                                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">P</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}