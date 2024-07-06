"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NotFound = () => {
  const route = useRouter();
  return (
    <main>
      <div className="flex w-full justify-center flex-col items-center min-h-[70vh] gap-3 text-center">
        <Image src="/not-found.png" alt="not found" width={180} height={180} />
        <h6 className="text-[28px] font-bold">Page Not Found</h6>
        <p className="text-[22px] text-gray-400 max-w-md">
          we are sorry, the page you requested could not be found.
        </p>
        <button
          onClick={() => {
            route.replace("/");
          }}
          className="bg-blue-500 p-3 border-r-2 rounded-xl text-white"
        >
          Go to Home
        </button>
      </div>
    </main>
  );
};

export default NotFound;
