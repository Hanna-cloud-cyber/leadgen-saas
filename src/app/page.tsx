import type { Metadata } from "next";
import { getSculptiaProduct } from "./data";
import SculptiaClient from "./SculptiaClient";

export const metadata: Metadata = {
  title: "Sculptia — 3D Anti-Cellulite Leggings",
  description:
    "Smoothing, slimming 3D-textured leggings designed to target cellulite-prone areas. Buy 2 Get 1 Free.",
};

export default async function SculptiaPage() {
  const product = await getSculptiaProduct();
  return <SculptiaClient product={product} />;
}
