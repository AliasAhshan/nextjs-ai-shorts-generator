// src/app/api/get-video-script/route.ts
import { NextResponse } from "next/server";
import { generateScript } from "@/configs/aimodel";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const raw = await generateScript(prompt);
    console.log("Raw Gemini Response:", raw); // <-- 🔍 log 1

    // Remove markdown wrappers like ```json and ```
    const cleaned = raw
      .replace(/```json\n?/gi, "")
      .replace(/```/g, "")
      .trim();

    console.log("Cleaned Response:", cleaned); // <-- 🔍 log 2

    const jsonStart = cleaned.indexOf("[");
    const jsonEnd = cleaned.lastIndexOf("]") + 1;
    const trimmed = cleaned.substring(jsonStart, jsonEnd);

    console.log("Trimmed JSON Segment:", trimmed); // <-- 🔍 log 3

    const parsed = JSON.parse(trimmed);
    return NextResponse.json({ result: parsed });

  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
