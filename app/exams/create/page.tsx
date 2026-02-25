import { redirect } from "next/navigation";

export default function LegacyCreateExamPage() {
  redirect("/dashboard/exams/new");
}
