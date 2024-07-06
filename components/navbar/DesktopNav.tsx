// this component is for desktop navigation functionality: got to user profile, logout, search
"use client";
import { User } from "@/hooks/useCurrentUser";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Smile,
  Package,
  Star,
  LogOut,
  Search,
  User as UserIcon,
  Heart,
} from "lucide-react";
import NavbarAction from "./NavbarAction";
import Image from "next/image";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import useProfileActiveTabs from "@/hooks/store/activeTabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useCart from "@/hooks/useCart";
import useGetWishList from "@/hooks/useGetWishList";

type MainNavProps = {
  user: User;
};

const DesktopNav: React.FC<MainNavProps> = ({ user }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const pathname = usePathname();
  const { clearCart } = useCart();
  const router = useRouter();
  const { activeTab, setActiveTab } = useProfileActiveTabs();
  const { data: wishlist } = useGetWishList();

  useEffect(() => setMounted(true), []);
  const onSearch = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (search !== "") {
        const encodedSearch = encodeURI(search);
        router.push(`/result?search_query=${encodedSearch}`);
      }
    },
    [search, router]
  );
  if (!mounted) return null;

  const logout = () => {
    localStorage.removeItem("token");
  };
  const handleLogout = () => {
    logout();
    clearCart();
    window.location.href = "/auth";
  };
  const handleProfle = () => {
    if (pathname.includes(`/user/${user?.id}/${user?.displayName}`)) {
      setActiveTab("Profile");
    } else {
      setActiveTab("Profile");
      router.push(`/user/${user?.id}/${user?.displayName}`);
    }
  };
  const goToOrdersPage = () => {
    if (pathname.includes(`/user/${user?.id}/${user?.displayName}`)) {
      setActiveTab("Orders");
    } else {
      setActiveTab("Orders");
      router.push(`/user/${user?.id}/${user?.displayName}`);
    }
  };
  const goToReviewsPage = () => {
    if (pathname.includes(`/user/${user?.id}/${user?.displayName}`)) {
      setActiveTab("Reviews");
    } else {
      setActiveTab("Reviews");
      router.push(`/user/${user?.id}/${user?.displayName}`);
    }
  };

  const goToWishList = () => {
    if (pathname.includes(`/user/${user?.id}/${user?.displayName}`)) {
      setActiveTab("Wishlist");
    } else {
      setActiveTab("Wishlist");
      router.push(`/user/${user?.id}/${user?.displayName}`);
    }
  };

  return (
    <nav className="hidden md:flex gap-6  w-full">
      <div className=" hidden md:block w-full">
        <div className="flex w-full items-center border-2">
          <form onSubmit={onSearch} className="w-full">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="search"
              placeholder="Search"
              className="border-none"
            />
          </form>
          <Search onClick={onSearch} className="cursor-pointer p-1" />
        </div>
      </div>
      {/** this component is responsible for user profile review order route*/}
      <div className="flex items-center gap-3">
        <Menubar className="" style={{ border: "none" }}>
          <MenubarMenu>
            <MenubarTrigger>
              <div className="flex items-center  hover:cursor-pointer hover:text-red-600 hover:underline gap-2 px-2 mr-2">
                {/* {user.avatarUrl ? (
                  <Image
                    src={`${user.avatarUrl}`}
                    alt={user.displayName}
                    width={34}
                    height={34}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "17px",
                    }}
                  />
                ) : (
                  <div className="mr-2">
                    <UserIcon />
                  </div>
                )} */}

                <Image
                  src={user?.avatarUrl || "/person.png"}
                  alt={user.displayName}
                  width={34}
                  height={34}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "17px",
                  }}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      {user.displayName.split(" ")[0].slice(0, 11)}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{user.displayName}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem
                className="hover:underline cursor-pointer"
                onClick={handleProfle}
              >
                <Smile className="mr-2" /> Manage My Account
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                className="hover:underline cursor-pointer"
                onClick={goToReviewsPage}
              >
                <Star className="mr-2" />
                My Reviews
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem
                className="hover:underline cursor-pointer"
                onClick={goToOrdersPage}
              >
                <Package className="mr-2" />
                My Orders
              </MenubarItem>
              <MenubarSeparator />
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <div
          className="flex items-center gap-2 hover:cursor-pointer text-[16px] hover:text-red-600 hover:underline"
          onClick={goToWishList}
          style={{ maxWidth: "max-content" }}
        >
          <Heart className="w-[18px] h-[18px]" />
          Wishlist
        </div>
        <div
          className="flex gap-2 items-center hover:cursor-pointer text-[16px] hover:text-red-600 hover:underline "
          onClick={handleLogout}
        >
          <LogOut className="w-[18px] h-[18px]" />
          Logout
        </div>
      </div>
    </nav>
  );
};
export default DesktopNav;
