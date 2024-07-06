// form user settings page

"use client";
import React, { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import LocalStorageManager from "@/lib/LocalStorageManager";
import { User } from "@/hooks/useCurrentUser";

import Header from "@/components/ui/header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import ImageUpload from "@/components/ui/image-upload";

type SettingsFormProps = {
  user: User;
};
const formSchema = z.object({
  email: z.string().email(),
  displayName: z.string().min(3).max(20),
  avaterUrl: z.string().url(),
});

const SettingsForm: React.FC<SettingsFormProps> = ({ user }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      displayName: user.displayName,
      avaterUrl: user.avatarUrl || "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const token = LocalStorageManager.getItemWithExpiration("token");
    setLoading(true);
    await axios
      .patch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        toast("Profile updated successfully", {
          type: "success",
        });
        // window.location.href = `user/${user.id}/${user.displayName}`;
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="mt-10 md:mt-0">
      {/* <Header title="Settings"
        description="Update your profile information"
         /> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full md:mt-0"
        >
          <FormField
            control={form.control}
            name="avaterUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
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
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" disabled={loading}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default SettingsForm;
