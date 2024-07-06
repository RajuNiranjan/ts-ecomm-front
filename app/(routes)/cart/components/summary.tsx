"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import { toast } from "react-toastify";
import LocalStorageManager from "@/lib/LocalStorageManager";
import useAddress from "@/hooks/store/address";
import useUserAddress from "@/hooks/useGetAddress";

const Summary = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );
  const token = LocalStorageManager.getItemWithExpiration("token");
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.clearCart);
  const { address } = useAddress();
  const { data } = useUserAddress();

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.", { toastId: "Payment completed." });
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.", {
        toastId: "Something went wrong.",
      });
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price * item.quantity);
  }, 0);

  const onCheckout = async () => {
    if (
      address === undefined ||
      address.length === 0 ||
      data?.length === 0 ||
      data === undefined
    )
      return toast.error("Please add Address", {
        toastId: "Please add Address",
      });
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout/${process.env.NEXT_PUBLIC_STORE_ID}`,
      {
        productIds: items.map((item) => item.id),
        quantity: items.map((item) => item.quantity),
        size: items.map((item) => item.size),
        color: items.map((item) => item.color),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const stripe = await stripePromise;
    await stripe?.redirectToCheckout({ sessionId: response.data.id });
    window.location = response.data.url;
  };
  return (
    <div className="mt-2 rounded-lg bg-gray-50 px-4 pb-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
