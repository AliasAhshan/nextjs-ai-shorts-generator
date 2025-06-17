// src/app/api/get-video-script/route.ts
import { NextResponse } from "next/server";
import { generateScript } from "@/configs/aimodel";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const raw = await generateScript(prompt);
    const jsonStart = raw.indexOf("[");
    const jsonEnd = raw.lastIndexOf("]") + 1;
    const trimmed = raw.substring(jsonStart, jsonEnd);

    const parsed = JSON.parse(trimmed);
    return NextResponse.json({ result: parsed });
  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
