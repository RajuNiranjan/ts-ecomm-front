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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "react-toastify";
import { Plus, PenLine } from "lucide-react";

import { useRouter } from "next/navigation";
import LocalStorageManager from "@/lib/LocalStorageManager";
import useAddress from "@/hooks/store/address";
import { Address } from "@/type";
import useUserAddress from "@/hooks/useGetAddress";
import useCountriesAndStates from "@/hooks/store/countries";

const formSchema = z.object({
  email: z.string().nonempty("E-mail required").email(),
  address: z.string().nonempty("Address required").min(3).max(30),
  state: z.string().nonempty("State required").min(3).max(30),
  city: z
    .string()
    .nonempty("City required")
    .min(3)
    .max(30)
    .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
      message: "Full name can only contain alphabets and spaces",
    }),
  zipcode: z
    .string()
    .nonempty("Pincode required")
    .refine((value) => /^[0-9]{6}$/.test(value), {
      message: "Invalid PIN code",
    }),
  phone: z
    .string()
    .nonempty("Phone number required")
    .refine((value) => /^[0-9]{10}$/.test(value), {
      message: "Invalid phone number",
    }),
  fullName: z
    .string()
    .nonempty("Full name required")
    .min(3)
    .max(30)
    .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
      message: "Full name can only contain alphabets and spaces",
    }),

  comment: z
    .string()
    .nonempty("LandMark required")
    .min(3)
    .max(100)
    .refine(
      (value) => !(/^[0-9]+$/.test(value) || /^[^a-zA-Z0-9\s]+$/.test(value)),
      {
        message:
          "Comment must contain a combination characters, and not consist of only numbers.",
      }
    ),
});

interface FromProps {
  data?: Address;
  type: "update" | "create";
}

const AddressForm: React.FC<FromProps> = ({ data, type }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [asDefaultAddress, setAsDefaultAddress] = useState<boolean>(
    data?.isDefault === 1 || false
  );

  const { address, setAddress } = useAddress();
  const [addressType, setAddressType] = useState("HOME");

  const { allCountries, activeCountry, setActiveCountry } =
    useCountriesAndStates();

  const router = useRouter();

  // const [state, setState] = useState(data?.state || undefined);

  const [country, setCountry] = useState(
    data?.country || allCountries[0]?.name
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: data?.address || "",
      state: data?.state || undefined,
      city: data?.city || "",
      zipcode: data?.zipcode || "",
      email: data?.email || "",
      phone: data?.phone || "",
      fullName: data?.fullName || "",
      comment: data?.comment || "",
    },
  });

  const onSubmit = async (formdata: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const token = LocalStorageManager.getItemWithExpiration("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const modifiedData = {
        ...formdata,
        isDefault: asDefaultAddress ? 1 : address.length === 0 ? 1 : 0,
        addressType,
        country,
      };

      if (type === "create") {
        await axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/createaddress`,
            modifiedData,
            {
              headers,
            }
          )
          .then((data: any) => {
            setAddress([...address, { ...modifiedData, id: data.data.id }]);
            setLoading(false);

            setAsDefaultAddress(false);
            form.reset();
            setOpen(false);
            toast("Address successfully added.", {
              type: "success",
              toastId: "Address successfully added.",
            });
            setOpen(false);
          });
      } else {
        await axios
          .patch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/${data?.id}/updateaddress`,
            modifiedData,
            { headers }
          )
          .then((res: any) => {
            setLoading(false);
            setAsDefaultAddress(false);
            form.reset();

            const updatedAdress = address.map((each) => {
              if (each.id === res.data.id) {
                return res.data;
              }
              return each;
            });

            setAddress(updatedAdress);
            toast("Address updated Succefully.", {
              type: "success",
              toastId: "Address updated Succefully.",
            });

            if (modifiedData.isDefault !== data?.isDefault) {
              window.location.reload();
            }
            setOpen(false);
          });
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", { toastId: "Something went wrong" });
    }
  };

  const states = allCountries.filter((each) => each.name === country);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {type === "create" ? (
            <Button
              variant="outline"
              className="max-w-[220px] text-[12px] sm:text-[16px]"
            >
              <Plus /> &nbsp;ADD NEW ADDRESS
            </Button>
          ) : (
            <PenLine className="w-[10px] h-[10px] sm:w-[20px] sm:h-[20px] cursor-pointer" />
          )}
        </DialogTrigger>
        <DialogContent className="max-w-[250px] sm:max-w-[425px] max-h-[90vh] overflow-y-scroll">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <h6 className="text-center">
                {" "}
                {type === "create" ? "Add Address" : "Update Address"}
              </h6>

              <FormField
                control={form.control}
                name="fullName"
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="mt-2 ml-2 mr-2">
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        key={field.name}
                        disabled={loading}
                        placeholder="Phone number"
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
              <div className=" m-2 ml-0 p-2 flex-col  w-full">
                <label className="text-[14px] pb-[14px]">Country</label>

                <Select
                  defaultValue={country || undefined}
                  onValueChange={setCountry}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {allCountries.map((each, index) => {
                        return (
                          <SelectItem
                            value={each.name}
                            className="w-full"
                            key={index}
                          >
                            {each.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="mt-2 ml-2 mr-2">
                    <FormLabel>State</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className=" border-2 border-black">
                        <SelectGroup>
                          {states[0]?.states.map((each, index) => {
                            return (
                              <SelectItem
                                value={each.name}
                                className=""
                                key={index}
                              >
                                {each.name}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="mt-2 ml-2 mr-2">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        key={field.name}
                        disabled={loading}
                        placeholder="City"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className=" m-2 ml-0 p-2 flex-col  w-full">
                <label className="text-[14px] pb-[14px]">State</label>
                <Select defaultValue={state} onValueChange={setState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {states[0]?.states.map((each, index) => {
                        return (
                          <SelectItem
                            value={each.name}
                            className="w-full"
                            key={index}
                          >
                            {each.name}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div> */}

              <FormField
                control={form.control}
                name="zipcode"
                render={({ field }) => (
                  <FormItem className="mt-2 ml-2 mr-2">
                    <FormLabel>Zipcode</FormLabel>
                    <FormControl>
                      <Input
                        key={field.name}
                        disabled={loading}
                        placeholder="Zipcode"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="mt-2 ml-2 mr-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        key={field.name}
                        className="relative"
                        disabled={loading}
                        placeholder="Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" m-2 ml-0 p-2 flex-col  w-full">
                <label className="text-[14px] pb-[14px]">Address type</label>
                <Select
                  defaultValue={addressType}
                  onValueChange={setAddressType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivary address" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {["HOME", "OFFICE", "OTHERS"].map((each, index) => {
                        return (
                          <SelectItem
                            value={each}
                            className="w-full"
                            key={index}
                          >
                            {each}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem className="mt-2 ml-2 mr-2">
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Input
                        key={field.name}
                        disabled={loading}
                        placeholder="Comment"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 m-2">
                <input
                  type="checkbox"
                  id="defaultAddress"
                  checked={asDefaultAddress}
                  onChange={() => setAsDefaultAddress(!asDefaultAddress)}
                />
                <label htmlFor="defaultAddress" className="text-[14px]">
                  Default Address
                </label>
              </div>

              <div className="flex justify-center items-center sm:justify-end mt-5 mb-5">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {loading
                    ? "Loading..."
                    : type === "create"
                    ? "Add"
                    : "Update"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default AddressForm;
