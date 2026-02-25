"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_V1_URL || "http://localhost:8000/v1";

interface ResultItem {
  sheet_id: number;
  exam_id: number;
  exam_name?: string;
  student_identifier?: string;
  set_label?: string;
  final_score: number;
  percentage: number;
}

export default function ResultsPageV1() {
  const { data: session } = useSession();
  const [items, setItems] = useState<ResultItem[]>([]);

  useEffect(() => {
    const run = async () => {
      if (!session?.backendAccessToken) return;
      const res = await fetch(`${baseUrl}/results`, {
        headers: { Authorization: `Bearer ${session.backendAccessToken}` },
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setItems(Array.isArray(data?.items) ? data.items : []);
      }
    };
    run();
  }, [session]);

  const download = async (format: "csv" | "pdf") => {
    if (!session?.backendAccessToken) return;
    const res = await fetch(`${baseUrl}/results/export.${format}`, {
      headers: { Authorization: `Bearer ${session.backendAccessToken}` },
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `results.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Results</h1>
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-3 py-2">Exam</th>
              <th className="text-left px-3 py-2">Student</th>
              <th className="text-left px-3 py-2">Set</th>
              <th className="text-left px-3 py-2">Score</th>
              <th className="text-left px-3 py-2">% </th>
              <th className="text-left px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.sheet_id} className="border-t border-slate-100">
                <td className="px-3 py-2">{item.exam_name || item.exam_id}</td>
                <td className="px-3 py-2">{item.student_identifier || "-"}</td>
                <td className="px-3 py-2">{item.set_label || "-"}</td>
                <td className="px-3 py-2">{item.final_score}</td>
                <td className="px-3 py-2">{item.percentage}</td>
                <td className="px-3 py-2">
                  <Link className="text-slate-900 underline" href={`/dashboard/results/${item.sheet_id}`}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => download("csv")}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
        >
          Export CSV
        </button>
        <button
          type="button"
          onClick={() => download("pdf")}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}
