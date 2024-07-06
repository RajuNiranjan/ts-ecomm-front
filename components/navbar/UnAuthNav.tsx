// this component is for unauthenticated navigation
"use client";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

const UnAuthNav: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const currentPath = usePathname();
  const data = [
    {
      label: "Home",
      href: "/",
      isActive: currentPath === "/",
    },
    {
      label: "Signin/Signup",
      href: "/auth",
      isActive: currentPath === "/auth",
    },
  ];
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

  const myStyle = {
    // other styles here
    minWidth: "max-content",
  };

  return (
    <nav className="hidden md:block w-full">
      <div className="flex justify-center items-center gap-5 ">
        {data.map((item) => {
          const active = item.isActive ? "text-black" : "text-neutral-500";
          return (
            <Link
              key={item.href}
              href={item.href}
              // className={cn(
              //   "text-sm font-medium transition-colors hover:text-black",
              //   item.isActive ? "text-black" : "text-neutral-500"
              // )}
              className={`text-sm font-medium transition-colors hover:text-black ${active}`}
              style={myStyle}
            >
              {item.label}
            </Link>
          );
        })}
        <div className=" w-full p-3">
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
      </div>
    </nav>
  );
};
export default UnAuthNav;
