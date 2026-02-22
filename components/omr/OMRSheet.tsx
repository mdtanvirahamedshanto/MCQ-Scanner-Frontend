'use client';

import React from 'react';

export type OMRColor =
    | 'red'
    | 'gray'
    | 'blue'
    | 'green'
    | 'purple'
    | 'orange'
    | 'cyan'
    | 'pink'
    | 'yellow'
    | 'lime';

export type HeaderSize = 'Small' | 'Big';
export type InfoType = 'Digital' | 'Manual';

export interface OMRSheetProps {
    color?: OMRColor;
    questionCount?: 40 | 60 | 80 | 100;
    headerSize?: HeaderSize;
    infoType?: InfoType;
    institutionName?: string;
    address?: string;
    titleSize?: number;
    addressSize?: number;
}

const colorMaps: Record<OMRColor, any> = {
    red: { text600: { color: '#e11d48' }, text500: { color: '#f43f5e' }, border: { borderColor: '#f43f5e' }, bg50: { backgroundColor: '#fff1f2' }, bg300: { backgroundColor: '#fda4af70' }, bgSolid: { backgroundColor: '#f43f5e' } },
    gray: { text600: { color: '#4b5563' }, text500: { color: '#6b7280' }, border: { borderColor: '#6b7280' }, bg50: { backgroundColor: '#f9fafb' }, bg300: { backgroundColor: '#e5e7eb' }, bgSolid: { backgroundColor: '#6b7280' } },
    blue: { text600: { color: '#2563eb' }, text500: { color: '#3b82f6' }, border: { borderColor: '#3b82f6' }, bg50: { backgroundColor: '#eff6ff' }, bg300: { backgroundColor: '#93c5fd70' }, bgSolid: { backgroundColor: '#3b82f6' } },
    green: { text600: { color: '#16a34a' }, text500: { color: '#22c55e' }, border: { borderColor: '#22c55e' }, bg50: { backgroundColor: '#f0fdf4' }, bg300: { backgroundColor: '#86efac70' }, bgSolid: { backgroundColor: '#22c55e' } },
    purple: { text600: { color: '#9333ea' }, text500: { color: '#a855f7' }, border: { borderColor: '#a855f7' }, bg50: { backgroundColor: '#faf5ff' }, bg300: { backgroundColor: '#d8b4fe70' }, bgSolid: { backgroundColor: '#a855f7' } },
    orange: { text600: { color: '#ea580c' }, text500: { color: '#f97316' }, border: { borderColor: '#f97316' }, bg50: { backgroundColor: '#fff7ed' }, bg300: { backgroundColor: '#fdba7470' }, bgSolid: { backgroundColor: '#f97316' } },
    cyan: { text600: { color: '#0891b2' }, text500: { color: '#06b6d4' }, border: { borderColor: '#06b6d4' }, bg50: { backgroundColor: '#ecfeff' }, bg300: { backgroundColor: '#67e8f970' }, bgSolid: { backgroundColor: '#06b6d4' } },
    pink: { text600: { color: '#db2777' }, text500: { color: '#ec4899' }, border: { borderColor: '#ec4899' }, bg50: { backgroundColor: '#fdf2f8' }, bg300: { backgroundColor: '#f9a8d470' }, bgSolid: { backgroundColor: '#ec4899' } },
    yellow: { text600: { color: '#ca8a04' }, text500: { color: '#eab308' }, border: { borderColor: '#eab308' }, bg50: { backgroundColor: '#fefce8' }, bg300: { backgroundColor: '#fde04770' }, bgSolid: { backgroundColor: '#eab308' } },
    lime: { text600: { color: '#65a30d' }, text500: { color: '#84cc16' }, border: { borderColor: '#84cc16' }, bg50: { backgroundColor: '#f7fee7' }, bg300: { backgroundColor: '#bef26470' }, bgSolid: { backgroundColor: '#84cc16' } },
};

// Bengali numbers helper
const toBengaliNumber = (num: number) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num
        .toString()
        .split('')
        .map((digit) => bengaliDigits[parseInt(digit, 10)])
        .join('');
};

export default function OMRSheet({
    color = 'red',
    questionCount = 100,
    headerSize = 'Big',
    infoType = 'Digital',
    institutionName = 'Md Tanvir Ahamed Shanto',
    address = 'কলাপাড়া, পটুয়াখালী',
    titleSize = 18,
    addressSize = 14,
}: OMRSheetProps) {
    const theme = colorMaps[color];

    // Calculate grid layout (fixed to max 4 columns)
    // 100 -> 4 columns of 25
    // 80 -> 4 columns of 20
    // 60 -> 3 columns of 20
    // 40 -> 2 columns of 20
    // Reference for sizing: column typically holds up to 25 rows
    const questionsPerColumn = questionCount === 100 ? 25 : 20;
    const numColumns = Math.ceil(questionCount / questionsPerColumn);

    const columns = Array.from({ length: numColumns }, (_, colIndex) => {
        const start = colIndex * questionsPerColumn + 1;
        const end = Math.min((colIndex + 1) * questionsPerColumn, questionCount);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });

    return (
        <div className="p-5 select-none w-max mx-auto shadow-md border rounded-lg overflow-x-auto" style={{ backgroundColor: '#ffffff' }}>
            <div className="relative w-[750px] mx-auto" id="omr-printable-area" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
                {/* Markers */}
                <div className="absolute top-0 left-0 w-10 h-10 pointer-events-none opacity-0" style={{ backgroundColor: '#000000' }}></div>
                <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none opacity-0" style={{ backgroundColor: '#000000' }}></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 pointer-events-none opacity-0" style={{ backgroundColor: '#000000' }}></div>
                <div className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none opacity-0" style={{ backgroundColor: '#000000' }}></div>

                {/* Top Warning Box */}
                <div className="absolute flex items-center justify-center top-0 left-1/2 -translate-x-1/2 mt-1">
                    <div className="w-[660px] h-10 flex flex-col items-center pt-0.5" style={theme.bg50}>
                        <div className="text-center text-sm font-bold" style={theme.text600}>এই বক্সে কোনো দাগ দেয়া যাবে না।</div>
                        <div className="flex justify-center items-center h-5">
                            <div className="flex flex-wrap gap-1 items-center">
                                <div className="w-4 h-4 border rounded-full" style={{ borderColor: '#000000', backgroundColor: '#ffffff' }}></div>
                                {Array.from({ length: 3 }).map((_, i) => <div key={`b1-${i}`} className="w-3 h-4" style={{ backgroundColor: '#000000' }}></div>)}
                                <div className="w-4 h-4 border rounded-full" style={{ borderColor: '#000000', backgroundColor: '#ffffff' }}></div>
                                {Array.from({ length: 6 }).map((_, i) => <div key={`b2-${i}`} className="w-3 h-4" style={{ backgroundColor: '#000000' }}></div>)}
                                <div className="w-4 h-4 border rounded-full" style={{ borderColor: '#000000', backgroundColor: '#ffffff' }}></div>
                                <div className="w-3 h-4" style={{ backgroundColor: '#000000' }}></div>
                                <div className="w-4 h-4 border rounded-full" style={{ borderColor: '#000000', backgroundColor: '#ffffff' }}></div>
                                <div className="w-3 h-4" style={{ backgroundColor: '#000000' }}></div>
                                <div className="w-4 h-4 border rounded-full" style={{ borderColor: '#000000', backgroundColor: '#ffffff' }}></div>
                                <div className="w-4 h-4 border rounded-full" style={{ borderColor: '#000000', backgroundColor: '#ffffff' }}></div>
                                {Array.from({ length: 3 }).map((_, i) => <div key={`b3-${i}`} className="w-3 h-4" style={{ backgroundColor: '#000000' }}></div>)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Timing Marks (Dummy placeholders) */}
                <div className="absolute flex items-center justify-center left-0 top-1/2 -translate-x-[14px] rotate-[90deg] opacity-20">
                    <div className="flex flex-row">
                        {Array.from({ length: 5 }).map((_, i) => <div key={`lm-${i}`} className="w-3 h-6 mx-[2px]" style={{ backgroundColor: '#000000' }}></div>)}
                    </div>
                </div>
                <div className="absolute flex items-center justify-center right-0 top-1/2 translate-x-[14px] rotate-[90deg] opacity-20">
                    <div className="flex flex-row">
                        {Array.from({ length: 5 }).map((_, i) => <div key={`rm-${i}`} className="w-3 h-6 mx-[2px]" style={{ backgroundColor: '#000000' }}></div>)}
                    </div>
                </div>

                <div className="h-10"></div> {/* Header Clearance */}

                <div className="mx-10 mt-4 pb-10">
                    <div className="w-[664px] mx-auto">
                        {/* Header / Institution Name */}
                        <div className={`${headerSize === 'Big' ? 'h-[72px]' : 'h-[50px]'} overflow-hidden flex items-center justify-center`}>
                            <div className="leading-tight text-center">
                                <p className={`font-bold line-clamp-1`} style={{ fontSize: `${titleSize}px` }}>
                                    {institutionName}
                                </p>
                                <p className={`font-bold line-clamp-1`} style={{ fontSize: `${addressSize}px`, color: '#374151' }}>
                                    {address}
                                </p>
                            </div>
                        </div>

                        {/* Student Info Area */}
                        <div className="my-3">
                            <div className="flex justify-between">

                                {infoType === 'Digital' ? (
                                    <div className="flex gap-2.5">
                                        {/* Class */}
                                        <div className="w-[90px]">
                                            <div className="border pb-4 h-[286px]" style={theme.border}>
                                                <div className="border-b text-center font-bold text-sm" style={theme.border}>শ্রেণি</div>
                                                <div className="grid grid-cols-3">
                                                    <div className="border-r" style={theme.border}></div>
                                                    <div className="border-r text-xs text-center" style={theme.border}>
                                                        <div className="flex justify-center items-center border-b h-[25px]" style={theme.border}></div>
                                                        {[6, 7, 8, 9, 10, 11, 12].map(cls => (
                                                            <div key={`cls-${cls}`} className="flex justify-center items-center border-b h-[25px]" style={theme.border}>
                                                                <span className="border rounded-full h-[18px] w-[18px] flex justify-center items-center" style={{ borderColor: 'rgba(0,0,0,0.6)' }}>{toBengaliNumber(cls)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Roll Number */}
                                        <div className="border h-[286px]" style={{ width: '182px', ...theme.border }}>
                                            <div className="border-b text-center font-bold text-sm" style={theme.border}>রোল নম্বর</div>
                                            <div className="grid grid-cols-6">
                                                {Array.from({ length: 6 }).map((_, i) => (
                                                    <div key={`rth-${i}`} className={`border-r h-[25px] ${i === 5 ? 'border-r-0' : ''}`} style={theme.border}></div>
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-6 border-t" style={theme.border}>
                                                {Array.from({ length: 6 }).map((_, col) => (
                                                    <div key={`rc-${col}`} className={`border-r text-center text-xs ${col === 5 ? 'border-r-0' : ''}`} style={{ ...theme.border, ...(col % 2 === 0 ? theme.bg300 : {}) }}>
                                                        {Array.from({ length: 10 }).map((_, num) => (
                                                            <div key={`rn-${col}-${num}`} className="flex justify-center items-center border-b h-[24px]" style={theme.border}>
                                                                <div className="border rounded-full w-[18px] h-[18px] flex items-center justify-center" style={{ borderColor: 'rgba(0,0,0,0.6)' }}>
                                                                    {toBengaliNumber(num)}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Subject Code */}
                                        <div className="border h-[286px]" style={{ width: '92px', ...theme.border }}>
                                            <div className="border-b text-center font-bold text-sm" style={theme.border}>বিষয় কোড</div>
                                            <div className="grid grid-cols-3">
                                                {Array.from({ length: 3 }).map((_, i) => (
                                                    <div key={`sth-${i}`} className={`border-r h-[25px] ${i === 2 ? 'border-r-0' : ''}`} style={theme.border}></div>
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-3 border-t" style={theme.border}>
                                                {Array.from({ length: 3 }).map((_, col) => (
                                                    <div key={`sc-${col}`} className={`border-r text-center text-xs ${col === 2 ? 'border-r-0' : ''}`} style={{ ...theme.border, ...(col % 2 !== 0 ? theme.bg300 : {}) }}>
                                                        {Array.from({ length: 10 }).map((_, num) => (
                                                            <div key={`sn-${col}-${num}`} className="flex justify-center items-center border-b h-[24px]" style={theme.border}>
                                                                <div className="border rounded-full w-[18px] h-[18px] flex items-center justify-center" style={{ borderColor: 'rgba(0,0,0,0.6)' }}>
                                                                    {toBengaliNumber(num)}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Set Code */}
                                        <div className="w-[90px]">
                                            <div className="border pb-4 h-[286px]" style={theme.border}>
                                                <div className="border-b text-center font-bold text-sm" style={theme.border}>সেট কোড</div>
                                                <div className="grid grid-cols-3">
                                                    <div className="border-r" style={theme.border}></div>
                                                    <div className="border-r text-xs text-center" style={theme.border}>
                                                        <div className="flex justify-center items-center border-b h-[25px]" style={theme.border}></div>
                                                        {['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ'].map(set => (
                                                            <div key={`set-${set}`} className="flex justify-center items-center border-b h-[25px]" style={theme.border}>
                                                                <span className="border rounded-full h-[18px] w-[18px] flex justify-center items-center" style={{ borderColor: 'rgba(0,0,0,0.6)' }}>{set}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col gap-4 my-2 mr-6 h-[286px] justify-center pt-2">
                                        <div className="flex-1 space-y-4 w-full px-2">
                                            <div className="border p-3 pb-8 rounded" style={{ backgroundColor: 'rgba(249,250,251,0.3)', ...theme.border }}>
                                                <strong className="text-sm" style={{ color: '#374151' }}>শিক্ষার্থীর নাম:</strong>
                                                <div className="border-b border-dashed mt-8 mx-2" style={theme.border}></div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="flex-1 border p-3 pb-8 rounded" style={{ backgroundColor: 'rgba(249,250,251,0.3)', ...theme.border }}>
                                                    <strong className="text-sm" style={{ color: '#374151' }}>রোল নম্বর:</strong>
                                                    <div className="border-b border-dashed mt-6 mx-2" style={theme.border}></div>
                                                </div>
                                                <div className="flex-1 border p-3 pb-8 rounded" style={{ backgroundColor: 'rgba(249,250,251,0.3)', ...theme.border }}>
                                                    <strong className="text-sm" style={{ color: '#374151' }}>শ্রেণি / বিভাগ:</strong>
                                                    <div className="border-b border-dashed mt-6 mx-2" style={theme.border}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Instructions */}
                                <div className="w-[168px]">
                                    <div className="flex-1 h-full flex flex-col justify-between">
                                        <div>
                                            <div className="text-center py-1" style={{ color: '#ffffff', ...theme.bgSolid }}>
                                                <p className="text-[12px] font-bold">নিয়মাবলী</p>
                                            </div>
                                            <div className="text-[11px] leading-tight text-justify mt-2 space-y-1 px-1">
                                                <p>১। বৃত্তাকার ঘরগুলো এমন ভাবে ভরাট করতে হবে যাতে ভেতরের লেখাটি দেখা না যায়।</p>
                                                <p>২। উত্তরপত্রে অবাঞ্চিত দাগ দেয়া যাবেনা।</p>
                                                <p>৩। উত্তরপত্র ভাজ করা যাবেনা।</p>
                                                <p>৪। সেট কোডবিহীন উত্তরপত্র বাতিল হবে।</p>
                                            </div>
                                        </div>
                                        <div className="border flex-1 min-h-[60px] relative mt-auto mb-0 mx-1" style={theme.border}>
                                            <p className="absolute bottom-2 text-xs text-center w-full">কক্ষ পরিদর্শকের স্বাক্ষর<br />তারিখসহ</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <p className="text-center font-bold mb-3 mt-4 text-[15px]">বহুনির্বাচনি অভিক্ষার উত্তরপত্র</p>

                        {/* Questions Grid */}
                        <div className="flex gap-2 justify-center">
                            {columns.map((columnQuestions, colIdx) => (
                                <div key={`col-${colIdx}`} className="w-[160px] text-xs">
                                    {/* Header */}
                                    <div className="flex border font-bold h-[25px]" style={theme.border}>
                                        <div className="w-[38px] text-center border-r py-1 flex items-center justify-center" style={theme.border}>প্রশ্ন</div>
                                        <div className="flex-1 text-center py-1 flex items-center justify-center">উত্তর</div>
                                    </div>

                                    {/* Rows */}
                                    {columnQuestions.map((qNum) => (
                                        <div key={`q-${qNum}`} className="flex mt-[1px] border w-[160px] h-[22px]" style={theme.border}>
                                            <div className="w-[38px] text-center border-r text-xs flex items-center justify-center" style={{ backgroundColor: 'rgba(249,250,251,0.5)', ...theme.border }}>
                                                {toBengaliNumber(qNum)}
                                            </div>
                                            <div className="text-center flex-1 grid grid-cols-4">
                                                {['ক', 'খ', 'গ', 'ঘ'].map((opt, optIdx) => (
                                                    <div
                                                        key={`opt-${qNum}-${optIdx}`}
                                                        className={`flex justify-center items-center ${optIdx < 3 ? 'border-r' : ''}`}
                                                        style={{ ...(optIdx < 3 ? theme.border : {}), ...(optIdx === 0 || optIdx === 2 ? theme.bg300 : {}) }}
                                                    >
                                                        <p className="border rounded-full w-[17px] h-[17px] text-[11px] flex items-center justify-center leading-none pb-[1px]" style={{ borderColor: 'rgba(0,0,0,0.6)', color: '#1f2937' }}>
                                                            {opt}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
