"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Upload, ArrowLeft, FileText, FileDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { api } from "@/lib/api";

export default function ExamDetailPage() {
  const params = useParams();
  const examId = params.examId as string;

  const handleDownloadOMRTemplate = async () => {
    try {
      const res = await api.get(`/exams/${examId}/omr-template`, { responseType: "blob" });
      const blob = res.data;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `OMR-Sheet-${examId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Failed to download. Ensure you are logged in.");
    }
  };

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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Step 1: OMR Template - for students to print */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1e3a5f] text-white text-sm font-semibold">1</span>
              <CardTitle className="mb-0">OMR Answer Sheet Template</CardTitle>
            </div>
            <CardDescription>
              Download the standardized OMR sheet PDF for students to print and fill during the exam.
            </CardDescription>
          </CardHeader>
          <Button
            variant="outline"
            leftIcon={<FileDown className="h-5 w-5" />}
            onClick={handleDownloadOMRTemplate}
          >
            Download OMR Sheet PDF
          </Button>
        </Card>

        {/* Step 2: Upload scanned OMR sheets */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1e3a5f] text-white text-sm font-semibold">2</span>
              <CardTitle className="mb-0">Upload & Scan OMR Sheets</CardTitle>
            </div>
            <CardDescription>
              After the exam, upload photos or scans of filled OMR sheets. The system will detect roll numbers, set codes, and answers automatically.
            </CardDescription>
          </CardHeader>
          <Link href={`/exams/${examId}/upload`}>
            <Button size="lg" leftIcon={<Upload className="h-5 w-5" />}>
              Upload & Scan OMR
            </Button>
          </Link>
        </Card>

        {/* Step 3: View & download results */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1e3a5f] text-white text-sm font-semibold">3</span>
              <CardTitle className="mb-0">View Results & Download</CardTitle>
            </div>
            <CardDescription>
              View graded results, class statistics, and download result sheets in Excel or PDF.
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
