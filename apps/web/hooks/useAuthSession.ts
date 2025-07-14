"use client";

import { useEffect, useState } from "react";
import axios from "axios";

/**
 * Custom hook to check user session and authentication status
 * from the backend using `/api/v1/auth/user/session` endpoint.
 *
 * @returns {{
 *   isAuthenticated: boolean;
 *   authLoading: boolean;
 * }}
 */
export const useAuthSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      setAuthLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/user/session`,
          {
            withCredentials: true,
          }
        );

        if (response.data?.message?.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
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
