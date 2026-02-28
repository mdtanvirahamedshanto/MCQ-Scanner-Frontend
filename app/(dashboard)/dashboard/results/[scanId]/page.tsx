"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getToken } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { ResultViewer } from "@/components/results/ResultViewer";
import { SheetResultDetail } from "@/lib/api/types";

const baseUrl =
  process.env.NEXT_PUBLIC_BACKEND_V1_URL || "http://localhost:8000/v1";

export default function ResultDetailPageV1() {
  const router = useRouter();
  const params = useParams();
  const scanId = params.scanId as string;
  const { data: session, status } = useSession();
  const [detail, setDetail] = useState<SheetResultDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      // Wait for session to finish loading
      if (status === "loading") return;

      const token = session?.backendAccessToken || getToken();
      if (!token) {
        setError("User unauthenticated");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${baseUrl}/results/${scanId}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        if (res.ok) {
          setDetail(await res.json());
        } else {
          setError("Failed to load result. It might have been deleted.");
        }
      } catch (e) {
        setError("A network error occurred.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [session, status, scanId]);

  if (loading || status === "loading") {
    return (
      <div className="max-w-5xl mx-auto py-12 text-center text-slate-500">
        Loading result data...
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="max-w-5xl mx-auto py-12 text-center text-red-500">
        <p>{error || "Result not found"}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 border rounded-xl hover:bg-slate-50 text-slate-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Result Detail #{detail.sheet_id}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Exam ID: {detail.exam_id} | Student:{" "}
            {detail.student_identifier || "Unknown"}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        <ResultViewer detail={detail} />
      </div>
    </div>
  );
}
