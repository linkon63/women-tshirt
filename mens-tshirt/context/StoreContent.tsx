"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product, StoreContextType } from "@/types/ProductType";

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <StoreContext.Provider value={{ cartItems, setCartItems, products, setProducts }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
