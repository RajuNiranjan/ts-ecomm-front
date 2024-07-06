// single product page
"use client";
import Info from "@/components/Info";
import ProductList from "@/components/ProductList";
import Gallery from "@/components/gallery";
import Container from "@/components/ui/container";
import useGetProduct from "@/hooks/useGetProduct";
import useGetProducts from "@/hooks/useGetProducts";
import FloatingButton from "@/components/floatingbtn";
import React, { useState } from "react";
import Reviews from "./components/reviews";
import { Loader } from "@/components/ui/loader";
import Pagination from "@/components/ui/Pagination";
import useCompareProducts from "@/hooks/store/compareProduct";

type pageProps = {
  params: {
    productId: string;
  };
};

const Productpage: React.FC<pageProps> = ({ params }) => {
  const [page, setPage] = useState<number>(1);
  // get product by id
  const { data, isLoading } = useGetProduct(params.productId);
  // get suggested products base on current product category
  const { data: suggestedProducts, isLoading: suggestedProduct } =
    useGetProducts({
      page: page,
      "category[name]": data?.category.name,
    });
  const { products } = useCompareProducts();

  if (isLoading || suggestedProduct) {
    return <Loader />;
  }
  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <>
      <div className="bg-white mt-12 md:mt-0 relative">
        <Container>
          <div className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {data && <Gallery images={data.Images} />}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                {data && <Info data={data} />}
              </div>
            </div>
            {/** reviews */}
            <div className="mt-10">
              {data && <Reviews id={params.productId} />}
            </div>
            <hr className="my-10" />
          
            {data && suggestedProducts && (
              <ProductList
                title="Related Items"
                items={suggestedProducts.products}
              />
            )}
            {suggestedProducts?.products?.length !== undefined &&
              suggestedProducts?.products?.length >= 2 && (
                <div className="flex items-center mb-2 mt-5 justify-center">
                  <Pagination
                    page={page}
                    prev={prevPage}
                    next={nextPage}
                    productLength={suggestedProducts?.products?.length}
                  />
                </div>
              )}
          </div>
        </Container>

        {products.length >= 1 && <FloatingButton />}
      </div>
    </>
  );
};
export default Productpage;
