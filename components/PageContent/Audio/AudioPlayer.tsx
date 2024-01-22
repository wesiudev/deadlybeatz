"use client";
import { updateProduct } from "@/firebase";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function AudioPlayer({
  currentAudio,
  setCurrentAudio,
  audio,
  index,
}: {
  currentAudio: number;
  setCurrentAudio: Function;
  audio: any;
  index: number;
}) {
  const waveformRef = useRef(null);
  const [audioProgress, setAudioProgress] = useState("0:00");
  const [rawTimestamp, setRawTimestamp] = useState(0);
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer>();
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
        url: audio?.sampleUrl,
        height: 50,
        dragToSeek: true,
        peaks: audio?.peaks ? JSON.parse(audio?.peaks) : null,
        backend: "MediaElement",
      });

      setWaveSurfer(ws);

      ws?.load(audio?.sampleUrl, undefined, audio?.sampleUrl?.split(".").pop());
      ws?.on("decode", (duration) => {
        setAudioProgress(formatTime(duration)), setRawTimestamp(duration);
        const peaks = ws?.exportPeaks({
          channels: 2, // Set the number of channels to 2
          maxLength: 1000, // Set the maximum length of peaks to 1000
          precision: 0.01, // Set the precision of peaks to 0.01
        });

        if (audio.peaks === undefined && peaks) {
          updateProduct("deadlybeatz", {
            ...audio,
            peaks: JSON.stringify(peaks),
          });
        }
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
  useEffect(() => {
    currentAudio === index ? waveSurfer?.play() : waveSurfer?.pause();
  }, [currentAudio]);
  useEffect(() => {
    if (rawTimestamp === waveSurfer?.getDuration()) {
      setCurrentAudio(-1);
    }
  }, [rawTimestamp]);
  return (
    <div className="flex flex-col mb-3">
      <>
        <div className="flex flex-row items-center justify-between text-white">
          <div className="">
            <span
              className={`font-bold ${
                currentAudio === index ? "text-green-400" : "text-white"
              }`}
            >
              {audio?.title}
            </span>
            <span className="text-gray-600 ml-3">{audio?.genre}</span>
          </div>
          <p>
            {currentAudio === index ? (
              <>
                {" "}
                {audioProgress} / {formatTime(waveSurfer?.getDuration() || 0)}{" "}
              </>
            ) : (
              <>{formatTime(waveSurfer?.getDuration() || 0)}</>
            )}
          </p>
        </div>
        <div
          className="h-max"
          onClick={() => {
            setCurrentAudio(index);
          }}
          ref={waveformRef}
        />
      </>
    </div>
  );
}
// "use client";
// import { useCallback, useEffect, useRef, useState } from "react";
// import WaveSurfer from "wavesurfer.js";

// export default function AudioPlayer({
//   currentAudio,
//   setCurrentAudio,
//   audio,
// }: {
//   currentAudio: number;
//   setCurrentAudio: Function;
//   audio: any;
// }) {
//   const waveformRef = useRef<HTMLDivElement>(null);
//   const [audioProgress, setAudioProgress] = useState("0:00");
//   const [rawTimestamp, setRawTimestamp] = useState(0);
//   const [waveSurfer, setWaveSurfer] = useState<WaveSurfer>();

//   const formatTime = useCallback((seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const secondsRemainder = Math.round(seconds) % 60;
//     const paddedSeconds = `0${secondsRemainder}`.slice(-2);
//     return `${minutes}:${paddedSeconds}`;
//   }, []);

//   useEffect(() => {
//     if (!waveSurfer) {
//       const ws = WaveSurfer.create({
//         container: waveformRef.current!,
//         waveColor: "#FF5500",
//         progressColor: "#FF5500",
//         height: 50,
//         dragToSeek: true,
//         backend: "MediaElement",
//       });
//       setWaveSurfer(ws);
//       ws.on("decode", (duration) => {
//         setAudioProgress(formatTime(duration)), setRawTimestamp(duration);
//       });
//       ws.on("timeupdate", (currentTime) => {
//         setAudioProgress(formatTime(currentTime)), setRawTimestamp(currentTime);
//       });
//       ws.load(audio.sampleUrl, [], audio.sampleUrl.split(".").pop());
//     } else {
//       waveSurfer.play();
//     }
//   }, [audio.sampleUrl, formatTime, waveSurfer]);

//   useEffect(() => {
//     if (waveSurfer) {
//       currentAudio === audio.index ? waveSurfer.play() : waveSurfer.pause();
//     }
//   }, [currentAudio, audio.index, waveSurfer]);

//   useEffect(() => {
//     if (rawTimestamp === waveSurfer?.getDuration()) {
//       setCurrentAudio(-1);
//     }
//   }, [rawTimestamp, setCurrentAudio, waveSurfer]);

//   return (
//     <div className="flex flex-col mb-3">
//       <div className="flex flex-row items-center justify-between text-white">
//         <span className="font-bold">{audio.genre}</span>
//         <p>
//           {currentAudio === audio.index ? (
//             <>
//               {audioProgress} / {formatTime(waveSurfer?.getDuration() || 0)}
//             </>
//           ) : (
//             <>{formatTime(waveSurfer?.getDuration() || 0)}</>
//           )}
//         </p>
//       </div>
//       <div
//         className="h-50 w-full"
//         onClick={() => {
//           setCurrentAudio(audio.index);
//         }}
//         ref={waveformRef}
//       />
//     </div>
//   );
// }
