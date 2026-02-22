"use client";

import { useState, useRef, useCallback } from "react";
import { Download, Settings, Printer } from "lucide-react";
import OMRSheet, { OMRColor, HeaderSize, InfoType } from "@/components/omr/OMRSheet";

const questionCountOptions = [40, 60, 80, 100] as const;
const colorOptions: { label: string; value: OMRColor; hex: string }[] = [
    { label: "Red", value: "red", hex: "#ef4444" },
    { label: "Gray", value: "gray", hex: "#6b7280" },
    { label: "Blue", value: "blue", hex: "#3b82f6" },
    { label: "Green", value: "green", hex: "#22c55e" },
    { label: "Purple", value: "purple", hex: "#a855f7" },
    { label: "Orange", value: "orange", hex: "#f97316" },
    { label: "Cyan", value: "cyan", hex: "#06b6d4" },
    { label: "Pink", value: "pink", hex: "#ec4899" },
    { label: "Yellow", value: "yellow", hex: "#eab308" },
    { label: "Lime", value: "lime", hex: "#84cc16" },
];

export default function OMRGeneratorPage() {
    const [institutionName, setInstitutionName] = useState("অপটিমার্ক টিউটোরিয়াল");
    const [address, setAddress] = useState("কলাপাড়া, পটুয়াখালী");
    const [questionCount, setQuestionCount] = useState<40 | 60 | 80 | 100>(100);
    const [color, setColor] = useState<OMRColor>("red");
    const [headerSize, setHeaderSize] = useState<HeaderSize>("Big");
    const [infoType, setInfoType] = useState<InfoType>("Digital");
    const [showCustomize, setShowCustomize] = useState(true);
    const sheetRef = useRef<HTMLDivElement>(null);

    const handlePrint = useCallback(() => {
        window.print();
    }, []);

    return (
        <div className="flex gap-5 print:gap-0 print:mx-0">
            {/* Controls Panel (hidden in print) */}
            <div className="w-[280px] shrink-0 print:hidden space-y-4">
                {/* Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">OMR Actions</h3>
                    <div className="space-y-3">
                        <button
                            onClick={() => setShowCustomize(!showCustomize)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors"
                        >
                            <Settings className="w-4 h-4" />
                            কাস্টমাইজ
                        </button>
                        <button
                            onClick={handlePrint}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            ডাউনলোড
                        </button>
                    </div>
                </div>

                {/* Customize Panel */}
                {showCustomize && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-4 animate-in slide-in-from-top-2">
                        <h3 className="font-semibold text-gray-800">কাস্টমাইজ</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">
                                প্রতিষ্ঠান / শিক্ষকের নাম
                            </label>
                            <input
                                type="text"
                                value={institutionName}
                                onChange={(e) => setInstitutionName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                                placeholder="Institution name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">
                                প্রশ্নের সংখ্যা
                            </label>
                            <select
                                value={questionCount}
                                onChange={(e) => setQuestionCount(Number(e.target.value) as any)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                            >
                                {questionCountOptions.map((n) => (
                                    <option key={n} value={n}>
                                        {n} প্রশ্ন
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">
                                ঠিকানা
                            </label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                                placeholder="Address"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1.5">
                                কালার থিম
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {colorOptions.map((c) => (
                                    <button
                                        key={c.value}
                                        onClick={() => setColor(c.value)}
                                        className={`w-6 h-6 rounded-full border-2 transition-all ${color === c.value ? 'border-gray-800 scale-110 shadow-sm' : 'border-transparent hover:scale-110'}`}
                                        style={{ backgroundColor: c.hex }}
                                        title={c.label}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                                    হেডার সাইজ
                                </label>
                                <select
                                    value={headerSize}
                                    onChange={(e) => setHeaderSize(e.target.value as HeaderSize)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                                >
                                    <option value="Big">বড় (Big)</option>
                                    <option value="Small">ছোট (Small)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                                    ইনফো টাইপ
                                </label>
                                <select
                                    value={infoType}
                                    onChange={(e) => setInfoType(e.target.value as InfoType)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                                >
                                    <option value="Digital">ডিজিটাল</option>
                                    <option value="Manual">ম্যানুয়াল</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Print Instructions */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-start gap-2">
                        <Printer className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                        <div className="text-sm text-blue-700">
                            <p className="font-medium mb-1">প্রিন্ট নির্দেশনা</p>
                            <p className="text-blue-600 text-xs leading-relaxed">
                                &ldquo;ডাউনলোড&rdquo; বাটনে ক্লিক করলে প্রিন্ট ডায়ালগ খুলবে।
                                &ldquo;Save as PDF&rdquo; বা প্রিন্টার সিলেক্ট করে প্রিন্ট করুন।
                                Margin &ldquo;None&rdquo; সিলেক্ট করুন।
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* OMR Sheet Preview */}
            <div className="overflow-auto print:overflow-visible" ref={sheetRef}>
                <OMRSheet
                    institutionName={institutionName}
                    address={address}
                    questionCount={questionCount}
                    color={color}
                    headerSize={headerSize}
                    infoType={infoType}
                />
            </div>
        </div>
    );
}
