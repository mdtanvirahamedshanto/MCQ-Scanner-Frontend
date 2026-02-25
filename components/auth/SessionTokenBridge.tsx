"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

import { getAuthProvider, removeToken, setToken } from "@/lib/auth";

export function SessionTokenBridge() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.backendAccessToken) {
      setToken(session.backendAccessToken, "google");
      if (session.user?.name) {
        localStorage.setItem("mcqscanner_user_name", session.user.name);
      }
      return;
    }

    if (status === "authenticated" && !session?.backendAccessToken) {
      if (getAuthProvider() === "google") {
        removeToken();
      }
    }

    if (status === "unauthenticated") {
      if (getAuthProvider() === "google") {
        removeToken();
        localStorage.removeItem("mcqscanner_user_name");
      }
    }
  }, [session, status]);

  return null;
}
