import { redirect } from "next/navigation";

export default function LegacyExamsPage() {
  redirect("/dashboard/exams");
}
