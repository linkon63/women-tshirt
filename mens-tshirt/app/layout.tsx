import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import { StoreProvider } from "@/context/StoreContent";
import Script from "next/script";

export const metadata: Metadata = {
  title:
    process.env.NEXT_PUBLIC_SITE_TITLE ||
    "প্রিমিয়াম উইমেন্স ওয়েস্টার্ন স্যুট (Western Suit) | PJ Fashion",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "মহিলাদের জন্য এক্সক্লুসিভ প্রিমিয়াম কোয়ালিটি ওয়েস্টার্ন স্যুট ২-পিস সেট। চায়না ইম্পোর্টেড Scuda Crave (250 GSM, 95% Polyester, 5% Spandex) ফেব্রিক ও ক্যাশ অন ডেলিভারি সুবিধা।",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/icon.svg",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MQZHT5MV";

  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="bg-white text-black antialiased">
        {gtmId && (
          <>
            <Script
              id="gtm"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${gtmId}');
                `,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

