// Type: React Custom Hook
// Description: useCheckEligibleForReview hook is used to check if the user is eligible to review a product
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import localStorageManager from "@/lib/LocalStorageManager";

 const useCheckEligibleForReview = (productId:string) => {
    const { data, isLoading, isError } = useQuery(
        ["checkEligableForReview", productId],
        async () => {
            const token =localStorageManager.getItemWithExpiration("token");
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/review/${productId}/check`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
        }
    );
    
    return { data, isLoading };
};
export default useCheckEligibleForReview;