"use client";

import { useState, useRef, useCallback } from "react";
import {
    CheckCircle2,
    Trash2,
    ImageIcon,
    FolderOpen,
    Camera,
    ChevronLeft,
    ChevronRight,
    ImagePlus,
} from "lucide-react";
import Link from "next/link";

export default function OMREvaluatorPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [evaluating, setEvaluating] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback((newFiles: FileList | null) => {
        if (!newFiles) return;
        const fileArray = Array.from(newFiles).filter((f) =>
            f.type.startsWith("image/")
        );
        setFiles((prev) => [...prev, ...fileArray]);

        fileArray.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviews((prev) => [...prev, e.target?.result as string]);
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
        },
        [handleFiles]
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const clearAll = useCallback(() => {
        setFiles([]);
        setPreviews([]);
    }, []);

    const handleStartCamera = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" },
            });
            // For now, just show that camera access works
            stream.getTracks().forEach((t) => t.stop());
            alert("Camera access granted! Full camera integration coming soon.");
        } catch {
            alert("Camera access denied or not available.");
        }
    }, []);

    const handleEvaluate = useCallback(() => {
        if (files.length === 0) {
            alert("Please upload at least one OMR sheet image.");
            return;
        }
        setEvaluating(true);
        // Simulate processing
        setTimeout(() => {
            setEvaluating(false);
            alert(`${files.length} sheet(s) submitted for evaluation!`);
        }, 2000);
    }, [files]);

    return (
        <div className="max-w-3xl mx-auto space-y-4">
            {/* Main Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <h2 className="text-lg font-semibold text-emerald-600">
                            Advanced OMR Evaluator 3.0
                        </h2>
                    </div>
                    <button
                        onClick={clearAll}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                        title="Clear all"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>

                {/* Upload Zone */}
                <div
                    className={`px-5 py-10 flex flex-col items-center justify-center transition-colors ${isDragging
                            ? "bg-blue-50 border-2 border-dashed border-blue-400"
                            : "bg-white"
                        }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    {previews.length > 0 ? (
                        <div className="grid grid-cols-3 gap-3 w-full">
                            {previews.map((src, i) => (
                                <div
                                    key={i}
                                    className="relative aspect-[3/4] rounded-lg overflow-hidden border border-gray-200"
                                >
                                    <img
                                        src={src}
                                        alt={`OMR ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                                        {i + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <ImageIcon className="w-16 h-16 text-gray-300 mb-4" />
                            <p className="text-gray-500 text-center">
                                Drag & drop OMR sheets here, or choose an option below:
                            </p>
                        </>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-4 px-5 py-5">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors shadow-sm"
                    >
                        <FolderOpen className="w-5 h-5" />
                        Browse Files
                    </button>
                    <button
                        onClick={handleStartCamera}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors shadow-sm"
                    >
                        <Camera className="w-5 h-5" />
                        Start Camera
                    </button>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>

            {/* Token Warning */}
            <div className="bg-white rounded-xl shadow-sm border border-red-200 p-4 text-center">
                <p className="text-red-500 font-medium">
                    আপনার তৈরী করা কোনো টোকেন নেই!
                </p>
                <Link
                    href="/omr/token"
                    className="text-blue-500 hover:text-blue-600 font-medium hover:underline"
                >
                    Create Token
                </Link>
            </div>

            {/* Evaluate Button */}
            <div className="flex justify-center">
                <button
                    onClick={handleEvaluate}
                    disabled={evaluating}
                    className="px-8 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 font-semibold text-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {evaluating ? "Evaluating..." : "Evaluate Now!"}
                </button>
            </div>

            {/* Bottom Toolbar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                    <ChevronLeft className="w-5 h-5 text-gray-400" />
                </button>
                <div className="flex items-center gap-2 flex-1 overflow-auto">
                    <button className="p-3 rounded-lg bg-blue-500 text-white shrink-0">
                        <Camera className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                        <ImagePlus className="w-5 h-5" />
                    </button>
                </div>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
            </div>
        </div>
    );
}
