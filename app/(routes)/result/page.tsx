// this component is for show search results
"use client";
import ProductList from "@/components/ProductList";
import Pagination from "@/components/ui/Pagination";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Loader } from "@/components/ui/loader";
import ProductCard from "@/components/ui/product-card";
import useGetResults from "@/hooks/useGetResults";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const Search: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [renderPagination, setRenderPagination] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const search = useSearchParams();
  const serachQuery = search ? search.get("search_query") : null;
  const encodedSearchQuery = encodeURI(serachQuery as string);
  const { data, isFetching, isLoading } = useGetResults(
    encodedSearchQuery,
    page
  );

  const route = useRouter();

  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      setRenderPagination(true);
    }, 2000);
  }, []);
  if (!mounted) return null;
  if (isLoading) return <Loader />;
  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <>
      {data?.length !== undefined && data.length >= 1 ? (
        <>
          <div className=" px-4 sm:px-6 lg:px-8 mt-2">
            {data && (
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 min-h-[60vh]">
                {data.map((item, index) => (
                  <div key={index}>
                    <ProductCard data={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
          {renderPagination && !isFetching && (
            <Pagination
              page={page}
              prev={prevPage}
              next={nextPage}
              productLength={data?.length}
            />
          )}
        </>
      ) : (
        <div className="flex w-full justify-center flex-col items-center min-h-[70vh] gap-3 text-center">
          <p className="text-[22px] text-gray-400 max-w-md">
            we are sorry, the product you requested could not be found.
          </p>
          <button
            onClick={() => {
              route.replace("/");
            }}
            className="bg-blue-500 p-3 border-r-2 rounded-xl text-white"
          >
            Go to Home
          </button>
        </div>
      )}
    </>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="w-full">
        <Search />
      </div>
    </Suspense>
  );
};

export default SearchPage;
