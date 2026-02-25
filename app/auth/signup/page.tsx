"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Chrome } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { useAuth } from "@/components/ui/AuthContext";
import { getErrorMessageFromPayload } from "@/lib/api/error";

const LEGACY_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export default function ManualSignupPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const { login, isAuthenticated, isLoading } = useAuth();
  const { status } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    institutionName: "",
    address: "",
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
      return;
    }
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [status, isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (form.password.length < 8) {
      const message = "Password must be at least 8 characters";
      setFormError(message);
      addToast(message, "error");
      return;
    }
    if (!form.institutionName.trim()) {
      const message = "Institution Name is required";
      setFormError(message);
      addToast(message, "error");
      return;
    }
    if (!form.address.trim()) {
      const message = "Address is required";
      setFormError(message);
      addToast(message, "error");
      return;
    }
    if (form.password !== form.confirmPassword) {
      const message = "Passwords do not match";
      setFormError(message);
      addToast(message, "error");
      return;
    }

    setSubmitting(true);
    try {
      const registerRes = await fetch(`${LEGACY_API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
          institution_name: form.institutionName.trim(),
          address: form.address.trim(),
        }),
      });
      const registerData = await registerRes.json().catch(() => ({}));
      if (!registerRes.ok) {
        throw new Error(
          getErrorMessageFromPayload(registerData, "Registration failed"),
        );
      }

      const loginRes = await fetch(`${LEGACY_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });
      const loginData = await loginRes.json().catch(() => ({}));
      if (!loginRes.ok || !loginData?.access_token) {
        throw new Error(
          getErrorMessageFromPayload(
            loginData,
            "Login after registration failed",
          ),
        );
      }

      login(loginData.access_token, loginData.role || "teacher", "manual");
      addToast("Account created successfully", "success");
      router.replace("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error && error.message === "Failed to fetch"
          ? "Cannot connect to server. Please check backend is running."
          : error instanceof Error
            ? error.message
            : "Registration failed";
      setFormError(message);
      addToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Manual Register</h1>
        <p className="text-sm text-slate-500 mt-2">
          Create account with email and password.
        </p>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            required
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm((p) => ({ ...p, confirmPassword: e.target.value }))
            }
            required
          />
          <Input
            label="Institution Name"
            value={form.institutionName}
            onChange={(e) =>
              setForm((p) => ({ ...p, institutionName: e.target.value }))
            }
            required
          />
          <Input
            label="Address"
            value={form.address}
            onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
            required
          />
          <Button type="submit" className="w-full" isLoading={submitting}>
            Register
          </Button>
          {formError && (
            <p className="text-sm text-red-600">{formError}</p>
          )}
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          OR
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <Button
          className="w-full"
          size="lg"
          leftIcon={<Chrome className="h-5 w-5" />}
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          Register with Google
        </Button>

        <div className="mt-5 text-sm text-center text-slate-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
