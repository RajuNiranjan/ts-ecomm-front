// this hook is used to get delivered orders
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import  localStorageManager  from "../lib/LocalStorageManager";
import { Order } from "@/type";
const useGetDeliveredOrders = () => {
    const token = localStorageManager.getItemWithExpiration("token");
    const { data, isLoading} = useQuery({
        queryKey: ["orders",'delivered'],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/delivered`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data as Order[];
        },
    });
    return { data, isLoading};
};
export default useGetDeliveredOrders;