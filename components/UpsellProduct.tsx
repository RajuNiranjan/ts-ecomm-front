import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import UpsellRelatedProductCard from "./UpsellRelatedProductCard";
import { Product } from "@/type";
import Link from "next/link";
import UpsellProductList from "./UpsellProductList";

interface UpsellProductProps {
  productData: Product;
  handleShowUpSellProduct: () => void;
}

const UpsellProduct: React.FC<UpsellProductProps> = ({
  productData,
  handleShowUpSellProduct,
}) => {

  const [relatedProducts, setRelatedProducts] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product/9d718e14-163b-48be-a48c-aca0ef49067c/getlinkedproducts`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setRelatedProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-full bg-black bg-opacity-30 p-4  sm:py-20 transition-all duration-800">
      <div className="container m-auto p-5 bg-white w-full xl:w-[100vw] h-max rounded-xl shadow-md">
        <div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center ">
              <div className="flex gap-1 items-center">
                <CheckCircleOutlineIcon className="text-green-600 text-xl justify-center" />
                <h3 className="text-xl font-medium">You just added</h3>
              </div>
              <p className="cursor-pointer hover:bg-gray-300 h-7 w-7 rounded-full flex justify-center items-center hover:text-white">
                <CloseIcon onClick={handleShowUpSellProduct} />
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row xl:items-center justify-between shadow-xl p-2 rounded-xl my-5">
              <div className="flex items-center justify-between gap-4">
                <Image
                  src={productData.Images[0].url}
                  alt=""
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <h2 className="text-xl truncate text-ellipsis">
                  {productData.name}
                </h2>
              </div>
              <div className="flex gap-4 flex-col xl:flex-row">
                <div className="sm:border-l-2 border-black pl-4">
                  <p className="text-xl ">Cart Item : 1</p>
                  <p className="text-xl ">
                    Cart subtotal :
                    <span className="font-semibold text-xl">
                      $ {productData.price}
                    </span>
                  </p>
                </div>
                <Link href="/cart">
                  <button className="bg-yellow-500  text-black px-3 py-1 text-xl font-semibold tracking-[1px] rounded-xl mx-4 ">
                    Checkout (1 item)
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <UpsellProductList items={relatedProducts} title="Related Products" />
        </div>
      </div>
    </div>
  );
};

export default UpsellProduct;
