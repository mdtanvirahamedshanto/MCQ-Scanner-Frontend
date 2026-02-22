"use client";

import {
    MarkerTopLeft,
    MarkerTopRight,
    MarkerBottomLeft,
    MarkerBottomRight,
} from "./CornerMarkers";

// Bengali digits
const toBanglaNum = (n: number): string => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return String(n)
        .split("")
        .map((d) => banglaDigits[parseInt(d)])
        .join("");
};

const options = ["ক", "খ", "গ", "ঘ"];

interface OMRSheetProps {
    institutionName?: string;
    questionCount?: number;
}

function BarcodeStrip() {
    // A barcode-like strip of black bars and circles at the top
    const pattern = [
        "circle", "bar", "bar", "bar", "bar", "bar", "bar",
        "circle", "bar", "bar", "circle", "bar", "bar", "bar",
        "bar", "bar", "bar", "circle", "circle", "circle",
    ];
    return (
        <div className="flex flex-wrap gap-1 justify-center">
            {pattern.map((type, i) =>
                type === "bar" ? (
                    <div key={i} className="w-3 h-4 bg-black" />
                ) : (
                    <div key={i} className="w-4 h-4 border border-black rounded-full bg-white" />
                )
            )}
        </div>
    );
}

function TimingMarks() {
    return (
        <div className="flex flex-row">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-6 bg-black mx-[1px]" />
            ))}
        </div>
    );
}

function AnswerRow({ questionNum, isAlt }: { questionNum: number; isAlt?: boolean }) {
    return (
        <div className="flex mt-[1px] border border-blue-500 w-[160px]">
            <div className="w-[38px] text-center border-r p-[1px] border-blue-500 text-xs">
                {toBanglaNum(questionNum)}
            </div>
            <div className="text-center flex-1 grid grid-cols-4">
                {options.map((opt, i) => (
                    <div
                        key={i}
                        className={`${i % 2 === 0 ? "bg-blue-300/70" : ""
                            } ${i < 3 ? "border-r border-blue-500" : ""} flex items-center justify-center p-[1px]`}
                    >
                        <p className="border border-black/60 rounded-full w-[18px] h-[18px] text-xs flex items-center justify-center">
                            {opt}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SetCodeBubbles() {
    return (
        <div className="border border-blue-500 grid grid-cols-2 mt-1">
            <p className="border-r text-center border-blue-500 text-sm font-medium">
                প্রশ্নের সেট কোড
            </p>
            <div className="flex justify-evenly gap-2 p-0.5">
                {options.map((opt, i) => (
                    <div key={i} className="flex items-center justify-center">
                        <span className="flex items-center justify-center border border-blue-500 rounded-full h-5 w-5 text-xs">
                            {opt}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RulesSection() {
    return (
        <div className="flex gap-2">
            <div className="flex flex-1 gap-2">
                <div className="bg-blue-500 text-white flex items-center justify-center w-5 shrink-0">
                    <p className="-rotate-90 text-[12px] font-bold whitespace-nowrap">নিয়মাবলী</p>
                </div>
                <div className="text-[11px] leading-tight">
                    <p>১। বৃত্তাকার ঘরগুলো এমন ভাবে ভরাট করতে হবে যাতে ভেতরের লেখাটি দেখা না যায়।</p>
                    <p>২। উত্তরপত্রে কোন অবাঞ্চিত দাগ দেয়া যাবেনা।</p>
                    <p>৩। উত্তরপত্র কোন ভাবেই ভাজ করা যাবেনা।</p>
                    <p>৪। সেট কোড না ভরাট করলে উত্তরপত্র বাতিল হবে।</p>
                </div>
            </div>
            <div className="border h-[72px] w-[72px] border-black p-1 shrink-0 flex items-center justify-center bg-gray-50">
                <span className="text-[8px] text-gray-400 text-center">QR Code</span>
            </div>
        </div>
    );
}

function ExamTypes() {
    const types = ["অর্ধ-বার্ষিক পরীক্ষা", "মডেল টেস্ট পরীক্ষা", "বার্ষিক পরীক্ষা", "................ পরীক্ষা"];
    return (
        <div className="grid grid-cols-2 text-sm">
            {types.map((type, i) => (
                <div key={i} className="flex gap-1 items-center">
                    <div className="border-2 border-blue-500 h-4 w-4 shrink-0" />
                    {type}
                </div>
            ))}
        </div>
    );
}

export default function OMRSheet({
    institutionName = "OptiMark",
    questionCount = 80,
}: OMRSheetProps) {
    const questionsPerColumn = 20;
    const numColumns = Math.ceil(questionCount / questionsPerColumn);
    const columns: number[][] = [];

    for (let col = 0; col < numColumns; col++) {
        const start = col * questionsPerColumn + 1;
        const end = Math.min(start + questionsPerColumn - 1, questionCount);
        const colQuestions: number[] = [];
        for (let q = start; q <= end; q++) {
            colQuestions.push(q);
        }
        columns.push(colQuestions);
    }

    return (
        <div className="omr-sheet select-none bg-white border border-gray-300 print:border-0 print:m-0" style={{ width: "210mm", minHeight: "297mm" }}>
            <div className="py-5">
                <div className="relative w-[750px] mx-auto">
                    {/* Corner Markers */}
                    <MarkerTopLeft className="absolute top-0 left-0 w-10 h-10 pointer-events-none" />
                    <MarkerTopRight className="absolute top-0 right-0 w-10 h-10 pointer-events-none" />
                    <MarkerBottomLeft className="absolute bottom-0 left-0 w-10 h-10 pointer-events-none" />
                    <MarkerBottomRight className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none" />

                    {/* Top Barcode Strip */}
                    <div className="absolute flex items-center justify-center top-0 left-1/2 -translate-x-1/2">
                        <div className="bg-blue-50 w-[660px] h-10">
                            <div className="text-center text-sm text-blue-600 font-bold">
                                এই বক্সে কোনো দাগ দেয়া যাবে না।
                            </div>
                            <div className="flex justify-center">
                                <BarcodeStrip />
                            </div>
                        </div>
                    </div>

                    {/* Left Timing Marks */}
                    <div
                        className="absolute flex items-center justify-center left-0 top-1/2"
                        style={{
                            transform: "translateY(-50%) rotate(-90deg) translateY(50%) translateX(2px)",
                            transformOrigin: "left center",
                        }}
                    >
                        <TimingMarks />
                    </div>

                    {/* Right Timing Marks */}
                    <div
                        className="absolute flex items-center justify-center right-0 top-1/2"
                        style={{
                            transform: "translateY(-50%) rotate(90deg) translateY(50%) translateX(-2px)",
                            transformOrigin: "right center",
                        }}
                    >
                        <TimingMarks />
                    </div>

                    {/* Clearance for top markers */}
                    <div className="h-10" />

                    {/* Content Area */}
                    <div className="mx-10">
                        <div className="w-[664px] mx-auto">
                            {/* Header Section */}
                            <div className="my-2">
                                <div className="grid grid-cols-2 border-b-2 border-black/70 pb-1">
                                    {/* Left: Institution + Exam Types */}
                                    <div className="flex items-center gap-2">
                                        <div className="w-full flex-1 h-full">
                                            <div
                                                className="h-14 font-bold text-center line-clamp-2 flex items-center justify-center"
                                                style={{ fontSize: "14px" }}
                                            >
                                                {institutionName}
                                            </div>
                                            <div className="font-bold w-full">
                                                <ExamTypes />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Rules + QR + Set Code */}
                                    <div>
                                        <RulesSection />
                                        <SetCodeBubbles />
                                    </div>
                                </div>

                                {/* Student Info Fields */}
                                <div className="my-1.5">
                                    <div className="flex gap-5">
                                        <div className="flex-1 flex gap-2 font-bold items-end">
                                            <p>নাম:</p>
                                            <p className="flex-1 border border-dashed border-blue-500" />
                                        </div>
                                        <div className="w-56 flex gap-2 font-bold items-end">
                                            <p>রোল:</p>
                                            <p className="flex-1 border border-dashed border-blue-500" />
                                        </div>
                                    </div>
                                    <div className="flex gap-5 mt-3">
                                        <div className="flex-1 flex gap-2 font-bold items-end">
                                            <p>শ্রেণি:</p>
                                            <p className="flex-1 border border-dashed border-blue-500" />
                                        </div>
                                        <div className="w-56 flex gap-2 font-bold items-end">
                                            <p>বিষয়:</p>
                                            <p className="flex-1 border border-dashed border-blue-500" />
                                        </div>
                                        <div className="w-56 flex gap-2 font-bold items-end">
                                            <p>বিভাগ:</p>
                                            <p className="flex-1 border border-dashed border-blue-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Answer Grid Title */}
                            <p className="text-center font-bold mb-2">বহুনির্বাচনি অভিক্ষার উত্তরপত্র</p>

                            {/* Answer Grid */}
                            <div className="flex gap-2">
                                {columns.map((col, colIdx) => (
                                    <div key={colIdx} className="w-[160px] text-xs">
                                        {/* Column Header */}
                                        <div className="flex border border-blue-500 font-bold h-[25px]">
                                            <div className="w-[38px] text-center border-r border-blue-500 py-1">
                                                প্রশ্ন
                                            </div>
                                            <div className="flex-1 text-center py-1">উত্তর</div>
                                        </div>
                                        {/* Question Rows */}
                                        {col.map((qNum) => (
                                            <AnswerRow key={qNum} questionNum={qNum} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
