import { getProducts } from "@/firebase";
import { NextResponse } from "next/server";

export async function GET() {
  const beats = await getProducts("deadlybeatz");
  return NextResponse.json(beats);
}
