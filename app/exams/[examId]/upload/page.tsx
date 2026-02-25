import { redirect } from "next/navigation";

export default async function LegacyExamUploadPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  redirect(`/dashboard/exams/${examId}/scan`);
}
