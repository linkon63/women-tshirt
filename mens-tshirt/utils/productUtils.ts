import { Product, Variant } from "@/types/ProductType";
import { parsePrice } from "./parsePrice";

export interface ProductPricingInfo {
  sellingPrice: number;
  regularPrice: number;
}

export const getProductPrices = (
  product: Product,
  variant?: Variant
): ProductPricingInfo => {
  const targetVariant = variant || product.variants?.[0];
  const up = targetVariant?.unit_prices?.[0];
  const cp = targetVariant?.current_pricing;

  let retail = 0;
  let unit = 0;

  if (up?.retail_price?.value != null) {
    retail = parsePrice(up.retail_price.value);
  } else if (cp?.retail_price) {
    retail = parsePrice(cp.retail_price);
  } else if (product.retail_price) {
    retail = parsePrice(product.retail_price);
  }

  if (up?.unit_price?.value != null) {
    unit = parsePrice(up.unit_price.value);
  } else if (cp?.unit_price) {
    unit = parsePrice(cp.unit_price);
  }

  const sellingPrice = retail || unit || 1499;
  const regularPrice = unit > sellingPrice ? unit : 1899;

  return {
    sellingPrice,
    regularPrice,
  };
};

export const getProductColorInfo = (product: Product, index: number = 0) => {
  const name = (product.name?.en || "").toLowerCase();
  const id = product.id;
  const fallbackImages = [
    "/images/t-shirt/men-tshirt.webp",
    "/images/t-shirt/ments-tshirt.webp",
    "/images/t-shirt/pair-dress.webp",
  ];

  if (name.includes("red") || id === 10) {
    return {
      id: "red",
      name: "Glamorous Red",
      bnName: "রেড",
      fallbackImage: fallbackImages[0],
      dotClass: "bg-red-600 border-red-700",
    };
  }
  if (name.includes("white") || id === 11) {
    return {
      id: "white",
      name: "Elegant White",
      bnName: "হোয়াইট",
      fallbackImage: fallbackImages[1],
      dotClass: "bg-white border-neutral-300",
    };
  }
  if (name.includes("black") || id === 12) {
    return {
      id: "black",
      name: "Classic Black",
      bnName: "ব্ল্যাক",
      fallbackImage: fallbackImages[2],
      dotClass: "bg-neutral-900 border-neutral-700",
    };
  }

  const defaults = [
    {
      id: "red",
      name: "Red",
      bnName: "রেড",
      fallbackImage: fallbackImages[0],
      dotClass: "bg-red-600 border-red-700",
    },
    {
      id: "white",
      name: "White",
      bnName: "হোয়াইট",
      fallbackImage: fallbackImages[1],
      dotClass: "bg-white border-neutral-300",
    },
    {
      id: "black",
      name: "Black",
      bnName: "ব্ল্যাক",
      fallbackImage: fallbackImages[2],
      dotClass: "bg-neutral-900 border-neutral-700",
    },
  ];
  return defaults[index % defaults.length];
};

export const getProductImage = (
  product: Product,
  index: number = 0
): string => {
  return getProductColorInfo(product, index).fallbackImage;
};

export const formatProductTitle = (name?: string): string => {
  if (!name) return "Western Suit";
  return name
    .replace(/t-shirt,?\s*pant\s*set\s*(stylish\s*dress)?/gi, "Western Suit")
    .replace(/t-shirt/gi, "Western Suit")
    .replace(/টি-শার্ট/gi, "ওয়েস্টার্ন স্যুট");
};
