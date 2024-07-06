// home page
"use client";
//
export const revalidate = 0;

import { useEffect, useMemo, useState } from "react";
import useGetAllBillboards from "@/hooks/useGetAllBillboards";

import Billboards from "@/components/Billboards";
import ProductList from "@/components/ProductList";

import { Loader } from "@/components/ui/loader";
import useGetMenCategories from "@/hooks/useGetMenCategories";
import useGetWomenCategories from "@/hooks/useGetWomenCategories ";
import React from "react";
import useGetProducts from "@/hooks/useGetProducts";

import Services from "@/components/services";
import Image from "next/image";
import DiscoverCollections from "@/components/Discover-collections";
import Categories from "@/components/Categories";
import useUserAddress from "@/hooks/useGetAddress";
import useGetBestSelling from "@/hooks/useGetBestSelling";
import useGetCountryDetails from "@/hooks/useGetCountryDetails";
import useGetWishList from "@/hooks/useGetWishList";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Autoplay,
  Pagination,
  Navigation,
  Scrollbar,
  A11y,
} from "swiper/modules";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [showButton, setShowButton] = useState<boolean>(false);
  const { data: billboard, isLoading } = useGetAllBillboards();
  //get all categories for men
  const { data: mancategories, isLoading: mancategoriesLoading } =
    useGetMenCategories();

  const {} = useGetCountryDetails();

  const { data: womancategories, isLoading: womanscategoriesLoading } =
    useGetWomenCategories();
  const { data: fetchedAddress, isLoading: fetingaddress } = useUserAddress();
  

  const {
    data: FeaturedproductsData,
    isLoading: FeaturedproductsLoading,
    isPreviousData,
  } = useGetProducts({
    page: page,
    isFeatured: true,
  });

  const { data: bestSellingProducts, isLoading: bestLoading } =
    useGetBestSelling();

  const { data: productsData, isLoading: productsLoading } = useGetProducts({
    page: page,
    isFeatured: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setShowButton(true);
    }, 2000);
  });

  const mergedData = useMemo(() => {
    return {
      billboard,
      // mancategories,
      // womancategories,
    };
  }, [billboard]);

  const totalPages = productsData?.pagination?.total_pages || 0;
  const totalPagesArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  if (
    isLoading ||
    productsLoading ||
    FeaturedproductsLoading ||
    mancategoriesLoading ||
    womanscategoriesLoading
  ) {
    return <Loader />;
  }

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <>
      {showButton ? (
        <div className="px-5 sm:px-10 md:px-20">
          {mergedData.billboard && <Billboards data={mergedData.billboard} />}

          <>
            {/* {mergedData.mancategories && (
            <ManCategories
              data={mergedData.mancategories}
              title="Men Categories"
            />
          )} */}
            {/* {mergedData.womancategories && (
            <WomanCategories
              data={mergedData.womancategories}
              title="Women Categories"
            />
          )} */}
            {bestSellingProducts && (
              <ProductList items={bestSellingProducts} title="BEST SELLING" />
            )}
            {/* <div className="flex flex-col md:flex-row gap-4 my-4">
              <Image
                src="/offer-img-1.png"
                width={220}j
                height={80}
                alt="offer"
                className="w-full sm:w-1/2"
              />
              <Image
                src="/offer-img-2.png"
                width={220}
                height={150}
                alt="offer"
                className="w-full sm:w-1/2"
              />
            </div> */}
            <div className="my-5">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                spaceBetween={50}
                slidesPerView={2}>
                <SwiperSlide className="w-[650px] h-[150px]">
                  <Image
                    src="/offer-img-1.png"
                    alt="offer"
                    width={200}
                    height={150}
                    className="w-full"
                  />
                </SwiperSlide>
                <SwiperSlide className="w-[650px] h-[150px]">
                  <Image
                    src="/offer-img-2.png"
                    alt="offer"
                    width={200}
                    height={150}
                    className="w-full"
                  />
                </SwiperSlide>
                <SwiperSlide className="w-[650px] h-[150px]">
                  <Image
                    src="/offer-img-1.png"
                    alt="offer"
                    width={200}
                    height={150}
                    className="w-full"
                  />
                </SwiperSlide>
                <SwiperSlide className="w-[650px] h-[150px]">
                  <Image
                    src="/offer-img-2.png"
                    alt="offer"
                    width={200}
                    height={150}
                    className="w-full"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            {productsData?.products && (
              <ProductList items={productsData?.products} title="RECENT" />
            )}
            {mancategories && (
              <Categories data={mancategories} title="EXPLORE MEN'S WEAR" />
            )}
            {womancategories && (
              <Categories data={womancategories} title="EXPLORE WOMEN WEAR" />
            )}
            {FeaturedproductsData?.products && (
              <ProductList
                items={FeaturedproductsData?.products}
                title="FEATURED"
              />
            )}
            <DiscoverCollections />
            <Services />
          </>
          {/* {productsData?.products && (
          <ProductList
            items={productsData?.products}
            title="Feature Prouducts"
          />
        )} */}

          {/* {showButton && productsData?.products && (
          <div className="flex items-center mb-2 mt-5 justify-center gap-5 p-2">
            <Button onClick={prevPage} disabled={isPreviousData || page === 1}>
              &lt;&lt;
            </Button>
            {totalPagesArray.map((page, index) => (
              <NumberPagination key={page} page={page} setPage={setPage} />
            ))}
            <Button
              onClick={() => {
                setPage(totalPages);
              }}
              disabled={isPreviousData || page === totalPages}
            >
              &gt;&gt;
            </Button>
          </div>
        )} */}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
