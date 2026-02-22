"use client";

import { Grid3X3, KeyRound, CheckCircle2, FileText } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        number: 1,
        title: "Generate OMR",
        titleBn: "OMR তৈরী করুন",
        description:
            "OMR Evaluate করার জন্য প্রথমেই আপনাকে একটি OMR তৈরী করতে হবে। আমাদের Website থেকে তৈরী ব্যতীত অন্য কোনো OMR মূল্যায়ন করা সম্ভব নয়।",
        icon: Grid3X3,
        href: "/omr/generator",
        color: "blue",
    },
    {
        number: 2,
        title: "Create Token",
        titleBn: "টোকেন তৈরী করুন",
        description:
            "প্রশ্নের সঠিক উত্তর, নম্বর বণ্টন এবং অন্যান্য তথ্য দিয়ে একটি টোকেন তৈরী করুন। এই টোকেন দিয়ে OMR মূল্যায়ন করা হবে।",
        icon: KeyRound,
        href: "/omr/token",
        color: "amber",
    },
    {
        number: 3,
        title: "Evaluate OMR",
        titleBn: "OMR মূল্যায়ন করুন",
        description:
            "OMR Sheet এর ছবি তুলুন অথবা আপলোড করুন। তৈরী করা টোকেন সিলেক্ট করুন এবং মূল্যায়ন বাটনে ক্লিক করুন। মাত্র ১ সেকেন্ডেই ১০০ প্রশ্নের OMR মূল্যায়ন হয়ে যাবে!",
        icon: CheckCircle2,
        href: "/omr/evaluator",
        color: "emerald",
    },
];

const colorMap: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
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
            {/* Video Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 text-center">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        নিচের ভিডিও পুরোটা দেখুন (৩৭ সে. থেকে)
                    </h2>
                </div>
                <div className="aspect-video w-full">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="OMR Evaluator Tutorial"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>

            {/* Steps Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 text-center">
                        OMR Evaluator Steps
                    </h2>
                </div>
                <div className="p-6 space-y-4">
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
                                            <span className={`text-xs font-bold ${colors.text} uppercase`}>
                                                Step {step.number}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-gray-800 text-lg mb-1">
                                            {step.title}
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
            </div>
        </div>
    );
}
