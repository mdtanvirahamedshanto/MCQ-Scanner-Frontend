"use client";

import { Grid3X3, FileQuestion, CheckCircle2, Download } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: 1,
    title: "Create Exam",
    titleBn: "পরীক্ষা তৈরি করুন",
    description:
      "প্রথমে একটি পরীক্ষা তৈরি করুন। বিষয়ের নাম, মোট প্রশ্ন সংখ্যা এবং সেট কনফিগার করুন।",
    icon: FileQuestion,
    href: "/dashboard/exams/new",
    color: "blue",
  },
  {
    number: 2,
    title: "OMR Template & Answer Key",
    titleBn: "OMR ও উত্তরপত্র সেটআপ",
    description:
      "পরীক্ষা থেকে OMR শিট ডাউনলোড করুন এবং প্রতিটি সেটের জন্য সঠিক উত্তর সেট আপ করুন।",
    icon: Download,
    href: "/dashboard/exams",
    color: "amber",
  },
  {
    number: 3,
    title: "Evaluate OMR",
    titleBn: "OMR মূল্যায়ন করুন",
    description:
      "পরীক্ষা থেকে 'Upload & Scan' এ গিয়ে OMR শিটের ছবি আপলোড করুন। একটি একটি করে বা সবগুলো একসাথে মূল্যায়ন করুন — মাত্র কয়েক সেকেন্ডেই ফলাফল!",
    icon: CheckCircle2,
    href: "/dashboard/exams",
    color: "emerald",
  },
];

const colorMap: Record<
  string,
  { bg: string; text: string; border: string; iconBg: string }
> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    iconBg: "bg-emerald-100",
  },
};

export default function OMRTutorialPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">
          কিভাবে OMR মূল্যায়ন করবেন?
        </h1>
        <p className="text-slate-500 text-sm">
          মাত্র ৩টি ধাপে আপনার MCQ পরীক্ষার উত্তরপত্র মূল্যায়ন করুন
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step) => {
          const Icon = step.icon;
          const colors = colorMap[step.color];
          return (
            <Link
              key={step.number}
              href={step.href}
              className={`block p-5 rounded-xl border ${colors.border} ${colors.bg} hover:shadow-md transition-all group`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs font-bold ${colors.text} uppercase`}
                    >
                      ধাপ {step.number}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">
                    {step.titleBn}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick start CTA */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <p className="text-gray-600 mb-3">এখনই শুরু করুন!</p>
        <Link
          href="/dashboard/exams/new"
          className="inline-block px-6 py-2.5 bg-[#1e3a5f] text-white rounded-lg font-medium hover:bg-[#162d4a] transition-colors"
        >
          নতুন পরীক্ষা তৈরি করুন →
        </Link>
      </div>
    </div>
  );
}
