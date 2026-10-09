"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

interface TestimonialItem {
  src: string;
  alt: string;
  caption?: string;
}

const CustomerReviewsSection = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [selectedImage, setSelectedImage] = useState<TestimonialItem | null>(null);

  const title =
    process.env.NEXT_PUBLIC_TESTIMONIALS_TITLE || "আমাদের কাস্টমার রিভিউ";
  const whatsappText =
    process.env.NEXT_PUBLIC_WHATSAPP_TEXT || "যেকোন প্রয়োজনে";
  const whatsappPhone =
    process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "+8801905 000043";
  const whatsappLink =
    process.env.NEXT_PUBLIC_WHATSAPP_LINK ||
    `https://wa.me/${whatsappPhone.replace(/[^\d]/g, "")}`;
  const buttonText =
    process.env.NEXT_PUBLIC_REVIEWS_BUTTON_TEXT || "অর্ডার করুন";

  const rawTestimonials: TestimonialItem[] = [
    {
      src: "/images/testimonial/testimonial.webp",
      alt: "কাস্টমার রিভিউ ১ - হোয়াইট ২-পিস সেট",
      caption: "Apu dress ta onk valo hoiche and amr onk pocondo hoiche...",
    },
    {
      src: "/images/testimonial/testimonial-2.webp",
      alt: "কাস্টমার রিভিউ ২ - রেড ২-পিস সেট",
      caption: "ড্রেসটা অনেক সুন্দর ছিলো ধন্যবাদ",
    },
    {
      src: "/images/testimonial/testimonial-3.webp",
      alt: "কাস্টমার রিভিউ ৩ - এক্সক্লুসিভ ২-পিস সেট",
      caption: "আলহামদুলিল্লাহ ড্রেসটি ভালো লেগেছে",
    },
    {
      src: "/images/testimonial/testimonial-5.webp",
      alt: "কাস্টমার রিভিউ ৪ - ব্ল্যাক ২-পিস সেট",
      caption: "Quality ta really premium. Fabric ta soft and comfortable...",
    },
    {
      src: "/images/testimonial/testimonial-6.webp",
      alt: "কাস্টমার রিভিউ ৫ - রেড ২-পিস সেট",
      caption: "Ji apu dress ta ajke sokale receved korlam. onk sundor hoiche...",
    },
  ];

  // Repeat for smooth infinite swiper loop
  const testimonials = [...rawTestimonials, ...rawTestimonials];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#F6F7FA] border-t border-b border-neutral-200/50">
      <div className="container-x">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-neutral-900 font-display leading-[1.38]">
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 font-normal">
            আমাদের সম্মানিত কাস্টমারদের বাস্তব অভিজ্ঞতা ও মতামত
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group max-w-6xl mx-auto mb-10">
          {/* Swiper Controls */}
          <button
            ref={prevRef}
            onClick={() => swiperRef.current?.slidePrev()}
            type="button"
            aria-label="Previous review"
            className="hidden sm:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white items-center justify-center shadow-xs hover:bg-neutral-50 border border-neutral-200 cursor-pointer z-20 rounded-full transition-transform active:scale-95 text-neutral-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            ref={nextRef}
            onClick={() => swiperRef.current?.slideNext()}
            type="button"
            aria-label="Next review"
            className="hidden sm:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white items-center justify-center shadow-xs hover:bg-neutral-50 border border-neutral-200 cursor-pointer z-20 rounded-full transition-transform active:scale-95 text-neutral-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            speed={800}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.15,
                centeredSlides: true,
                spaceBetween: 12,
              },
              480: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 2.5,
                centeredSlides: false,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 20,
              },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="w-full py-2"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div
                  onClick={() => setSelectedImage(testimonial)}
                  className="group relative rounded-xl overflow-hidden bg-white shadow-xs border border-neutral-200/80 hover:shadow-md hover:border-neutral-300 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-[560/750] w-full bg-neutral-100 overflow-hidden">
                    <Image
                      src={testimonial.src}
                      alt={testimonial.alt}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 380px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Hover Overlay with Zoom Prompt */}
                    <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-neutral-900 text-xs font-medium shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5 text-neutral-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                          />
                        </svg>
                        বড় করে দেখুন
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Clean Template Action Banner */}
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

      {/* Lightbox / Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-md w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-2 sm:p-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              type="button"
              aria-label="Close modal"
              className="absolute top-4 right-4 z-10 w-9 h-9 bg-neutral-900/70 hover:bg-neutral-900 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Image */}
            <div className="relative aspect-[560/750] w-full rounded-xl overflow-hidden bg-neutral-100">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes="(max-width: 768px) 90vw, 480px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomerReviewsSection;