import { getSculptiaProduct } from "./data";
import SculptiaClient from "./SculptiaClient";

export default async function SculptiaPage() {
  const product = await getSculptiaProduct();
  return <SculptiaClient product={product} />;
}
