"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/ProductType";
import { getProductImage } from "@/utils/productUtils";

interface WhyDifferentSectionProps {
  products?: Product[];
}

const WhyDifferentSection = ({ products }: WhyDifferentSectionProps) => {
  const title =
    process.env.NEXT_PUBLIC_WHY_DIFFERENT_TITLE ||
    "কেন আমাদের ওয়েস্টার্ন স্যুট অন্যদের থেকে আলাদা";

  const buttonText =
    process.env.NEXT_PUBLIC_WHY_DIFFERENT_BUTTON_TEXT || "অর্ডার করুন";

  const defaultFeatures = [
    process.env.NEXT_PUBLIC_WHY_DIFFERENT_FEATURE_1 ||
      "চায়না ইম্পোর্টেড Scuda Crave ফেব্রিক (250 GSM)",
    process.env.NEXT_PUBLIC_WHY_DIFFERENT_FEATURE_2 ||
      "ম্যাচিং স্মার্ট ট্রাউজার / প্যান্ট (২-পিস সেট)",
    process.env.NEXT_PUBLIC_WHY_DIFFERENT_FEATURE_3 ||
      "স্টাইলিশ ফ্রন্ট প্রিন্ট ডিজাইন",
    process.env.NEXT_PUBLIC_WHY_DIFFERENT_FEATURE_4 ||
      "প্রিমিয়াম কোয়ালিটি ও নিখুঁত ফিনিশিং",
    process.env.NEXT_PUBLIC_WHY_DIFFERENT_FEATURE_5 ||
      "কালার ও প্রিন্ট ১০০% দীর্ঘস্থায়ী গ্যারান্টি",
    process.env.NEXT_PUBLIC_WHY_DIFFERENT_FEATURE_6 ||
      "নিখুঁত সেলাই ও আরামদায়ক বডি ফিটিংস",
    process.env.NEXT_PUBLIC_WHY_DIFFERENT_FEATURE_7 ||
      "৯৫% পলিয়েস্টার ও ৫% স্প্যানডেক্স হাই-স্ট্রেচ ফেব্রিক",
    process.env.NEXT_PUBLIC_WHY_DIFFERENT_FEATURE_8 ||
      "M, L, XL, XXL সাইজ ভ্যারিয়েশন",
  ].filter(Boolean);

  const fallbackGallery = [
    { src: "/images/t-shirt/men-tshirt.webp", alt: "Glamorous Red" },
    { src: "/images/t-shirt/ments-tshirt.webp", alt: "Elegant White" },
    { src: "/images/t-shirt/pair-dress.webp", alt: "Classic Black" },
  ];

  const galleryImages =
    products && products.length > 0
      ? products.slice(0, 3).map((p, idx) => ({
          src: getProductImage(p, idx),
          alt: p.name?.en || `Color ${idx + 1}`,
          fallbackSrc: fallbackGallery[idx]?.src || fallbackGallery[0].src,
        }))
      : fallbackGallery;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container-x">
        {/* Clean Heading - no bold font, relaxed leading */}
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-neutral-900 text-left mb-8 sm:mb-10 font-display leading-[1.38]">
          {title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Feature List with Checkmarks & Order Button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3.5">
              {defaultFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-yellow-400 text-neutral-950 flex items-center justify-center font-medium text-xs shrink-0 shadow-2xs">
                    ✓
                  </div>
                  <span className="text-neutral-700 text-base sm:text-lg font-normal font-body leading-[1.7]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Direct Order Button */}
            <div className="pt-2">
              <Link
                href="#order"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-yellow-400 hover:bg-yellow-500 text-neutral-950 font-semibold text-lg rounded-md transition-all shadow-xs hover:shadow-md active:scale-98 font-display cursor-pointer"
              >
                <svg
                  width="18"
                  height="18"
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

          {/* Right Column: Clean Gallery Images Side-by-Side */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[3/5] w-full rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const fb = (image as any).fallbackSrc;
                    if (fb) {
                      const target = e.target as HTMLImageElement;
                      target.src = fb;
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDifferentSection;
