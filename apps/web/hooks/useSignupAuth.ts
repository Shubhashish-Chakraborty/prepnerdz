import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

export const useSignupAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleSignup = async (formData: SignupFormData): Promise<void> => {
    setIsLoading(true);
    try {
      if (!formData.username || !formData.email || !formData.password) {
        toast.error("Please fill all fields");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/signup`,
        formData
      );

      if (response.data.success) {
        toast.success("OTP sent to your email!");
        setShowOtpInput(true);
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Signup error");
      } else {
        toast.error("Unexpected error during signup");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (otp: string, email: string, onSuccess: () => void): Promise<void> => {
    setIsLoading(true);
    try {
      if (!otp) {
        toast.error("Please enter OTP");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/verify-mail`,
        { otpEntered: otp, email }
      );

      if (response.data.success) {
        toast.success("Email verified successfully!");
        onSuccess();
      } else {
        toast.error(response.data.message || "Verification failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "OTP verification error");
      } else {
        toast.error("Unexpected error during verification");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    showOtpInput,
    handleSignup,
    handleOtpVerification,
  };
};
