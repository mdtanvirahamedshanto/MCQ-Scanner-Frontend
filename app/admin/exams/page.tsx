"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileQuestion, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { api } from "@/lib/api";

interface ExamRow {
  id: number;
  title: string;
  subject_code: string;
  teacher_email: string;
  total_questions: number;
  date_created: string;
}

export default function AdminExamsPage() {
  const [exams, setExams] = useState<ExamRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/exams")
      .then((r) => setExams(r.data?.exams || []))
      .catch(() => setExams([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-slate-900 mb-8">All Exams</h1>
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
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Title</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Subject</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Teacher</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Questions</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Created</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((e) => (
                  <tr key={e.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="py-3 px-4">{e.id}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{e.title}</td>
                    <td className="py-3 px-4">{e.subject_code}</td>
                    <td className="py-3 px-4">{e.teacher_email}</td>
                    <td className="py-3 px-4">{e.total_questions}</td>
                    <td className="py-3 px-4 text-slate-500">{new Date(e.date_created).toLocaleDateString()}</td>
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
