"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/catalog";

type ShoppingState = {
  ready: boolean;
  favorites: string[];
  setFavorites: Dispatch<SetStateAction<string[]>>;
  cart: Product[];
  setCart: Dispatch<SetStateAction<Product[]>>;
};
const ShoppingContext = createContext<ShoppingState | null>(null);
const subscribeReady = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
export function ShoppingProvider({ children }: { children: ReactNode }) {
  const ready = useSyncExternalStore(subscribeReady, clientReady, serverReady);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  return (
    <ShoppingContext.Provider
      value={{ ready, favorites, setFavorites, cart, setCart }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}
export function useShopping() {
  const context = useContext(ShoppingContext);
  if (!context) throw new Error("ShoppingProvider is required");
  return context;
}
