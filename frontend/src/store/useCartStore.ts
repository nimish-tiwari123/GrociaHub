import { create } from "zustand";

type ProductDataType = {
  image: string;
  name: string; // Assuming the product name is unique
  category: string;
  weight: string;
  rating: number;
  price: number;
  discountPrice: number;
};

type CartStoreType = {
  cart: ProductDataType[];
  addToCart: (product: ProductDataType) => void;
  deleteFromCart: (productName: string) => void;
};

export const useCartStore = create<CartStoreType>((set) => ({
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  addToCart: (product) =>
    set((state) => {
      const updatedCart = [...state.cart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
  deleteFromCart: (productName) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.name !== productName);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
}));
