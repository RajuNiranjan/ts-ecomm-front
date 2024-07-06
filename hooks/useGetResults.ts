// this hook is used to get the results of the search query and paginate them
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/type";
const useGetResults = (query:string,page:number) => {
    const { data, isLoading, isFetching} = useQuery(
      {
        queryKey: ["results",query,page],
        queryFn: async () => {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/product/result/?search_query=${query}&page=${page}`
            );
            return data as Product[];
        },
      }
    );
    return { data, isLoading, isFetching};
};
export default useGetResults;
