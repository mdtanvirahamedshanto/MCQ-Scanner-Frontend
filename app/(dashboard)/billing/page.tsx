"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_V1_URL || "http://localhost:8000/v1";

interface Plan {
  id: number;
  code: string;
  name: string;
  price_amount: number;
  tokens_included: number;
  currency: string;
}

export default function BillingPageV1() {
  const { data: session } = useSession();
  const { addToast } = useToast();

  const [wallet, setWallet] = useState(0);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [transactionRef, setTransactionRef] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!session?.backendAccessToken) return;
      const [wRes, pRes] = await Promise.all([
        fetch(`${baseUrl}/wallet`, { headers: { Authorization: `Bearer ${session.backendAccessToken}` } }),
        fetch(`${baseUrl}/plans`, { headers: { Authorization: `Bearer ${session.backendAccessToken}` } }),
      ]);
      if (wRes.ok) {
        const w = await wRes.json();
        setWallet(w.balance || 0);
      }
      if (pRes.ok) {
        const p = await pRes.json();
        setPlans(Array.isArray(p) ? p : []);
      }
    };
    run();
  }, [session]);

  const submitManual = async () => {
    if (!session?.backendAccessToken || !selectedPlan) return;
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.backendAccessToken}`,
        },
        body: JSON.stringify({
          plan_code: selectedPlan,
          payment_mode: "manual",
          transaction_ref: transactionRef || null,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.detail || "Failed to submit subscription request");
      }
      addToast("Subscription request submitted for manual verification", "success");
      setTransactionRef("");
    } catch (error) {
      addToast(error instanceof Error ? error.message : "Failed to submit request", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <h1 className="text-2xl font-semibold">Billing & Tokens</h1>
      <div className="border border-slate-200 rounded-lg p-4">Current token balance: <b>{wallet}</b></div>

      <div className="grid sm:grid-cols-3 gap-3">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlan(plan.code)}
            className={`border rounded-lg p-4 text-left ${selectedPlan === plan.code ? "border-slate-900" : "border-slate-200"}`}
          >
            <p className="font-medium">{plan.name}</p>
            <p className="text-sm text-slate-500">{plan.currency} {plan.price_amount}</p>
            <p className="text-sm text-slate-500">{plan.tokens_included} tokens</p>
          </button>
        ))}
      </div>

      <Input
        label="Manual payment transaction reference"
        value={transactionRef}
        onChange={(e) => setTransactionRef(e.target.value)}
      />

      <Button onClick={submitManual} isLoading={loading} disabled={!selectedPlan}>
        Submit Manual Subscription Request
      </Button>
    </div>
  );
}
