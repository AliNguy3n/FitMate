import { create } from "zustand";

import CartData from "../data/cart.json";

const useCartStore = create((set) => ({
  cart: CartData,
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),
  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
