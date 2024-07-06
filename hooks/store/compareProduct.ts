import { Product } from "@/type";
import { create } from "zustand";

interface Props {
  categoryId: string | null;
  products: Product[];
  setCategoryId: (id: string) => void;
  setCompareProducts: (data: Product) => void;
  removeProduct: (id: string) => void;
}

const useCompareProducts = create<Props>((set) => ({
  categoryId: null,
  products: [],
  setCategoryId: (id) =>
    set((state) => ({
      categoryId: id,
    })),
  setCompareProducts: (data) =>
    set((state) => ({ products: [...state.products, data] })),
  removeProduct: (id) =>
    set((state) => {
      const newdata = state.products.filter((each) => each.id !== id);
      return {
        products: newdata,
        categoryId: newdata.length == 0 ? null : state.categoryId,
      };
    }),
}));

export default useCompareProducts;
