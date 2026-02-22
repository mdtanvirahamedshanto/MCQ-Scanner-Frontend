'use client';

import React from 'react';

export interface NormalOMRSheetProps {
    institutionName?: string;
    address?: string;
    questionCount?: number;
    columnsCount?: 2 | 3 | 4;
    titleSize?: number;
    addressSize?: number;
}

// Bengali numbers helper
const toBengaliNumber = (num: number) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num
        .toString()
        .split('')
        .map((digit) => bengaliDigits[parseInt(digit, 10)])
        .join('');
};

export default function NormalOMRSheet({
    institutionName = 'Md Tanvir Ahamed Shanto',
    address = 'কলাপাড়া, পটুয়াখালী',
    questionCount = 30,
    columnsCount = 3,
    titleSize = 14,
    addressSize = 14,
}: NormalOMRSheetProps) {
    // Calculate grid layout
    const numColumns = columnsCount;
    const questionsPerColumn = Math.ceil(questionCount / numColumns);

    const columns = Array.from({ length: numColumns }, (_, colIndex) => {
        const start = colIndex * questionsPerColumn + 1;
        const end = Math.min((colIndex + 1) * questionsPerColumn, questionCount);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });

    return (
        <div className="bg-white p-5 select-none w-max mx-auto overflow-x-auto text-sm text-black">
            <div id="omr-printable-area" className="bg-white px-2 py-4">
                <div style={{ maxWidth: '493px' }} className="mx-auto">
                    <div className="flex gap-2 justify-center items-center pt-10">
                        <div className="truncate w-full">
                            <h1 className="text-center font-bold" style={{ fontSize: `${titleSize}px` }}>
                                {institutionName}
                            </h1>
                            <p className="text-center text-gray-600" style={{ fontSize: `${addressSize}px` }}>{address}</p>
                        </div>
                    </div>
                    <div className="border-b mt-3 mx-5 border-gray-400"></div>
                    <div className="border-b my-1 mx-14 border-gray-400"></div>
                    <div className="mt-2 mb-4 py-2 flex gap-2 items-center text-[15px]">
                        <div className="flex-1 space-y-3">
                            <div className="flex-1 flex gap-1 items-baseline">
                                <span>নাম:</span>
                                <p className="flex-1 border-b border-dashed border-gray-400"></p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <div className="flex-1 flex gap-1 items-baseline">
                                    <span>শ্রেণি:</span>
                                    <p className="flex-1 border-b border-dashed border-gray-400"></p>
                                </div>
                                <div className="flex-1 flex gap-1 items-baseline">
                                    <span>সেকশন:</span>
                                    <p className="flex-1 border-b border-dashed border-gray-400"></p>
                                </div>
                            </div>
                            <div className="flex justify-center gap-4">
                                <div className="flex-1 flex gap-1 items-baseline">
                                    <span>বিষয়:</span>
                                    <p className="flex-1 border-b border-dashed border-gray-400"></p>
                                </div>
                                <div className="flex-1 flex gap-1 items-baseline">
                                    <span>পত্র:</span>
                                    <p className="flex-1 border-b border-dashed border-gray-400"></p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="flex-1 flex gap-1 items-baseline">
                                    <span>রোল:</span>
                                    <p className="flex-1 border-b border-dashed border-gray-400"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-800 mx-auto" style={{ minWidth: '483px', borderWidth: '3px' }}>
                    {/* Top Timing Marks */}
                    <div className="border-b border-dashed border-gray-400 p-1 flex justify-between items-center text-[10px]">
                        {/* We can construct dummy top timing marks based on columns. For visual match with snippet: */}
                        <div className="flex items-center gap-1">
                            <div className="h-4 w-3 bg-black"></div>
                        </div>
                        <div className="flex flex-1 justify-center gap-6 opacity-80">
                            {/* Repeating some timing marks visually */}
                            {Array.from({ length: columnsCount }).map((_, i) => (
                                <div key={`tm-${i}`} className="flex gap-2">
                                    <div className="h-4 w-3 bg-black"></div>
                                    <div className="h-4 w-3 bg-black"></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-4 w-3 bg-black"></div>
                            <div className="h-4 w-3 bg-black"></div>
                            <div className="h-4 w-3 bg-black"></div>
                        </div>
                    </div>

                    {/* OMR Grid */}
                    <div className={`flex justify-between gap-6 px-3 py-4`}>
                        {columns.map((columnQuestions, colIdx) => (
                            <div key={`col-${colIdx}`} className="flex-1">
                                {columnQuestions.map((qNum) => (
                                    <div key={`q-${qNum}`} className="flex items-center justify-between my-2 h-6 min-w-[145px]">
                                        <div className="text-center flex justify-end w-[25px] pr-2">
                                            <p className="font-bold text-[15px]">{toBengaliNumber(qNum)}</p>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                {['ক', 'খ', 'গ', 'ঘ'].map((opt, optIdx) => (
                                                    <div
                                                        key={`opt-${qNum}-${optIdx}`}
                                                        className="h-[22px] w-[22px] rounded-full border-[1.5px] border-gray-700 text-center flex items-center justify-center text-[13px] leading-none pb-[1px]"
                                                    >
                                                        {opt}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
