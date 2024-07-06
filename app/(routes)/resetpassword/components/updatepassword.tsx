// update password component
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Header from "@/components/ui/header";
import { useRouter } from "next/navigation";
import { encrypt } from "@/lib/crypto";

type UpdateFormProps = {
  token: string | null;
};

const formSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).max(100).nonempty(),
});
const UpdatePasswordForm: React.FC<UpdateFormProps> = ({ token }) => {
  const [confirmPasswod, setConfrimPassword] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordType, setPasswordType] = useState<string>("password");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (data.password !== confirmPasswod) return;
      setLoading(true);

      const dataObj = {
        email: data.email,
        password: encrypt(data.password),
        token: token,
      };
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, dataObj)
        .then(() => {
          setLoading(false);
          toast("Pasword Updated Successfully", {
            type: "success",
            toastId: "Pasword Updated Successfully",
          });
        });
      router.push("/auth");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", { toastId: "Something went wrong" });
    }
  };
  const ShowPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  return (
    <div className="bg-white  p-10 rounded-lg w-full md:w-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Header
            title="Update Password"
            description="Enter your email and New Password "
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    key={field.name}
                    disabled={loading}
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      key={field.name}
                      className="relative"
                      disabled={loading}
                      type={passwordType}
                      placeholder="New Password"
                      {...field}
                    />
                    {passwordType === "password" && (
                      <EyeIcon
                        className="absolute top-1/2 right-1 -translate-y-1/2  cursor-pointer text-gray-400"
                        onClick={ShowPassword}
                        size={20}
                      />
                    )}
                    {passwordType === "text" && (
                      <EyeOffIcon
                        className="absolute top-1/2 right-1 -translate-y-1/2  cursor-pointer text-gray-400"
                        onClick={ShowPassword}
                        size={20}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-2">
            <div className="relative">
              <FormLabel className="">ConfirmPassword</FormLabel>
              <Input
                className="relative"
                value={confirmPasswod}
                onChange={(e) => setConfrimPassword(e.target.value)}
                disabled={loading}
                type={passwordType}
                placeholder="Confirm Password"
              />
              {passwordType === "password" && (
                <EyeIcon
                  className="absolute top-1/2 right-1 -translate-y-1/4  cursor-pointer text-gray-400"
                  onClick={ShowPassword}
                  size={20}
                />
              )}
              {passwordType === "text" && (
                <EyeOffIcon
                  className="absolute top-1/2 right-1 -translate-y-1/4  cursor-pointer text-gray-400"
                  onClick={ShowPassword}
                  size={20}
                />
              )}
            </div>
          </div>

          <div className="flex justify-end items-center mt-5">
            <Button type="submit">
              {loading ? "Loading..." : "Update Password"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default UpdatePasswordForm;
