"use client";

import { useState, useCallback } from "react";
import { Plus, KeyRound, Trash2, Copy, X } from "lucide-react";

interface OMRToken {
    id: string;
    name: string;
    questionCount: number;
    answers: string;
    createdAt: string;
}

function generateId() {
    return Math.random().toString(36).substring(2, 10);
}

export default function OMRTokenPage() {
    const [tokens, setTokens] = useState<OMRToken[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [newQuestionCount, setNewQuestionCount] = useState(30);
    const [newAnswers, setNewAnswers] = useState("");

    const handleCreate = useCallback(() => {
        if (!newName.trim()) return;
        const token: OMRToken = {
            id: generateId(),
            name: newName.trim(),
            questionCount: newQuestionCount,
            answers: newAnswers.trim(),
            createdAt: new Date().toLocaleDateString("bn-BD"),
        };
        setTokens((prev) => [token, ...prev]);
        setNewName("");
        setNewQuestionCount(30);
        setNewAnswers("");
        setShowModal(false);
    }, [newName, newQuestionCount, newAnswers]);

    const handleDelete = useCallback((id: string) => {
        setTokens((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const handleCopy = useCallback((token: OMRToken) => {
        const text = `Token: ${token.name}\nQuestions: ${token.questionCount}\nAnswers: ${token.answers}`;
        navigator.clipboard.writeText(text);
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">
                        আমার তৈরী OMR টোকেন
                    </h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors shadow-sm"
                    >
                        <Plus className="w-4 h-4" />
                        New Token
                    </button>
                </div>

                {/* Token List */}
                <div className="p-6">
                    {tokens.length === 0 ? (
                        <div className="text-center py-16">
                            <KeyRound className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-400 text-lg">
                                No OMR tokens available yet.
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                                Create a token to start evaluating OMR sheets.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {tokens.map((token) => (
                                <div
                                    key={token.id}
                                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                            <KeyRound className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {token.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {token.questionCount} questions • Created{" "}
                                                {token.createdAt}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleCopy(token)}
                                            className="p-2 rounded-lg hover:bg-white text-gray-400 hover:text-blue-500 transition-colors"
                                            title="Copy"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(token.id)}
                                            className="p-2 rounded-lg hover:bg-white text-gray-400 hover:text-red-500 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Token Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800">
                                নতুন OMR টোকেন তৈরী
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    পরীক্ষার নাম
                                </label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                                    placeholder="e.g. Final Exam 2024"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    প্রশ্নের সংখ্যা
                                </label>
                                <select
                                    value={newQuestionCount}
                                    onChange={(e) =>
                                        setNewQuestionCount(Number(e.target.value))
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                                >
                                    {[20, 25, 30, 40, 50, 60, 80, 100].map((n) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Answer Key (comma-separated: ক,খ,গ,ঘ)
                                </label>
                                <textarea
                                    value={newAnswers}
                                    onChange={(e) => setNewAnswers(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 resize-none"
                                    placeholder="ক,খ,গ,ঘ,ক,খ,গ,ঘ..."
                                />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors"
                            >
                                বাতিল
                            </button>
                            <button
                                onClick={handleCreate}
                                disabled={!newName.trim()}
                                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                তৈরী করুন
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
