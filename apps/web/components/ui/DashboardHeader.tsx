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

export default function Header({ userName, setIsSidebarOpen }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const avatarMenuRef = useRef<HTMLDivElement>(null);

  const [avatar, setAvatar] = useState<string | null>(null);
  const [username, setUsername] = useState("");
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
    <header className="bg-white border-b border-gray-200 shadow-sm sticky z-50 top-0 w-full">
      <div className="flex items-center justify-between h-24 px-4 lg:px-8">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Greeting */}
        <div className="md:block hidden">
          <h2 className="md:text-3xl text-lg font-semibold text-gray-800">
            <TypingText text={getGreeting()} />{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">{userName}</span>! 👋
          </h2>
        </div>

        {/* Avatar + Dropdown + Logout */}
        <div className="flex items-center gap-3" ref={avatarMenuRef}>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-16 cursor-pointer h-16 rounded-full overflow-hidden border-2 border-black hover:border-gray-400 transition-colors"
            >
              {avatar ? (
                <Image src={avatar} alt="User Avatar" width={48} height={48} className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full bg-amber-300 flex items-center justify-center">
                  <User className="size-5" />
                </div>
              )}
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div className="text-center border-b px-4 py-3">
                    <p className="font-bold text-lg text-gray-900 truncate">{username}</p>
                    <p className="text-sm text-blue-500 font-bold truncate">{email}</p>
                    {contact !== "NOT_PROVIDED" && <p className="text-sm">{contact}</p>}
                  </div>

                  <div className="py-1">
                    <button onClick={() => router.push("/")} className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
                      <Home className="mr-3 size-5" />
                      Home
                    </button>
                    <button onClick={() => router.push("/mybookmarks")} className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
                      <Bookmark className="mr-3 size-5" />
                      My Bookmarks
                    </button>

                    {/* Settings Dropdown */}
                    <div className="border-t my-1" />
                    <button
                      onClick={() => setSettingsOpen(!settingsOpen)}
                      className="w-full flex justify-between px-4 py-2 hover:bg-gray-100"
                    >
                      <span className="flex items-center gap-2">
                        <SettingsIcon />
                        Settings
                      </span>
                      <Right className={`size-5 transition-transform ${settingsOpen ? "rotate-90" : ""}`} />
                    </button>

                    {settingsOpen && (
                      <div className="pl-6">
                        <button onClick={() => router.push("/change-username")} className="w-full px-4 py-2 hover:bg-cyan-100 text-left">
                          Change Username
                        </button>
                        <button onClick={() => router.push("/forgot-password")} className="w-full px-4 py-2 hover:bg-cyan-100 text-left">
                          Change Password
                        </button>
                        <button onClick={() => router.push("/change-contact")} className="w-full px-4 py-2 hover:bg-cyan-100 text-left">
                          {contactProvided ? "Change Contact Number" : "Contact Number (required)"}
                        </button>
                        <button onClick={() => router.push("/upload-avatar")} className="w-full px-4 py-2 hover:bg-cyan-100 text-left">
                          Change Profile Picture
                        </button>
                        {avatar && (
                          <button onClick={removeProfileImageHandler} className="w-full px-4 py-2 font-bold text-red-600 hover:bg-cyan-100 text-left">
                            Remove Profile Picture
                          </button>
                        )}
                      </div>
                    )}

                    <button onClick={() => router.push("/?scrollTo=guide")} className="w-full flex items-center px-4 py-2 hover:bg-gray-100">
                      <Question className="mr-3 size-5" />
                      Help
                    </button>

                    <div className="md:hidden flex justify-center"> 
                      <Button text="LogOut" colorVariant="red" sizeVariant="small" onClick={handleLogout} />
                    </div>
                  </div>

                  <div className="text-center border-t px-4 py-2 text-sm font-bold">Member since: {joined}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logout Button */}
          <div className="md:block hidden">
            <Button text="LogOut" colorVariant="red" sizeVariant="medium" onClick={handleLogout} />
          </div>
        </div>
      </div>

      {isDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />}
    </header>
  );
}