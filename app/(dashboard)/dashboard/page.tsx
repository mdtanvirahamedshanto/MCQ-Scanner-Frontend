"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FileQuestion, Users, CreditCard, Loader2, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { api } from "@/lib/api";

interface Exam {
  id: number;
  title: string;
  subject_code: string;
  total_questions: number;
}

export default function DashboardPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalStudents, setTotalStudents] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    api.get("/auth/me").then((r) => setIsAdmin(r.data?.role === "admin")).catch(() => {});
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/exams");
        const examList = Array.isArray(res.data) ? res.data : [];
        setExams(examList);
        // Sum students from all exams (would need a separate endpoint for accurate count)
        let count = 0;
        for (const exam of examList) {
          try {
            const rRes = await api.get(`/exams/${exam.id}/results`);
            count += rRes.data?.total_count ?? 0;
          } catch {
            // ignore
          }
        }
        setTotalStudents(count);
      } catch {
        setExams([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#1e3a5f]"
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            )}
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-[#1e3a5f]"
            >
              Home
            </Link>
          </div>
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
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                ) : (
                  <p className="text-2xl font-semibold text-slate-900">
                    {exams.length}
                  </p>
                )}
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
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                ) : (
                  <p className="text-2xl font-semibold text-slate-900">
                    {totalStudents}
                  </p>
                )}
                <p className="text-sm text-slate-500">Students Scanned</p>
              </div>
            </div>
          </Card>
          <Link href="/subscription">
            <Card className="hover:border-[#1e3a5f]/50 transition-colors cursor-pointer">
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
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Create a new exam or manage existing ones
            </CardDescription>
          </CardHeader>
          <div className="space-y-4">
            <Link href="/exams/create">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-slate-300 hover:border-[#1e3a5f] hover:bg-[#1e3a5f]/5 transition-colors text-slate-700 hover:text-[#1e3a5f]"
              >
                <Plus className="h-5 w-5" />
                <span className="font-medium">Create New Exam</span>
              </button>
            </Link>
            {exams.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-700 mb-2">
                  Your Exams
                </p>
                <div className="flex flex-wrap gap-2">
                  {exams.map((exam) => (
                    <Link
                      key={exam.id}
                      href={`/exams/${exam.id}`}
                      className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-[#1e3a5f]/10 text-slate-700 hover:text-[#1e3a5f] text-sm font-medium transition-colors"
                    >
                      {exam.title} ({exam.subject_code})
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}
