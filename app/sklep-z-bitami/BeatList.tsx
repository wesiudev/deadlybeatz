"use client";
import { useState } from "react";
import AudioPlayer from "@/components/PageContent/Audio/AudioPlayer";

export default function BeatList({ beats }: { beats: any }) {
  const [currentAudio, setCurrentAudio] = useState(-1);

  return (
    <div className="grid grid-cols-2 gap-12 bg-zinc-700 pl-[300px] pr-12 py-12">
      {beats?.map((item: any, i: any) => (
        <div key={i}>
          <AudioPlayer
            index={i}
            audio={item}
            setCurrentAudio={setCurrentAudio}
            currentAudio={currentAudio}
          />
        </div>
      ))}
    </div>
  );
}
