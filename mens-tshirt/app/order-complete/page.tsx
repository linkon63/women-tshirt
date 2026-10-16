"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FiCheck, FiHome, FiPhone } from "react-icons/fi";

function OrderCompleteContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const message = searchParams.get("message");
  const phone = process.env.NEXT_PUBLIC_HELPLINE_PHONE || "01342117722";

  return (
    <div className="min-h-screen bg-neutral-50/70 flex flex-col justify-center items-center px-4 py-12">
      <div className="bg-white p-6 sm:p-8 lg:p-12 rounded-3xl shadow-xs max-w-2xl w-full text-center border border-neutral-200/80">
        <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm ring-8 ring-emerald-50">
          <FiCheck className="text-white text-3xl sm:text-4xl" />
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-neutral-900 mb-3 leading-[1.38]">
          অর্ডার সফল হয়েছে! 🎉
        </h1>

        <p className="font-body text-base sm:text-lg text-neutral-600 mb-6 leading-[1.75] font-normal">
          আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের প্রতিনিধি খুব শীঘ্রই আপনার নাম্বারে কল করে অর্ডারটি কনফার্ম করবেন।
        </p>

        {orderNumber && (
          <div className="bg-yellow-50/60 p-4 sm:p-5 rounded-2xl mb-6 border border-yellow-200">
            <p className="text-xs sm:text-sm font-body text-neutral-600 mb-1 font-normal">
              অর্ডার ট্র্যাকিং নাম্বার
            </p>
            <p className="text-2xl sm:text-3xl font-display font-semibold text-neutral-900 tracking-wider">
              #{orderNumber}
            </p>
          </div>
        )}

        {message && (
          <div className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-200">
            <p className="text-blue-900 font-body text-sm font-normal">{message}</p>
          </div>
        )}

        <div className="bg-neutral-50 p-5 sm:p-6 rounded-2xl mb-6 text-left border border-neutral-200/80">
          <h3 className="font-display font-semibold text-base sm:text-lg text-neutral-900 mb-3.5">
            পরবর্তী ধাপসমূহ:
          </h3>
          <ul className="space-y-3 font-body text-sm sm:text-base text-neutral-600 font-normal">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-neutral-950 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                ✓
              </span>
              <span>আমাদের প্রতিনিধি দ্রুত কল করে সাইজ ও ডেলিভারি ঠিকানা কনফার্ম করবেন</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-neutral-950 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                ✓
              </span>
              <span>কনফার্ম করার পর ২-৩ কার্যদিবসের মধ্যে ডেলিভারি পেয়ে যাবেন</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-yellow-400 text-neutral-950 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                ✓
              </span>
              <span>সম্পূর্ণ ক্যাশ অন ডেলিভারি — পণ্যটি হাতে পেয়ে চেক করে মূল্য পরিশোধ করুন</span>
            </li>
          </ul>
        </div>

        <div className="bg-neutral-50 p-4 rounded-xl mb-6 border border-neutral-200 flex items-center justify-center gap-2.5 font-body">
          <FiPhone className="text-neutral-700 text-lg shrink-0" />
          <p className="text-sm sm:text-base text-neutral-700 font-normal">
            যেকোনো সহায়তায় কল করুন:{" "}
            <a href={`tel:${phone}`} className="font-semibold text-neutral-900 hover:underline">
              {phone}
            </a>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="w-full py-3.5 px-6 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-neutral-950 font-display font-semibold text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <FiHome className="text-lg" />
            <span>হোমে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-body text-neutral-500">
          লোড হচ্ছে...
        </div>
      }
    >
      <OrderCompleteContent />
    </Suspense>
  );
}
