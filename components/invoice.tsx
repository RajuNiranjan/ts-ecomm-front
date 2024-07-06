import React, { FC, useRef } from "react";
import ReactToPrint from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";

interface InvoiceProps {
  handleShowInvoice: () => void;
  invoiceData: InvoiceData;
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
  store: Store;
  orderItems: OrderItem[];
}

interface User {
  displayName: string;
  email: string;
  Addresses: Address[];
}

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

interface Store {
  name: string;
}

interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
}

interface OrdedrPrices {
  totalAmount: number;
  taxRateDecimal: number;
  discount: number;
  subtotal: string;
}

interface PaymentDetails {
  method: string;
  cardHolder: string;
  cardNo: string;
  totalAmount: number;
}

interface ShippingMethod {
  method: string;
}

type InvoiceData = {
  orderDetails: OrderDetails;
  ordedrPrices: OrdedrPrices;
  PaymentDetails: PaymentDetails;
  shippingMethod: ShippingMethod;
};

const Invoice: FC<InvoiceProps> = ({ handleShowInvoice, invoiceData }) => {
  const pdfRef = useRef(null);

  const handleDownloadInvoice = () => {
    const input = pdfRef.current;
    if (!input) {
      console.error("PDF reference is not set correctly.");
      return;
    }

    const padding = 10;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(
        (pdfWidth - padding * 2) / imgWidth,
        (pdfHeight - padding * 2) / imgHeight
      );
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = padding;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
      setTimeout(() => {
        handleShowInvoice();
      }, 1000);
    });
  };

  return (
    <div className="flex justify-center items-center transition-all duration-500">
      <div className="w-[350px] sm:w-[700px] xl:w-[1000px] h-full bg-white rounded-md shadow-md p-5 flex flex-col gap-4">
        <div ref={pdfRef} className="flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <p className="text-lg xl:text-xl font-semibold">
              Order # {invoiceData.orderDetails?.id}
            </p>
            <button className="bg-blue-500 xl:px-4 xl:py-2 text-xs px-2 py-1 xl:text-lg rounded-md text-white">
              Completed
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 ">
            {invoiceData.orderDetails?.user.Addresses.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md p-2 w-full rounded-md border">
                <h1 className="text-sm xl:text-xl font-semibold">
                  Billing Address Details
                </h1>
                <h3 className="text-sm xl:text-lg font-semibold">
                  {item?.fullName}
                </h3>
                <p className="text-xs xl:text-sm">
                  Landmark - {item.addressType}
                </p>
                <p className="text-xs xl:text-sm">
                  {invoiceData.orderDetails?.address}
                </p>
              </div>
            ))}
            {invoiceData.orderDetails?.user.Addresses.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md p-2 w-full rounded-md border">
                <h1 className="text-sm xl:text-xl font-semibold">
                  Shipping Address Details
                </h1>
                <h3 className="text-sm xl:text-lg font-semibold">
                  {item?.fullName}
                </h3>
                <p className="text-xs xl:text-sm">
                  Landmark - {item.addressType}
                </p>
                <p className="text-xs xl:text-sm">
                  hounse no - {item.address}, {item.city}, {item.state}-
                  {item.zipcode}, {item.country}
                </p>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center ">
              <div>
                <p className="text-sm xl:text:xl font-semibold">Email</p>
                <p className="text-xs text-blue-500">
                  {invoiceData.orderDetails?.user.email}
                </p>
              </div>
              <div>
                <p className="text-sm xl:text:xl font-semibold">
                  Shoping Method
                </p>

                <p className="text-xs text-gray-500">
                  {invoiceData.shippingMethod?.method}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center ">
              <div>
                <p className="text-sm xl:text:xl font-semibold">Phone</p>
                {invoiceData.orderDetails?.user.Addresses.map((item) => (
                  <p key={item.email} className="text-xs text-blue-500">
                    {item.phone}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-sm xl:text:xl font-semibold">Payment Via</p>
                <p className="text-xs text-gray-500">Cash On Delivery</p>
              </div>
            </div>
          </div>

          <div className="w-full text-sm xl:text:xl overflow-x-scroll">
            <div className="my-5 ">
              <ul className="flex items-center gap-4  font-semibold">
                <li className="min-w-[10px] max-w-[20px] sm:min-w-[10px] sm:max-w-[20px] lg:min-w-[10px] lg:max-w-[200px] ">
                  #
                </li>
                <li className="min-w-[150px] max-w-[180px] sm:min-w-[450px] sm:max-w-[180px] lg:min-w-[700px] lg:max-w-[700px] ">
                  Products
                </li>
                <li className="min-w-[40px] max-w-[50px] sm:min-w-[50px] sm:max-w-[60px] lg:min-w-[100px] lg:max-w-[200px] text-center">
                  Quantity
                </li>
                <li className="min-w-[60px] max-w-[80px] sm:min-w-[60px] sm:max-w-[80px] lg:min-w-[100px] lg:max-w-[200px] text-center">
                  Total
                </li>
              </ul>
            </div>
            <br />
            <div className="flex flex-col gap-4">
              {invoiceData.orderDetails?.orderItems.map((item) => (
                <ul key={item.id} className="flex items-center gap-4 ">
                  <li className="min-w-[10px] max-w-[20px] sm:min-w-[10px] sm:max-w-[20px]lg:min-w-[10px] lg:max-w-[200px] ">
                    1
                  </li>
                  <li className="min-w-[150px] max-w-[180px] flex flex-col gap-1 sm:min-w-[450px] sm:max-w-[180px] lg:min-w-[700px] lg:max-w-[700px] ">
                    <span>Shoes</span>
                    <span className="flex items-center gap-1">
                      size : {item.size} Color :{" "}
                      <span
                        style={{
                          backgroundColor: item.color,
                          width: "20px",
                          height: "20px",
                          display: "inline-block",
                          borderRadius: "50%",
                        }}></span>
                    </span>
                  </li>
                  <li className="min-w-[30px] max-w-[40px] sm:min-w-[50px] sm:max-w-[60px] lg:min-w-[100px] lg:max-w-[200px] text-center">
                    {item.quantity}
                  </li>
                  <li className="min-w-[60px] max-w-[80px]  sm:min-w-[60px] sm:max-w-[80px] lg:min-w-[100px] lg:max-w-[200px] text-blue-500 text-center">
                    $ {item.product?.price}
                  </li>
                </ul>
              ))}
            </div>
            <hr className="my-5 h-1 bg-black" />
          </div>

          <div className="flex gap-4 justify-end">
            <div>
              <ul className="font-semibold text-sm xl:text:xl flex flex-col gap-4">
                <li>Sub Total</li>
                <li>
                  Estimated Tax ({invoiceData.ordedrPrices?.taxRateDecimal})
                </li>
                <li>Discount (VELZONE)</li>
                <li>Shipping Chage</li>
              </ul>
            </div>
            <div>
              <ul className="font-medium text-sm xl:text:xl  flex flex-col gap-4">
                <li className="text-blue-500">
                  $ {invoiceData.ordedrPrices?.subtotal}
                </li>
                <li className="text-blue-500">
                  $ {invoiceData.ordedrPrices?.taxRateDecimal}
                </li>
                <li className="text-blue-500">
                  $ {invoiceData.ordedrPrices?.discount}
                </li>
                <li className="text-blue-500">
                  $ {invoiceData.ordedrPrices?.totalAmount}
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h1 className="font-semibold text-md xl:text:xl">
              Payment Details
            </h1>
            <ul>
              <li className="text-sm xl:text:xl">
                <span>Payment Method : </span>

                <span>{invoiceData.PaymentDetails?.method}</span>
              </li>
              <li className="text-sm xl:text:xl">
                <span>Card Holder : </span>
                <span>{invoiceData.PaymentDetails?.cardHolder}</span>
              </li>
              <li className="text-sm xl:text:xl">
                <span>Card Number : </span>
                <span>{invoiceData.PaymentDetails?.cardNo}</span>
              </li>
              <li className="text-sm xl:text:xl">
                <span>Total Amount : </span>
                <span>$ {invoiceData.PaymentDetails?.totalAmount}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center ">
          <div>
            <button
              onClick={handleShowInvoice}
              className="border hover:text-blue-500 rounded-lg py-1 px-1  xl:px-2 xl:py-2">
              cancle
            </button>
          </div>
          <div className="flex gap-4">
            <ReactToPrint
              trigger={() => (
                <button className="border bg-blue-500 text-white rounded-lg py-1 px-1  xl:px-2 xl:py-2 flex justify-center items-center gap-1 text-sm xl:text-lg">
                  <LocalPrintshopOutlinedIcon className="text-sm" />
                  Prints
                </button>
              )}
              content={() => pdfRef.current}
              pageStyle={`@media print {
                body {
                  padding: 10mm;
                }
              }`}
            />
            <button
              onClick={handleDownloadInvoice}
              className="border bg-blue-500 text-white rounded-lg text-sm xl:text-lg py-1 px-1  xl:px-2 xl:py-2 flex justify-center items-center gap-1">
              <ArrowDownwardIcon className="text-sm" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
