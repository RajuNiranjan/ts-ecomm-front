// Type: Hook
// Description: useGetAllBillboards hook is used to get all billboards
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Billboard } from "@/type";

const useGetAllBillboards = () => {
    const {
        data,
        isLoading,
        isError,
        isFetching
    } = useQuery({
        queryKey: ['billboards'],
        queryFn: async () => {
        const {
            data
        } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/billboard`);
        return data as Billboard[];
        }
    });
    return {
        data,
        isLoading,
        isError,
        isFetching
    };
};
export default useGetAllBillboards;