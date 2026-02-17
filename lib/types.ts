export type AnswerOption = "A" | "B" | "C" | "D";

export interface AnswerKeyEntry {
  questionNumber: number;
  correctOption: AnswerOption;
}

export interface Exam {
  id: string;
  title: string;
  subjectCode: string;
  answerKey: Record<number, AnswerOption>;
  createdAt: string;
}

export interface ScanResult {
  rollNumber: string;
  marks: number;
  totalMarks: number;
  answers?: Record<number, AnswerOption>;
  confidence?: number;
}

export interface ExamResult extends ScanResult {
  id: string;
  examId: string;
  studentName?: string;
  scannedAt: string;
}
