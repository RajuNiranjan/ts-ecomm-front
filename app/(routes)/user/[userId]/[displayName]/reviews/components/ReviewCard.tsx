// Desc: Review card component for user reviews page
import React, { useState } from 'react';

import LocalStorageManager from '@/lib/LocalStorageManager';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import Rating from '@/components/ui/rating';
import { AlertModal } from '@/components/modal/alert-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Review } from '@/type';

type ReviewCardProps = {
    data:Review; 
};

const ReviewCard:React.FC<ReviewCardProps> = ({data}) => {
    const router = useRouter();
    const [open,setOpen] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(false)
  const handleDelete=()=>{
    const token =LocalStorageManager.getItemWithExpiration('token');
    setLoading(true)
    axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/review/${data.id}/${process.env.NEXT_PUBLIC_STORE_ID}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(()=>{
        setLoading(false)
        setOpen(false)
        toast.success('Review deleted successfully')
        router.push('/')
    }).catch(()=>{
        setLoading(false)
        setOpen(false)
        toast.error('An error occured')
    })
  }
    
    return (
      <>
      <AlertModal
      isOpen={open}
        onClose={()=>setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
       />
        <Card className='p-2 border-2 border-gray-200 mb-3'>
        <CardHeader>

            <div className="flex justify-between items-center gap-5">
                <CardTitle className='text-center'>{data.id}</CardTitle>
            {data && 
             <Button variant='destructive'
             size={'icon'}
             onClick={()=>{setOpen(true)}}
             >
              <Trash className='h-4 w-4'/>
             </Button>
            } 
            </div>
        </CardHeader>
        <CardContent>
                <div >
                <div className="flex justify-center items-center gap-x-6">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <Image src={data.product?.Images[0]?.url} width={50} height={50} alt={data.product.name}/>
                        </div>
                        <div className='cursor-pointer' onClick={()=>router.push(`/product/${data.product.id}/${data.product.name}`)}>
                            <p>{data.product.name}</p>
                        </div>
                    </div>
                </div>
                <hr className="my-2"/>
                </div>
                <CardDescription className='text-center text-lg font-medium mb-2'>Review Details</CardDescription>
                <div className="flex justify-center items-center">
                  
                        <div className="flex-col mr-4">
                            <div>
                           <Rating value={data.rating}/>
                            </div>
                            <div className='flex items-center gap-5 '>
                                <Image src={data?.images[0]?.url} width={50} height={50} alt={data.product.name}/>
                            <div>
                                <p>{data.comment}</p>
                            </div>
                            </div>
                        </div>

                
                </div>

        </CardContent>
        </Card>
      </>
    )
}
export default ReviewCard;