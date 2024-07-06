// show product review
import Gallery from "@/components/gallery";
import Rating from "@/components/ui/rating";
import { Review } from "@/type";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type reviewitemProps = {
  data: Review;
};

const ReviewItem: React.FC<reviewitemProps> = ({ data }) => {
  const url = data.user.avatarUrl ? data.user.avatarUrl : "/person.png";
  return (
    <div className={`flex items-center justify-start mb-2 p-2`}>
      <div className=" w-full p-5">
        <div className="flex gap-2 items-center">
          <Image
            src={url}
            alt={data.user.displayName}
            width={36}
            height={36}
            className="w-[36px] h-[36px] rounded-[18px]"
          />
          <Rating value={data.rating} />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-500">
            by {data.user.displayName}
          </p>
        </div>
        <div>
          <p className="text-lg  text-neutral-700">{data.comment}</p>
        </div>
        <div className="">
          <p className="text-lg text-gray-500">
            {" "}
            {format(new Date(data.createdAt), "MMMM do, yyyy").toString()}
          </p>
        </div>

        <div className=""></div>
      </div>
    </div>
  );
};
export default ReviewItem;
