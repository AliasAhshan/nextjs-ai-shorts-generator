"use client";

import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/selecttopic";
import SelectStyle from "./_components/selectstyle";
import SelectDuration from "./_components/selectduration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/customloading";
import { v4 as uuidv4 } from 'uuid';
import { VideoDataContext } from "@/app/_context/videodatacontext";
import { VideoData } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/dbconfig";
import PlayerDialog from "../_components/playerdialog";


function CreateNew() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [scriptResult, setScriptResult] = useState<any[]>([]);
  const [videoScript, setVideoScript] = useState<{ imagePrompt: string; contentText?: string }[]>([]);
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const {videoData, setVideoData}=useContext(VideoDataContext);
  const [hasSaved, setHasSaved] = useState(false);
  const {user} = useUser();
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoid] = useState<number | undefined>();




  
  const onHandleInputChange = (fieldName: string, fieldValue: string) => {
    console.log("Received:", fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    setHasSaved(false); //  Reset save flag for new generation
    setVideoData({});   //  Clear old video data
    // setScriptResult([]); // reset display
    setLoading(true);    //  Start loading
    GetVideoScript().finally(() => setLoading(false)); //  Start generation flow
    // GenerateAudioFile(scriptData);
    // GenerateAudioCaption(FILEURL)
    // GenerateImage()
  }


  //Get video script
  const GetVideoScript = async () => {
    try {
      // setLoading(true);
      const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and contentText as field, no plain text`;
        console.log(prompt)
        const res = await axios.post("/api/get-video-script", { prompt });
        console.log("Full response data:", res.data);

        res.data.result.forEach((scene: any, i: number) => {
        console.log(`Scene ${i + 1}:`, scene);
        console.log("Text:", scene.contentText ?? scene.ContentText);
        console.log("Prompt:", scene.imagePrompt);
        });

      setScriptResult(res.data.result);
      setVideoData(prev=>({
        ...prev,
        "videoScript":res.data.result
      }))
      setVideoScript(res.data.result);
      await GenerateAudioFile(res.data.result);
    } catch (e) {
      console.error(e);
    } finally {
      // setLoading(false);
    }
  };

  //Generate audio file and save to firebase
  const GenerateAudioFile = async(videoScriptData) => {
    // setLoading(true)
    let script = "";
    const id=uuidv4();
    videoScriptData.forEach(item=>{
        script = script+item.contentText+" ";
    })
    const res = await axios.post("/api/generate-audio", {
        text:script,
        id:id
    })

        console.log("Audio generation response:", res);

        setVideoData(prev=>({
      ...prev,
      "audioFileUrl":res.data.result
    }))
        setAudioFileUrl(res.data.result);
        res.data.result && await GenerateAudioCaption(res.data.result, videoScriptData)

        // setLoading(false);
  }

  //Generate caption
  const GenerateAudioCaption = async (fileUrl: string, videoScriptData) => {
    // setLoading(true)

    const res = await axios.post("/api/generate-caption", {
      audioFileUrl: fileUrl
    })
      setVideoData(prev=>({
      ...prev,
      "captions":res.data.result
    }))
      setCaptions(res?.data?.result);
      res.data.result && await GenerateImage(videoScriptData);

      // setLoading(false);
    }

    // console.log(GetVideoScript, captions, audioFileUrl)


  //used to generate AI images
  const GenerateImage = async (videoScriptData) => {
    let images = [];

    for(const element of videoScriptData) {
      try {
        const res = await axios.post("/api/generate-image", {
          prompt: element.imagePrompt
        })

        console.log(res.data.result);
        images.push(res.data.result)
      } catch (e) {
        console.log("Error", +e);
      }
    }
      setVideoData(prev=>({
      ...prev,
      "imageList": images
    }))
    setImageList(images)
    // setLoading(false);
  };

  useEffect(() => {
    const allDataReady =
      Array.isArray(videoData?.videoScript) && videoData.videoScript.length > 0 &&
      typeof videoData?.audioFileUrl === "string" &&
      Array.isArray(videoData?.captions) && videoData.captions.length > 0 &&
      Array.isArray(videoData?.imageList) && videoData.imageList.length > 0;

    if (allDataReady && !hasSaved) {
      setHasSaved(true);
      SaveVideoData(videoData);
    }
  }, [videoData, hasSaved]);

 
  const SaveVideoData = async (videoData) => {
    if (!user) return; // don't save if user not ready
    // setLoading(true);
    const res = await db.insert(VideoData).values({
      script: videoData?.videoScript,
      audioFileUrl: videoData?.audioFileUrl,
      captions: videoData?.captions,
      imageList: videoData?.imageList,
      createdBy: user?.primaryEmailAddress?.emailAddress ?? ""
    }).returning({ id: VideoData.id });

    setVideoid(res[0].id);
    setPlayVideo(true)

    console.log("Saved to DB:", res);
    setLoading(false);
  }

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">Create New</h2>
      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button onClick={onCreateClickHandler} className="mt-10 w-full" disabled={loading}>
          {loading ? "Generating..." : "Create Short Video"}
        </Button>
      </div>

      <CustomLoading loading={loading} />

      <PlayerDialog playVideo={playVideo} videoId={videoId}/>

      {scriptResult.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">Generated Scenes:</h3>
          <ul className="space-y-4">
            {scriptResult.map((scene, i) => (
              <li key={i} className="border p-4 rounded">
                <p className="font-semibold">Scene {i + 1}</p>
                <p><strong>Text:</strong> {scene.ContentText}</p>
                <p><strong>Prompt:</strong> {scene.imagePrompt}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CreateNew;
