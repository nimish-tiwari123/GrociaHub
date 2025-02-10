import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProductDataType = {
  _id: string;
  images: any;
  image: string;
  name: string;
  category: string;
  weight: string;
  rating: number;
  price: number;
  discountPrice: number;
  quantity: number;
};

type CartStoreType = {
  cart: ProductDataType[];
  addToCart: (product: any) => void;
  deleteFromCart: (productName: string) => void;
  clearCart: () => void; 
};

export const useCartStore = create<CartStoreType>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingProductIndex = state.cart.findIndex(
            (item) => item.name === product.name
          );

          let updatedCart;

          if (existingProductIndex >= 0) {
            updatedCart = [...state.cart];
            updatedCart[existingProductIndex].quantity += 1; // Only increment by 1
          } else {
            updatedCart = [...state.cart, { ...product, quantity: 1 }];
          }

          return { cart: updatedCart };
        }),
      deleteFromCart: (productName) =>
        set((state) => {
          const updatedCart = state.cart.filter(
            (item) => item.name !== productName
          );
          return { cart: updatedCart };
        }),
      clearCart: () =>
        set(() => ({
          cart: [], // Reset the cart to an empty array
        })),
    }),
    {
      name: "cart", 
    }
  )
);
