// Main page for auth route
"use client";
import AuthForm from "@/components/AuthForm";
import React from "react";

const Auth: React.FC = () => {
  const [mounted, setMounted] = React.useState<boolean>(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <main className="flex items-center p-4 justify-center  h-full bg-[url('/signin-bg.svg')] rounded-lg   md:mx-5">
      <AuthForm />
    </main>
  );
};
export default Auth;
