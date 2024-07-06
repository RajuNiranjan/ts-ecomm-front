// user reviews page
"use client";

import Container from "@/components/ui/container";
import React from "react";
import { useGetUserReviews } from "@/hooks/useGetUserReviews";
import ReviewCard from "./components/ReviewCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import { RiseLoader } from "react-spinners";

const ReviewsPage: React.FC = () => {
  // get user reviews
  const { data: reviews, isLoading: reviewsLoading } = useGetUserReviews();
  // get current user
  const { data: user, isLoading } = useCurrentUser();

  if (!user && !isLoading) {
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold">
        You are not eligible to access this page.
      </h1>
    </div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full max-h-[80vh] min-h-[50vh]">
        <RiseLoader color={"#F33A6A"} />
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center w-full max-h-[80vh] min-h-[50vh]">
          <RiseLoader color={"red"} />
        </div>
      ) : (
        <Container>
          <div className="flex-col flex gap-2">
            <h1 className="text-center text-xl font-medium mb-5  sm:mt-20 md:mt-0">
              Reviews
            </h1>
            {/*flex sm:justify-start md:justify-center gap-5 border-b-2 border-gray-300 mb-2 p-2 cursor-pointer mt-12 md:mt-0 */}
            <div className=" ">
              <div className="flex-col justify-center flex-wrap gap-3 items-center w-full max-h-[80vh] overflow-y-scroll">
                {reviews?.map((data, index) => (
                  <ReviewCard key={index} data={data} />
                ))}
              </div>
              {reviews?.length === 0 && (
                <p className="text-center">No Rivews Found</p>
              )}
            </div>
          </div>
        </Container>
      )}
    </>
  );
};
export default ReviewsPage;
