import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        if (!email || typeof email !== "string") {
            return NextResponse.json({ error: "Email is required." }, { status: 400 });
        }
        await db.execute(
            "INSERT IGNORE INTO pro_users (email) VALUES (?)",
            [email]
        );
        return NextResponse.json({ success: true });
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "Database error.";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
} 