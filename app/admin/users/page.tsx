"use client";

import { useEffect, useState } from "react";
import { Users, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { api } from "@/lib/api";

interface UserRow {
  id: number;
  email: string;
  role: string;
  is_subscribed: boolean;
  subscription_plan?: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/users")
      .then((r) => setUsers(r.data?.users || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-slate-900 mb-8">All Users</h1>
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#1e3a5f]" />
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Subscribed</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Plan</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="py-3 px-4">{u.id}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{u.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${u.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-slate-100 text-slate-700"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">{u.is_subscribed ? "Yes" : "No"}</td>
                    <td className="py-3 px-4">{u.subscription_plan || "-"}</td>
                    <td className="py-3 px-4 text-slate-500">{new Date(u.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
