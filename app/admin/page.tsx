import { getProducts } from "@/firebase";
import { Metadata } from "next";
import Link from "next/link";
import Beats from "./Beats";
export const metadata: Metadata = {
  title: "Panel administracyjny",
};
export default async function Admin() {
  const req = await getProducts("deadlybeatz");
  return <Beats beats={req.products} />;
}
