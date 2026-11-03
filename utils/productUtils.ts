import { Product, Variant } from "@/types/ProductType";
import { parsePrice } from "./parsePrice";

export interface ProductPricingInfo {
  sellingPrice: number;
  regularPrice: number;
  hasDiscount: boolean;
  discountPercentage: number;
}

export const getProductPrices = (
  product: Product,
  variant?: Variant
): ProductPricingInfo => {
  const targetVariant = (variant || product.selectedVariant ||
    product.variants?.[0]) as Variant | undefined;
  const up = targetVariant?.unit_prices?.[0];
  const cp = targetVariant?.current_pricing;

  const toPrice = (value: unknown): number | undefined => {
    if (value == null) return undefined;
    const rawValue =
      typeof value === "object" && "value" in value
        ? (value as { value?: string | number }).value
        : (value as string | number);
    if (rawValue == null) return undefined;
    const price = parsePrice(rawValue);
    return Number.isFinite(price) && price > 0 ? price : undefined;
  };

  const discount =
    toPrice(up?.discount_price) ??
    toPrice(targetVariant?.discount_price) ??
    toPrice(cp?.discount_price) ??
    toPrice(product.discount_price);
  const retail =
    toPrice(up?.retail_price) ??
    toPrice(cp?.retail_price) ??
    toPrice(targetVariant?.retail_price) ??
    toPrice(product.retail_price);
  const unit =
    toPrice(up?.unit_price) ??
    toPrice(cp?.unit_price) ??
    toPrice(targetVariant?.unit_price);

  const sellingPrice = discount ?? retail ?? unit ?? 1499;
  const regularPrice = discount != null ? retail ?? unit ?? discount : sellingPrice;
  const hasDiscount = regularPrice > sellingPrice;
  const discountPercentage = hasDiscount
    ? Math.round(((regularPrice - sellingPrice) / regularPrice) * 100)
    : 0;

  return {
    sellingPrice,
    regularPrice,
    hasDiscount,
    discountPercentage,
  };
};

export const getProductColorInfo = (product: Product, index: number = 0) => {
  const name = (product.name?.en || "").toLowerCase();
  const id = product.id;

  if (name.includes("red") || id === 10) {
    return {
      id: "red",
      name: "Glamorous Red",
      bnName: "রেড",
      fallbackImage: "/images/t-shirt/red-tshirt.webp",
      dotClass: "bg-red-600 border-red-700",
    };
  }
  if (name.includes("white") || id === 11) {
    return {
      id: "white",
      name: "Elegant White",
      bnName: "হোয়াইট",
      fallbackImage: "/images/t-shirt/white-tshirt.webp",
      dotClass: "bg-white border-neutral-300",
    };
  }
  if (name.includes("black") || id === 12) {
    return {
      id: "black",
      name: "Classic Black",
      bnName: "ব্ল্যাক",
      fallbackImage: "/images/t-shirt/black-tshirt.webp",
      dotClass: "bg-neutral-900 border-neutral-700",
    };
  }

  const defaults = [
    {
      id: "red",
      name: "Red",
      bnName: "রেড",
      fallbackImage: "/images/t-shirt/red-tshirt.webp",
      dotClass: "bg-red-600 border-red-700",
    },
    {
      id: "white",
      name: "White",
      bnName: "হোয়াইট",
      fallbackImage: "/images/t-shirt/white-tshirt.webp",
      dotClass: "bg-white border-neutral-300",
    },
    {
      id: "black",
      name: "Black",
      bnName: "ব্ল্যাক",
      fallbackImage: "/images/t-shirt/black-tshirt.webp",
      dotClass: "bg-neutral-900 border-neutral-700",
    },
  ];
  return defaults[index % defaults.length];
};

export const getProductImage = (
  product: Product,
  index: number = 0
): string => {
  if (product.thumbnail) return product.thumbnail;
  if (product.media && product.media.length > 0) {
    const img =
      product.media.find((m) => m.collection_name === "images") ||
      product.media[0];
    if (img?.original_url) return img.original_url;
  }
  return getProductColorInfo(product, index).fallbackImage;
};

export const formatProductTitle = (name?: string): string => {
  if (!name) return "Western Suit";
  return name
    .replace(/t-shirt,?\s*pant\s*set\s*(stylish\s*dress)?/gi, "Western Suit")
    .replace(/t-shirt/gi, "Western Suit")
    .replace(/টি-শার্ট/gi, "ওয়েস্টার্ন স্যুট");
};
