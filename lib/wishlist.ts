import axios from "axios";
import LocalStorageManager from "./LocalStorageManager";

import { Product } from "@/type";

export const addToWishList = async (id: string) => {
  const token = LocalStorageManager.getItemWithExpiration("token");
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/${id}/add-wishlist`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    // Handle error
    console.error("Error adding to wishlist:", error);
  }
};

export const removeFromWishList = async (id: string) => {
  const token = LocalStorageManager.getItemWithExpiration("token");
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/${id}/remove-wishlist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.clear();
    console.log("Removed from wishlist:", res.data);
  } catch (error) {
    console.clear();
    console.error("Error removing from wishlist:", error);
  }
};
