"use client";
import useWishlist from "@/hooks/store/wishlist";
import Image from "next/image";
import React, { MouseEventHandler, useEffect } from "react";
import Container from "../ui/container";
import { ShoppingCart, Star, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import useAuthModal from "@/hooks/modal/useAuthModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePreviewModal from "@/hooks/modal/usePreviewModal";
import useGetWishList from "@/hooks/useGetWishList";
import axios from "axios";
import LocalStorageManager from "@/lib/LocalStorageManager";
import useCompareProducts from "@/hooks/store/compareProduct";

const CompareProduct = () => {
  const authModal = useAuthModal();
  const { data: user } = useCurrentUser();
  const previewModal = usePreviewModal();
  const { setCompareProducts, products, removeProduct } = useCompareProducts();

  return (
    <Container>
      <div className="min-h-[50vh] my-5 p-3 overflow-x-auto">
        <h3 className="text-[28px] font-semibold my-3">Compare Product</h3>
        {products.length >= 1 ? (
          <div className="flex  ">
            {products.map((eachProduct, index) => {
              const total = eachProduct.rewiews?.reduce(
                (sum, review) => sum + review.rating,
                0
              );
              const averageRating = total / eachProduct.rewiews?.length;
              return (
                <div
                  key={index}
                  className="flex flex-col px-1 sm:px-4 gap-4   border border-r-1 border-gray-300 border-t-0 border-l-0 border-b-0"
                  style={{ minWidth: "250px", maxWidth: "250px" }}
                >
                  <XCircle
                    className="self-end w-[18px] h-[18px] "
                    onClick={() => {
                      removeProduct(eachProduct.id);
                    }}
                  />
                  <Image
                    src={
                      eachProduct?.Images?.length >= 1
                        ? eachProduct.Images[0].url
                        : "/product.png"
                    }
                    alt={eachProduct.name}
                    width={100}
                    height={100}
                    className="self-center w-[100px] h-[100px]"
                  />
                  <div
                    className={`text-[12px] flex flex-col justify-center items-center text-[#212121] mt-2 font-roboto w-full h-[80px] overflow-hidden`}
                  >
                    {/* {eachProduct.name} , {eachProduct.description}... */}
                    {eachProduct.name}, {eachProduct.description},
                  </div>

                  <div className=" flex flex-col  gap-2  w-full px-2">
                    <p className="tex-[20px] font-extrabold">
                      ₹{eachProduct.price}
                    </p>
                    <Button
                      className="flex items-center gap-x-2 w-full text-[12px]"
                      onClick={() => {
                        if (!user) {
                          authModal.onOpen();
                          return;
                        }
                        previewModal.onOpen(eachProduct);
                      }}
                    >
                      {" "}
                      <ShoppingCart size={20} />
                      Add To Cart
                    </Button>
                  </div>
                  <p className="bg-gray-200 p-1 ">Rating</p>
                  <div className="flex justify-center gap-2 mt-1">
                    <div
                      className="flex bg-[#388e3c] rounded-[4px] tex-[12px] text-white items-center pl-[6px] pr-[4px] py-[2px] gap-1"
                      style={{ maxWidth: "max-content" }}
                    >
                      <p>{Number.isNaN(averageRating) ? 0 : averageRating}</p>
                      <Star
                        className="w-[12px] h-[12px] "
                        fill="#fff"
                        color="#fff"
                      />
                    </div>
                    <p className="text-gray-500 font-semibold">
                      ({eachProduct.rewiews?.length})
                    </p>
                  </div>
                  <p className="bg-gray-200 p-1 ">Color</p>
                  <div className="flex justify-center gap-1">
                    {eachProduct.Colors?.map((color, index) => (
                      <div
                        key={index}
                        className={`border border-black-200 w-[16px] h-[16px] my-2`}
                        style={{ backgroundColor: color.value }}
                      ></div>
                    ))}
                  </div>
                  <p className="bg-gray-200 p-1 ">size available</p>
                  <div className="flex justify-center gap-1">
                    {eachProduct.Sizes?.map((each, index) => (
                      <p className="text-[10px]" key={index}>
                        {each.value}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          products === undefined ||
          (products.length === 0 && (
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/mywishlist-empty.png"
                alt="Empty"
                width={200}
                height={200}
              />
              <p className="text-[18px] text-[#212121] font-semibold">
                Empty List
              </p>
              <p className="text-[14px] text-gray-500">
                You have no items to Compare.{" "}
                <span
                  className="hover:text-blue-400 underline cursor-pointer"
                  onClick={() => window.location.replace("/")}
                >
                  {"Start adding!"}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </Container>
  );
};

export default CompareProduct;
