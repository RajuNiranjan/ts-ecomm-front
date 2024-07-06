// Type: Hook
// Description: useGetCategoryById hook is used to get a category by id
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/type";
const useGetCategoryById = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`
      );
      return data as Category;
    },
  });
  return { data, isLoading, isFetching };
};
export default useGetCategoryById;
