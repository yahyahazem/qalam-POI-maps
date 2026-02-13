"use client";

import { useState } from "react";
import { Search, MapPin, Loader2, Copy, Check, Code, Settings, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function AnalyzePage() {
    const [query, setQuery] = useState("");
    const [parsedData, setParsedData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleAnalyze = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError(null);
        setParsedData(null);

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                let errorMessage = "حدث خطأ أثناء التحليل";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (e) {
                    errorMessage = `خطأ في الخادم (${response.status})`;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setParsedData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!parsedData) return;
        navigator.clipboard.writeText(JSON.stringify(parsedData, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderJsonValue = (value: any) => {
        if (value === null) return <span className="text-purple-400">null</span>;
        if (Array.isArray(value)) {
            return (
                <span className="text-gray-700">
                    [
                    {value.map((v, i) => (
                        <span key={i}>
                            <br />
                            <span className="inline-block w-8"></span>
                            <span className="text-orange-600">"{v}"</span>
                            {i < value.length - 1 ? "," : ""}
                        </span>
                    ))}
                    <br />
                    ]
                </span>
            );
        }
        if (typeof value === "string") return <span className="text-orange-600">"{value}"</span>;
        return <span className="text-blue-600">{String(value)}</span>;
    };

    return (
        <div className="flex h-screen bg-qalam-bg overflow-hidden shadow-2xl" dir="rtl">
            {/* Sidebar */}
            <aside className="w-64 border-l border-gray-200 bg-white p-6 hidden md:flex flex-col gap-8 shadow-sm">
                <Link href="/" className="text-qalam-teal font-bold text-2xl flex items-center gap-2">
                    <MapPin size={28} />
                    <span>خريطة قلم</span>
                </Link>

                <nav className="flex flex-col gap-3">
                    <Link
                        href="/analyze"
                        className="flex items-center gap-3 w-full p-3 bg-qalam-teal/10 text-qalam-teal font-medium rounded-qalam transition-all text-right"
                    >
                        <LayoutDashboard size={20} />
                        <span>تحليل الاستعلام</span>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-3 w-full p-3 text-gray-600 hover:bg-gray-50 rounded-qalam transition-all text-right"
                    >
                        <Search size={20} />
                        <span>البحث</span>
                    </Link>

                </nav>


            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-auto p-10">
                <div className="max-w-4xl mx-auto w-full space-y-10">
                    <div className="space-y-4 text-center">
                        <h1 className="text-4xl font-extrabold text-qalam-text tracking-tight">
                            محلل الاستعلامات الذكي
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            أدخل استعلامك لرؤية كيف يقوم الذكاء الاصطناعي بتحليله وتجزئته
                        </p>
                    </div>

                    <form onSubmit={handleAnalyze} className="relative group max-w-2xl mx-auto w-full">
                        <div className="absolute inset-0 bg-qalam-teal/5 blur-xl group-focus-within:bg-qalam-teal/10 transition-all rounded-full"></div>
                        <div className="relative">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="مثلاً: مطعم شاورما هادئ في حي النخيل بالرياض..."
                                className="qalam-input text-xl py-6 pr-14 shadow-lg border-gray-100 hover:border-gray-200"
                                autoFocus
                            />
                            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-qalam-teal transition-colors" size={24} />
                            <button
                                type="submit"
                                disabled={isLoading || !query.trim()}
                                className="absolute left-2.5 top-1/2 -translate-y-1/2 btn-primary px-8 py-3.5 text-lg font-semibold flex items-center gap-2 shadow-lg shadow-qalam-teal/20"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={24} /> : "تحليل"}
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div className="p-6 bg-red-50 border border-red-100 text-red-600 rounded-qalam text-center shadow-sm animate-in fade-in slide-in-from-top-4">
                            {error}
                        </div>
                    )}

                    {parsedData && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
                            <div className="bg-white rounded-[2rem] shadow-2xl shadow-qalam-teal/5 overflow-hidden border border-gray-100">
                                <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg gap-2 border border-blue-100/50">
                                            <div className="flex items-center gap-1.5 opacity-60">
                                                <Code size={14} className="stroke-[3]" />
                                                <Settings size={14} className="stroke-[3]" />
                                            </div>
                                            <span className="text-sm font-bold">تحليل الذكاء الاصطناعي</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-2.5 text-blue-600 border border-blue-100 hover:bg-blue-50 rounded-lg transition-all shadow-sm"
                                        title="نسخ النتائج"
                                    >
                                        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                    </button>
                                </div>

                                <div className="p-8 font-mono text-lg leading-relaxed bg-[#FAFBFF] relative overflow-x-auto" dir="ltr">
                                    <div className="flex">
                                        {/* Line numbers */}
                                        <div className="pr-6 border-r border-gray-100 text-gray-300 select-none text-right min-w-[3rem]">
                                            {Array.from({ length: JSON.stringify(parsedData, null, 2).split("\n").length }).map((_, i) => (
                                                <div key={i}>{i + 1}</div>
                                            ))}
                                        </div>

                                        {/* JSON Content */}
                                        <div className="pl-6 text-gray-800">
                                            <div className="text-gray-400">{"{"}</div>
                                            <div className="pl-6">
                                                {Object.entries(parsedData).map(([key, value], index, array) => (
                                                    <div key={key} className="flex">
                                                        <span className="text-pink-600">"{key}"</span>
                                                        <span className="mx-1">:</span>
                                                        <span>
                                                            {renderJsonValue(value)}
                                                            {index < array.length - 1 ? "," : ""}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-gray-400">{"}"}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* visual breakdown cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-2">
                                    <p className="text-sm text-gray-400 font-medium">الموقع</p>
                                    <p className="text-xl font-bold text-qalam-text">{parsedData.location || "غير محدد"}</p>
                                </div>
                                <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-2">
                                    <p className="text-sm text-gray-400 font-medium">الفئة</p>
                                    <p className="text-xl font-bold text-qalam-text">{parsedData.category || "غير محدد"}</p>
                                </div>
                                <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-2">
                                    <p className="text-sm text-gray-400 font-medium">الترتيب حسب</p>
                                    <p className="text-xl font-bold text-qalam-text">{parsedData.sort_by || "الافتراضي"}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {!parsedData && !isLoading && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-32 border-2 border-dashed border-gray-200 rounded-[2rem]"></div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
