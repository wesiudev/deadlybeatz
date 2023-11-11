import Link from "next/link";

import HeaderScrollLink from "./HeaderScrollLink";
import { LinkType } from "@/app/types";

export default function HeaderLink({
  isScrollLink,
  destination,
  label,
  Icon,
}: LinkType) {
  return (
    <div>
      {!isScrollLink && (
        <Link
          href={destination}
          className="flex flex-row items-center justify-between group hover:bg-[#ff550049] duration-100 rounded-md p-2"
        >
          <Icon className="text-[#FF5500] h-7 w-7" />
          <span>{label}</span>
        </Link>
      )}
      {isScrollLink && (
        <HeaderScrollLink destination={destination} label={label} Icon={Icon} />
      )}
    </div>
  );
}
