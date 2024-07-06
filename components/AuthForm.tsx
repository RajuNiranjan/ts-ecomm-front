// this component is used to render the signup and signin form
"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";
import ResetPasswordForm from "./ResetPasswordForm";
import { useEffect, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

const AuthForm: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { data: user, isLoading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    if (user) {
      router.replace("/");
    }
  }, []);
  if (!mounted) return null;

  return (
    <div className="bg-white  sm:p-4  md:p-10 rounded-lg mt-10">
      <Tabs
        defaultValue="account"
        className="m-1 sm:w-250px md:w-[600px] mt-10  md:mt-0 "
      >
        <TabsList className="flex justify-between items-center">
          <TabsTrigger value="account">Sign up</TabsTrigger>
          <TabsTrigger value="password">Sign in</TabsTrigger>
          <TabsTrigger value="resetpassword">Reset Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <SignupForm />
        </TabsContent>
        <TabsContent value="password">
          <SigninForm />
        </TabsContent>
        <TabsContent value="resetpassword">
          <ResetPasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default AuthForm;
