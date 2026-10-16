import React from "react";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Option Value
export interface OptionValue {
  id?: number | string;
  name: {
    en: string;
    [key: string]: any;
  };
  option_name: {
    en: string;
    [key: string]: any;
  };
  value?: string;
  [key: string]: any;
}

// Media
export interface Media {
  id?: number;
  original_url: string;
  collection_name?: string;
  order_column?: number;
}

export interface ProductMedia {
  original_url: string;
}

// Pricing
export interface Pricing {
  id?: number;
  unit_price?: string;
  unitPrice?: string;
  retailPrice?: string;
  retail_price?: string;
  discountPrice?: string;
  discount_price?: string;
  discountAmount?: string;
  discount_amount?: string;
}

// Variant
export interface Variant {
  id: number;
  variantId?: string;
  title?: string;
  sku?: string;
  unit_quantity?: number;
  total_stock_count?: number;
  purchasable?: string;
  is_active?: boolean;
  current_pricing?: Pricing;
  retailPrice?: string;
  retail_price?: string;
  discountPrice?: string;
  discount_price?: number | string | null;
  discount_amount?: number | string | null;
  media?: { original_url: string }[];
  option_values: OptionValue[];
  unit_prices?: any[];
}

export interface SelectedVariant {
  id?: number;
  variantId?: string;
  name?: string;
  optionValueId?: string;
  size?: string;
  unitPrice?: string | null;
  discountPrice?: string | null;
  discountAmount?: string | null;
  retailPrice?: string | null;
  retail_price?: string | null;
  unit_price?: string | null;
  discount_price?: string | null;
  discount_amount?: string | null;
}

// Product
export interface Product {
  id: number;
  name: {
    en: string;
    [key: string]: string;
  };
  slug?: string;
  description?: {
    en: string;
    [key: string]: string;
  };
  thumbnail?: string;
  status?: string;
  is_active?: boolean;
  retail_price?: string;
  discount_price?: string;
  media: Media[];
  variants: Variant[];
  selectedVariant?: SelectedVariant | Variant;
  quantity?: number;
  selectForOrder?: boolean;
  selectedColor?: string;
  selectedSize?: string;
}

// API Response
export interface ProductDetailsResponse {
  status: string;
  message: string;
  data: Product;
}

// Store Context
export interface StoreContextType {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

// Form & Order
export interface FormErrors {
  name?: string;
  phone?: string;
  address?: string;
}

export interface ShippingOption {
  id: string;
  label: string;
  price: number;
}

export interface OrderPurchasable {
  id: number;
  quantity: number;
  discount_should_apply: boolean;
  order_quantity: number;
  uom_id: number;
  uom: string;
  order_uom_id: number;
  order_uom: string;
  batch_id: null;
}

export interface OrderAddress {
  first_name: string;
  last_name: string;
  phone: string;
  state: null | string;
  city: null | string;
  area: null | string;
  postcode: string;
  address: string;
  landmark: string;
  type: string;
}

export interface OrderPayment {
  intent: string;
  status: string;
  meta_data: Array<{
    provider: string;
    type: string;
    amount: string;
    payment_information: string;
    vouchers: any[];
  }>;
}

export interface AdditionalAmountBreakdownItem {
  key: string;
  title: string;
  amount: number;
  currency_code: string;
}

export interface OrderMetaData {
  additional_amount_breakdown?: AdditionalAmountBreakdownItem[];
  [key: string]: any;
}

export interface OrderApiData {
  customer_id: number;
  channel_id: number;
  branch_id?: number;
  organization_id?: number;
  amount_due: number;
  amount_paid: number;
  amount_change: number;
  billing_address: OrderAddress;
  shipping_address: OrderAddress;
  payment: OrderPayment;
  purchasable: OrderPurchasable[];
  meta_data: OrderMetaData;
}
