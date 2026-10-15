"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useStore } from "@/context/StoreContent";
import { API_BASE_URL } from "@/config/general.config";
import CartItemProduct from "./CartItemProduct";
import { useRouter } from "next/navigation";
import { Product, FormErrors, ShippingOption, OrderApiData } from "@/types/ProductType";
import { getProductColorInfo, getProductImage, getProductPrices, formatProductTitle } from "@/utils/productUtils";

interface OrderFormSectionProps {
  products?: Product[];
  apiProducts?: Product | Product[];
}

const OrderFormSection = ({
  products: initialProducts,
  apiProducts,
}: OrderFormSectionProps) => {
  const router = useRouter();
  const { cartItems, setCartItems } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInitiateCheckoutFired, setIsInitiateCheckoutFired] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);

  const orderTitle =
    process.env.NEXT_PUBLIC_ORDER_TITLE || "অর্ডার করতে নিচের ফর্মটি পূরণ করুন";
  const orderSubtitle =
    process.env.NEXT_PUBLIC_ORDER_SUBTITLE ||
    "পণ্য হাতে পেয়ে চেক করে সম্পূর্ণ মূল্য পরিশোধ করুন";
  const buttonText =
    process.env.NEXT_PUBLIC_ORDER_BUTTON_TEXT || "অর্ডার করুন";

  const [shippingMethod, setShippingMethod] = useState("inside_dhaka");
  const shippingOptions: ShippingOption[] = [
    {
      id: "inside_dhaka",
      label:
        process.env.NEXT_PUBLIC_SHIPPING_DHAKA_CITY_LABEL || "ঢাকা শহর",
      price: Number(process.env.NEXT_PUBLIC_SHIPPING_DHAKA_CITY_PRICE || 70),
    },
    {
      id: "outskirts_dhaka",
      label:
        process.env.NEXT_PUBLIC_SHIPPING_DHAKA_SUBURBS_LABEL ||
        "ঢাকার আশেপাশের এলাকা",
      price: Number(
        process.env.NEXT_PUBLIC_SHIPPING_DHAKA_SUBURBS_PRICE || 100
      ),
    },
    {
      id: "outside_dhaka",
      label:
        process.env.NEXT_PUBLIC_SHIPPING_OUTSIDE_DHAKA_LABEL || "ঢাকার বাইরে",
      price: Number(
        process.env.NEXT_PUBLIC_SHIPPING_OUTSIDE_DHAKA_PRICE || 130
      ),
    },
  ];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
    if (!isInitiateCheckoutFired && typeof window !== "undefined") {
      const selectedProducts = cartItems.filter((item) => !item.selectForOrder);
      const subtotal = totalPriceOfCartItems();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
          currency: "BDT",
          value: subtotal,
          items: selectedProducts.map((item) => ({
            item_id: item.id,
            item_name: formatProductTitle(item.name?.en) || "Western Suit",
            price: getItemUnitPrice(item),
            quantity: item.quantity || 1,
            item_variant: item.selectedSize || "M",
          })),
        },
      });
      window.dataLayer.push({
        event: "initiate_checkout",
        currency: "BDT",
        value: subtotal,
      });
      setIsInitiateCheckoutFired(true);
    }
  };

  const getItemUnitPrice = (item: Product) => {
    return getProductPrices(item).sellingPrice;
  };

  const totalPriceOfCartItems = () => {
    const selectedProducts = cartItems.filter((item) => !item.selectForOrder);
    return Math.round(
      selectedProducts.reduce((sum, item) => {
        return sum + getItemUnitPrice(item) * (item.quantity || 1);
      }, 0)
    );
  };

  // Initialize cart from products
  const setupProductsInCart = (prods: Product[]) => {
    if (!prods || prods.length === 0) return;

    const initialCart: Product[] = prods.map((prod, idx) => {
      const colorInfo = getProductColorInfo(prod, idx);
      const defaultVariant = prod.variants?.[0];
      return {
        ...prod,
        quantity: 1,
        selectedSize: prod.selectedSize || "M",
        selectForOrder: idx === 0 ? false : true, // First one selected by default
        selectedColor: colorInfo.name,
        selectedVariant: defaultVariant
          ? { ...defaultVariant, variantId: defaultVariant.id.toString() }
          : undefined,
      };
    });

    setCartItems(initialCart);
  };

  useEffect(() => {
    const prodsToUse =
      initialProducts ||
      (Array.isArray(apiProducts)
        ? apiProducts
        : apiProducts
        ? [apiProducts]
        : []);

    if (prodsToUse && prodsToUse.length > 0) {
      setupProductsInCart(prodsToUse);
    }
  }, [initialProducts, apiProducts]);

  const selectTheProductForOrder = (product: Product, index: number) => {
    if (index < 0 || index >= cartItems.length) return;
    const updated = [...cartItems];
    updated[index].selectForOrder = !updated[index].selectForOrder;
    setCartItems(updated);
  };

  const shippingCharge =
    shippingOptions.find((opt) => opt.id === shippingMethod)?.price || 70;

  const total = totalPriceOfCartItems() + shippingCharge;

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "আপনার পুরো নামটি লিখুন";
    }

    const normalized = phone.replace(/\s|-/g, "");
    const bdPattern = /^(\+?8801[3-9]\d{8}|01[3-9]\d{8})$/;
    if (!bdPattern.test(normalized)) {
      newErrors.phone =
        "সঠিক ১১ ডিজিটের মোবাইল নাম্বার দিন (যেমন: 017XXXXXXXX)";
    }

    if (address.trim().length < 5) {
      newErrors.address =
        "সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন (বাসা নং, রোড, এলাকা, থানা, জেলা)";
    }

    setErrors(newErrors);

    if (newErrors.name && nameInputRef.current) {
      nameInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      nameInputRef.current.focus();
    } else if (newErrors.phone && phoneInputRef.current) {
      phoneInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      phoneInputRef.current.focus();
    } else if (newErrors.address && addressInputRef.current) {
      addressInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      addressInputRef.current.focus();
    }

    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;

    const selectedProducts = cartItems.filter((item) => !item.selectForOrder);
    if (selectedProducts.length === 0) {
      alert("অনুগ্রহ করে অন্তত একটি প্রডাক্ট সিলেক্ট করুন!");
      return;
    }

    setIsSubmitting(true);

    try {
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0] || "Customer";
      const lastName = nameParts.slice(1).join(" ") || ".";
      const cleanedPhone = phone.replace(/\s|-/g, "");
      const totalAmount = totalPriceOfCartItems() + shippingCharge;

      const baseApi =
        process.env.NEXT_PUBLIC_API_BASE_URL || API_BASE_URL;
      const customerId = Number(process.env.NEXT_PUBLIC_CUSTOMER_ID || 1);
      const channelId = Number(process.env.NEXT_PUBLIC_CHANNEL_ID || 2);
      const branchId = Number(process.env.NEXT_PUBLIC_BRANCH_ID || 1);
      const organizationId = Number(
        process.env.NEXT_PUBLIC_ORGANIZATION_ID || 1
      );
      const uomId = Number(process.env.NEXT_PUBLIC_UOM_ID || 1);
      const uomCode = process.env.NEXT_PUBLIC_UOM_CODE || "pcs";

      // Formulate detailed size specification note
      const sizeBreakdown = selectedProducts
        .map(
          (p) =>
            `${p.name?.en || "Product"} (Size: ${p.selectedSize || "M"}, Qty: ${
              p.quantity || 1
            })`
        )
        .join("; ");

      const fullNote = orderNote.trim()
        ? `[Selected Sizes: ${sizeBreakdown}] - Note: ${orderNote.trim()}`
        : `[Selected Sizes: ${sizeBreakdown}]`;

      const orderPayload: OrderApiData = {
        customer_id: customerId,
        channel_id: channelId,
        branch_id: branchId,
        organization_id: organizationId,
        amount_due: totalAmount,
        amount_paid: 0,
        amount_change: 0,
        billing_address: {
          first_name: firstName,
          last_name: lastName,
          phone: cleanedPhone,
          state: null,
          city: null,
          area: null,
          postcode: "",
          address: address.trim(),
          landmark: fullNote,
          type: "billing",
        },
        shipping_address: {
          first_name: firstName,
          last_name: lastName,
          phone: cleanedPhone,
          state: null,
          city: null,
          area: null,
          postcode: "",
          address: address.trim(),
          landmark: fullNote,
          type: "shipping",
        },
        payment: {
          intent: "sale",
          status: "unpaid",
          meta_data: [
            {
              provider: "Cash on Delivery",
              type: "cash",
              amount: totalAmount.toString(),
              payment_information: "Cash on Delivery",
              vouchers: [],
            },
          ],
        },
        purchasable: selectedProducts.map((prod) => {
          const variant = prod.variants?.[0] || (prod.selectedVariant as any);
          const variantId = variant?.id || prod.id;
          const numericId = Number(variantId);
          return {
            id: numericId,
            quantity: prod.quantity || 1,
            discount_should_apply: true,
            order_quantity: prod.quantity || 1,
            uom_id: uomId,
            uom: uomCode,
            order_uom_id: uomId,
            order_uom: uomCode,
            batch_id: null,
          };
        }),
        meta_data: {
          additional_amount_breakdown: [
            {
              key: "additional_amount",
              title: "Shipping Charge",
              amount: shippingCharge,
              currency_code: "BDT",
            },
          ],
          note: fullNote,
          branch_id: branchId,
          organization_id: organizationId,
        },
      };

      const response = await fetch(`${baseApi}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json();

      if (response.ok) {
        const orderNumber =
          result?.data?.order_number ||
          result?.order_number ||
          result?.data?.id ||
          result?.id ||
          Date.now().toString();

        if (typeof window !== "undefined") {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ ecommerce: null });
          window.dataLayer.push({
            event: "purchase",
            ecommerce: {
              transaction_id: String(orderNumber),
              value: totalAmount,
              currency: "BDT",
              tax: 0,
              shipping: shippingCharge,
              items: selectedProducts.map((item) => ({
                item_id: item.id,
                item_name: item.name?.en || "Product",
                price: getItemUnitPrice(item),
                quantity: item.quantity || 1,
                item_variant: item.selectedSize || "M",
              })),
            },
          });
        }

        setName("");
        setPhone("");
        setAddress("");
        setOrderNote("");
        setErrors({});
        setCartItems([]);
        setShippingMethod("inside_dhaka");

        router.push(
          `/order-complete?orderNumber=${encodeURIComponent(
            orderNumber
          )}&message=${encodeURIComponent(result?.message || "")}`
        );
      } else {
        let detailedError = "";
        if (result?.errors && typeof result.errors === "object") {
          detailedError = Object.values(result.errors)
            .map((err) => (Array.isArray(err) ? err.join(", ") : String(err)))
            .join(" | ");
        }
        const errorMessage =
          detailedError ||
          result?.message ||
          result?.error ||
          result?.detail ||
          "অর্ডার সম্পন্ন হতে পারেনি";
        alert(
          `অর্ডার সাবমিট করতে সমস্যা হয়েছে (${response.status}): ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Order error:", error);
      alert(
        "অর্ডার পাঠাতে সমস্যা হয়েছে। আপনার ইন্টারনেট সংযোগ চেক করুন এবং আবার চেষ্টা করুন।"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="order" className="py-12 sm:py-16 lg:py-20 bg-white scroll-mt-16">
      <div className="container-x max-w-5xl">
        {/* Clean Headline - no bold font, relaxed leading */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-neutral-900 font-display leading-[1.38]">
            {orderTitle}
          </h2>
          <p className="mt-2 text-base sm:text-lg text-neutral-600 font-normal font-body leading-[1.7]">
            {orderSubtitle}
          </p>
        </div>

        {/* Step 1: Your Products */}
        <div className="mb-10 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-4 font-display">
            পণ্য নির্বাচন করুন
          </h3>

          <div className="space-y-3">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((product, index) => (
                <CartItemProduct
                  key={`${product.id}-${index}`}
                  product={product}
                  productIndex={index}
                  selectTheProductForOrder={selectTheProductForOrder}
                />
              ))
            ) : (
              <div className="p-8 text-center text-neutral-400 font-body border border-neutral-200 rounded-xl">
                প্রোডাক্ট লোড হচ্ছে...
              </div>
            )}
          </div>
        </div>

        {/* Step 2: Form & Order Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Billing Details & Shipping */}
          <div className="lg:col-span-7 space-y-7">
            {/* Billing Details */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-4 font-display">
                গ্রাহকের তথ্য
              </h3>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm sm:text-base font-medium text-neutral-800 mb-1.5 font-body"
                  >
                    আপনার নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={nameInputRef}
                    id="name"
                    type="text"
                    placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                    value={name}
                    onChange={handleNameChange}
                    className={`w-full h-12 px-4 border ${
                      errors.name
                        ? "border-red-500"
                        : "border-neutral-300 focus:border-yellow-500"
                    } rounded-lg outline-none font-body text-base text-neutral-900 transition-colors`}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs font-body mt-1 block">
                      * {errors.name}
                    </span>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm sm:text-base font-medium text-neutral-800 mb-1.5 font-body"
                  >
                    আপনার মোবাইল নাম্বার <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={phoneInputRef}
                    id="phone"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) {
                        setErrors((prev) => ({ ...prev, phone: undefined }));
                      }
                    }}
                    className={`w-full h-12 px-4 border ${
                      errors.phone
                        ? "border-red-500"
                        : "border-neutral-300 focus:border-yellow-500"
                    } rounded-lg outline-none font-body text-base text-neutral-900 transition-colors`}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs font-body mt-1 block">
                      * {errors.phone}
                    </span>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm sm:text-base font-medium text-neutral-800 mb-1.5 font-body"
                  >
                    আপনার ডেলিভারি ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={addressInputRef}
                    id="address"
                    type="text"
                    placeholder="বাসা নং, রোড নং, এলাকা, থানা, জেলা"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (errors.address) {
                        setErrors((prev) => ({
                          ...prev,
                          address: undefined,
                        }));
                      }
                    }}
                    className={`w-full h-12 px-4 border ${
                      errors.address
                        ? "border-red-500"
                        : "border-neutral-300 focus:border-yellow-500"
                    } rounded-lg outline-none font-body text-base text-neutral-900 transition-colors`}
                  />
                  {errors.address && (
                    <span className="text-red-500 text-xs font-body mt-1 block">
                      * {errors.address}
                    </span>
                  )}
                </div>

                {/* Optional Note */}
                <div>
                  <label
                    htmlFor="orderNote"
                    className="block text-sm sm:text-base font-normal text-neutral-700 mb-1.5 font-body"
                  >
                    অর্ডার নোট (ঐচ্ছিক)
                  </label>
                  <input
                    id="orderNote"
                    type="text"
                    placeholder="কোন বিশেষ নির্দেশনা থাকলে লিখুন..."
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    className="w-full h-12 px-4 border border-neutral-300 focus:border-yellow-500 rounded-lg outline-none font-body text-base text-neutral-900 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-3.5 font-display">
                ডেলিভারি এলাকা
              </h3>

              <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-200">
                {shippingOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setShippingMethod(opt.id)}
                    className={`p-3.5 sm:p-4 flex items-center justify-between cursor-pointer transition-colors ${
                      shippingMethod === opt.id
                        ? "bg-yellow-50/40"
                        : "bg-white hover:bg-neutral-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          shippingMethod === opt.id
                            ? "border-yellow-500 bg-yellow-500"
                            : "border-neutral-400 bg-white"
                        }`}
                      >
                        {shippingMethod === opt.id && (
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                        )}
                      </div>
                      <span className="font-body text-sm sm:text-base text-neutral-800 font-normal">
                        {opt.label}
                      </span>
                    </div>
                    <span className="font-display font-semibold text-sm sm:text-base text-neutral-900">
                      ৳ {opt.price}.00
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Your Order Summary */}
          <div className="lg:col-span-5">
            <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-4 font-display">
              অর্ডার সারাংশ
            </h3>

            <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              {/* Summary Header */}
              <div className="py-3 px-5 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between text-sm sm:text-base font-medium text-neutral-800 font-display">
                <span>প্রোডাক্ট</span>
                <span>সাবটোটাল</span>
              </div>

              {/* Selected Products List */}
              <div className="p-4 sm:p-5 divide-y divide-neutral-100 max-h-64 overflow-y-auto">
                {cartItems.filter((item) => !item.selectForOrder).length > 0 ? (
                  cartItems
                    .filter((item) => !item.selectForOrder)
                    .map((item, idx) => (
                      <div
                        key={`${item.id}-${idx}`}
                        className="py-3 flex items-center gap-3"
                      >
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                          <Image
                            src={getProductImage(item, idx)}
                            alt={formatProductTitle(item.name?.en) || "Western Suit"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-medium text-sm text-neutral-900 truncate">
                            {formatProductTitle(item.name?.en)}
                          </p>
                          <p className="font-body text-xs text-neutral-500 font-normal">
                            {item.selectedSize ? `সাইজ: ${item.selectedSize}` : ""}{" "}
                            ✕ {item.quantity || 1}
                          </p>
                        </div>
                        <div className="font-display font-semibold text-base text-neutral-900 shrink-0">
                          ৳{" "}
                          {Math.round(
                            getItemUnitPrice(item) * (item.quantity || 1)
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="py-6 text-center text-sm font-body text-neutral-400 font-normal">
                    কোনো প্রোডাক্ট সিলেক্ট করা নেই
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="bg-neutral-50/60 p-4 sm:p-5 border-t border-neutral-200 space-y-2.5 font-body">
                <div className="flex items-center justify-between text-sm text-neutral-700 font-normal">
                  <span>সাবটোটাল</span>
                  <span className="font-display font-semibold text-neutral-900 text-base">
                    ৳ {totalPriceOfCartItems()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-neutral-700 font-normal">
                  <span>ডেলিভারি চার্জ</span>
                  <span className="font-display font-semibold text-neutral-900 text-base">
                    ৳ {shippingCharge}
                  </span>
                </div>

                <div className="pt-2.5 border-t border-neutral-200 flex items-center justify-between text-base sm:text-lg font-semibold text-neutral-900 font-display">
                  <span>সর্বমোট</span>
                  <span className="text-xl sm:text-2xl text-neutral-950 font-semibold">
                    ৳ {total}
                  </span>
                </div>
              </div>

              {/* Cash on Delivery Box */}
              <div className="p-4 bg-neutral-100/70 border-t border-neutral-200 text-xs sm:text-sm text-neutral-700 font-body">
                <p className="font-medium text-neutral-900 mb-0.5">ক্যাশ অন ডেলিভারি</p>
                <p className="text-neutral-600 font-normal">পণ্য হাতে পেয়ে চেক করে সম্পূর্ণ মূল্য পরিশোধ করুন</p>
              </div>

              {/* Submit Order Button */}
              <div className="p-4 sm:p-5 bg-white border-t border-neutral-200">
                <button
                  id="orderSubmitBtn"
                  type="button"
                  disabled={isSubmitting}
                  onClick={handlePlaceOrder}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 bg-yellow-400 hover:bg-yellow-500 text-neutral-950 font-semibold text-lg sm:text-xl rounded-md transition-all shadow-xs hover:shadow-md active:scale-98 font-display cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-5 w-5 text-neutral-950 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
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
                  )}
                  <span>
                    {isSubmitting ? "অর্ডার পাঠানো হচ্ছে..." : buttonText}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderFormSection;
