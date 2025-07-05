'use client'
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../ui/sidebars/Sidebar";
import Header from "../ui/DashboardHeader";
import SearchPanel from "../ui/SearchPanels/DashboardSearch";

// Navigation items configuration - easily extensible
export const navigationItems = [
    { id: "shivani-books", label: "Shivani Books", icon: "📚" },
    { id: "midsem-papers", label: "Midsem Papers", icon: "📄" },
    { id: "endsem-papers", label: "Endsem Papers", icon: "📋" },
    { id: "imp-questions", label: "Important Questions", icon: "📋" },
    { id: "acad-notes", label: "Best Notes", icon: "📋" },
    { id: "syllabus", label: "Syllabus", icon: "📋" },
    { id: "lab-manual", label: "Lab Manual", icon: "📋" },
    // Add more navigation items here in the future
    // { id: 'assignments', label: 'Assignments', icon: '✏️' },
    // { id: 'notes', label: 'Notes', icon: '📝' },
]

export const DashboardLanding = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const router = useRouter();
    // const [username, setUsername] = useState<string | null>(null);
    const [username, setUsername] = useState<string>("");

    const [activeNavItem, setActiveNavItem] = useState("shivani-books")
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        console.log("Welcome to PrepNerdz!!")
    }, [isAuthenticated, authLoading]); 

    // Checking authentication status
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true
                });
                setIsAuthenticated(response.status === 200);
                setUsername(response.data.message.user.username)
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
    return (
        <div className="relative min-h-screen bg-mainBgColor">
            {/* Background Animated Circles */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ duration: 1 }}
                    className="absolute animate-pulse bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-red-300/80 blur-[80px] md:blur-[150px]"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1.2 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute animate-pulse top-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-cyan-500/40 blur-[60px] md:blur-[120px]"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 2.4 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute animate-pulse top-1/2 left-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] rounded-full bg-emerald-500/40 blur-[50px] md:blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            {/* Main container */}
            <div className="relative z-10">

                {/* Main page content starts here in this div!!! */}
                <div className=" px-4 sm:px-6 lg:px-8">
                    <div className="min-h-screen flex">
                        {/* Sidebar */}
                        <Sidebar
                            navigationItems={navigationItems}
                            activeNavItem={activeNavItem}
                            setActiveNavItem={setActiveNavItem}
                            isSidebarOpen={isSidebarOpen}
                            setIsSidebarOpen={setIsSidebarOpen}
                        />

                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col lg:ml-64">
                            {/* Header */}
                            <Header userName={username} setIsSidebarOpen={setIsSidebarOpen} />

                            {/* Main Content */}
                            <main className="flex-1 p-4 lg:p-8">
                                <div className="max-w-6xl mx-auto">
                                    {/* Search Panel - Different panel based on active navigation */}
                                    <SearchPanel activeNavItem={activeNavItem} />
                                </div>
                            </main>
                        </div>

                        {/* Mobile Sidebar Overlay */}
                        {isSidebarOpen && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}