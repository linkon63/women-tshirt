"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/ProductType";
import { useStore } from "@/context/StoreContent";
import { parsePrice } from "@/utils/parsePrice";
import { getProductColorInfo, getProductImage, getProductPrices } from "@/utils/productUtils";

export default function CartItemProduct({
  product,
  productIndex,
  selectTheProductForOrder,
}: {
  product: Product;
  productIndex: number;
  selectTheProductForOrder: (product: Product, productIndex: number) => void;
}) {
  const { cartItems, setCartItems } = useStore();
  const colorInfo = getProductColorInfo(product, productIndex);
  const pricing = getProductPrices(product);

  const [selectedSize, setSelectedSize] = useState<string>(
    product.selectedSize || "M"
  );
  const [imgSrc, setImgSrc] = useState(getProductImage(product, productIndex));

  const sizes = ["M", "L", "XL", "XXL"];

  const handleSelectSize = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    setSelectedSize(size);
    const updated = cartItems.map((item, idx) => {
      if (idx === productIndex) {
        return {
          ...item,
          selectedSize: size,
        };
      }
      return item;
    });
    setCartItems(updated);
  };

  const decreaseProductQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentQuantity = product.quantity || 1;
    if (currentQuantity > 1) {
      const updated = cartItems.map((item, idx) => {
        if (idx === productIndex) {
          return { ...item, quantity: currentQuantity - 1 };
        }
        return item;
      });
      setCartItems(updated);
    }
  };

  const increaseProductQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentQuantity = product.quantity || 1;
    if (currentQuantity < 50) {
      const updated = cartItems.map((item, idx) => {
        if (idx === productIndex) {
          return { ...item, quantity: currentQuantity + 1 };
        }
        return item;
      });
      setCartItems(updated);
    }
  };

  const sendAddToCartEvent = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "BDT",
          value: pricing.sellingPrice,
          items: [
            {
              item_id: product.id,
              item_name: product?.name?.en || colorInfo.name,
              price: pricing.sellingPrice,
              quantity: product.quantity || 1,
              item_variant: selectedSize,
            },
          ],
        },
      });
    }
  };

  const isSelected = !product.selectForOrder;
  const quantity = product.quantity || 1;
  const subtotal = pricing.sellingPrice * quantity;

  return (
    <div
      className={`card transition-all cursor-pointer overflow-hidden mb-3.5 ${
        isSelected
          ? "border-yellow-500 shadow-xs ring-2 ring-yellow-400/50 bg-yellow-50/20"
          : "border-neutral-200 hover:border-neutral-300 bg-white opacity-85 hover:opacity-100"
      }`}
      onClick={() => {
        sendAddToCartEvent();
        selectTheProductForOrder(product, productIndex);
      }}
    >
      <div className="p-3.5 sm:p-5 flex items-start gap-3 sm:gap-4">
        {/* Selection Checkbox Pill */}
        <div className="pt-2 shrink-0">
          <div
            className={`w-5 h-5 rounded-full ring-2 flex items-center justify-center transition-colors ${
              isSelected
                ? "ring-yellow-400 bg-yellow-400"
                : "ring-neutral-300 bg-white"
            }`}
          >
            {isSelected && <div className="w-2 h-2 bg-neutral-950 rounded-full" />}
          </div>
        </div>

        {/* Thumbnail Image */}
        <div className="shrink-0 relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
          <Image
            src={imgSrc}
            alt={product.name?.en || colorInfo.name}
            fill
            className="object-cover"
            onError={() => {
              if (colorInfo.fallbackImage) {
                setImgSrc(colorInfo.fallbackImage);
              }
            }}
          />
        </div>

        {/* Details & options */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
            <h4 className="text-neutral-900 text-sm sm:text-base font-display font-semibold leading-snug">
              {product.name?.en || colorInfo.name}
            </h4>

            {/* Price from API */}
            <div className="flex items-baseline gap-2">
              <span className="text-neutral-400 text-xs sm:text-sm line-through font-body font-normal">
                ৳{pricing.regularPrice}
              </span>
              <span className="text-neutral-900 text-base sm:text-lg font-display font-semibold">
                ৳{pricing.sellingPrice}
              </span>
            </div>
          </div>

          {/* Color & Size Selectors */}
          <div className="flex flex-col gap-2 mt-2">
            {/* Color indicator */}
            <div className="flex items-center gap-2">
              <span className="font-display font-medium text-xs sm:text-sm text-neutral-600">
                কালার:
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs sm:text-sm text-neutral-800 font-medium">
                <span
                  className={`w-2.5 h-2.5 rounded-full border ${colorInfo.dotClass}`}
                />
                <span>{colorInfo.bnName}</span>
              </span>
            </div>

            {/* Size choices */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-medium text-xs sm:text-sm text-neutral-600">
                সাইজ:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {sizes.map((sz) => {
                  const isCurrent = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={(e) => handleSelectSize(e, sz)}
                      className={`rounded-md border px-2.5 py-0.5 text-xs sm:text-sm font-display font-medium transition-all cursor-pointer min-w-[34px] text-center ${
                        isCurrent
                          ? "border-yellow-500 text-neutral-950 bg-yellow-100 ring-1 ring-yellow-400 font-semibold"
                          : "border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quantity Controls & Subtotal */}
          <div className="flex items-center justify-between gap-3 flex-wrap mt-3 pt-2.5 border-t border-neutral-100">
            <div
              className="inline-flex border border-neutral-300 rounded-lg overflow-hidden bg-white shadow-2xs"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={decreaseProductQuantity}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-neutral-100 text-neutral-800 text-sm font-medium border-r border-neutral-300 transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <div className="w-8 h-7 sm:w-10 sm:h-8 flex items-center justify-center text-neutral-900 font-display font-medium text-sm">
                {quantity}
              </div>
              <button
                type="button"
                onClick={increaseProductQuantity}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-neutral-100 text-neutral-800 text-sm font-medium border-l border-neutral-300 transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div className="text-xs sm:text-sm font-body text-neutral-600 font-normal">
              সাবটোটাল:{" "}
              <span className="font-display font-semibold text-base sm:text-lg text-neutral-900">
                ৳{subtotal}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
