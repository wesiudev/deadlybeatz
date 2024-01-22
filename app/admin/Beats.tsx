"use client";
import OpenedBeat from "@/components/OpenedBeat";
import Link from "next/link";
import { useState } from "react";

export default function Beats({ beats }: { beats: any }) {
  const [openedBeat, setOpenedBeat] = useState();
  return (
    <div className="grid grid-cols-4 relative">
      {openedBeat && <OpenedBeat beat={openedBeat} setBeat={setOpenedBeat} />}
      {beats.map((item: any, i: any) => (
        <div
          onClick={() => setOpenedBeat(item)}
          key={i}
          className={`${item.peaks ? "text-green-500" : "text-white"} `}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
