// this hook is used to get all reviews of a user
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import localStorageManager from "@/lib/LocalStorageManager";
import { Review } from "@/type";
export const useGetUserReviews = () => {
    const token = localStorageManager.getItemWithExpiration("token");
    const { data, isLoading, isError } = useQuery({
        queryKey: ["getUserReviews"],
        queryFn: async () => {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/review`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return data as Review[];
        },
    });
    return { data, isLoading, isError };
};