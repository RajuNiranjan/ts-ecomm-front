// this is pandding card for user order page

import React from 'react';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { format } from 'date-fns';
import { Order } from '@/type';

type panddingcardProps = {
    data:Order
    
};

const Pandding:React.FC<panddingcardProps> = ({data}) => {
    
    return (
        <>
        <Card className='p-2 border-2 border-gray-200 mb-3'>
        <CardHeader>
            <CardTitle>{data.id}</CardTitle>
        </CardHeader>
            <CardDescription className='text-center text-lg font-medium mb-2'>Order Detail</CardDescription>
            
        <CardContent>
         {data.orderItems.map((item,index)=>(
                <div key={index}>
                <div className="flex items-center gap-x-6">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <Image src={item.product.Images[0].url} width={50} height={50} alt={item.product.name}/>
                        </div>
                        <div>
                            <p>{item.product.name}</p>
                        </div>
                    </div>
                    <div>
                       <p>{item.quantity}</p>
                    </div>
                    <div>
                        <p>{item.size}</p>
                    </div>
                    <div>
                    <div key={index} className="h-6 w-6 rounded-full border" style={{ backgroundColor: item.color}} />
                    </div>
                </div>
                <hr className="my-2"/>
                </div>
         ))}

        </CardContent>
        <CardFooter>
            {data.createdAt && (
                <div className="flex gap-2  items-center">
                    <p>Order At:</p>
                    <p>{format(new Date(data.createdAt), 'MMMM do, yyyy').toString()}</p>
                </div>
            )}
        </CardFooter>
        </Card>
        </>
    )
}
export default Pandding;