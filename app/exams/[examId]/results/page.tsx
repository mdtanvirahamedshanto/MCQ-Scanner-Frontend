import { redirect } from "next/navigation";

export default async function LegacyExamResultsPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  redirect(`/dashboard/results?examId=${encodeURIComponent(examId)}`);
}
