"use client";

const FooterSection = () => {
  const phone = process.env.NEXT_PUBLIC_HELPLINE_PHONE || "01905000043";
  const currentYear = new Date().getFullYear();
  const copyright =
    process.env.NEXT_PUBLIC_FOOTER_COPYRIGHT ||
    `PJ Fashion © ${currentYear}. All Rights Reserved.`;

  return (
    <footer className="bg-white text-neutral-600 py-8 px-4 border-t border-neutral-100 text-center font-body text-xs sm:text-sm">
      <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-normal text-neutral-700">
          {copyright.replace("{year}", currentYear.toString())}
        </p>
        <p className="text-neutral-500 font-normal">
          হেল্পলাইন:{" "}
          <a
            href={`tel:${phone}`}
            className="font-medium text-neutral-800 hover:underline"
          >
            {phone}
          </a>
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
