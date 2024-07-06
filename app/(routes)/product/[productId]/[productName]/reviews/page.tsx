// parent component of reviewform, this component is for writing review

"use client";
import useCheckEligibleForReview from "@/hooks/useCheckEligibleForReview";
import { useRouter } from "next/navigation";

import ReviewForm from "./components/ReviewForm";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";

const Review = ({
  params,
}: {
  params: {
    productId: string;
    productName: string;
  };
}) => {
  // check if user is eligible to review the product
  const { data: isEligable, isLoading } = useCheckEligibleForReview(
    params.productId
  );
  const router = useRouter();

  if (isEligable === false) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-2xl font-semibold">
          You are not eligible to review this product.
        </h1>
        <Button
          className="text-lg"
          onClick={() =>
            router.push(`/product/${params.productId}/${params.productName}`)
          }
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <>
      {isLoading && <Loader />}
      {isEligable !== false && isEligable !== undefined && (
        <ReviewForm productId={params.productId} />
      )}
    </>
  );
};
export default Review;
