import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Player } from "@remotion/player"
import React, { useEffect, useState } from 'react'
import RemotionVideo from "./remotionvideo"
import { Button } from "@/components/ui/button";
import { db } from "@/configs/dbconfig";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { InferSelectModel } from "drizzle-orm";
import { useRouter } from "next/navigation";

type VideoDataType = InferSelectModel<typeof VideoData>;

export default function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState<VideoDataType | undefined>();
  const [durationInFrames, setDurationInFrames] = useState(100);
  const router = useRouter();

  useEffect(() => {
    if (playVideo) {
      setOpenDialog(true);
      videoId && GetVideoData();
    }
  }, [playVideo, videoId]);

  const GetVideoData = async () => {
    const res = await db.select().from(VideoData).where(eq(VideoData.id, videoId));
    console.log(res);
    setVideoData(res[0]);
  };

  const handleClose = () => {
    setOpenDialog(false);
    router.replace('/dashboard');
  };

  return (
    <Dialog open={openDialog} onOpenChange={(open) => {
      if (!open) {
        handleClose();
      }
    }}>
      <DialogContent
        className="bg-white flex flex-col items-center"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">Your video is ready!</DialogTitle>
          <DialogDescription>
            <Player
              component={RemotionVideo}
              durationInFrames={Number(durationInFrames.toFixed(0))}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              controls={true}
              inputProps={{
                ...videoData,
                setDurationInFrames: (frameValue) => setDurationInFrames(frameValue)
              }}
            />
            <div className="flex gap-10 mt-10">
              <Button variant="ghost" onClick={handleClose}>Cancel</Button>
              <Button>Export</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
