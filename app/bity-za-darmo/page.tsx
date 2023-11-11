import { getProducts } from "@/firebase";
import { polishToEnglish } from "../utils/polishToEnglish";
import Image from "next/image";
export async function generateStaticParams() {
  const beats = await getProducts("deadlybeatz");
  return beats?.beats.map((tattoo: any) => ({
    title: polishToEnglish(tattoo.title),
  }));
}
export default async function Page({ params }: { params: any }) {
  const tattoo = await getProducts("deadlybeatz").then((res: any) =>
    res?.beats.find((beat: any) => polishToEnglish(beat.title) === params.title)
  );

  return <div></div>;
}
