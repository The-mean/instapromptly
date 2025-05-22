import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        if (!email || typeof email !== "string") {
            return NextResponse.json({ error: "Email is required." }, { status: 400 });
        }
        const [rows] = await db.execute(
            "SELECT * FROM pro_users WHERE email = ?",
            [email]
        );
        const isPro = Array.isArray(rows) && rows.length > 0;
        return NextResponse.json({ isPro });
    } catch (e: Error) {
        return NextResponse.json({ error: e.message || "Database error." }, { status: 500 });
    }
} 