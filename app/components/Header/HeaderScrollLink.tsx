"use client";
import * as Scroll from "react-scroll";
import { IconType } from "react-icons/lib";

export default function ScrollTo({
  destination,
  label,
  Icon,
}: {
  destination: string;
  label: string;
  Icon: IconType;
}) {
  let ScrollTo = Scroll.Link;

  return (
    <ScrollTo
      className="flex flex-row items-center justify-between group hover:bg-[#ff550049] duration-100 rounded-md cursor-pointer p-2"
      activeClass="active"
      to={destination}
      spy={true}
      smooth={true}
      offset={50}
      duration={500}
    >
      <Icon className="text-[#FF5500] h-7 w-7" />
      <span>{label}</span>
    </ScrollTo>
  );
}
