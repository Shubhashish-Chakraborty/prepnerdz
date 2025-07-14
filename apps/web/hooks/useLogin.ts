// hooks/useLogin.ts
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (loginData: LoginData, onClose: () => void) => {
    setIsLoading(true);
    try {
      if (!loginData.email || !loginData.password) {
        toast.error("Please fill all fields");
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/signin`,
        loginData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Login successful!");

        if (response.data.token) {
          localStorage.setItem("authToken", response.data.token);
        }

        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        router.push("/dashboard");
        onClose();
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred during login");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};
