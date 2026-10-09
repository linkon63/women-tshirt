/**
 * Google Tag Manager (GTM) DataLayer Utilities
 */

export interface GTMProduct {
  item_id: number | string;
  item_name: string;
  price: number;
  quantity?: number;
  item_variant?: string;
}

export interface GTMAddToCartParams {
  value: number;
  currency?: string;
  items: GTMProduct[];
}

export interface GTMBeginCheckoutParams {
  value: number;
  currency?: string;
  items: GTMProduct[];
}

export interface GTMPurchaseParams {
  transaction_id: string;
  value: number;
  currency?: string;
  shipping?: number;
  tax?: number;
  items: GTMProduct[];
}

export const pushAddToCartEvent = (params: GTMAddToCartParams): void => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: "add_to_cart",
    ecommerce: {
      value: params.value,
      currency: params.currency || "BDT",
      items: params.items.map((item) => ({
        item_id: item.item_id,
        item_name: item.item_name,
        price: item.price,
        ...(item.item_variant && { item_variant: item.item_variant }),
        quantity: item.quantity || 1,
      })),
    },
  });
};

export const pushBeginCheckoutEvent = (params: GTMBeginCheckoutParams): void => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: "begin_checkout",
    ecommerce: {
      value: params.value,
      currency: params.currency || "BDT",
      items: params.items.map((item) => ({
        item_id: item.item_id,
        item_name: item.item_name,
        price: item.price,
        ...(item.item_variant && { item_variant: item.item_variant }),
        quantity: item.quantity || 1,
      })),
    },
  });
  window.dataLayer.push({
    event: "initiate_checkout",
    value: params.value,
    currency: params.currency || "BDT",
  });
};

export const pushPurchaseEvent = (params: GTMPurchaseParams): void => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event: "purchase",
    ecommerce: {
      transaction_id: params.transaction_id,
      value: params.value,
      currency: params.currency || "BDT",
      shipping: params.shipping || 0,
      tax: params.tax || 0,
      items: params.items.map((item) => ({
        item_id: item.item_id,
        item_name: item.item_name,
        price: item.price,
        ...(item.item_variant && { item_variant: item.item_variant }),
        quantity: item.quantity || 1,
      })),
    },
  });
};

export const initDataLayer = (): void => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
  }
};
