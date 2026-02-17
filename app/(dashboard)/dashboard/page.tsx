"use client";

import Link from "next/link";
import { Plus, FileQuestion, Users, CreditCard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#1e3a5f]">
              OptiMark Dashboard
            </h1>
            <p className="text-slate-600 mt-1">
              Manage your exams and OMR grading
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-[#1e3a5f]"
          >
            Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center">
                <FileQuestion className="h-6 w-6 text-[#1e3a5f]" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">0</p>
                <p className="text-sm text-slate-500">Exams Created</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-[#1e3a5f]" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">0</p>
                <p className="text-sm text-slate-500">Students Scanned</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#1e3a5f]/10 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-[#1e3a5f]" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Free Plan</p>
                <p className="text-sm text-slate-500">Subscription</p>
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Create a new exam or manage existing ones
            </CardDescription>
          </CardHeader>
          <Link href="/exams/create">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-slate-300 hover:border-[#1e3a5f] hover:bg-[#1e3a5f]/5 transition-colors text-slate-700 hover:text-[#1e3a5f]"
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Create New Exam</span>
            </button>
          </Link>
        </Card>
      </main>
    </div>
  );
}
