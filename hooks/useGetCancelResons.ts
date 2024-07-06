// Type: Hooks
// Description: useCurrentUser hook is used to get the current user data

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LocalStorageManager from "@/lib/LocalStorageManager";

import { Reason } from "@/type";

const useGetCancelResons = () => {
  const token = LocalStorageManager.getItemWithExpiration("token");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cancel", "resons"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/order/reasons/1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data as Reason[];
    },
  });
  return {
    data,
    isLoading,
    isError,
  };
};
export default useGetCancelResons;
