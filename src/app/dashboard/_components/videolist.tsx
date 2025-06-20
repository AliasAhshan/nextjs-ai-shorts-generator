"use client"

import React, { useState } from 'react';
import { Thumbnail } from '@remotion/player';
import RemotionVideo from './remotionvideo';
import PlayerDialog from './playerdialog';

function VideoList({ videoList }) {
    const [openPlayerDialog, setOpenPlayerDialog] = useState<number | null>(null);
    const [videoId, setVideoId] = useState();
    
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-1">
      {videoList?.map((video, index) => (
        <div key={index} className="cursor-pointer hover:scale-105 transition-all"
        onClick={() => {setOpenPlayerDialog(Date.now()); setVideoId(video?.id)}}
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={300}
            compositionHeight={450}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{
                borderRadius:15
            }}
            inputProps={{
              ...video,
              setDurationInFrames: () => {}, // prevent runtime error
            }}
          />
        </div>
      ))}

      <PlayerDialog playVideo={openPlayerDialog} videoId={videoId}/>

      
    </div>
  );
}

export default VideoList;
