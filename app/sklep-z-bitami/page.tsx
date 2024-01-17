import { getProducts } from "@/firebase";
import BeatList from "./BeatList";
// async function getBeats() {
//   const req = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/getBeats`);

//   const beats = req.json();
//   return beats;
// }
export default async function Page() {
  const req = await getProducts("deadlybeatz");
  return <BeatList beats={req.products} />;
}
