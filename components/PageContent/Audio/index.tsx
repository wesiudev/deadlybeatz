"use client";
import { useState } from "react";
import AudioPlayer from "./AudioPlayer";
export default function AudioArray({ audioArray }: { audioArray: any[] }) {
  const [currentAudio, setCurrentAudio] = useState(-1);
  return (
    <div>
      {audioArray?.map((audio: any, i: any) => (
        <AudioPlayer
          index={i}
          key={i}
          setCurrentAudio={setCurrentAudio}
          currentAudio={currentAudio}
          audio={audio}
        />
      ))}
    </div>
  );
}
