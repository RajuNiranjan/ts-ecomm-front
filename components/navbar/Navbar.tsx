// this component is parent of all navigation
"use client";
import React from "react";
import Container from "@/components/ui/container";
import Link from "next/link";
import AnimatedText from "../ui/AnimatedText";
import DesktopNav from "./DesktopNav";
import useCurrentUser from "@/hooks/useCurrentUser";

import MobileNav from "./MobileNav";

import UnAuthNav from "./UnAuthNav";
import NavbarAction from "./NavbarAction";

const Navbar: React.FC = () => {
  // convert string to array of letters
  const sentence = "TS-Ecommerce".split("");

  const { data: user } = useCurrentUser();

  return (
    <Container>
      <div className="hidden md:flex relative px-4 sm:px-6 lg:px-8  h-16 items-center gap-6">
        <Link href="/" className="flex flex-shrink-0">
          {sentence.map((letter, index) => (
            <AnimatedText key={index}>
              {letter === " " ? "\u00A0" : letter}
            </AnimatedText>
          ))}
        </Link>
        {user && <DesktopNav user={user} />}
        {!user && <UnAuthNav />}
        <NavbarAction />
      </div>
      <MobileNav user={user} />
    </Container>
  );
};
export default Navbar;
