import { getLucentDermProduct } from "./data";
import LucentDermClient from "./LucentDermClient";

export default async function LucentDermPage() {
  const product = await getLucentDermProduct();
  return <LucentDermClient product={product} />;
}
