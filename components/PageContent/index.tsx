"use client";
import Hero from "./Hero";
import Categories from "./Categories";
import AudioPlayer from "./Audio/AudioPlayer";
import AudioArray from "./Audio";
import React from "react";

export default function PageContent() {
  return (
    <div className="mx-3 lg:ml-[193px] xl:ml-[250px] lg:mr-0 min-h-screen pt-[88px] lg:pt-[0px]">
      <Hero />
      <div className="p-3 lg:p-0 lg:pt-6 2xl:p-6 flex flex-col ">
        <div className="flex flex-col 2xl:flex-row justify-center">
          <Categories />
          <div className="w-full h-full 2xl:ml-8">
            <h2 className="text-3xl font-druk text-black text-center 2xl:text-left mt-12 2xl:mt-0">
              Popularne beaty
            </h2>
            <div className="w-[90%] lg:w-full mx-auto 2xl:w-full h-full gap-3 mt-8 p-6 2xl:rounded-xl bg-[#242424]">
              <AudioArray
                audioArray={[
                  {
                    index: 0,
                    sampleUrl:
                      "https://firebasestorage.googleapis.com/v0/b/quixy-99e34.appspot.com/o/dt-trap-150bpm.mp3?alt=media&token=84c883e1-0ffd-4b6e-9d6e-4d122d2c6a09",
                    title: "Midnight Drive",
                    genre: "Trap 150BPM",
                  },
                  {
                    index: 1,
                    sampleUrl:
                      "https://firebasestorage.googleapis.com/v0/b/quixy-99e34.appspot.com/o/dt-trap-155bpm.mp3?alt=media&token=f989b759-26da-453e-9d0c-139c45a6b0c4",
                    title: "Street Lights",
                    genre: "Trap 155BPM",
                  },
                  {
                    index: 2,
                    sampleUrl:
                      "https://firebasestorage.googleapis.com/v0/b/quixy-99e34.appspot.com/o/trap-160bpm.mp3?alt=media&token=56a19cb3-0e74-4fe1-8547-fe674262a592",
                    title: "Echoes",
                    genre: "Trap 160BPM",
                  },
                  {
                    index: 3,
                    sampleUrl:
                      "https://firebasestorage.googleapis.com/v0/b/quixy-99e34.appspot.com/o/hiphop-89bpm.mp3?alt=media&token=8c3f1ad0-0e62-44de-b4f2-5033c2f00fe4",
                    title: "Metro Boomin",
                    genre: "Hip Hop 89BPM",
                  },
                  {
                    index: 4,
                    sampleUrl:
                      "https://firebasestorage.googleapis.com/v0/b/quixy-99e34.appspot.com/o/hiphop-90bpm.mp3?alt=media&token=cfb3bae7-02a7-4bee-b788-2b3fad44394c",
                    title: "Block Banger",
                    genre: "Hip Hop 90BPM",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
