import { NextRequest, NextResponse } from "next/server";
import { parseArabicQuery } from "@/lib/huggingface";

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        if (!query) {
            return NextResponse.json({ error: "Query is required" }, { status: 400 });
        }

        const parsedData = await parseArabicQuery(query);

        return NextResponse.json(parsedData);
    } catch (error: any) {
        console.error("Analysis API Error:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
