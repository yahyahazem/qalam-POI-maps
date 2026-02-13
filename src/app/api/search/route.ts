import { NextRequest, NextResponse } from "next/server";
import { parseArabicQuery } from "@/lib/huggingface";
import { searchPlaces } from "@/lib/google-places";

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        if (!query) {
            return NextResponse.json({ error: "Query is required" }, { status: 400 });
        }

        // 1. Parsing the query with AI
        const parsedData = await parseArabicQuery(query);
        console.log("Parsed Data:", parsedData);

        // 2. Searching Google Places
        const places = await searchPlaces(parsedData);

        return NextResponse.json({
            parsed: parsedData,
            results: places,
        });
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
