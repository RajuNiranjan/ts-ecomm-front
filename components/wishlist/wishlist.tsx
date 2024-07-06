import React, { Fragment } from "react";
import WishlistItem from "./components/wishlistCard";
import useGetProducts from "@/hooks/useGetProducts";
import useGetBestSelling from "@/hooks/useGetBestSelling";
import useGetWishList from "@/hooks/useGetWishList";
import Image from "next/image";
import { Loader } from "../ui/loader";
import { useRouter } from "next/navigation";
import useWishlist from "@/hooks/store/wishlist";

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const router = useRouter();

  return (
    <>
      <div className="">
        {wishlist?.map((each, index) => (
          <Fragment key={index}>
            <WishlistItem data={each} />
          </Fragment>
        ))}
        {wishlist === undefined ||
          (wishlist.length === 0 && (
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/mywishlist-empty.png"
                alt="Empty"
                width={200}
                height={200}
              />
              <p className="text-[18px] text-[#212121] font-semibold">
                Empty Wishlist
              </p>
              <p className="text-[14px] text-gray-500">
                You have no items in your wishlist.{" "}
                <span
                  className="hover:text-blue-400 underline cursor-pointer"
                  onClick={() => router.push("/")}
                >
                  {"Start adding!"}
                </span>
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Wishlist;
