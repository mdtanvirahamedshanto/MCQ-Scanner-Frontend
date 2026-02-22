"use client";

import { useEffect, useState } from "react";
import { Check, X, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import { api } from "@/lib/api";

interface Payment {
  id: number;
  user_id: number;
  user_email: string;
  plan_id: string;
  amount: number;
  payment_method: string;
  transaction_id: string;
  sender_name: string;
  sender_phone?: string;
  sender_email?: string;
  status: string;
  admin_notes?: string;
  created_at: string;
}

export default function AdminPaymentsPage() {
  const { addToast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("pending");
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [actioning, setActioning] = useState<number | null>(null);

  const fetchPayments = () => {
    setLoading(true);
    api
      .get(`/admin/pending-payments${filter ? `?status_filter=${filter}` : ""}`)
      .then((r) => setPayments(r.data?.payments || []))
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPayments();
  }, [filter]);

  const handleApprove = async (id: number) => {
    setActioning(id);
    try {
      await api.post(`/admin/pending-payments/${id}/approve`, { admin_notes: notes[id] || undefined });
      addToast("Payment approved. User subscription activated.", "success");
      fetchPayments();
      setNotes((p) => ({ ...p, [id]: "" }));
    } catch {
      addToast("Failed to approve.", "error");
    } finally {
      setActioning(null);
    }
  };

  const handleReject = async (id: number) => {
    setActioning(id);
    try {
      await api.post(`/admin/pending-payments/${id}/reject`, { admin_notes: notes[id] || undefined });
      addToast("Payment rejected.", "success");
      fetchPayments();
      setNotes((p) => ({ ...p, [id]: "" }));
    } catch {
      addToast("Failed to reject.", "error");
    } finally {
      setActioning(null);
    }
  };

  const pending = payments.filter((p) => p.status === "pending");

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">Pending Payments</h1>
        <div className="flex gap-2">
          <Button variant={filter === "pending" ? "primary" : "outline"} size="sm" onClick={() => setFilter("pending")}>
            Pending
          </Button>
          <Button variant={filter === "approved" ? "primary" : "outline"} size="sm" onClick={() => setFilter("approved")}>
            Approved
          </Button>
          <Button variant={filter === "rejected" ? "primary" : "outline"} size="sm" onClick={() => setFilter("rejected")}>
            Rejected
          </Button>
          <Button variant="ghost" size="sm" onClick={fetchPayments} leftIcon={<RefreshCw className="h-4 w-4" />}>
            Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#1e3a5f]" />
        </div>
      ) : payments.length === 0 ? (
        <Card>
          <div className="py-12 text-center text-slate-500">
            No {filter || "pending"} payments found.
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {payments.map((p) => (
            <Card key={p.id}>
              <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-medium text-slate-900">
                      {p.user_email} → {p.plan_id} ({p.amount} ৳)
                    </p>
                    <p className="text-sm text-slate-600">
                      {p.payment_method.replace("_", " ")} | TX: {p.transaction_id} | {p.sender_name}
                      {p.sender_phone && ` | ${p.sender_phone}`}
                    </p>
                    <p className="text-xs text-slate-500">{new Date(p.created_at).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${p.status === "approved" ? "bg-green-100 text-green-800" :
                      p.status === "rejected" ? "bg-red-100 text-red-800" :
                        "bg-amber-100 text-amber-800"
                      }`}>
                      {p.status}
                    </span>
                    {p.status === "pending" && (
                      <div className="flex flex-wrap gap-2 items-center">
                        <input
                          placeholder="Admin notes (optional)"
                          value={notes[p.id] || ""}
                          onChange={(e) => setNotes((n) => ({ ...n, [p.id]: e.target.value }))}
                          className="w-40 h-9 px-2 rounded border border-slate-300 text-sm"
                        />
                        <Button
                          size="sm"
                          variant="primary"
                          leftIcon={<Check className="h-4 w-4" />}
                          onClick={() => handleApprove(p.id)}
                          disabled={actioning === p.id}
                          isLoading={actioning === p.id}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          leftIcon={<X className="h-4 w-4" />}
                          onClick={() => handleReject(p.id)}
                          disabled={actioning === p.id}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                {p.admin_notes && (
                  <p className="mt-2 text-sm text-slate-600">Admin notes: {p.admin_notes}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
