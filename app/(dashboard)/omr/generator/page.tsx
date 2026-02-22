'use client';

import { useState, useRef, useCallback } from "react";
import { Download } from "lucide-react";
import OMRSheet, { OMRColor, HeaderSize, InfoType } from "@/components/omr/OMRSheet";
import NormalOMRSheet from "@/components/omr/NormalOMRSheet";
import generatePDF from "react-to-pdf";

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
    // Branding
    const [institutionName, setInstitutionName] = useState("Md Tanvir Ahamed Shanto");
    const [titleSize, setTitleSize] = useState(24);
    const [address, setAddress] = useState("কলাপাড়া, পটুয়াখালী");
    const [addressSize, setAddressSize] = useState(14);

    // Template selection
    const [templateType, setTemplateType] = useState<'signature' | 'normal'>('signature');

    // Advanced (Signature) state
    const [questionCount, setQuestionCount] = useState<40 | 60 | 80 | 100>(100);
    const [color, setColor] = useState<OMRColor>("red");
    const [headerSize, setHeaderSize] = useState<HeaderSize>("Small");
    const [infoType, setInfoType] = useState<InfoType>("Digital");

    // Normal state
    const [normalQuestionCount, setNormalQuestionCount] = useState<number | string>(30);
    const [normalColumns, setNormalColumns] = useState<2 | 3 | 4>(3);

    const targetRef = useRef<HTMLDivElement>(null);

    const handleDownloadPdf = useCallback(() => {
        generatePDF(targetRef, {
            filename: `OMR_${templateType}_${Date.now()}.pdf`,
            page: {
                margin: 0,
                format: 'a4',
                orientation: 'portrait',
            },
            canvas: {
                scale: 1.5,
                useCORS: true
            }
        });
    }, [templateType]);

    // Validation for normal question count
    const parseNormalQuestionCount = (val: string | number) => {
        let v = Number(val);
        if (isNaN(v)) return 30;
        if (v < 10) return 10;
        if (v > 100) return 100;
        return v;
    };

    return (
        <div className="flex gap-6 max-w-7xl mx-auto h-[calc(100vh-6rem)] overflow-hidden">
            {/* Controls Panel */}
            <div className="w-[340px] shrink-0 h-full overflow-y-auto pb-8 scrollbar-hide">
                <div className="bg-white border rounded">

                    {/* Header & Download */}
                    <div className="bg-gray-100 p-4 border-b">
                        <h3 className="text-center text-gray-800 font-semibold mb-3">সেটিংস</h3>
                        <button
                            onClick={handleDownloadPdf}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium transition-colors shadow-sm"
                        >
                            <Download className="w-4 h-4" />
                            ডাউনলোড
                        </button>
                    </div>

                    <div className="p-4 space-y-5">
                        {/* Branding Section */}
                        <section className="space-y-4">
                            <h3 className="text-[13px] font-medium text-gray-500">ব্র্যান্ডিং</h3>

                            <div>
                                <input
                                    type="text"
                                    value={institutionName}
                                    onChange={(e) => setInstitutionName(e.target.value)}
                                    className="w-full px-3 py-2 border rounded text-[15px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <div className="flex justify-between items-center gap-3 mt-2 text-sm text-gray-700">
                                    <span>Size</span>
                                    <input
                                        type="range"
                                        min="10" max="40"
                                        value={titleSize}
                                        onChange={(e) => setTitleSize(Number(e.target.value))}
                                        className="flex-1 accent-blue-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="w-5 text-right font-medium">{titleSize}</span>
                                </div>
                            </div>

                            <div>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full px-3 py-2 border rounded text-[15px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                <div className="flex justify-between items-center gap-3 mt-2 text-sm text-gray-700">
                                    <span>Size</span>
                                    <input
                                        type="range"
                                        min="10" max="30"
                                        value={addressSize}
                                        onChange={(e) => setAddressSize(Number(e.target.value))}
                                        className="flex-1 accent-blue-500 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="w-5 text-right font-medium">{addressSize}</span>
                                </div>
                            </div>
                        </section>

                        {/* Template Selection */}
                        <section className="space-y-3">
                            <h3 className="text-[13px] font-medium text-gray-800 border-t pt-4">টেমপ্লেট নির্বাচন করুন</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setTemplateType('signature')}
                                    className={`flex flex-col items-center border rounded-md transition-all overflow-hidden ${templateType === 'signature' ? 'ring-2 ring-gray-400 border-transparent shadow' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="h-[120px] w-full bg-gray-50 flex flex-col pt-1 items-center justify-start border-b px-2 gap-1 text-[8px] text-gray-300 pointer-events-none">
                                        <div className="w-full flex justify-between px-1">
                                            <div className="w-2 h-2 bg-black"></div><div className="w-2 h-2 bg-black"></div>
                                        </div>
                                        <div className="w-20 h-2 bg-gray-200 mt-1"></div>
                                        <div className="w-16 h-1.5 bg-gray-100"></div>
                                        <div className="w-full flex justify-around mt-1">
                                            <div className="h-14 w-8 border border-red-200 bg-white"></div>
                                            <div className="h-14 w-8 border border-red-200 bg-white"></div>
                                        </div>
                                        <div className="w-full flex justify-around mt-1 space-x-0.5">
                                            <div className="h-4 w-6 border border-red-200 bg-white"></div>
                                            <div className="h-4 w-6 border border-red-200 bg-white"></div>
                                            <div className="h-4 w-6 border border-red-200 bg-white"></div>
                                            <div className="h-4 w-6 border border-red-200 bg-white"></div>
                                        </div>
                                    </div>
                                    <span className="text-[13px] font-medium text-gray-700 w-full py-2 bg-white text-center">ইপ্রুশ্নব্যাংক সিগনেচার</span>
                                </button>
                                <button
                                    onClick={() => setTemplateType('normal')}
                                    className={`flex flex-col items-center border rounded-md transition-all overflow-hidden ${templateType === 'normal' ? 'ring-2 ring-gray-400 border-transparent shadow' : 'border-gray-200 hover:border-gray-300'}`}
                                >
                                    <div className="h-[120px] w-full bg-gray-50 flex flex-col pt-2 items-center justify-start border-b px-2 gap-1 text-[8px] text-gray-300 pointer-events-none">
                                        <div className="flex w-full items-center mb-1">
                                            <div className="w-4 h-4 bg-gray-200 rounded"></div>
                                            <div className="flex-1 flex flex-col items-center">
                                                <div className="w-16 h-1.5 bg-gray-300"></div>
                                                <div className="w-10 h-1 bg-gray-200 mt-1"></div>
                                            </div>
                                        </div>
                                        <div className="w-full h-8 border border-gray-200 mb-1 flex items-center px-1"><div className="w-14 h-1 bg-gray-200"></div></div>
                                        <div className="w-full flex justify-around mb-1">
                                            <div className="w-3 h-1 bg-black"></div><div className="w-3 h-1 bg-black"></div><div className="w-3 h-1 bg-black"></div>
                                        </div>
                                        <div className="flex gap-1 w-full justify-center">
                                            <div className="h-6 w-8 border border-gray-200"></div>
                                            <div className="h-6 w-8 border border-gray-200"></div>
                                            <div className="h-6 w-8 border border-gray-200"></div>
                                        </div>
                                    </div>
                                    <span className="text-[13px] font-medium text-gray-700 w-full py-2 bg-white text-center">সাধারণ</span>
                                </button>
                            </div>
                        </section>

                        {/* Specific Template Controls */}
                        {templateType === 'normal' && (
                            <section className="space-y-4 pt-1">
                                <h3 className="text-[16px] font-bold text-gray-800">সাধারণ কাস্টমাইজ অপশনস</h3>

                                <div>
                                    <label className="block text-[13px] font-medium text-gray-500 mb-1.5">
                                        Question Count
                                    </label>
                                    <input
                                        type="number"
                                        min={10}
                                        max={100}
                                        value={normalQuestionCount}
                                        onChange={(e) => setNormalQuestionCount(e.target.value)}
                                        onBlur={(e) => setNormalQuestionCount(parseNormalQuestionCount(e.target.value))}
                                        className="w-[100px] px-3 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[13px] font-medium text-gray-500 mb-1.5">
                                        Columns
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[2, 3, 4].map((col) => (
                                            <button
                                                key={`col-${col}`}
                                                onClick={() => setNormalColumns(col as 2 | 3 | 4)}
                                                className={`flex items-center justify-center py-2 px-1 border rounded transition-all ${normalColumns === col ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`}
                                            >
                                                <div className="flex gap-1.5">
                                                    {Array.from({ length: col }).map((_, i) => (
                                                        <div key={i} className={`w-3 h-[18px] ${normalColumns === col ? 'bg-blue-400' : 'bg-gray-300'} rounded-sm`}></div>
                                                    ))}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {templateType === 'signature' && (
                            <section className="space-y-5 pt-1">
                                <h3 className="text-[16px] font-bold text-gray-800">সিগনেচার কাস্টমাইজ অপশনস</h3>

                                <div>
                                    <label className="block text-[13px] font-medium text-gray-500 mb-2 mt-2">
                                        থিম নির্বাচন করুন
                                    </label>
                                    <div className="flex flex-wrap gap-2.5">
                                        {colorOptions.map((c) => (
                                            <button
                                                key={c.value}
                                                onClick={() => setColor(c.value)}
                                                className={`w-9 h-9 rounded shadow-sm hover:scale-105 transition-all ${color === c.value ? 'ring-[3px] ring-offset-2 ring-gray-400' : ''}`}
                                                style={{ backgroundColor: c.hex }}
                                                title={c.label}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[13px] font-medium text-gray-500 mb-2">
                                        হেডার নির্বাচন করুন
                                    </label>
                                    <div className="flex gap-2">
                                        <button onClick={() => setHeaderSize('Small')} className={`flex-1 py-1.5 rounded font-medium text-[13px] transition ${headerSize === 'Small' ? 'bg-[#f43f5e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>SMALL</button>
                                        <button onClick={() => setHeaderSize('Big')} className={`flex-1 py-1.5 rounded font-medium text-[13px] transition ${headerSize === 'Big' ? 'bg-[#f43f5e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>BIG</button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[13px] font-medium text-gray-500 mb-2">
                                        পরীক্ষার্থী ও পরীক্ষার তথ্যের টাইপ
                                    </label>
                                    <div className="flex gap-2">
                                        <button onClick={() => setInfoType('Digital')} className={`flex-1 py-1.5 rounded font-medium text-[13px] transition ${infoType === 'Digital' ? 'bg-[#f43f5e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>DIGITAL</button>
                                        <button onClick={() => setInfoType('Manual')} className={`flex-1 py-1.5 rounded font-medium text-[13px] transition ${infoType === 'Manual' ? 'bg-[#f43f5e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>MANUAL</button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[13px] font-medium text-gray-500 mb-2">
                                        প্রশ্ন সংখ্যা
                                    </label>
                                    <div className="flex gap-2">
                                        {[40, 60, 80, 100].map(num => (
                                            <button key={num} onClick={() => setQuestionCount(num as any)} className={`flex-1 py-1.5 rounded font-medium text-[13px] transition ${questionCount === num ? 'bg-[#f43f5e] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{num}</button>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>

            {/* OMR Sheet Preview Workspace */}
            <div className="flex-1 bg-white border rounded shadow-inner overflow-auto relative">
                <div className="absolute min-w-full min-h-full flex items-center justify-center p-8 bg-[#eef2f6]">
                    <div ref={targetRef} className="origin-top my-4 shadow-lg">
                        {templateType === 'signature' ? (
                            <OMRSheet
                                institutionName={institutionName}
                                address={address}
                                questionCount={questionCount}
                                color={color}
                                headerSize={headerSize}
                                infoType={infoType}
                                titleSize={titleSize}
                                addressSize={addressSize}
                            />
                        ) : (
                            <NormalOMRSheet
                                institutionName={institutionName}
                                address={address}
                                questionCount={Number(normalQuestionCount) || 30}
                                columnsCount={normalColumns}
                                titleSize={titleSize}
                                addressSize={addressSize}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
