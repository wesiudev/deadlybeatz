import { getProducts } from "@/firebase";
import { NextResponse } from "next/server";

export async function GET() {
  const beats = await getProducts("deadlybeatz");
  const data = beats.products.slice(0, 5);
  return NextResponse.json(data);
}
