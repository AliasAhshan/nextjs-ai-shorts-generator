import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
    const {audioFileUrl} = await req.json()
    const client = new AssemblyAI({

  apiKey: process.env.CAPTION_API!

});


// const audioFile = "./local_file.mp3";

const audioFile = audioFileUrl


const params = {

  audio: audioFile,


};




  const transcript = await client.transcripts.transcribe(params);


  console.log(transcript.text);
  return NextResponse.json({"result": transcript.words})

    }
    catch(e) {
        return NextResponse.json({"error": e})
    }

}