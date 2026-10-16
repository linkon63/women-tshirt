"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/types/ProductType";
import { getProductPrices } from "@/utils/productUtils";

interface StickyMobileBarProps {
  products?: Product[];
}

export default function StickyMobileBar({ products }: StickyMobileBarProps) {
  const [visible, setVisible] = useState(false);

  const whatsappPhone =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "+8801342 117722";
  const whatsappLink =
    process.env.NEXT_PUBLIC_WHATSAPP_LINK ||
    `https://wa.me/${whatsappPhone.replace(/[^\d]/g, "")}`;

  const pricing =
    products && products.length > 0
      ? getProductPrices(products[0])
      : { sellingPrice: 1499, regularPrice: 1899 };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200 py-2.5 px-4 shadow-md pb-safe">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-baseline gap-2">
          <span className="font-display font-semibold text-xl text-neutral-900 leading-none">
            ৳{pricing.sellingPrice}
          </span>
          <span className="font-body text-xs text-neutral-400 line-through font-normal">
            ৳{pricing.regularPrice}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Helpline"
            className="w-10 h-10 rounded-md bg-[#E0EFEA] text-neutral-800 flex items-center justify-center text-lg shrink-0 active:scale-95"
          >
            💬
          </a>

          <Link
            href="#order"
            className="h-10 px-5 bg-yellow-400 hover:bg-yellow-500 rounded-md font-display font-semibold text-sm sm:text-base text-neutral-950 flex items-center gap-2 shadow-xs active:scale-98"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 18 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M6 5H12C12 3.34315 10.6569 2 9 2C7.3431 2 6 3.34315 6 5ZM4 5C4 2.23858 6.23858 0 9 0C11.7614 0 14 2.23858 14 5H17C17.5523 5 18 5.44772 18 6V20C18 20.5523 17.5523 21 17 21H1C0.44772 21 0 20.5523 0 20V6C0 5.44772 0.44772 5 1 5H4ZM2 7V19H16V7H2ZM6 9C6 10.6569 7.3431 12 9 12C10.6569 12 12 10.6569 12 9H14C14 11.7614 11.7614 14 9 14C6.23858 14 4 11.7614 4 9H6Z"
                fill="#161616"
              />
            </svg>
            <span>অর্ডার করুন</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
