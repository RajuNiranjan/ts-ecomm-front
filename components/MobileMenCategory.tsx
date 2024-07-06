// this component is for Mobile ManCategories
import React, { useState } from "react";
import Link from "next/link";

import AnimatedText from "./ui/AnimatedText";
import useMobileNaveOpen from "@/hooks/useHandleMobileNav";
import { Category } from "@/type";

type MobileMenCategoryProps = {
  categories: Category[];
  title: string;
};

const MobileMenCategory: React.FC<MobileMenCategoryProps> = ({
  title,
  categories,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [mounted, setIsMounted] = useState<boolean>(false);
  const navOpen = useMobileNaveOpen();
  const handleLinkClick = () => {
    navOpen.onClose(); //close the mobile nav
    setOpen(false); //close the category menu
  };
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <>
      <div className="flex  gap-x-2 ml-10 mt-5 " onClick={() => setOpen(!open)}>
        {/* {title.split("").map((letter, index) => (
          <AnimatedText key={index}>
            {letter === " " ? "\u00A0" : letter}
          </AnimatedText>
        ))} */}
        <p className="text-[18px]">{title}</p>
      </div>
      {open && (
        <div>
          <div className="ml-8">
            {categories?.map((category, index) => (
              <div
                className="text-lg  font-medium hover:translate-x-5 hover:underline"
                key={index}
              >
                <Link href={`/category/${category.id}/${category.name}`}>
                  <p onClick={handleLinkClick}>{category.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default MobileMenCategory;
