"use client";
import { updateProduct } from "@/firebase";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import WaveSurfer from "wavesurfer.js";

export default function OpenedBeat({
  beat,
  setBeat,
}: {
  beat: any;
  setBeat: any;
}) {
  const [rawTimestamp, setRawTimestamp] = useState(0);
  const [beatPeaks, setBeatPeaks] = useState("");
  const [isDecoded, setIsDecoded] = useState(false);
  const [audioProgress, setAudioProgress] = useState("0:00");
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer>();
  const waveformRef = useRef(null);
  useEffect(() => {
    const ctx = document?.createElement("canvas").getContext("2d");
    if (ctx) {
      const gradient = ctx?.createLinearGradient(0, 0, 0, 150);
      gradient.addColorStop(0, "rgb(200, 200, 200)");
      gradient.addColorStop(0.5, "rgb(0, 0, 0)");
      gradient.addColorStop(1, "rgb(0, 0, 0)");
      const ws = WaveSurfer?.create({
        container: waveformRef?.current!,
        waveColor: gradient,
        progressColor: "#FF5500",
        url: beat?.sampleUrl,
        height: 50,
        dragToSeek: true,
        peaks: beat.peaks ? JSON.parse(beat.peaks) : null,
        backend: "MediaElement",
      });

      setWaveSurfer(ws);

      ws?.load(
        beat?.sampleUrl,
        beat.peaks ? JSON.parse(beat.peaks) : null,
        beat?.sampleUrl?.split(".").pop()
      );
      ws?.on("decode", (duration) => {
        setAudioProgress(formatTime(duration)), setRawTimestamp(duration);
      });
      ws?.on("timeupdate", (currentTime) => {
        setAudioProgress(formatTime(currentTime)), setRawTimestamp(currentTime);
      });

      return () => {
        ws.destroy();
      };
    }
  }, []);
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };
  return (
    <div className="fixed left-0 top-0 bg-white text-black items-center justify-center flex-col flex w-screen h-screen">
      <h2 className="font-bold text-4xl">{beat.title}</h2>
      <div className="text-sm w-[80vw] overflow-x-scroll">
        <span className="font-bold">DB PEAKS</span>: {beat.peaks}
      </div>
      <div className="text-sm w-[80vw] overflow-x-scroll">
        <span className="font-bold">LOADED PEAKS</span>: {beatPeaks}
      </div>
      <div className="h-max w-[300px]" ref={waveformRef} />
      <button
        onClick={() => {
          setBeatPeaks(
            JSON.stringify(
              waveSurfer?.exportPeaks({
                channels: 1, // Set the number of channels to 2
                maxLength: 250, // Set the maximum length of peaks to 1000
              })
            )
          ),
            setBeat({ ...beat, peaks: beatPeaks });
        }}
        className="bg-black text-white font-bold text-2xl p-3 mt-2"
      >
        Load Peaks
      </button>

      <button
        onClick={() => {
          updateProduct("deadlybeatz", beat).then(() => setBeat());
        }}
        className="bg-black text-white font-bold text-2xl p-3 mt-2"
      >
        Save changes
      </button>
      <button
        onClick={() => setBeat()}
        className="bg-black text-white font-bold text-2xl p-3 mt-2"
      >
        Close
      </button>
    </div>
  );
}
