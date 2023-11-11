"use client";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function AudioPlayer({
  currentAudio,
  setCurrentAudio,
  audio,
}: {
  currentAudio: number;
  setCurrentAudio: Function;
  audio: any;
}) {
  const waveformRef = useRef(null);
  const [audioProgress, setAudioProgress] = useState("0:00");
  const [rawTimestamp, setRawTimestamp] = useState(0);
  const [waveSurfer, setWaveSurfer] = useState<WaveSurfer>();
  const [isLoading, setLoading] = useState(false);
  const [peaks, setPeaks] = useState<any>();
  useEffect(() => {
    const ctx = document.createElement("canvas").getContext("2d");
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 150);
      gradient.addColorStop(0, "rgb(200, 200, 200)");
      gradient.addColorStop(0.5, "rgb(0, 0, 0)");
      gradient.addColorStop(1, "rgb(0, 0, 0)");
      const ws = WaveSurfer.create({
        container: waveformRef.current!,
        waveColor: gradient,
        progressColor: "#FF5500",
        url: audio.src,
        height: 50,
        dragToSeek: true,
        peaks: peaks,
      });
      setWaveSurfer(ws);

      ws.load(audio.src, [], audio.src.split(".").pop());
      ws.on("decode", (duration) => {
        setAudioProgress(formatTime(duration)),
          setRawTimestamp(duration),
          setPeaks(
            ws.exportPeaks({ channels: 300, maxLength: 300, precision: 300 })
          );
      });
      ws.on("timeupdate", (currentTime) => {
        setAudioProgress(formatTime(currentTime)), setRawTimestamp(currentTime);
      });
      console.log(peaks);

      setLoading(false);
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
    currentAudio === audio.index ? waveSurfer?.play() : waveSurfer?.pause();
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
          {" "}
          <span className="font-bold">{audio.genre}</span>
          <p>
            {currentAudio === audio.index ? (
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
            setCurrentAudio(audio.index);
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
//       ws.load(audio.src, [], audio.src.split(".").pop());
//     } else {
//       waveSurfer.play();
//     }
//   }, [audio.src, formatTime, waveSurfer]);

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
