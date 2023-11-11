import Hero from "./Hero";
import Categories from "./Categories";
import AudioPlayer from "./Audio/AudioPlayer";
import AudioArray from "./Audio";
import React from "react";

export default function PageContent() {
  return (
    <div className="mx-3 lg:ml-[193px] xl:ml-[250px] lg:mr-0 min-h-screen pt-[88px] lg:pt-[0px]">
      <Hero />
      <div className="p-3 lg:p-6 flex flex-col ">
        <div className="flex flex-col 2xl:flex-row justify-center">
          <Categories />
          <div className="w-full h-full 2xl:ml-8">
            <h2 className="text-3xl font-druk text-black text-center 2xl:text-left mt-12 2xl:mt-0">
              Popularne beaty
            </h2>
            <div className="w-[90%] lg:w-[750px] xl:w-[950px] mx-auto 2xl:w-full h-full gap-3 mt-8 p-6 rounded-xl bg-[#242424]">
              <AudioArray
                audioArray={[
                  {
                    index: 0,
                    src: "https://firebasestorage.googleapis.com/v0/b/quixy-99e34.appspot.com/o/dt-trap-150bpm.mp3?alt=media&token=84c883e1-0ffd-4b6e-9d6e-4d122d2c6a09",
                    title: "",
                    genre: "Double Tempo Trap 150BPM",
                  },
                  // {
                  //   index: 1,
                  //   src: "https://firebasestorage.googleapis.com/v0/b/quixy-99e34.appspot.com/o/dt-trap-155bpm.mp3?alt=media&token=f989b759-26da-453e-9d0c-139c45a6b0c4",
                  //   title: "",
                  //   genre: "Double Tempo Trap 155BPM",
                  // },
                  // {
                  //   index: 2,
                  //   src: "https://firebasestorage.googleapis.com/v0/b/quixy-99e34.appspot.com/o/hiphop-85bpm.mp3?alt=media&token=cea67bc9-082f-4692-b8df-7bb69e96e178",
                  //   title: "",
                  //   genre: "Hip Hop 85BPM",
                  // },
                  // {
                  //   index: 3,
                  //   src: "https://firebasestorage.googleapis.com/v0/b/quixy-99e34.appspot.com/o/hiphop-89bpm.mp3?alt=media&token=8c3f1ad0-0e62-44de-b4f2-5033c2f00fe4",
                  //   title: "",
                  //   genre: "Hip Hop 89BPM",
                  // },
                  // {
                  //   index: 4,
                  //   src: "https://firebasestorage.googleapis.com/v0/b/quixy-99e34.appspot.com/o/hiphop-90bpm.mp3?alt=media&token=cfb3bae7-02a7-4bee-b788-2b3fad44394c",
                  //   title: "",
                  //   genre: "Hip Hop 90BPM",
                  // },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
