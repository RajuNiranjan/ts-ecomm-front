// Desc: Review card component for user reviews page
import React, { useState } from "react";

import LocalStorageManager from "@/lib/LocalStorageManager";
import { useRouter } from "next/navigation";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Rating from "@/components/ui/rating";
import { AlertModal } from "@/components/modal/alert-modal";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Review } from "@/type";

type ReviewCardProps = {
  data: Review;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setshow] = useState(false);
  const handleDelete = () => {
    const token = LocalStorageManager.getItemWithExpiration("token");
    setLoading(true);
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/review/${data.id}/${process.env.NEXT_PUBLIC_STORE_ID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        setOpen(false);
        toast.success("Review deleted successfully", {
          toastId: "Review deleted successfully",
        });
        router.push("/");
      })
      .catch(() => {
        setLoading(false);
        setOpen(false);
        toast.error("An error occured", { toastId: "An error occured" });
      });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
      <Card className="p-2 border-2 border-gray-200 mb-3 ">
        <CardHeader>
          <div className="flex flex-col  gap-5">
            {data && (
              <button
                className=""
                onClick={() => {
                  setOpen(true);
                }}
                style={{ alignSelf: "flex-end" }}
              >
                <Trash className=" h-[18px] w-[18px] sm:h-4 sm:w-4" />
              </button>
            )}
            <CardTitle className="text-center text-gray-400 text-[14px] sm:text-[18px]">
              Order Id :- {data.id}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="w-full" style={{ width: "100%" }}>
          <div className="">
            <div className="flex justify-center items-center gap-x-6">
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <div
                  className="mr-4"
                  onClick={() =>
                    router.push(
                      `/product/${data.product.id}/${data.product.name}`
                    )
                  }
                >
                  <Image
                    src={data.product?.Images[0]?.url}
                    width={150}
                    height={150}
                    style={{ height: "150px", width: "150px" }}
                    alt={data.product.name}
                  />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/product/${data.product.id}/${data.product.name}`
                    )
                  }
                >
                  <p className="text-[14px] sm:text-[18px] text-center">
                    {data.product.name}
                  </p>
                </div>
              </div>
            </div>
            <hr className="my-2" />
          </div>
          <div className="w-full">
            <CardDescription className=" text-[14px] sm:text-[18px] text-bold  mb-2 w-full">
              Review Details
            </CardDescription>
          </div>
          <div className="flex  items-center  w-full ">
            <div className="flex-col w-full">
              <div className="w-full">
                <div className="flex gap-2  flex-wrap items-center text-[12px] sm:text-[18px]">
                  <span className="font-semibold">Rating</span> &nbsp;:- &nbsp;
                  <Rating value={data.rating} />
                </div>
                <p className="text-[12px] sm:text-[12px] w-ful">
                  <span className="font-semibold text-[18px]">
                    comment &nbsp; :-
                  </span>{" "}
                  {data.comment}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default ReviewCard;
