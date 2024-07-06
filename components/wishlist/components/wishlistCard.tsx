import React, { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/type";
import Image from "next/image";
import { Star, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { removeFromWishList } from "@/lib/wishlist";
import useWishlist from "@/hooks/store/wishlist";

interface Props {
  data: Product;
}

const WishlistItem = (props: Props) => {
  const { data } = props;
  const router = useRouter();
  const { wishlist, setWishlist } = useWishlist();

  const handleClick = () => {
    router.push(`/product/${data.id}/${data.name}`);
  };

  const totalRating = data.rewiews.reduce(
    (sum, review) => sum + review.rating,
    0
  );
  const averageRating = totalRating / data.rewiews.length;
  return (
    <Card className="p-3">
      <CardContent className="w-full p-2">
        <div className="w-full flex flex-col sm:flex-row gap-5 cursor-pointer hover:text-blue-400">
          <Image
            src={data.Images[0].url}
            alt={data.name}
            width={100}
            height={100} // You can adjust the height accordingly
            onClick={handleClick}
            className="w-full sm:w-[100px] h-[150px] "
          />
          <div className="flex justify-between w-full pb-2">
            <div onClick={handleClick} className="w-full">
              <p>
                {data.name} {data.description}
              </p>
              <div className="flex gap-2 mt-1">
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
                  ({data.rewiews.length})
                </p>
              </div>
              <p className="mt-3 text-[20px] text-[#212121] font-bold">
                ₹ {data.price}
              </p>
            </div>
            <Trash2
              className=" text-gray-500 hover:text-red-500 self-end sm:self-start"
              onClick={() => {
                const newWishlist = wishlist.filter(
                  (each) => each.id !== data.id
                );
                setWishlist(newWishlist);
                removeFromWishList(data.id);
              }}
            />
          </div>
        </div>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  );
};

export default WishlistItem;
