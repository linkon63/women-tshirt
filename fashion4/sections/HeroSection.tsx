"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/ProductType";
import { getProductColorInfo, getProductImage, getProductPrices, formatProductTitle } from "@/utils/productUtils";

interface HeroSectionProps {
  products?: Product[];
}

const defaultVariants = [
  {
    id: "10",
    name: "Ladies Red Western Suit",
    bnName: "রেড",
    src: "https://hishabi-dev.s3.ap-south-1.amazonaws.com/tenant/pjfashion/product/31/Cv2VdsgSvf2s2LKDWK9QUXN6sOw2x8c9nE33dgmx.webp",
    fallbackSrc: "/images/t-shirt/red-tshirt.webp",
  },
  {
    id: "11",
    name: "Ladies White Western Suit",
    bnName: "হোয়াইট",
    src: "https://hishabi-dev.s3.ap-south-1.amazonaws.com/tenant/pjfashion/product/33/qz2IEDklPRzMOk3TCx3geFQcgqrbihnQVBFlvF8S.webp",
    fallbackSrc: "/images/t-shirt/white-tshirt.webp",
  },
  {
    id: "12",
    name: "Ladies Black Western Suit",
    bnName: "ব্ল্যাক",
    src: "https://hishabi-dev.s3.ap-south-1.amazonaws.com/tenant/pjfashion/product/35/XqQvqcHgVBMF8zK8ZImHt0mfjN6HJJb7WJvOKHz3.webp",
    fallbackSrc: "/images/t-shirt/black-tshirt.webp",
  },
];

const HeroSection = ({ products }: HeroSectionProps) => {
  const titlePart1 =
    process.env.NEXT_PUBLIC_HERO_TITLE_PART1 || "এই সিজনের স্টাইলে";
  const titlePart2 =
    process.env.NEXT_PUBLIC_HERO_TITLE_PART2 || "আনুন নতুনত্ব";
  const description =
    process.env.NEXT_PUBLIC_HERO_DESCRIPTION ||
    "প্রিমিয়াম আরাম ও আধুনিক ফ্যাশনের পারফেক্ট কম্বিনেশন - নিখুঁত ফিনিশিং এবং আকর্ষণীয় ডিজাইন।";
  const buttonText =
    process.env.NEXT_PUBLIC_HERO_BUTTON_TEXT || "অর্ডার করুন";
  const watermarkText =
    process.env.NEXT_PUBLIC_HERO_WATERMARK || "WESTERN SUIT";

  // Build variants from API products if available
  const variants =
    products && products.length > 0
      ? products.map((prod, idx) => {
          const colorInfo = getProductColorInfo(prod, idx);
          const imgSrc = getProductImage(prod, idx);
          return {
            id: prod.id.toString(),
            name: formatProductTitle(prod.name?.en) || colorInfo.name,
            bnName: colorInfo.bnName,
            src: imgSrc,
            fallbackSrc: colorInfo.fallbackImage,
          };
        })
      : defaultVariants;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imgSrc, setImgSrc] = useState(variants[0]?.src);
  const touchStartXRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % variants.length);
  }, [variants.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + variants.length) % variants.length);
  }, [variants.length]);

  // Autoplay interval (every 3.5s)
  useEffect(() => {
    if (isPaused || variants.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, variants.length, nextSlide]);

  const selectedVariant = variants[currentIndex] || variants[0];

  useEffect(() => {
    if (selectedVariant?.src) {
      setImgSrc(selectedVariant.src);
    }
  }, [selectedVariant]);

  const activeProduct = products?.find(
    (p) => p.id.toString() === selectedVariant?.id
  ) || products?.[currentIndex] || products?.[0];

  const pricing = activeProduct
    ? getProductPrices(activeProduct)
    : { sellingPrice: 1499, regularPrice: 1899 };

  const handleSelectVariant = (index: number) => {
    setCurrentIndex(index);
    setImgSrc(variants[index].src);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Clean Centered Brand Header */}
      <header className="py-5 sm:py-7 flex items-center justify-center border-b border-neutral-100 bg-white">
        <div className="relative w-44 h-11 sm:w-52 sm:h-12">
          <Image
            src={process.env.NEXT_PUBLIC_SITE_ICON || "/images/pjfashion.webp"}
            alt="PJ Fashion"
            fill
            className="object-contain"
            priority
          />
        </div>
      </header>

      {/* Hero Body */}
      <section className="relative w-full py-8 sm:py-14 lg:py-18">
        {/* Subtle Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03] -z-10">
          <span className="text-[120px] sm:text-[180px] lg:text-[240px] font-semibold text-neutral-900 tracking-wider uppercase whitespace-nowrap">
            {watermarkText}
          </span>
        </div>

        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Product Showcase */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div
                className="w-full max-w-md sm:max-w-lg group select-none"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Main Product Image Container */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs">
                  <Image
                    key={selectedVariant?.id}
                    src={imgSrc || selectedVariant?.src}
                    alt={selectedVariant?.name || "Women Western Suit"}
                    fill
                    className="object-cover transition-opacity duration-500"
                    priority
                    onError={() => {
                      if (selectedVariant?.fallbackSrc) {
                        setImgSrc(selectedVariant.fallbackSrc);
                      }
                    }}
                  />

                  {/* Left / Right Arrow Navigation */}
                  {variants.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          prevSlide();
                        }}
                        aria-label="Previous slide"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-neutral-900 flex items-center justify-center shadow-md backdrop-blur-xs transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer z-10"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextSlide();
                        }}
                        aria-label="Next slide"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/85 hover:bg-white text-neutral-900 flex items-center justify-center shadow-md backdrop-blur-xs transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer z-10"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Slide Indicators / Dots on bottom of image */}
                  {variants.length > 1 && (
                    <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10">
                      {variants.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectVariant(dotIdx);
                          }}
                          aria-label={`Go to slide ${dotIdx + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            currentIndex === dotIdx
                              ? "w-6 bg-yellow-400"
                              : "w-2 bg-white/70 hover:bg-white"
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Subtle Price Tag from API */}
                  <div className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-neutral-200 shadow-xs flex items-center gap-2 z-10">
                    <span className="text-xs text-neutral-400 line-through font-body">
                      ৳{pricing.regularPrice}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-neutral-900 font-display">
                      ৳{pricing.sellingPrice}
                    </span>
                  </div>
                </div>

                {/* Clean Color Selectors */}
                <div className="mt-4 flex items-center justify-center gap-3">
                  {variants.map((variant, vIdx) => {
                    const isSelected = currentIndex === vIdx;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => handleSelectVariant(vIdx)}
                        className={`flex flex-col items-center p-1.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "border-yellow-500 bg-yellow-50/60 shadow-xs scale-105"
                            : "border-neutral-200 hover:border-neutral-300 bg-white"
                        }`}
                      >
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-neutral-100">
                          <Image
                            src={variant.src}
                            alt={variant.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = variant.fallbackSrc;
                            }}
                          />
                        </div>
                        <span
                          className={`text-xs font-display mt-1 ${
                            isSelected
                              ? "text-neutral-900 font-semibold"
                              : "text-neutral-600 font-normal"
                          }`}
                        >
                          {variant.bnName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Clean Headline & Direct CTA */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <div className="max-w-xl mx-auto lg:mx-0">
                {/* Clean Headline - avoid heavy bold, spacious line-height */}
                <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-semibold text-neutral-900 leading-[1.38] mb-4 font-display">
                  <span className="text-yellow-600 block">{titlePart1}</span>
                  <span className="block mt-1 text-neutral-900">{titlePart2}</span>
                </h1>

                {/* Refined Description */}
                <p className="text-base sm:text-lg text-neutral-600 font-normal font-body leading-[1.75] mb-8">
                  {description}
                </p>

                {/* Direct Golden Order CTA Button */}
                <div>
                  <Link
                    href="#order"
                    className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-12 py-3.5 sm:py-4 bg-yellow-400 hover:bg-yellow-500 text-neutral-950 font-semibold text-lg sm:text-xl rounded-md transition-all shadow-xs hover:shadow-md active:scale-98 font-display cursor-pointer"
                  >
                    <svg
                      width="20"
                      height="20"
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
                    <span>{buttonText}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
