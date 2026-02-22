"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/ui/AuthContext";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({
  children,
  allowAdminOnly = false,
}: {
  children: React.ReactNode;
  allowAdminOnly?: boolean;
}) {
  const { isAuthenticated, isLoading, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/auth/login");
      } else if (allowAdminOnly && role !== "admin") {
        router.push("/dashboard");
      }
    }
  }, [isLoading, isAuthenticated, role, router, allowAdminOnly]);

  if (isLoading || !isAuthenticated || (allowAdminOnly && role !== "admin")) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#1e3a5f]" />
      </div>
    );
  }

  return <>{children}</>;
}
