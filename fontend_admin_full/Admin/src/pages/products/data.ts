import { APICore } from "../../helpers/api/apiCore";
const api = new APICore();

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  image: string;
  supplier?: number | null;
  promotion?: number | null;
  equipment?: number | null;
  supplement?: number | null;
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await api.get("/api/product");
  console.log("Fetched products:", res.data.data);
  return res.data.data;
}