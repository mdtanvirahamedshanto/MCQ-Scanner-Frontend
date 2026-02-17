"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Upload, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export default function ExamDetailPage() {
  const params = useParams();
  const examId = params.examId as string;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-slate-600 hover:text-[#1e3a5f] transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl font-semibold text-[#1e3a5f]">
            Exam Details
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Ready to Scan</CardTitle>
            <CardDescription>
              Upload OMR sheet images to scan and grade. The system will
              automatically detect roll numbers and marks.
            </CardDescription>
          </CardHeader>
          <Link href={`/exams/${examId}/upload`}>
            <Button size="lg" leftIcon={<Upload className="h-5 w-5" />}>
              Upload & Scan OMR
            </Button>
          </Link>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>View Results</CardTitle>
            <CardDescription>
              View and download all scanned results for this exam.
            </CardDescription>
          </CardHeader>
          <Link href={`/exams/${examId}/results`}>
            <Button variant="outline" leftIcon={<FileText className="h-5 w-5" />}>
              View Results
            </Button>
          </Link>
        </Card>
      </main>
    </div>
  );
}
