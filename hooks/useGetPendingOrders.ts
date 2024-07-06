// this hook is used to get all pending orders
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import localStorageManager from "../lib/LocalStorageManager";
import { Address, Order } from "@/type";
const useGetPendingOrders = () => {
  const token = localStorageManager.getItemWithExpiration("token");
  const { data, isLoading } = useQuery({
    queryKey: ["orders", "pending"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/order/pendings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data as Order[];
    },
  });
  return { data, isLoading };
};
export default useGetPendingOrders;
