"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

import { Button } from "./buttons/Button";
import { User } from "@/icons/User";
import { Home } from "@/icons/Home";
import { Bookmark } from "@/icons/Bookmark";
import { SettingsIcon } from "@/icons/Settings";
import { Right } from "@/icons/Right";
import { Question } from "@/icons/Question";
import TypingText from "./TypingTest";

interface HeaderProps {
  userName: string;
  setIsSidebarOpen: (open: boolean) => void;
}

// Helper function to get initials from a name
const getInitials = (name: string) => {
  if (!name) return "";
  const words = name.trim().split(' ');
  // If there's only one word, return the first letter.
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  // Otherwise, return the first letter of the first and last words.
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

export default function Header({ userName, setIsSidebarOpen }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const avatarMenuRef = useRef<HTMLDivElement>(null);

  const [avatar, setAvatar] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [joined, setJoined] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [contactProvided, setContactProvided] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`,
          { withCredentials: true }
        );
        const user = response.data.message.user;
        setUsername(user.username);
        setEmail(user.email);
        setRole(user.role);
        setContact(user.contactNumber);
        setJoined(user.UserAddedAt.split("T")[0].split("-").reverse().join("-"));
        setContactProvided(user.contactNumber !== "NOT_PROVIDED");
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/avatar/get-avatar`, {
          withCredentials: true,
        });
        if (res.data?.url) setAvatar(res.data.url);
      } catch (err) {
        console.error("Failed to fetch avatar:", err);
      }
    };
    fetchAvatar();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/logout`, {}, { withCredentials: true });
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const removeProfileImageHandler = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/avatar/delete-avatar`, {
        withCredentials: true,
      });
      setAvatar(null);
      setIsDropdownOpen(false);
      toast.success("Profile Picture deleted Successfully!");
    } catch (err) {
      console.error("Failed to remove profile image:", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-lg top-0 w-full sticky z-30">
      <div className="flex items-center justify-between h-20 px-4 lg:px-8">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Greeting */}
        <div className="hidden sm:block">
          <div className="flex items-center gap-3 lg:gap-4">
            {/* <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg lg:text-xl font-bold">
                {getGreeting().charAt(0)}
              </span>
            </div> */}
            <div>
              <h2 className="text-lg lg:text-2xl font-bold text-gray-800">
                <TypingText text={getGreeting()} />{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:underline cursor-pointer">{userName}</span>! 👋
              </h2>
              <p className="text-xs lg:text-sm text-gray-500 hidden lg:block">Welcome back to your dashboard</p>
            </div>
          </div>
        </div>

        {/* Avatar + Dropdown + Logout */}
        <div className="flex items-center gap-2 sm:gap-4" ref={avatarMenuRef}>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-12 h-12 sm:w-16 sm:h-16 cursor-pointer rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-amber-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {avatar ? (
                <Image src={avatar} alt="User Avatar" width={64} height={64} className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-amber-500 to-yellow-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {getInitials(userName)}
                  </span>
                </div>
              )}
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
                >
                  <div className="text-center border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-amber-50 to-yellow-50">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-white">
                        {getInitials(username)}
                      </span>
                    </div>
                    <p className="font-bold text-lg text-gray-900 truncate">{username}</p>
                    <p className="text-sm text-amber-600 font-medium truncate">{email}</p>
                    {contact !== "NOT_PROVIDED" && <p className="text-sm text-gray-600">{contact}</p>}
                  </div>

                  <div className="py-2">
                    <button onClick={() => router.push("/")} className="w-full flex items-center px-6 py-3 hover:bg-gray-50 transition-colors duration-200">
                      <Home className="mr-4 size-5 text-gray-600" />
                      <span className="font-medium">Home</span>
                    </button>
                    <button onClick={() => router.push("/mybookmarks")} className="w-full flex items-center px-6 py-3 hover:bg-gray-50 transition-colors duration-200">
                      <Bookmark className="mr-4 size-5 text-gray-600" />
                      <span className="font-medium">My Bookmarks</span>
                    </button>

                    {/* Settings Dropdown */}
                    <div className="border-t border-gray-200 my-2" />
                    <button
                      onClick={() => setSettingsOpen(!settingsOpen)}
                      className="w-full flex justify-between items-center px-6 py-3 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="flex items-center gap-3">
                        <SettingsIcon />
                        <span className="font-medium">Settings</span>
                      </span>
                      <Right className={`size-5 transition-transform duration-200 ${settingsOpen ? "rotate-90" : ""}`} />
                    </button>

                    {settingsOpen && (
                      <div className="pl-8 space-y-1">
                        <button onClick={() => router.push("/change-username")} className="w-full px-6 py-2 hover:bg-amber-50 text-left rounded-lg transition-colors duration-200">
                          <span className="text-sm font-medium">Change Username</span>
                        </button>
                        <button onClick={() => router.push("/forgot-password")} className="w-full px-6 py-2 hover:bg-amber-50 text-left rounded-lg transition-colors duration-200">
                          <span className="text-sm font-medium">Change Password</span>
                        </button>
                        <button onClick={() => router.push("/change-contact")} className="w-full px-6 py-2 hover:bg-amber-50 text-left rounded-lg transition-colors duration-200">
                          <span className="text-sm font-medium">{contactProvided ? "Change Contact Number" : "Contact Number (required)"}</span>
                        </button>
                        <button onClick={() => router.push("/upload-avatar")} className="w-full px-6 py-2 hover:bg-amber-50 text-left rounded-lg transition-colors duration-200">
                          <span className="text-sm font-medium">Change Profile Picture</span>
                        </button>
                        {avatar && (
                          <button onClick={removeProfileImageHandler} className="w-full px-6 py-2 font-medium text-red-600 hover:bg-red-50 text-left rounded-lg transition-colors duration-200">
                            Remove Profile Picture
                          </button>
                        )}
                      </div>
                    )}

                    {role === "ADMIN" && (
                      <button
                        onClick={() => {window.location.href = "https://pnadmin.vercel.app"}}
                        className="w-full flex text-purple-600 font-medium items-center px-6 py-3 hover:bg-amber-50 transition-colors duration-200"
                      >
                        <User className="mr-4 size-5" />
                        Admin Panel
                      </button>
                    )}

                    <button onClick={() => router.push("/?scrollTo=guide")} className="w-full flex items-center px-6 py-3 hover:bg-gray-50 transition-colors duration-200">
                      <Question className="mr-4 size-5 text-gray-600" />
                      <span className="font-medium">Help</span>
                    </button>

                    <div className="md:hidden flex justify-center p-4">
                      <Button text="LogOut" colorVariant="red" sizeVariant="small" onClick={handleLogout} />
                    </div>
                  </div>

                  <div className="text-center border-t border-gray-200 px-6 py-3 bg-gray-50">
                    <p className="text-sm font-medium text-gray-600">Member since: {joined}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logout Button */}
          <div className="hidden sm:block">
            <button
              onClick={handleLogout}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {isDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />}
    </header>
  );
}