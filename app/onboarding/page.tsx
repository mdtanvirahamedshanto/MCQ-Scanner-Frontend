"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_V1_URL || "http://localhost:8000/v1";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    instituteName: "",
    instituteAddress: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    const run = async () => {
      if (status !== "authenticated") {
        setLoading(false);
        return;
      }
      if (!session?.backendAccessToken) {
        await signOut({ callbackUrl: "/login" });
        return;
      }

      try {
        const res = await fetch(`${backendBaseUrl}/profile`, {
          headers: { Authorization: `Bearer ${session.backendAccessToken}` },
          cache: "no-store",
        });
        if (res.ok) {
          const p = await res.json();
          if (p?.profile_completed) {
            router.replace("/dashboard");
            return;
          }
          setForm({
            instituteName: p?.institute_name || "",
            instituteAddress: p?.institute_address || "",
            phone: p?.phone || "",
            website: p?.website || "",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.backendAccessToken) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${backendBaseUrl}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.backendAccessToken}`,
        },
        body: JSON.stringify({
          institute_name: form.instituteName,
          institute_address: form.instituteAddress,
          phone: form.phone || null,
          website: form.website || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.detail || "Failed to save profile");
      }

      addToast("Profile completed successfully", "success");
      router.replace("/dashboard");
    } catch (error) {
      addToast(error instanceof Error ? error.message : "Failed to save profile", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Complete Your Profile</h1>
        <p className="text-sm text-slate-500 mt-2">
          You must complete these details before accessing scan and billing features.
        </p>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <Input
            label="Institute Name"
            value={form.instituteName}
            onChange={(e) => setForm((p) => ({ ...p, instituteName: e.target.value }))}
            required
          />
          <Input
            label="Institute Address"
            value={form.instituteAddress}
            onChange={(e) => setForm((p) => ({ ...p, instituteAddress: e.target.value }))}
            required
          />
          <Input
            label="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          />
          <Input
            label="Website (optional)"
            value={form.website}
            onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
          />

          <Button type="submit" className="w-full" size="lg" isLoading={submitting}>
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  );
}
