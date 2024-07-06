// this hook is used to get product reviews
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetProductReviews = (productId: string, page:number) => {
    const { data, isLoading, error,isFetching } = useQuery({
        queryKey: ["productReviews", productId,page],
        queryFn: async () =>{
            const {data}= await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/review/${productId}?page=${page}`)
            return data as any;
        },
    });
    return { data, isLoading, error,isFetching };
}
export default useGetProductReviews;