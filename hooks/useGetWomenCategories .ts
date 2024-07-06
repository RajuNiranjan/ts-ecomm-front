// Purpose: Custom hook to get all categories from the API.
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Category } from "@/type";
const useGetWomenCategories = () => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/category/${process.env.NEXT_PUBLIC_STORE_ID}/women`;
    const {data,isLoading,isFetching} = useQuery({
        queryKey:['womencategories'],
        queryFn: async () => {
               await new Promise((resolve) => setTimeout(resolve, 1000));
            const {data} = await axios.get(`${baseUrl}`);
            return data as Category[];
        }
    })
    return {
        data,
        isLoading,
        isFetching
        
    };
};
export default useGetWomenCategories;