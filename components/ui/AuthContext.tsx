"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  getToken,
  setToken as setStorageToken,
  removeToken as removeStorageToken,
  decodeTokenPayload,
} from "@/lib/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: string | null;
  userId: string | null;
  login: (token: string, role?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  role: null,
  userId: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = () => {
      const token = getToken();
      if (token) {
        try {
          const payload = decodeTokenPayload(token);
          // Verify expiration
          if (payload && payload.exp * 1000 > Date.now()) {
            setIsAuthenticated(true);
            setUserId(payload.sub || null);
            // Payload might not contain role directly if relying on backend return
            // Usually backend provides it on login, but if reloading we might default to teacher or decode if present in JWT
            setRole(payload.role || "teacher");
          } else {
            removeStorageToken();
          }
        } catch {
          removeStorageToken();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (token: string, newRole?: string) => {
    setStorageToken(token);
    setIsAuthenticated(true);

    const payload = decodeTokenPayload(token);
    if (payload) {
      setUserId(payload.sub || null);
    }
    setRole(newRole || payload?.role || "teacher");
  };

  const logout = () => {
    removeStorageToken();
    setIsAuthenticated(false);
    setRole(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, role, userId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
