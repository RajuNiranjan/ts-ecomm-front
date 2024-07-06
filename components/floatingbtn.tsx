"use client";
import useCompareProducts from "@/hooks/store/compareProduct";
import { useRouter } from "next/navigation";
import React from "react";

const FloatingButton = () => {
  const router = useRouter();
  const { products } = useCompareProducts();
  return (
    <button
      className="fixed bottom-8 right-4 px-4 py-2 bg-blue-500 text-white text-[14px] font-semibold  shadow-lg"
      onClick={() => {
        router.push("/compare");
      }}
    >
      COMPARE &nbsp;{" "}
      <span className="p-1 bg-[#010101] text-white">{products.length}</span>
    </button>
  );
};

export default FloatingButton;
