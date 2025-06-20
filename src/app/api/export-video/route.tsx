import { renderMedia, getCompositions } from "@remotion/renderer";
import path from "path";
import os from "os";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/configs/firebase";

export async function POST(req: Request) {
  const { videoData } = await req.json();
  const tmpPath = path.join(os.tmpdir(), `${Date.now()}.mp4`);

  try {
    // Step 1: Get all compositions
    const compositions = await getCompositions("http://localhost:3000", {
      inputProps: videoData,
    });

    // Step 2: Find the one with ID 'Empty'
    const composition = compositions.find((c) => c.id === "Empty");
    if (!composition) {
      throw new Error("Composition with ID 'Empty' not found.");
    }

    // Step 3: Render video using actual VideoConfig object
    await renderMedia({
      serveUrl: "http://localhost:3000",
      composition, // 👈 correct object, not a string
      codec: "h264",
      outputLocation: tmpPath,
      inputProps: videoData,
    });

    // Step 4: Upload rendered video to Firebase Storage
    const videoBuffer = await fs.readFile(tmpPath);
    const fileRef = ref(storage, `ai-short-video-files/${Date.now()}.mp4`);
    await uploadBytes(fileRef, videoBuffer, {
      contentType: "video/mp4",
    });

    const downloadUrl = await getDownloadURL(fileRef);
    return NextResponse.json({ success: true, url: downloadUrl });
  } catch (err: any) {
    console.error("Video export error:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
