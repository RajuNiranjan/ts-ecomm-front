"use client";
import Pagination from "@/components/ui/Pagination";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import useGetCategoryById from "@/hooks/useGetCategoryById";
import useGetProducts from "@/hooks/useGetProducts";
import { Product } from "@/type";
import React, { useEffect, useState } from "react";

import { Search } from "lucide-react";

import Rating from "@/components/ui/rating";
import { toast } from "react-toastify";
import useCompareProducts from "@/hooks/store/compareProduct";
import FloatingButton from "@/components/floatingbtn";

type pageProps = {
  params: {
    categoryId: string;
    categoryName: string;
  };
};

const Demodata = {
  id: "",
  name: "abcdfsg",
  price: 120,
  description: "nothing",
  isFeatured: false,
  category: {
    id: "",
    name: "",
    gender: "",
    imageUrl:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    billboard: {
      id: "",
      title: "",
      description: "",
      imageUrl:
        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  Images: [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  Sizes: [
    {
      id: "1",
      value: "M",
    },
    {
      id: "2",
      value: "L",
    },
  ],
  Colors: [
    {
      id: "1",
      value: "red",
      name: "Red",
    },
  ],
  rewiews: [],
};

const Category: React.FC<pageProps> = ({ params }) => {
  const [mounted, setMounted] = useState<boolean>(true);
  const encodedString = params.categoryName;
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [rating, setRating] = useState<number>(1);
  const [price, SetPrice] = useState({
    min: 500,
    max: 1000,
  });

  const onSearch = () => {};

  // remove %20 from string
  const decodedString = decodeURIComponent(encodedString);
  // get products by category
  const {
    data,
    isFetching,
    isLoading: categoriesProductLoader,
  } = useGetProducts({
    "category[name]": decodedString,
    page: page,
    rating,
    maxPrice: price.max,
    minPrice: price.min,
  });

  // get category by id
  const { data: categoryData, isLoading } = useGetCategoryById(
    params.categoryId
  );
  // fixed bug when refresh page

  const [category, setCategrory] = useState(categoryData);

  const {
    products,
    setCompareProducts,
    removeProduct,
    categoryId,
    setCategoryId,
  } = useCompareProducts();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCategrory(categoryData);
  }, [price, rating]);

  if (!mounted) return null;
  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };
  if (isLoading || categoriesProductLoader) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-white flex flex-col  sm:flex-row sm:justify-center p-4 container  my-10">
        <div className="sm:w-1/2 sm:max-w-[200px] flex flex-col  px-3">
          {/* <div className="flex p-1 gap-1 items-center border-2">
            <form onSubmit={onSearch} className="w-full">
              <Input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="search"
                placeholder="Search"
                className="border-none"
              />
            </form>
            <Search />
          </div> */}
          {/* Filter */}
          <div className="my-3]">
            <h6 className="text-[24px] font-semibold">Filter</h6>
            <hr className="my-2 border-t-2 border-gray-400" />
            <div className="">
              <p className="text-[18px] font-[400]">Rating</p>
              <hr className=" border-gray-200 mb-2" />

              <div className="flex-col">
                <div className="flex gap-2">
                  <input
                    type="range"
                    min={1}
                    max={4}
                    value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value, 10))}
                  />
                  <p>{rating}</p>
                </div>
                <div className="flex items-center">
                  <Rating value={rating} /> &nbsp; & more
                </div>
              </div>
            </div>
            <div className="mt-2">
              <p>Price </p>
              <hr className="h-1 text-gray-200" />
              <form onSubmit={onSearch} className="flex gap-3 my-2">
                <Input
                  onChange={(e) =>
                    SetPrice({ ...price, min: parseInt(e.target.value) })
                  }
                  value={price.min}
                  type="number"
                  placeholder="Min"
                  className=""
                  min={500}
                />
                <Input
                  onChange={(e) =>
                    SetPrice({ ...price, max: parseInt(e.target.value) })
                  }
                  value={price.max}
                  type="number"
                  placeholder="Max"
                  className=""
                  min={1000}
                />
              </form>
            </div>
            {/* <div className="mt-5">
              <button className="border-2 px-1 py-1">Apply</button>
            </div> */}
          </div>
        </div>

        {/*products */}
        <div className="w-full">
          {category && <Billboard data={category.billboard} />}
          <div className="px-4 sm:px-6 lg:px-8 pb-24 ">
            <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
              <div className="mt-6 lg:col-span-4 lg:mt-0">
                <p className="ml-3 font-semibold text-[32px]">Products</p>
                {data?.products?.length === 0 && (
                  <div className="flex flex-col gap-3">
                    <NoResults />
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          window.location.replace("/");
                        }}
                        className="bg-blue-500 p-3 border-r-2 rounded-xl text-white">
                        Go to Home
                      </button>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data?.products?.map((item: Product) => {
                    const isinCompare = products.filter(
                      (each) => each.id === item.id
                    );
                    return (
                      <div className="flex flex-col" key={item.id}>
                        <ProductCard data={item} />
                        <div className="flex gap-2 items-center self-center">
                          <input
                            type="checkbox"
                            id="compare"
                            checked={isinCompare.length >= 1}
                            className="w-[14px] h-[14px]"
                            onClick={() => {
                              if (
                                categoryId === item.category.id ||
                                categoryId === null
                              ) {
                                if (categoryId === null) {
                                  setCategoryId(item.category.id);
                                  if (isinCompare.length >= 1) {
                                    removeProduct(item.id);
                                  } else {
                                    setCompareProducts(item);
                                  }
                                } else {
                                  if (isinCompare.length >= 1) {
                                    removeProduct(item.id);
                                  } else {
                                    setCompareProducts(item);
                                  }
                                }
                              } else {
                                toast.error(
                                  "You can only compare similar products",
                                  {
                                    toastId:
                                      "You can only compare similar products",
                                  }
                                );
                              }
                            }}
                          />
                          <label htmlFor="compare">compare</label>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {data?.products?.length !== undefined &&
                  data?.products?.length >= 2 && (
                    <Pagination
                      page={page}
                      prev={prevPage}
                      next={nextPage}
                      productLength={data?.products?.length}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {products.length >= 1 && <FloatingButton />}
    </>
  );
};
export default Category;
