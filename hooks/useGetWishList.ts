// this hook is used to get the results of the search query and paginate them
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/type";
import LocalStorageManager from "@/lib/LocalStorageManager";
import useWishlist from "./store/wishlist";

const useGetWishList = () => {
  const { wishlist, setWishlist } = useWishlist();
  const token = LocalStorageManager.getItemWithExpiration("token");
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/my-wishlists`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(data.products);
      return data.products as Product[];
    },
  });
  return { data, isLoading, isFetching };
};
export default useGetWishList;
