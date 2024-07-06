// this hook is used to get returned orders
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import localStorageManager from "../lib/LocalStorageManager";
import { Order } from "@/type";
const useGetReturnedOrders = () => {
  const token = localStorageManager.getItemWithExpiration("token");
  const { data, isLoading } = useQuery({
    queryKey: ["orders", "returned"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/order/returend`,
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
export default useGetReturnedOrders;
