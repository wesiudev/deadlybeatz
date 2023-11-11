"use client";
import { useState } from "react";
import AudioPlayer from "./AudioPlayer";
import dynamic from "next/dynamic";
const DynamicBeat = dynamic(() => import("./AudioPlayer"), {
  ssr: false, // Only rendered client-side
  loading: () => <p>Loading...</p>, // Optional: Show a loading indicator while the component is being loaded
});
export default function AudioArray({ audioArray }: { audioArray: any[] }) {
  const [currentAudio, setCurrentAudio] = useState(-1);
  return (
    <div>
      {audioArray.map((audio: any, i: any) => (
        <AudioPlayer
          key={i}
          setCurrentAudio={setCurrentAudio}
          currentAudio={currentAudio}
          audio={audio}
        />
      ))}
    </div>
  );
}
