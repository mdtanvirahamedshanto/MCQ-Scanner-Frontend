"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";

export default function ExamResultsPage() {
  const params = useParams();
  const examId = params.examId as string;

  const handleDownloadCSV = () => {
    const headers = ["Roll Number", "Marks", "Total Marks"];
    const rows: string[][] = [];
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `exam-${examId}-results.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    // Placeholder - would integrate with a PDF library
    alert("PDF download - integrate with jsPDF or similar");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/exams/${examId}`}
              className="flex items-center gap-2 text-slate-600 hover:text-[#1e3a5f] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Exam</span>
            </Link>
            <h1 className="text-xl font-semibold text-[#1e3a5f]">
              Results Analytics
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>All Results</CardTitle>
                <CardDescription>
                  View and download student results. No data yet - scan OMR
                  sheets first.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<FileSpreadsheet className="h-4 w-4" />}
                  onClick={handleDownloadCSV}
                >
                  Download CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<FileText className="h-4 w-4" />}
                  onClick={handleDownloadPDF}
                >
                  Download PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">
                    Roll Number
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">
                    Marks
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">
                    Scanned At
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3} className="py-12 text-center text-slate-500">
                    No results yet. Upload and scan OMR sheets to see results
                    here.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
