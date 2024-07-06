// Type: Hooks
// Description: useCurrentUser hook is used to get the current user data

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LocalStorageManager from "@/lib/LocalStorageManager";

import { Address } from "@/type";
import useAddress from "./store/address";

const useUserAddress = () => {
  const { address, setAddress } = useAddress();
  const token = LocalStorageManager.getItemWithExpiration("token");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["address"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/address`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddress(data);
      return data as Address[];
    },
  });
  return {
    data,
    isLoading,
    isError,
  };
};
export default useUserAddress;
