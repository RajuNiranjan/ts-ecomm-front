// user reviews page
"use client"

import Container from '@/components/ui/container';
import React from 'react';
import { useGetUserReviews } from '@/hooks/useGetUserReviews';
import ReviewCard from './components/ReviewCard';
import useCurrentUser from '@/hooks/useCurrentUser';
import { Loader } from '@/components/ui/loader';




const ReviewsPage:React.FC= () => {

  // get user reviews
    const {data:reviews,isLoading:reviewsLoading}=useGetUserReviews()
    // get current user
    const {data:user,isLoading}=useCurrentUser()
    if(reviewsLoading) {
      return(
        <Loader />
      )
    }
    if(!user && !isLoading){
     <div className="flex flex-col items-center justify-center h-screen">
                      <h1 className="text-2xl font-semibold">You are not eligible to access this page.</h1>
                    
     </div>
    }
  return (
    <Container>
      <div className="">
       <h1 className='text-center text-xl font-medium  mt-20 md:mt-0'>Reviews</h1>
        <div className='flex sm:justify-start md:justify-center gap-5 border-b-2 border-gray-300 mb-2 p-2 cursor-pointer mt-12 md:mt-0'>
          <div className='flex-col items-center' >
          {reviews?.map((data,index)=>(
              <ReviewCard key={index} data={data}/>
            ))}
            </div>
        </div>
      </div>
    </Container>
  );
};
export default ReviewsPage;