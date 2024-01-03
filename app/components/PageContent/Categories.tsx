import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  return (
    <div>
      <h2 className="text-3xl font-druk text-black text-center 2xl:text-left">
        Kategorie
      </h2>
      <div className="grid lg:grid-cols-3 w-[750px] xl:w-[950px] mx-auto 2xl:w-[900px] 2xl:mx-0 gap-6 2xl:gap-4 mt-8">
        {categories.map((item: any, i: any) => (
          <Link
            href={`/beats?category=${item.query}`}
            key={i}
            className={` flex flex-col group w-full`}
          >
            <div className=" relative">
              <div className="absolute left-0 top-0 w-full h-full bg-black hover:opacity-5 opacity-0 duration-200 rounded-xl" />
              <Image
                src={item.image}
                width={512}
                height={512}
                alt={item.description}
                className="aspect-square rounded-xl border-[#e4e4e4] border"
              />
            </div>
            <h3 className="text-lg font-coco mt-2 text-black group-hover:underline underline-offset-2">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
const categories = [
  // {
  //   title: "Double Tempo Trap",
  //   query: "double-tempo-trap",
  //   image: "/assets/category-double-tempo-trap.webp",
  //   description: "",
  // },
  // {
  //   title: "Hip Hop & Trap",
  //   query: "trap-hiphop",
  //   image: "/assets/category-hip-hop-trap.webp",
  //   description: "",
  // },
  {
    title: "Hip Hop House",
    query: "house-hip-hop",
    image: "/assets/category-hip-hop-house.webp",
    description: "",
  },
  {
    title: "Pop",
    query: "pop",
    image: "/assets/category-pop.png",
    description: "",
  },
  {
    title: "Trap",
    query: "trap",
    image: "/assets/category-trap.webp",
    description: "",
  },
  // {
  //   title: "Half Tempo Trap",
  //   query: "half-tempo-trap",
  //   image: "/assets/category-half-tempo-trap.webp",
  //   description: "",
  // },
  // {
  //   title: "Lo Fi Neo Soul",
  //   query: "lofi-neo",
  //   image: "/assets/category-lofi-neo.webp",
  //   description: "",
  // },
];
