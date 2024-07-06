// used for user profile page
"use client";

import React, { useEffect, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import Container from "@/components/ui/container";

import ImageUpload from "@/components/ui/image-upload";
import OrderPage from "@/components/orders/orders";
import SettingPage from "@/components/settings/settings";
import ReviewsPage from "@/components/reviews/page";
import { MapPin, Plus, Star } from "lucide-react";

import { User, Package, LogOut, Heart } from "lucide-react";

import useProfileActiveTabs from "@/hooks/store/activeTabs";
import AddressForm from "@/components/AddressForm";

import { Address } from "@/type";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import useUserAddress from "@/hooks/useGetAddress";
import { Loader } from "@/components/ui/loader";
import useAddress from "@/hooks/store/address";
import useCart from "@/hooks/useCart";
import Wishlist from "@/components/wishlist/wishlist";
import useGetCountryDetails from "@/hooks/useGetCountryDetails";

type pageProps = {
  params: {
    userId: string;
    displayName: string;
  };
};

const defaultTextStyle: React.CSSProperties = {
  position: "absolute",
  background: "#09ab20",
  padding: "4px",
  borderRadius: "0px 0px 0px 10px",
  top: 0,
  right: 0,
  color: "#fff",
  width: "50px",
};

const Profile: React.FC<pageProps> = () => {
  const { data, isLoading, isError } = useCurrentUser();
  const [mounted, setIsMounted] = useState<boolean>(false);
  const { activeTab, setActiveTab } = useProfileActiveTabs();
  const { data: userAddress, isLoading: isAddressLoading } = useUserAddress();
  const { address, setAddress } = useAddress();
  const cart = useCart();
  const {} = useGetCountryDetails();

  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
  };
  const handleLogout = () => {
    logout();
    cart.clearCart();
    window.location.href = "/auth ";
  };

  const routes = [
    {
      label: "Profile",
      icon: () => <User />,
    },
    {
      label: "Orders",
      icon: () => <Package />,
    },
    {
      label: "Wishlist",
      icon: () => <Heart />,
    },
    {
      label: "Reviews",
      icon: () => <Star />,
    },
    {
      label: "Logout",
      icon: () => <LogOut />,
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!mounted) {
    return null;
  } else if (isLoading || isAddressLoading) {
    return <Loader />;
  } else if (!data || isError) {
    window.location.replace("/");
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold">
          You are not eligible to access this page.
        </h1>
      </div>
    );
  }

  const deafultAddress = address.filter((each) => each.isDefault === 1);

  return (
    <Container>
      <div className="flex flex-col bg-gray-100 min-h-[50vh]  p-2 sm:p-5 sm:px-10 m-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <Image
            src={data?.avatarUrl || "/person.png"}
            className=" rounded-[25px] sm:rounded-[45px] w-[50px] h-[50px] sm:w-[90px] sm:h-[90px]"
            alt={data?.displayName || "name"}
            width={50}
            height={50}
          />
          <div className="text-[14px] sm:text-[20px]">
            <p>{data?.displayName}</p>
            <p> Email &nbsp;:- {data?.email}</p>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300 my-4" />

        {/*address section*/}

        <div className="grid grid-1 sm:grid-cols-2 gap-3 items-center content-center">
          {deafultAddress.length > 0 && (
            <div
              className="flex flex-col border-2 border-gray-200 p-2 sm:p-3 py-4"
              style={{ position: "relative" }}
            >
              <div
                className="flex justify-end  gap-2 w-full"
                style={defaultTextStyle}
              >
                <p className="text-[12px]">Default</p>
              </div>
              <div className="flex items-center  text-[14px] sm:text-[16px]">
                <MapPin className=" w-[16px] h-[16px] " /> &nbsp;
                <div className="flex flex-wrap">
                  {deafultAddress[0].fullName} ,{deafultAddress[0].address},
                  {deafultAddress[0].city},{deafultAddress[0].country},
                  {deafultAddress[0].zipcode}
                </div>
              </div>
              <div className="flex justify-end  gap-2 w-full">
                <AddressForm type={"update"} data={deafultAddress[0]} />
              </div>
            </div>
          )}
          {address?.map((each, index) => {
            if (deafultAddress.length > 0 && deafultAddress[0].id === each.id)
              return null;
            return (
              <div
                key={index}
                className="flex flex-col border-2 border-gray-200 p-2 sm:p-3 py-4"
              >
                <div className="flex items-center  text-[14px] sm:text-[16px]">
                  <MapPin className=" w-[16px] h-[16px] " /> &nbsp;
                  <div className="flex flex-wrap">
                    {each.fullName} ,{each.address},{each.city},{each.country},
                    {each.zipcode}
                  </div>
                </div>
                <div className="flex justify-end  gap-2 w-full">
                  <AddressForm type={"update"} data={each} />
                </div>
              </div>
            );
          })}
          <AddressForm type={"create"} />
        </div>
        <hr className="border-t-2 border-gray-300 my-4" />

        {/*tabs*/}
        <div className="flex flex-col gap-2">
          <div className="flex gap-5 min-w-[120px] p-2 overflow-x-scroll sm:overflow-hidden">
            {routes.map((route, index) => {
              const isActive =
                route.label === activeTab
                  ? "bg-red-500 text-white"
                  : "text-black";
              return (
                <div key={index} className={`${isActive} mt-2  min-w-[120px]`}>
                  <div
                    className="flex justify-center items-center
                   min-w-[120px] flex-shrink-0"
                  >
                    {route.icon()}
                    <button
                      onClick={() => {
                        setActiveTab(route.label);
                      }}
                      className="p-1 min-w-[50px]"
                    >
                      {route.label}
                    </button>
                  </div>
                  <hr className="border-t-2 border-gray-300 flex-shrink-0" />
                </div>
              );
            })}
          </div>

          <div className="w-full h-full p-5 bg-white">
            {activeTab === "Profile" && <SettingPage />}
            {activeTab === "Orders" && <OrderPage />}
            {activeTab === "Reviews" && <ReviewsPage />}
            {activeTab === "Logout" && (
              <div className="flex flex-col flex-wrap w-full items-center justify-center gap-3">
                <p>Are you Sure you want logout </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      router.replace("/");
                    }}
                    className="bg-green-500 px-4 p-1 border-r-2 rounded-xl text-white"
                  >
                    Shop
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-500 px-4 p-1 border-r-2 rounded-xl text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
            {activeTab === "Wishlist" && <Wishlist />}
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Profile;
