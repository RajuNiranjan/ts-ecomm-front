// this component is for category card
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Category } from "@/type";

type categorycartProps = {
  data: Category;
};

const CategoryCart: React.FC<categorycartProps> = ({ data }) => {
  return (
    <Card className="bg-white group flex flex-col items-center cursor-pointer rounded-xl border  space-y-4  p-2 max-w-250px sm:max-w-500px">
      <Link href={`category/${data.id}/${data.name}`}>
        <CardHeader>
          <Image
            src={data.imageUrl}
            width={163.33}
            height={163.33}
            className="aspect-square object-cover rounded-md"
            alt={data.name}
          />
        </CardHeader>
        <CardContent>
          <p className="text-md text-center font-medium hover:text-blue-800">
            {data.name}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
};
export default CategoryCart;
