// this component is for footer
"use client";
import { set } from "date-fns";
import React, { useEffect, useState } from "react";
import { SendHorizonal, Facebook, Instagram, Linkedin } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";
import { toast } from "react-toastify";
import Image from "next/image";
import useProfileActiveTabs from "@/hooks/store/activeTabs";

const Footer: React.FC = () => {
  const [mounted, setIsMounted] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [inputMail, setInputMail] = useState<string>("");

  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useCurrentUser();
  const { activeTab, setActiveTab } = useProfileActiveTabs();

  const email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

  const handleProfle = () => {
    if (pathname.includes(`/user/${user?.id}/${user?.displayName}`)) return;
    else router.push(`/user/${user?.id}/${user?.displayName}`);
  };

  const onClickSend = () => {
    if (inputMail.length >= 1) {
      if (email.test(inputMail)) {
        setInputMail("");
        toast("link sent !! check mail", {
          type: "success",
          toastId: "link sent !! check mail",
        });
      } else {
        toast("Enter valid email address", {
          type: "error",
          toastId: "Enter valid email address",
        });
      }
    } else {
      toast("Please, Enter email address", {
        type: "error",
        toastId: "Please, Enter email address",
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <footer className="mb-10 md:mb-1  bg-white border-t ">
      {show && (
        <div className="flex gap-5 justify-between  mx-auto p-10 pr-20   md:px-20 md:g-10  flex-wrap">
          <div className="flex gap-2 flex-col max-w-[250px]">
            <p className="font-poppins text-[24px] font-medium ">Exclusive</p>
            <p className="font-poppins text-[20px] ">Subscribe</p>
            <p className="font-poppins text-[14px]">
              Get 10% off your first order
            </p>
            <div className="flex border-2 border-black w-[180px] justify-between">
              <input
                type="email"
                className="w-[150px] p-1"
                placeholder="Enter your email"
                value={inputMail}
                onChange={(e) => setInputMail(e.target.value)}
              />
              <SendHorizonal className="pt-1" onClick={onClickSend} />
            </div>
          </div>
          <div className="flex gap-2 flex-col max-w-[250px]">
            <p className="font-poppins text-[24px] font-medium ">Support</p>
            <p className="font-poppins text-[14px] max-w-[150px]">
              111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
            </p>
            <p className="font-poppins text-[14px] max-w-[150px]">
              Get 10% off your first order
            </p>
          </div>

          <div className="flex gap-2  flex-col font-poppins text-[16px] cursor-pointer">
            <p className="font-poppins text-[24px] font-medium ">Account</p>
            <p
              onClick={() => {
                if (user) {
                  handleProfle();
                } else {
                  router.replace("/auth");
                }
              }}
              className="hover:underline"
            >
              My Account
            </p>
            {!user && (
              <p
                onClick={() => {
                  router.replace("/auth");
                }}
                className="hover:underline"
              >
                Login / Register
              </p>
            )}
            <p
              onClick={() => {
                if (user) {
                  router.replace("/cart");
                } else {
                  router.replace("/auth");
                }
              }}
              className="hover:underline"
            >
              Cart
            </p>
            <p
              className="hover:underline"
              onClick={() => {
                if (
                  pathname.includes(`/user/${user?.id}/${user?.displayName}`)
                ) {
                  setActiveTab("Wishlist");
                } else {
                  setActiveTab("Wishlist");
                  router.push(`/user/${user?.id}/${user?.displayName}`);
                }
              }}
            >
              Wishlist
            </p>
            <p
              className="hover:underline"
              onClick={() => {
                router.push("/");
              }}
            >
              Shop
            </p>
          </div>
          <div className="flex gap-2 flex-col font-poppins text-[16px] cursor-pointer min-w-[150px]">
            <p className="text-[24px] font-medium max-w-[150px]">Quick Link</p>
            <p className="hover:underline">Privacy Policy</p>
            <p className="hover:underline">Terms Of Use</p>
            <p className="hover:underline">FAQ</p>
            <p className="hover:underline">Contact</p>
          </div>
          {/* <div className="flex gap-2 flex-col font-poppins text-[16px]  max-w-[250px]">
            <p className="font-poppins text-[24px] font-medium ">Follow us</p>
            <div className="flex justify-between  ">
              <p>FaceBook</p>
              <Facebook className="pt-1" />
            </div>
            <div className="flex  justify-between">
              <p>Instgram</p>
              <Instagram className="pt-1" />
            </div>
            <div className="flex justify-between">
              <p>LinkedIn</p>
              <Linkedin className="pt-1" />
            </div>
          </div> */}
          <div className="flex gap-2 flex-col font-poppins text-[16px]  max-w-[200px] sm:align-bottom">
            <p className="text-[24px] font-medium ">Download App</p>
            <p className="text-[14px] font-medium">
              Save $3 with App New User Only
            </p>
            <div className="flex gap-1">
              <Image src="/Qr-Code.png" alt="Qr code" width={80} height={80} />
              <div className=" flex flex-col gap-1">
                <Image
                  src="/GooglePlay.png"
                  alt="paly store"
                  width={110}
                  height={40}
                />
                <Image
                  src="/AppStore.png"
                  alt="Apple store"
                  width={110}
                  height={40}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Facebook className="hover:text-red-500 cursor-pointer" />
              <Instagram className="hover:text-red-500 cursor-pointer" />
              <Linkedin className="hover:text-red-500 cursor-pointer" />
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
export default Footer;
