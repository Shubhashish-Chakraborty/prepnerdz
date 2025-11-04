"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface SessionResponse {
  message: {
    isAuthenticated: boolean;
  };
}

export const useAuthSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get<SessionResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`,
          {
            withCredentials: true,
          }
        );

        setIsAuthenticated(response.data?.message?.isAuthenticated ?? false);
      } catch (error) {
        console.error("Session check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };

    checkSession();
  }, []);

  return { isAuthenticated, authLoading };
};
