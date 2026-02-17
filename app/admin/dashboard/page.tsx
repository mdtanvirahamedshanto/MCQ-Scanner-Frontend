"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, FileQuestion, CreditCard, BarChart3, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { api } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<{ total_users: number; total_exams: number; total_results: number; pending_payments: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/stats")
      .then((r) => setStats(r.data))
      .catch(() => setStats({ total_users: 0, total_exams: 0, total_results: 0, pending_payments: 0 }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-[#1e3a5f]" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-slate-900 mb-8">Admin Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-[#1e3a5f]" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900">{stats?.total_users ?? 0}</p>
              <p className="text-sm text-slate-500">Total Users</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <FileQuestion className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900">{stats?.total_exams ?? 0}</p>
              <p className="text-sm text-slate-500">Total Exams</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900">{stats?.total_results ?? 0}</p>
              <p className="text-sm text-slate-500">Total Results</p>
            </div>
          </div>
        </Card>
        <Link href="/admin/payments">
          <Card className="hover:border-[#1e3a5f]/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">{stats?.pending_payments ?? 0}</p>
                <p className="text-sm text-slate-500">Pending Payments</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link href="/admin/payments">
          <Card className="hover:border-[#1e3a5f]/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <CardTitle>Approve Payments</CardTitle>
              <CardDescription>
                Review and approve bKash, Nagad, and bank transfer payments from teachers.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/users">
          <Card className="hover:border-[#1e3a5f]/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <CardTitle>Manage Users</CardTitle>
              <CardDescription>
                View all registered teachers and their subscription status.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
