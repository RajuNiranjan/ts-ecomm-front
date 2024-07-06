import React from "react";
import Image from "next/image";

const Services = () => {
  return (
    <div className="flex flex-wrap gap-10 text-center justify-around my-[100px]">
      <div className="flex flex-col items-center ">
        <Image
          src={"/service-1.png"}
          className=" w-[80px] h-[80px] mb-[24px]"
          alt="Fast Delivery"
          width={80}
          height={80}
        />
        <p className="text-[20px] mb-[8px] font-semibold">
          FREE AND FAST DELIVERY
        </p>
        <p className="text-[14px]">Free delivery for all orders over $140</p>
      </div>
      <div className="flex flex-col items-center ">
        <Image
          src={"/service-2.png"}
          className=" w-[80px] h-[80px] mb-[24px]"
          alt="24/7 CUSTOMER SERVICE"
          width={80}
          height={80}
        />
        <p className="text-[20px] mb-[8px] font-semibold">
          24/7 CUSTOMER SERVICE
        </p>
        <p className="text-[14px]">Friendly 24/7 customer support</p>
      </div>
      <div className="flex flex-col items-center ">
        <Image
          src={"/service-3.png"}
          className=" w-[80px] h-[80px] mb-[24px]"
          alt="MONEY BACK GUARANTEE"
          width={80}
          height={80}
        />
        <p className="text-[20px] mb-[8px] font-semibold">
          MONEY BACK GUARANTEE
        </p>
        <p className="text-[14px]">We return money within 30 days</p>
      </div>
    </div>
  );
};

export default Services;
