import { Category } from '@/type';
import {create} from 'zustand';

// Define the store
const useMenCategoryStore = create((set) => ({
  categories: [],

  // Action to set categories
  setCategories: (newCategories:Category) => set({ categories: newCategories }),
}));

export default useMenCategoryStore;