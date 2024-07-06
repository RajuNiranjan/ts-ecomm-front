import { ShoppingCart } from "lucide-react";

import Currency from "@/components/ui/currency";
import { Button } from "./ui/button";
import { MouseEventHandler, useEffect, useState } from "react";
import { Expand, Heart, Eye } from "lucide-react";
import useAuthModal from "@/hooks/modal/useAuthModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useCart from "@/hooks/useCart";
import { toast } from "react-toastify";
import useGetProductReviews from "@/hooks/useGetProductReviews";
import Rating from "./ui/rating";
import { Product, Review } from "@/type";
import { useRouter } from "next/navigation";
import { useGetUserReviews } from "@/hooks/useGetUserReviews";
import useGetWishList from "@/hooks/useGetWishList";
import { addToWishList, removeFromWishList } from "@/lib/wishlist";
import IconButton from "./ui/icon-button";
import useWishlist from "@/hooks/store/wishlist";
import useCompareProducts from "@/hooks/store/compareProduct";
import ShareDialog from "./ShareDialog";
import UpsellProduct from "./UpsellProduct";
import Image from "next/image";

// interface InfoProps {
//   data: Product;
// }

interface InfoProps {
  data: Product & { groupProducts: any[] }; // Assuming groupProducts is an array of any type
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const [page, setPage] = useState<number>(1);
  const { data: reviews } = useGetProductReviews(data.id, page);
  const authModal = useAuthModal();
  const { data: user } = useCurrentUser();
  const cart = useCart();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const handleSizeClick = (sizeValue: string) => {
    setSelectedValue(sizeValue);
  };
  const [isinWishList, setIsInWishlist] = useState(false);
  const { wishlist, setWishlist } = useWishlist();
  const [showUpsellProduct, setShowUpsellProduct] = useState<boolean>(false);

  const {
    products,
    setCompareProducts,
    removeProduct,
    categoryId,
    setCategoryId,
  } = useCompareProducts();

  const isFound = wishlist?.filter((each) => each.id === data.id);

  useEffect(() => {
    if (isFound && isFound[0]?.id === data.id) {
      setIsInWishlist(true);
    } else {
      setIsInWishlist(false);
    }
  }, [wishlist, data.id]);

  const isReviewGiven = reviews?.reviews.filter(
    (each: Review) => each.user.id === user?.id
  );

  const router = useRouter();

  const handleColorClick = (colorValue: string) => {
    setSelectedColor(colorValue);
  };
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (!user) {
      authModal.onOpen();
      return;
    }
    if (selectedValue === "" || selectedColor === "") {
      toast.error("Please select size and color", {
        toastId: "Please select size and color",
      });
      return;
    }
    handleShowUpSellProduct();
    cart.addItem({
      id: data.id,
      quantity,
      size: selectedValue,
      color: selectedColor,
      price: data.price,
      name: data.name,
      image: data.Images?.[0]?.url,
    });
  };
  const isinCompare = products.filter((each) => each.id === data.id);

  const handleShowUpSellProduct = () => {
    setShowUpsellProduct(!showUpsellProduct);
  };

  return (
    <>
      <div className=" p-5">
        <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
        <div className="mt-3 flex flex-col sm:flex-row sm:items-end justify-between">
          <div className="text-2xl text-gray-900">
            <Currency value={data?.price} />
          </div>
          <div className="flex gap-5 items-center">
            <div className="flex gap-2 items-center cursor-pointer">
              <input
                type="checkbox"
                id="compare"
                checked={isinCompare.length >= 1}
                className="w-[14px] h-[14px]"
                onClick={() => {
                  if (categoryId === data.category.id || categoryId === null) {
                    if (categoryId === null) {
                      setCategoryId(data.category.id);
                      if (isinCompare.length >= 1) {
                        removeProduct(data.id);
                      } else {
                        setCompareProducts(data);
                      }
                    } else {
                      if (isinCompare.length >= 1) {
                        removeProduct(data.id);
                      } else {
                        setCompareProducts(data);
                      }
                    }
                  } else {
                    toast.error("You can only compare similar products", {
                      toastId: "You can only compare similar products",
                    });
                  }
                }}
              />
              <label htmlFor="compare" className="cursor-pointer">
                compare
              </label>
            </div>
            <IconButton
              onClick={() => {
                if (!user) {
                  authModal.onOpen();
                  return;
                }

                if (isinWishList) {
                  const newWishlist = wishlist.filter(
                    (each) => each.id !== data.id
                  );
                  setWishlist(newWishlist);
                  removeFromWishList(data.id);
                  setIsInWishlist(false);
                } else {
                  setWishlist([...wishlist, data]);
                  addToWishList(data.id);
                  setIsInWishlist(true);
                }
              }}
              icon={
                isinWishList ? (
                  <Heart size={15} className="text-[#fb641b]" fill="#fb641b" />
                ) : (
                  <Heart size={15} className="text-gray-600" />
                )
              }
            />
            <ShareDialog data={data} />
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col lg:flex-row gap-x-4">
            <h3 className="font-semibold text-gray-900 text-left ">Size:</h3>
            <div className="flex gap-5 flex-wrap">
              {data.Sizes.map((size, index) => (
                <div
                  className={`text-gray-900 p-3 w-auto text-center  rounded-md cursor-pointer border-2 ${
                    selectedValue === size.value
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded`}
                  key={index}
                  onClick={() => handleSizeClick(size.value)}>
                  {size.value}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-gray-900">Color:</h3>
            {data.Colors.map((color, index) => (
              <div
                className={`text-gray-900 p-3 w-13 cursor-pointer text-center border-2 ${
                  selectedColor === color.value
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
                key={index}
                onClick={() => handleColorClick(color.value)}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
        </div>
        <div className="mt-10 flex items-center gap-x-3">
          <h1 className="font-semibold text-gray-900">Quantity:</h1>
          <div className="flex items-center gap-x-3">
            <Button
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity === 1}
              className="flex items-center gap-x-2">
              -
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">{quantity}</h1>
            <Button
              onClick={() => setQuantity(quantity + 1)}
              className="flex items-center gap-x-2">
              +
            </Button>
          </div>
        </div>
        {/* GROUP PRODUCTS */}

        {data.groupProducts && (
          <div className="my-5">
            <p>Group Products</p>
            <hr className="my-4" />
            <div>
              <div className="flex justify-between items-center font-semibold">
                <p>Product Name</p>
                <p>Qty</p>
              </div>
              {data.groupProducts.map((groupProduct) => (
                <div key={groupProduct.id}>
                  <div className="flex justify-between items-center my-4">
                    <div className="flex gap-4 items-center">
                      <div>
                        <Image
                          src={groupProduct.linkedProduct.Images[0].url}
                          width={50}
                          height={50}
                          alt=""
                          className="rounded-md"
                        />
                      </div>
                      <div>
                        <p className="text-lg">
                          {groupProduct.linkedProduct.name}
                        </p>
                        <p className="font-semibold">
                          $ {groupProduct.linkedProduct.price}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="h-10 w-10 border flex justify-center items-center text-xl">
                        1
                      </p>
                    </div>
                  </div>
                  <hr className="my-4" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* add to cart*/}
        <div className="mt-10 flex flex-col sm:flex-row gap-2 sm:items-center w-full">
          <Button className="flex items-center gap-x-2" onClick={onAddToCart}>
            Add To Cart
            <ShoppingCart size={20} />
          </Button>
          {(isReviewGiven === undefined || isReviewGiven.length === 0) && (
            <Button
              className="flex items-center gap-x-2"
              onClick={() =>
                router.push(`/product/${data.id}/${data.name}/reviews`)
              }>
              Add Review{" "}
            </Button>
          )}
        </div>
        <div className="mt-3">
          <h3 className="font-semibold text-black">Description:</h3>
          <p className="text-gray-900">{data.description}</p>
        </div>
        {/* review */}
        {reviews?.averageRating !== undefined && (
          <div className="flex justify-start mt-5  items-center w-full">
            <div className="flex-col items-center justify-center">
              <h3 className="font-semibold text-black">Rating:</h3>
              <p className="text-4xl font-bold">
                {reviews?.averageRating}/
                <span className="text-gray-400 text-xl font-serif">5</span>
              </p>
              <p className="text-xl text-gray-900">
                {reviews?.reviews?.length} reviews
              </p>
              {reviews?.averageRating !== undefined && (
                <Rating value={reviews?.averageRating} />
              )}
            </div>
          </div>
        )}
      </div>
      <div>
        {showUpsellProduct && (
          <div className="absolute right-0 -top-[100px] w-full h-full z-10 ">
            <UpsellProduct
              productData={data}
              handleShowUpSellProduct={handleShowUpSellProduct}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Info;
