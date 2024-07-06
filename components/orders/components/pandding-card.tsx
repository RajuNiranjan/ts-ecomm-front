// this is pandding card for user order page

import React from "react";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { format } from "date-fns";
import { Order } from "@/type";

type panddingcardProps = {
  data: Order;
};

const Pandding: React.FC<panddingcardProps> = ({ data }) => {
  return (
    <>
      <Card className="p-2 border-2 border-gray-200 mb-3">
        <CardHeader>
          <CardTitle className="text-[12px] sm:text-[16px] text-center text-gray-400">
            Order Id :- {data.id}
          </CardTitle>
        </CardHeader>
        <CardDescription className="text-center text-[16px] font-medium mb-2">
          Order Detail
        </CardDescription>

        <CardContent>
          {data.orderItems.map((item, index) => (
            <div key={index}>
              <div className="flex flex-col sm:flex-row items-center gap-x-6 text-[15px]">
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="mr-4">
                    <Image
                      // src={item.product.Images[0].url}
                      src={
                        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      width={250}
                      height={250}
                      className="w-[50] h-[50] sm:w-[200] sm:h-[200]"
                      alt={item.product.name}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <p>name :- &nbsp;{item.product.name}</p>
                  </div>
                  <div>
                    <p>Qty :- &nbsp; {item.quantity}</p>
                  </div>
                  <div>
                    <p> size :- &nbsp;{item.size}</p>
                  </div>
                  <div className="flex ">
                    color :- &nbsp;
                    <div
                      key={index}
                      className="h-6 w-6 rounded-full border"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              </div>
              <hr className="my-2" />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          {data.createdAt && (
            <div className="flex-col gap-2  items-center text-[10px] sm:text-[14px]">
              <div className="flex gap-2">
                <p className="">Order At:</p>
                <p>
                  {format(new Date(data.createdAt), "MMMM do, yyyy").toString()}
                </p>
              </div>
              <p>Status :- Panding</p>
            </div>
          )}
        </CardFooter>
      </Card>
    </>
  );
};
export default Pandding;
