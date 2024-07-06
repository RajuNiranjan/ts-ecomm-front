import { Address } from "@/type";
import { create } from "zustand";

interface AddressProps {
  address: Address[] | [];

  setAddress: (newAddress: Address[]) => void;
}

// Define the store
const useAddress = create<AddressProps>((set) => ({
  address: [],

  setAddress: (newAddress: Address[]) => {
    set({ address: newAddress });
  },
}));

export default useAddress;
