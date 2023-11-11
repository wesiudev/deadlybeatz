"use client";
import Link from "next/link";
import Image from "next/image";
import MobileBurger from "./MobileBurger";
import { motion } from "framer-motion";
import { SiYoutubemusic } from "react-icons/si";
import { LinkType } from "@/app/types";
import HeaderLink from "./HeaderLink";
import {
  FaArtstation,
  FaFacebook,
  FaPhone,
  FaSoundcloud,
  FaYoutube,
} from "react-icons/fa";
export default function Header() {
  return (
    <div
      className="p-3 w-full lg:h-full lg:w-[193px] xl:w-[250px]
    flex flex-row lg:flex-col items-center justify-between
    fixed top-0 left-0 bg-[#f5f5f5]  lg:bg-transparent
    lg:border-r border-[#d4d4d4a9]  lg:border-0 z-50"
    >
      <div className="">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/assets/deadly-beatz-logo.png"
            width={1024}
            height={1024}
            alt="deadly beatz logo"
            className="h-16 lg:h-[72px] xl:h-24 w-auto"
          />
        </Link>
        <div className="w-full mt-3 flex flex-col">
          <motion.a
            href="/auth"
            className="bg-[#FF5500] text-white font-bold rounded-xl w-[calc(100%-5px)] py-3 hover:bg-[#ff5500d7] duration-200 text-center mx-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Dołącz teraz
          </motion.a>
          <div className="flex flex-col mt-12 space-y-3 text-lg duration-100">
            {HeaderLinks.map((item: LinkType, i: any) => (
              <HeaderLink
                label={item.label}
                destination={item.destination}
                isScrollLink={item.isScrollLink}
                Icon={item.Icon}
                key={i}
              ></HeaderLink>
            ))}
          </div>
        </div>
        {/* hidden on lg */}
        <MobileBurger />
      </div>
      <div className="font-bold flex flex-col items-center justify-center text-center">
        <div className="flex flex-row items-center justify-center space-x-5 mb-2">
          <div>
            <FaFacebook className="text-blue-500 h-6 w-6" />
          </div>
          <div>
            <FaSoundcloud className="text-[#FF5500] h-6 w-6" />
          </div>
          <div>
            <FaYoutube className="text-red-500 h-6 w-6" />
          </div>
        </div>{" "}
        <p>DeadlyBeatz &copy;</p>
      </div>
    </div>
  );
}

const HeaderLinks = [
  {
    label: "Wszystkie Bity",
    destination: "/sklep-z-bitami",
    Icon: SiYoutubemusic,
    isScrollLink: false,
  },
  {
    label: "Blog",
    destination: "/blog-muzyczny",
    Icon: FaArtstation,
    isScrollLink: false,
  },
  {
    label: "Kontakt",
    destination: "#kontakt",
    Icon: FaPhone,
    isScrollLink: true,
  },
];
