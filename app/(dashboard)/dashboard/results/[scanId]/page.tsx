"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { ResultViewer } from "@/components/results/ResultViewer";
import { SheetResultDetail } from "@/lib/api/types";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_V1_URL || "http://localhost:8000/v1";

export default function ResultDetailPageV1() {
  const params = useParams();
  const scanId = params.scanId as string;
  const { data: session } = useSession();
  const [detail, setDetail] = useState<SheetResultDetail | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!session?.backendAccessToken) return;
      const res = await fetch(`${baseUrl}/results/${scanId}`, {
        headers: { Authorization: `Bearer ${session.backendAccessToken}` },
        cache: "no-store",
      });
      if (res.ok) {
        setDetail(await res.json());
      }
    };
    run();
  }, [session, scanId]);

  if (!detail) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Result Detail #{detail.sheet_id}</h1>
      <ResultViewer detail={detail} />
    </div>
  );
}
