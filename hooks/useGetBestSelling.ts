// Type: Hook
// Description: useGetBestSelling hook is used to get bestselling Products
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/type";
const useGetBestSelling = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["bestselling"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${process.env.NEXT_PUBLIC_STORE_ID}/topselling`
      );

      return data.products as Product[];
    },
  });
  return { data, isLoading, isFetching };
};
export default useGetBestSelling;
