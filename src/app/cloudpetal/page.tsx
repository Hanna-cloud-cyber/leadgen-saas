import { getCloudpetalCatalog } from "./data";
import CloudpetalClient from "./CloudpetalClient";

export default async function CloudpetalPage() {
  const { products, shopifyEnabled } = await getCloudpetalCatalog();
  return <CloudpetalClient products={products} shopifyEnabled={shopifyEnabled} />;
}
