"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/ProductType";

interface SizeChartSectionProps {
  products?: Product[];
}

const SizeChartSection = ({ products }: SizeChartSectionProps) => {
  const title =
    process.env.NEXT_PUBLIC_SIZE_CHART_TITLE || "সাইজ চার্ট ও ফেব্রিক বিবরণ";
  const noteText =
    process.env.NEXT_PUBLIC_SIZE_CHART_NOTE ||
    "অবশ্যই ১০০% কনফার্ম হয়ে অর্ডারটি করবেন। সাইজে প্রবলেম হলে অথবা অন্য কোন সমস্যা হলে রিটার্ন বা এক্সচেঞ্জ করে নিতে পারবেন ৩ দিনের ভেতরে। প্রয়োজনে যোগাযোগ করুনঃ";
  const phone =
    process.env.NEXT_PUBLIC_HELPLINE_PHONE || "01905000043";

  const whatsappText =
    process.env.NEXT_PUBLIC_WHATSAPP_TEXT || "যেকোন প্রয়োজনে";
  const whatsappPhone =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "+8801905 000043";
  const whatsappLink =
    process.env.NEXT_PUBLIC_WHATSAPP_LINK ||
    `https://wa.me/${whatsappPhone.replace(/[^\d]/g, "")}`;
  const buttonText = "অর্ডার করুন";

  const sizeChartImg =
    process.env.NEXT_PUBLIC_SIZE_CHART_IMAGE ||
    "/images/size-guide/SizeGuide_LadiesTop.png";

  const fabricSpecs = [
    {
      label: "ফেব্রিক / উপাদান",
      value: "Scuda Crave",
      subtext: "চায়না থেকে সরাসরি ইম্পোর্টেড",
      icon: "✨",
    },
    {
      label: "ফেব্রিক থিকনেস",
      value: "250 GSM",
      subtext: "ভারী ও নন-সি-থ্রু প্রিমিয়াম কোয়ালিটি",
      icon: "⚖️",
    },
    {
      label: "কম্পোজিশন",
      value: "95% Poly + 5% Spandex",
      subtext: "পারফেক্ট ৪-ওয়ে হাই-স্ট্রেচেবল",
      icon: "🧵",
    },
    {
      label: "স্পেশাল ফিচার্স",
      value: "সফট ও রিঙ্কেল-ফ্রি",
      subtext: "১০০% আরামদায়ক ও কালার গ্যারান্টি",
      icon: "👌",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-neutral-100">
      <div className="container-x">
        {/* Clean Heading - consistent with other sections, removed badge */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-neutral-900 font-display leading-[1.38]">
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 font-normal font-body">
            সঠিক সাইজ বেছে নিতে মেজারমেন্ট চার্ট ও প্রিমিয়াম ফেব্রিক বিবরণ দেখে নিন
          </p>
        </div>

        {/* Top Grid: Measurement Table & Guide Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto mb-8 sm:mb-10">
          {/* Left Column: Responsive Size Table */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="border border-neutral-200/80 rounded-2xl overflow-hidden shadow-2xs bg-white">
              <div className="px-4 sm:px-5 py-3.5 bg-[#FAFBFD] border-b border-neutral-200/80 flex items-center justify-between">
                <span className="font-display font-semibold text-neutral-900 text-sm sm:text-base">
                  মেজারমেন্ট চার্ট (Measurement Chart)
                </span>
                <span className="text-xs text-neutral-500 font-body">
                  সকল মাপ ইঞ্চিতে
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[380px] text-center font-body">
                  <thead>
                    <tr className="bg-neutral-50/70 border-b border-neutral-200/80 font-display font-medium text-xs sm:text-sm text-neutral-800">
                      <th className="p-3 text-left border-r border-neutral-200/80">সাইজ (Size)</th>
                      <th className="p-3 border-r border-neutral-200/80 font-bold text-neutral-950">M</th>
                      <th className="p-3 border-r border-neutral-200/80 font-bold text-neutral-950">L</th>
                      <th className="p-3 border-r border-neutral-200/80 font-bold text-neutral-950">XL</th>
                      <th className="p-3 font-bold text-neutral-950">XXL</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs sm:text-sm text-neutral-700 divide-y divide-neutral-200/80 font-normal">
                    <tr className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-3 text-left font-display font-medium text-neutral-900 border-r border-neutral-200/80">
                        লম্বা (Length)
                      </td>
                      <td className="p-3 border-r border-neutral-200/80 font-semibold text-neutral-900">23&quot;</td>
                      <td className="p-3 border-r border-neutral-200/80 font-semibold text-neutral-900">24&quot;</td>
                      <td className="p-3 border-r border-neutral-200/80 font-semibold text-neutral-900">25&quot;</td>
                      <td className="p-3 font-semibold text-neutral-900">26&quot;</td>
                    </tr>
                    <tr className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-3 text-left font-display font-medium text-neutral-900 border-r border-neutral-200/80">
                        বুকের মাপ (Chest)
                      </td>
                      <td className="p-3 border-r border-neutral-200/80 font-semibold text-neutral-900">20&quot;</td>
                      <td className="p-3 border-r border-neutral-200/80 font-semibold text-neutral-900">21&quot;</td>
                      <td className="p-3 border-r border-neutral-200/80 font-semibold text-neutral-900">22&quot;</td>
                      <td className="p-3 font-semibold text-neutral-900">23&quot;</td>
                    </tr>
                    <tr className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-3 text-left font-display font-medium text-neutral-900 border-r border-neutral-200/80">
                        হাতা লম্বা (Sleeve Length)
                      </td>
                      <td className="p-3 border-r border-neutral-200/80 font-semibold text-neutral-900">13&quot;</td>
                      <td className="p-3 border-r border-neutral-200/80 font-semibold text-neutral-900">14&quot;</td>
                      <td className="p-3 border-r border-neutral-200/80 font-semibold text-neutral-900">15&quot;</td>
                      <td className="p-3 font-semibold text-neutral-900">16&quot;</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-xs text-neutral-500 font-body mt-2.5 text-right font-normal">
              * বুকের মাপ ফ্ল্যাট মেজারমেন্টে নেওয়া হয়েছে (বডি ফিটিংস কমফোর্টেবল)
            </p>
          </div>

          {/* Right Column: Size Guide Illustration */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full h-full min-h-[220px] rounded-2xl bg-[#FAFBFD] border border-neutral-200/80 p-3 sm:p-4 flex flex-col items-center justify-center shadow-2xs">
              <div className="relative w-full aspect-[4/3] max-w-[280px]">
                <Image
                  src={sizeChartImg}
                  alt="Size Guide Measurement"
                  fill
                  unoptimized
                  className="object-contain"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/size-guide/SizeGuide_LadiesTop.jpg";
                  }}
                />
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-xs text-neutral-600 font-body">
                <span className="bg-white px-2.5 py-1 rounded-md border border-neutral-200/80">
                  Chest (বুকের মাপ)
                </span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-neutral-200/80">
                  Length (লম্বা)
                </span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-neutral-200/80">
                  Sleeve (হাতা)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean & Consistent Fabric Specifications Block */}
        <div className="max-w-5xl mx-auto mb-8 sm:mb-10 bg-[#FAFBFD] rounded-2xl p-5 sm:p-7 border border-neutral-200/80 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 pb-4 border-b border-neutral-200/80">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-yellow-400 text-neutral-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                ✓
              </div>
              <div>
                <h3 className="font-display font-semibold text-neutral-900 text-base sm:text-lg">
                  ফেব্রিক ও ম্যাটেরিয়াল বিবরণ
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 font-body">
                  চায়না ইম্পোর্টেড প্রিমিয়াম কোয়ালিটি ফেব্রিক
                </p>
              </div>
            </div>
            <span className="self-start sm:self-auto inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-900 border border-yellow-200/80">
              ১০০% কোয়ালিটি গ্যারান্টি
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {fabricSpecs.map((spec, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-neutral-200/80 shadow-2xs flex flex-col justify-between hover:border-neutral-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neutral-500 text-xs font-body">{spec.label}</span>
                  <span className="text-base">{spec.icon}</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-neutral-900 text-sm sm:text-base leading-snug">
                    {spec.value}
                  </p>
                  <p className="text-xs text-neutral-600 font-body mt-1 leading-relaxed">
                    {spec.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clean Exchange Policy Box */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs max-w-5xl mx-auto mb-8 sm:mb-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#E0EFEA] text-emerald-800 flex items-center justify-center text-sm shrink-0">
              ✓
            </div>
            <p className="font-body text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
              {noteText}{" "}
              <strong className="text-neutral-900 font-semibold">{phone}</strong>
            </p>
          </div>
        </div>

        {/* Consistent Action Banner (WhatsApp + Order Button) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          {/* WhatsApp Pill */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-12 px-6 sm:px-8 bg-[#E0EFEA] hover:bg-[#d5e9e2] rounded-md transition-colors flex items-center justify-center gap-3 cursor-pointer"
          >
            <span className="text-neutral-700 text-sm sm:text-base font-normal font-body">
              {whatsappText}
            </span>
            <div className="flex items-center gap-2 text-neutral-800">
              <span className="text-xl">💬</span>
              <span className="font-semibold text-base sm:text-lg tracking-normal">
                {whatsappPhone}
              </span>
            </div>
          </a>

          {/* Order Button */}
          <Link
            href="#order"
            className="w-full sm:w-auto h-12 px-8 sm:px-10 bg-yellow-400 hover:bg-yellow-500 rounded-md transition-colors flex items-center justify-center gap-2.5 text-neutral-950 font-semibold text-base sm:text-lg font-display shadow-xs active:scale-98 cursor-pointer"
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
    </section>
  );
};

export default SizeChartSection;