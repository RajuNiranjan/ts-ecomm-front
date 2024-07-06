// this is pandding card for user order page

import React, { useEffect, useState } from "react";

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
import { Order, Reason } from "@/type";
import { CancelConfirmPopup } from "./cancelConfirmPopup";
import useGetCancelResons from "@/hooks/useGetCancelResons";
import { Loader } from "@/components/ui/loader";
import { ReturnConfirmPopup } from "./returnConfirmPopup";
import Invoice from "@/components/invoice";
import InvoiceStatus from "@/components/InvoiceStatus";

type Props = {
  data: Order;
  status: string;
  cancelReasons: Reason[] | undefined;
  returnReasons: Reason[] | undefined;
};

const OrderCard: React.FC<Props> = ({
  data,
  status,
  cancelReasons,
  returnReasons,
}) => {
  const [showInvoice, setShowInvoice] = useState<boolean>(false);
  const [showInvoiceStatus, setShowInvoiceStatus] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<any>([]);
  const [invoiceStatusData, setInvoiceStatusData] = useState<any>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleShowInvoice = () => {
    setShowInvoice(!showInvoice);
    window.scrollTo(0, 0);
  };
  const handleShowInvoiceStatus = () => {
    setShowInvoiceStatus(!showInvoiceStatus);
    window.scrollTo(0, 0);
  };

  const invoiceProductId = data.id;

  // INVOICE API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenObjectString = localStorage.getItem("token");

        if (!tokenObjectString) {
          throw new Error("Token object not found in local storage");
        }

        const tokenObject = JSON.parse(tokenObjectString);

        const token = tokenObject.value;

        if (!token) {
          throw new Error("Token value not found in token object");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order/status/${invoiceProductId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setInvoiceData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [invoiceData]);

  // INVOICE STATUS API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenObjectString = localStorage.getItem("token");

        if (!tokenObjectString) {
          throw new Error("Token object not found in local storage");
        }

        const tokenObject = JSON.parse(tokenObjectString);

        const token = tokenObject.value;

        if (!token) {
          throw new Error("Token value not found in token object");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order/invoice/${invoiceProductId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setInvoiceStatusData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Card className=" border-2 border-gray-200 mb-3">
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
                      src={
                        item.product?.Images[0]?.url ||
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
          <div className="flex flex-col justify-between w-full sm:flex-row">
            {data.createdAt && (
              <div className="flex-col gap-2  items-center text-[10px] sm:text-[14px]">
                <div className="flex ">
                  <p className="">Order At : &nbsp;</p>
                  <p>
                    {format(
                      new Date(data.createdAt),
                      "MMMM do, yyyy"
                    ).toString()}
                  </p>
                </div>
                <p>Status :- {status}</p>
              </div>
            )}
            <div className="flex items-center justify-end lg:justify-normal gap-4">
              <div>
                <button
                  onClick={handleShowInvoiceStatus}
                  className="text-xs py-[1px] mt-2 xl:mt-0 px-2 sm:text-[18px] sm:px-2 sm:py-3 sm:mt-0 lg:px-4 rounded-md  lg:text-[16px]  xl:py-3 border hover:text-blue-500">
                  Invoice Status
                </button>
                {showInvoiceStatus && (
                  <div className="absolute w-full h-max p-10  transition-all duration-500 top-0 left-0 bg-opacity-30 backdrop-blur-xl flex justify-center items-center">
                    <InvoiceStatus
                      invoiceStatusData={invoiceStatusData}
                      handleShowInvoiceStatus={handleShowInvoiceStatus}
                    />
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={handleShowInvoice}
                  className="text-xs py-[1px] mt-2 xl:mt-0 px-2 sm:text-[18px] sm:px-2 sm:py-3 sm:mt-0 lg:px-4 rounded-md  lg:text-[16px]  xl:py-3 border hover:text-blue-500">
                  view invoice
                </button>
                {showInvoice && (
                  <div className="absolute w-full h-max p-10  transition-all duration-500 top-0 left-0 bg-opacity-30 backdrop-blur-xl flex justify-center items-center">
                    <Invoice
                      invoiceData={invoiceData}
                      handleShowInvoice={handleShowInvoice}
                    />
                  </div>
                )}
              </div>
              {status === "pending" && (
                <div>
                  <CancelConfirmPopup reasons={cancelReasons} data={data} />
                </div>
              )}
              {status === "delivered" && (
                <div className="self-end w-full">
                  <ReturnConfirmPopup data={data} reasons={returnReasons} />
                </div>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
export default OrderCard;
