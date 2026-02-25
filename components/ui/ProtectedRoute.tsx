"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAuth } from "@/components/ui/AuthContext";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({
  children,
  allowAdminOnly = false,
}: {
  children: React.ReactNode;
  allowAdminOnly?: boolean;
}) {
  const { isAuthenticated: isManualAuthenticated, isLoading, role } = useAuth();
  const { data: session, status } = useSession();
  const router = useRouter();
  const isSessionAuthenticated =
    status === "authenticated" && Boolean(session?.backendAccessToken);
  const isAuthenticated = isSessionAuthenticated || isManualAuthenticated;
  const effectiveRole = role || session?.backendUser?.role || null;

  useEffect(() => {
    if (status !== "loading" && !isLoading) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (
        allowAdminOnly &&
        effectiveRole !== "admin" &&
        effectiveRole !== "superadmin"
      ) {
        router.replace("/dashboard");
      }
    }
  }, [status, isLoading, isAuthenticated, effectiveRole, router, allowAdminOnly]);

  const adminBlocked =
    allowAdminOnly &&
    effectiveRole !== "admin" &&
    effectiveRole !== "superadmin";

  if ((status === "loading" && isLoading) || !isAuthenticated || adminBlocked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#1e3a5f]" />
      </div>
    );
  }

  return <>{children}</>;
}
