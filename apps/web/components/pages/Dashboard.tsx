'use client'
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../ui/sidebars/Sidebar";
import Header from "../ui/DashboardHeader";
import SearchPanel from "../ui/SearchPanels/DashboardSearch";
import { Star } from "@/icons/Star";
import { BookClose } from "@/icons/BookClose";
import { Paper } from "@/icons/Paper";
import { Target } from "@/icons/Target";
import { BookOpenReading } from "@/icons/BookOpenReading";
import { Syllabus } from "@/icons/Syllabus";
import { Flask } from "@/icons/Flask";

// Navigation items configuration - easily extensible
export const navigationItems = [
    { id: "shivani-books", label: "Shivani Books", icon: <BookClose className="size-5 text-black"/> },
    { id: "midsem-papers", label: "Midsem Papers", icon: <Paper className="size-5 text-black"/> },
    { id: "endsem-papers", label: "Endsem Papers", icon: <Target className="size-5 text-black"/> },
    { id: "imp-questions", label: "Important Questions", icon: <Star className="size-5 text-black"/> },
    { id: "imp-topics", label: "Important Topics", icon: <Star className="size-5 text-black"/> },
    { id: "best-notes", label: "Best Notes", icon: <BookOpenReading className="size-5 text-black"/> },
    { id: "syllabus", label: "Syllabus", icon: <Syllabus className="size-5 text-black"/> },
    { id: "labmanual", label: "Lab Manual", icon: <Flask className="size-5 text-black"/> },
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
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-amber-100">
        {/* Modern Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1 }}
            className="absolute animate-pulse bottom-0 right-0 w-[350px] h-[350px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-br from-red-300/80 to-amber-200/60 blur-[100px] md:blur-[180px]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1.2 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute animate-pulse top-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-tr from-cyan-400/40 to-blue-200/40 blur-[80px] md:blur-[150px]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 2.4 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute animate-pulse top-1/2 left-1/2 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-br from-emerald-400/40 to-amber-200/40 blur-[70px] md:blur-[120px] transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* Main container */}
        <div className="relative z-10">
          <div className="px-2 sm:px-6 lg:px-8">
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
                <Header
                  userName={username}
                  setIsSidebarOpen={setIsSidebarOpen}
                />

                {/* Welcome Banner */}
                <div className="mb-8 flex items-center gap-4 p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow-lg border border-gray-100">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-blue-200 flex items-center justify-center shadow-md">
                    <span className="text-3xl font-bold text-white drop-shadow-lg">{username.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Welcome, {username}!</h2>
                    <p className="text-gray-500">Your personalized dashboard for all resources and tools.</p>
                  </div>
                </div>

                {/* Modern Card Section for Navigation */}
                <main className="flex-1 p-4 lg:p-8">
                  <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                      {navigationItems.map((item) => (
                        <motion.div
                          key={item.id}
                          whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", backgroundColor: "#fff" }}
                          className={`rounded-2xl shadow-xl bg-white/60 backdrop-blur-lg border border-gray-100 flex items-center gap-4 p-8 cursor-pointer transition-all duration-300 ${activeNavItem === item.id ? 'ring-2 ring-amber-400' : ''}`}
                          onClick={() => setActiveNavItem(item.id)}
                        >
                          <span className="text-4xl text-amber-500 drop-shadow-lg">{item.icon}</span>
                          <span className="font-semibold text-xl text-gray-800">{item.label}</span>
                        </motion.div>
                      ))}
                    </div>
                    {/* Search Panel - Different panel based on active navigation */}
                    <div className="rounded-2xl bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-100 p-8">
                      <SearchPanel activeNavItem={activeNavItem} />
                    </div>
                  </div>
                </main>

                {/* Floating Action Button */}
                <button
                  className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-amber-400 to-blue-400 text-white rounded-full shadow-xl p-5 hover:scale-110 transition-transform duration-300"
                  title="Quick Add Resource"
                  onClick={() => router.push('/upload-avatar')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Mobile Sidebar Overlay */}
              {isSidebarOpen && (
                <div
                  className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                  onClick={() => setIsSidebarOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
}