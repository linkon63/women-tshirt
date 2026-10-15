import { Product } from "@/types/ProductType";

export const sampleProducts: Product[] = [
  {
    id: 10,
    name: {
      en: "Ladies Red Western Suit",
    },
    slug: "ladies-red-western-suit",
    description: {
      en: "মহিলাদের জন্য এক্সক্লুসিভ প্রিমিয়াম কোয়ালিটি ২-পিস লেডিস ওয়েস্টার্ন স্যুট (রেড কালার)। চায়না ইম্পোর্টেড Scuda Crave ফেব্রিক (250 GSM, 95% Polyester, 5% Spandex)।",
    },
    status: "published",
    is_active: true,
    thumbnail:
      "https://hishabi-dev.s3.ap-south-1.amazonaws.com/tenant/pjfashion/product/31/Cv2VdsgSvf2s2LKDWK9QUXN6sOw2x8c9nE33dgmx.webp",
    media: [
      {
        order_column: 1,
        original_url:
          "https://hishabi-dev.s3.ap-south-1.amazonaws.com/tenant/pjfashion/product/31/Cv2VdsgSvf2s2LKDWK9QUXN6sOw2x8c9nE33dgmx.webp",
        collection_name: "images",
      },
      {
        order_column: 2,
        original_url:
          "/images/size-guide/SizeGuide_LadiesTop.png",
        collection_name: "size_chart",
      },
    ],
    variants: [
      {
        id: 52,
        sku: "TSH259",
        unit_quantity: 1,
        total_stock_count: 399,
        purchasable: "always",
        is_active: true,
        current_pricing: {
          id: 73,
          unit_price: "BDT 1,899.00",
          retail_price: "BDT 1,499.00",
        },
        unit_prices: [
          {
            id: 52,
            uom_id: 1,
            unit_price: { value: 1899, currency_code: "BDT" },
            retail_price: { value: 1499, currency_code: "BDT" },
            is_base: true,
          },
        ],
        option_values: [],
      },
    ],
  },
  {
    id: 11,
    name: {
      en: "Ladies White Western Suit",
    },
    slug: "ladies-white-western-suit",
    description: {
      en: "মহিলাদের জন্য এক্সক্লুসিভ প্রিমিয়াম কোয়ালিটি ২-পিস লেডিস ওয়েস্টার্ন স্যুট (হোয়াইট কালার)। চায়না ইম্পোর্টেড Scuda Crave ফেব্রিক (250 GSM, 95% Polyester, 5% Spandex)।",
    },
    status: "published",
    is_active: true,
    thumbnail:
      "https://hishabi-dev.s3.ap-south-1.amazonaws.com/tenant/pjfashion/product/33/qz2IEDklPRzMOk3TCx3geFQcgqrbihnQVBFlvF8S.webp",
    media: [
      {
        order_column: 1,
        original_url:
          "https://hishabi-dev.s3.ap-south-1.amazonaws.com/tenant/pjfashion/product/33/qz2IEDklPRzMOk3TCx3geFQcgqrbihnQVBFlvF8S.webp",
        collection_name: "images",
      },
      {
        order_column: 2,
        original_url:
          "/images/size-guide/SizeGuide_LadiesTop.png",
        collection_name: "size_chart",
      },
    ],
    variants: [
      {
        id: 53,
        sku: "TSHE4A",
        unit_quantity: 1,
        total_stock_count: 70,
        purchasable: "always",
        is_active: true,
        current_pricing: {
          id: 71,
          unit_price: "BDT 1,899.00",
          retail_price: "BDT 1,499.00",
        },
        unit_prices: [
          {
            id: 53,
            uom_id: 1,
            unit_price: { value: 1899, currency_code: "BDT" },
            retail_price: { value: 1499, currency_code: "BDT" },
            is_base: true,
          },
        ],
        option_values: [],
      },
    ],
  },
  {
    id: 12,
    name: {
      en: "Ladies Black Western Suit",
    },
    slug: "ladies-black-western-suit",
    description: {
      en: "মহিলাদের জন্য এক্সক্লুসিভ প্রিমিয়াম কোয়ালিটি ২-পিস লেডিস ওয়েস্টার্ন স্যুট (ব্ল্যাক কালার)। চায়না ইম্পোর্টেড Scuda Crave ফেব্রিক (250 GSM, 95% Polyester, 5% Spandex)।",
    },
    status: "published",
    is_active: true,
    thumbnail:
      "https://hishabi-dev.s3.ap-south-1.amazonaws.com/tenant/pjfashion/product/35/XqQvqcHgVBMF8zK8ZImHt0mfjN6HJJb7WJvOKHz3.webp",
    media: [
      {
        order_column: 1,
        original_url:
          "https://hishabi-dev.s3.ap-south-1.amazonaws.com/tenant/pjfashion/product/35/XqQvqcHgVBMF8zK8ZImHt0mfjN6HJJb7WJvOKHz3.webp",
        collection_name: "images",
      },
      {
        order_column: 2,
        original_url:
          "/images/size-guide/SizeGuide_LadiesTop.png",
        collection_name: "size_chart",
      },
    ],
    variants: [
      {
        id: 54,
        sku: "TSHC58",
        unit_quantity: 1,
        total_stock_count: 90,
        purchasable: "always",
        is_active: true,
        current_pricing: {
          id: 70,
          unit_price: "BDT 1,899.00",
          retail_price: "BDT 1,499.00",
        },
        unit_prices: [
          {
            id: 54,
            uom_id: 1,
            unit_price: { value: 1899, currency_code: "BDT" },
            retail_price: { value: 1499, currency_code: "BDT" },
            is_base: true,
          },
        ],
        option_values: [],
      },
    ],
  },
];

export const sampleProduct: Product = sampleProducts[0];

export default sampleProduct;
