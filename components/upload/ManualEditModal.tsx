"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { AnswerOption } from "@/lib/types";

const OPTIONS: AnswerOption[] = ["A", "B", "C", "D"];

export interface ManualEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  rollNumber: string;
  marks: number;
  totalMarks: number;
  answers: Record<number, AnswerOption>;
  onSave: (answers: Record<number, AnswerOption>) => void;
}

export function ManualEditModal({
  isOpen,
  onClose,
  rollNumber,
  marks,
  totalMarks = 60,
  answers,
  onSave,
}: ManualEditModalProps) {
  const [editedAnswers, setEditedAnswers] = useState(answers);

  const handleOptionChange = (questionNumber: number, option: AnswerOption) => {
    setEditedAnswers((prev) => ({ ...prev, [questionNumber]: option }));
  };

  const handleSave = () => {
    onSave(editedAnswers);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <Card className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-hidden mx-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Manual Edit - Roll {rollNumber}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Current marks: {marks}/{totalMarks}. Click to correct any misread answers.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto space-y-1 pr-2">
          {Array.from({ length: totalMarks }, (_, i) => {
            const questionNumber = i + 1;
            const selected = editedAnswers[questionNumber];

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
                    onClick={() => handleOptionChange(questionNumber, option)}
                    className={`
                      h-8 rounded border text-sm font-medium
                      transition-colors flex items-center justify-center
                      ${
                        selected === option
                          ? "bg-[#1e3a5f] text-white border-[#1e3a5f]"
                          : "bg-white text-slate-600 border-slate-300 hover:border-[#1e3a5f] hover:bg-[#1e3a5f]/5"
                      }
                      cursor-pointer
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-slate-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </Card>
    </div>
  );
}
