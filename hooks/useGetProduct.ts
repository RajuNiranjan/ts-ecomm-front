// this hook is used to get a product by id
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/type";

const useGetProduct = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      //await new Promise((resolve) => setTimeout(resolve, 1000));
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`
      );
      return data as Product;
    },
  });
  return {
    data,
    isLoading,
  };
};
export default useGetProduct;
