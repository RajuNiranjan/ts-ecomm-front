// this component is for mobile navigation
"use client";
import React, { use, useCallback, useEffect, useState } from "react";
import { User } from "@/hooks/useCurrentUser";
import useGetMenCategories from "@/hooks/useGetMenCategories";
import useGetWomenCategories from "@/hooks/useGetWomenCategories ";
import useMobileNaveOpen from "@/hooks/useHandleMobileNav";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import {
  X,
  AlignJustifyIcon,
  Smile,
  Star,
  Package,
  LogOut,
  ShoppingBag,
} from "lucide-react";
import AnimatedText from "../ui/AnimatedText";
import NavbarAction from "./NavbarAction";
import { Button } from "@/components/ui/button";
import MobileMenCategory from "../MobileMenCategory";
import MobileWomenCategory from "../MobileWomenCategory";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import useCart from "@/hooks/useCart";
import usePreviewModal from "@/hooks/modal/usePreviewModal";
import useProfileActiveTabs from "@/hooks/store/activeTabs";

type MainNavProps = {
  user: User | undefined;
};

const MobileNav: React.FC<MainNavProps> = ({ user }) => {
  // get all categories for men
  const { data: mencategories } = useGetMenCategories();
  const cart = useCart();
  const previewModal = usePreviewModal();
  const [muted, setMuted] = useState<boolean>(false);
  // get all categories for women
  const { data: womencategories } = useGetWomenCategories();
  const [search, setSearch] = useState<string>("");
  const navHandle = useMobileNaveOpen(); //handle mobile nav or close it
  const title = "SignIn/SignUp".split("");
  const pathname = usePathname();
  const router = useRouter();
  const sentence = "TS-Ecommerce".split("");
  const { activeTab, setActiveTab } = useProfileActiveTabs();
  const currentPath = pathname.includes(
    `/user/${user?.id}/${user?.displayName}`
  );

  useEffect(() => {
    setMuted(true);
  }, []);
  const onSearch = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      navHandle.onClose();
      const encodedSearch = encodeURI(search);
      router.push(`/result?search_query=${encodedSearch}`);
    },
    [search, router, navHandle]
  );
  if (!muted) return null;
  const logout = () => {
    localStorage.removeItem("token");
  };
  const handleLogout = () => {
    logout();
    cart.clearCart();
    window.location.href = "/auth";
  };
  const Routes = [
    {
      name: "Profile",
      icon: <Smile size={20} />,
      href: `/user/${user?.id}/${user?.displayName}`,
      isActive: activeTab === "Profile" && currentPath,
    },
    {
      name: "Orders",
      icon: <Package size={20} />,
      href: `/user/${user?.id}/${user?.displayName}`,
      isActive: activeTab === "Orders" && currentPath,
    },
    {
      name: "Reviews",
      icon: <Star size={20} />,
      href: `/user/${user?.id}/${user?.displayName}`,
      isActive: activeTab === "Reviews" && currentPath,
    },
  ];
  const handleCart = () => {
    previewModal.onClose();
    router.push("/cart");
  };
  return (
    <>
      <div className="static z-50 w-screen flex justify-between top-0 left-0 p-5   items-center bg-white border-t-[1px] md:hidden">
        <AlignJustifyIcon
          onClick={navHandle.onOpen}
          className="cursor-pointer "
          size={30}
        />
        <div className="flex gap-x-2 mx-3">
          <Link href="/" className="flex ">
            {sentence.map((letter, index) => (
              <AnimatedText className="hover:text-pink-600" key={index}>
                {letter === " " ? "\u00A0" : letter}
              </AnimatedText>
            ))}
          </Link>
        </div>
        {/** Navbar Action */}
        <div className="flex ml-auto  items-center gap-x-4 ">
          <Button
            size="icon"
            onClick={handleCart}
            className="flex items-center w-full rounded-full bg-black px-2 py-2 "
          >
            <ShoppingBag size={25} className="text-white w-5 h-5" />
            <span className="ml-2 text-sm font-medium text-white">
              {cart.items.length}
            </span>
          </Button>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 border border-1  h-screen bg-white z-50 transform transition-all duration-300 ease-in-out ${
          navHandle.isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <Button
            size={"icon"}
            onClick={navHandle.onClose}
            className="absolute top-0 right-0 hover:bg-white bg-white mt-1"
          >
            <X size={30} className="text-black" />
          </Button>
        </div>
        <div className="p-5 w-full mt-7">
          <form onSubmit={onSearch}>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="search"
              placeholder="Search"
            />
          </form>
        </div>
        {mencategories && (
          <MobileMenCategory
            categories={mencategories}
            title={"Men Categories"}
          />
        )}
        {womencategories && (
          <MobileWomenCategory
            categories={womencategories}
            title={"Women Categories"}
          />
        )}
        {!user && (
          <div className=" mt-3 ml-8" onClick={navHandle.onClose}>
            <Link href="/auth" className="flex " scroll={false}>
              {title.map((letter, index) => (
                <AnimatedText key={index}>
                  {letter === " " ? "\u00A0" : letter}
                </AnimatedText>
              ))}
            </Link>
          </div>
        )}
        {user && (
          <>
            <h1 className="mt-3 ml-8 text-xl font-bold text-gray-900">
              {user?.displayName}
            </h1>
            <div className="flex-row items-center justify-center">
              {Routes.map((route, index) => (
                <div
                  key={index}
                  className="flex-col items-center justify-center gap-x-2 mt-3 ml-8"
                  onClick={navHandle.onClose}
                >
                  <Link
                    href={route.href}
                    key={route.href}
                    className={cn(
                      "text-lg font-medium transition-colors text-gray-900  focus:outline-none focus:text-gray-700  duration-150 ease-in-out",
                      route.isActive ? "text-black " : "text-muted-foreground "
                    )}
                    onClick={() => {
                      setActiveTab(route.name);
                    }}
                  >
                    <div className="flex items-center justify-start gap-x-2 ">
                      {route.icon}
                      <span>{route.name}</span>
                    </div>
                  </Link>
                </div>
              ))}
              <div
                className="flex items-center gap-2 mt-2"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 ml-8" />
                <span>Logout</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default MobileNav;
