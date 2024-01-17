"use client";
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
        peaks: [
          [
            0, 0.0023595101665705442, 0.012107174843549728,
            0.005919494666159153, -0.31324470043182373, 0.1511787623167038,
            0.2473851442337036, 0.11443428695201874, -0.036057762801647186,
            -0.0968964695930481, -0.03033737652003765, 0.10682467371225357,
            0.23974689841270447, 0.013210971839725971, -0.12377244979143143,
            0.046145666390657425, -0.015757400542497635, 0.10884027928113937,
            0.06681904196739197, 0.09432944655418396, -0.17105795443058014,
            -0.023439358919858932, -0.10380347073078156, 0.0034454423002898693,
            0.08061369508504868, 0.026129156351089478, 0.18730352818965912,
            0.020447958260774612, -0.15030759572982788, 0.05689578503370285,
            -0.0009095853311009705, 0.2749626338481903, 0.2565386891365051,
            0.07571295648813248, 0.10791446268558502, -0.06575305759906769,
            0.15336275100708008, 0.07056761533021927, 0.03287476301193237,
            -0.09044631570577621, 0.01777501218020916, -0.04906218498945236,
            -0.04756792634725571, -0.006875281687825918, 0.04520256072282791,
            -0.02362387254834175, -0.0668797641992569, 0.12266506254673004,
            -0.10895221680402756, 0.03791835159063339, -0.0195105392485857,
            -0.031097881495952606, 0.04252675920724869, -0.09187793731689453,
            0.0829525887966156, -0.003812957089394331, 0.0431736595928669,
            0.07634212076663971, -0.05335947126150131, 0.0345163568854332,
            -0.049201950430870056, 0.02300390601158142, 0.007677287794649601,
            0.015354577451944351, 0.007677287794649601, 0.007677288725972176,
          ],
        ],
      });

      setWaveSurfer(ws);

      ws?.load(audio?.sampleUrl, [], audio?.sampleUrl?.split(".").pop());
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
