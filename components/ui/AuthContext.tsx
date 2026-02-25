"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  AuthProviderType,
  getToken,
  setToken as setStorageToken,
  removeToken as removeStorageToken,
  decodeTokenPayload,
} from "@/lib/auth";

const BACKEND_V1_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_V1_URL || "http://localhost:8000/v1";
const LEGACY_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: string | null;
  userId: string | null;
  institutionName: string | null;
  address: string | null;
  tokens: number;
  login: (token: string, role?: string, provider?: AuthProviderType) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  role: null,
  userId: null,
  institutionName: null,
  address: null,
  tokens: 0,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [institutionName, setInstitutionName] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [tokens, setTokens] = useState<number>(0);

  useEffect(() => {
    const initializeAuth = () => {
      const token = getToken();
      if (token) {
        try {
          const payload = decodeTokenPayload(token);
          // Verify expiration
          if (payload?.exp && payload.exp * 1000 > Date.now()) {
            setIsLoading(true);
            setIsAuthenticated(true);
            // We will fetch full profile info asynchronously
            fetchUserProfile(token);
            return;
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

  const fetchUserProfile = async (token: string) => {
    const clearAuthState = () => {
      removeStorageToken();
      setIsAuthenticated(false);
      setRole(null);
      setUserId(null);
      setInstitutionName(null);
      setAddress(null);
      setTokens(0);
    };

    try {
      const sessionRes = await fetch(`${BACKEND_V1_BASE_URL}/auth/session`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
      if (!sessionRes.ok) {
        throw new Error("v1 session failed");
      }
      const sessionData = await sessionRes.json();
      const user = sessionData?.user;

      setUserId(user?.id ? String(user.id) : null);
      setRole(user?.role || "teacher");

      const profileRes = await fetch(`${BACKEND_V1_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
      if (profileRes.ok) {
        const profile = await profileRes.json();
        setInstitutionName(profile?.institute_name || null);
        setAddress(profile?.institute_address || null);
      } else {
        setInstitutionName(null);
        setAddress(null);
      }

      const walletRes = await fetch(`${BACKEND_V1_BASE_URL}/wallet`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
      if (walletRes.ok) {
        const wallet = await walletRes.json();
        setTokens(Number(wallet?.balance || 0));
      } else {
        setTokens(0);
      }
    } catch {
      try {
        const legacyMeRes = await fetch(`${LEGACY_API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });
        if (!legacyMeRes.ok) {
          throw new Error("legacy session failed");
        }
        const me = await legacyMeRes.json();
        setUserId(me?.id ? String(me.id) : null);
        setRole(me?.role || "teacher");
        setInstitutionName(me?.institution_name || null);
        setAddress(me?.address || null);
        setTokens(Number(me?.tokens || 0));
      } catch {
        clearAuthState();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = (
    token: string,
    newRole?: string,
    provider: AuthProviderType = "manual",
  ) => {
    setStorageToken(token, provider);
    setIsLoading(true);
    setIsAuthenticated(true);
    if (newRole) {
      setRole(newRole);
    }
    fetchUserProfile(token);
  };

  const logout = () => {
    removeStorageToken();
    setIsAuthenticated(false);
    setRole(null);
    setUserId(null);
    setInstitutionName(null);
    setAddress(null);
    setTokens(0);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        role,
        userId,
        institutionName,
        address,
        tokens,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
