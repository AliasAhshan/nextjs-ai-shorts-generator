import { createContext } from "react";

type VideoDataType = {
  videoScript: { imagePrompt: string; contentText?: string }[];
  audioFileUrl: string;
  captions: string[];
  imageList: string[];
};

type VideoDataContextType = {
  videoData: VideoDataType;
  setVideoData: React.Dispatch<React.SetStateAction<VideoDataType>>;
};

export const VideoDataContext = createContext<VideoDataContextType>({
  videoData: {
    videoScript: [],
    audioFileUrl: "",
    captions: [],
    imageList: []
  },
  setVideoData: () => {}
});
