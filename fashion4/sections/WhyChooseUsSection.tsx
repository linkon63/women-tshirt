"use client";

import Link from "next/link";

const WhyChooseUsSection = () => {
  const title =
    process.env.NEXT_PUBLIC_WHY_CHOOSE_TITLE ||
    "কেন আমাদের প্রোডাক্ট বেছে নিবেন?";
  const buttonText =
    process.env.NEXT_PUBLIC_WHY_CHOOSE_BUTTON_TEXT || "অর্ডার করুন";
  const whatsappText =
    process.env.NEXT_PUBLIC_WHATSAPP_TEXT || "যেকোন প্রয়োজনে";
  const whatsappPhone =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "+8801905 000043";
  const whatsappLink =
    process.env.NEXT_PUBLIC_WHATSAPP_LINK ||
    `https://wa.me/${whatsappPhone.replace(/[^\d]/g, "")}`;

  const reasons = [
    process.env.NEXT_PUBLIC_WHY_CHOOSE_1 ||
      "আমাদের পণ্যগুলো ১০০% কোয়ালিটিফুল ও কালার গ্যারান্টি।",
    process.env.NEXT_PUBLIC_WHY_CHOOSE_2 ||
      "আমরা নিজস্ব তত্ত্বাবধানে অভিজ্ঞ কারিগর দিয়ে নিখুঁত সেলাই ও আধুনিক ফিনিশিং নিশ্চিত করে থাকি।",
    process.env.NEXT_PUBLIC_WHY_CHOOSE_3 ||
      "কারণ সরাসরি নিজস্ব ফ্যাক্টরি প্রোডাকশন হওয়ায় অত্যন্ত বাজেট-বান্ধব দামে সেরা প্রোডাক্ট পাচ্ছেন।",
    process.env.NEXT_PUBLIC_WHY_CHOOSE_4 ||
      "সারাদেশে দ্রুততম হোম ডেলিভারি এবং পণ্য হাতে পেয়ে চেক করে ক্যাশ অন ডেলিভারিতে মূল্য পরিশোধের সুবিধা।",
    process.env.NEXT_PUBLIC_WHY_CHOOSE_5 ||
      "প্রোডাক্টের সাইজ বা ফিটিংসে কোনো সমস্যা হলে ৩ দিনের ভেতরে সম্পূর্ণ ফ্রি এক্সচেঞ্জ সুবিধা পাবেন।",
  ].filter(Boolean);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-neutral-100">
      <div className="container-x max-w-4xl">
        {/* Clean Heading - no bold font, relaxed leading */}
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-neutral-900 text-center mb-8 sm:mb-10 font-display leading-[1.38]">
          {title}
        </h2>

        {/* Clean Benefits Card */}
        <div className="bg-[#FAFBFD] rounded-2xl p-6 sm:p-9 mb-10 border border-neutral-200/80 shadow-2xs">
          <div className="space-y-4 sm:space-y-5">
            {reasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-3.5">
                <div className="shrink-0 mt-1">
                  <div className="w-5 h-5 rounded-full bg-yellow-400 text-neutral-950 flex items-center justify-center font-medium text-xs">
                    ✓
                  </div>
                </div>
                <p className="text-neutral-700 text-base sm:text-lg font-normal font-body leading-[1.75]">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Clean Action Banner */}
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

export default WhyChooseUsSection;
