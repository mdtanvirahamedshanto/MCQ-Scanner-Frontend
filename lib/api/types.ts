export interface ProfileStatus {
  profile_completed: boolean;
}

export interface ScanJob {
  id: number;
  batch_id: number;
  exam_id: number;
  source_file_key: string;
  status: "queued" | "processing" | "done" | "failed" | "canceled";
  attempts: number;
  error_code?: string | null;
  error_message?: string | null;
  token_charged: boolean;
  created_at: string;
  updated_at?: string | null;
}

export interface ScanBatch {
  id: number;
  exam_id: number;
  status: "created" | "queued" | "processing" | "completed" | "partial_failed" | "failed";
  total_files: number;
  processed_files: number;
  created_at: string;
  jobs: ScanJob[];
}

export interface WalletLedgerEntry {
  id: number;
  direction: "credit" | "debit";
  reason: string;
  reference_type: string;
  reference_id: string;
  delta: number;
  before_balance: number;
  after_balance: number;
  created_at: string;
}

export interface SheetResultDetail {
  sheet_id: number;
  exam_id: number;
  student_identifier?: string | null;
  set_label?: string | null;
  summary: {
    correct: number;
    wrong: number;
    unanswered: number;
    invalid: number;
    raw_score: number;
    final_score: number;
    percentage: number;
  };
  questions: Array<{
    question_no: number;
    selected_option?: string | null;
    correct_option?: string | null;
    status: "correct" | "wrong" | "unanswered" | "invalid";
    mark_awarded: number;
  }>;
}
