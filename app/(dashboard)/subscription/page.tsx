"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Banknote,
  Send,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

const CURRENCY = "৳"; // Change to $, €, etc. as needed

const PLANS = [
  {
    id: "1month",
    name: "1 Month",
    duration: "1 month",
    price: `${CURRENCY}500`,
    priceValue: 500,
    popular: false,
  },
  {
    id: "6month",
    name: "6 Months",
    duration: "6 months",
    price: `${CURRENCY}2,500`,
    priceValue: 2500,
    popular: true,
    savings: "Save 17%",
  },
  {
    id: "1year",
    name: "1 Year",
    duration: "12 months",
    price: `${CURRENCY}4,500`,
    priceValue: 4500,
    popular: false,
    savings: "Save 25%",
  },
];

const MANUAL_PAYMENT_DETAILS = {
  bankName: "Your Bank Name",
  accountName: "OptiMark",
  accountNumber: "1234567890",
  routingNumber: "BRAC-0001",
  instructions:
    "Send the payment to the above account. After payment, fill the form below with your transaction ID. We will activate your subscription within 24 hours.",
};

export default function SubscriptionPage() {
  const { addToast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showManualPayment, setShowManualPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [manualPaymentData, setManualPaymentData] = useState({
    plan: "",
    transactionId: "",
    amount: "",
    senderName: "",
    email: "",
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} copied to clipboard`, "success");
  };

  const handleManualPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // API call would go here
      addToast("Payment details submitted. We'll activate your plan within 24 hours.", "success");
      setShowManualPayment(false);
      setManualPaymentData({
        plan: "",
        transactionId: "",
        amount: "",
        senderName: "",
        email: "",
      });
    } catch {
      addToast("Failed to submit. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowManualPayment(false);
  };

  const handleManualPaymentSelect = () => {
    setSelectedPlan(null);
    setShowManualPayment(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-slate-600 hover:text-[#1e3a5f] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-semibold text-[#1e3a5f]">
              Subscription
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Plan cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? "ring-2 ring-[#1e3a5f] border-[#1e3a5f]"
                  : "hover:border-[#1e3a5f]/50"
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.popular && (
                <span className="absolute -top-2 left-4 px-2 py-0.5 bg-[#1e3a5f] text-white text-xs font-medium rounded">
                  Popular
                </span>
              )}
              <div className="text-center">
                <p className="font-semibold text-slate-900">{plan.name}</p>
                <p className="text-2xl font-bold text-[#1e3a5f] mt-1">
                  {plan.price}
                </p>
                <p className="text-sm text-slate-500">{plan.duration}</p>
                {plan.savings && (
                  <span className="inline-block mt-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    {plan.savings}
                  </span>
                )}
                <div className="mt-4 flex justify-center">
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === plan.id
                        ? "border-[#1e3a5f] bg-[#1e3a5f]"
                        : "border-slate-300"
                    }`}
                  >
                    {selectedPlan === plan.id && (
                      <Check className="h-2.5 w-2.5 text-white" />
                    )}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Manual payment option */}
        <Card
          className={`mb-8 cursor-pointer transition-all ${
            showManualPayment ? "ring-2 ring-[#1e3a5f] border-[#1e3a5f]" : ""
          }`}
          onClick={handleManualPaymentSelect}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
              <Banknote className="h-6 w-6 text-slate-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900">Manual Payment</p>
              <p className="text-sm text-slate-500">
                Send money via bank transfer. Fill form after payment.
              </p>
            </div>
            <span
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                showManualPayment ? "border-[#1e3a5f] bg-[#1e3a5f]" : "border-slate-300"
              }`}
            >
              {showManualPayment && (
                <Check className="h-2.5 w-2.5 text-white" />
              )}
            </span>
          </div>
        </Card>

        {/* Payment details (when manual selected) */}
        {showManualPayment && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bank Details</CardTitle>
                <CardDescription>
                  Send the payment amount to the following account
                </CardDescription>
              </CardHeader>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">Bank</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{MANUAL_PAYMENT_DETAILS.bankName}</span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          MANUAL_PAYMENT_DETAILS.bankName,
                          "Bank name"
                        )
                      }
                      className="p-1 rounded hover:bg-slate-100"
                    >
                      <Copy className="h-4 w-4 text-slate-500" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">Account Name</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{MANUAL_PAYMENT_DETAILS.accountName}</span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          MANUAL_PAYMENT_DETAILS.accountName,
                          "Account name"
                        )
                      }
                      className="p-1 rounded hover:bg-slate-100"
                    >
                      <Copy className="h-4 w-4 text-slate-500" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-600">Account Number</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium">
                      {MANUAL_PAYMENT_DETAILS.accountNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          MANUAL_PAYMENT_DETAILS.accountNumber,
                          "Account number"
                        )
                      }
                      className="p-1 rounded hover:bg-slate-100"
                    >
                      <Copy className="h-4 w-4 text-slate-500" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600">Routing</span>
                  <span className="font-mono font-medium">
                    {MANUAL_PAYMENT_DETAILS.routingNumber}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                {MANUAL_PAYMENT_DETAILS.instructions}
              </p>
            </Card>

            {/* Payment confirmation form */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Confirmation</CardTitle>
                <CardDescription>
                  Submit your transaction details after sending the payment
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleManualPaymentSubmit} className="space-y-4">
                <Input
                  label="Select Plan"
                  value={manualPaymentData.plan}
                  onChange={(e) =>
                    setManualPaymentData((prev) => ({
                      ...prev,
                      plan: e.target.value,
                    }))
                  }
                  placeholder="e.g., 1 Month, 6 Months, 1 Year"
                  required
                />
                <Input
                  label="Transaction ID / Reference"
                  value={manualPaymentData.transactionId}
                  onChange={(e) =>
                    setManualPaymentData((prev) => ({
                      ...prev,
                      transactionId: e.target.value,
                    }))
                  }
                  placeholder="From your bank receipt"
                  required
                />
                <Input
                  label="Amount Sent"
                  value={manualPaymentData.amount}
                  onChange={(e) =>
                    setManualPaymentData((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                  placeholder="e.g., 500"
                  required
                />
                <Input
                  label="Sender Name"
                  value={manualPaymentData.senderName}
                  onChange={(e) =>
                    setManualPaymentData((prev) => ({
                      ...prev,
                      senderName: e.target.value,
                    }))
                  }
                  placeholder="Name on bank account"
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={manualPaymentData.email}
                  onChange={(e) =>
                    setManualPaymentData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="you@example.com"
                  required
                />
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  leftIcon={<Send className="h-4 w-4" />}
                >
                  Submit Payment Details
                </Button>
              </form>
            </Card>
          </div>
        )}

        {/* Proceed button (when plan selected, not manual) */}
        {selectedPlan && !showManualPayment && (
          <Card className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-[#1e3a5f]" />
              <div>
                <p className="font-medium text-slate-900">
                  {PLANS.find((p) => p.id === selectedPlan)?.name} selected
                </p>
                <p className="text-sm text-slate-500">
                  Choose &quot;Manual Payment&quot; above to pay via bank transfer
                </p>
              </div>
            </div>
            <Button
              onClick={handleManualPaymentSelect}
              rightIcon={<Banknote className="h-4 w-4" />}
            >
              Pay Manually
            </Button>
          </Card>
        )}
      </main>
    </div>
  );
}
