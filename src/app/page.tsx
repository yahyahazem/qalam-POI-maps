"use client";

import { useState } from "react";
import { Search, MapPin, Loader2, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import ResultCard from "@/components/ResultCard";
import ResultSkeleton from "@/components/ResultSkeleton";

export default function Home() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError(null);
        setResults([]);

        try {
            const response = await fetch("/api/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                let errorMessage = "حدث خطأ في البحث";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (e) {
                    errorMessage = `خطأ في الخادم (${response.status})`;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            setResults(data.results || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-qalam-bg overflow-hidden shadow-2xl">
            {/* Sidebar */}
            <aside className="w-64 border-l border-gray-200 bg-white p-6 hidden md:flex flex-col gap-8 shadow-sm">
                <div className="text-qalam-teal font-bold text-2xl flex items-center gap-2">
                    <MapPin size={28} />
                    <span>خريطة قلم</span>
                </div>

                <nav className="flex flex-col gap-3">
                    <Link
                        href="/analyze"
                        className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 rounded-qalam transition-all text-right"
                    >
                        <LayoutDashboard size={20} />
                        <span>تحليل الاستعلام</span>
                    </Link>
                    <button
                        onClick={() => { setResults([]); setQuery(""); }}
                        className={`flex items-center gap-3 w-full p-3 rounded-qalam transition-all text-right ${results.length === 0 ? 'bg-qalam-teal/10 text-qalam-teal font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Search size={20} />
                        <span>بحث جديد</span>
                    </button>

                </nav>


            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-auto">
                {results.length === 0 && !isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6">
                        <div className="w-full max-w-2xl text-center space-y-10">
                            <div className="space-y-4">
                                <h1 className="text-5xl font-extrabold text-qalam-text tracking-tight">
                                    ابحث عن أي مكان بذكاء
                                </h1>
                                <p className="text-gray-400 text-xl max-w-lg mx-auto leading-relaxed">
                                    اطلب من المحلل الذكي العثور على ما تبحث عنه باللغة العربية البسيطة
                                </p>
                            </div>

                            <form onSubmit={handleSearch} className="relative group max-w-2xl mx-auto">
                                <div className="absolute inset-0 bg-qalam-teal/5 blur-xl group-focus-within:bg-qalam-teal/10 transition-all rounded-full"></div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="مثلاً: مطعم شاورما هادئ في حي النخيل بالرياض..."
                                        className="qalam-input text-xl py-7 pr-16 shadow-lg border-gray-100 hover:border-gray-200"
                                        autoFocus
                                    />
                                    <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-qalam-teal transition-colors" size={28} />
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 btn-primary px-8 py-4 text-lg font-semibold flex items-center gap-2 shadow-lg shadow-qalam-teal/20"
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" size={24} /> : "بحث"}
                                    </button>
                                </div>
                            </form>

                            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                                <span className="text-gray-400">اقتراحات:</span>
                                <button onClick={() => { setQuery("كافيهات هادئة للدراسة"); handleSearch(); }} className="text-gray-500 hover:text-qalam-teal transition-colors">كافيهات للدراسة</button>
                                <button onClick={() => { setQuery("محطات وقود قريبة"); handleSearch(); }} className="text-gray-500 hover:text-qalam-teal transition-colors">محطات وقود قريبة</button>
                                <button onClick={() => { setQuery("أفضل محل حلويات في جدة"); handleSearch(); }} className="text-gray-500 hover:text-qalam-teal transition-colors">أفضل محل حلويات</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-10 max-w-6xl mx-auto w-full space-y-10">
                        <form onSubmit={handleSearch} className="relative group max-w-3xl">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="qalam-input text-lg py-5 pr-14 shadow-md bg-white border-gray-100"
                            />
                            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-qalam-teal" size={24} />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="absolute left-2.5 top-1/2 -translate-y-1/2 btn-primary px-6 py-2.5 font-medium"
                            >
                                تحديث
                            </button>
                        </form>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <h2 className="text-2xl font-bold text-qalam-text">
                                    نتائج البحث عن: <span className="text-qalam-teal">{query}</span>
                                </h2>
                                <div className="flex gap-2">
                                    <select className="bg-transparent text-sm border-none focus:ring-0 text-gray-500 cursor-pointer outline-none">
                                        <option>الأكثر صلة</option>
                                        <option>الأعلى تقييماً</option>
                                        <option>الأقرب</option>
                                    </select>
                                </div>
                            </div>

                            {error && (
                                <div className="p-6 bg-red-50 border border-red-100 text-red-600 rounded-qalam text-center shadow-sm">
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {isLoading ? (
                                    Array.from({ length: 6 }).map((_, i) => <ResultSkeleton key={i} />)
                                ) : (
                                    results.map((place) => (
                                        <ResultCard key={place.id} place={place} />
                                    ))
                                )}
                            </div>

                            {results.length === 0 && !isLoading && !error && (
                                <div className="text-center py-20 flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                                        <Search size={32} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xl font-medium text-gray-400">لم يتم العثور على نتائج</p>
                                        <p className="text-gray-300">حاول تغيير كلمات البحث أو استخدام كلمات أبسط</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
