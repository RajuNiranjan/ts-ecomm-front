import getPosts from "@/hooks/getPosts";
import { useInfiniteQuery } from "@tanstack/react-query";
interface Query {
    page: number;
    isFeatured?: boolean;
    'category[name]'?: string;
  }
  const useTestInfinite = (query: Query) => {
      const {
      data,
      error,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      status,
    } = useInfiniteQuery({
      queryKey: ['productsquery',JSON.stringify(query)],
      queryFn: () => getPosts(query), 
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.pagination.page < lastPage.pagination.total_pages) {
          return lastPage.pagination.page + 1;
        }
      return undefined;
      },
    });
  
  
    return {
      status,
      data,
      isFetching,
      isFetchingNextPage,
      hasNextPage,
      fetchNextPage,
      error,
    };
  };
export default useTestInfinite;  