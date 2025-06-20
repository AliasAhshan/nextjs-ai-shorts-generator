"use client";

import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./remotionvideo";
import PlayerDialog from "./playerdialog";
import { Button } from "@/components/ui/button";

type Video = {
  id: number;
  audioFileUrl: string;
  captions: unknown;
  imageList: string[] | null;
  script: unknown;
  createdBy: string;
};

type VideoListProps = {
  videoList: Video[];
  onDelete?: (id: number) => void;
};

function VideoList({ videoList, onDelete }: VideoListProps) {
  const [openPlayerDialog, setOpenPlayerDialog] = useState<number | null>(null);
  const [videoId, setVideoId] = useState<number | undefined>();

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this video?");
    if (confirmDelete && onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videoList?.map((video) => (
        <div
          key={video.id}
          className="relative group"
          style={{ width: 300, height: 450 }}
        >
          <div
            className="cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setOpenPlayerDialog(Date.now());
              setVideoId(video.id);
            }}
          >
            <Thumbnail
              component={RemotionVideo}
              compositionWidth={300}
              compositionHeight={450}
              frameToDisplay={30}
              durationInFrames={120}
              fps={30}
              style={{
                borderRadius: 15,
              }}
              inputProps={{
                ...video,
                setDurationInFrames: () => {},
              }}
            />
          </div>

          {/* Delete Button (shown on hover only) */}
          {onDelete && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="destructive"
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening video
                  handleDelete(video.id);
                }}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      ))}

      <PlayerDialog playVideo={openPlayerDialog} videoId={videoId} />
    </div>
  );
}

export default VideoList;
