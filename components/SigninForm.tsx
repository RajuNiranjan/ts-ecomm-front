// singnin form component
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import LocalStorageManager from "@/lib/LocalStorageManager";

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
import useCurrentUser from "@/hooks/useCurrentUser";
import { GoogleLogin } from "@react-oauth/google";
import { JwtPayload, jwtDecode } from "jwt-decode";

const formSchema = z.object({
  email: z.string().nonempty("E-mail required").email(),
  password: z.string().nonempty("Password is required").min(6).max(100),
});
const SigninForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [passwordType, setPasswordType] = useState<string>("password");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const encrypedPassword = encrypt(data.password);

    const modifiedData = {
      ...data,
      password: encrypedPassword,
      authType: "EMAIL",
    };

    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, modifiedData)
      .then((res) => {
        setLoading(false);
        LocalStorageManager.setItemWithExpiration(
          "token",

          res.data.access_token,
          60
        );

        toast("Logged in successfully", {
          type: "success",
          toastId: "Logged in successfully",
        });
        window.location.replace("/");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message, {
          toastId: err.response.data.message,
        });
      });
  };
  const ShowPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const signinWithGoogle = async (email: string, googleId: string) => {
    try {
      setLoading(true);

      const modifiedData = {
        authType: "GOOGLE",
        email,
        googleId,
      };

      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, modifiedData)
        .then((res) => {
          setLoading(false);
          LocalStorageManager.setItemWithExpiration(
            "token",

            res.data.access_token,
            60
          );

          toast("Logged in successfully", {
            type: "success",
            toastId: "Logged in successfully",
          });
          window.location.replace("/");
        });
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", { toastId: "Something went wrong" });
    }
  };

  return (
    <>
      <Header
        title="Login to your account"
        description="Welcome to the Signin section! Please fill in the form below to signin."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-2 mr-2 ml-2">
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
            render={({ field }: any) => (
              <FormItem className="mt-2 mr-2 ml-2">
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
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {loading ? "Loading..." : "Sign in"}
            </Button>
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
            }>(credentialResponse.credential as string);
            console.log(data);
            signinWithGoogle(data.email, data.sub);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          text="signin_with"
        />
      </div>
    </>
  );
};
export default SigninForm;
