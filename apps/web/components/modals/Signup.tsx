"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/buttons/Button";
import TypingText from "../ui/TypingTest";
import InputBulged from "../ui/inputs/InputBulged";
import GoogleAuthBtn from "../ui/buttons/GoogleAuth";
import GithubAuthBtn from "../ui/buttons/GithubAuth";
import { CloseCircle } from "@/icons/CloseCircle";
import { User } from "@/icons/User";
import { Email } from "@/icons/Email";
import { Key } from "@/icons/Key";
import { EnterDoor } from "@/icons/EnterDoor";
import { OtpDot } from "@/icons/OtpDot";
import { useSignupAuth } from "@/hooks/useSignupAuth"; // ✅ custom hook import

interface SignupProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const SignupModal = ({ open, onClose, onSwitchToLogin }: SignupProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [otp, setOtp] = useState("");

  const {
    isLoading,
    showOtpInput,
    handleSignup,
    handleOtpVerification
  } = useSignupAuth();

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const onSubmitSignup = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignup(formData);
  };

  const onSubmitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    handleOtpVerification(otp, formData.email, () => {
      onClose();
      onSwitchToLogin();
    });
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-4">
          <div className="mx-auto w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[800px] px-4">
            <div className="bg-white p-4 rounded-2xl w-full max-h-[95vh] h-auto md:h-[850px] overflow-y-auto">
              <div className="flex justify-end cursor-pointer sticky top-0 bg-white pb-2">
                <div onClick={onClose} className="p-1">
                  <CloseCircle className="size-6 md:size-10 hover:text-red-500 transition-all duration-300" />
                </div>
              </div>

              {!showOtpInput ? (
                <>
                  <div className="flex justify-center mt-2 md:mt-0">
                    <span className="bg-gradient-to-r text-xl md:text-4xl text-center font-extrabold from-red-600 via-black to-blue-600 bg-clip-text text-transparent decoration-cyan-800 cursor-pointer hover:underline">
                      <TypingText text="Create your PrepNerdz Account!!" />
                    </span>
                  </div>

                  <form onSubmit={onSubmitSignup}>
                    <div className="flex flex-col items-center space-y-4 md:space-y-8 justify-center mt-4 md:mt-6">
                      <div className="w-full max-w-xs md:max-w-md">
                        <InputBulged
                          type="text"
                          placeholder="Enter Username:"
                          icon={<User className="size-5" />}
                          name="username"
                          onChange={handleInputChange}
                          value={formData.username}
                        />
                      </div>

                      <div className="w-full max-w-xs md:max-w-md">
                        <InputBulged
                          type="email"
                          placeholder="Enter Email:"
                          icon={<Email className="size-5" />}
                          name="email"
                          onChange={handleInputChange}
                          value={formData.email}
                        />
                      </div>

                      <div className="w-full max-w-xs md:max-w-md">
                        <InputBulged
                          type="password"
                          placeholder="Enter Password:"
                          icon={<Key className="size-5" />}
                          name="password"
                          onChange={handleInputChange}
                          value={formData.password}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center mt-6 md:mt-8">
                      <Button
                        colorVariant="black_green"
                        endIcon={<EnterDoor className="size-6" />}
                        sizeVariant="medium"
                        text={isLoading ? "Processing..." : "Register"}
                        type="submit"
                        disabled={isLoading}
                      />
                    </div>
                  </form>

                  <div className="flex justify-center mt-6 md:mt-10 items-center">
                    <div className="flex justify-center items-center w-full cursor-default max-w-sm">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                      <span className="px-4 text-sm font-medium text-black">OR CONTINUE WITH</span>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 md:space-x-10 mt-3">
                    <GoogleAuthBtn text="Google" />
                    <GithubAuthBtn text="Github" />
                  </div>

                  <p className="text-black text-lg md:text-2xl font-bold text-center mt-6 px-2">
                    Already have an account?{" "}
                    <span
                      onClick={onSwitchToLogin}
                      className="text-blue-700 font-extrabold cursor-pointer hover:underline"
                    >
                      Login
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <div className="flex justify-center mt-2 md:mt-0">
                    <span className="bg-gradient-to-r text-xl md:text-4xl text-center font-extrabold from-red-600 via-black-500 to-blue-600 bg-clip-text text-transparent decoration-cyan-800 cursor-pointer hover:underline">
                      Verify Your Email
                    </span>
                  </div>

                  <form onSubmit={onSubmitOtp}>
                    <div className="flex flex-col items-center space-y-4 md:space-y-8 justify-center mt-8 md:mt-16">
                      <div className="w-full max-w-xs md:max-w-md">
                        <InputBulged
                          type="text"
                          placeholder="Enter OTP:"
                          icon={<OtpDot className="size-5" />}
                          name="otp"
                          onChange={handleOtpChange}
                          value={otp}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center mt-6 md:mt-8">
                      <Button
                        colorVariant="black_green"
                        endIcon={<EnterDoor className="size-6" />}
                        sizeVariant="medium"
                        text={isLoading ? "Verifying..." : "Verify OTP"}
                        type="submit"
                        disabled={isLoading}
                      />
                    </div>
                  </form>

                  <p className="text-center mt-4 text-sm text-gray-600">
                    Didn&apos;t receive OTP?{" "}
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSignup(formData);
                      }}
                      disabled={isLoading}
                    >
                      Resend OTP
                    </button>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
