import { Product, ProductDetailsResponse } from "@/types/ProductType";
import { API_BASE_URL } from "@/config/general.config";
import sampleProduct, { sampleProducts } from "@/data/sampleProduct";
import { formatProductTitle } from "@/utils/productUtils";

export async function fetchProductById(
  id?: string | number
): Promise<Product> {
  const targetId = id || process.env.NEXT_PUBLIC_PRODUCT_ID || "10";
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || API_BASE_URL;

  try {
    const res = await fetch(`${baseUrl}/products/${targetId}/`, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const json = await res.json();
      const product = json.data || json;

      if (product?.id) {
        if (product.name?.en) {
          product.name.en = formatProductTitle(product.name.en);
        }
        return product as Product;
      }
    }

    const fallback =
      sampleProducts.find((p) => p.id === Number(targetId)) || sampleProduct;
    return fallback;
  } catch (error) {
    console.error(`Failed to fetch product ${targetId}:`, error);
    const fallback =
      sampleProducts.find((p) => p.id === Number(targetId)) || sampleProduct;
    return fallback;
  }
}

export async function fetchLandingProducts(): Promise<Product[]> {
  const envIds = process.env.NEXT_PUBLIC_PRODUCT_IDS;
  let ids: (string | number)[] = [];

  if (envIds) {
    ids = envIds.split(",").map((s) => s.trim()).filter(Boolean);
  } else if (
    process.env.NEXT_PUBLIC_PRODUCT_ID_1 ||
    process.env.NEXT_PUBLIC_PRODUCT_ID_2 ||
    process.env.NEXT_PUBLIC_PRODUCT_ID_3
  ) {
    if (process.env.NEXT_PUBLIC_PRODUCT_ID_1) ids.push(process.env.NEXT_PUBLIC_PRODUCT_ID_1);
    if (process.env.NEXT_PUBLIC_PRODUCT_ID_2) ids.push(process.env.NEXT_PUBLIC_PRODUCT_ID_2);
    if (process.env.NEXT_PUBLIC_PRODUCT_ID_3) ids.push(process.env.NEXT_PUBLIC_PRODUCT_ID_3);
  } else {
    ids = [10, 11, 12];
  }

  try {
    const results = await Promise.all(
      ids.map(async (id, idx) => {
        try {
          return await fetchProductById(id);
        } catch {
          return sampleProducts[idx] || sampleProduct;
        }
      })
    );

    return results.length > 0 ? results : sampleProducts;
  } catch (error) {
    console.error("Failed to fetch landing products:", error);
    return sampleProducts;
  }
}

export async function fetchProducts(): Promise<ProductDetailsResponse[]> {
  const products = await fetchLandingProducts();
  return products.map((p) => ({
    status: "success",
    message: "Product fetched successfully",
    data: p,
  }));
}
