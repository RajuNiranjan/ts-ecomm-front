// singup form component

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
import Header from "./ui/header";
import { encrypt } from "@/lib/crypto";
import { useRouter } from "next/navigation";
import LocalStorageManager from "@/lib/LocalStorageManager";

import { GoogleLogin } from "@react-oauth/google";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { emit } from "process";

const formSchema = z.object({
  displayName: z
    .string()
    .nonempty("Full name required")
    .min(3)
    .max(30)
    .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
      message: "Name can only contain alphabets and spaces",
    }),
  email: z.string().nonempty("E-mail required").email(),
  password: z.string().nonempty("Password is required").min(6).max(100),
});
const SignupForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordType, setPasswordType] = useState<string>("password");

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const encrypedPassword = encrypt(data.password);

      const modifiedData = {
        ...data,
        password: encrypedPassword,
        authType: "EMAIL",
      };

      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, modifiedData)
        .then((data: any) => {
          setLoading(false);

          LocalStorageManager.setItemWithExpiration(
            "token",
            data.data.access_token,
            60
          );
          toast("Account created successfully", {
            type: "success",
            toastId: "Account created successfully",
          });

          window.location.replace("/");
        });
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", { toastId: "Something went wrong" });
    }
  };

  const signupWithGoogle = async (
    email: string,
    avatarUrl: string,
    googleId: string,
    displayName: string
  ) => {
    try {
      setLoading(true);

      const modifiedData = {
        authType: "GOOGLE",
        email,
        avatarUrl,
        googleId,
        displayName,
      };

      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, modifiedData)
        .then((data: any) => {
          setLoading(false);

          LocalStorageManager.setItemWithExpiration(
            "token",
            data.data.access_token,
            60
          );
          toast("Account created successfully", {
            type: "success",
            toastId: "Account created successfully",
          });

          window.location.replace("/");
        });
    } catch (error: any) {
      setLoading(false);
      const message = error.response.data.message;
      if (message === "Already Exists") {
        toast.error("Email alrady exists, please signin", {
          toastId: "Email alrady exists, please signin",
        });
      } else
        toast.error("Something went wrong", {
          toastId: "Something went wrong",
        });
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Header
            title="Create an account"
            description="Welcome to the Signup section! Please fill in the form below to create an account."
          />
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="mt-2 ml-2 mr-2">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    key={field.name}
                    disabled={loading}
                    placeholder="Full Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-2 ml-2 mr-2">
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
              <FormItem className="mt-2 ml-2 mr-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      key={field.name}
                      className="relative"
                      disabled={loading}
                      type={passwordType}
                      placeholder="Password"
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

          <div className="flex justify-center items-center sm:justify-end mt-5 mb-5">
            <Button type="submit">{loading ? "Loading..." : "Sign up"}</Button>
          </div>
        </form>
      </Form>
      <div className="flex gap-2 mx-2 items-center">
        <hr className="w-full border border-t-[2px] border-gray-300" />
        <p>OR</p>
        <hr className="w-full border border-t-[2px] border-gray-300" />
      </div>
      <div className="flex justify-center my-2">
        <GoogleLogin
          onSuccess={(credentialResponse: any) => {
            const data = jwtDecode<{
              email: string;
              picture: string;
              sub: string;
              name: string;
            }>(credentialResponse.credential as string);
            console.log(data);
            signupWithGoogle(data.email, data.picture, data.sub, data.name);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          text="signup_with"
        />
      </div>
    </>
  );
};
export default SignupForm;
