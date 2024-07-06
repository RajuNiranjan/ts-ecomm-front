// parent component for all orders
"use client";

import Container from "@/components/ui/container";
import useGetOrders from "@/hooks/useGetPendingOrders";
import React, { useState } from "react";

import {
  Truck,
  CheckCheck,
  Clock3,
  ArchiveRestore,
  PackageX,
} from "lucide-react";

import Pandding from "./components/orderCard";
import Delivered from "./components/deliveried";
import useGetDeliveredOrders from "@/hooks/useGetDeliveredOrders";
import useCurrentUser from "@/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import { RiseLoader } from "react-spinners";
import useGetReturnedOrders from "@/hooks/useGetReturnedOrders";
import useGetProcessingOrders from "@/hooks/useGetProcessingOrders";
import useGetCanceledOrders from "@/hooks/useGetCanceledOrders";
import useGetCancelResons from "@/hooks/useGetCancelResons";
import useGetReturnResons from "@/hooks/useGetReturnResons";

const OrderPage: React.FC = () => {
  const [variant, setVariant] = useState("pending");
  const { data: user, isLoading } = useCurrentUser();
  // get pending orders
  const { data: pendingsData, isLoading: pendingOrdersLoading } =
    useGetOrders();
  // get delivered orders
  const { data: deliveredData, isLoading: delivedOrdersLoading } =
    useGetDeliveredOrders();

  const { data: returedData, isLoading: returedLoading } =
    useGetReturnedOrders();

  const { data: processingData, isLoading: procesingLaoding } =
    useGetProcessingOrders();

  const { data: canceldData, isLoading: canceldLaoding } =
    useGetCanceledOrders();

  const { data: cancelReasons, isLoading: cancelReasonLaoding } =
    useGetCancelResons();
  const { data: returnReasons, isLoading: returnReasonLaoding } =
    useGetReturnResons();

  // const handleVariant = (name: Vairant) => {
  //   // take the name of variant and set it to state
  //   setVariant(name);
  // };

  if (
    pendingOrdersLoading ||
    delivedOrdersLoading ||
    canceldLaoding ||
    returedLoading ||
    procesingLaoding ||
    cancelReasonLaoding ||
    returnReasonLaoding
  ) {
    return (
      <Container>
        <div className="flex items-center justify-center w-full max-h-[80vh] min-h-[50vh]">
          <RiseLoader color={"#F33A6A"} />
        </div>
      </Container>
    );
  }

  const routes = [
    {
      type: "pending",
      name: "Pending Orders",
      data: pendingsData,
      icon: <Clock3 />,
    },
    {
      type: "delivered",
      name: "Deliverd Orders",
      data: deliveredData,
      icon: <CheckCheck />,
    },
    {
      type: "processing",
      name: "Processing Orders",
      data: processingData,
      icon: <Truck />,
    },
    {
      type: "canceled",
      name: "Canceled Orders",
      data: canceldData,
      icon: <PackageX />,
    },
    {
      type: "returned",
      name: "Returned Orders",
      data: returedData,
      icon: <ArchiveRestore />,
    },
  ];

  if (!user && !isLoading) {
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold">
        You are not eligible to access this page.
      </h1>
    </div>;
  }
  const variantVar = [
    {
      name: "pending",
      color: "bg-blue-500",
      icon: <Truck className="text-white" />,
    },
    {
      name: "delivered",
      color: "bg-green-500",
      icon: <CheckCheck className="text-white" />,
    },
  ];

  return (
    <Container>
      {/* <h1 className="hidden md:block text-2xl font-bold">Orders</h1> */}
      <div className="md:mt-0">
        {/* <div className="flex justify-center gap-5 border-b-2 border-gray-300 mb-2 p-2 cursor-pointer  md:mt-0">
          {variantVar.map((item, index) => (
            <div
              key={index}
              onClick={() => handleVariant(item.name as Vairant)}
              className={`flex items-center text-white text-[9px] sm:text-[18px] justify-center space-x-2 ${item.color} p-2 rounded-md cursor-pointer`}
            >
              {item.icon}
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        <div>
          <div>
            {variant === "pending" && (
              <h1 className="text-center text-xl font-medium border-b-2 border-gray-300 p-2">
                Pending Orders
              </h1>
            )}
            {variant === "pending" && pendingsData?.length === 0 && (
              <h1 className="text-center text-xl font-medium  p-2">
                No Orders
              </h1>
            )}
            <div className="flex-col gap-2 my-2 items-center justify-center">
              {variant === "pending" &&
                pendingsData?.map((item, index) => (
                  <div key={index} className="">
                    <Pandding data={item} />
                  </div>
                ))}
            </div>
          </div>

          <div>
            {variant === "delivered" && (
              <h1 className="text-center text-xl font-medium border-b-2 border-gray-300 p-2">
                Delivered Orders
              </h1>
            )}
            {variant === "delivered" && deliveredData?.length === 0 && (
              <h1 className="text-center text-xl font-medium  p-2">
                No Orders
              </h1>
            )}
            {variant === "delivered" &&
              deliveredData?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center flex-wrap"
                >
                  <Delivered data={item} />
                </div>
              ))}
          </div>
        </div> */}
        <div className="flex gap-5 min-w-[120px] p-2 overflow-x-scroll sm:overflow-hidden">
          {routes.map((route, index) => {
            const isActive =
              route.type === variant ? "bg-red-500 text-white" : "text-black";
            return (
              <div key={index} className={`${isActive} mt-2  min-w-[120px]`}>
                <div
                  className="flex justify-center items-center
                   min-w-[120px] flex-shrink-0"
                >
                  {route.icon}
                  <button
                    onClick={() => {
                      setVariant(route.type);
                    }}
                    className="p-1 min-w-[50px]"
                  >
                    {route.type}
                  </button>
                </div>
                <hr className="border-t-2 border-gray-300 flex-shrink-0" />
              </div>
            );
          })}
        </div>
        {routes.map((each) => {
          if (variant !== each.type) return null;
          return (
            <div key={each.type}>
              <div>
                <h1 className="text-center text-xl font-medium border-b-2 border-gray-300 p-2">
                  {each.name}
                </h1>
                {each.data?.length === 0 && (
                  <h1 className="text-center text-xl font-medium  p-2">
                    No Orders
                  </h1>
                )}
                {each.data?.length != undefined && each.data.length > 0 && (
                  <div
                    className="flex-col gap-2 my-2 items-center justify-center"
                    key={each.type}
                  >
                    {each.data?.map((item, index) => (
                      <div key={index} className="">
                        <Pandding
                          data={item}
                          status={each.type}
                          cancelReasons={cancelReasons}
                          returnReasons={returnReasons}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};
export default OrderPage;
