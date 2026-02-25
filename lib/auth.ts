/**
 * lib/auth.ts
 *
 * Lightweight wrappers around localStorage for the JWT token.
 * Provides basic getter/setter safety for isomorphic Next.js rendering.
 */

const TOKEN_KEY = "mcqscanner_token";
const TOKEN_COOKIE_KEY = "mcqscanner_token";
const AUTH_PROVIDER_KEY = "mcqscanner_auth_provider";

export type AuthProviderType = "manual" | "google";

export interface DecodedJwtPayload {
  sub?: string;
  exp?: number;
  [key: string]: unknown;
}

const setTokenCookie = (token: string) => {
  if (typeof document === "undefined") return;
  let maxAge = 60 * 60 * 24 * 7; // 7 days fallback
  const payload = decodeTokenPayload(token);
  if (payload?.exp) {
    const secondsLeft = Math.max(0, Math.floor(payload.exp - Date.now() / 1000));
    if (secondsLeft > 0) {
      maxAge = secondsLeft;
    }
  }
  document.cookie = `${TOKEN_COOKIE_KEY}=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
};

const clearTokenCookie = () => {
  if (typeof document === "undefined") return;
  document.cookie = `${TOKEN_COOKIE_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const setToken = (token: string, provider?: AuthProviderType) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
    if (provider) {
      localStorage.setItem(AUTH_PROVIDER_KEY, provider);
    }
    setTokenCookie(token);
  }
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(AUTH_PROVIDER_KEY);
    clearTokenCookie();
  }
};

export const getAuthProvider = (): AuthProviderType | null => {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(AUTH_PROVIDER_KEY);
  if (value === "manual" || value === "google") return value;
  return null;
};

export const setAuthProvider = (provider: AuthProviderType) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_PROVIDER_KEY, provider);
  }
};

// Extremely lightweight base64 JWT payload decoder (browser side only, no validation)
export const decodeTokenPayload = (token: string): DecodedJwtPayload | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((char) => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join(""),
    );

    return JSON.parse(jsonPayload) as DecodedJwtPayload;
  } catch {
    return null;
  }
};
