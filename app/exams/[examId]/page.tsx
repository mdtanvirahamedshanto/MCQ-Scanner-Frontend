import { redirect } from "next/navigation";

export default async function LegacyExamDetailPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  redirect(`/dashboard/exams/${examId}`);
}
