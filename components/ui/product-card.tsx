// this component is used to display product card in product list page
"use client";
import React, { useEffect, useState, MouseEventHandler, Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import IconButton from "./icon-button";
import { Expand, Heart, Eye, Share2 } from "lucide-react";
import Currency from "./currency";
import usePreviewModal from "@/hooks/modal/usePreviewModal";
import Rating from "./rating";
import { Product } from "@/type";
import useCart from "@/hooks/useCart";
import useCurrentUser from "@/hooks/useCurrentUser";
import useAuthModal from "@/hooks/modal/useAuthModal";

import useGetWishList from "@/hooks/useGetWishList";
import { addToWishList, removeFromWishList } from "@/lib/wishlist";
import LocalStorageManager from "@/lib/LocalStorageManager";
import useWishlist from "@/hooks/store/wishlist";
import ShareDialog from "../ShareDialog";

type productcartProps = {
  data: Product;
};

const ProductCard: React.FC<productcartProps> = ({ data }) => {
  const [mounted, setIsMounted] = useState<boolean>(false);
  const [isinWishList, setIsInWishlist] = useState(false);

  const { wishlist, setWishlist } = useWishlist();

  // calculate average rating
  const totalRating = data.rewiews.reduce(
    (sum, review) => sum + review.rating,
    0
  );

  const averageRating = totalRating / data.rewiews.length;
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const cart = useCart();
  const previewModal = usePreviewModal();
  const authModal = useAuthModal();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const isFound = wishlist?.filter((each) => each.id === data.id);

  useEffect(() => {
    if (isFound && isFound[0]?.id === data.id) {
      setIsInWishlist(true);
    } else {
      setIsInWishlist(false);
    }
  }, [wishlist, data.id]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!mounted) return null;
  const hanleClick = () => {
    router.push(`/product/${data.id}/${data.name}`);
  };
  // product preview
  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (!user) {
      authModal.onOpen();
      return;
    }

    cart.addItem({
      id: data.id,
      quantity,
      size: selectedValue,
      color: selectedColor,
      price: data.price,
      name: data.name,
      image: data.Images?.[0]?.url,
    });
  };

  return (
    <>
      <div className="bg-white group cursor-pointer  p-3 space-y-4 text-center">
        <div className="aspect-square rounded-xl bg-gray-100 relative">
          <Image
            src={data.Images?.[0]?.url}
            alt="E-commerce"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="aspect-w-16 aspect-h-9 object-cover rounded-md"
            onClick={hanleClick}
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute px-3 top-0 right-0">
            <div className="flex py-3 flex-col gap-x-6 justify-center gap-5">
              <IconButton
                onClick={() => {
                  if (!user) {
                    authModal.onOpen();
                    return;
                  }
                  if (isinWishList) {
                    const newWishlist = wishlist.filter(
                      (each) => each.id !== data.id
                    );
                    setWishlist(newWishlist);
                    removeFromWishList(data.id);
                    setIsInWishlist(false);
                  } else {
                    setWishlist([...wishlist, data]);
                    addToWishList(data.id);
                    setIsInWishlist(true);
                  }
                }}
                icon={
                  isinWishList ? (
                    <Heart
                      size={15}
                      className="text-[#fb641b]"
                      fill="#fb641b"
                    />
                  ) : (
                    <Heart size={15} className="text-gray-600" />
                  )
                }
              />
              <IconButton
                onClick={onPreview}
                icon={<Eye size={15} className="text-gray-600" />}
              />
              <ShareDialog data={data} />
            </div>
          </div>
        </div>
        <div>
          <div>
            <p className="font-semibold text-lg">{data.name}</p>
            <p className="text-sm text-gray-500">{data.category?.name}</p>
          </div>
          {/* Price & Reiew */}
          <div className="flex-col mx-2 items-center mt-1 ">
            {Number.isNaN(averageRating) ? (
              <p className="text-[12px]">Give First Rating</p>
            ) : (
              // <Rating value={5} />
              <div className="flex justify-center gap-2 items-center mt-2">
                <Rating value={averageRating} />
                <p className="text-[12px]">{data.rewiews.length}</p>
              </div>
            )}
            <Currency value={data?.price} />
          </div>
          {!data.isFeatured && (
            <div className="text-[10px] mt-3 ">
              <button
                onClick={onPreview}
                className="p-2 border group-hover:bg-blue-900 group-hover:text-white">
                ADD TO CART
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ProductCard;
