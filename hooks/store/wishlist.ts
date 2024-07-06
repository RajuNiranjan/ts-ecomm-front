import { Product } from "@/type";
import { create } from "zustand";

interface WishListProps {
  wishlist: Product[];

  setWishlist: (newAddress: Product[]) => void;
}

// Define the store
const useWishlist = create<WishListProps>((set) => ({
  wishlist: [],

  setWishlist: (newAddress: Product[]) => {
    set({ wishlist: newAddress });
  },
}));

export default useWishlist;
