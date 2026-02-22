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
}

const colorMaps: Record<OMRColor, any> = {
    red: { text600: 'text-rose-600', text500: 'text-rose-500', border: 'border-rose-500', bg50: 'bg-rose-50', bg300: 'bg-rose-300/70', bgSolid: 'bg-rose-500' },
    gray: { text600: 'text-gray-600', text500: 'text-gray-500', border: 'border-gray-500', bg50: 'bg-gray-50', bg300: 'bg-gray-200', bgSolid: 'bg-gray-500' },
    blue: { text600: 'text-blue-600', text500: 'text-blue-500', border: 'border-blue-500', bg50: 'bg-blue-50', bg300: 'bg-blue-300/70', bgSolid: 'bg-blue-500' },
    green: { text600: 'text-green-600', text500: 'text-green-500', border: 'border-green-500', bg50: 'bg-green-50', bg300: 'bg-green-300/70', bgSolid: 'bg-green-500' },
    purple: { text600: 'text-purple-600', text500: 'text-purple-500', border: 'border-purple-500', bg50: 'bg-purple-50', bg300: 'bg-purple-300/70', bgSolid: 'bg-purple-500' },
    orange: { text600: 'text-orange-600', text500: 'text-orange-500', border: 'border-orange-500', bg50: 'bg-orange-50', bg300: 'bg-orange-300/70', bgSolid: 'bg-orange-500' },
    cyan: { text600: 'text-cyan-600', text500: 'text-cyan-500', border: 'border-cyan-500', bg50: 'bg-cyan-50', bg300: 'bg-cyan-300/70', bgSolid: 'bg-cyan-500' },
    pink: { text600: 'text-pink-600', text500: 'text-pink-500', border: 'border-pink-500', bg50: 'bg-pink-50', bg300: 'bg-pink-300/70', bgSolid: 'bg-pink-500' },
    yellow: { text600: 'text-yellow-600', text500: 'text-yellow-500', border: 'border-yellow-500', bg50: 'bg-yellow-50', bg300: 'bg-yellow-300/70', bgSolid: 'bg-yellow-500' },
    lime: { text600: 'text-lime-600', text500: 'text-lime-500', border: 'border-lime-500', bg50: 'bg-lime-50', bg300: 'bg-lime-300/70', bgSolid: 'bg-lime-500' },
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
        <div className="bg-white p-5 select-none w-max mx-auto shadow-md border rounded-lg overflow-x-auto">
            <div className="relative w-[750px] mx-auto bg-white" id="omr-printable-area">
                {/* Markers */}
                <img src="/assets/m1-aa369e81.svg" alt="Marker 1" className="absolute top-0 left-0 w-10 h-10 pointer-events-none opacity-0" />
                <img src="/assets/mb-7544e7d7.svg" alt="Marker 2" className="absolute top-0 right-0 w-10 h-10 pointer-events-none opacity-0" />
                <img src="/assets/md-0ad8925e.svg" alt="Marker 3" className="absolute bottom-0 left-0 w-10 h-10 pointer-events-none opacity-0" />
                <img src="/assets/m100-3c4745ce.svg" alt="Marker 4" className="absolute bottom-0 right-0 w-10 h-10 pointer-events-none opacity-0" />

                {/* Top Warning Box */}
                <div className="absolute flex items-center justify-center top-0 left-1/2 -translate-x-1/2 mt-1">
                    <div className={`${theme.bg50} w-[660px] h-10 flex flex-col items-center pt-0.5`}>
                        <div className={`text-center text-sm ${theme.text600} font-bold`}>এই বক্সে কোনো দাগ দেয়া যাবে না।</div>
                        <div className="flex justify-center items-center h-5">
                            <div className="flex flex-wrap gap-1 items-center">
                                <div className="w-4 h-4 border border-black rounded-full bg-white"></div>
                                {Array.from({ length: 3 }).map((_, i) => <div key={`b1-${i}`} className="w-3 h-4 bg-black"></div>)}
                                <div className="w-4 h-4 border border-black rounded-full bg-white"></div>
                                {Array.from({ length: 6 }).map((_, i) => <div key={`b2-${i}`} className="w-3 h-4 bg-black"></div>)}
                                <div className="w-4 h-4 border border-black rounded-full bg-white"></div>
                                <div className="w-3 h-4 bg-black"></div>
                                <div className="w-4 h-4 border border-black rounded-full bg-white"></div>
                                <div className="w-3 h-4 bg-black"></div>
                                <div className="w-4 h-4 border border-black rounded-full bg-white"></div>
                                <div className="w-4 h-4 border border-black rounded-full bg-white"></div>
                                {Array.from({ length: 3 }).map((_, i) => <div key={`b3-${i}`} className="w-3 h-4 bg-black"></div>)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Timing Marks (Dummy placeholders) */}
                <div className="absolute flex items-center justify-center left-0 top-1/2 -translate-x-[14px] rotate-[90deg] opacity-20">
                    <div className="flex flex-row">
                        {Array.from({ length: 5 }).map((_, i) => <div key={`lm-${i}`} className="w-3 h-6 bg-black mx-[2px]"></div>)}
                    </div>
                </div>
                <div className="absolute flex items-center justify-center right-0 top-1/2 translate-x-[14px] rotate-[90deg] opacity-20">
                    <div className="flex flex-row">
                        {Array.from({ length: 5 }).map((_, i) => <div key={`rm-${i}`} className="w-3 h-6 bg-black mx-[2px]"></div>)}
                    </div>
                </div>

                <div className="h-10"></div> {/* Header Clearance */}

                <div className="mx-10 mt-4 pb-10">
                    <div className="w-[664px] mx-auto">
                        {/* Header / Institution Name */}
                        <div className={`${headerSize === 'Big' ? 'h-[72px]' : 'h-[50px]'} overflow-hidden flex items-center justify-center`}>
                            <div className="leading-tight text-center">
                                <p className={`font-bold line-clamp-1 ${headerSize === 'Big' ? 'text-[24px]' : 'text-[18px]'}`}>
                                    {institutionName}
                                </p>
                                <p className={`font-bold line-clamp-1 ${headerSize === 'Big' ? 'text-[16px]' : 'text-[14px] text-gray-700'}`}>
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
                                            <div className={`border ${theme.border} pb-4 h-[286px]`}>
                                                <div className={`border-b ${theme.border} text-center font-bold text-sm`}>শ্রেণি</div>
                                                <div className="grid grid-cols-3">
                                                    <div className={`border-r ${theme.border}`}></div>
                                                    <div className={`border-r ${theme.border} text-xs text-center`}>
                                                        <div className={`flex justify-center items-center border-b ${theme.border} h-[25px]`}></div>
                                                        {[6, 7, 8, 9, 10, 11, 12].map(cls => (
                                                            <div key={`cls-${cls}`} className={`flex justify-center items-center border-b ${theme.border} h-[25px]`}>
                                                                <span className={`border border-black/60 rounded-full h-[18px] w-[18px] flex justify-center items-center`}>{toBengaliNumber(cls)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Roll Number */}
                                        <div className={`border ${theme.border} h-[286px]`} style={{ width: '182px' }}>
                                            <div className={`border-b ${theme.border} text-center font-bold text-sm`}>রোল নম্বর</div>
                                            <div className="grid grid-cols-6">
                                                {Array.from({ length: 6 }).map((_, i) => (
                                                    <div key={`rth-${i}`} className={`border-r ${theme.border} h-[25px] ${i === 5 ? 'border-r-0' : ''}`}></div>
                                                ))}
                                            </div>
                                            <div className={`grid grid-cols-6 border-t ${theme.border}`}>
                                                {Array.from({ length: 6 }).map((_, col) => (
                                                    <div key={`rc-${col}`} className={`border-r ${theme.border} text-center text-xs ${col === 5 ? 'border-r-0' : ''} ${col % 2 === 0 ? theme.bg300 : ''}`}>
                                                        {Array.from({ length: 10 }).map((_, num) => (
                                                            <div key={`rn-${col}-${num}`} className={`flex justify-center items-center border-b ${theme.border} h-[24px]`}>
                                                                <div className="border border-black/60 rounded-full w-[18px] h-[18px] flex items-center justify-center">
                                                                    {toBengaliNumber(num)}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Subject Code */}
                                        <div className={`border ${theme.border} h-[286px]`} style={{ width: '92px' }}>
                                            <div className={`border-b ${theme.border} text-center font-bold text-sm`}>বিষয় কোড</div>
                                            <div className="grid grid-cols-3">
                                                {Array.from({ length: 3 }).map((_, i) => (
                                                    <div key={`sth-${i}`} className={`border-r ${theme.border} h-[25px] ${i === 2 ? 'border-r-0' : ''}`}></div>
                                                ))}
                                            </div>
                                            <div className={`grid grid-cols-3 border-t ${theme.border}`}>
                                                {Array.from({ length: 3 }).map((_, col) => (
                                                    <div key={`sc-${col}`} className={`border-r ${theme.border} text-center text-xs ${col === 2 ? 'border-r-0' : ''} ${col % 2 !== 0 ? theme.bg300 : ''}`}>
                                                        {Array.from({ length: 10 }).map((_, num) => (
                                                            <div key={`sn-${col}-${num}`} className={`flex justify-center items-center border-b ${theme.border} h-[24px]`}>
                                                                <div className="border border-black/60 rounded-full w-[18px] h-[18px] flex items-center justify-center">
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
                                            <div className={`border ${theme.border} pb-4 h-[286px]`}>
                                                <div className={`border-b ${theme.border} text-center font-bold text-sm`}>সেট কোড</div>
                                                <div className="grid grid-cols-3">
                                                    <div className={`border-r ${theme.border}`}></div>
                                                    <div className={`border-r ${theme.border} text-xs text-center`}>
                                                        <div className={`flex justify-center items-center border-b ${theme.border} h-[25px]`}></div>
                                                        {['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ'].map(set => (
                                                            <div key={`set-${set}`} className={`flex justify-center items-center border-b ${theme.border} h-[25px]`}>
                                                                <span className={`border border-black/60 rounded-full h-[18px] w-[18px] flex justify-center items-center`}>{set}</span>
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
                                            <div className={`border ${theme.border} p-3 pb-8 rounded bg-gray-50/30`}>
                                                <strong className="text-gray-700 text-sm">শিক্ষার্থীর নাম:</strong>
                                                <div className={`border-b border-dashed ${theme.border} mt-8 mx-2`}></div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className={`flex-1 border ${theme.border} p-3 pb-8 rounded bg-gray-50/30`}>
                                                    <strong className="text-gray-700 text-sm">রোল নম্বর:</strong>
                                                    <div className={`border-b border-dashed ${theme.border} mt-6 mx-2`}></div>
                                                </div>
                                                <div className={`flex-1 border ${theme.border} p-3 pb-8 rounded bg-gray-50/30`}>
                                                    <strong className="text-gray-700 text-sm">শ্রেণি / বিভাগ:</strong>
                                                    <div className={`border-b border-dashed ${theme.border} mt-6 mx-2`}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Instructions */}
                                <div className="w-[168px]">
                                    <div className="flex-1 h-full flex flex-col justify-between">
                                        <div>
                                            <div className={`${theme.bgSolid} text-white text-center py-1`}>
                                                <p className="text-[12px] font-bold">নিয়মাবলী</p>
                                            </div>
                                            <div className="text-[11px] leading-tight text-justify mt-2 space-y-1 px-1">
                                                <p>১। বৃত্তাকার ঘরগুলো এমন ভাবে ভরাট করতে হবে যাতে ভেতরের লেখাটি দেখা না যায়।</p>
                                                <p>২। উত্তরপত্রে অবাঞ্চিত দাগ দেয়া যাবেনা।</p>
                                                <p>৩। উত্তরপত্র ভাজ করা যাবেনা।</p>
                                                <p>৪। সেট কোডবিহীন উত্তরপত্র বাতিল হবে।</p>
                                            </div>
                                        </div>
                                        <div className={`border ${theme.border} flex-1 min-h-[60px] relative mt-auto mb-0 mx-1`}>
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
                                    <div className={`flex border ${theme.border} font-bold h-[25px]`}>
                                        <div className={`w-[38px] text-center border-r ${theme.border} py-1 flex items-center justify-center`}>প্রশ্ন</div>
                                        <div className="flex-1 text-center py-1 flex items-center justify-center">উত্তর</div>
                                    </div>

                                    {/* Rows */}
                                    {columnQuestions.map((qNum) => (
                                        <div key={`q-${qNum}`} className={`flex mt-[1px] border ${theme.border} w-[160px] h-[22px]`}>
                                            <div className={`w-[38px] text-center border-r ${theme.border} text-xs flex items-center justify-center bg-gray-50/50`}>
                                                {toBengaliNumber(qNum)}
                                            </div>
                                            <div className="text-center flex-1 grid grid-cols-4">
                                                {['ক', 'খ', 'গ', 'ঘ'].map((opt, optIdx) => (
                                                    <div
                                                        key={`opt-${qNum}-${optIdx}`}
                                                        className={`flex justify-center items-center ${optIdx < 3 ? `border-r ${theme.border}` : ''} ${optIdx === 0 || optIdx === 2 ? theme.bg300 : ''}`}
                                                    >
                                                        <p className="border border-black/60 rounded-full w-[17px] h-[17px] text-[11px] flex items-center justify-center text-gray-800 leading-none pb-[1px]">
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
