"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLogin } from "@/hooks/useLogin";
import { CloseCircle } from "@/icons/CloseCircle";
import { Email } from "@/icons/Email";
import { Key } from "@/icons/Key";
import { EnterDoor } from "@/icons/EnterDoor";
import TypingText from "../ui/TypingTest";
import InputBulged from "../ui/inputs/InputBulged";
import { Button } from "../ui/buttons/Button";
import GoogleAuthBtn from "../ui/buttons/GoogleAuth";
import GithubAuthBtn from "../ui/buttons/GithubAuth";

interface LoginProps {
  open: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export const LoginModal = ({ open, onClose, onSwitchToSignup }: LoginProps) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { login, isLoading } = useLogin();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginData, onClose);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
          <div className="mx-auto w-full max-w-[95vw] sm:max-w-[480px] p-4">
            <div
              className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl w-full max-h-[90vh] overflow-y-auto"
              ref={modalRef}
            >
              {/* Close Button */}
              <div className="flex justify-end">
                <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition">
                  <CloseCircle className="size-6" />
                </button>
              </div>

              {/* Header */}
              <div className="text-center mb-6">
                <TypingText text="Login to your PrepNerdz Account!" className="text-2xl font-semibold text-gray-800" />
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                <InputBulged
                  type="email"
                  placeholder="Email"
                  icon={<Email className="size-4" />}
                  name="email"
                  onChange={handleInputChange}
                  value={loginData.email}
                />
                <InputBulged
                  type="password"
                  placeholder="Password"
                  icon={<Key className="size-4" />}
                  name="password"
                  onChange={handleInputChange}
                  value={loginData.password}
                />
                <Button
                  colorVariant="black_green"
                  endIcon={<EnterDoor className="size-5" />}
                  sizeVariant="medium"
                  text={isLoading ? "Logging in..." : "Login"}
                  type="submit"
                  disabled={isLoading}
                />
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="mx-4 text-sm text-gray-500">or</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* OAuth Buttons */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <GoogleAuthBtn text="Google" />
                <GithubAuthBtn text="Github" />
              </div>

              {/* Signup Prompt */}
              <div className="text-center mt-6 text-sm text-gray-600">
                Don’t have an account?{" "}
                <span
                  onClick={onSwitchToSignup}
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Sign Up
                </span>
              </div>

              {/* Forgot Password */}
              <div className="text-center mt-2 text-sm">
                <Link
                  href="/forgot-password"
                  className="text-gray-500 hover:text-blue-600 transition"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
