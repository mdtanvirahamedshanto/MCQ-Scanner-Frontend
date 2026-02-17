"use client";

import { type AnswerOption } from "@/lib/types";

const OPTIONS: AnswerOption[] = ["A", "B", "C", "D"];
const QUESTIONS_COUNT = 60;

export interface AnswerKeyGridProps {
  answerKey: Record<number, AnswerOption>;
  onChange: (questionNumber: number, option: AnswerOption) => void;
  disabled?: boolean;
}

export function AnswerKeyGrid({
  answerKey,
  onChange,
  disabled = false,
}: AnswerKeyGridProps) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Header */}
        <div className="grid grid-cols-[50px_repeat(4,1fr)] gap-2 mb-2 sticky top-0 bg-white py-2 z-10">
          <div className="font-medium text-slate-600 text-sm">Q.No</div>
          {OPTIONS.map((opt) => (
            <div
              key={opt}
              className="font-medium text-slate-600 text-sm text-center"
            >
              {opt}
            </div>
          ))}
        </div>

        {/* Grid rows - 60 questions, 10 per visual group */}
        <div className="max-h-[400px] overflow-y-auto space-y-1 pr-2">
          {Array.from({ length: 60 }, (_, i) => {
            const questionNumber = i + 1;
            const selected = answerKey[questionNumber];

            return (
              <div
                key={questionNumber}
                className="grid grid-cols-[50px_repeat(4,1fr)] gap-2 items-center py-1 border-b border-slate-100 last:border-0"
              >
                <span className="text-sm font-medium text-slate-600">
                  {questionNumber}
                </span>
                {OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    disabled={disabled}
                    onClick={() => onChange(questionNumber, option)}
                    className={`
                      h-8 rounded border text-sm font-medium
                      transition-colors flex items-center justify-center
                      ${
                        selected === option
                          ? "bg-[#1e3a5f] text-white border-[#1e3a5f]"
                          : "bg-white text-slate-600 border-slate-300 hover:border-[#1e3a5f] hover:bg-[#1e3a5f]/5"
                      }
                      ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
