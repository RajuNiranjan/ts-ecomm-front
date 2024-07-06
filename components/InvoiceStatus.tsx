import Image from "next/image";
import React, { FC } from "react";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface Address {
  id: string;
  userId: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  email: string;
  phone: string;
  fullName: string;
  isDefault: number;
  addressType: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
}

interface User {
  displayName: string;
  email: string;
  Addresses: Address[];
}

interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface OrderDetails {
  id: string;
  isPaid: boolean;
  isDelivered: boolean;
  deliveredAt: string | null;
  address: string;
  phone: string;
  createdAt: string;
  cancelReason: string | null;
  isCanceled: boolean;
  isReturend: boolean;
  ReturenReason: string | null;
  user: User;
  store: {
    name: string;
  };
  orderItems: OrderItem[];
  OrderStatus: any[];
}

interface OrderPrices {
  totalAmount: number;
  taxRateDecimal: number;
  discount: number;
  subtotal: string;
}

interface OrderData {
  orderDetails: OrderDetails;
  ordedrPrices: OrderPrices;
}

interface InvoiceStatusProps {
  handleShowInvoiceStatus: () => void;
  invoiceStatusData: OrderData;
}

const InvoiceStatus: FC<InvoiceStatusProps> = ({
  handleShowInvoiceStatus,
  invoiceStatusData,
}) => {
  console.log("invoice status data", invoiceStatusData);

  const status = [
    "Order Confirmed by vender",
    "Order shipped By the vendor",
    "collected At Local Hub",
    "Order Shipped",
    "Order Collected",
    "Order Delivered",
  ];
  const statusData = [
    {
      name: "Order Confirmed by vender",
      bgColor: "green-500",
      color: "white",
    },
    {
      name: "Order shipped By the vendor",
      bgColor: "green-500",
      color: "white",
    },
    {
      name: "collected At Local Hub",
      bgColor: "green-500",
      color: "white",
    },
    {
      name: "Order Shipped",
      bgColor: "green-500",
      color: "white",
    },
    {
      name: "Order Collected",
      bgColor: "gray-100",
      color: "black",
    },
    {
      name: "Order Delivered",
      bgColor: "gray-100",
      color: "black",
    },
  ];

  return (
    <div className="flex  justify-center items-center transition-all duration-500">
      <div className="w-[350px] sm:w-[700px] xl:w-[1000px] h-full bg-[#eaeaea] rounded-md shadow-md p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl">Order Status</h1>
          <button onClick={handleShowInvoiceStatus}>
            <CloseIcon />
          </button>
        </div>
        <div className=" bg-white shadow-md rounded-md w-full h-full p-5">
          <h1 className="font-semibold text-xl">Order Details</h1>
          <div>
            <div>
              <h1>Order Number - # {invoiceStatusData.orderDetails?.id}</h1>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center  my-5">
                <div className="flex-1 flex flex-col">
                  <strong>
                    {invoiceStatusData.orderDetails?.user.displayName}
                  </strong>
                  <small>
                    User ID :{" "}
                    {invoiceStatusData.orderDetails?.user.Addresses.map(
                      (item) => item.userId
                    )}
                  </small>
                  <small>
                    Email -{" "}
                    <span className="text-blue-500">
                      {invoiceStatusData.orderDetails?.user.Addresses.map(
                        (item) => item.email
                      )}
                    </span>
                  </small>
                  <small>
                    Mobile -{" "}
                    <span className="text-blue-500">
                      {invoiceStatusData.orderDetails?.user.Addresses.map(
                        (item) => item.phone
                      )}
                    </span>
                  </small>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  {invoiceStatusData.orderDetails?.orderItems.map((item) => (
                    <div className="flex gap-4" key={item.id}>
                      <div>
                        <Image
                          src="https://i.pinimg.com/236x/1c/b2/73/1cb2738b9cf909d4507298a6052c5761.jpg"
                          alt=""
                          width={50}
                          height={50}
                        />
                      </div>
                      <div>
                        <h1>
                          <strong>{item.product?.name}</strong>
                        </h1>
                        <p>size : {item.size}</p>
                        <p>$ {item.product.price}</p>
                        <div>
                          <div className="flex">
                            <StarIcon className="text-yellow-500" />
                            <StarIcon className="text-yellow-500" />
                            <StarIcon className="text-yellow-500" />
                            <StarIcon className="text-yellow-500" />
                            <StarIcon className="text-yellow-500" />
                          </div>
                          <small>10,000+ Feedback</small>
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    className={`bg-${
                      invoiceStatusData.orderDetails?.isPaid
                        ? "green-500"
                        : "red-500"
                    } text-white w-full rounded-full`}>
                    Payment Status -{" "}
                    {invoiceStatusData.orderDetails?.isPaid
                      ? "Completed"
                      : "Incomplete"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col  sm:flex-row justify-between items-center gap-4 ">
                {invoiceStatusData.orderDetails?.user.Addresses.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-100 shadow-md p-2 w-full rounded-md ">
                    <h1 className="text-sm xl:text-xl font-semibold">
                      Billing Address Details
                    </h1>
                    <h3 className="text-sm xl:text-lg font-semibold">
                      {item.fullName}
                    </h3>
                    <p className="text-xs xl:text-sm">
                      Landmark - {item.address}
                    </p>
                    <p className="text-xs xl:text-sm">
                      {invoiceStatusData.orderDetails?.address}
                    </p>
                  </div>
                ))}
                {invoiceStatusData.orderDetails?.user.Addresses.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-100 shadow-md p-2 w-full rounded-md ">
                    <h1 className="text-sm xl:text-xl font-semibold">
                      Shipping Address Details
                    </h1>
                    <h3 className="text-sm xl:text-lg font-semibold">
                      {item.fullName}
                    </h3>
                    <p className="text-xs xl:text-sm">
                      Landmark - {item.address}
                    </p>
                    <p className="text-xs xl:text-sm">
                      hounse no - {item.address}, {item.city} - {item.zipcode},{" "}
                      {item.state}, {item.country}
                    </p>
                  </div>
                ))}
              </div>

              {/* STATUS */}

              <div className="my-14 flex flex-col justify-center items-center w-full sm:grid  sm:grid-cols-6 gap-4">
                {statusData.map((item, index) => (
                  <div
                    key={item.name}
                    className="flex w-full flex-col sm:flex-row items-center">
                    <h1
                      className={`bg-${item.bgColor} h-16 w-full  text-${item.color} flex justify-center items-center p-2 rounded-md shadow-md  sm:text-[12px]`}>
                      {item.name}
                    </h1>
                    {index !== statusData.length - 1 && (
                      <>
                        <div className="hidden sm:block">
                          <ArrowForwardIcon className="w-full" />
                        </div>
                        <div className="block sm:hidden">
                          <ArrowDownwardIcon className="w-full" />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceStatus;
